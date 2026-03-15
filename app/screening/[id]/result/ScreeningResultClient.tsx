"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getJobById } from "@/lib/mock-jobs";

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
        setResult({ passed: true, score: 82 });
      }
    }
  }, [id]);

  if (!job || !result) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <p className="text-comet-muted font-body text-sm">Loading results...</p>
      </div>
    );
  }

  return (
    <div className="animate-page-in">
      <div className="bg-white border-b border-comet-border">
        <div className="max-w-xl mx-auto px-4 sm:px-6 py-12 text-center">
          {result.passed ? (
            <>
              <div className="w-12 h-12 rounded-full bg-comet-indigo-lt border border-comet-indigo/20 flex items-center justify-center mx-auto mb-5">
                <svg className="w-5 h-5 text-comet-indigo" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-comet-streak font-heading font-bold text-5xl mb-2">
                {result.score}%
              </p>
              <h1 className="font-heading font-semibold text-xl text-comet-text mb-2">
                Screening passed
              </h1>
              <p className="text-sm font-body text-comet-muted max-w-sm mx-auto mb-8">
                Your application is being prepared. We&apos;ll be in touch within 48 hours with next steps and confirmation of submission to {job.employer_confidential ? "the employer" : job.company}.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href={`/apply/${job.id}/submit`}
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-md bg-comet-indigo text-white text-sm font-medium font-body hover:bg-[#3730A3] transition-colors"
                >
                  Continue to application →
                </Link>
                <Link
                  href="/jobs"
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-md border border-comet-border text-comet-muted text-sm font-body hover:text-comet-text transition-colors"
                >
                  Browse more roles
                </Link>
              </div>
            </>
          ) : (
            <>
              <p className="text-comet-muted font-heading font-bold text-5xl mb-2">
                {result.score}%
              </p>
              <h1 className="font-heading font-semibold text-xl text-comet-text mb-2">
                Not quite yet
              </h1>
              <p className="text-sm font-body text-comet-muted max-w-sm mx-auto mb-8">
                Your responses suggest you&apos;d benefit from more preparation before applying through Comet. You can still apply directly to the employer below.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={job.apply_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-md bg-comet-indigo text-white text-sm font-medium font-body hover:bg-[#3730A3] transition-colors"
                >
                  Apply directly →
                </a>
                <Link
                  href="/jobs"
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-md border border-comet-border text-comet-muted text-sm font-body hover:text-comet-text transition-colors"
                >
                  Browse other roles
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
