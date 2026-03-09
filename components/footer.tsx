import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-tpa-dark border-t border-tpa-dark-secondary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-tpa-gold flex items-center justify-center">
                <span className="text-tpa-dark font-bold text-sm font-heading">T</span>
              </div>
              <span className="font-heading font-bold text-lg text-tpa-hero-text">
                TPA <span className="text-tpa-gold">Careers</span>
              </span>
            </div>
            <p className="text-tpa-hero-text/60 text-sm font-body max-w-md">
              Curated AI jobs with proficiency screening. Apply through Prompt Academy&apos;s trusted channel.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h3 className="font-heading font-semibold text-tpa-hero-text text-sm mb-3">
              Platform
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/jobs" className="text-sm font-body text-tpa-hero-text/60 hover:text-tpa-gold transition-colors link-underline">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="text-sm font-body text-tpa-hero-text/60 hover:text-tpa-gold transition-colors link-underline">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-sm font-body text-tpa-hero-text/60 hover:text-tpa-gold transition-colors link-underline">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-heading font-semibold text-tpa-hero-text text-sm mb-3">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="https://thepromptacademy.com" target="_blank" rel="noopener noreferrer" className="text-sm font-body text-tpa-hero-text/60 hover:text-tpa-gold transition-colors link-underline">
                  The Prompt Academy
                </a>
              </li>
              <li>
                <a href="https://thepromptacademy.com" target="_blank" rel="noopener noreferrer" className="text-sm font-body text-tpa-hero-text/60 hover:text-tpa-gold transition-colors link-underline">
                  Get Certified
                </a>
              </li>
              <li>
                <a href="https://thepromptacademy.com" target="_blank" rel="noopener noreferrer" className="text-sm font-body text-tpa-hero-text/60 hover:text-tpa-gold transition-colors link-underline">
                  AI Career Guide
                </a>
              </li>
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h3 className="font-heading font-semibold text-tpa-hero-text text-sm mb-3">
              For Employers
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="https://thepromptacademy.com" target="_blank" rel="noopener noreferrer" className="text-sm font-body text-tpa-hero-text/60 hover:text-tpa-gold transition-colors link-underline">
                  Post a Job
                </a>
              </li>
              <li>
                <a href="https://thepromptacademy.com" target="_blank" rel="noopener noreferrer" className="text-sm font-body text-tpa-hero-text/60 hover:text-tpa-gold transition-colors link-underline">
                  Talent Network
                </a>
              </li>
              <li>
                <a href="https://thepromptacademy.com" target="_blank" rel="noopener noreferrer" className="text-sm font-body text-tpa-hero-text/60 hover:text-tpa-gold transition-colors link-underline">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-tpa-dark-secondary">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm font-body text-tpa-hero-text/40">
              &copy; {new Date().getFullYear()} The Prompt Academy. All rights reserved.
            </p>
            <p className="text-xs font-body text-tpa-hero-text/30">
              TPA Careers curates external job listings. Prompt Academy is not the employer unless explicitly stated.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
