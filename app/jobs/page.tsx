"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SearchBar } from "@/components/search-bar";
import { JobFilters } from "@/components/job-filters";
import { JobCard } from "@/components/job-card";
import { searchJobs } from "@/lib/mock-data";

function JobListingsContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";
  const jobType = searchParams.get("type") || "";

  const jobs = searchJobs(query, {
    category: category || undefined,
    job_type: jobType || undefined,
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Browse AI Jobs
        </h1>
        <p className="text-gray-600">
          Discover opportunities in AI, prompt engineering, machine learning,
          and more.
        </p>
      </div>

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
          <p className="text-sm text-gray-600">
            {jobs.length} {jobs.length === 1 ? "job" : "jobs"} found
            {query && (
              <span>
                {" "}
                for &ldquo;<span className="font-medium">{query}</span>&rdquo;
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
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No jobs found
            </h3>
            <p className="text-gray-600 text-sm">
              Try adjusting your search or filters to find what you&apos;re
              looking for.
            </p>
          </div>
        )}
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
            <div className="h-8 bg-gray-200 rounded w-1/3" />
            <div className="h-12 bg-gray-200 rounded" />
            <div className="h-40 bg-gray-200 rounded" />
            <div className="h-40 bg-gray-200 rounded" />
          </div>
        </div>
      }
    >
      <JobListingsContent />
    </Suspense>
  );
}
