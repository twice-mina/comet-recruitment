import { mockJobs } from "@/lib/mock-data";
import JobDetailClient from "./JobDetailClient";

export function generateStaticParams() {
  return mockJobs.map((job) => ({
    id: job.id,
  }));
}

export default function JobDetailPage() {
  return <JobDetailClient />;
}
