import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-tpa-dark border-t border-tpa-dark-secondary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-tpa-gold flex items-center justify-center">
                <span className="text-tpa-dark font-bold text-sm font-heading">T</span>
              </div>
              <span className="font-heading font-bold text-lg text-tpa-hero-text">
                TPA <span className="text-tpa-gold">Careers</span>
              </span>
            </div>
            <p className="text-tpa-hero-text/60 text-sm font-body max-w-md">
              The Prompt Academy connects AI-skilled professionals with
              forward-thinking employers. Find your next role in the AI
              revolution.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-heading font-semibold text-tpa-hero-text text-sm mb-3">
              Platform
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/jobs"
                  className="text-sm font-body text-tpa-hero-text/60 hover:text-tpa-gold transition-colors"
                >
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm font-body text-tpa-hero-text/60 hover:text-tpa-gold transition-colors"
                >
                  About TPA
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-tpa-hero-text text-sm mb-3">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://thepromptacademy.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-body text-tpa-hero-text/60 hover:text-tpa-gold transition-colors"
                >
                  The Prompt Academy
                </a>
              </li>
              <li>
                <a
                  href="https://thepromptacademy.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-body text-tpa-hero-text/60 hover:text-tpa-gold transition-colors"
                >
                  Get Certified
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-tpa-dark-secondary text-center">
          <p className="text-sm font-body text-tpa-hero-text/40">
            &copy; {new Date().getFullYear()} The Prompt Academy. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
