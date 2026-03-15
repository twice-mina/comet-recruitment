"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { mockJobs } from "@/lib/mock-jobs";
import { Job } from "@/lib/types";
import { subscribeToActiveJobs } from "@/lib/firebase/jobs";
import { formatSalary } from "@/lib/format";

export default function HomePage() {
  const [jobs, setJobs] = useState<Job[]>(mockJobs.filter((j) => j.is_active));

  useEffect(() => {
    const unsub = subscribeToActiveJobs((firestoreJobs) => {
      if (firestoreJobs.length > 0) {
        setJobs(firestoreJobs);
      }
    });
    return unsub;
  }, []);

  const featuredJobs = jobs.slice(0, 3);

  return (
    <div className="animate-page-in">
      {/* ── Hero ── */}
      <section className="bg-white border-b border-comet-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <p className="text-xs font-body font-medium tracking-widest uppercase text-comet-muted mb-5">
            Recruitment, Reimagined
          </p>
          <h1 className="font-heading font-bold text-5xl sm:text-6xl text-comet-text leading-tight mb-5 max-w-2xl">
            Pre-screened candidates,{" "}
            <span className="text-comet-indigo">ready to land.</span>
          </h1>
          <p className="text-lg text-comet-muted font-body max-w-lg mb-8 leading-relaxed">
            We source, screen, and deliver top talent — so you interview fewer people and hire faster.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/jobs"
              className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-comet-indigo text-white text-sm font-medium font-body hover:bg-[#3730A3] transition-colors"
            >
              Browse open roles →
            </Link>
            <Link
              href="/#for-companies"
              className="inline-flex items-center justify-center px-6 py-3 rounded-md border border-comet-border text-comet-text text-sm font-medium font-body hover:bg-comet-surface transition-colors"
            >
              Hire with Comet →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Featured Jobs ── */}
      <section className="bg-comet-surface border-b border-comet-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading font-semibold text-lg text-comet-text">Featured roles</h2>
            <Link
              href="/jobs"
              className="text-sm font-medium font-body text-comet-indigo hover:underline"
            >
              Browse all →
            </Link>
          </div>

          <div className="divide-y divide-comet-border border-y border-comet-border">
            {featuredJobs.map((job) => (
              <div
                key={job.id}
                className="flex items-center justify-between py-4 gap-4 hover:bg-white transition-colors px-2 -mx-2 rounded"
              >
                <div className="flex items-center gap-4 min-w-0">
                  {/* Company logo placeholder */}
                  <div className="w-8 h-8 rounded-md bg-comet-indigo-lt border border-comet-border flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold font-heading text-comet-indigo">
                      {job.company.charAt(0)}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-heading font-semibold text-sm text-comet-text truncate">
                      {job.title}
                    </p>
                    <p className="text-xs text-comet-muted font-body">
                      {job.company} · {job.location} · {job.job_type === "remote" ? "Remote" : job.job_type === "hybrid" ? "Hybrid" : "On-site"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 flex-shrink-0">
                  {job.salary_min && job.salary_max && (
                    <span className="hidden sm:block text-sm text-comet-muted font-body">
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
            ))}
          </div>

          <div className="mt-4 text-center">
            <Link
              href="/jobs"
              className="text-sm font-body text-comet-muted hover:text-comet-text transition-colors"
            >
              View all {jobs.length} roles →
            </Link>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="bg-white border-b border-comet-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 gap-12">
            {/* For Candidates */}
            <div>
              <p className="text-xs font-body font-medium tracking-widest uppercase text-comet-muted mb-4">
                For Job Seekers
              </p>
              <h2 className="font-heading font-bold text-2xl text-comet-text mb-8">
                Apply smarter.
              </h2>
              <ol className="space-y-6">
                {[
                  ["Browse roles posted via Comet", "Find engineering, design, and product roles from vetted companies."],
                  ["Complete AI-powered screening (10 min)", "Answer role-specific questions that demonstrate your fit."],
                  ["Get matched and submitted directly", "We deliver your profile to the employer with our assessment."],
                ].map(([title, desc], i) => (
                  <li key={i} className="flex gap-5">
                    <span className="font-heading font-bold text-2xl text-comet-indigo/20 leading-none w-8 flex-shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="font-heading font-semibold text-sm text-comet-text mb-1">{title}</p>
                      <p className="text-sm text-comet-muted font-body">{desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* For Companies */}
            <div id="for-companies">
              <p className="text-xs font-body font-medium tracking-widest uppercase text-comet-muted mb-4">
                For Companies
              </p>
              <h2 className="font-heading font-bold text-2xl text-comet-text mb-8">
                Stop reviewing unqualified applicants.
              </h2>
              <ol className="space-y-6">
                {[
                  ["Share your open role", "Paste a LinkedIn URL or brief us directly — we handle sourcing."],
                  ["Comet screens applicants against your criteria", "Every candidate is assessed before you see their name."],
                  ["Receive 5–10 pre-vetted candidates within 72h", "Your shortlist arrives with scores and summaries, ready to interview."],
                ].map(([title, desc], i) => (
                  <li key={i} className="flex gap-5">
                    <span className="font-heading font-bold text-2xl text-comet-indigo/20 leading-none w-8 flex-shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="font-heading font-semibold text-sm text-comet-text mb-1">{title}</p>
                      <p className="text-sm text-comet-muted font-body">{desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer CTA ── */}
      <section className="bg-comet-surface">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 text-center">
          <h2 className="font-heading font-bold text-2xl text-comet-text mb-3">
            Ready to move faster on your next hire?
          </h2>
          <p className="text-comet-muted font-body mb-8 text-sm">
            We deliver pre-vetted candidates within 72 hours. No job boards, no noise.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/jobs"
              className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-comet-indigo text-white text-sm font-medium font-body hover:bg-[#3730A3] transition-colors"
            >
              Browse open roles
            </Link>
            <Link
              href="/#for-companies"
              className="inline-flex items-center justify-center px-6 py-3 rounded-md border border-comet-border text-comet-text text-sm font-medium font-body hover:bg-white transition-colors"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
