"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { mockJobs } from "@/lib/mock-jobs";
import { Job } from "@/lib/types";
import { subscribeToActiveJobs } from "@/lib/firebase/jobs";
import { PageMotion, StaggerList, StaggerItem } from "@/components/motion";
import { FilterDropdown } from "@/components/filter-dropdown";
import { JobCard } from "@/components/job-card";

const DEPARTMENT_OPTIONS = [
  { label: "All departments", value: "" },
  { label: "Engineering", value: "Engineering" },
  { label: "Design", value: "Design" },
  { label: "Product", value: "Product" },
  { label: "Marketing", value: "Marketing" },
  { label: "Operations", value: "Operations" },
  { label: "Sales", value: "Sales" },
  { label: "AI Engineering", value: "AI Engineering" },
  { label: "Data Science", value: "Data Science" },
];

const LOCATION_OPTIONS = [
  { label: "Any location", value: "" },
  { label: "Remote", value: "remote" },
  { label: "San Francisco", value: "San Francisco" },
  { label: "New York", value: "New York" },
  { label: "London", value: "London" },
  { label: "Austin", value: "Austin" },
];

const JOB_TYPE_OPTIONS = [
  { label: "Any type", value: "" },
  { label: "Remote", value: "remote" },
  { label: "Hybrid", value: "hybrid" },
  { label: "On-site", value: "onsite" },
];

function JobListingsContent() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") ?? "";

  const [allJobs, setAllJobs] = useState<Job[] | null>(null);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [department, setDepartment] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [jobType, setJobType] = useState("");

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

  const clearAll = () => {
    setSearchQuery("");
    setDepartment("");
    setLocationFilter("");
    setJobType("");
  };

  const hasFilters = searchQuery || department || locationFilter || jobType;

  const filteredJobs = baseJobs.filter((job) => {
    const q = searchQuery.trim().toLowerCase();

    if (q) {
      const matchesSearch =
        job.title.toLowerCase().includes(q) ||
        job.location?.toLowerCase().includes(q) ||
        job.category?.toLowerCase().includes(q) ||
        job.description?.toLowerCase().includes(q) ||
        job.requirements?.some((r) => r.toLowerCase().includes(q));
      if (!matchesSearch) return false;
    }

    if (department && job.category !== department) return false;

    if (locationFilter) {
      if (locationFilter === "remote") {
        if (job.job_type !== "remote") return false;
      } else {
        if (!job.location.toLowerCase().includes(locationFilter.toLowerCase())) return false;
      }
    }

    if (jobType && job.job_type !== jobType) return false;

    return true;
  });

  return (
    <PageMotion>
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

          {/* Search bar */}
          <div className="relative max-w-[600px] w-full mt-5">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-comet-muted pointer-events-none"
            />
            <input
              type="text"
              placeholder="Search roles, locations, or skills"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-comet-border bg-white text-sm font-body text-comet-text placeholder:text-comet-muted/60 focus:outline-none focus:ring-2 focus:ring-comet-indigo/30 focus:border-comet-indigo transition-all duration-200"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-comet-muted hover:text-comet-text"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Filter dropdowns */}
          <div className="flex items-center gap-2.5 flex-wrap mt-4">
            <FilterDropdown
              label="Department"
              options={DEPARTMENT_OPTIONS}
              value={department}
              onChange={setDepartment}
            />
            <FilterDropdown
              label="Location"
              options={LOCATION_OPTIONS}
              value={locationFilter}
              onChange={setLocationFilter}
            />
            <FilterDropdown
              label="Job Type"
              options={JOB_TYPE_OPTIONS}
              value={jobType}
              onChange={setJobType}
            />
            {hasFilters && (
              <button
                onClick={clearAll}
                className="text-xs font-body text-comet-muted hover:text-comet-text transition-colors"
              >
                Clear all
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Job list */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {filteredJobs.length > 0 ? (
          <>
            <StaggerList>
              {filteredJobs.map((job) => (
                <StaggerItem key={job.id} className="mb-3">
                  <JobCard job={job} />
                </StaggerItem>
              ))}
            </StaggerList>
            <p className="text-xs text-comet-muted font-body text-center mt-4">
              Showing {filteredJobs.length} of {baseJobs.length} roles
            </p>
          </>
        ) : (
          <div className="py-16 text-center">
            <p className="font-heading font-semibold text-comet-text mb-1">
              No roles match your filters.
            </p>
            <p className="text-sm text-comet-muted font-body mb-4">
              Try adjusting your search or filters.
            </p>
            <button
              onClick={clearAll}
              className="text-sm font-medium text-comet-indigo hover:underline font-body"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </PageMotion>
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
