"use client";

import Link from "next/link";
import { RevealOnScroll, StaggerChildren } from "@/components/reveal-on-scroll";
import { CountUp } from "@/components/count-up";

export default function AboutPage() {
  return (
    <div className="animate-page-in">
      {/* Hero */}
      <section className="bg-gradient-to-b from-tpa-dark via-tpa-dark-secondary to-tpa-dark py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="animate-hero-badge text-sm font-body text-tpa-gold font-semibold tracking-wider uppercase mb-4">
            <span className="mr-1.5">◆</span>Our Story
          </p>
          <h1 className="animate-hero-title text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-tpa-hero-text mb-6 uppercase tracking-tight">
            Connecting AI Talent with <em className="italic text-tpa-gold">Opportunity</em>
          </h1>
          <p className="animate-hero-subtitle text-lg font-body text-tpa-hero-text/70 max-w-2xl mx-auto">
            The Prompt Academy Careers platform bridges the gap between
            AI-skilled professionals and employers who need them.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 sm:py-20 bg-tpa-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <RevealOnScroll variant="fade-left">
              <div>
                <p className="text-sm font-body text-tpa-gold font-semibold tracking-wider uppercase mb-3">
                  <span className="mr-1.5">◆</span>Mission
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold font-heading text-tpa-text mb-6">
                  Our <em className="italic text-tpa-gold-dark">Mission</em>
                </h2>
                <p className="text-tpa-text/80 font-body leading-relaxed mb-4">
                  The AI revolution is transforming every industry, creating
                  unprecedented demand for skilled professionals who can work
                  effectively with AI systems. The Prompt Academy was founded to
                  meet this demand.
                </p>
                <p className="text-tpa-text/80 font-body leading-relaxed mb-4">
                  Our certification programs equip professionals with practical,
                  real-world AI skills — from prompt engineering and LLM
                  integration to AI safety and responsible deployment. And our
                  careers platform ensures that certified talent can find
                  meaningful roles where their skills make an impact.
                </p>
                <p className="text-tpa-text/80 font-body leading-relaxed">
                  We believe that the future of work is AI-augmented, and we&apos;re
                  building the bridge between talent and opportunity in this new
                  landscape.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll variant="fade-right" delay={200}>
              <div className="bg-tpa-dark rounded-2xl p-8">
                <div className="space-y-6">
                  <div>
                    <div className="text-3xl font-bold font-heading text-tpa-gold mb-1">
                      <CountUp target={10000} suffix="+" />
                    </div>
                    <div className="text-sm font-body text-tpa-hero-text/60">
                      Certified graduates worldwide
                    </div>
                  </div>
                  <div className="w-full h-px bg-tpa-dark-secondary" />
                  <div>
                    <div className="text-3xl font-bold font-heading text-tpa-gold mb-1">
                      <CountUp target={500} suffix="+" />
                    </div>
                    <div className="text-sm font-body text-tpa-hero-text/60">
                      Partner companies hiring
                    </div>
                  </div>
                  <div className="w-full h-px bg-tpa-dark-secondary" />
                  <div>
                    <div className="text-3xl font-bold font-heading text-tpa-gold mb-1">
                      <CountUp target={93} suffix="%" />
                    </div>
                    <div className="text-sm font-body text-tpa-hero-text/60">
                      Graduate employment rate within 6 months
                    </div>
                  </div>
                  <div className="w-full h-px bg-tpa-dark-secondary" />
                  <div>
                    <div className="text-3xl font-bold font-heading text-tpa-gold mb-1">
                      <CountUp target={45} suffix="+" />
                    </div>
                    <div className="text-sm font-body text-tpa-hero-text/60">
                      Countries represented
                    </div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="py-16 sm:py-20 bg-tpa-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="text-center mb-12">
              <p className="text-sm font-body text-tpa-gold font-semibold tracking-wider uppercase mb-3">
                <span className="mr-1.5">◆</span>What We Do
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-tpa-hero-text">
                What We <em className="italic text-tpa-gold">Do</em>
              </h2>
            </div>
          </RevealOnScroll>

          <StaggerChildren className="grid sm:grid-cols-3 gap-8" staggerDelay={150}>
            <div className="bg-tpa-dark-secondary/50 rounded-xl p-6 border border-tpa-dark-secondary card-hover">
              <div className="w-10 h-10 rounded-lg bg-tpa-gold/10 border border-tpa-gold/20 flex items-center justify-center mb-4">
                <span className="text-xl">🎓</span>
              </div>
              <h3 className="text-lg font-semibold font-heading text-tpa-hero-text mb-2">
                Certify
              </h3>
              <p className="text-sm font-body text-tpa-hero-text/60">
                Our rigorous certification programs cover prompt engineering, AI
                integration, and responsible AI — ensuring graduates are
                job-ready from day one.
              </p>
            </div>

            <div className="bg-tpa-dark-secondary/50 rounded-xl p-6 border border-tpa-dark-secondary card-hover">
              <div className="w-10 h-10 rounded-lg bg-tpa-gold/10 border border-tpa-gold/20 flex items-center justify-center mb-4">
                <span className="text-xl">🤝</span>
              </div>
              <h3 className="text-lg font-semibold font-heading text-tpa-hero-text mb-2">
                Connect
              </h3>
              <p className="text-sm font-body text-tpa-hero-text/60">
                Our careers platform matches certified professionals with
                employers actively seeking AI talent. We make the hiring process
                seamless for both sides.
              </p>
            </div>

            <div className="bg-tpa-dark-secondary/50 rounded-xl p-6 border border-tpa-dark-secondary card-hover">
              <div className="w-10 h-10 rounded-lg bg-tpa-gold/10 border border-tpa-gold/20 flex items-center justify-center mb-4">
                <span className="text-xl">🚀</span>
              </div>
              <h3 className="text-lg font-semibold font-heading text-tpa-hero-text mb-2">
                Grow
              </h3>
              <p className="text-sm font-body text-tpa-hero-text/60">
                We support continuous learning with advanced certifications,
                community events, and resources that help AI professionals stay
                ahead of the curve.
              </p>
            </div>
          </StaggerChildren>
        </div>
      </section>

      {/* For employers */}
      <section className="py-16 sm:py-20 bg-tpa-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll variant="scale-in">
            <div className="bg-tpa-dark-secondary rounded-2xl p-8 sm:p-12 text-center">
              <p className="text-sm font-body text-tpa-gold font-semibold tracking-wider uppercase mb-3">
                <span className="mr-1.5">◆</span>Employers
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-tpa-hero-text mb-4">
                For <em className="italic text-tpa-gold">Employers</em>
              </h2>
              <p className="text-tpa-hero-text/60 font-body mb-8 max-w-xl mx-auto">
                Looking to hire AI-skilled talent? Post your positions on TPA
                Careers and get access to our network of certified professionals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/jobs"
                  className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-tpa-gold text-tpa-dark font-semibold font-body btn-gold-shimmer btn-hover hover:bg-tpa-gold-light transition-colors"
                >
                  View Job Board
                </Link>
                <a
                  href="https://thepromptacademy.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-3 rounded-xl border-2 border-tpa-gold/30 text-tpa-gold font-semibold font-body hover:bg-tpa-gold/10 transition-colors"
                >
                  Partner With TPA
                </a>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* For job seekers */}
      <section className="py-16 sm:py-20 bg-tpa-cream-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <RevealOnScroll>
            <p className="text-sm font-body text-tpa-gold font-semibold tracking-wider uppercase mb-3">
              <span className="mr-1.5">◆</span>Job Seekers
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-tpa-text mb-4">
              For <em className="italic text-tpa-gold-dark">Job Seekers</em>
            </h2>
            <p className="text-tpa-text/60 font-body mb-8 max-w-xl mx-auto">
              Get certified, build your skills, and find your dream AI role — all
              through The Prompt Academy ecosystem.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/jobs"
                className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-tpa-gold text-tpa-dark font-semibold font-body btn-gold-shimmer btn-hover hover:bg-tpa-gold-light transition-colors"
              >
                Browse Open Positions
              </Link>
              <a
                href="https://thepromptacademy.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3 rounded-xl border-2 border-tpa-border text-tpa-text font-semibold font-body hover:bg-white transition-colors"
              >
                Start Your Certification
              </a>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}
