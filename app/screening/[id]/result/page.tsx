import { mockJobs } from "@/lib/mock-data";
import ScreeningResultClient from "./ScreeningResultClient";

export function generateStaticParams() {
  return mockJobs.map((job) => ({ id: job.id }));
}

export default function ScreeningResultPage() {
  return <ScreeningResultClient />;
}
