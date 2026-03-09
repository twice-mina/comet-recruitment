import Link from "next/link";
import { Job } from "@/lib/types";
import { formatSalary, formatDate, jobTypeBadgeColor, experienceLevelLabel } from "@/lib/format";
import { cn } from "@/lib/utils";

export function JobCard({ job }: { job: Job }) {
  const displayCompany = job.employer_confidential ? "Confidential Employer" : job.company;

  return (
    <Link href={`/jobs/${job.id}`} className="block group">
      <div className="bg-white rounded-xl border border-tpa-border p-6 hover:border-tpa-gold/40 hover:shadow-md transition-all duration-200">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          {/* Main info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <h3 className="text-lg font-semibold font-heading text-tpa-text group-hover:text-tpa-gold-dark transition-colors">
                {job.title}
              </h3>
            </div>

            <div className="flex items-center gap-3 text-sm font-body text-tpa-text/60 mb-3">
              <span className="font-medium text-tpa-text">{displayCompany}</span>
              <span className="text-tpa-border">•</span>
              <span>{job.location}</span>
            </div>

            <div className="flex items-center gap-2 flex-wrap mb-3">
              <span
                className={cn(
                  "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium font-body capitalize",
                  jobTypeBadgeColor(job.job_type)
                )}
              >
                {job.job_type}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium font-body bg-tpa-cream text-tpa-text/70 border border-tpa-border">
                {job.category}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium font-body bg-gray-100 text-gray-600">
                {experienceLevelLabel(job.experience_level)}
              </span>
            </div>

            {/* Trust/disclosure tags */}
            <div className="flex items-center gap-3 text-xs font-body text-tpa-text/50">
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                External employer
              </span>
              <span className="text-tpa-border">·</span>
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Curated by Prompt Academy
              </span>
              {job.tpa_certification_preferred && (
                <>
                  <span className="text-tpa-border">·</span>
                  <span className="flex items-center gap-1 text-tpa-gold-dark">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Screening required
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Salary & date */}
          <div className="sm:text-right flex sm:flex-col items-center sm:items-end gap-2 sm:gap-1">
            <span className="text-sm font-semibold font-body text-tpa-text">
              {formatSalary(job.salary_min, job.salary_max)}
            </span>
            <span className="text-xs font-body text-tpa-text/50">
              {formatDate(job.posted_date)}
            </span>
            {job.verification_status === "verified" && (
              <span className="inline-flex items-center gap-1 text-xs font-body text-green-600 mt-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Verified
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
