"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { getJobById } from "@/lib/mock-jobs";
import { getJobFromFirestore } from "@/lib/firebase/jobs";
import { Job } from "@/lib/types";
import { PageMotion, tapProps } from "@/components/motion";

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
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <p className="text-comet-muted font-body text-sm">Loading...</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <h1 className="font-heading font-bold text-2xl text-comet-text mb-4">
          Job Not Found
        </h1>
        <Link
          href="/jobs"
          className="text-sm text-comet-indigo hover:underline font-body"
        >
          ← Browse Jobs
        </Link>
      </div>
    );
  }

  return (
    <PageMotion>
      {/* Header */}
      <div className="bg-white border-b border-comet-border">
        <div className="max-w-xl mx-auto px-4 sm:px-6 py-8">
          <nav className="flex items-center gap-1.5 text-xs font-body text-comet-muted mb-5">
            <Link
              href="/jobs"
              className="hover:text-comet-text transition-colors"
            >
              Jobs
            </Link>
            <span>/</span>
            <Link
              href={`/jobs/${id}`}
              className="hover:text-comet-text transition-colors truncate"
            >
              {job.title}
            </Link>
            <span>/</span>
            <span className="text-comet-text">Apply</span>
          </nav>

          <h1 className="font-heading font-bold text-2xl text-comet-text mb-2 uppercase tracking-tight">
            Apply for {job.title}
          </h1>
          <p className="text-sm font-body text-comet-muted">
            Complete screening to apply via Comet · ~10 minutes
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-xl mx-auto px-4 sm:px-6 py-10">
        <p className="text-sm font-body text-comet-muted leading-relaxed mb-8">
          Before submitting your application, we&apos;ll ask you 3 short
          questions to assess fit. Your answers help us match you accurately —
          and give you better odds of an interview.
        </p>

        {/* Role summary */}
        <div className="border border-comet-border rounded-lg p-5 mb-8 bg-comet-surface">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-md bg-comet-indigo-lt border border-comet-border flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-bold font-heading text-comet-indigo">
                C
              </span>
            </div>
            <div>
              <p className="font-heading font-semibold text-sm text-comet-text">
                {job.title}
              </p>
              <p className="text-xs font-body text-comet-muted">
                {job.location}
              </p>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="space-y-3">
          <motion.div {...tapProps}>
            <Link
              href={`/screening/${id}`}
              className="block w-full text-center px-6 py-3 rounded-md bg-comet-indigo text-white text-sm font-medium font-body hover:bg-[#3730A3] transition-colors"
            >
              Start screening →
            </Link>
          </motion.div>
        </div>

        <p className="text-xs font-body text-comet-muted/60 text-center mt-6">
          Screening does not guarantee an interview or offer.
        </p>
      </div>
    </PageMotion>
  );
}
