# MOTION_PLAN.md — Wellfound-Inspired UI Upgrade for Comet Recruitment

> **Planning session:** March 2026  
> **Target:** Wellfound-quality animations, filter UX, and job card design  
> **Current stack:** Next.js 14, Tailwind, Radix UI (Dropdown + Select already installed), Unbounded + Inter fonts

---

## 0. Current State Analysis

| Area | Current | Target |
|---|---|---|
| Animations | CSS `animate-page-in` class only | Framer Motion page + stagger + hover |
| Job filters | Pill tab buttons | Beautiful dropdown menus |
| Job cards | Minimal rows (logo initial + text) | Richer cards with tag pills, Easy Apply badge |
| Search | None | Prominent search bar with icon |
| Nav links | Color transition only | Animated underline slide |
| Micro-interactions | None | `whileTap`, border transitions, scale |

---

## 1. Packages to Install

### Required (not yet installed)
```bash
npm install framer-motion
```

### Already installed ✅ (no action needed)
- `@radix-ui/react-dropdown-menu@2.1.4`
- `@radix-ui/react-select@2.1.4`
- `@radix-ui/react-dialog@1.1.4`
- `lucide-react` (for Search icon, Check icon, ChevronDown)
- `tailwindcss-animate`

### Total new packages: **1** (`framer-motion`)

---

## 2. Animation Utility Patterns

Create `components/motion.tsx` — reusable wrappers the whole app imports.

```tsx
// components/motion.tsx
"use client";

import { motion, type Variants } from "framer-motion";

// ── Page entrance wrapper ──────────────────────────────────────────────────
// Usage: <PageMotion> ... </PageMotion>
export const pageVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
};

export function PageMotion({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.div>
  );
}

// ── Stagger container ─────────────────────────────────────────────────────
// Usage: <StaggerList> {items.map(i => <StaggerItem key={i.id}>...</StaggerItem>)} </StaggerList>
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  },
};

export function StaggerList({ children }: { children: React.ReactNode }) {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div variants={staggerItem} className={className}>
      {children}
    </motion.div>
  );
}

// ── Fade-in section (for homepage sections) ───────────────────────────────
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export function FadeInSection({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Pressable button wrapper ──────────────────────────────────────────────
// Wrap any button/Link for tap feedback
export const MotionButton = motion.button;
export const tapProps = {
  whileTap: { scale: 0.97 },
  transition: { duration: 0.1 },
} as const;
```

---

## 3. Filter Dropdown Component Spec

**File:** `components/filter-dropdown.tsx`

### Design
- White panel, `border border-comet-border`, `rounded-xl`, `shadow-lg shadow-black/5`
- Trigger button: chevron rotates 180° when open (Framer `animate={{ rotate: isOpen ? 180 : 0 }}`)
- Selected value shown in trigger, placeholder text in muted when none selected
- Checkmark icon (lucide `Check`, 14px, `text-comet-indigo`) next to active item
- Panel slides down from `y: -8, opacity: 0` → `y: 0, opacity: 1` via `AnimatePresence`
- Items: `py-2 px-3 text-sm`, hover `bg-comet-surface`, active `font-medium text-comet-indigo`

### Props interface
```tsx
interface FilterDropdownProps {
  label: string;           // "Location" | "Department" | "Job Type"
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;    // "Any location"
}
```

### Animation spec
```tsx
// Trigger chevron
<motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
  <ChevronDown size={14} />
</motion.span>

// Panel
<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.97 }}
      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      className="absolute top-full mt-1.5 left-0 min-w-[180px] bg-white border border-comet-border rounded-xl shadow-lg shadow-black/5 z-50 py-1.5 overflow-hidden"
    >
      {options.map(opt => (
        <button key={opt.value} onClick={() => select(opt.value)}
          className="flex items-center justify-between w-full px-3 py-2 text-sm font-body hover:bg-comet-surface transition-colors"
        >
          {opt.label}
          {value === opt.value && <Check size={14} className="text-comet-indigo" />}
        </button>
      ))}
    </motion.div>
  )}
</AnimatePresence>
```

