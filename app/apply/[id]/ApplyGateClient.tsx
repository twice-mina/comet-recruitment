"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getJobById } from "@/lib/mock-data";
import { getJobFromFirestore } from "@/lib/firebase/jobs";
import { Job } from "@/lib/types";

export default function ApplyGateClient() {
  const params = useParams();
  const id = params.id as string;

  const [job, setJob] = useState<Job | null | undefined>(() => getJobById(id));
  const [loading, setLoading] = useState(!getJobById(id));

  useEffect(() => {
    let cancelled = false;
    getJobFromFirestore(id)
      .then((firestoreJob) => {
        if (!cancelled && firestoreJob) setJob(firestoreJob);
      })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [id]);

  if (loading) {
    return <div className="max-w-4xl mx-auto px-4 py-20 text-center"><p className="text-tpa-text/60 font-body">Loading...</p></div>;
  }

  if (!job) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold font-heading text-tpa-text mb-4">Job Not Found</h1>
        <Link href="/jobs" className="text-tpa-gold hover:underline font-body">← Browse Jobs</Link>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="bg-tpa-dark border-b border-tpa-dark-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <nav className="flex items-center gap-2 text-sm font-body text-tpa-hero-text/50 mb-4">
            <Link href="/jobs" className="hover:text-tpa-gold transition-colors">Jobs</Link>
            <span>/</span>
            <Link href={`/jobs/${id}`} className="hover:text-tpa-gold transition-colors truncate">{job.title}</Link>
            <span>/</span>
            <span className="text-tpa-hero-text/80">Apply</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-tpa-hero-text mb-3">
            Complete AI Proficiency Screening
          </h1>
          <p className="text-tpa-hero-text/60 font-body max-w-xl">
            to Apply Through Prompt Academy for <span className="text-tpa-gold">{job.title}</span> at {job.employer_confidential ? "Confidential Employer" : job.company}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Explanation */}
        <div className="mb-10">
          <p className="text-tpa-text/70 font-body leading-relaxed">
            Prompt Academy uses a standardized screening process before accepting candidates through our application channel. This helps ensure all applicants meet our AI proficiency bar and allows us to certify and potentially vouch for qualified candidates.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {/* What happens if you pass */}
          <div className="bg-white rounded-xl border border-tpa-border p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold font-heading text-tpa-text">If You Pass</h3>
            </div>
            <ul className="space-y-3 text-sm font-body text-tpa-text/70">
              <li className="flex items-start gap-2">
                <span className="text-tpa-gold mt-0.5">◆</span>
                Receive a free AI proficiency screening result
              </li>
              <li className="flex items-start gap-2">
                <span className="text-tpa-gold mt-0.5">◆</span>
                Continue your application through Prompt Academy&apos;s channel
              </li>
              <li className="flex items-start gap-2">
                <span className="text-tpa-gold mt-0.5">◆</span>
                Option to purchase official TPA Certification for enhanced positioning
              </li>
              <li className="flex items-start gap-2">
                <span className="text-tpa-gold mt-0.5">◆</span>
                May be considered for other matching roles
              </li>
            </ul>
          </div>

          {/* What happens if you don't pass */}
          <div className="bg-white rounded-xl border border-tpa-border p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold font-heading text-tpa-text">If You Don&apos;t Pass Yet</h3>
            </div>
            <ul className="space-y-3 text-sm font-body text-tpa-text/70">
              <li className="flex items-start gap-2">
                <span className="text-tpa-gold mt-0.5">◆</span>
                Receive specific skill-gap feedback
              </li>
              <li className="flex items-start gap-2">
                <span className="text-tpa-gold mt-0.5">◆</span>
                Get recommended learning modules
              </li>
              <li className="flex items-start gap-2">
                <span className="text-tpa-gold mt-0.5">◆</span>
                Retake screening after completing recommended training
              </li>
              <li className="flex items-start gap-2">
                <span className="text-tpa-gold mt-0.5">◆</span>
                Still apply directly to the employer if you prefer
              </li>
            </ul>
          </div>
        </div>

        {/* Why screening is required */}
        <div className="bg-tpa-dark/5 rounded-xl border border-tpa-border p-6 mb-10">
          <h3 className="text-lg font-semibold font-heading text-tpa-text mb-3">
            <span className="text-tpa-gold mr-1.5">◆</span>Why Screening is Required
          </h3>
          <div className="grid sm:grid-cols-3 gap-4 text-sm font-body text-tpa-text/70">
            <div>
              <p className="font-semibold text-tpa-text mb-1">Standardized Readiness</p>
              <p>Ensures all candidates meet Prompt Academy&apos;s AI proficiency bar</p>
            </div>
            <div>
              <p className="font-semibold text-tpa-text mb-1">Certification</p>
              <p>Allows Prompt Academy to certify and potentially vouch for qualified candidates</p>
            </div>
            <div>
              <p className="font-semibold text-tpa-text mb-1">Stronger Applications</p>
              <p>Certified candidates stand out with verified AI skills</p>
            </div>
          </div>
        </div>

        {/* Disclosure */}
        <div className="bg-tpa-cream rounded-xl border border-tpa-border p-4 mb-10">
          <p className="text-xs font-body text-tpa-text/50">
            <strong>Disclosure:</strong> Prompt Academy certification does not guarantee an interview or offer. Employer hiring decisions remain independent. Prompt Academy is not the employer.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={`/screening/${id}`}
            className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-tpa-gold text-tpa-dark font-semibold font-body hover:bg-tpa-gold-light transition-colors"
          >
            Start Screening
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link
            href={`/jobs/${id}`}
            className="inline-flex items-center justify-center px-8 py-3 rounded-xl border-2 border-tpa-border text-tpa-text/70 font-semibold font-body hover:border-tpa-gold/40 transition-colors"
          >
            Return to Job Details
          </Link>
        </div>
      </div>
    </div>
  );
}
