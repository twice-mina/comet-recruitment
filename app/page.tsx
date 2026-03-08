"use client";

import Link from "next/link";
import { SearchBar } from "@/components/search-bar";
import { JobCard } from "@/components/job-card";
import { mockJobs } from "@/lib/mock-data";
import { JOB_CATEGORIES } from "@/lib/types";

const categoryIcons: Record<string, string> = {
  "AI Engineering": "🤖",
  "Prompt Engineering": "✍️",
  "Data Science": "📊",
  "Machine Learning": "🧠",
  "Product Management": "📋",
  "Content & Marketing": "📝",
  Research: "🔬",
  Operations: "⚙️",
};

export default function HomePage() {
  const featuredJobs = mockJobs.filter((j) => j.is_active).slice(0, 4);
  const jobCountByCategory = JOB_CATEGORIES.map((cat) => ({
    name: cat,
    icon: categoryIcons[cat] || "💼",
    count: mockJobs.filter((j) => j.category === cat && j.is_active).length,
  }));

  return (
    <div>
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
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-tpa-gold/10 border border-tpa-gold/30 text-tpa-gold text-sm font-body mb-6">
              <span className="w-2 h-2 rounded-full bg-tpa-gold animate-pulse" />
              {mockJobs.filter((j) => j.is_active).length} open positions
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-tpa-hero-text mb-6 tracking-tight font-heading">
              Find Your Next{" "}
              <em className="text-tpa-gold italic">AI Career</em>
            </h1>
            <p className="text-lg sm:text-xl text-tpa-hero-text/70 mb-10 max-w-2xl mx-auto font-body">
              The Prompt Academy connects certified AI professionals with
              forward-thinking employers. Discover roles in prompt engineering,
              machine learning, and beyond.
            </p>

            {/* Search */}
            <div className="max-w-2xl mx-auto">
              <SearchBar size="large" />
            </div>

            {/* Quick stats */}
            <div className="flex items-center justify-center gap-8 mt-10 text-sm text-tpa-hero-text/60 font-body">
              <div className="text-center">
                <div className="text-2xl font-bold text-tpa-gold font-heading">500+</div>
                <div>Companies Hiring</div>
              </div>
              <div className="w-px h-10 bg-tpa-hero-text/20" />
              <div className="text-center">
                <div className="text-2xl font-bold text-tpa-gold font-heading">2,000+</div>
                <div>Jobs Posted</div>
              </div>
              <div className="w-px h-10 bg-tpa-hero-text/20" />
              <div className="text-center">
                <div className="text-2xl font-bold text-tpa-gold font-heading">10k+</div>
                <div>TPA Graduates</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 sm:py-20 bg-tpa-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-body text-tpa-gold font-semibold tracking-wider uppercase mb-3">
              <span className="mr-1.5">◆</span>Explore Roles
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-tpa-text mb-3">
              Browse by Category
            </h2>
            <p className="text-tpa-text/60 font-body max-w-xl mx-auto">
              Explore AI roles across disciplines — from hands-on engineering to
              strategy and research.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {jobCountByCategory.map((cat) => (
              <Link
                key={cat.name}
                href={`/jobs?category=${encodeURIComponent(cat.name)}`}
                className="group flex flex-col items-center p-6 rounded-xl border border-tpa-border hover:border-tpa-gold/40 hover:shadow-md transition-all duration-200 bg-white"
              >
                <span className="text-3xl mb-3">{cat.icon}</span>
                <span className="text-sm font-semibold font-heading text-tpa-text text-center mb-1">
                  {cat.name}
                </span>
                <span className="text-xs font-body text-tpa-text/50">
                  {cat.count} {cat.count === 1 ? "job" : "jobs"}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-16 sm:py-20 bg-tpa-cream-light">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-sm font-body text-tpa-gold font-semibold tracking-wider uppercase mb-2">
                <span className="mr-1.5">◆</span>Opportunities
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-tpa-text mb-2">
                Featured <em className="italic text-tpa-gold-dark">Jobs</em>
              </h2>
              <p className="text-tpa-text/60 font-body">
                Latest opportunities from top AI companies
              </p>
            </div>
            <Link
              href="/jobs"
              className="hidden sm:inline-flex items-center gap-1 text-sm font-medium font-body text-tpa-gold-dark hover:text-tpa-gold"
            >
              View all jobs
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>

          <div className="space-y-4">
            {featuredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>

          <div className="text-center mt-8 sm:hidden">
            <Link
              href="/jobs"
              className="inline-flex items-center gap-1 text-sm font-medium font-body text-tpa-gold-dark hover:text-tpa-gold"
            >
              View all jobs →
            </Link>
          </div>
        </div>
      </section>

      {/* Why TPA */}
      <section className="py-16 sm:py-20 bg-tpa-dark">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-body text-tpa-gold font-semibold tracking-wider uppercase mb-3">
              <span className="mr-1.5">◆</span>The TPA Advantage
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-tpa-hero-text mb-3">
              Why Hire <em className="italic text-tpa-gold">TPA-Certified</em> Talent?
            </h2>
            <p className="text-tpa-hero-text/60 font-body max-w-xl mx-auto">
              The Prompt Academy certification is the gold standard for AI
              professionals.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl bg-tpa-dark-secondary/50 border border-tpa-dark-secondary">
              <div className="w-12 h-12 rounded-xl bg-tpa-gold/10 border border-tpa-gold/20 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-tpa-gold"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold font-heading text-tpa-hero-text mb-2">
                Verified Skills
              </h3>
              <p className="text-sm font-body text-tpa-hero-text/60">
                TPA graduates have demonstrated proficiency in prompt
                engineering, AI workflows, and responsible AI practices through
                rigorous assessment.
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-tpa-dark-secondary/50 border border-tpa-dark-secondary">
              <div className="w-12 h-12 rounded-xl bg-tpa-gold/10 border border-tpa-gold/20 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-tpa-gold"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold font-heading text-tpa-hero-text mb-2">
                Production Ready
              </h3>
              <p className="text-sm font-body text-tpa-hero-text/60">
                Our curriculum focuses on real-world applications. Graduates can
                hit the ground running with practical experience in AI tool
                integration and optimization.
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-tpa-dark-secondary/50 border border-tpa-dark-secondary">
              <div className="w-12 h-12 rounded-xl bg-tpa-gold/10 border border-tpa-gold/20 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-tpa-gold"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold font-heading text-tpa-hero-text mb-2">
                Growing Network
              </h3>
              <p className="text-sm font-body text-tpa-hero-text/60">
                Access a community of 10,000+ AI professionals. TPA alumni work
                at leading tech companies and innovative startups around the
                globe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-tpa-dark-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-tpa-hero-text mb-4">
            Ready to Start Your <em className="italic text-tpa-gold">AI Career</em>?
          </h2>
          <p className="text-tpa-hero-text/60 font-body mb-8 max-w-xl mx-auto">
            Whether you&apos;re a TPA graduate or an employer looking for
            AI-skilled talent, we&apos;re here to help you connect.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/jobs"
              className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-tpa-gold text-tpa-dark font-semibold font-body hover:bg-tpa-gold-light transition-colors"
            >
              Browse All Jobs
            </Link>
            <a
              href="https://thepromptacademy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 rounded-xl border-2 border-tpa-gold/30 text-tpa-gold font-semibold font-body hover:bg-tpa-gold/10 transition-colors"
            >
              Get TPA Certified
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