### Filter sets for jobs page
```ts
const LOCATION_OPTIONS = [
  { label: "Any location", value: "" },
  { label: "Remote", value: "remote" },
  { label: "San Francisco", value: "San Francisco" },
  { label: "New York", value: "New York" },
  { label: "London", value: "London" },
  { label: "Austin", value: "Austin" },
];

const DEPARTMENT_OPTIONS = [
  { label: "All departments", value: "" },
  { label: "Engineering", value: "Engineering" },
  { label: "Design", value: "Design" },
  { label: "Product", value: "Product" },
  { label: "Marketing", value: "Marketing" },
  { label: "Operations", value: "Operations" },
  { label: "Sales", value: "Sales" },
];

const JOB_TYPE_OPTIONS = [
  { label: "Any type", value: "" },
  { label: "Full-time", value: "full-time" },
  { label: "Part-time", value: "part-time" },
  { label: "Contract", value: "contract" },
];
```

---

## 4. Job Card Spec (Upgraded `JobRow`)

**Rename to `JobCard`** — same data, much better presentation.

### Layout (desktop)
```
┌─────────────────────────────────────────────────────────────────────────────┐
│  [Logo 40px]  Senior Frontend Engineer                     [Easy Apply] [→] │
│               Stripe · Remote · $140K – $180K                               │
│               [Remote] [Full-time] [Senior] [React] [TypeScript]            │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Tailwind classes
```tsx
// Card container - motion.div with hover animation
<motion.div
  whileHover={{ y: -2, boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}
  transition={{ duration: 0.2, ease: "easeOut" }}
  className="flex items-start justify-between p-5 bg-white border border-comet-border rounded-xl cursor-pointer"
>
  {/* Left: logo + info */}
  <div className="flex items-start gap-4 min-w-0 flex-1">
    {/* Company logo - 40px rounded-lg, comet-indigo-lt bg */}
    <div className="w-10 h-10 rounded-lg bg-comet-indigo-lt border border-comet-border flex items-center justify-center flex-shrink-0 mt-0.5">
      <span className="text-sm font-bold font-heading text-comet-indigo">
        {job.company.charAt(0)}
      </span>
    </div>

    <div className="min-w-0">
      {/* Role title: Unbounded semibold 16px */}
      <h3 className="font-heading font-semibold text-base text-comet-text truncate mb-0.5">
        {job.title}
      </h3>
      {/* Meta line */}
      <p className="text-sm text-comet-muted font-body mb-2.5">
        {job.company}
        {job.location && <> · {job.location}</>}
        {job.salary_min && job.salary_max && (
          <> · <span className="text-comet-text font-medium">{formatSalary(job.salary_min, job.salary_max)}</span></>
        )}
      </p>
      {/* Tag pills */}
      <div className="flex flex-wrap gap-1.5">
        {typeLabel && <TagPill>{typeLabel}</TagPill>}
        {job.category && <TagPill>{job.category}</TagPill>}
        {job.experience_level && <TagPill className="capitalize">{job.experience_level}</TagPill>}
        {/* First 2 skills from requirements if parseable */}
      </div>
    </div>
  </div>

  {/* Right: Easy Apply + Apply button */}
  <div className="flex flex-col items-end gap-2 flex-shrink-0 ml-4">
    {/* Easy Apply badge — shown when apply via Comet (always true here) */}
    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium font-body bg-comet-indigo-lt text-comet-indigo border border-comet-indigo/20">
      ✦ Easy Apply
    </span>
    <motion.div {...tapProps}>
      <Link
        href={`/apply/${job.id}`}
        className="inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-comet-indigo text-white text-sm font-medium font-body hover:bg-[#3730A3] transition-colors"
      >
        Apply <ArrowRight size={14} />
      </Link>
    </motion.div>
  </div>
</motion.div>
```

### TagPill component
```tsx
function TagPill({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn(
      "inline-flex items-center px-2 py-0.5 rounded-md text-xs font-body font-medium bg-comet-surface text-comet-muted border border-comet-border",
      className
    )}>
      {children}
    </span>
  );
}
```

### Card list layout
Replace the bordered container with a gap-3 flex-col using `StaggerList` + `StaggerItem`:
```tsx
<StaggerList>
  {jobs.map((job) => (
    <StaggerItem key={job.id}>
      <JobCard job={job} />
    </StaggerItem>
  ))}
