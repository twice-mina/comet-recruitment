import { Job, ScreeningQuestion } from "./types";

export const mockJobs: Job[] = [
  {
    id: "1",
    title: "Senior Software Engineer, Backend",
    company: "Vercel",
    location: "Remote",
    description:
      "Vercel is looking for a Senior Backend Engineer to help build the infrastructure that powers millions of web deployments worldwide. You'll work on our edge network, serverless functions platform, and developer tooling that teams at companies like GitHub and Airbnb rely on every day.\n\nThis role requires deep expertise in distributed systems, a strong product sense, and the ability to work autonomously in a fast-paced remote environment.",
    responsibilities: [
      "Design and build scalable backend services for our deployment platform",
      "Improve reliability and performance of the edge network",
      "Collaborate with product and frontend teams on new developer-facing APIs",
      "Write thorough technical documentation and RFCs",
      "Mentor junior engineers and participate in code review",
    ],
    requirements: [
      "5+ years of backend engineering experience",
      "Strong proficiency in TypeScript/Node.js or Go",
      "Experience with distributed systems and cloud infrastructure (AWS, GCP)",
      "Deep understanding of HTTP, networking, and DNS",
      "Track record of shipping reliable production systems at scale",
    ],
    preferred_qualifications: [
      "Experience with edge computing or CDN infrastructure",
      "Open-source contributions to relevant projects",
      "Experience at a developer tooling or infrastructure company",
    ],
    salary_min: 175000,
    salary_max: 230000,
    job_type: "remote",
    category: "Engineering",
    posted_date: "2026-03-12",
    is_active: true,
    tpa_certification_preferred: false,
    apply_url: "https://vercel.com/careers",
    experience_level: "senior",
    employer_confidential: false,
    verification_status: "verified",
    last_verified: "2026-03-12",
    certification_tier: "core_plus",
    skill_categories: ["backend", "distributed_systems"],
    source_url: "https://vercel.com/careers",
    benefits: ["Remote-first", "Health insurance", "Equity", "Learning budget", "Home office stipend"],
  },
  {
    id: "2",
    title: "Product Designer",
    company: "Linear",
    location: "San Francisco, CA (Remote OK)",
    description:
      "Linear is building the next generation of software project management — fast, opinionated, and beautiful. We're looking for a Product Designer who thinks deeply about user experience and cares about craft at every level of detail.\n\nYou'll work directly with engineering and product to define interfaces that millions of developers use daily. This is a high-ownership role at a company that takes design seriously.",
    responsibilities: [
      "Design end-to-end product flows from concept through final polish",
      "Create detailed specifications that engineers can build from without ambiguity",
      "Run user research to validate ideas and identify pain points",
      "Maintain and evolve our design system",
      "Partner with engineering on implementation fidelity",
    ],
    requirements: [
      "4+ years of product design experience at a software company",
      "Strong portfolio demonstrating systems thinking and visual craft",
      "Proficiency in Figma, including component and autolayout work",
      "Experience designing complex, data-dense interfaces",
      "Ability to prototype interactions at medium-to-high fidelity",
    ],
    preferred_qualifications: [
      "Experience at a tool or developer-facing product",
      "Familiarity with front-end development (HTML/CSS/React)",
      "Contributions to design system documentation",
    ],
    salary_min: 150000,
    salary_max: 200000,
    job_type: "hybrid",
    category: "Design",
    posted_date: "2026-03-10",
    is_active: true,
    tpa_certification_preferred: false,
    apply_url: "https://linear.app/careers",
    experience_level: "mid",
    employer_confidential: false,
    verification_status: "verified",
    last_verified: "2026-03-10",
    certification_tier: "core",
    skill_categories: ["product_design", "figma"],
    source_url: "https://linear.app/careers",
    benefits: ["Health insurance", "Equity", "Remote flexibility", "Equipment budget"],
  },
  {
    id: "3",
    title: "Staff Machine Learning Engineer",
    company: "Anthropic",
    location: "San Francisco, CA",
    description:
      "Anthropic is a safety-focused AI lab working on building reliable, interpretable AI systems. We're hiring a Staff ML Engineer to work on training infrastructure, evaluation frameworks, and tooling that supports some of the most important AI research happening today.\n\nThis is a technical leadership role — you'll set direction for a team while staying deeply hands-on with the work.",
    responsibilities: [
      "Lead design and implementation of large-scale training pipelines",
      "Build evaluation infrastructure for model capability and safety testing",
      "Partner with researchers to translate experiments into production systems",
      "Define technical direction for the ML platform team",
      "Mentor and grow a team of ML engineers",
    ],
    requirements: [
      "7+ years of software or ML engineering experience",
      "Deep expertise in Python and PyTorch or JAX",
      "Experience training large models on distributed GPU clusters",
      "Strong understanding of ML research workflows",
      "Demonstrated technical leadership in a collaborative research environment",
    ],
    preferred_qualifications: [
      "Published ML research or engineering work",
      "Experience with transformer architectures",
      "Familiarity with RLHF or alignment research",
    ],
    salary_min: 250000,
    salary_max: 350000,
    job_type: "onsite",
    category: "Engineering",
    posted_date: "2026-03-08",
    is_active: true,
    tpa_certification_preferred: false,
    apply_url: "https://anthropic.com/careers",
    experience_level: "lead",
    employer_confidential: false,
    verification_status: "verified",
    last_verified: "2026-03-08",
    certification_tier: "advanced",
    skill_categories: ["ml_engineering", "python", "pytorch"],
    source_url: "https://anthropic.com/careers",
    benefits: ["Health insurance", "Equity", "Research compute budget", "Relocation support", "Catered meals"],
  },
  {
    id: "4",
    title: "Product Manager, Growth",
    company: "Notion",
    location: "New York, NY",
    description:
      "Notion is building the connected workspace that millions of individuals and teams use to organize their work and lives. We're looking for a Growth PM to own our top-of-funnel and activation experience — figuring out how to get more people to their first 'aha' moment faster.\n\nThis role sits at the intersection of product, data, and marketing. You'll run rigorous experiments, interpret results, and ship improvements across our web and mobile surfaces.",
    responsibilities: [
      "Own the activation and onboarding experience across all surfaces",
      "Run A/B experiments and interpret results with statistical rigor",
      "Identify and execute on growth loops and virality opportunities",
      "Work closely with engineering, design, and data teams",
      "Define metrics and build dashboards to track growth health",
    ],
    requirements: [
      "4+ years of product management experience, with 2+ in growth",
      "Strong quantitative skills — comfortable with SQL and basic statistics",
      "Experience designing and running A/B tests at scale",
      "Excellent written communication for cross-functional alignment",
      "Customer empathy and a user-first product philosophy",
    ],
    preferred_qualifications: [
      "Experience at a B2B or PLG (product-led growth) company",
      "Familiarity with Mixpanel, Amplitude, or similar analytics tools",
      "Background in consumer product growth",
    ],
    salary_min: 165000,
    salary_max: 215000,
    job_type: "hybrid",
    category: "Product",
    posted_date: "2026-03-11",
    is_active: true,
    tpa_certification_preferred: false,
    apply_url: "https://notion.so/careers",
    experience_level: "mid",
    employer_confidential: false,
    verification_status: "verified",
    last_verified: "2026-03-11",
    certification_tier: "core",
    skill_categories: ["product_management", "growth"],
    source_url: "https://notion.so/careers",
    benefits: ["Health insurance", "Equity", "Flexible PTO", "Wellness stipend", "Learning budget"],
  },
  {
    id: "5",
    title: "Frontend Engineer",
    company: "Stripe",
    location: "Remote (US)",
    description:
      "Stripe's mission is to increase the GDP of the internet. We're looking for a Frontend Engineer to join the Dashboard team — the primary interface that hundreds of thousands of businesses use to manage their payments, customers, and operations.\n\nYou'll work on a high-traffic, complex product surface where performance, accessibility, and design quality are all first-class concerns.",
    responsibilities: [
      "Build and maintain components in Stripe's design system",
      "Implement new Dashboard features with performance and accessibility in mind",
      "Collaborate closely with designers and backend engineers",
      "Write and maintain comprehensive tests (unit, integration, e2e)",
      "Contribute to technical decisions and architecture discussions",
    ],
    requirements: [
      "4+ years of frontend engineering experience",
      "Deep proficiency in TypeScript and React",
      "Strong understanding of web performance and Core Web Vitals",
      "Experience with accessibility (WCAG) and inclusive design patterns",
      "Attention to detail — you notice when something is 1px off",
    ],
    preferred_qualifications: [
      "Experience with design systems and component library maintenance",
      "Familiarity with CSS-in-JS, CSS Modules, or Tailwind",
      "Open-source contributions to UI libraries",
    ],
    salary_min: 160000,
    salary_max: 210000,
    job_type: "remote",
    category: "Engineering",
    posted_date: "2026-03-13",
    is_active: true,
    tpa_certification_preferred: false,
    apply_url: "https://stripe.com/jobs",
    experience_level: "mid",
    employer_confidential: false,
    verification_status: "verified",
    last_verified: "2026-03-13",
    certification_tier: "core",
    skill_categories: ["frontend", "react", "typescript"],
    source_url: "https://stripe.com/jobs",
    benefits: ["Remote-first", "Health insurance", "Equity", "Annual retreats", "Equipment budget"],
  },
  {
    id: "6",
    title: "Head of Design",
    company: "Resend",
    location: "Remote",
    description:
      "Resend is building the email API for developers — simple, reliable, and beautiful. We're hiring our first Head of Design to own everything from brand and marketing to product design as we scale from hundreds to thousands of paying customers.\n\nThis is a founding team-level role. You'll set the design direction for a product that developers love, and have significant influence over where Resend goes next.",
    responsibilities: [
      "Own the full design function: brand, marketing, product, and documentation",
      "Build and maintain a coherent design system across all surfaces",
      "Work closely with the CEO and engineering leads on product direction",
      "Hire and grow the design team as we scale",
      "Represent design in customer conversations and external writing",
    ],
    requirements: [
      "6+ years of product and/or brand design experience",
      "Portfolio demonstrating range: systems thinking, visual craft, copywriting sensibility",
      "Experience at a developer tool or API company strongly preferred",
      "Comfortable with ambiguity and high ownership in a small team",
      "Strong written communication — you'll write docs, changelogs, and blog posts",
    ],
    preferred_qualifications: [
      "Prior experience as first design hire at an early-stage startup",
      "Familiarity with developer workflows and CLI tooling UX",
      "Experience with motion design or illustration",
    ],
    salary_min: 180000,
    salary_max: 240000,
    job_type: "remote",
    category: "Design",
    posted_date: "2026-03-07",
    is_active: true,
    tpa_certification_preferred: false,
    apply_url: "https://resend.com/careers",
    experience_level: "lead",
    employer_confidential: false,
    verification_status: "verified",
    last_verified: "2026-03-07",
    certification_tier: "advanced",
    skill_categories: ["design_leadership", "brand", "product_design"],
    source_url: "https://resend.com/careers",
    benefits: ["Fully remote", "Health insurance", "Equity", "Async-first culture"],
  },
];

