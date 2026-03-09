#!/usr/bin/env node

/**
 * TPA Careers — Job Management CLI
 *
 * Uses the Firebase client SDK (not Admin SDK) with anonymous/unauthenticated access
 * since Firestore rules allow public reads and we'll use this for seeding/management.
 *
 * For write operations, this relies on Firestore rules allowing authenticated users.
 * Since we run this with the API key directly, writes require rules that allow it.
 *
 * Usage:
 *   node scripts/manage-jobs.js list
 *   node scripts/manage-jobs.js add --title "..." --company "..." ...
 *   node scripts/manage-jobs.js deactivate --id "DOCUMENT_ID"
 *   node scripts/manage-jobs.js activate --id "DOCUMENT_ID"
 *   node scripts/manage-jobs.js delete --id "DOCUMENT_ID"
 *   node scripts/manage-jobs.js seed
 */

// Use Firestore REST API directly with the Firebase CLI refresh token
const https = require("https");
const fs = require("fs");
const path = require("path");

const PROJECT_ID = "prompt-academy-site";
const COLLECTION = "jobs";
const FIRESTORE_BASE = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;

// ——— Auth ———

let accessToken = null;

async function getAccessToken() {
  if (accessToken) return accessToken;

  const configPath = path.join(process.env.HOME || "", ".config/configstore/firebase-tools.json");
  const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
  const refreshToken = config.tokens?.refresh_token;
  if (!refreshToken) throw new Error("No Firebase CLI refresh token found. Run: firebase login");

  return new Promise((resolve, reject) => {
    const postData = new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: "563584335869-fgrhgmd47bqnekij5i8b5pr03ho849e6.apps.googleusercontent.com",
      client_secret: "j9iVZfS8kkCEFUPaAeJV0sAi",
    }).toString();

    const req = https.request({
      hostname: "oauth2.googleapis.com",
      path: "/token",
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded", "Content-Length": Buffer.byteLength(postData) },
    }, (res) => {
      let data = "";
      res.on("data", (c) => data += c);
      res.on("end", () => {
        const json = JSON.parse(data);
        if (json.access_token) {
          accessToken = json.access_token;
          resolve(accessToken);
        } else {
          reject(new Error("Token refresh failed: " + data));
        }
      });
    });
    req.on("error", reject);
    req.write(postData);
    req.end();
  });
}

// ——— REST helpers ———

