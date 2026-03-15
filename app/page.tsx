"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { mockJobs } from "@/lib/mock-jobs";
import { Job } from "@/lib/types";
import { subscribeToActiveJobs } from "@/lib/firebase/jobs";
import { formatSalary } from "@/lib/format";
import { Starfield } from "@/components/starfield";

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
      <section className="relative min-h-[90vh] flex items-center bg-[#09090F] overflow-hidden border-b border-white/5">
        <Starfield />

        {/* Subtle comet-indigo radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(67,56,202,0.15)_0%,transparent_70%)]" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 w-full">
          {/* Eyebrow */}
          <p className="text-xs tracking-[0.2em] uppercase text-white/40 mb-6 font-body font-medium">
            Roles Worth Applying For
          </p>

          {/* H1 */}
          <h1 className="font-heading font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight max-w-3xl mb-6">
            Your next role,<br />
            <span className="text-[#F97316]">already shortlisted.</span>
          </h1>

          {/* Subline */}
          <p className="text-white/60 text-lg sm:text-xl max-w-xl mb-10 font-body leading-relaxed">
            Browse hand-picked roles from top companies. Apply once — we handle the screening and make the introduction.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/jobs"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#4338CA] hover:bg-[#3730A3] text-white font-medium font-body rounded-lg transition-colors"
            >
              Browse open roles →
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-6 py-3 border border-white/20 hover:border-white/40 text-white/80 hover:text-white font-medium font-body rounded-lg transition-colors"
            >
              Hiring? Let&apos;s talk →
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
              View all roles →
            </Link>
          </div>

          <div className="divide-y divide-comet-border border-y border-comet-border">
            {featuredJobs.map((job) => (
              <div
                key={job.id}
                className="flex items-center justify-between py-4 gap-3 hover:bg-white transition-colors px-2 -mx-2 rounded"
              >
                <div className="flex items-center gap-3 min-w-0">
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
                    <p className="text-xs text-comet-muted font-body truncate">
                      {job.company}
                      <span className="hidden sm:inline"> · {job.location} · {job.job_type === "remote" ? "Remote" : job.job_type === "hybrid" ? "Hybrid" : "On-site"}</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  {job.salary_min && job.salary_max && (
                    <span className="hidden sm:block text-sm text-comet-muted font-body whitespace-nowrap">
                      {formatSalary(job.salary_min, job.salary_max)}
                    </span>
                  )}
                  <Link
                    href={`/apply/${job.id}`}
                    className="text-sm font-medium font-body text-comet-indigo hover:underline whitespace-nowrap"
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
            {/* For Job Seekers — primary / left */}
            <div>
              <p className="text-xs font-body font-medium tracking-widest uppercase text-comet-muted mb-4">
                For Job Seekers
              </p>
              <h2 className="font-heading font-bold text-2xl text-comet-text mb-8">
                Apply smarter.
              </h2>
              <ol className="space-y-6">
                {[
                  ["Browse curated roles", "Every listing is hand-picked — no noise, no scraped junk."],
                  ["Apply in minutes — no cover letter needed", "Answer a few focused questions that show your fit."],
                  ["We screen and advocate for you", "We deliver your profile directly to the hiring team with our endorsement."],
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

            {/* For Companies — secondary / right */}
            <div id="for-companies">
              <p className="text-xs font-body font-medium tracking-widest uppercase text-comet-muted mb-4">
                For Companies
              </p>
              <h2 className="font-heading font-semibold text-xl text-comet-text mb-8">
                Only interview the best.
              </h2>
              <ol className="space-y-6">
                {[
                  ["Tell us what you need", "Share your role — paste a URL or brief us directly."],
                  ["We source and pre-screen candidates", "Every applicant is assessed against your criteria before you see them."],
                  ["You only interview the best", "Your shortlist arrives with summaries, ready to go."],
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

      {/* ── Why Comet ── */}
      <section className="bg-comet-surface border-b border-comet-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12">
            <div>
              <p className="font-heading font-bold text-sm text-comet-text mb-2">
                Curated, not scraped
              </p>
              <p className="text-sm text-comet-muted font-body leading-relaxed">
                Every role is reviewed before it goes live. No auto-imported junk.
              </p>
            </div>
            <div>
              <p className="font-heading font-bold text-sm text-comet-text mb-2">
                Screened before you see them
              </p>
              <p className="text-sm text-comet-muted font-body leading-relaxed">
                Candidates arrive pre-qualified — companies only see people worth their time.
              </p>
            </div>
            <div>
              <p className="font-heading font-bold text-sm text-comet-text mb-2">
                Fast by design
              </p>
              <p className="text-sm text-comet-muted font-body leading-relaxed">
                Most placements close in under 2 weeks. Speed is a feature, not a promise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer CTA ── */}
      <section className="bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 text-center">
          <h2 className="font-heading font-bold text-2xl text-comet-text mb-3">
            Ready to find your next role?
          </h2>
          <p className="text-comet-muted font-body mb-8 text-sm">
            Hand-picked roles, fast screening, direct introductions.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/jobs"
              className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-comet-indigo text-white text-sm font-medium font-body hover:bg-[#3730A3] transition-colors"
            >
              Browse open roles →
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-6 py-3 rounded-md border border-comet-border text-comet-text text-sm font-medium font-body hover:bg-comet-surface transition-colors"
            >
              Hiring? Let&apos;s talk →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
