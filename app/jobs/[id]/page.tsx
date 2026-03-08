"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { getJobById } from "@/lib/mock-data";
import { formatSalary, formatDate, jobTypeBadgeColor } from "@/lib/format";
import { cn } from "@/lib/utils";

export default function JobDetailPage() {
  const params = useParams();
  const job = getJobById(params.id as string);

  if (!job) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <div className="text-5xl mb-4">😕</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Job Not Found
        </h1>
        <p className="text-gray-600 mb-6">
          This job listing may have been removed or doesn&apos;t exist.
        </p>
        <Link
          href="/jobs"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors"
        >
          ← Browse All Jobs
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/jobs" className="hover:text-indigo-600 transition-colors">
          Jobs
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-medium truncate">{job.title}</span>
      </nav>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Header */}
          <div>
            <div className="flex items-center gap-3 flex-wrap mb-3">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {job.title}
              </h1>
              {job.tpa_certification_preferred && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-700">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  TPA Certification Preferred
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 text-gray-600 mb-4">
              <span className="font-semibold text-gray-900">{job.company}</span>
              <span className="text-gray-300">•</span>
              <span>{job.location}</span>
              <span className="text-gray-300">•</span>
              <span>{formatDate(job.posted_date)}</span>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={cn(
                  "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium capitalize",
                  jobTypeBadgeColor(job.job_type)
                )}
              >
                {job.job_type}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
                {job.category}
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              About the Role
            </h2>
            <div className="prose prose-gray max-w-none">
              {job.description.split("\n").map((paragraph, i) => (
                <p key={i} className="text-gray-700 leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Requirements */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Requirements
            </h2>
            <ul className="space-y-3">
              {job.requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-indigo-500 mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-700">{req}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            {/* Apply card */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="text-center mb-6">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {formatSalary(job.salary_min, job.salary_max)}
                </div>
                <div className="text-sm text-gray-500">per year</div>
              </div>

              <a
                href={job.apply_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors mb-3"
              >
                Apply Now
              </a>

              <p className="text-xs text-gray-500 text-center">
                You&apos;ll be redirected to the company&apos;s application page
              </p>
            </div>

            {/* Company info */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-3">
                About {job.company}
              </h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {job.location}
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  {job.category}
                </div>
              </div>
            </div>

            {/* Share */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-3">
                Share This Job
              </h3>
              <p className="text-sm text-gray-600">
                Know someone who&apos;d be a great fit? Share this opportunity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
