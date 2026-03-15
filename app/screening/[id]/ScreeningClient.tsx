"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getJobById, screeningQuestions } from "@/lib/mock-jobs";
import { cn } from "@/lib/utils";

export default function ScreeningClient() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const job = getJobById(id);

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const questions = screeningQuestions;
  const total = questions.length;
  const currentQuestion = questions[currentIndex];
  const isLast = currentIndex === total - 1;

  const handleNext = () => {
    if (currentIndex < total - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSubmit = () => {
    setSubmitting(true);
    const passed = Math.random() > 0.3;
    if (typeof window !== "undefined") {
      sessionStorage.setItem(
        `screening_${id}`,
        JSON.stringify({ passed, score: passed ? 82 : 43 })
      );
    }
    setTimeout(() => {
      router.push(`/screening/${id}/result`);
    }, 1200);
  };

  if (!job) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <h1 className="font-heading font-bold text-2xl text-comet-text mb-4">Job Not Found</h1>
        <Link href="/jobs" className="text-sm text-comet-indigo hover:underline font-body">← Browse Jobs</Link>
      </div>
    );
  }

  return (
    <div className="animate-page-in">
      {/* Header */}
      <div className="bg-white border-b border-comet-border">
        <div className="max-w-xl mx-auto px-4 sm:px-6 py-6">
          <p className="text-xs font-body text-comet-muted mb-1">
            {job.title} · {job.employer_confidential ? "Confidential Employer" : job.company}
          </p>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-body font-medium text-comet-text">
              Question {currentIndex + 1} of {total}
            </p>
            <p className="text-xs font-body text-comet-muted">
              {Object.keys(answers).length} answered
            </p>
          </div>
          {/* Progress bar */}
          <div className="w-full h-px bg-comet-border">
            <div
              className="h-px bg-comet-indigo transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="max-w-xl mx-auto px-4 sm:px-6 py-8">
        {currentQuestion && (
          <div className="bg-white border border-comet-border rounded-lg p-6 mb-6">
            <p className="font-heading font-semibold text-sm text-comet-text mb-5">
              {currentQuestion.question}
            </p>

            {/* Multiple choice */}
            {currentQuestion.type === "multiple_choice" && currentQuestion.options && (
              <div className="divide-y divide-comet-border border-y border-comet-border">
                {currentQuestion.options.map((option, oi) => {
                  const selected = answers[currentQuestion.id] === String(oi);
                  return (
                    <label
                      key={oi}
                      className={cn(
                        "flex items-center gap-3 py-3 cursor-pointer transition-colors",
                        selected ? "pl-3 border-l-2 border-comet-indigo" : "pl-3 border-l-2 border-transparent"
                      )}
                    >
                      <input
                        type="radio"
                        name={currentQuestion.id}
                        value={oi}
                        checked={selected}
                        onChange={() =>
                          setAnswers({ ...answers, [currentQuestion.id]: String(oi) })
                        }
                        className="sr-only"
                      />
                      <div
                        className={cn(
                          "w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                          selected ? "border-comet-indigo" : "border-comet-border"
                        )}
                      >
                        {selected && (
                          <div className="w-1.5 h-1.5 rounded-full bg-comet-indigo" />
                        )}
                      </div>
                      <span className="text-sm font-body text-comet-text">{option}</span>
                    </label>
                  );
                })}
              </div>
            )}

            {/* Open text */}
            {(currentQuestion.type === "scenario" || currentQuestion.type === "prompt_exercise") && (
              <textarea
                value={answers[currentQuestion.id] || ""}
                onChange={(e) =>
                  setAnswers({ ...answers, [currentQuestion.id]: e.target.value })
                }
                placeholder="Type your answer here..."
                rows={6}
                className="w-full rounded-md border border-comet-border px-3 py-2.5 text-sm font-body text-comet-text placeholder-comet-muted focus:outline-none resize-y"
              />
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="px-4 py-2 rounded-md border border-comet-border text-sm font-body text-comet-muted hover:text-comet-text hover:border-comet-text transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ← Previous
          </button>

          {!isLast ? (
            <button
              onClick={handleNext}
              className="px-5 py-2 rounded-md bg-comet-indigo text-white text-sm font-medium font-body hover:bg-[#3730A3] transition-colors"
            >
              Next →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="px-5 py-2 rounded-md bg-comet-indigo text-white text-sm font-medium font-body hover:bg-[#3730A3] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {submitting ? (
                <>
                  <svg className="animate-spin w-3.5 h-3.5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Submitting...
                </>
              ) : (
                "Submit answers →"
              )}
            </button>
          )}
        </div>

        <p className="text-xs font-body text-comet-muted/60 text-center mt-6">
          Your responses are evaluated against role requirements. Answer honestly and specifically.
        </p>
      </div>
    </div>
  );
}