</StaggerList>
```

---

## 5. Search Bar Spec

**File:** Inline in `app/jobs/page.tsx`, inside the page header section.

```tsx
// Search bar — positioned below the h1, above the filter dropdowns
<div className="relative max-w-[600px] w-full mt-5">
  <Search
    size={16}
    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-comet-muted pointer-events-none"
  />
  <input
    type="text"
    placeholder="Search roles, companies, or skills"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-comet-border bg-white text-sm font-body text-comet-text placeholder:text-comet-muted/60 focus:outline-none focus:ring-2 focus:ring-comet-indigo/30 focus:border-comet-indigo transition-all duration-200"
  />
  {searchQuery && (
    <button
      onClick={() => setSearchQuery("")}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-comet-muted hover:text-comet-text"
    >
      <X size={14} />
    </button>
  )}
</div>
```

**Search logic** — filter `baseJobs` by:
```ts
const searchFiltered = searchQuery.trim()
  ? baseJobs.filter(j =>
      j.title.toLowerCase().includes(q) ||
      j.company.toLowerCase().includes(q) ||
      j.description?.toLowerCase().includes(q) ||
      j.requirements?.some(r => r.toLowerCase().includes(q))
    )
  : baseJobs;
// Then apply dropdown filters on top of searchFiltered
```

**Filter bar layout** (replaces pill tabs):
```tsx
{/* Positioned below the search bar, still in the header area */}
<div className="flex items-center gap-2.5 flex-wrap mt-4">
  <FilterDropdown label="Department" options={DEPARTMENT_OPTIONS} value={department} onChange={setDepartment} />
  <FilterDropdown label="Location" options={LOCATION_OPTIONS} value={locationFilter} onChange={setLocationFilter} />
  <FilterDropdown label="Job Type" options={JOB_TYPE_OPTIONS} value={jobType} onChange={setJobType} />
  {/* Clear all - shown when any filter active */}
  {(department || locationFilter || jobType || searchQuery) && (
    <button onClick={clearAll} className="text-xs font-body text-comet-muted hover:text-comet-text transition-colors">
      Clear all
    </button>
  )}
</div>
```

The sticky filter bar is **removed** — filters live in the page header which is clean enough.

---

## 6. Nav Animation Spec

**File:** `components/navbar.tsx`

### Underline hover animation
Replace simple `hover:text-comet-indigo` with animated underline using a `motion.span` pseudo-line:

```tsx
// NavLink component with animated underline
function NavLink({ href, children, active }: { href: string; children: React.ReactNode; active?: boolean }) {
  return (
    <Link href={href} className="relative group flex flex-col items-center">
      <span className={cn(
        "text-sm font-body font-medium transition-colors duration-200",
        active ? "text-comet-indigo" : "text-comet-text group-hover:text-comet-indigo"
      )}>
        {children}
      </span>
      {/* Animated underline */}
      <motion.span
        className="absolute -bottom-0.5 left-0 h-[2px] bg-comet-indigo rounded-full"
        initial={{ width: active ? "100%" : "0%" }}
        animate={{ width: active ? "100%" : "0%" }}
        whileHover={{ width: "100%" }}  // Note: needs group hover trigger — use CSS group approach instead (see below)
      />
    </Link>
  );
}
```

**Better approach** — use CSS custom property + Tailwind for the underline (more reliable than Framer for pure hover):
```tsx
// In tailwind.config.ts, add to keyframes:
"nav-underline": {
  "from": { transform: "scaleX(0)" },
  "to": { transform: "scaleX(1)" },
}

// NavLink via tailwind group:
<Link href={href} className="relative group pb-0.5">
  <span>{children}</span>
  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-comet-indigo rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
</Link>
```
> The CSS approach is cleaner for pure hover states; use Framer for programmatic/active states.

### Logo hover scale
```tsx
<motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.15 }}>
  <Link href="/" className="flex items-center gap-2">
    {/* SVG + Comet text */}
  </Link>
