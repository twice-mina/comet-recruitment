"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function SearchBar({
  defaultValue = "",
  size = "default",
}: {
  defaultValue?: string;
  size?: "default" | "large";
}) {
  const [query, setQuery] = useState(defaultValue);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    router.push(`/jobs${params.toString() ? `?${params.toString()}` : ""}`);
  };

  const isLarge = size === "large";

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <svg
            className={`${isLarge ? "w-5 h-5" : "w-4 h-4"} text-tpa-text/40`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search jobs by title, company, or location..."
          className={`w-full rounded-xl border border-tpa-border bg-white text-tpa-text placeholder-tpa-text/40 focus:border-tpa-gold focus:ring-2 focus:ring-tpa-gold/20 outline-none transition-all font-body ${
            isLarge ? "pl-12 pr-32 py-4 text-base" : "pl-10 pr-24 py-2.5 text-sm"
          }`}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-2">
          <button
            type="submit"
            className={`rounded-lg bg-tpa-gold text-tpa-dark font-semibold font-body hover:bg-tpa-gold-light transition-colors ${
              isLarge ? "px-6 py-2.5 text-sm" : "px-4 py-1.5 text-xs"
            }`}
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
}
