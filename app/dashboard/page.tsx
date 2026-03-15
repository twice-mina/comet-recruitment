"use client";

import { useState } from "react";
import Link from "next/link";

const tabs = [
  { id: "applications", label: "My Applications" },
  { id: "certification", label: "My Certification" },
  { id: "recommended", label: "Recommended Jobs" },
  { id: "saved", label: "Saved Roles" },
];

// Mock data for demo
const mockApplications = [
  {
    id: "app-1",
    jobTitle: "Senior Prompt Engineer",
    company: "NexusAI Labs",
    status: "applied",
    submittedAt: "2026-03-08",
    screeningScore: 82,
  },
  {
    id: "app-2",
    jobTitle: "AI Content Strategist",
    company: "ContentCraft AI",
    status: "under_review",
    submittedAt: "2026-03-05",
    screeningScore: 78,
  },
];

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    screening: "bg-amber-100 text-amber-800",
    passed: "bg-green-100 text-green-800",
    failed: "bg-red-100 text-red-800",
    applied: "bg-blue-100 text-blue-800",
    under_review: "bg-purple-100 text-purple-800",
  };

  const labels: Record<string, string> = {
    screening: "Screening",
    passed: "Passed",
    failed: "Not Passed",
    applied: "Applied",
    under_review: "Under Review",
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium font-body ${styles[status] || "bg-gray-100 text-gray-800"}`}>
      {labels[status] || status}
    </span>
  );
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("applications");

  return (
    <div className="animate-page-in">
      {/* Header */}
      <div className="bg-tpa-dark border-b border-tpa-dark-secondary">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <p className="animate-hero-badge text-sm font-body text-tpa-gold font-semibold tracking-wider uppercase mb-2">
            <span className="mr-1.5">◆</span>Dashboard
          </p>
          <h1 className="animate-hero-title text-3xl sm:text-4xl font-bold font-heading text-tpa-hero-text mb-3">
            Your <em className="italic text-tpa-gold">Dashboard</em>
          </h1>
          <p className="animate-hero-subtitle text-tpa-hero-text/60 font-body">
            Track your applications, certifications, and recommended roles.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto border-b border-tpa-border pb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium font-body whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? "bg-tpa-gold text-tpa-dark"
                  : "text-tpa-text/70 hover:text-tpa-text hover:bg-tpa-cream"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* My Applications */}
        {activeTab === "applications" && (
          <div>
            {mockApplications.length > 0 ? (
              <div className="space-y-4">
                {mockApplications.map((app) => (
                  <div key={app.id} className="bg-white rounded-xl border border-tpa-border p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-semibold font-heading text-tpa-text">{app.jobTitle}</h3>
                      </div>
                      <div className="flex items-center gap-3">
                        <StatusBadge status={app.status} />
                        <span className="text-xs font-body text-tpa-text/40">
                          Submitted {app.submittedAt}
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-4 text-xs font-body text-tpa-text/50">
                      <span>Screening Score: {app.screeningScore}/100</span>
                      <span>Applied through Prompt Academy</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon="📋"
                title="No applications yet"
                description="Start browsing jobs and apply through Prompt Academy's channel."
                cta={{ label: "Browse Jobs", href: "/jobs" }}
              />
            )}
          </div>
        )}

        {/* My Certification */}
        {activeTab === "certification" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-tpa-border p-8 text-center">
              <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-tpa-gold to-tpa-gold-dark flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-tpa-dark" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold font-heading text-tpa-text mb-1">AI Proficiency — Screening Passed</h3>
              <p className="text-sm font-body text-tpa-text/50 mb-4">Free screening result · Valid for current session</p>
              <a
                href="https://thepromptacademy.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-tpa-gold text-tpa-dark font-semibold font-body text-sm hover:bg-tpa-gold-light transition-colors"
              >
                Upgrade to Official Certification
              </a>
            </div>
          </div>
        )}

        {/* Recommended Jobs */}
        {activeTab === "recommended" && (
          <EmptyState
            icon="🎯"
            title="Recommendations coming soon"
            description="Complete your profile and screening to receive personalized job recommendations."
            cta={{ label: "Browse Jobs", href: "/jobs" }}
          />
        )}

        {/* Saved Roles */}
        {activeTab === "saved" && (
          <EmptyState
            icon="🔖"
            title="No saved roles yet"
            description="Save roles you're interested in to come back to them later."
            cta={{ label: "Browse Jobs", href: "/jobs" }}
          />
        )}
      </div>
    </div>
  );
}

function EmptyState({
  icon,
  title,
  description,
  cta,
}: {
  icon: string;
  title: string;
  description: string;
  cta: { label: string; href: string };
}) {
  return (
    <div className="text-center py-16">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold font-heading text-tpa-text mb-2">{title}</h3>
      <p className="text-tpa-text/60 font-body text-sm mb-6">{description}</p>
      <Link
        href={cta.href}
        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-tpa-gold text-tpa-dark font-semibold font-body text-sm hover:bg-tpa-gold-light transition-colors"
      >
        {cta.label}
      </Link>
    </div>
  );
}
