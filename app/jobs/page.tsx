"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SearchBar } from "@/components/search-bar";
import { JobFilters } from "@/components/job-filters";
import { JobCard } from "@/components/job-card";
import { searchJobs } from "@/lib/mock-data";
import { Job } from "@/lib/types";
import { subscribeToActiveJobs } from "@/lib/firebase/jobs";

function JobListingsContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";
  const jobType = searchParams.get("type") || "";

  // Start with mock data, switch to Firestore when available
  const [allJobs, setAllJobs] = useState<Job[] | null>(null);

  useEffect(() => {
    const unsub = subscribeToActiveJobs((firestoreJobs) => {
      if (firestoreJobs.length > 0) {
        setAllJobs(firestoreJobs);
      }
    });
    return unsub;
  }, []);

  // Filter logic
  let jobs: Job[];
  if (allJobs) {
    // Firestore jobs — filter client-side
    jobs = allJobs;
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
    if (category) {
      jobs = jobs.filter((job) => job.category === category);
    }
    if (jobType) {
      jobs = jobs.filter((job) => job.job_type === jobType);
    }
  } else {
    // Fallback to mock data
    jobs = searchJobs(query, {
      category: category || undefined,
      job_type: jobType || undefined,
    });
  }

  return (
    <div>
      {/* Page header */}
      <div className="bg-tpa-dark border-b border-tpa-dark-secondary">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <p className="text-sm font-body text-tpa-gold font-semibold tracking-wider uppercase mb-2">
            <span className="mr-1.5">◆</span>Job Board
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold font-heading text-tpa-hero-text mb-3">
            Browse <em className="italic text-tpa-gold">AI Jobs</em>
          </h1>
          <p className="text-tpa-hero-text/60 font-body max-w-xl">
            Discover opportunities in AI, prompt engineering, machine learning,
            and more.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Search */}
        <div className="mb-6">
          <SearchBar defaultValue={query} />
        </div>

        {/* Filters */}
        <div className="mb-8">
          <JobFilters />
        </div>

        {/* Results */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-body text-tpa-text/60">
              {jobs.length} {jobs.length === 1 ? "job" : "jobs"} found
              {query && (
                <span>
                  {" "}
                  for &ldquo;<span className="font-medium text-tpa-text">{query}</span>&rdquo;
                </span>
              )}
            </p>
          </div>

          {jobs.length > 0 ? (
            <div className="space-y-4">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold font-heading text-tpa-text mb-2">
                No jobs found
              </h3>
              <p className="text-tpa-text/60 font-body text-sm">
                Try adjusting your search or filters to find what you&apos;re
                looking for.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function JobsPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-tpa-border rounded w-1/3" />
            <div className="h-12 bg-tpa-border rounded" />
            <div className="h-40 bg-tpa-border rounded" />
            <div className="h-40 bg-tpa-border rounded" />
          </div>
        </div>
      }
    >
      <JobListingsContent />
    </Suspense>
  );
}
