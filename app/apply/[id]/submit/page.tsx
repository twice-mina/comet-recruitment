import { mockJobs } from "@/lib/mock-jobs";
import SubmitApplicationClient from "./SubmitApplicationClient";

export function generateStaticParams() {
  return mockJobs.map((job) => ({ id: job.id }));
}

export default function SubmitApplicationPage() {
  return <SubmitApplicationClient />;
}
