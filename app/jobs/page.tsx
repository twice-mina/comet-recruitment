"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { mockJobs, searchJobs } from "@/lib/mock-jobs";
import { Job } from "@/lib/types";
import { subscribeToActiveJobs } from "@/lib/firebase/jobs";
import { formatSalary } from "@/lib/format";
import { cn } from "@/lib/utils";

const FILTER_TABS = [
  { label: "All", value: "" },
  { label: "Engineering", value: "Engineering" },
  { label: "Design", value: "Design" },
  { label: "Product", value: "Product" },
  { label: "Marketing", value: "Marketing" },
  { label: "Operations", value: "Operations" },
  { label: "Remote", value: "remote" },
];

function JobRow({ job }: { job: Job }) {
  const typeLabel =
    job.job_type === "remote" ? "Remote" :
    job.job_type === "hybrid" ? "Hybrid" : "On-site";

  return (
    <div className="flex items-center justify-between py-4 px-4 hover:bg-comet-surface transition-colors gap-4 border-b border-comet-border last:border-0">
      <div className="flex items-center gap-4 min-w-0">
        {/* Company logo */}
        <div className="w-8 h-8 rounded-md bg-comet-indigo-lt border border-comet-border flex items-center justify-center flex-shrink-0">
          <span className="text-xs font-bold font-heading text-comet-indigo">
            {job.company.charAt(0)}
          </span>
        </div>

        {/* Role info */}
        <div className="min-w-0">
          <p className="font-heading font-semibold text-sm text-comet-text">
            {job.title}
          </p>
          <p className="text-xs text-comet-muted font-body truncate">
            {job.company} · {job.location} · {typeLabel}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-6 flex-shrink-0">
        {job.salary_min && job.salary_max && (
          <span className="hidden md:block text-sm text-comet-muted font-body">
            {formatSalary(job.salary_min, job.salary_max)}
          </span>
        )}
        <Link
          href={`/apply/${job.id}`}
          className="text-sm font-medium font-body text-comet-indigo hover:underline"
        >
          Apply →
        </Link>
      </div>
    </div>
  );
}

function JobListingsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const category = searchParams.get("category") || "";

  const [allJobs, setAllJobs] = useState<Job[] | null>(null);

  useEffect(() => {
    const unsub = subscribeToActiveJobs((firestoreJobs) => {
      if (firestoreJobs.length > 0) {
        setAllJobs(firestoreJobs);
      } else {
        setAllJobs(mockJobs.filter((j) => j.is_active));
      }
    });
    return unsub;
  }, []);

  const baseJobs = allJobs || mockJobs.filter((j) => j.is_active);

  let jobs = baseJobs;
  if (category === "remote") {
    jobs = baseJobs.filter((j) => j.job_type === "remote");
  } else if (category) {
    jobs = baseJobs.filter((j) => j.category === category);
  }

  const setCategory = (val: string) => {
    if (val) {
      router.push(`/jobs?category=${encodeURIComponent(val)}`);
    } else {
      router.push("/jobs");
    }
  };

  return (
    <div className="animate-page-in">
      {/* Page header */}
      <div className="bg-white border-b border-comet-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <p className="text-xs font-body font-medium tracking-widest uppercase text-comet-muted mb-2">
            Job Board
          </p>
          <h1 className="font-heading font-bold text-3xl text-comet-text mb-1 uppercase tracking-tight">
            Open roles
          </h1>
          <p className="text-sm text-comet-muted font-body">
            {baseJobs.length} positions · Updated today
          </p>
        </div>
      </div>

      {/* Filter bar */}
      <div className="sticky top-14 z-10 bg-white border-b border-comet-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1.5 py-3 overflow-x-auto no-scrollbar">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab.label}
                onClick={() => setCategory(tab.value)}
                className={cn(
                  "flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium font-body transition-colors whitespace-nowrap",
                  category === tab.value
                    ? "bg-comet-indigo text-white"
                    : "bg-comet-surface text-comet-muted hover:text-comet-text hover:bg-comet-border"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Job list */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {jobs.length > 0 ? (
          <div className="border border-comet-border rounded-lg overflow-hidden bg-white">
            {jobs.map((job) => (
              <JobRow key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="font-heading font-semibold text-comet-text mb-1">No roles match your filters.</p>
            <p className="text-sm text-comet-muted font-body mb-4">Try a different category.</p>
            <button
              onClick={() => setCategory("")}
              className="text-sm font-medium text-comet-indigo hover:underline font-body"
            >
              Clear filters
            </button>
          </div>
        )}

        {jobs.length > 0 && (
          <p className="text-xs text-comet-muted font-body text-center mt-4">
            Showing {jobs.length} of {baseJobs.length} roles
          </p>
        )}
      </div>
    </div>
  );
}

export default function JobsPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="animate-pulse space-y-3">
            <div className="h-6 bg-comet-surface rounded w-1/4" />
            <div className="h-10 bg-comet-surface rounded w-1/2" />
            <div className="h-16 bg-comet-surface rounded" />
            <div className="h-16 bg-comet-surface rounded" />
            <div className="h-16 bg-comet-surface rounded" />
          </div>
        </div>
      }
    >
      <JobListingsContent />
    </Suspense>
  );
}
