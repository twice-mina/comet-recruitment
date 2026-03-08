import Link from "next/link";
import { Job } from "@/lib/types";
import { formatSalary, formatDate, jobTypeBadgeColor } from "@/lib/format";
import { cn } from "@/lib/utils";

export function JobCard({ job }: { job: Job }) {
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
              {job.tpa_certification_preferred && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium font-body bg-tpa-gold/15 text-tpa-gold-dark border border-tpa-gold/30">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  TPA Certified
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 text-sm font-body text-tpa-text/60 mb-3">
              <span className="font-medium text-tpa-text">{job.company}</span>
              <span className="text-tpa-border">•</span>
              <span>{job.location}</span>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
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
          </div>
        </div>
      </div>
    </Link>
  );
}