</motion.div>
```

### Mobile menu animation
Replace `animate-slide-down` CSS with Framer `AnimatePresence`:
```tsx
<AnimatePresence>
  {mobileOpen && (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      className="md:hidden overflow-hidden border-t border-comet-border"
    >
      <div className="pb-4 pt-3 space-y-1">
        {/* nav links */}
      </div>
    </motion.div>
  )}
</AnimatePresence>
```

---

## 7. Page-Level Transition Upgrades

### `app/page.tsx` (homepage)
- Remove `className="animate-page-in"` div
- Wrap entire return in `<PageMotion>`
- Add `<FadeInSection>` wrappers on each `<section>` (Featured Jobs, How It Works, Why Comet, CTA)
- Featured job rows → already stagger-animated inside `<StaggerList>` + `<StaggerItem>`

### `app/jobs/page.tsx`
- Wrap `JobListingsContent` return in `<PageMotion>`
- Job list → `<StaggerList>` + `<StaggerItem>` per card
- Page header fades in with `<FadeInSection>`

### `app/jobs/[id]/JobDetailClient.tsx`
- Wrap return in `<PageMotion>`
- Sidebar apply card: `whileHover={{ y: -1, boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}`
- "Apply Now" button: wrap in `<motion.div {...tapProps}>`

### `app/apply/[id]/ApplyGateClient.tsx`
- Wrap return in `<PageMotion>`
- Each form field gets `focus:border-comet-indigo transition-colors duration-200` (already Tailwind, no Framer needed)
- Submit button: `whileTap={{ scale: 0.97 }}`

---

## 8. Tailwind Config Additions

Add to `tailwind.config.ts` theme.extend:
```ts
animation: {
  // ...existing...
  "nav-underline": "nav-underline 0.2s ease forwards",
},
keyframes: {
  // ...existing...
  "nav-underline": {
    from: { transform: "scaleX(0)" },
    to: { transform: "scaleX(1)" },
  },
},
```

No other Tailwind changes required — `comet-*` tokens are already perfect.

---

## 9. Numbered Executor Steps

> In order. Complete each step before moving to the next.

### Step 1 — Install framer-motion
```bash
cd /path/to/comet-recruitment
npm install framer-motion
```
Verify `package.json` has `"framer-motion": "^11.x"` in dependencies.

### Step 2 — Create `components/motion.tsx`
Create the reusable motion utility file with:
- `PageMotion` (page entrance wrapper)
- `StaggerList` + `StaggerItem` (staggered list children)
- `FadeInSection` (viewport-triggered fade for sections)
- `tapProps` export (for whileTap buttons)

### Step 3 — Create `components/filter-dropdown.tsx`
Build `FilterDropdown` component:
- Uses `@radix-ui/react-dropdown-menu` (already installed) OR custom div with Framer `AnimatePresence`
- Accept `label`, `options[]`, `value`, `onChange`
- Animated panel: `initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}`
- Rotating chevron, checkmark on selected item

### Step 4 — Create `components/job-card.tsx`
Build upgraded `JobCard` component (replaces `JobRow`):
- `motion.div` with `whileHover={{ y: -2, boxShadow: "..." }}`
- 40px rounded-lg logo placeholder
- Title: Unbounded semibold 16px
- Meta line: company · location · salary
- Tag pills: type, category, experience level
- Right side: "Easy Apply" badge + Apply button with `whileTap`
- Include `TagPill` helper component in same file

### Step 5 — Upgrade `app/jobs/page.tsx`
1. Add `searchQuery` state + search bar UI (max-w-[600px], Search icon, X clear)
2. Replace pill tabs with `FilterDropdown` trio (Department, Location, Job Type)
3. Replace `JobRow` → `JobCard`
4. Wrap job list with `<StaggerList>` + `<StaggerItem>`
5. Wrap page in `<PageMotion>` (remove `animate-page-in` className)
6. Combine search + dropdown filters into unified filter logic

### Step 6 — Upgrade `components/navbar.tsx`
1. Add `framer-motion` imports
2. Wrap logo Link in `motion.div` with `whileHover={{ scale: 1.05 }}`
3. Add animated underline to nav links (CSS `scale-x-0 group-hover:scale-x-100` approach)
4. Replace mobile menu with `AnimatePresence` + `motion.div height: 0 → auto`

### Step 7 — Upgrade `app/page.tsx`
1. Replace `animate-page-in` div with `<PageMotion>`
2. Wrap each section in `<FadeInSection delay={i * 0.1}>`
3. Featured jobs list: `<StaggerList>` + `<StaggerItem>` for the 3 rows
4. Hero CTAs: wrap in `motion.div` with `whileTap`

### Step 8 — Upgrade `app/jobs/[id]/JobDetailClient.tsx`
1. Wrap in `<PageMotion>`
2. Sidebar apply card: `motion.div whileHover={{ y: -1 }}`
3. "Apply Now" button: `whileTap={{ scale: 0.97 }}`

### Step 9 — Upgrade `app/apply/[id]/ApplyGateClient.tsx`
1. Wrap in `<PageMotion>`
2. Submit button: wrap in `<motion.button whileTap={{ scale: 0.97 }}>`
3. Verify all inputs have `transition-colors duration-200` on focus states

### Step 10 — Cleanup & Polish
1. Remove `animate-page-in` CSS class usage everywhere (replaced by Framer)
2. Test stagger on jobs list — adjust `staggerChildren` timing if needed (0.04–0.06s sweet spot)
3. Test mobile nav animation on small screen
4. Verify no layout shift from motion wrappers (all should be `motion.div` not adding display changes)
5. Run `npm run build` to confirm no TypeScript errors

---

## 10. Implementation Notes for Executor

### `framer-motion` + Next.js 14 App Router
- All animated components must be in `"use client"` files — this is already true for all target files
- `AnimatePresence` must wrap at the level where components unmount/mount
- For SSR safety: wrap `motion` imports in the client component, never in server components

### Radix UI Dropdown vs Custom
- `@radix-ui/react-dropdown-menu` is already installed and handles keyboard navigation, a11y, and portal management for free
- Recommended: use Radix as the interaction primitive, but **replace its default animation** with Framer by passing `forceMount` and wrapping content in `AnimatePresence`
- Alternative: build a fully custom dropdown (simpler, but loses keyboard nav)
- **Recommendation: use Radix with custom Framer animations** for best UX + accessibility

### Salary formatting
- `formatSalary` is already imported from `@/lib/format` — use it consistently
- Expected output: `"$120K – $160K"` (verify this matches the function's output format)

### Logo images
- Currently using text initials (company name initial) — keep this until real logos are available
- The 40px `rounded-lg` container with `comet-indigo-lt` background + initial letter looks great
- When company logos exist, swap `<img src={job.company_logo} className="w-10 h-10 rounded-lg object-contain" />`

### "Easy Apply" badge
- All jobs on Comet are applied via the Comet gate (`/apply/[id]`) — so all cards get the badge
- If future jobs have `apply_direct_only: true`, conditionally hide it

---

## Summary

| What | How | Files Changed |
|---|---|---|
| Install Framer Motion | `npm install framer-motion` | `package.json` |
| Motion utils | New `components/motion.tsx` | — |
| Filter dropdowns | New `components/filter-dropdown.tsx` | — |
| Job cards | New `components/job-card.tsx` | — |
| Jobs page | Search + filters + card upgrades | `app/jobs/page.tsx` |
| Navbar | Scale logo + underline links + animated mobile | `components/navbar.tsx` |
| Homepage | PageMotion + FadeInSection + StaggerList | `app/page.tsx` |
| Job detail | PageMotion + hover sidebar | `app/jobs/[id]/JobDetailClient.tsx` |
| Apply gate | PageMotion + whileTap submit | `app/apply/[id]/ApplyGateClient.tsx` |

**Total new files:** 3  
**Modified files:** 5  
**New packages:** 1  
**Estimated executor time:** ~2–3 hours of focused implementation
