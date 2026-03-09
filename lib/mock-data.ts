import { Job, ScreeningQuestion } from "./types";

export const mockJobs: Job[] = [
  {
    id: "1",
    title: "Senior Prompt Engineer",
    company: "NexusAI Labs",
    location: "San Francisco, CA",
    description:
      "We're looking for a Senior Prompt Engineer to join our team and help design, test, and optimize prompts for our suite of AI-powered products. You'll work closely with product and engineering teams to craft prompts that deliver reliable, high-quality outputs across multiple LLM platforms.\n\nAs a key member of our AI team, you'll establish prompt engineering best practices, build evaluation frameworks, and mentor junior engineers. This role requires deep understanding of language model behavior, strong analytical skills, and a passion for pushing the boundaries of what's possible with AI.",
    responsibilities: [
      "Design and optimize prompts for production AI systems",
      "Build evaluation frameworks for prompt quality",
      "Mentor junior prompt engineers",
      "Collaborate with product teams on AI feature requirements",
      "Establish prompt engineering best practices and documentation",
    ],
    requirements: [
      "3+ years of experience working with large language models",
      "Deep understanding of prompt engineering techniques (chain-of-thought, few-shot, etc.)",
      "Experience with evaluation frameworks and A/B testing for LLM outputs",
      "Strong Python skills for automation and testing",
      "Excellent written communication skills",
    ],
    preferred_qualifications: [
      "TPA Certification or equivalent",
      "Experience with multiple LLM providers",
      "Published work on prompt engineering",
    ],
    salary_min: 150000,
    salary_max: 200000,
    job_type: "hybrid",
    category: "Prompt Engineering",
    posted_date: "2026-03-05",
    is_active: true,
    tpa_certification_preferred: true,
    apply_url: "https://nexusailabs.com/careers/senior-prompt-engineer",
    experience_level: "senior",
    employer_confidential: false,
    verification_status: "verified",
    last_verified: "2026-03-05",
    certification_tier: "core_plus",
    skill_categories: ["prompt_quality", "ai_fundamentals", "automation_logic"],
    source_url: "https://nexusailabs.com/careers",
    benefits: ["Health insurance", "401k match", "Remote flexibility", "Learning budget"],
  },
  {
    id: "2",
    title: "AI Product Manager",
    company: "Bright Future Tech",
    location: "New York, NY",
    description:
      "Bright Future Tech is seeking an AI Product Manager to lead the development of our next-generation AI assistant platform. You'll define product strategy, work with cross-functional teams, and drive the roadmap for AI-powered features that serve millions of users.\n\nThe ideal candidate has a strong technical background combined with excellent product sense. You should be comfortable diving into technical discussions about model capabilities while keeping the user experience front and center.",
    responsibilities: [
      "Define and execute AI product strategy and roadmap",
      "Work with engineering and design teams on feature development",
      "Conduct market research and competitive analysis",
      "Define success metrics and monitor product performance",
      "Present product vision to stakeholders and leadership",
    ],
    requirements: [
      "5+ years of product management experience, with 2+ in AI/ML products",
      "Understanding of LLM capabilities and limitations",
      "Experience with agile development methodologies",
      "Strong data analysis and metrics-driven decision making",
      "Excellent stakeholder communication skills",
    ],
    preferred_qualifications: [
      "MBA or technical degree",
      "Experience with generative AI products",
      "Track record of 0→1 product launches",
    ],
    salary_min: 160000,
    salary_max: 220000,
    job_type: "onsite",
    category: "Product Management",
    posted_date: "2026-03-04",
    is_active: true,
    tpa_certification_preferred: false,
    apply_url: "https://brightfuturetech.com/jobs/ai-pm",
    experience_level: "senior",
    employer_confidential: false,
    verification_status: "verified",
    last_verified: "2026-03-04",
    certification_tier: "core",
    skill_categories: ["ai_fundamentals", "professional_communication"],
    source_url: "https://brightfuturetech.com/jobs",
    benefits: ["Health insurance", "Equity", "Gym membership", "Catered lunches"],
  },
  {
    id: "3",
    title: "Machine Learning Engineer",
    company: "DataFlow Systems",
    location: "Remote",
    description:
      "Join DataFlow Systems as a Machine Learning Engineer and help build scalable ML pipelines that power real-time decision-making for Fortune 500 clients. You'll design and implement ML models, optimize inference performance, and collaborate with data engineers to ensure robust data pipelines.\n\nWe offer a fully remote work environment with flexible hours, competitive compensation, and the opportunity to work on cutting-edge problems in recommendation systems, anomaly detection, and natural language processing.",
    responsibilities: [
      "Design and implement ML models for production systems",
      "Optimize model inference performance and scalability",
      "Build and maintain ML pipelines and data infrastructure",
      "Collaborate with data engineers on data quality and availability",
      "Conduct experiments and iterate on model architectures",
    ],
    requirements: [
      "4+ years of experience in machine learning engineering",
      "Proficiency in Python, PyTorch or TensorFlow",
      "Experience with MLOps tools (MLflow, Kubeflow, or similar)",
      "Strong understanding of distributed computing",
      "Experience deploying models to production at scale",
    ],
    preferred_qualifications: [
      "MS or PhD in Computer Science, Statistics, or related field",
      "Experience with NLP and recommendation systems",
      "Contributions to open-source ML projects",
    ],
    salary_min: 140000,
    salary_max: 190000,
    job_type: "remote",
    category: "Machine Learning",
    posted_date: "2026-03-06",
    is_active: true,
    tpa_certification_preferred: true,
    apply_url: "https://dataflowsystems.com/careers/ml-engineer",
    experience_level: "mid",
    employer_confidential: false,
    verification_status: "verified",
    last_verified: "2026-03-06",
    certification_tier: "advanced",
    skill_categories: ["ai_fundamentals", "automation_logic", "prompt_quality"],
    source_url: "https://dataflowsystems.com/careers",
    benefits: ["Full remote", "Health insurance", "401k", "Equipment budget"],
  },
  {
    id: "4",
    title: "AI Content Strategist",
    company: "ContentCraft AI",
    location: "Austin, TX",
    description:
      "ContentCraft AI is hiring an AI Content Strategist to lead our content operations powered by generative AI. You'll develop content strategies that leverage AI tools, create workflows for AI-assisted content production, and ensure quality standards across all outputs.\n\nThis role sits at the intersection of creativity and technology. You'll use your expertise in both content marketing and AI tools to help our clients produce better content, faster.",
    responsibilities: [
      "Develop AI-powered content strategies for clients",
      "Create workflows for AI-assisted content production",
      "Ensure quality standards across AI-generated content",
      "Train team members on AI content tools and best practices",
      "Analyze content performance and optimize strategies",
    ],
    requirements: [
      "3+ years in content strategy or content marketing",
      "Hands-on experience with AI writing and image generation tools",
      "Strong editing and quality assurance skills",
      "Understanding of SEO and content analytics",
      "Experience managing content calendars and workflows",
    ],
    preferred_qualifications: [
      "TPA Certification strongly preferred",
      "Experience with enterprise content management systems",
      "Background in journalism or creative writing",
    ],
    salary_min: 90000,
    salary_max: 130000,
    job_type: "hybrid",
    category: "Content & Marketing",
    posted_date: "2026-03-03",
    is_active: true,
    tpa_certification_preferred: true,
    apply_url: "https://contentcraftai.com/jobs/content-strategist",
    experience_level: "mid",
    employer_confidential: false,
    verification_status: "verified",
    last_verified: "2026-03-03",
    certification_tier: "core",
    skill_categories: ["prompt_quality", "professional_communication", "ai_fundamentals"],
    source_url: "https://contentcraftai.com/jobs",
    benefits: ["Health insurance", "Flexible hours", "Professional development"],
  },
  {
    id: "5",
    title: "Data Scientist — NLP Focus",
    company: "LinguaTech",
    location: "Seattle, WA",
    description:
      "LinguaTech is looking for a Data Scientist with a focus on Natural Language Processing to join our research and development team. You'll work on building and fine-tuning language models for multilingual applications, conduct experiments, and publish findings.\n\nOur team values intellectual curiosity and rigorous methodology. You'll have access to significant compute resources and the freedom to explore novel approaches to language understanding.",
    responsibilities: [
      "Build and fine-tune language models for multilingual applications",
      "Design and conduct NLP experiments",
      "Analyze results and publish research findings",
      "Collaborate with engineering on model deployment",
      "Stay current with latest NLP research and techniques",
    ],
    requirements: [
      "PhD or MS in NLP, Computational Linguistics, or related field",
      "Experience with transformer architectures and fine-tuning",
      "Proficiency in Python and deep learning frameworks",
      "Experience with multilingual NLP is a plus",
      "Strong statistical analysis skills",
    ],
    preferred_qualifications: [
      "Strong publication record in NLP conferences (ACL, EMNLP, etc.)",
      "Experience with low-resource languages",
      "Open-source contributions",
    ],
    salary_min: 145000,
    salary_max: 195000,
    job_type: "hybrid",
    category: "Data Science",
    posted_date: "2026-03-07",
    is_active: true,
    tpa_certification_preferred: false,
    apply_url: "https://linguatech.ai/careers/data-scientist-nlp",
    experience_level: "senior",
    employer_confidential: false,
    verification_status: "verified",
    last_verified: "2026-03-07",
    certification_tier: "advanced",
    skill_categories: ["ai_fundamentals", "automation_logic"],
    source_url: "https://linguatech.ai/careers",
    benefits: ["Health insurance", "Compute budget", "Conference travel", "Flexible PTO"],
  },
  {
    id: "6",
    title: "AI Research Scientist",
    company: "DeepMind Dynamics",
    location: "London, UK (Remote OK)",
    description:
      "We're seeking an AI Research Scientist to push the boundaries of artificial intelligence. You'll conduct fundamental research in areas such as reasoning, planning, and multimodal understanding, with the goal of developing more capable and aligned AI systems.\n\nThis is a unique opportunity to work alongside world-class researchers and contribute to publications that shape the field. We value both theoretical depth and practical impact.",
    responsibilities: [
      "Conduct fundamental AI research in reasoning and planning",
      "Design and run large-scale experiments",
      "Publish findings in top-tier conferences",
      "Collaborate with engineering on practical applications",
      "Mentor junior researchers and interns",
    ],
    requirements: [
      "PhD in Machine Learning, AI, or related field",
      "Strong publication record in top-tier AI conferences",
      "Experience with large-scale model training",
      "Deep understanding of optimization and generalization",
      "Ability to work independently and lead research projects",
    ],
    preferred_qualifications: [
      "Excellent technical writing skills",
      "Experience with multimodal models",
      "Industry research experience",
    ],
    salary_min: 170000,
    salary_max: 250000,
    job_type: "remote",
    category: "Research",
    posted_date: "2026-03-01",
    is_active: true,
    tpa_certification_preferred: false,
    apply_url: "https://deepminddynamics.com/research-scientist",
    experience_level: "senior",
    employer_confidential: false,
    verification_status: "verified",
    last_verified: "2026-03-01",
    certification_tier: "advanced",
    skill_categories: ["ai_fundamentals"],
    source_url: "https://deepminddynamics.com/careers",
    benefits: ["Competitive salary", "Research freedom", "Global team", "Relocation support"],
  },
  {
    id: "7",
    title: "Prompt Engineering Intern",
    company: "StartupAI",
    location: "Remote",
    description:
      "StartupAI is offering a paid internship for aspiring Prompt Engineers. You'll work directly with our founding team to develop and test prompts for our AI-powered customer service platform. This is a great opportunity to gain hands-on experience in prompt engineering while contributing to a fast-growing startup.\n\nIdeal for recent TPA graduates or current students looking to break into the AI industry.",
    responsibilities: [
      "Develop and test prompts for customer service AI",
      "Assist with prompt evaluation and quality testing",
      "Document prompt patterns and best practices",
      "Support the team with research on prompt techniques",
      "Participate in weekly team reviews and presentations",
    ],
    requirements: [
      "Currently enrolled in or recently completed a relevant program",
      "Basic understanding of how large language models work",
      "Strong written communication skills",
      "Eagerness to learn and experiment",
      "Available for at least 20 hours per week",
    ],
    preferred_qualifications: [
      "TPA Certification or currently enrolled in TPA program",
      "Prior experience with ChatGPT, Claude, or similar",
      "Portfolio of prompt engineering projects",
    ],
    salary_min: 50000,
    salary_max: 65000,
    job_type: "remote",
    category: "Prompt Engineering",
    posted_date: "2026-03-08",
    is_active: true,
    tpa_certification_preferred: true,
    apply_url: "https://startupai.io/internship",
    experience_level: "entry",
    employer_confidential: false,
    verification_status: "verified",
    last_verified: "2026-03-08",
    certification_tier: "core",
    skill_categories: ["prompt_quality", "professional_communication"],
    source_url: "https://startupai.io/careers",
    benefits: ["Fully remote", "Mentorship", "Learning stipend"],
  },
  {
    id: "8",
    title: "AI Operations Manager",
    company: "ScaleAI Corp",
    location: "Chicago, IL",
    description:
      "ScaleAI Corp is hiring an AI Operations Manager to oversee the deployment and monitoring of AI systems across our enterprise clients. You'll manage a team of AI specialists, ensure SLAs are met, and drive continuous improvement in our AI operations processes.\n\nThe ideal candidate combines technical understanding with strong project management skills and a track record of leading teams in fast-paced environments.",
    responsibilities: [
      "Oversee AI system deployment and monitoring",
      "Manage a team of AI operations specialists",
      "Ensure SLAs are met for enterprise clients",
      "Drive continuous improvement in operations processes",
      "Report on system performance and uptime metrics",
    ],
    requirements: [
      "5+ years of experience in operations or project management",
      "2+ years working with AI/ML systems in production",
      "Experience with monitoring and observability tools",
      "Strong leadership and team management skills",
      "Understanding of AI safety and responsible AI practices",
    ],
    preferred_qualifications: [
      "PMP or similar certification",
      "Experience with enterprise SLA management",
      "Background in cloud infrastructure operations",
    ],
    salary_min: 120000,
    salary_max: 160000,
    job_type: "onsite",
    category: "Operations",
    posted_date: "2026-03-02",
    is_active: true,
    tpa_certification_preferred: true,
    apply_url: "https://scaleaicorp.com/careers/ops-manager",
    experience_level: "lead",
    employer_confidential: false,
    verification_status: "verified",
    last_verified: "2026-03-02",
    certification_tier: "core_plus",
    skill_categories: ["ai_fundamentals", "automation_logic", "professional_communication"],
    source_url: "https://scaleaicorp.com/careers",
    benefits: ["Health insurance", "Equity", "On-site gym", "Transportation benefit"],
  },
  {
    id: "9",
    title: "Full-Stack AI Engineer",
    company: "BuildWith AI",
    location: "Denver, CO",
    description:
      "BuildWith AI is looking for a Full-Stack AI Engineer who can bridge the gap between AI models and production applications. You'll build end-to-end features that integrate LLMs into our platform, from API design to frontend implementation.\n\nWe're a small, fast-moving team that values ownership and craftsmanship. You'll have significant autonomy in how you approach problems and the opportunity to shape our technical architecture.",
    responsibilities: [
      "Build end-to-end features integrating LLMs into production",
      "Design and implement APIs for AI-powered features",
      "Develop frontend interfaces for AI interactions",
      "Optimize application performance and reliability",
      "Participate in architecture decisions and code reviews",
    ],
    requirements: [
      "4+ years of full-stack development experience",
      "Experience integrating LLM APIs (OpenAI, Anthropic, etc.)",
      "Proficiency in TypeScript, React, and Node.js",
      "Understanding of vector databases and RAG architectures",
      "Experience with cloud platforms (AWS, GCP, or Azure)",
    ],
    preferred_qualifications: [
      "TPA Certification is a strong plus",
      "Experience with real-time AI applications",
      "Contributions to AI/ML open-source projects",
    ],
    salary_min: 135000,
    salary_max: 180000,
    job_type: "hybrid",
    category: "AI Engineering",
    posted_date: "2026-03-06",
    is_active: true,
    tpa_certification_preferred: true,
    apply_url: "https://buildwithai.dev/careers/fullstack-ai",
    experience_level: "mid",
    employer_confidential: false,
    verification_status: "verified",
    last_verified: "2026-03-06",
    certification_tier: "core_plus",
    skill_categories: ["ai_fundamentals", "automation_logic", "prompt_quality"],
    source_url: "https://buildwithai.dev/careers",
    benefits: ["Health insurance", "Equity", "Remote flexibility", "Conference budget"],
  },
  {
    id: "10",
    title: "AI Ethics & Safety Researcher",
    company: "TrustAI Foundation",
    location: "Washington, DC",
    description:
      "TrustAI Foundation seeks an AI Ethics & Safety Researcher to contribute to our mission of ensuring AI systems are developed and deployed responsibly. You'll conduct research on AI alignment, bias mitigation, and safety evaluation methodologies.\n\nThis role offers the chance to influence AI policy and industry standards. You'll publish research, engage with policymakers, and collaborate with leading AI labs.",
    responsibilities: [
      "Conduct research on AI alignment and bias mitigation",
      "Develop safety evaluation methodologies",
      "Publish findings in academic journals and policy briefs",
      "Engage with policymakers on AI governance",
      "Collaborate with AI labs on safety best practices",
    ],
    requirements: [
      "PhD in AI Safety, Ethics, Philosophy, or related field",
      "Published research on AI alignment, fairness, or safety",
      "Understanding of current AI capabilities and risks",
      "Strong analytical and writing skills",
      "Experience engaging with policy audiences",
    ],
    preferred_qualifications: [
      "Familiarity with red-teaming and evaluation frameworks",
      "Policy experience in technology regulation",
      "Multi-disciplinary research background",
    ],
    salary_min: 130000,
    salary_max: 175000,
    job_type: "hybrid",
    category: "Research",
    posted_date: "2026-03-04",
    is_active: true,
    tpa_certification_preferred: false,
    apply_url: "https://trustai.org/careers/ethics-researcher",
    experience_level: "senior",
    employer_confidential: false,
    verification_status: "verified",
    last_verified: "2026-03-04",
    certification_tier: "core",
    skill_categories: ["ai_fundamentals", "professional_communication"],
    source_url: "https://trustai.org/careers",
    benefits: ["Health insurance", "Research freedom", "Conference travel", "Flexible schedule"],
  },
];

