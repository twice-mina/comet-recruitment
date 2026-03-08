export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string[];
  salary_min: number;
  salary_max: number;
  job_type: "remote" | "hybrid" | "onsite";
  category: string;
  posted_date: string;
  is_active: boolean;
  tpa_certification_preferred: boolean;
  apply_url: string;
}

export type JobType = "remote" | "hybrid" | "onsite";

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
