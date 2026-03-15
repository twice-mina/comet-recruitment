import { mockJobs } from "@/lib/mock-jobs";
import ApplyGateClient from "./ApplyGateClient";

export function generateStaticParams() {
  return mockJobs.map((job) => ({ id: job.id }));
}

export default function ApplyGatePage() {
  return <ApplyGateClient />;
}