export const screeningQuestions: ScreeningQuestion[] = [
  {
    id: "q1",
    type: "multiple_choice",
    question: "A role requires 'strong systems thinking.' Which response best demonstrates this?",
    options: [
      "I can follow established processes and documentation reliably",
      "I can identify how components interact and anticipate downstream effects of changes",
      "I have experience working at large companies with complex systems",
      "I prefer to work on isolated tasks rather than cross-functional projects",
    ],
    correctAnswer: 1,
  },
  {
    id: "q2",
    type: "multiple_choice",
    question: "You're asked to estimate timelines for a project with many unknowns. What's the most professional approach?",
    options: [
      "Give a precise date to show confidence",
      "Refuse to estimate until all requirements are defined",
      "Provide a range with clearly stated assumptions and risks",
      "Multiply your best guess by 3 without explaining why",
    ],
    correctAnswer: 2,
  },
  {
    id: "q3",
    type: "scenario",
    question: "Describe a time you identified a problem that wasn't assigned to you and took initiative to address it. What was the outcome?",
    rubric: "Should show proactive behavior, clear problem statement, measured response, and concrete result",
  },
  {
    id: "q4",
    type: "multiple_choice",
    question: "In a cross-functional team, stakeholders disagree on priorities. What's the most effective approach?",
    options: [
      "Escalate to leadership immediately",
      "Side with the most senior stakeholder",
      "Facilitate alignment by surfacing shared goals and making tradeoffs explicit",
      "Pause the project until everyone agrees",
    ],
    correctAnswer: 2,
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
    jobs = jobs.filter((job) => (job.salary_max ?? 0) >= filters.salary_min!);
  }

  if (filters?.salary_max) {
    jobs = jobs.filter((job) => (job.salary_min ?? 0) <= filters.salary_max!);
  }

  return jobs;
}
