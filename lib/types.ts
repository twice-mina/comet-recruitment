export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  preferred_qualifications: string[];
  salary_min: number;
  salary_max: number;
  job_type: "remote" | "hybrid" | "onsite";
  category: string;
  posted_date: string;
  is_active: boolean;
  tpa_certification_preferred: boolean;
  apply_url: string;
  // New fields for business model
  experience_level: "entry" | "mid" | "senior" | "lead" | "executive";
  employer_confidential: boolean;
  verification_status: "verified" | "pending" | "expired";
  last_verified: string;
  certification_tier: "core" | "core_plus" | "advanced";
  skill_categories: string[];
  source_url: string;
  compensation_details?: string;
  benefits?: string[];
}

export type JobType = "remote" | "hybrid" | "onsite";
export type ExperienceLevel = "entry" | "mid" | "senior" | "lead" | "executive";

export const JOB_CATEGORIES = [
  "AI Engineering",
  "Prompt Engineering",
  "Data Science",
  "Machine Learning",
  "Product Management",
  "Content & Marketing",
  "Research",
  "Operations",
] as const;

export const JOB_TYPES: { value: JobType; label: string }[] = [
  { value: "remote", label: "Remote" },
  { value: "hybrid", label: "Hybrid" },
  { value: "onsite", label: "Onsite" },
];

export const EXPERIENCE_LEVELS: { value: ExperienceLevel; label: string }[] = [
  { value: "entry", label: "Entry Level" },
  { value: "mid", label: "Mid Level" },
  { value: "senior", label: "Senior" },
  { value: "lead", label: "Lead" },
  { value: "executive", label: "Executive" },
];

export interface ScreeningQuestion {
  id: string;
  type: "multiple_choice" | "scenario" | "prompt_exercise";
  question: string;
  options?: string[];
  correctAnswer?: number;
  rubric?: string;
}

export interface ScreeningResult {
  passed: boolean;
  score: number;
  categories: {
    name: string;
    score: number;
    passed: boolean;
  }[];
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  status: "screening" | "passed" | "failed" | "applied" | "under_review";
  submittedAt: string;
  screeningScore?: number;
}
