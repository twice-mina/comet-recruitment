import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="font-bold text-lg text-gray-900">
                TPA <span className="text-indigo-600">Careers</span>
              </span>
            </div>
            <p className="text-gray-600 text-sm max-w-md">
              The Prompt Academy connects AI-skilled professionals with
              forward-thinking employers. Find your next role in the AI
              revolution.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-gray-900 text-sm mb-3">
              Platform
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/jobs"
                  className="text-sm text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  About TPA
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 text-sm mb-3">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://thepromptacademy.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  The Prompt Academy
                </a>
              </li>
              <li>
                <a
                  href="https://thepromptacademy.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  Get Certified
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} The Prompt Academy. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
