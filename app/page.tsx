"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SearchBar } from "@/components/search-bar";
import { JobCard } from "@/components/job-card";
import { RevealOnScroll, StaggerChildren } from "@/components/reveal-on-scroll";
import { mockJobs } from "@/lib/mock-data";
import { Job } from "@/lib/types";
import { subscribeToActiveJobs } from "@/lib/firebase/jobs";

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

  const featuredJobs = jobs.slice(0, 4);

  return (
    <div className="animate-page-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-tpa-dark via-tpa-dark-secondary to-tpa-dark">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(196,162,101,0.15) 0%, transparent 50%),
                              radial-gradient(circle at 75% 75%, rgba(196,162,101,0.1) 0%, transparent 50%)`
          }} />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
          <div className="text-center max-w-3xl mx-auto">
            <div className="animate-hero-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-tpa-gold/10 border border-tpa-gold/30 text-tpa-gold text-sm font-body mb-6">
              <span className="w-2 h-2 rounded-full bg-tpa-gold animate-pulse" />
              {jobs.length} open positions
            </div>
            <h1 className="animate-hero-title text-4xl sm:text-5xl lg:text-6xl font-bold text-tpa-hero-text mb-6 tracking-tight font-heading">
              Find Your Next{" "}
              <em className="text-tpa-gold italic">AI Career</em>
            </h1>
            <p className="animate-hero-subtitle text-lg sm:text-xl text-tpa-hero-text/70 mb-10 max-w-2xl mx-auto font-body">
              Real AI jobs, curated by Prompt Academy. Apply through our screening channel for a stronger application, or apply directly to the employer.
            </p>

            {/* Search */}
            <div className="animate-hero-search max-w-2xl mx-auto mb-6">
              <SearchBar size="large" />
            </div>

            {/* Trust strip */}
            <div className="animate-hero-trust flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-tpa-hero-text/60 font-body">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-tpa-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                Real external jobs
              </span>
              <span className="text-tpa-hero-text/30 hidden sm:inline">·</span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-tpa-gold" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Curated by Prompt Academy
              </span>
              <span className="text-tpa-hero-text/30 hidden sm:inline">·</span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-tpa-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                AI proficiency screening
              </span>
              <span className="text-tpa-hero-text/30 hidden sm:inline">·</span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-tpa-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Candidate support
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-16 sm:py-20 bg-tpa-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-sm font-body text-tpa-gold font-semibold tracking-wider uppercase mb-2">
                  <span className="mr-1.5">◆</span>Opportunities
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold font-heading text-tpa-text mb-2">
                  Featured <em className="italic text-tpa-gold-dark">Jobs</em>
                </h2>
                <p className="text-tpa-text/60 font-body">
                  Latest AI opportunities curated by Prompt Academy
                </p>
              </div>
              <Link
                href="/jobs"
                className="hidden sm:inline-flex items-center gap-1 text-sm font-medium font-body text-tpa-gold-dark hover:text-tpa-gold link-underline"
              >
                View all jobs
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </RevealOnScroll>

          <StaggerChildren className="space-y-4" staggerDelay={120}>
            {featuredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </StaggerChildren>

          <RevealOnScroll delay={400}>
            <div className="text-center mt-8">
              <Link
                href="/jobs"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-tpa-gold text-tpa-dark font-semibold font-body btn-gold-shimmer btn-hover hover:bg-tpa-gold-light transition-colors"
              >
                Browse All Jobs
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 sm:py-20 bg-tpa-cream-light">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="text-center mb-12">
              <p className="text-sm font-body text-tpa-gold font-semibold tracking-wider uppercase mb-3">
                <span className="mr-1.5">◆</span>How It Works
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-tpa-text mb-3">
                Your Path to <em className="italic text-tpa-gold-dark">AI Careers</em>
              </h2>
              <p className="text-tpa-text/60 font-body max-w-xl mx-auto">
                Apply through Prompt Academy&apos;s curated channel for a stronger, certified application.
              </p>
            </div>
          </RevealOnScroll>

          <StaggerChildren className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={120}>
            {[
              {
                step: "01",
                title: "Browse Jobs",
                description: "Explore curated AI roles from verified external employers across industries.",
                icon: (
                  <svg className="w-6 h-6 text-tpa-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                ),
              },
              {
                step: "02",
                title: "Apply Through TPA",
                description: "Choose to apply through Prompt Academy's application channel for enhanced positioning.",
                icon: (
                  <svg className="w-6 h-6 text-tpa-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                ),
              },
              {
                step: "03",
                title: "Complete Screening",
                description: "Demonstrate your AI proficiency through our standardized assessment process.",
                icon: (
                  <svg className="w-6 h-6 text-tpa-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
              },
              {
                step: "04",
                title: "Get Certified",
                description: "Earn your TPA certification and join our network of verified AI professionals.",
                icon: (
                  <svg className="w-6 h-6 text-tpa-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                ),
              },
            ].map((item) => (
              <div key={item.step} className="relative bg-white rounded-xl border border-tpa-border p-6 text-center card-hover">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-tpa-gold text-tpa-dark text-xs font-bold font-body px-3 py-1 rounded-full">
                  {item.step}
                </div>
                <div className="w-12 h-12 rounded-xl bg-tpa-gold/10 border border-tpa-gold/20 flex items-center justify-center mx-auto mb-4 mt-2">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold font-heading text-tpa-text mb-2">{item.title}</h3>
                <p className="text-sm font-body text-tpa-text/60">{item.description}</p>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Why Prompt Academy */}
      <section id="for-employers" className="py-16 sm:py-20 bg-tpa-dark">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="text-center mb-12">
              <p className="text-sm font-body text-tpa-gold font-semibold tracking-wider uppercase mb-3">
                <span className="mr-1.5">◆</span>Why Prompt Academy
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-tpa-hero-text mb-3">
                A Better Way to <em className="italic text-tpa-gold">Apply</em>
              </h2>
              <p className="text-tpa-hero-text/60 font-body max-w-xl mx-auto">
                Stand out with verified AI proficiency. Our screening process validates your skills so employers know you&apos;re ready.
              </p>
            </div>
          </RevealOnScroll>

          <StaggerChildren className="grid sm:grid-cols-3 gap-8" staggerDelay={150}>
            <div className="text-center p-6 rounded-xl bg-tpa-dark-secondary/50 border border-tpa-dark-secondary card-hover">
              <div className="w-12 h-12 rounded-xl bg-tpa-gold/10 border border-tpa-gold/20 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-tpa-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold font-heading text-tpa-hero-text mb-2">Curated Opportunities</h3>
              <p className="text-sm font-body text-tpa-hero-text/60">
                Every job is hand-picked and verified. Real roles at real companies, not aggregated spam.
              </p>
            </div>
            <div className="text-center p-6 rounded-xl bg-tpa-dark-secondary/50 border border-tpa-dark-secondary card-hover">
              <div className="w-12 h-12 rounded-xl bg-tpa-gold/10 border border-tpa-gold/20 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-tpa-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold font-heading text-tpa-hero-text mb-2">Skill Validation</h3>
              <p className="text-sm font-body text-tpa-hero-text/60">
                Our AI proficiency screening proves your capabilities. Pass once, apply to many roles through our channel.
              </p>
            </div>
            <div className="text-center p-6 rounded-xl bg-tpa-dark-secondary/50 border border-tpa-dark-secondary card-hover">
              <div className="w-12 h-12 rounded-xl bg-tpa-gold/10 border border-tpa-gold/20 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-tpa-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold font-heading text-tpa-hero-text mb-2">Candidate Support</h3>
              <p className="text-sm font-body text-tpa-hero-text/60">
                Didn&apos;t pass? Get personalized feedback and recommended training. We help you improve, not just filter.
              </p>
            </div>
          </StaggerChildren>
        </div>
      </section>

      {/* Career Resources Teaser */}
      <section id="resources" className="py-16 sm:py-20 bg-tpa-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="text-center mb-12">
              <p className="text-sm font-body text-tpa-gold font-semibold tracking-wider uppercase mb-3">
                <span className="mr-1.5">◆</span>Career Resources
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-tpa-text mb-3">
                Level Up Your <em className="italic text-tpa-gold-dark">AI Skills</em>
              </h2>
            </div>
          </RevealOnScroll>

          <StaggerChildren className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={100}>
            {[
              { title: "AI Job Readiness", description: "Prepare for AI-focused interviews and assessments", icon: "🎯" },
              { title: "Prompt Skills", description: "Master the art of effective prompt engineering", icon: "✍️" },
              { title: "Automation Fundamentals", description: "Learn to build AI-powered workflows", icon: "⚙️" },
              { title: "Role-Based Prep", description: "Targeted preparation for specific AI roles", icon: "📋" },
            ].map((resource) => (
              <a
                key={resource.title}
                href="https://thepromptacademy.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-xl border border-tpa-border p-6 card-hover hover:border-tpa-gold/40"
              >
                <span className="text-3xl mb-3 block">{resource.icon}</span>
                <h3 className="text-base font-semibold font-heading text-tpa-text mb-1 group-hover:text-tpa-gold-dark transition-colors">
                  {resource.title}
                </h3>
                <p className="text-sm font-body text-tpa-text/60">{resource.description}</p>
              </a>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 sm:py-20 bg-tpa-dark-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <RevealOnScroll>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-tpa-hero-text mb-4">
              Ready to Start Your <em className="italic text-tpa-gold">AI Career</em>?
            </h2>
            <p className="text-tpa-hero-text/60 font-body mb-8 max-w-xl mx-auto">
              Browse curated AI jobs and apply through Prompt Academy&apos;s trusted screening channel. Your next role is waiting.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/jobs"
                className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-tpa-gold text-tpa-dark font-semibold font-body btn-gold-shimmer btn-hover hover:bg-tpa-gold-light transition-colors"
              >
                Explore Jobs
              </Link>
              <a
                href="https://thepromptacademy.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3 rounded-xl border-2 border-tpa-gold/30 text-tpa-gold font-semibold font-body hover:bg-tpa-gold/10 transition-colors"
              >
                See How Certification Works
              </a>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}
