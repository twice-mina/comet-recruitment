"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function NavLink({
  href,
  children,
  active,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="relative group pb-0.5 flex flex-col items-center"
    >
      <span
        className={cn(
          "text-sm font-body font-medium transition-colors duration-200",
          active
            ? "text-comet-indigo"
            : "text-comet-text group-hover:text-comet-indigo"
        )}
      >
        {children}
      </span>
      <span
        className={cn(
          "absolute bottom-0 left-0 w-full h-[2px] bg-comet-indigo rounded-full transition-transform duration-200 origin-left",
          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
        )}
      />
    </Link>
  );
}

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
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.15 }}
          >
            <Link href="/" className="flex items-center gap-2">
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="14" cy="8" r="5" fill="#4338CA" />
                <path
                  d="M10.5 11.5L3 19"
                  stroke="#F97316"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M9 13L4 18"
                  stroke="#F97316"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  opacity="0.5"
                />
              </svg>
              <span className="font-heading font-semibold text-base text-comet-text">
                Comet
              </span>
            </Link>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <NavLink href="/jobs" active={pathname.startsWith("/jobs")}>
              Browse Jobs
            </NavLink>
            <NavLink href="/#for-companies">For Companies</NavLink>
          </div>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/admin"
              className="text-sm font-body text-comet-muted hover:text-comet-text transition-colors"
            >
              Sign in
            </Link>
            <motion.div whileTap={{ scale: 0.97 }} transition={{ duration: 0.1 }}>
              <Link
                href="/jobs"
                className="inline-flex items-center px-4 py-1.5 rounded-md border border-comet-indigo text-comet-indigo text-sm font-medium font-body hover:bg-comet-indigo-lt transition-colors"
              >
                Browse Jobs
              </Link>
            </motion.div>
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
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden overflow-hidden border-t border-comet-border"
            >
              <div className="pb-4 pt-3 space-y-1">
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
