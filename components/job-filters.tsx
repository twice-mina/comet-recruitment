"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { JOB_CATEGORIES, JOB_TYPES, EXPERIENCE_LEVELS } from "@/lib/types";
import { cn } from "@/lib/utils";

export function JobFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "";
  const currentType = searchParams.get("type") || "";
  const currentLevel = searchParams.get("level") || "";

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/jobs?${params.toString()}`);
  };

  return (
    <div className="space-y-5">
      {/* Category filter */}
      <div>
        <h3 className="text-sm font-semibold font-heading text-tpa-text mb-2.5">
          <span className="text-tpa-gold mr-1.5">◆</span>Category
        </h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => updateFilter("category", "")}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-medium font-body transition-colors filter-pill",
              !currentCategory
                ? "bg-tpa-gold text-tpa-dark"
                : "bg-white text-tpa-text/70 border border-tpa-border hover:border-tpa-gold/40"
            )}
          >
            All
          </button>
          {JOB_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() =>
                updateFilter("category", currentCategory === cat ? "" : cat)
              }
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium font-body transition-colors filter-pill",
                currentCategory === cat
                  ? "bg-tpa-gold text-tpa-dark"
                  : "bg-white text-tpa-text/70 border border-tpa-border hover:border-tpa-gold/40"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Work type filter */}
      <div>
        <h3 className="text-sm font-semibold font-heading text-tpa-text mb-2.5">
          <span className="text-tpa-gold mr-1.5">◆</span>Work Type
        </h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => updateFilter("type", "")}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-medium font-body transition-colors filter-pill",
              !currentType
                ? "bg-tpa-gold text-tpa-dark"
                : "bg-white text-tpa-text/70 border border-tpa-border hover:border-tpa-gold/40"
            )}
          >
            All
          </button>
          {JOB_TYPES.map((t) => (
            <button
              key={t.value}
              onClick={() =>
                updateFilter("type", currentType === t.value ? "" : t.value)
              }
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium font-body transition-colors capitalize",
                currentType === t.value
                  ? "bg-tpa-gold text-tpa-dark"
                  : "bg-white text-tpa-text/70 border border-tpa-border hover:border-tpa-gold/40"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Experience level filter */}
      <div>
        <h3 className="text-sm font-semibold font-heading text-tpa-text mb-2.5">
          <span className="text-tpa-gold mr-1.5">◆</span>Experience Level
        </h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => updateFilter("level", "")}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-medium font-body transition-colors filter-pill",
              !currentLevel
                ? "bg-tpa-gold text-tpa-dark"
                : "bg-white text-tpa-text/70 border border-tpa-border hover:border-tpa-gold/40"
            )}
          >
            All
          </button>
          {EXPERIENCE_LEVELS.map((l) => (
            <button
              key={l.value}
              onClick={() =>
                updateFilter("level", currentLevel === l.value ? "" : l.value)
              }
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium font-body transition-colors filter-pill",
                currentLevel === l.value
                  ? "bg-tpa-gold text-tpa-dark"
                  : "bg-white text-tpa-text/70 border border-tpa-border hover:border-tpa-gold/40"
              )}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