function firestoreRequest(method, urlPath, body) {
  return new Promise(async (resolve, reject) => {
    const token = await getAccessToken();
    const url = new URL(urlPath.startsWith("http") ? urlPath : FIRESTORE_BASE + urlPath);

    const options = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (c) => data += c);
      res.on("end", () => {
        try {
          const json = data ? JSON.parse(data) : {};
          if (res.statusCode >= 400) {
            reject(new Error(`HTTP ${res.statusCode}: ${JSON.stringify(json.error || json)}`));
          } else {
            resolve(json);
          }
        } catch (e) {
          reject(e);
        }
      });
    });
    req.on("error", reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

// Convert JS value to Firestore REST value
function toFirestoreValue(val) {
  if (val === null || val === undefined) return { nullValue: null };
  if (typeof val === "boolean") return { booleanValue: val };
  if (typeof val === "number") {
    if (Number.isInteger(val)) return { integerValue: String(val) };
    return { doubleValue: val };
  }
  if (typeof val === "string") return { stringValue: val };
  if (val instanceof Date) return { timestampValue: val.toISOString() };
  if (Array.isArray(val)) return { arrayValue: { values: val.map(toFirestoreValue) } };
  if (typeof val === "object") {
    const fields = {};
    for (const [k, v] of Object.entries(val)) {
      fields[k] = toFirestoreValue(v);
    }
    return { mapValue: { fields } };
  }
  return { stringValue: String(val) };
}

// Convert Firestore REST value to JS
function fromFirestoreValue(val) {
  if ("stringValue" in val) return val.stringValue;
  if ("integerValue" in val) return Number(val.integerValue);
  if ("doubleValue" in val) return val.doubleValue;
  if ("booleanValue" in val) return val.booleanValue;
  if ("timestampValue" in val) return val.timestampValue;
  if ("nullValue" in val) return null;
  if ("arrayValue" in val) return (val.arrayValue.values || []).map(fromFirestoreValue);
  if ("mapValue" in val) {
    const obj = {};
    for (const [k, v] of Object.entries(val.mapValue.fields || {})) {
      obj[k] = fromFirestoreValue(v);
    }
    return obj;
  }
  return null;
}

function fromFirestoreDoc(doc) {
  const fields = doc.fields || {};
  const obj = {};
  for (const [k, v] of Object.entries(fields)) {
    obj[k] = fromFirestoreValue(v);
  }
  // Extract ID from document name
  const name = doc.name || "";
  obj.id = name.split("/").pop();
  return obj;
}

function toFirestoreDoc(data) {
  const fields = {};
  for (const [k, v] of Object.entries(data)) {
    if (k === "id") continue;
    fields[k] = toFirestoreValue(v);
  }
  return { fields };
}

// ——— Arg parsing ———

function parseArgs(argv) {
  const args = {};
  const positional = [];
  let i = 0;
  while (i < argv.length) {
    const arg = argv[i];
    if (arg.startsWith("--")) {
      const key = arg.slice(2);
      const next = argv[i + 1];
      if (next && !next.startsWith("--")) {
        if (key === "requirements") {
          if (!args[key]) args[key] = [];
          args[key].push(next);
        } else {
          args[key] = next;
        }
        i += 2;
      } else {
        args[key] = true;
        i += 1;
      }
    } else {
      positional.push(arg);
      i += 1;
    }
  }
  return { command: positional[0], args };
}

// ——— Commands ———

async function listJobs() {
  const result = await firestoreRequest("GET", `/${COLLECTION}?orderBy=posted_date desc&pageSize=100`);
  const docs = result.documents || [];
  console.log(`\n${docs.length} jobs in Firestore:\n`);
  for (const doc of docs) {
    const d = fromFirestoreDoc(doc);
    const active = d.is_active ? "✓" : "✗";
    const tpa = d.tpa_certification_preferred ? " [TPA]" : "";
    const salary = d.salary_min && d.salary_max
      ? ` $${(d.salary_min / 1000).toFixed(0)}k–$${(d.salary_max / 1000).toFixed(0)}k`
      : "";
    console.log(`  [${active}] ${d.id}  ${d.title} @ ${d.company}${salary}${tpa}`);
    console.log(`      ${d.location} | ${d.category} | ${d.job_type}`);
  }
  console.log();
}

async function addJob(args) {
  const requirements = args.requirements || [];
  const data = {
    title: args.title || "",
    company: args.company || "",
    location: args.location || "",
    description: args.description || "",
    requirements: Array.isArray(requirements) ? requirements : [requirements],
    salary_min: Number(args.salary_min) || 0,
    salary_max: Number(args.salary_max) || 0,
    job_type: args.job_type || "remote",
    category: args.category || "",
    posted_date: new Date(args.posted_date || new Date().toISOString().split("T")[0]),
    is_active: !args.inactive,
    tpa_certification_preferred: !!args.tpa_certification_preferred,
    apply_url: args.apply_url || "",
  };

  if (!data.title || !data.company) {
    console.error("Error: --title and --company are required");
    process.exit(1);
  }

  const doc = toFirestoreDoc(data);
  const result = await firestoreRequest("POST", `/${COLLECTION}`, doc);
  const id = (result.name || "").split("/").pop();
  console.log(`✓ Added job: ${id}  "${data.title}" @ ${data.company}`);
}

async function deactivateJob(args) {
  if (!args.id) { console.error("Error: --id required"); process.exit(1); }
  const doc = toFirestoreDoc({ is_active: false });
  await firestoreRequest("PATCH", `/${COLLECTION}/${args.id}?updateMask.fieldPaths=is_active`, doc);
  console.log(`✓ Deactivated job ${args.id}`);
}

async function activateJob(args) {
  if (!args.id) { console.error("Error: --id required"); process.exit(1); }
  const doc = toFirestoreDoc({ is_active: true });
  await firestoreRequest("PATCH", `/${COLLECTION}/${args.id}?updateMask.fieldPaths=is_active`, doc);
  console.log(`✓ Activated job ${args.id}`);
}

async function deleteJob(args) {
  if (!args.id) { console.error("Error: --id required"); process.exit(1); }
  await firestoreRequest("DELETE", `/${COLLECTION}/${args.id}`);
  console.log(`✓ Deleted job ${args.id}`);
}

async function seedJobs() {
  const mockJobs = [
    { title: "Senior Prompt Engineer", company: "NexusAI Labs", location: "San Francisco, CA", description: "We're looking for a Senior Prompt Engineer to join our team and help design, test, and optimize prompts for our suite of AI-powered products. You'll work closely with product and engineering teams to craft prompts that deliver reliable, high-quality outputs across multiple LLM platforms.\n\nAs a key member of our AI team, you'll establish prompt engineering best practices, build evaluation frameworks, and mentor junior engineers. This role requires deep understanding of language model behavior, strong analytical skills, and a passion for pushing the boundaries of what's possible with AI.", requirements: ["3+ years of experience working with large language models", "Deep understanding of prompt engineering techniques (chain-of-thought, few-shot, etc.)", "Experience with evaluation frameworks and A/B testing for LLM outputs", "Strong Python skills for automation and testing", "Excellent written communication skills", "TPA Certification or equivalent preferred"], salary_min: 150000, salary_max: 200000, job_type: "hybrid", category: "Prompt Engineering", posted_date: "2026-03-05", is_active: true, tpa_certification_preferred: true, apply_url: "https://nexusailabs.com/careers/senior-prompt-engineer" },
    { title: "AI Product Manager", company: "Bright Future Tech", location: "New York, NY", description: "Bright Future Tech is seeking an AI Product Manager to lead the development of our next-generation AI assistant platform. You'll define product strategy, work with cross-functional teams, and drive the roadmap for AI-powered features that serve millions of users.\n\nThe ideal candidate has a strong technical background combined with excellent product sense. You should be comfortable diving into technical discussions about model capabilities while keeping the user experience front and center.", requirements: ["5+ years of product management experience, with 2+ in AI/ML products", "Understanding of LLM capabilities and limitations", "Experience with agile development methodologies", "Strong data analysis and metrics-driven decision making", "Excellent stakeholder communication skills", "MBA or technical degree preferred"], salary_min: 160000, salary_max: 220000, job_type: "onsite", category: "Product Management", posted_date: "2026-03-04", is_active: true, tpa_certification_preferred: false, apply_url: "https://brightfuturetech.com/jobs/ai-pm" },
    { title: "Machine Learning Engineer", company: "DataFlow Systems", location: "Remote", description: "Join DataFlow Systems as a Machine Learning Engineer and help build scalable ML pipelines that power real-time decision-making for Fortune 500 clients. You'll design and implement ML models, optimize inference performance, and collaborate with data engineers to ensure robust data pipelines.\n\nWe offer a fully remote work environment with flexible hours, competitive compensation, and the opportunity to work on cutting-edge problems in recommendation systems, anomaly detection, and natural language processing.", requirements: ["4+ years of experience in machine learning engineering", "Proficiency in Python, PyTorch or TensorFlow", "Experience with MLOps tools (MLflow, Kubeflow, or similar)", "Strong understanding of distributed computing", "Experience deploying models to production at scale", "MS or PhD in Computer Science, Statistics, or related field"], salary_min: 140000, salary_max: 190000, job_type: "remote", category: "Machine Learning", posted_date: "2026-03-06", is_active: true, tpa_certification_preferred: true, apply_url: "https://dataflowsystems.com/careers/ml-engineer" },
    { title: "AI Content Strategist", company: "ContentCraft AI", location: "Austin, TX", description: "ContentCraft AI is hiring an AI Content Strategist to lead our content operations powered by generative AI. You'll develop content strategies that leverage AI tools, create workflows for AI-assisted content production, and ensure quality standards across all outputs.\n\nThis role sits at the intersection of creativity and technology. You'll use your expertise in both content marketing and AI tools to help our clients produce better content, faster.", requirements: ["3+ years in content strategy or content marketing", "Hands-on experience with AI writing and image generation tools", "Strong editing and quality assurance skills", "Understanding of SEO and content analytics", "Experience managing content calendars and workflows", "TPA Certification strongly preferred"], salary_min: 90000, salary_max: 130000, job_type: "hybrid", category: "Content & Marketing", posted_date: "2026-03-03", is_active: true, tpa_certification_preferred: true, apply_url: "https://contentcraftai.com/jobs/content-strategist" },
    { title: "Data Scientist — NLP Focus", company: "LinguaTech", location: "Seattle, WA", description: "LinguaTech is looking for a Data Scientist with a focus on Natural Language Processing to join our research and development team. You'll work on building and fine-tuning language models for multilingual applications, conduct experiments, and publish findings.\n\nOur team values intellectual curiosity and rigorous methodology. You'll have access to significant compute resources and the freedom to explore novel approaches to language understanding.", requirements: ["PhD or MS in NLP, Computational Linguistics, or related field", "Experience with transformer architectures and fine-tuning", "Strong publication record in NLP conferences (ACL, EMNLP, etc.) preferred", "Proficiency in Python and deep learning frameworks", "Experience with multilingual NLP is a plus", "Strong statistical analysis skills"], salary_min: 145000, salary_max: 195000, job_type: "hybrid", category: "Data Science", posted_date: "2026-03-07", is_active: true, tpa_certification_preferred: false, apply_url: "https://linguatech.ai/careers/data-scientist-nlp" },
    { title: "AI Research Scientist", company: "DeepMind Dynamics", location: "London, UK (Remote OK)", description: "We're seeking an AI Research Scientist to push the boundaries of artificial intelligence. You'll conduct fundamental research in areas such as reasoning, planning, and multimodal understanding, with the goal of developing more capable and aligned AI systems.\n\nThis is a unique opportunity to work alongside world-class researchers and contribute to publications that shape the field. We value both theoretical depth and practical impact.", requirements: ["PhD in Machine Learning, AI, or related field", "Strong publication record in top-tier AI conferences", "Experience with large-scale model training", "Deep understanding of optimization and generalization", "Ability to work independently and lead research projects", "Excellent technical writing skills"], salary_min: 170000, salary_max: 250000, job_type: "remote", category: "Research", posted_date: "2026-03-01", is_active: true, tpa_certification_preferred: false, apply_url: "https://deepminddynamics.com/research-scientist" },
    { title: "Prompt Engineering Intern", company: "StartupAI", location: "Remote", description: "StartupAI is offering a paid internship for aspiring Prompt Engineers. You'll work directly with our founding team to develop and test prompts for our AI-powered customer service platform. This is a great opportunity to gain hands-on experience in prompt engineering while contributing to a fast-growing startup.\n\nIdeal for recent TPA graduates or current students looking to break into the AI industry.", requirements: ["Currently enrolled in or recently completed a TPA certification program", "Basic understanding of how large language models work", "Strong written communication skills", "Eagerness to learn and experiment", "Available for at least 20 hours per week"], salary_min: 50000, salary_max: 65000, job_type: "remote", category: "Prompt Engineering", posted_date: "2026-03-08", is_active: true, tpa_certification_preferred: true, apply_url: "https://startupai.io/internship" },
    { title: "AI Operations Manager", company: "ScaleAI Corp", location: "Chicago, IL", description: "ScaleAI Corp is hiring an AI Operations Manager to oversee the deployment and monitoring of AI systems across our enterprise clients. You'll manage a team of AI specialists, ensure SLAs are met, and drive continuous improvement in our AI operations processes.\n\nThe ideal candidate combines technical understanding with strong project management skills and a track record of leading teams in fast-paced environments.", requirements: ["5+ years of experience in operations or project management", "2+ years working with AI/ML systems in production", "Experience with monitoring and observability tools", "Strong leadership and team management skills", "PMP or similar certification preferred", "Understanding of AI safety and responsible AI practices"], salary_min: 120000, salary_max: 160000, job_type: "onsite", category: "Operations", posted_date: "2026-03-02", is_active: true, tpa_certification_preferred: true, apply_url: "https://scaleaicorp.com/careers/ops-manager" },
    { title: "Full-Stack AI Engineer", company: "BuildWith AI", location: "Denver, CO", description: "BuildWith AI is looking for a Full-Stack AI Engineer who can bridge the gap between AI models and production applications. You'll build end-to-end features that integrate LLMs into our platform, from API design to frontend implementation.\n\nWe're a small, fast-moving team that values ownership and craftsmanship. You'll have significant autonomy in how you approach problems and the opportunity to shape our technical architecture.", requirements: ["4+ years of full-stack development experience", "Experience integrating LLM APIs (OpenAI, Anthropic, etc.)", "Proficiency in TypeScript, React, and Node.js", "Understanding of vector databases and RAG architectures", "Experience with cloud platforms (AWS, GCP, or Azure)", "TPA Certification is a strong plus"], salary_min: 135000, salary_max: 180000, job_type: "hybrid", category: "AI Engineering", posted_date: "2026-03-06", is_active: true, tpa_certification_preferred: true, apply_url: "https://buildwithai.dev/careers/fullstack-ai" },
    { title: "AI Ethics & Safety Researcher", company: "TrustAI Foundation", location: "Washington, DC", description: "TrustAI Foundation seeks an AI Ethics & Safety Researcher to contribute to our mission of ensuring AI systems are developed and deployed responsibly. You'll conduct research on AI alignment, bias mitigation, and safety evaluation methodologies.\n\nThis role offers the chance to influence AI policy and industry standards. You'll publish research, engage with policymakers, and collaborate with leading AI labs.", requirements: ["PhD in AI Safety, Ethics, Philosophy, or related field", "Published research on AI alignment, fairness, or safety", "Understanding of current AI capabilities and risks", "Strong analytical and writing skills", "Experience engaging with policy audiences", "Familiarity with red-teaming and evaluation frameworks"], salary_min: 130000, salary_max: 175000, job_type: "hybrid", category: "Research", posted_date: "2026-03-04", is_active: true, tpa_certification_preferred: false, apply_url: "https://trustai.org/careers/ethics-researcher" },
  ];

  console.log(`\nSeeding ${mockJobs.length} jobs into Firestore...\n`);

  for (const job of mockJobs) {
    const data = { ...job, posted_date: new Date(job.posted_date) };
    const doc = toFirestoreDoc(data);
    const result = await firestoreRequest("POST", `/${COLLECTION}`, doc);
    const id = (result.name || "").split("/").pop();
    console.log(`  + [${id}] ${job.title} @ ${job.company}`);
  }

  console.log(`\n✓ Seeded ${mockJobs.length} jobs successfully.\n`);
}

// ——— Main ———

async function main() {
  const { command, args } = parseArgs(process.argv.slice(2));

  switch (command) {
    case "list": await listJobs(); break;
    case "add": await addJob(args); break;
    case "deactivate": await deactivateJob(args); break;
    case "activate": await activateJob(args); break;
    case "delete": await deleteJob(args); break;
    case "seed": await seedJobs(); break;
    default:
      console.log(`
TPA Careers — Job Management CLI

Commands:
  list                          List all jobs
  add --title "..." ...         Add a new job
  deactivate --id "DOC_ID"      Deactivate a job
  activate --id "DOC_ID"        Activate a job
  delete --id "DOC_ID"          Delete a job
  seed                          Seed Firestore with mock data

Add options:
  --title, --company, --location, --description, --requirements (repeatable),
  --salary_min, --salary_max, --job_type, --category, --apply_url,
  --posted_date, --tpa_certification_preferred, --inactive
      `);
      break;
  }

  process.exit(0);
}

main().catch((err) => {
  console.error("Error:", err.message || err);
  process.exit(1);
});