export const screeningQuestions: ScreeningQuestion[] = [
  {
    id: "q1",
    type: "multiple_choice",
    question: "Which prompting technique involves providing the AI model with examples of desired input-output pairs before asking it to perform a task?",
    options: [
      "Zero-shot prompting",
      "Few-shot prompting",
      "Chain-of-thought prompting",
      "Self-consistency prompting",
    ],
    correctAnswer: 1,
  },
  {
    id: "q2",
    type: "multiple_choice",
    question: "What is the primary risk of using AI-generated content without human review in a professional context?",
    options: [
      "The content will always be too short",
      "The AI may produce plausible-sounding but factually incorrect information (hallucinations)",
      "The content will be detected as AI-generated by search engines",
      "The AI will refuse to generate professional content",
    ],
    correctAnswer: 1,
  },
  {
    id: "q3",
    type: "scenario",
    question: "A marketing team wants to use AI to generate product descriptions for 500 e-commerce listings. They want to maintain brand consistency while being efficient. Describe your approach to setting up this workflow, including quality controls you would implement.",
    rubric: "Should mention: template/system prompts for brand voice, batch processing, human review sampling, A/B testing, feedback loops",
  },
  {
    id: "q4",
    type: "multiple_choice",
    question: "When implementing a RAG (Retrieval-Augmented Generation) system, what is the primary purpose of the retrieval step?",
    options: [
      "To make the AI model run faster",
      "To reduce the cost of API calls",
      "To provide the model with relevant, up-to-date context from a knowledge base",
      "To prevent the model from generating any creative content",
    ],
    correctAnswer: 2,
  },
  {
    id: "q5",
    type: "prompt_exercise",
    question: "Write a system prompt for an AI customer support agent for a SaaS project management tool. The agent should be helpful, professional, and able to handle billing inquiries, feature questions, and bug reports. Include appropriate guardrails.",
    rubric: "Should include: role definition, tone guidelines, scope boundaries, escalation rules, data handling instructions",
  },
];

