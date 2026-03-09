import { mockJobs } from "@/lib/mock-data";
import ScreeningClient from "./ScreeningClient";

export function generateStaticParams() {
  return mockJobs.map((job) => ({ id: job.id }));
}

export default function ScreeningPage() {
  return <ScreeningClient />;
}
