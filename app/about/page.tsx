import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about The Prompt Academy's mission to connect AI-skilled talent with forward-thinking employers.",
};

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-600 to-purple-700 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Connecting AI Talent with Opportunity
          </h1>
          <p className="text-lg text-indigo-100 max-w-2xl mx-auto">
            The Prompt Academy Careers platform bridges the gap between
            AI-skilled professionals and employers who need them.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                The AI revolution is transforming every industry, creating
                unprecedented demand for skilled professionals who can work
                effectively with AI systems. The Prompt Academy was founded to
                meet this demand.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our certification programs equip professionals with practical,
                real-world AI skills — from prompt engineering and LLM
                integration to AI safety and responsible deployment. And our
                careers platform ensures that certified talent can find
                meaningful roles where their skills make an impact.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We believe that the future of work is AI-augmented, and we're
                building the bridge between talent and opportunity in this new
                landscape.
              </p>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8">
              <div className="space-y-6">
                <div>
                  <div className="text-3xl font-bold text-indigo-600 mb-1">
                    10,000+
                  </div>
                  <div className="text-sm text-gray-600">
                    Certified graduates worldwide
                  </div>
                </div>
                <div className="w-full h-px bg-indigo-200" />
                <div>
                  <div className="text-3xl font-bold text-indigo-600 mb-1">
                    500+
                  </div>
                  <div className="text-sm text-gray-600">
                    Partner companies hiring
                  </div>
                </div>
                <div className="w-full h-px bg-indigo-200" />
                <div>
                  <div className="text-3xl font-bold text-indigo-600 mb-1">
                    93%
                  </div>
                  <div className="text-sm text-gray-600">
                    Graduate employment rate within 6 months
                  </div>
                </div>
                <div className="w-full h-px bg-indigo-200" />
                <div>
                  <div className="text-3xl font-bold text-indigo-600 mb-1">
                    45+
                  </div>
                  <div className="text-sm text-gray-600">
                    Countries represented
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-12 text-center">
            What We Do
          </h2>

          <div className="grid sm:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center mb-4">
                <span className="text-xl">🎓</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Certify
              </h3>
              <p className="text-sm text-gray-600">
                Our rigorous certification programs cover prompt engineering, AI
                integration, and responsible AI — ensuring graduates are
                job-ready from day one.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                <span className="text-xl">🤝</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Connect
              </h3>
              <p className="text-sm text-gray-600">
                Our careers platform matches certified professionals with
                employers actively seeking AI talent. We make the hiring process
                seamless for both sides.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                <span className="text-xl">🚀</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Grow
              </h3>
              <p className="text-sm text-gray-600">
                We support continuous learning with advanced certifications,
                community events, and resources that help AI professionals stay
                ahead of the curve.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* For employers */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-8 sm:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              For Employers
            </h2>
            <p className="text-indigo-100 mb-8 max-w-xl mx-auto">
              Looking to hire AI-skilled talent? Post your positions on TPA
              Careers and get access to our network of certified professionals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/jobs"
                className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-white text-indigo-700 font-semibold hover:bg-indigo-50 transition-colors"
              >
                View Job Board
              </Link>
              <a
                href="https://thepromptacademy.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3 rounded-xl border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-colors"
              >
                Partner With TPA
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* For job seekers */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            For Job Seekers
          </h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Get certified, build your skills, and find your dream AI role — all
            through The Prompt Academy ecosystem.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/jobs"
              className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
            >
              Browse Open Positions
            </Link>
            <a
              href="https://thepromptacademy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 rounded-xl border-2 border-indigo-200 text-indigo-700 font-semibold hover:bg-indigo-50 transition-colors"
            >
              Start Your Certification
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