export function getJobById(id: string): Job | undefined {
  return mockJobs.find((job) => job.id === id);
}

export function getActiveJobs(): Job[] {
  return mockJobs.filter((job) => job.is_active);
}

export function searchJobs(
  query: string,
  filters?: {
    category?: string;
    job_type?: string;
    experience_level?: string;
    salary_min?: number;
    salary_max?: number;
  }
): Job[] {
  let jobs = getActiveJobs();

  if (query) {
    const q = query.toLowerCase();
    jobs = jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(q) ||
        job.company.toLowerCase().includes(q) ||
        job.location.toLowerCase().includes(q) ||
        job.category.toLowerCase().includes(q)
    );
  }

  if (filters?.category) {
    jobs = jobs.filter((job) => job.category === filters.category);
  }

  if (filters?.job_type) {
    jobs = jobs.filter((job) => job.job_type === filters.job_type);
  }

  if (filters?.experience_level) {
    jobs = jobs.filter((job) => job.experience_level === filters.experience_level);
  }

  if (filters?.salary_min) {
    jobs = jobs.filter((job) => job.salary_max >= filters.salary_min!);
  }

  if (filters?.salary_max) {
    jobs = jobs.filter((job) => job.salary_min <= filters.salary_max!);
  }

  return jobs;
}
