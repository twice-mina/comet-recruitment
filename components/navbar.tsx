"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-comet-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            {/* Comet mark: circle + tail */}
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="14" cy="8" r="5" fill="#4338CA" />
              <path d="M10.5 11.5L3 19" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M9 13L4 18" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
            </svg>
            <span className="font-heading font-semibold text-base text-comet-text">
              Comet
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/jobs"
              className={cn(
                "text-sm font-body transition-colors",
                pathname.startsWith("/jobs")
                  ? "text-comet-indigo font-medium"
                  : "text-comet-muted hover:text-comet-text"
              )}
            >
              Browse Jobs
            </Link>
            <Link
              href="/#for-companies"
              className="text-sm font-body text-comet-muted hover:text-comet-text transition-colors"
            >
              For Companies
            </Link>
          </div>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/admin"
              className="text-sm font-body text-comet-muted hover:text-comet-text transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/jobs"
              className="inline-flex items-center px-4 py-1.5 rounded-md border border-comet-indigo text-comet-indigo text-sm font-medium font-body hover:bg-comet-indigo-lt transition-colors"
            >
              Browse Jobs
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-md text-comet-muted hover:text-comet-text hover:bg-comet-surface transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-1 border-t border-comet-border pt-3 animate-slide-down">
            <Link
              href="/jobs"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2.5 rounded-md text-sm font-body text-comet-text hover:bg-comet-surface transition-colors"
            >
              Browse Jobs
            </Link>
            <Link
              href="/#for-companies"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2.5 rounded-md text-sm font-body text-comet-text hover:bg-comet-surface transition-colors"
            >
              For Companies
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2.5 rounded-md text-sm font-body text-comet-muted hover:bg-comet-surface transition-colors"
            >
              Sign in
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
