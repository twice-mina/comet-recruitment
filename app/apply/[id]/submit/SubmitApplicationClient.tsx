"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getJobById } from "@/lib/mock-data";

export default function SubmitApplicationClient() {
  const params = useParams();
  const id = params.id as string;
  const job = getJobById(id);

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    linkedin: "",
    portfolio: "",
    answer1: "",
    answer2: "",
    availability: "",
  });

  if (!job) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold font-heading text-tpa-text mb-4">Job Not Found</h1>
        <Link href="/jobs" className="text-tpa-gold hover:underline font-body">← Browse Jobs</Link>
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
      <div>
        <div className="bg-tpa-dark border-b border-tpa-dark-secondary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 text-center">
            <div className="w-16 h-16 rounded-full bg-green-500/20 border-2 border-green-500/40 flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-heading text-tpa-hero-text mb-3">
              Application Submitted Through Prompt Academy
            </h1>
            <p className="text-tpa-hero-text/60 font-body max-w-lg mx-auto mb-8">
              Your application for {job.title} at {job.employer_confidential ? "Confidential Employer" : job.company} has been submitted through Prompt Academy&apos;s channel. We&apos;ll keep you updated on your application status.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-tpa-gold text-tpa-dark font-semibold font-body hover:bg-tpa-gold-light transition-colors"
              >
                View My Dashboard
              </Link>
              <Link
                href="/jobs"
                className="inline-flex items-center justify-center px-8 py-3 rounded-xl border-2 border-tpa-gold/30 text-tpa-gold font-semibold font-body hover:bg-tpa-gold/10 transition-colors"
              >
                Browse More Jobs
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-tpa-dark border-b border-tpa-dark-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <nav className="flex items-center gap-2 text-sm font-body text-tpa-hero-text/50 mb-4">
            <Link href="/jobs" className="hover:text-tpa-gold transition-colors">Jobs</Link>
            <span>/</span>
            <Link href={`/jobs/${id}`} className="hover:text-tpa-gold transition-colors truncate">{job.title}</Link>
            <span>/</span>
            <span className="text-tpa-hero-text/80">Submit Application</span>
          </nav>
          <div className="flex items-center gap-3 mb-2">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium font-body bg-green-500/10 text-green-400 border border-green-500/30">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Screening Passed
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-tpa-hero-text mb-2">
            Complete Your Application
          </h1>
          <p className="text-tpa-hero-text/60 font-body">
            {job.title} at {job.employer_confidential ? "Confidential Employer" : job.company}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Resume Upload */}
          <div className="bg-white rounded-xl border border-tpa-border p-6">
            <h3 className="text-lg font-semibold font-heading text-tpa-text mb-4">Resume</h3>
            <div className="border-2 border-dashed border-tpa-border rounded-xl p-8 text-center hover:border-tpa-gold/40 transition-colors cursor-pointer">
              <svg className="w-10 h-10 text-tpa-text/30 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="text-sm font-body text-tpa-text/60 mb-1">
                Drag & drop your resume or <span className="text-tpa-gold cursor-pointer">browse</span>
              </p>
              <p className="text-xs font-body text-tpa-text/40">PDF, DOC, or DOCX (max 5MB)</p>
            </div>
          </div>

          {/* Links */}
          <div className="bg-white rounded-xl border border-tpa-border p-6">
            <h3 className="text-lg font-semibold font-heading text-tpa-text mb-4">Professional Links</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium font-body text-tpa-text mb-1">LinkedIn Profile URL</label>
                <input
                  type="url"
                  value={form.linkedin}
                  onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
                  placeholder="https://linkedin.com/in/yourprofile"
                  className="w-full rounded-lg border border-tpa-border bg-white text-tpa-text placeholder-tpa-text/40 px-4 py-2.5 text-sm font-body focus:border-tpa-gold focus:ring-2 focus:ring-tpa-gold/20 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium font-body text-tpa-text mb-1">Portfolio / Website URL <span className="text-tpa-text/40">(optional)</span></label>
                <input
                  type="url"
                  value={form.portfolio}
                  onChange={(e) => setForm({ ...form, portfolio: e.target.value })}
                  placeholder="https://yourportfolio.com"
                  className="w-full rounded-lg border border-tpa-border bg-white text-tpa-text placeholder-tpa-text/40 px-4 py-2.5 text-sm font-body focus:border-tpa-gold focus:ring-2 focus:ring-tpa-gold/20 outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Short Answer Questions */}
          <div className="bg-white rounded-xl border border-tpa-border p-6">
            <h3 className="text-lg font-semibold font-heading text-tpa-text mb-4">Application Questions</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium font-body text-tpa-text mb-1">
                  Why are you interested in this role?
                </label>
                <textarea
                  value={form.answer1}
                  onChange={(e) => setForm({ ...form, answer1: e.target.value })}
                  placeholder="Tell us what excites you about this opportunity..."
                  rows={4}
                  className="w-full rounded-lg border border-tpa-border bg-white text-tpa-text placeholder-tpa-text/40 p-4 text-sm font-body focus:border-tpa-gold focus:ring-2 focus:ring-tpa-gold/20 outline-none transition-all resize-y"
                />
              </div>
              <div>
                <label className="block text-sm font-medium font-body text-tpa-text mb-1">
                  Describe a project where you used AI tools to solve a real problem.
                </label>
                <textarea
                  value={form.answer2}
                  onChange={(e) => setForm({ ...form, answer2: e.target.value })}
                  placeholder="Share your experience with AI in a professional context..."
                  rows={4}
                  className="w-full rounded-lg border border-tpa-border bg-white text-tpa-text placeholder-tpa-text/40 p-4 text-sm font-body focus:border-tpa-gold focus:ring-2 focus:ring-tpa-gold/20 outline-none transition-all resize-y"
                />
              </div>
            </div>
          </div>

          {/* Availability */}
          <div className="bg-white rounded-xl border border-tpa-border p-6">
            <h3 className="text-lg font-semibold font-heading text-tpa-text mb-4">Availability</h3>
            <div>
              <label className="block text-sm font-medium font-body text-tpa-text mb-1">
                When are you available to start?
              </label>
              <input
                type="text"
                value={form.availability}
                onChange={(e) => setForm({ ...form, availability: e.target.value })}
                placeholder="e.g., Immediately, 2 weeks notice, April 2026"
                className="w-full rounded-lg border border-tpa-border bg-white text-tpa-text placeholder-tpa-text/40 px-4 py-2.5 text-sm font-body focus:border-tpa-gold focus:ring-2 focus:ring-tpa-gold/20 outline-none transition-all"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center px-10 py-3 rounded-xl bg-tpa-gold text-tpa-dark font-semibold font-body hover:bg-tpa-gold-light transition-colors disabled:opacity-50 gap-2"
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
                "Submit Application"
              )}
            </button>
            <p className="text-xs font-body text-tpa-text/40 mt-4">
              By submitting, you agree to Prompt Academy reviewing and potentially submitting your application on your behalf.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
