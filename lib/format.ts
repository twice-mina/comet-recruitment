export function formatSalary(min: number, max: number): string {
  const fmt = (n: number) => {
    if (n >= 1000) return `$${(n / 1000).toFixed(0)}k`;
    return `$${n}`;
  };
  return `${fmt(min)} – ${fmt(max)}`;
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function jobTypeBadgeColor(type: string): string {
  switch (type) {
    case "remote":
      return "bg-green-100 text-green-800";
    case "hybrid":
      return "bg-blue-100 text-blue-800";
    case "onsite":
      return "bg-orange-100 text-orange-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

export function experienceLevelLabel(level: string): string {
  switch (level) {
    case "entry": return "Entry Level";
    case "mid": return "Mid Level";
    case "senior": return "Senior";
    case "lead": return "Lead";
    case "executive": return "Executive";
    default: return level;
  }
}
