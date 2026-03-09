"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";

const links = [
  { href: "/jobs", label: "Jobs" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#for-employers", label: "For Employers" },
  { href: "/#resources", label: "Resources" },
  { href: "/dashboard", label: "Dashboard" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-tpa-dark/95 backdrop-blur-md border-b border-tpa-dark-secondary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-tpa-gold flex items-center justify-center">
              <span className="text-tpa-dark font-bold text-sm font-heading">T</span>
            </div>
            <span className="font-heading font-bold text-lg text-tpa-hero-text">
              TPA <span className="text-tpa-gold">Careers</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/" || pathname === ""
                  : !link.href.startsWith("/#") && pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium font-body transition-colors",
                    isActive
                      ? "bg-tpa-dark-secondary text-tpa-gold"
                      : "text-tpa-hero-text/70 hover:text-tpa-hero-text hover:bg-tpa-dark-secondary/50"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Browse Jobs CTA */}
          <div className="hidden md:block">
            <Link
              href="/jobs"
              className="inline-flex items-center px-5 py-2 rounded-lg bg-tpa-gold text-tpa-dark text-sm font-semibold font-body hover:bg-tpa-gold-light transition-colors"
            >
              Browse Jobs
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-tpa-hero-text/70 hover:bg-tpa-dark-secondary"
          >
            <svg
              className="w-6 h-6"
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
          <div className="md:hidden pb-4 space-y-1">
            {links.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/" || pathname === ""
                  : !link.href.startsWith("/#") && pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "block px-4 py-2 rounded-lg text-sm font-medium font-body transition-colors",
                    isActive
                      ? "bg-tpa-dark-secondary text-tpa-gold"
                      : "text-tpa-hero-text/70 hover:text-tpa-hero-text hover:bg-tpa-dark-secondary/50"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/jobs"
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-2 rounded-lg text-sm font-semibold font-body bg-tpa-gold text-tpa-dark text-center mt-2"
            >
              Browse Jobs
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
