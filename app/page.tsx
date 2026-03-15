"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { mockJobs } from "@/lib/mock-jobs";
import { Job } from "@/lib/types";
import { subscribeToActiveJobs } from "@/lib/firebase/jobs";
import { Starfield } from "@/components/starfield";
import { JobCard } from "@/components/job-card";
import {
  PageMotion,
  FadeInSection,
  StaggerList,
  StaggerItem,
  tapProps,
} from "@/components/motion";

export default function HomePage() {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>(mockJobs.filter((j) => j.is_active));
  const [heroSearch, setHeroSearch] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const unsub = subscribeToActiveJobs((firestoreJobs) => {
      if (firestoreJobs.length > 0) setJobs(firestoreJobs);
    });
    return unsub;
  }, []);

  const featuredJobs = jobs.slice(0, 3);

  const handleHeroSearch = () => {
    const q = heroSearch.trim();
    if (q) {
      router.push(`/jobs?search=${encodeURIComponent(q)}`);
    } else {
      router.push("/jobs");
    }
  };

  return (
    <PageMotion>
      {/* ── Hero ── */}
      <section className="relative min-h-[85vh] flex flex-col bg-[#09090F] overflow-visible border-b border-white/5">
        {/* Starfield */}
        <Starfield />

        {/* Radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(67,56,202,0.18)_0%,transparent_70%)]" />

        {/* Bottom gradient fade — stars dissolve before card peek */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#09090F] via-[#09090F]/70 to-transparent pointer-events-none z-10" />

        {/* Hero content — centered */}
        <div className="relative z-10 flex flex-col items-center text-center px-4 pt-32 pb-48 flex-1">
          {/* Eyebrow */}
          <p className="text-xs tracking-[0.25em] uppercase text-white/40 mb-6 font-body font-medium">
            Roles Worth Applying For
          </p>

          {/* H1 */}
          <h1 className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight max-w-4xl mb-6 uppercase tracking-tight">
            Your next role,{" "}
            <span className="text-[#F97316]">already shortlisted.</span>
          </h1>

          {/* Subline */}
          <p className="text-white/60 text-base sm:text-lg max-w-lg mb-8 font-body leading-relaxed">
            Browse hand-picked roles from top companies. Apply once — we handle
            the screening and make the introduction.
          </p>

          {/* Hero search bar */}
          <div className="w-full max-w-2xl">
            <div className="flex items-center bg-white rounded-xl shadow-2xl overflow-hidden">
              <Search
                size={18}
                className="ml-4 text-comet-muted flex-shrink-0"
              />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search roles, companies, or skills..."
                value={heroSearch}
                onChange={(e) => setHeroSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleHeroSearch()}
                className="flex-1 px-3 py-4 text-comet-text outline-none text-sm font-body placeholder:text-comet-muted/60"
              />
              <motion.button
                {...tapProps}
                onClick={handleHeroSearch}
                className="m-1.5 px-5 py-2.5 bg-comet-indigo text-white text-sm font-medium font-body rounded-lg hover:bg-[#3730A3] transition-colors flex-shrink-0"
              >
                Search
              </motion.button>
            </div>

            {/* Ghost link below search */}
            <div className="mt-4">
              <Link
                href="/about"
                className="text-sm font-body text-white/40 hover:text-white/70 transition-colors"
              >
                Hiring? Let&apos;s talk →
              </Link>
            </div>
          </div>
        </div>

        {/* Peeking job cards — overlap into section below */}
        <div className="absolute bottom-0 left-0 right-0 z-20 px-4 sm:px-8 translate-y-1/2">
          <StaggerList className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
            {featuredJobs.map((job) => (
              <StaggerItem key={job.id}>
                <JobCard job={job} />
              </StaggerItem>
            ))}
          </StaggerList>
        </div>
      </section>

      {/* ── Spacer for overlapping cards + "View all" link ── */}
      <FadeInSection>
        <section className="bg-comet-surface border-b border-comet-border pt-44 pb-10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <p className="text-xs font-body font-medium tracking-widest uppercase text-comet-muted">
                Featured roles
              </p>
              <Link
                href="/jobs"
                className="text-sm font-medium font-body text-comet-indigo hover:underline"
              >
                View all {jobs.length} roles →
              </Link>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* ── How It Works ── */}
      <FadeInSection delay={0.05}>
        <section id="how-it-works" className="bg-white border-b border-comet-border">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid md:grid-cols-2 gap-12">
              {/* For Job Seekers */}
              <div>
                <p className="text-xs font-body font-medium tracking-widest uppercase text-comet-muted mb-4">
                  For Job Seekers
                </p>
                <h2 className="font-heading font-bold text-2xl text-comet-text mb-8 uppercase tracking-tight">
                  Apply smarter.
                </h2>
                <ol className="space-y-6">
                  {[
                    [
                      "Browse curated roles",
                      "Every listing is hand-picked — no noise, no scraped junk.",
                    ],
                    [
                      "Apply in minutes — no cover letter needed",
                      "Answer a few focused questions that show your fit.",
                    ],
                    [
                      "We screen and advocate for you",
                      "We deliver your profile directly to the hiring team with our endorsement.",
                    ],
                  ].map(([title, desc], i) => (
                    <li key={i} className="flex gap-5">
                      <span className="font-heading font-bold text-2xl text-comet-indigo/20 leading-none w-8 flex-shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="font-heading font-semibold text-sm text-comet-text mb-1">
                          {title}
                        </p>
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
                <h2 className="font-heading font-semibold text-xl text-comet-text mb-8 uppercase tracking-tight">
                  Only interview the best.
                </h2>
                <ol className="space-y-6">
                  {[
                    [
                      "Tell us what you need",
                      "Share your role — paste a URL or brief us directly.",
                    ],
                    [
                      "We source and pre-screen candidates",
                      "Every applicant is assessed against your criteria before you see them.",
                    ],
                    [
                      "You only interview the best",
                      "Your shortlist arrives with summaries, ready to go.",
                    ],
                  ].map(([title, desc], i) => (
                    <li key={i} className="flex gap-5">
                      <span className="font-heading font-bold text-2xl text-comet-indigo/20 leading-none w-8 flex-shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="font-heading font-semibold text-sm text-comet-text mb-1">
                          {title}
                        </p>
                        <p className="text-sm text-comet-muted font-body">{desc}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* ── Why Comet ── */}
      <FadeInSection delay={0.05}>
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
      </FadeInSection>

      {/* ── Footer CTA ── */}
      <FadeInSection delay={0.05}>
        <section className="bg-white">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 text-center">
            <h2 className="font-heading font-bold text-2xl text-comet-text mb-3 uppercase tracking-tight">
              Ready to find your next role?
            </h2>
            <p className="text-comet-muted font-body mb-8 text-sm">
              Hand-picked roles, fast screening, direct introductions.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <motion.div {...tapProps}>
                <Link
                  href="/jobs"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-comet-indigo text-white text-sm font-medium font-body hover:bg-[#3730A3] transition-colors"
                >
                  Browse open roles →
                </Link>
              </motion.div>
              <motion.div {...tapProps}>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-md border border-comet-border text-comet-text text-sm font-medium font-body hover:bg-comet-surface transition-colors"
                >
                  Hiring? Let&apos;s talk →
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      </FadeInSection>
    </PageMotion>
  );
}
