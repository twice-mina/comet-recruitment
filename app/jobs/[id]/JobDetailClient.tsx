"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getJobById } from "@/lib/mock-data";
import { getJobFromFirestore } from "@/lib/firebase/jobs";
import { Job } from "@/lib/types";
import { formatSalary, formatDate, jobTypeBadgeColor, experienceLevelLabel } from "@/lib/format";
import { cn } from "@/lib/utils";

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
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <p className="text-tpa-text/60 font-body">Loading job details...</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <div className="text-5xl mb-4">😕</div>
        <h1 className="text-2xl font-bold font-heading text-tpa-text mb-2">Job Not Found</h1>
        <p className="text-tpa-text/60 font-body mb-6">This job listing may have been removed or doesn&apos;t exist.</p>
        <Link href="/jobs" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-tpa-gold text-tpa-dark font-semibold font-body hover:bg-tpa-gold-light transition-colors">
          ← Browse All Jobs
        </Link>
      </div>
    );
  }

  const displayCompany = job.employer_confidential ? "Confidential Employer" : job.company;

  return (
    <div>
      {/* Dark header */}
      <div className="bg-tpa-dark border-b border-tpa-dark-secondary">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <nav className="flex items-center gap-2 text-sm font-body text-tpa-hero-text/50 mb-4">
            <Link href="/jobs" className="hover:text-tpa-gold transition-colors">Jobs</Link>
            <span>/</span>
            <span className="text-tpa-hero-text/80 truncate">{job.title}</span>
          </nav>

          <div className="flex items-center gap-3 flex-wrap mb-3">
            <h1 className="text-2xl sm:text-3xl font-bold font-heading text-tpa-hero-text">
              {job.title}
            </h1>
          </div>

          <div className="flex items-center gap-3 text-tpa-hero-text/60 font-body mb-4">
            <span className="font-semibold text-tpa-hero-text">{displayCompany}</span>
            <span className="text-tpa-hero-text/30">•</span>
            <span>{job.location}</span>
            <span className="text-tpa-hero-text/30">•</span>
            <span>{formatDate(job.posted_date)}</span>
          </div>

          <div className="flex items-center gap-2 flex-wrap mb-4">
            <span className={cn("inline-flex items-center px-3 py-1 rounded-full text-sm font-medium font-body capitalize", jobTypeBadgeColor(job.job_type))}>
              {job.job_type}
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium font-body bg-tpa-dark-secondary text-tpa-hero-text/70 border border-tpa-dark-secondary">
              {job.category}
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium font-body bg-tpa-dark-secondary text-tpa-hero-text/70 border border-tpa-dark-secondary">
              {experienceLevelLabel(job.experience_level)}
            </span>
            {job.verification_status === "verified" && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium font-body bg-green-900/30 text-green-400 border border-green-800/30">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Verified
              </span>
            )}
          </div>

          {/* Disclosure */}
          <div className="flex items-center gap-2 text-xs font-body text-tpa-hero-text/40">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            External opportunity · Prompt Academy is not the employer
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-xl font-semibold font-heading text-tpa-text mb-4">About the Role</h2>
              <div className="prose max-w-none">
                {job.description.split("\n").map((paragraph, i) => (
                  <p key={i} className="text-tpa-text/80 font-body leading-relaxed mb-4">{paragraph}</p>
                ))}
              </div>
            </div>

            {job.responsibilities.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold font-heading text-tpa-text mb-4">Responsibilities</h2>
                <ul className="space-y-3">
                  {job.responsibilities.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-tpa-gold mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      <span className="text-tpa-text/80 font-body">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <h2 className="text-xl font-semibold font-heading text-tpa-text mb-4">Qualifications</h2>
              <ul className="space-y-3">
                {job.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-tpa-gold mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-tpa-text/80 font-body">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {job.preferred_qualifications.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold font-heading text-tpa-text mb-4">Preferred</h2>
                <ul className="space-y-3">
                  {job.preferred_qualifications.map((qual, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-tpa-gold/50 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-tpa-text/70 font-body">{qual}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {job.benefits && job.benefits.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold font-heading text-tpa-text mb-4">Benefits</h2>
                <div className="flex flex-wrap gap-2">
                  {job.benefits.map((benefit, i) => (
                    <span key={i} className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-body bg-tpa-cream text-tpa-text/70 border border-tpa-border">
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Why This Role Fits TPA Candidates */}
            <div className="bg-tpa-dark/5 rounded-xl border border-tpa-border p-6">
              <h2 className="text-lg font-semibold font-heading text-tpa-text mb-3">
                <span className="text-tpa-gold mr-1.5">◆</span>Why This Role Fits TPA Candidates
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { label: "AI Literacy", desc: "Role requires understanding of AI systems and capabilities" },
                  { label: "Workflow Thinking", desc: "Process-oriented approach to AI integration" },
                  { label: "Automation Readiness", desc: "Practical experience with AI-powered automation" },
                  { label: "Communication", desc: "Clear communication about AI capabilities and limitations" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-tpa-gold mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <span className="text-sm font-semibold font-body text-tpa-text">{item.label}</span>
                      <p className="text-xs font-body text-tpa-text/60">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quiet disclosure footer */}
            <div className="border-t border-tpa-border pt-6 space-y-2 text-xs font-body text-tpa-text/40">
              <p>This is an external opportunity curated by Prompt Academy.</p>
              <p>Applications through Prompt Academy follow Prompt Academy screening standards.</p>
              <p>Certification does not guarantee interview or offer.</p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Apply box */}
              <div className="bg-white rounded-xl border border-tpa-border p-6">
                <div className="text-center mb-6">
                  <div className="text-2xl font-bold font-heading text-tpa-text mb-1">
                    {formatSalary(job.salary_min, job.salary_max)}
                  </div>
                  <div className="text-sm font-body text-tpa-text/50">per year</div>
                </div>

                {/* Primary CTA: Apply Through TPA */}
                <Link
                  href={`/apply/${job.id}`}
                  className="block w-full text-center px-6 py-3 rounded-xl bg-tpa-gold text-tpa-dark font-semibold font-body hover:bg-tpa-gold-light transition-colors mb-3"
                >
                  Apply Through Prompt Academy
                </Link>
                <p className="text-xs font-body text-tpa-text/50 text-center mb-4">
                  AI proficiency screening required for Prompt Academy channel
                </p>

                {/* Secondary CTA: Apply Directly */}
                <a
                  href={job.apply_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center px-6 py-3 rounded-xl border-2 border-tpa-border text-tpa-text/70 font-semibold font-body hover:border-tpa-gold/40 hover:text-tpa-text transition-colors"
                >
                  Apply Directly
                </a>
                <p className="text-xs font-body text-tpa-text/40 text-center mt-2">
                  Opens employer&apos;s application page in a new tab
                </p>
              </div>

              {/* Disclosure box */}
              <div className="bg-tpa-cream rounded-xl border border-tpa-border p-4">
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-tpa-text/40 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-xs font-body text-tpa-text/50">
                    Prompt Academy is not the employer. This role is an external opportunity that has been curated and verified by our team.
                  </p>
                </div>
              </div>

              {/* Company info */}
              <div className="bg-white rounded-xl border border-tpa-border p-6">
                <h3 className="font-semibold font-heading text-tpa-text mb-3">
                  About {displayCompany}
                </h3>
                <div className="space-y-3 text-sm font-body text-tpa-text/60">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-tpa-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {job.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-tpa-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {job.category}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-tpa-border p-6">
                <h3 className="font-semibold font-heading text-tpa-text mb-3">Share This Job</h3>
                <p className="text-sm font-body text-tpa-text/60">
                  Know someone who&apos;d be a great fit? Share this opportunity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
