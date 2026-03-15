"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getJobById } from "@/lib/mock-jobs";

export default function SubmitApplicationClient() {
  const params = useParams();
  const id = params.id as string;
  const job = getJobById(id);

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    linkedin: "",
    resume: null as File | null,
    answer1: "",
    answer2: "",
    answer3: "",
  });

  if (!job) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <h1 className="font-heading font-bold text-2xl text-comet-text mb-4">Job Not Found</h1>
        <Link href="/jobs" className="text-sm text-comet-indigo hover:underline font-body">← Browse Jobs</Link>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitted(true);
      setSubmitting(false);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="animate-page-in max-w-xl mx-auto px-4 py-20 text-center">
        <div className="w-12 h-12 rounded-full bg-comet-indigo-lt border border-comet-indigo/20 flex items-center justify-center mx-auto mb-5">
          <svg className="w-5 h-5 text-comet-indigo" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="font-heading font-bold text-2xl text-comet-text mb-2">Application submitted</h1>
        <p className="text-sm font-body text-comet-muted mb-8 max-w-sm mx-auto">
          Your application for {job.title} at {job.employer_confidential ? "Confidential Employer" : job.company} is being reviewed. We&apos;ll be in touch within 48 hours.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/jobs"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-md bg-comet-indigo text-white text-sm font-medium font-body hover:bg-[#3730A3] transition-colors"
          >
            Browse more roles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-page-in">
      {/* Header */}
      <div className="bg-white border-b border-comet-border">
        <div className="max-w-xl mx-auto px-4 sm:px-6 py-8">
          <nav className="flex items-center gap-1.5 text-xs font-body text-comet-muted mb-4">
            <Link href="/jobs" className="hover:text-comet-text">Jobs</Link>
            <span>/</span>
            <Link href={`/jobs/${id}`} className="hover:text-comet-text truncate">{job.title}</Link>
            <span>/</span>
            <span className="text-comet-text">Application</span>
          </nav>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-comet-indigo-lt text-comet-indigo text-xs font-medium font-body mb-3">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Screening passed
          </div>

          <h1 className="font-heading font-bold text-2xl text-comet-text mb-1">
            Complete your application
          </h1>
          <p className="text-sm font-body text-comet-muted">
            {job.title} · {job.employer_confidential ? "Confidential Employer" : job.company}
          </p>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 sm:px-6 py-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal info */}
          <div className="border border-comet-border rounded-lg p-5 space-y-4 bg-white">
            <h3 className="font-heading font-semibold text-sm text-comet-text">Your details</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium font-body text-comet-muted mb-1.5">Full name *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Jane Smith"
                  className="w-full rounded-md border border-comet-border px-3 py-2 text-sm font-body text-comet-text placeholder-comet-muted focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium font-body text-comet-muted mb-1.5">Email *</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="jane@example.com"
                  className="w-full rounded-md border border-comet-border px-3 py-2 text-sm font-body text-comet-text placeholder-comet-muted focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium font-body text-comet-muted mb-1.5">LinkedIn URL</label>
              <input
                type="url"
                value={form.linkedin}
                onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
                placeholder="https://linkedin.com/in/yourprofile"
                className="w-full rounded-md border border-comet-border px-3 py-2 text-sm font-body text-comet-text placeholder-comet-muted focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium font-body text-comet-muted mb-1.5">Resume</label>
              <div className="border border-dashed border-comet-border rounded-md p-5 text-center hover:bg-comet-surface transition-colors cursor-pointer">
                <p className="text-sm font-body text-comet-muted">
                  <span className="text-comet-indigo">Choose a file</span> or drag here
                </p>
                <p className="text-xs font-body text-comet-muted/60 mt-1">PDF, DOC, or DOCX (max 5MB)</p>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="sr-only"
                  onChange={(e) => setForm({ ...form, resume: e.target.files?.[0] ?? null })}
                />
              </div>
            </div>
          </div>

          {/* Questions */}
          <div className="border border-comet-border rounded-lg p-5 space-y-5 bg-white">
            <h3 className="font-heading font-semibold text-sm text-comet-text">A few questions</h3>
            <div>
              <label className="block text-sm font-body text-comet-text mb-2">
                Why are you interested in this role?
              </label>
              <textarea
                value={form.answer1}
                onChange={(e) => setForm({ ...form, answer1: e.target.value })}
                placeholder="What draws you to this opportunity..."
                rows={3}
                className="w-full rounded-md border border-comet-border px-3 py-2 text-sm font-body text-comet-text placeholder-comet-muted focus:outline-none resize-y"
              />
            </div>
            <div>
              <label className="block text-sm font-body text-comet-text mb-2">
                Describe a relevant project or accomplishment.
              </label>
              <textarea
                value={form.answer2}
                onChange={(e) => setForm({ ...form, answer2: e.target.value })}
                placeholder="Specific context, your role, and the outcome..."
                rows={3}
                className="w-full rounded-md border border-comet-border px-3 py-2 text-sm font-body text-comet-text placeholder-comet-muted focus:outline-none resize-y"
              />
            </div>
            <div>
              <label className="block text-sm font-body text-comet-text mb-2">
                When are you available to start?
              </label>
              <input
                type="text"
                value={form.answer3}
                onChange={(e) => setForm({ ...form, answer3: e.target.value })}
                placeholder="e.g., Immediately, 2 weeks notice, June 2026"
                className="w-full rounded-md border border-comet-border px-3 py-2 text-sm font-body text-comet-text placeholder-comet-muted focus:outline-none"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full inline-flex items-center justify-center px-6 py-3 rounded-md bg-comet-indigo text-white text-sm font-medium font-body hover:bg-[#3730A3] transition-colors disabled:opacity-50 gap-2"
          >
            {submitting ? (
              <>
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Submitting...
              </>
            ) : (
              "Submit application →"
            )}
          </button>

          <p className="text-xs font-body text-comet-muted/60 text-center">
            By submitting, you allow Comet Recruitment to review and forward your application on your behalf.
          </p>
        </form>
      </div>
    </div>
  );
}
