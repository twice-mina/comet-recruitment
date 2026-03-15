"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Job } from "@/lib/types";
import { formatSalary } from "@/lib/format";
import { cn } from "@/lib/utils";
import { staggerItem, tapProps } from "./motion";

function TagPill({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-md text-xs font-body font-medium bg-comet-surface text-comet-muted border border-comet-border",
        className
      )}
    >
      {children}
    </span>
  );
}

export function JobCard({ job }: { job: Job }) {
  const displayCompany = job.employer_confidential
    ? "Confidential Employer"
    : job.company;

  const typeLabel =
    job.job_type === "remote"
      ? "Remote"
      : job.job_type === "hybrid"
      ? "Hybrid"
      : "On-site";

  const experienceLabel =
    job.experience_level === "entry"
      ? "Entry Level"
      : job.experience_level === "mid"
      ? "Mid Level"
      : job.experience_level === "senior"
      ? "Senior"
      : job.experience_level === "lead"
      ? "Lead"
      : "Executive";

  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -2, boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="flex items-start justify-between p-5 bg-white border border-comet-border rounded-xl cursor-pointer"
    >
      {/* Left: logo + info */}
      <div className="flex items-start gap-4 min-w-0 flex-1">
        {/* Company logo */}
        <div className="w-10 h-10 rounded-lg bg-comet-indigo-lt border border-comet-border flex items-center justify-center flex-shrink-0 mt-0.5">
          <span className="text-sm font-bold font-heading text-comet-indigo">
            {job.company.charAt(0)}
          </span>
        </div>

        <div className="min-w-0">
          <Link href={`/jobs/${job.id}`} className="block group">
            <h3 className="font-heading font-semibold text-base text-comet-text group-hover:text-comet-indigo transition-colors truncate mb-0.5">
              {job.title}
            </h3>
          </Link>
          <p className="text-sm text-comet-muted font-body mb-2.5">
            {displayCompany}
            {job.location && <> · {job.location}</>}
            {job.salary_min && job.salary_max && (
              <>
                {" "}
                ·{" "}
                <span className="text-comet-text font-medium">
                  {formatSalary(job.salary_min, job.salary_max)}
                </span>
              </>
            )}
          </p>
          {/* Tag pills */}
          <div className="flex flex-wrap gap-1.5">
            <TagPill>{typeLabel}</TagPill>
            {job.category && <TagPill>{job.category}</TagPill>}
            <TagPill className="capitalize">{experienceLabel}</TagPill>
          </div>
        </div>
      </div>

      {/* Right: Easy Apply badge + Apply button */}
      <div className="flex flex-col items-end gap-2 flex-shrink-0 ml-4">
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium font-body bg-comet-indigo-lt text-comet-indigo border border-comet-indigo/20">
          ✦ Easy Apply
        </span>
        <motion.div {...tapProps}>
          <Link
            href={`/apply/${job.id}`}
            className="inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-comet-indigo text-white text-sm font-medium font-body hover:bg-[#3730A3] transition-colors"
          >
            Apply <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
