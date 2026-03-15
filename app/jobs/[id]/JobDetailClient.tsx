"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getJobById } from "@/lib/mock-jobs";
import { getJobFromFirestore } from "@/lib/firebase/jobs";
import { Job } from "@/lib/types";
import { formatSalary, formatDate } from "@/lib/format";

export default function JobDetailClient() {
  const params = useParams();
  const id = params.id as string;

  const [job, setJob] = useState<Job | null | undefined>(() => getJobById(id));
  const [loading, setLoading] = useState(!getJobById(id));

  useEffect(() => {
    let cancelled = false;
    getJobFromFirestore(id)
      .then((firestoreJob) => {
        if (!cancelled && firestoreJob) {
          setJob(firestoreJob);
        }
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20 text-center">
        <p className="text-comet-muted font-body text-sm">Loading...</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20 text-center">
        <h1 className="font-heading font-bold text-2xl text-comet-text mb-2">Job Not Found</h1>
        <p className="text-comet-muted font-body text-sm mb-6">This listing may have been removed or doesn&apos;t exist.</p>
        <Link href="/jobs" className="text-sm font-medium text-comet-indigo hover:underline font-body">
          ← Browse All Jobs
        </Link>
      </div>
    );
  }

  const displayCompany = job.employer_confidential ? "Confidential Employer" : job.company;
  const typeLabel = job.job_type === "remote" ? "Remote" : job.job_type === "hybrid" ? "Hybrid" : "On-site";

  return (
    <div className="animate-page-in">
      {/* Header */}
      <div className="bg-white border-b border-comet-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <nav className="flex items-center gap-1.5 text-xs font-body text-comet-muted mb-4">
            <Link href="/jobs" className="hover:text-comet-text transition-colors">Jobs</Link>
            <span>/</span>
            <span className="text-comet-text truncate">{job.title}</span>
          </nav>

          <h1 className="font-heading font-bold text-2xl sm:text-3xl text-comet-text mb-2">
            {job.title}
          </h1>
          <div className="flex items-center gap-2 text-sm font-body text-comet-muted flex-wrap">
            <span className="font-medium text-comet-text">{displayCompany}</span>
            <span>·</span>
            <span>{job.location}</span>
            <span>·</span>
            <span>{typeLabel}</span>
            {job.salary_min && job.salary_max && (
              <>
                <span>·</span>
                <span>{formatSalary(job.salary_min, job.salary_max)}</span>
              </>
            )}
            <span>·</span>
            <span>Posted {formatDate(job.posted_date)}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div>
              <h2 className="font-heading font-semibold text-base text-comet-text mb-4">About the role</h2>
              <div className="space-y-3">
                {job.description.split("\n").filter(Boolean).map((para, i) => (
                  <p key={i} className="text-sm text-comet-muted font-body leading-relaxed">{para}</p>
                ))}
              </div>
            </div>

            {/* Responsibilities */}
            {job.responsibilities && job.responsibilities.length > 0 && (
              <div>
                <h2 className="font-heading font-semibold text-base text-comet-text mb-4">What you&apos;ll do</h2>
                <ul className="space-y-2">
                  {job.responsibilities.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm font-body text-comet-muted">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-comet-muted flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Requirements */}
            <div>
              <h2 className="font-heading font-semibold text-base text-comet-text mb-4">What you&apos;ll bring</h2>
              <ul className="space-y-2">
                {job.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm font-body text-comet-muted">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-comet-muted flex-shrink-0" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            {/* Preferred */}
            {job.preferred_qualifications && job.preferred_qualifications.length > 0 && (
              <div>
                <h2 className="font-heading font-semibold text-base text-comet-text mb-4">Preferred</h2>
                <ul className="space-y-2">
                  {job.preferred_qualifications.map((qual, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm font-body text-comet-muted">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-comet-border flex-shrink-0" />
                      {qual}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Benefits */}
            {job.benefits && job.benefits.length > 0 && (
              <div>
                <h2 className="font-heading font-semibold text-base text-comet-text mb-3">Benefits</h2>
                <p className="text-sm font-body text-comet-muted">
                  {job.benefits.join(" · ")}
                </p>
              </div>
            )}

            {/* Footer attribution */}
            <div className="pt-4 border-t border-comet-border">
              <p className="text-xs font-body text-comet-muted/60">
                This role was sourced by Comet Recruitment.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 space-y-4">
              {/* Apply card */}
              <div className="bg-white border border-comet-border rounded-lg p-6">
                {/* Company logo */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-md bg-comet-indigo-lt border border-comet-border flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold font-heading text-comet-indigo">
                      {job.company.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-sm text-comet-text">{displayCompany}</p>
                    <p className="text-xs text-comet-muted font-body">{job.location}</p>
                  </div>
                </div>

                {/* Quick stats */}
                <div className="space-y-2 mb-5 pb-5 border-b border-comet-border text-sm font-body">
                  <div className="flex justify-between">
                    <span className="text-comet-muted text-xs uppercase tracking-wide font-medium">Type</span>
                    <span className="text-comet-text capitalize">{typeLabel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-comet-muted text-xs uppercase tracking-wide font-medium">Level</span>
                    <span className="text-comet-text capitalize">{job.experience_level}</span>
                  </div>
                  {job.salary_min && job.salary_max && (
                    <div className="flex justify-between">
                      <span className="text-comet-muted text-xs uppercase tracking-wide font-medium">Salary</span>
                      <span className="text-comet-text">{formatSalary(job.salary_min, job.salary_max)}</span>
                    </div>
                  )}
                </div>

                <Link
                  href={`/apply/${job.id}`}
                  className="block w-full text-center px-5 py-2.5 rounded-md bg-comet-indigo text-white text-sm font-medium font-body hover:bg-[#3730A3] transition-colors mb-3"
                >
                  Apply Now
                </Link>

                <a
                  href={job.apply_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center text-xs font-body text-comet-muted hover:text-comet-text transition-colors"
                >
                  Apply directly to employer →
                </a>
              </div>

              {/* Share */}
              <div className="border border-comet-border rounded-lg p-4">
                <p className="text-xs font-body text-comet-muted">
                  Comet Recruitment is not the employer. This is an external opportunity sourced and verified by our team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
