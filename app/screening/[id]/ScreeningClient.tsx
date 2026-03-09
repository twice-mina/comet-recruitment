"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getJobById, screeningQuestions } from "@/lib/mock-data";

export default function ScreeningClient() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const job = getJobById(id);

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentSection, setCurrentSection] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const sections = [
    { title: "AI Fundamentals", questions: screeningQuestions.filter((q) => q.type === "multiple_choice") },
    { title: "Scenario Analysis", questions: screeningQuestions.filter((q) => q.type === "scenario") },
    { title: "Prompt Exercise", questions: screeningQuestions.filter((q) => q.type === "prompt_exercise") },
  ];

  const currentQuestions = sections[currentSection]?.questions || [];
  const totalQuestions = screeningQuestions.length;
  const answeredCount = Object.keys(answers).length;
  const progress = Math.round((answeredCount / totalQuestions) * 100);

  const handleSubmit = () => {
    setSubmitting(true);
    // For MVP: simulate processing, then redirect to result
    // Pass/fail is determined on the result page based on a random seed stored in sessionStorage
    const passed = Math.random() > 0.3; // 70% pass rate for demo
    if (typeof window !== "undefined") {
      sessionStorage.setItem(`screening_${id}`, JSON.stringify({ passed, score: passed ? 82 : 45 }));
    }
    setTimeout(() => {
      router.push(`/screening/${id}/result`);
    }, 1500);
  };

  if (!job) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold font-heading text-tpa-text mb-4">Job Not Found</h1>
        <Link href="/jobs" className="text-tpa-gold hover:underline font-body">← Browse Jobs</Link>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="bg-tpa-dark border-b border-tpa-dark-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <p className="text-sm font-body text-tpa-gold font-semibold tracking-wider uppercase mb-2">
            <span className="mr-1.5">◆</span>AI Proficiency Screening
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-tpa-hero-text mb-2">
            AI Proficiency Screening
          </h1>
          <p className="text-tpa-hero-text/60 font-body">
            For: {job.title} at {job.employer_confidential ? "Confidential Employer" : job.company}
          </p>

          {/* Progress bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between text-sm font-body text-tpa-hero-text/60 mb-2">
              <span>{answeredCount} of {totalQuestions} questions answered</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-tpa-dark-secondary rounded-full h-2">
              <div
                className="bg-tpa-gold rounded-full h-2 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Section tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto">
          {sections.map((section, i) => (
            <button
              key={i}
              onClick={() => setCurrentSection(i)}
              className={`px-4 py-2 rounded-lg text-sm font-medium font-body whitespace-nowrap transition-colors ${
                currentSection === i
                  ? "bg-tpa-gold text-tpa-dark"
                  : "bg-white text-tpa-text/70 border border-tpa-border hover:border-tpa-gold/40"
              }`}
            >
              {section.title}
            </button>
          ))}
        </div>

        {/* Questions */}
        <div className="space-y-8">
          {currentQuestions.map((question, qi) => (
            <div key={question.id} className="bg-white rounded-xl border border-tpa-border p-6">
              <div className="flex items-start gap-3 mb-4">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-tpa-gold/10 border border-tpa-gold/20 flex items-center justify-center text-sm font-bold font-body text-tpa-gold">
                  {qi + 1}
                </span>
                <div className="flex-1">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium font-body bg-tpa-cream text-tpa-text/50 mb-2 capitalize">
                    {question.type.replace("_", " ")}
                  </span>
                  <p className="text-tpa-text font-body font-medium">{question.question}</p>
                </div>
              </div>

              {question.type === "multiple_choice" && question.options && (
                <div className="space-y-2 ml-10">
                  {question.options.map((option, oi) => (
                    <label
                      key={oi}
                      className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                        answers[question.id] === String(oi)
                          ? "border-tpa-gold bg-tpa-gold/5"
                          : "border-tpa-border hover:border-tpa-gold/30"
                      }`}
                    >
                      <input
                        type="radio"
                        name={question.id}
                        value={oi}
                        checked={answers[question.id] === String(oi)}
                        onChange={() => setAnswers({ ...answers, [question.id]: String(oi) })}
                        className="sr-only"
                      />
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        answers[question.id] === String(oi) ? "border-tpa-gold" : "border-tpa-border"
                      }`}>
                        {answers[question.id] === String(oi) && (
                          <div className="w-2 h-2 rounded-full bg-tpa-gold" />
                        )}
                      </div>
                      <span className="text-sm font-body text-tpa-text/80">{option}</span>
                    </label>
                  ))}
                </div>
              )}

              {(question.type === "scenario" || question.type === "prompt_exercise") && (
                <div className="ml-10">
                  <textarea
                    value={answers[question.id] || ""}
                    onChange={(e) => setAnswers({ ...answers, [question.id]: e.target.value })}
                    placeholder="Type your answer here..."
                    rows={6}
                    className="w-full rounded-lg border border-tpa-border bg-white text-tpa-text placeholder-tpa-text/40 p-4 text-sm font-body focus:border-tpa-gold focus:ring-2 focus:ring-tpa-gold/20 outline-none transition-all resize-y"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-10">
          <button
            onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
            disabled={currentSection === 0}
            className="px-6 py-2.5 rounded-xl border border-tpa-border text-tpa-text/70 font-medium font-body hover:border-tpa-gold/40 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ← Previous
          </button>

          {currentSection < sections.length - 1 ? (
            <button
              onClick={() => setCurrentSection(currentSection + 1)}
              className="px-6 py-2.5 rounded-xl bg-tpa-gold text-tpa-dark font-semibold font-body hover:bg-tpa-gold-light transition-colors"
            >
              Next Section →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={submitting || answeredCount < totalQuestions}
              className="px-8 py-3 rounded-xl bg-tpa-gold text-tpa-dark font-semibold font-body hover:bg-tpa-gold-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {submitting ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Processing...
                </>
              ) : (
                "Submit Screening"
              )}
            </button>
          )}
        </div>

        <p className="text-xs font-body text-tpa-text/40 text-center mt-6">
          All questions must be answered before submitting. Your responses will be evaluated against Prompt Academy&apos;s AI proficiency standards.
        </p>
      </div>
    </div>
  );
}
