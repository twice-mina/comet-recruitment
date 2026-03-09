"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getJobById } from "@/lib/mock-data";

interface ScreeningData {
  passed: boolean;
  score: number;
}

export default function ScreeningResultClient() {
  const params = useParams();
  const id = params.id as string;
  const job = getJobById(id);

  const [result, setResult] = useState<ScreeningData | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem(`screening_${id}`);
      if (stored) {
        setResult(JSON.parse(stored));
      } else {
        // Default: pass for demo
        setResult({ passed: true, score: 82 });
      }
    }
  }, [id]);

  if (!job || !result) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <p className="text-tpa-text/60 font-body">Loading results...</p>
      </div>
    );
  }

  if (result.passed) {
    return <PassResult job={job} score={result.score} />;
  }

  return <FailResult job={job} score={result.score} />;
}

function PassResult({ job, score }: { job: ReturnType<typeof getJobById>; score: number }) {
  if (!job) return null;

  return (
    <div>
      <div className="bg-tpa-dark border-b border-tpa-dark-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 text-center">
          <div className="w-16 h-16 rounded-full bg-green-500/20 border-2 border-green-500/40 flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-tpa-hero-text mb-3">
            You&apos;ve Met Prompt Academy&apos;s AI Proficiency Standard
          </h1>
          <p className="text-tpa-hero-text/60 font-body max-w-lg mx-auto">
            You passed! You&apos;re eligible to apply through Prompt Academy&apos;s channel for {job.title}.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-sm font-body">
            Score: {score}/100
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Badge Preview */}
        <div className="bg-white rounded-xl border border-tpa-border p-8 mb-10 text-center">
          <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-tpa-gold to-tpa-gold-dark flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-tpa-dark" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold font-heading text-tpa-text mb-1">AI Proficiency — Verified</h3>
          <p className="text-sm font-body text-tpa-text/50">The Prompt Academy</p>
          <p className="text-xs font-body text-tpa-text/40 mt-1">Screening passed • {new Date().toLocaleDateString()}</p>
        </div>

        {/* Upsell: Official Certification */}
        <div className="bg-tpa-dark/5 rounded-xl border border-tpa-border p-8 mb-10">
          <div className="text-center mb-6">
            <p className="text-sm font-body text-tpa-gold font-semibold tracking-wider uppercase mb-2">
              <span className="mr-1.5">◆</span>Enhance Your Application
            </p>
            <h2 className="text-xl font-semibold font-heading text-tpa-text mb-2">
              Get Official TPA Certification
            </h2>
            <p className="text-sm font-body text-tpa-text/60 max-w-lg mx-auto">
              Stand out even more with an official Prompt Academy certification. Employers recognize these credentials.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                name: "Foundation",
                price: "$39",
                description: "AI basics and prompt fundamentals",
                features: ["AI literacy certification", "Digital badge", "Valid for 1 year"],
              },
              {
                name: "Professional",
                price: "$149",
                description: "Advanced prompt engineering and workflows",
                features: ["Professional certification", "Portfolio review", "Priority support", "Valid for 2 years"],
                highlighted: true,
              },
              {
                name: "Executive",
                price: "$349",
                description: "AI strategy and leadership",
                features: ["Executive certification", "1-on-1 coaching session", "Industry recognition", "Valid for 3 years"],
              },
            ].map((tier) => (
              <a
                key={tier.name}
                href="https://thepromptacademy.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`block rounded-xl border p-5 hover:shadow-md transition-all ${
                  tier.highlighted
                    ? "border-tpa-gold bg-white shadow-sm"
                    : "border-tpa-border bg-white"
                }`}
              >
                {tier.highlighted && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium font-body bg-tpa-gold/10 text-tpa-gold mb-2">
                    Most Popular
                  </span>
                )}
                <h4 className="text-base font-semibold font-heading text-tpa-text">{tier.name}</h4>
                <p className="text-2xl font-bold font-heading text-tpa-gold-dark mt-1">{tier.price}</p>
                <p className="text-xs font-body text-tpa-text/50 mt-1 mb-3">{tier.description}</p>
                <ul className="space-y-1.5">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-center gap-1.5 text-xs font-body text-tpa-text/60">
                      <svg className="w-3 h-3 text-tpa-gold flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </a>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={`/apply/${job.id}/submit`}
            className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-tpa-gold text-tpa-dark font-semibold font-body hover:bg-tpa-gold-light transition-colors"
          >
            Continue to Application
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link
            href={`/jobs/${job.id}`}
            className="inline-flex items-center justify-center px-8 py-3 rounded-xl border-2 border-tpa-border text-tpa-text/70 font-semibold font-body hover:border-tpa-gold/40 transition-colors"
          >
            Return to Job Details
          </Link>
        </div>
      </div>
    </div>
  );
}

function FailResult({ job, score }: { job: ReturnType<typeof getJobById>; score: number }) {
  if (!job) return null;

  const skillGaps = [
    { name: "Prompt Clarity", score: 35, recommendation: "Focus on structured prompting techniques" },
    { name: "Automation Reasoning", score: 50, recommendation: "Practice workflow design with AI tools" },
    { name: "AI Workflow Use Cases", score: 40, recommendation: "Study real-world AI integration patterns" },
    { name: "Applied Tool Fluency", score: 55, recommendation: "Get hands-on with multiple AI platforms" },
  ];

  return (
    <div>
      <div className="bg-tpa-dark border-b border-tpa-dark-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 text-center">
          <div className="w-16 h-16 rounded-full bg-amber-500/20 border-2 border-amber-500/40 flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-tpa-hero-text mb-3">
            You Don&apos;t Yet Meet Prompt Academy&apos;s Standard
          </h1>
          <p className="text-tpa-hero-text/60 font-body max-w-lg mx-auto">
            You don&apos;t currently meet our AI proficiency standard for submission through this channel. But that&apos;s okay — here&apos;s how to get there.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-body">
            Score: {score}/100 · Passing: 70/100
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Skill Gap Categories */}
        <div className="bg-white rounded-xl border border-tpa-border p-8 mb-10">
          <h2 className="text-xl font-semibold font-heading text-tpa-text mb-6">
            <span className="text-tpa-gold mr-1.5">◆</span>Your Skill Gap Analysis
          </h2>
          <div className="space-y-6">
            {skillGaps.map((gap) => (
              <div key={gap.name}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold font-body text-tpa-text">{gap.name}</span>
                  <span className={`text-sm font-body ${gap.score >= 60 ? "text-green-600" : "text-amber-600"}`}>
                    {gap.score}/100
                  </span>
                </div>
                <div className="w-full bg-tpa-cream rounded-full h-2 mb-2">
                  <div
                    className={`rounded-full h-2 transition-all ${gap.score >= 60 ? "bg-green-500" : "bg-amber-500"}`}
                    style={{ width: `${gap.score}%` }}
                  />
                </div>
                <p className="text-xs font-body text-tpa-text/50">{gap.recommendation}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Courses */}
        <div className="bg-tpa-dark/5 rounded-xl border border-tpa-border p-8 mb-10">
          <h2 className="text-xl font-semibold font-heading text-tpa-text mb-2">
            <span className="text-tpa-gold mr-1.5">◆</span>Recommended Training
          </h2>
          <p className="text-sm font-body text-tpa-text/60 mb-6">
            Based on your results, we recommend these Prompt Academy programs to build your skills:
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { name: "AI Foundations", duration: "4 weeks", price: "$39", desc: "Build core AI literacy and prompt engineering skills" },
              { name: "Prompt Engineering Pro", duration: "6 weeks", price: "$149", desc: "Advanced prompt techniques, chain-of-thought, and evaluation" },
              { name: "AI Workflow Automation", duration: "4 weeks", price: "$99", desc: "Design and implement AI-powered business workflows" },
              { name: "Applied AI Tools", duration: "3 weeks", price: "$79", desc: "Hands-on experience with production AI platforms" },
            ].map((course) => (
              <a
                key={course.name}
                href="https://thepromptacademy.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white rounded-xl border border-tpa-border p-5 hover:border-tpa-gold/40 hover:shadow-md transition-all"
              >
                <h4 className="text-base font-semibold font-heading text-tpa-text mb-1">{course.name}</h4>
                <div className="flex items-center gap-2 text-xs font-body text-tpa-text/50 mb-2">
                  <span>{course.duration}</span>
                  <span>·</span>
                  <span className="text-tpa-gold-dark font-semibold">{course.price}</span>
                </div>
                <p className="text-sm font-body text-tpa-text/60">{course.desc}</p>
              </a>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://thepromptacademy.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-tpa-gold text-tpa-dark font-semibold font-body hover:bg-tpa-gold-light transition-colors"
          >
            Start Recommended Training
          </a>
          <Link
            href={`/jobs/${job.id}`}
            className="inline-flex items-center justify-center px-8 py-3 rounded-xl border-2 border-tpa-border text-tpa-text/70 font-semibold font-body hover:border-tpa-gold/40 transition-colors"
          >
            Save This Role
          </Link>
          <Link
            href="/jobs"
            className="inline-flex items-center justify-center px-8 py-3 rounded-xl border-2 border-tpa-border text-tpa-text/70 font-semibold font-body hover:border-tpa-gold/40 transition-colors"
          >
            Browse Related Roles
          </Link>
        </div>

        <p className="text-xs font-body text-tpa-text/40 text-center mt-8">
          You can also apply directly to the employer without going through Prompt Academy&apos;s screening channel.
        </p>
      </div>
    </div>
  );
}
