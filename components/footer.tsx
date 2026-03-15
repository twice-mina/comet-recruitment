import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-comet-surface border-t border-comet-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-3">
              <svg width="20" height="20" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="14" cy="8" r="5" fill="#4338CA" />
                <path d="M10.5 11.5L3 19" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M9 13L4 18" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
              </svg>
              <span className="font-heading font-semibold text-sm text-comet-text">Comet Recruitment</span>
            </Link>
            <p className="text-comet-muted text-sm font-body max-w-xs">
              Pre-screened. Ready to land.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-16">
            <div>
              <h3 className="font-heading font-semibold text-comet-text text-xs uppercase tracking-widest mb-3">
                Platform
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/jobs" className="text-sm font-body text-comet-muted hover:text-comet-text transition-colors">
                    Browse Jobs
                  </Link>
                </li>
                <li>
                  <Link href="/#how-it-works" className="text-sm font-body text-comet-muted hover:text-comet-text transition-colors">
                    How It Works
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-heading font-semibold text-comet-text text-xs uppercase tracking-widest mb-3">
                Companies
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/#for-companies" className="text-sm font-body text-comet-muted hover:text-comet-text transition-colors">
                    Hire with Comet
                  </Link>
                </li>
                <li>
                  <Link href="/admin" className="text-sm font-body text-comet-muted hover:text-comet-text transition-colors">
                    Admin
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-comet-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs font-body text-comet-muted">
            &copy; {new Date().getFullYear()} Comet Recruitment. All rights reserved.
          </p>
          <p className="text-xs font-body text-comet-muted">
            Comet is not the employer unless explicitly stated.
          </p>
        </div>
      </div>
    </footer>
  );
}
