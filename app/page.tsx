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
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoLTJ2LTZoMnptMC0zMHY2aC0yVjRoMnptMCAxMHY2aC0ydi02aDJ6bTAgMTB2NmgtMnYtNmgyem0xNiA0djZoLTJ2LTZoMnptMC0zMHY2aC0yVjRoMnptMCAxMHY2aC0ydi02aDJ6bTAgMTB2NmgtMnYtNmgyem0tMzIgNHY2aC0ydi02aDJ6bTAtMzB2NmgtMlY0aDJ6bTAgMTB2NmgtMnYtNmgyem0wIDEwdjZoLTJ2LTZoMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              {mockJobs.filter((j) => j.is_active).length} open positions
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
              Find Your Next{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-indigo-200">
                AI Career
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
              The Prompt Academy connects certified AI professionals with
              forward-thinking employers. Discover roles in prompt engineering,
              machine learning, and beyond.
            </p>

            {/* Search */}
            <div className="max-w-2xl mx-auto">
              <SearchBar size="large" />
            </div>

            {/* Quick stats */}
            <div className="flex items-center justify-center gap-8 mt-10 text-sm text-indigo-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">500+</div>
                <div>Companies Hiring</div>
              </div>
              <div className="w-px h-10 bg-white/20" />
              <div className="text-center">
                <div className="text-2xl font-bold text-white">2,000+</div>
                <div>Jobs Posted</div>
              </div>
              <div className="w-px h-10 bg-white/20" />
              <div className="text-center">
                <div className="text-2xl font-bold text-white">10k+</div>
                <div>TPA Graduates</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Browse by Category
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Explore AI roles across disciplines — from hands-on engineering to
              strategy and research.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {jobCountByCategory.map((cat) => (
              <Link
                key={cat.name}
                href={`/jobs?category=${encodeURIComponent(cat.name)}`}
                className="group flex flex-col items-center p-6 rounded-xl border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all duration-200 bg-white"
              >
                <span className="text-3xl mb-3">{cat.icon}</span>
                <span className="text-sm font-semibold text-gray-900 text-center mb-1">
                  {cat.name}
                </span>
                <span className="text-xs text-gray-500">
                  {cat.count} {cat.count === 1 ? "job" : "jobs"}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Featured Jobs
              </h2>
              <p className="text-gray-600">
                Latest opportunities from top AI companies
              </p>
            </div>
            <Link
              href="/jobs"
              className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700"
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
              className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700"
            >
              View all jobs →
            </Link>
          </div>
        </div>
      </section>

      {/* Why TPA */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Why Hire TPA-Certified Talent?
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              The Prompt Academy certification is the gold standard for AI
              professionals.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-indigo-600"
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
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Verified Skills
              </h3>
              <p className="text-sm text-gray-600">
                TPA graduates have demonstrated proficiency in prompt
                engineering, AI workflows, and responsible AI practices through
                rigorous assessment.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-purple-600"
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
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Production Ready
              </h3>
              <p className="text-sm text-gray-600">
                Our curriculum focuses on real-world applications. Graduates can
                hit the ground running with practical experience in AI tool
                integration and optimization.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-green-600"
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
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Growing Network
              </h3>
              <p className="text-sm text-gray-600">
                Access a community of 10,000+ AI professionals. TPA alumni work
                at leading tech companies and innovative startups around the
                globe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-indigo-600 to-purple-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready to Start Your AI Career?
          </h2>
          <p className="text-indigo-100 mb-8 max-w-xl mx-auto">
            Whether you&apos;re a TPA graduate or an employer looking for
            AI-skilled talent, we&apos;re here to help you connect.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/jobs"
              className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-white text-indigo-700 font-semibold hover:bg-indigo-50 transition-colors"
            >
              Browse All Jobs
            </Link>
            <a
              href="https://thepromptacademy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 rounded-xl border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-colors"
            >
              Get TPA Certified
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
