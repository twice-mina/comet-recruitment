# Comet Recruitment — Full Product & Brand Plan

> Status: Planning → Executor-ready
> Last updated: 2026-03-15
> Planner: Reena (Opus subagent)

---

## 0. Design Philosophy

**This site must not look AI-generated or vibe-coded.**

Reference points: Lever, Ashby, Greenhouse, Rippling careers pages, Linear, Stripe.
Anti-references: every generic Next.js SaaS starter, TailwindUI hero demos, "we help companies hire faster 🚀" landing pages.

### What that means in practice

| ❌ Do NOT do | ✅ Do instead |
|---|---|
| Emoji section headers | Typographic labels (ALL CAPS, spaced, muted) |
| Card grids with big centered emojis | Dense information rows, proper tables, structured lists |
| Glassmorphism / frosted cards | Flat white cards with 1px borders, clean shadows |
| Animated gradient mesh backgrounds | Solid color sections with strong typographic contrast |
| Pastel gradients | Restrained color — one strong primary, one accent, rest is neutral |
| Oversized hero with stock photo | Clean dark hero, confident headline, structured search |
| Parallax / scroll animations | Subtle fade-in only (150ms ease), nothing that draws attention to itself |
| Generic trust badges ("Trusted by 500+ companies") | Real social proof or none at all |
| "Get started for free" CTAs everywhere | Specific, action-oriented CTAs tied to actual next steps |

### Aesthetic in one sentence
> Editorial confidence. The site of a firm that's been doing this for ten years and doesn't need to prove it.

---

## 1. Brand Identity

### 1.1 Name & Concept
- **Brand name:** Comet Recruitment
- **Domain target:** cometrecruitment.com (or comet.careers)
- **Concept:** Finds jobs posted on LinkedIn, rewraps them with Comet branding, pre-screens candidates with AI, delivers vetted shortlists to companies. Recruitment-as-a-service.
- **Comet metaphor:** Precision trajectory. Fast-moving but purposeful. Not random — comets have a path. So do great hires.

### 1.2 Tagline Options
1. **"Pre-screened. Ready to land."** — Direct, hiring-side benefit, plays on "landing" a job
2. **"The fastest path between talent and the right role."** — Benefit-forward, no fluff
3. **"Recruitment at the speed of talent."** — Premium, slightly editorial

**Recommended:** Option 1. It's the most distinct and speaks directly to both audiences.

### 1.3 Color Palette

```
Name            Hex         Usage
─────────────────────────────────────────────────────────────
comet-night     #09090F     Primary dark bg (hero, nav, footers)
comet-void      #13121E     Secondary dark surface
comet-indigo    #4338CA     Brand primary — buttons, links, active states
comet-indigo-d  #3730A3     Hover state for indigo
comet-indigo-l  #EEF2FF     Indigo tint — subtle highlights, tag bg
comet-streak    #F97316     Accent — orange, like a comet trail. Sparse use only.
comet-streak-d  #EA6B0A     Hover state for streak/orange
comet-white     #FFFFFF     Cards, form surfaces
comet-paper     #FAFAF9     Page background (warm near-white)
comet-stone     #F4F4F5     Alternate section bg (subtle variation)
comet-border    #E4E4E7     All borders, dividers
comet-text      #09090B     Primary body text
comet-muted     #71717A     Secondary text (labels, metadata)
comet-dim       #A1A1AA     Tertiary / placeholder text
```

**Accent usage rule:** `comet-streak` (orange) appears only on:
- Score badges that are "passing"
- The logo mark (comet tail)
- 1-2 key CTA buttons on marketing pages
- Nowhere else. It earns its attention by being rare.

**Indigo usage:** Primary brand color for interactive elements. Not backgrounds. Not decorative.

### 1.4 Typography

```
Role          Font                  Weight        Google Fonts?
──────────────────────────────────────────────────────────────
Display       Instrument Serif      400 (italic)  ✅
Heading       Sora                  600–700       ✅
Body          Inter                 400–500       ✅
UI / Labels   Inter                 500–600       ✅
Mono          JetBrains Mono        400           ✅ (for scores/code)
```

**Usage rules:**
- `Instrument Serif` (italic) used ONLY for the single focal phrase in hero headlines and select pull-quotes. E.g.: *"Ready to land."* — that one phrase in the hero, in Instrument Serif italic, surrounded by Sora bold. Creates editorial contrast without being precious.
- `Sora` for all headings H1–H4
- `Inter` for everything else
- Never mix more than 2 fonts in a single component

### 1.5 Logo Concept
- **Wordmark:** "Comet" in Sora 700, "Recruitment" in Sora 400 lighter weight, slightly smaller, same baseline
- **Mark:** A minimal comet glyph — small circle (nucleus) with a tapering tail line extending to the upper right at ~45°. 2 colors: indigo circle, orange tail. Single SVG path.
- **Usage:** Mark + wordmark together in nav. Mark alone as favicon/avatar.
- **Anti-patterns:** No gradients in logo. No glow effects. No orbiting rings.

---

## 2. Information Architecture

```
/ (homepage)
/jobs (job board — public, no login)
/jobs/[id] (job detail)
/apply/[id] (application gate → screening consent)
/screening/[id] (candidate screening form)
/screening/[id]/result (pass/fail + next steps)
/admin (protected — Google Auth)
/admin/import (LinkedIn job import tool)
/admin/jobs/[id]/candidates (candidate pipeline per job)
```

---

## 3. Page-by-Page Redesign Spec

### 3.1 Root Layout (`app/layout.tsx`)

**Metadata:**
```
title.default: "Comet Recruitment — Pre-screened talent, faster hires"
title.template: "%s | Comet Recruitment"
description: "Comet Recruitment delivers pre-screened candidates for your open roles. Browse jobs or let us find the right fit."
og.url: https://cometrecruitment.com
```

**Fonts:** Load Instrument Serif (400 italic), Sora (600, 700), Inter (400, 500, 600)

**Tailwind tokens:** Replace all `tpa-*` with `comet-*` as defined in §1.3.

---

### 3.2 Navbar

**Layout:** Full-width, `position: sticky top-0`, `z-50`
**Style:** White background, 1px bottom border (`comet-border`), no shadow
**Height:** 56px

**Left:** Logo mark + wordmark
**Center (desktop):** `Jobs` | `How It Works` | `For Companies`
**Right:** `Post a Role` (ghost button, indigo border) | `Sign In` (link)

**No dropdown menus. No mega-menus.** Flat, clean navigation.

Mobile: Hamburger → slide-down menu (no sidedrawer). Same links in a vertical stack.

---

### 3.3 Homepage (`app/page.tsx`)

Remove: Login wall, TPA branding, all emoji headers, the "Career Resources" section (TPA-specific), certification language.

**Section 1: Hero**
```
Background: comet-night (#09090F)
Layout: max-w-5xl, centered, py-24

Content (top to bottom):
  - Eyebrow label: "RECRUITMENT · AI-POWERED PRE-SCREENING"
    Style: Inter 500, 11px, letter-spacing 0.12em, comet-muted
  
  - H1 headline (Sora 700, 52px desktop / 36px mobile):
    "The right candidates,"
    followed by an Instrument Serif italic line: "already vetted."
  
  - Subheading (Inter 400, 18px, comet-dim):
    "We source from LinkedIn, run AI screening, and deliver a shortlist —
     so your team only interviews people worth interviewing."
  
  - Search bar (large, white bg, 1px comet-border):
    Placeholder: "Search roles by title, company, or skill..."
    Inline search icon left, "Search" button right (comet-indigo bg)
    Below bar: Quick links: "Engineering  ·  Product  ·  Design  ·  Operations"
    Style: Inter 400, 13px, comet-dim
  
  - Live count strip:
    "{n} open roles" · "Updated today" · "via Comet"
    Style: Inter 400, 13px, comet-dim. NO icons. Just text with · separators.
```

**Section 2: Featured Jobs**
```
Background: comet-paper
Layout: max-w-5xl, py-16

Header row:
  Left: "Featured roles" (Sora 600, 20px, comet-text)
  Right: "Browse all →" (Inter 500, 14px, comet-indigo link)

Job list: NOT a card grid. A clean table-style list:
  Each row:
    - Role title (Sora 600, 15px, comet-text)  ← left
    - Company (Inter 400, 14px, comet-muted)
    - Location + type badge (e.g. "Remote · Full-time")  
    - Salary range if available (Inter 400, 14px, comet-muted)
    - "Apply →" text link (comet-indigo)  ← right
  
  Row style: border-bottom comet-border, py-4, hover: bg-comet-stone
  NO card borders on individual rows. They're rows in a list.
  
  Max 6 jobs shown. "View all {n} roles →" link below.
```

**Section 3: How It Works (for job seekers)**
```
Background: comet-white
Layout: max-w-5xl, py-16

Label: "FOR CANDIDATES" (Inter 500, 11px, letter-spacing 0.1em, comet-muted)
Heading: "Apply smarter." (Sora 700, 32px)

3 steps as a numbered list — NOT cards:
  Step 01 / Browse roles posted via Comet
  Step 02 / Complete AI-powered screening (10 min)
  Step 03 / Get matched and submitted directly to the employer

Layout: 3-column grid (desktop), stacked (mobile)
Each step: just a number (Sora 700, 48px, comet-indigo/20 — faint), heading, 1-sentence description.
No icons. No borders. No background cards. Just type and space.
```

**Section 4: How It Works (for companies)**
```
Background: comet-night
Layout: max-w-5xl, py-16

Label: "FOR COMPANIES" (Inter 500, 11px, comet-dim)
Heading: "Stop reviewing unqualified applicants." (Sora 700, 32px, white)
Sub: "We handle sourcing and screening. You get a curated shortlist." (Inter 400, 17px, comet-dim)

3 steps:
  Step 01 / Share your open role (or we find it on LinkedIn)
  Step 02 / Comet screens applicants against your criteria
  Step 03 / Receive 5–10 pre-vetted candidates within 72 hours

CTA below: "Talk to us about your hiring needs →" (comet-streak colored link)
```

**Section 5: Stats bar**
```
Background: comet-void
Layout: full-width, py-8
Content: horizontal row of 3 stats
  "48h" / Average time to first shortlist
  "87%" / Candidate-to-interview conversion
  "3.2×" / Faster than traditional job boards

Style: Number in Sora 700 28px white, label in Inter 400 13px comet-dim.
Separator: 1px vertical comet-border.
NO icons. Pure typography.
```

**Section 6: Footer CTA**
```
Background: comet-paper
py-16, centered, max-w-2xl

Heading: "Ready to move faster on your next hire?"
2 buttons: "Browse open roles" (indigo filled) | "Get in touch" (ghost)
```

---

### 3.4 Jobs Page (`app/jobs/page.tsx`)

**Header:**
```
Background: comet-night
py-10

Eyebrow: "JOB BOARD"
H1: "Open roles" (Sora 700)
Count: "{n} positions · Updated today"
```

**Filter bar (below header, sticky on scroll):**
```
Background: comet-white, border-bottom comet-border
Height: 48px, layout: horizontal scrollable row

Filters: [All] [Engineering] [Product] [Design] [Operations] [Remote] [Full-time] [Contract]
Style: pill toggles — selected: comet-indigo bg white text | unselected: comet-stone bg, comet-muted text
NO dropdowns for categories. Inline toggles are faster and more scannable.

Right side: "Sort: Recent ▾" (Inter 400, 14px, simple dropdown)
```

**Job list:**
```
Layout: max-w-3xl mx-auto (narrower than page — content width, not full bleed)
Background: comet-paper

Each job row:
  ┌─────────────────────────────────────────────────────────────┐
  │ [Co logo 32px]  Role Title (Sora 600, 15px)                 │
  │                 Company · Location · Job Type          Salary│
  │                 [tag] [tag]                          Apply → │
  └─────────────────────────────────────────────────────────────┘
  
  - Logo: 32x32px, rounded-md, 1px border, gray fallback with company initial
  - Tags: category, experience level — Inter 500 11px, comet-indigo-l bg, comet-indigo text
  - "Apply →": comet-indigo, Inter 500 14px
  - Row: border-b comet-border, py-5, hover bg-comet-stone (subtle)
  - "via Comet" attribution: shown as a tiny comet mark in the row — not "via LinkedIn"

NOT card grid. NOT bloated cards with shadows. Rows.
```

---

### 3.5 Job Detail Page (`app/jobs/[id]/JobDetailClient.tsx`)

**Header:**
```
Background: comet-night
py-10

Breadcrumb: Jobs / {Role Title}  (Inter 400, 13px, comet-dim)

H1: {Role Title} (Sora 700, 32px, white)
Meta row: {Company} · {Location} · Posted {date}
Badges: [Job Type] [Experience Level] [Category]
  Style: Inter 500, 12px, rounded-sm, comet-void bg, comet-dim text, 1px border comet-border/20
```

**2-column layout (desktop): 2/3 main + 1/3 sidebar**

**Main column:**
```
Background: comet-white, p-8, rounded-lg, border comet-border

Sections (no redundant headers, just clear typographic hierarchy):
  - "About the role" (Sora 600, 18px) → paragraphs in Inter 400
  - "What you'll do" → clean bulleted list (no icons, just • characters)
  - "What you'll bring" → same
  - "Compensation" (if available) → formatted as a figure, not buried in prose
  - "Benefits" → comma-separated tags, Inter 400, not a grid of cards

Source attribution (bottom, subtle):
  "This role was sourced by Comet Recruitment."
  Inter 400, 12px, comet-dim. NOT "via LinkedIn". Clean.
```

**Sidebar (sticky):**
```
Card 1: Apply box
  - Salary range (Sora 700, 24px, comet-text)  
  - "Apply via Comet" button (full-width, comet-indigo, Inter 600)
  - "Why apply via Comet?" expandable (accordion) — explains pre-screening benefit
  - Divider
  - "Apply directly to employer" (text link, comet-muted, opens new tab)
  - Small print: "Comet is not the employer."

Card 2: Role summary (compact)
  Company, Location, Type, Category
  Each: label (comet-dim, 11px uppercase) + value (Inter 500, 14px, comet-text)

Card 3: Similar roles (3 max)
  Just: Title + Company as links. Nothing else.
```

---

### 3.6 Application Gate (`app/apply/[id]/ApplyGateClient.tsx`)

**Redesign:** Currently TPA-branded and wordy. Strip down.

```
Background: comet-paper
Max-w: 680px centered (narrow, focused form context)

Breadcrumb: Jobs / {Title} / Apply

H1: "Apply for {Role Title}" (Sora 700, 28px)
Subhead: "Complete screening to apply via Comet · ~10 minutes" (Inter 400, comet-muted)

2-column info cards REMOVED. Replace with a single clean process note:
  "Before submitting your application, we'll ask you 3 short questions to assess fit.
   Your answers help us match you accurately — and give you better odds of an interview."
   Inter 400, 16px, comet-muted. No cards. No bullet lists. Just prose.

Primary CTA: "Start screening →" (comet-indigo, full-width)
Secondary: "Apply directly to employer" (text link below button)
```

---

### 3.7 Screening Page (`app/screening/[id]/ScreeningClient.tsx`)

**Redesign direction:** Keep the multi-section question flow but style it like a real assessment tool, not a quiz app.

```
Layout: max-w-640px centered
Background: comet-paper

Header: minimal — Role title, company, "Screening assessment"
Progress: Simple "Question 3 of 8" text + thin 1px progress bar (comet-indigo)
  NOT a fat gradient progress bar.

Question card: comet-white, border comet-border, rounded-lg, p-6
  Question text: Sora 600, 16px
  Options: clean radio rows — border-b between, py-3, label on right
    Selected: indigo left-border indicator (3px), light indigo bg
    NOT colored cards with checkmarks

Open text questions: simple <textarea>, 1px border comet-border, 
  focus: 2px outline comet-indigo (no glow), resize-y

Navigation: Previous (ghost) | Next / Submit (comet-indigo filled)
  Right-aligned. Clean.

Section tabs REMOVED — linear flow. Reduces cognitive overhead.
```

---

### 3.8 Screening Result Page (`app/screening/[id]/result`)

```
Layout: max-w-540px centered
Background: comet-paper, py-20

PASS state:
  Score: "{score}%" (Sora 700, 64px, comet-streak orange) — the ONE place orange is big
  Label: "Screening passed" (Sora 600, 20px, comet-text)
  Body: "Your application is being prepared. We'll be in touch within 48 hours
         with next steps and confirmation of submission to {Company}."
  CTA: "Browse more roles →"

FAIL state:
  Score: "{score}%" (Sora 700, 64px, comet-muted)
  Label: "Not quite yet" (Sora 600, 20px, comet-text)
  Body: Honest, specific, not patronizing.
        "Your responses suggest you'd benefit from more experience with [X].
         You can still apply directly to the employer below."
  CTA: "Apply directly →" + "Browse other roles →"
```

---

### 3.9 Admin Dashboard (`app/admin/page.tsx`)

Remove all TPA branding. Comet internal tool aesthetic: functional, dense, no decorative elements.

**Layout:** Left sidebar (fixed) + main content area

**Sidebar (220px):**
```
Background: comet-night
Logo + wordmark at top
Nav links:
  · Dashboard
  · Jobs (count badge)
  · Candidates
  · Import
  ─── (divider)
  · Settings
  · Sign out
```

**Main area sections:**

**Dashboard (overview):**
```
Stats row (4 cards, real numbers, no icons):
  - Active Listings
  - Applications this week
  - Avg. screening score
  - Pending review

Recent activity: simple table — timestamp | event | role | candidate
```

**Jobs list:**
```
Proper HTML table. Columns:
  Status (toggle pill) | Title | Company | Applications | Avg Score | Posted | Actions
  
Actions: Edit | View Pipeline | Archive
NOT floating action menus. Just text links.
```

**Import Tool (`/admin/import`):**
```
H1: "Import from LinkedIn"
Sub: "Paste a LinkedIn job URL and we'll extract the role details automatically."

Step 1 — URL input:
  <input type="url" placeholder="https://linkedin.com/jobs/view/...">
  "Extract →" button (comet-indigo)

Step 2 — Review extracted data (appears below after extraction):
  Editable form pre-filled with extracted values:
    Title, Company, Location, Description (textarea), 
    Requirements (textarea, one per line),
    Job Type (select), Salary (2x number inputs), Apply URL
  "Save to board" | "Cancel" buttons

Status states:
  - Extracting... (inline spinner next to button)
  - Extraction complete (green checkmark inline, no toast)
  - Failed: error message inline, not a modal
```

**Candidate Pipeline (`/admin/jobs/[id]/candidates`):**
```
H1: "{Role Title} — Candidates"
Subtitle: "{n} applications · {n} passed screening · {n} pending review"

Table columns:
  Name | Email | Applied | Score | Status | LinkedIn | Actions

Status values: Screened · Submitted · Interviewing · Offer · Rejected
  Style: text only with a colored dot indicator (semantic colors)

Score column: "{score}%" in Inter 500, colored only if <50% (comet-muted)

Actions per row: View responses | Submit to client | Reject | Export

"Export all CSV" button: top-right, ghost style, Inter 500 14px
```

---

## 4. Firestore Data Model

### Collection: `jobs`
```typescript
interface Job {
  id: string;                    // Firestore doc ID
  title: string;
  company: string;
  company_logo_url?: string;     // NEW: for job card logos
  location: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  preferred_qualifications: string[];
  salary_min?: number;
  salary_max?: number;
  salary_currency?: string;      // default "USD"
  job_type: "remote" | "hybrid" | "onsite";
  employment_type: "full-time" | "part-time" | "contract"; // NEW
  category: string;
  experience_level: "entry" | "mid" | "senior" | "lead" | "executive";
  posted_date: string;           // ISO date string
  expires_date?: string;         // NEW: for auto-expiry
  is_active: boolean;
  apply_url: string;             // employer's direct apply URL
  source_url?: string;           // LinkedIn URL this was sourced from
  source: "linkedin" | "manual" | "direct"; // NEW
  employer_confidential: boolean;
  verification_status: "verified" | "pending";
  skill_tags: string[];          // NEW: flat array for filtering
  screening_questions: ScreeningQuestion[]; // NEW: job-specific questions
  comet_notes?: string;          // internal admin notes
  created_at: Timestamp;
  updated_at: Timestamp;
}
```

### Collection: `applications`
```typescript
interface Application {
  id: string;                    // Firestore doc ID
  job_id: string;
  job_title: string;
  company: string;
  
  // Candidate info
  candidate_name: string;
  candidate_email: string;
  candidate_linkedin_url?: string;
  resume_url?: string;           // Storage bucket URL
  
  // Screening
  screening_answers: Record<string, string>; // questionId → answer
  screening_score?: number;      // 0–100
  screening_passed?: boolean;
  screening_completed_at?: Timestamp;
  ai_evaluation?: {             // NEW: AI scoring breakdown
    overall_score: number;
    category_scores: Record<string, number>;
    summary: string;
    recommendation: "strong_yes" | "yes" | "maybe" | "no";
  };
  
  // Status tracking
  status: "pending_screening" | "screening_complete" | "submitted_to_client" 
        | "interviewing" | "offer" | "rejected" | "withdrawn";
  
  // Timestamps
  created_at: Timestamp;
  updated_at: Timestamp;
  submitted_to_client_at?: Timestamp;
}
```

### Collection: `screening_templates`
```typescript
interface ScreeningTemplate {
  id: string;
  name: string;                  // e.g. "Engineering — General"
  category?: string;             // links to job.category
  questions: ScreeningQuestion[];
  created_at: Timestamp;
}

interface ScreeningQuestion {
  id: string;
  type: "multiple_choice" | "open_text" | "scenario";
  question: string;
  options?: string[];            // for multiple_choice
  correct_answer?: number;       // index, for auto-scoring
  weight: number;                // 1–5, for scoring
  rubric?: string;               // for AI evaluation
}
```

### Collection: `admin_users`
```typescript
interface AdminUser {
  uid: string;                   // Firebase Auth UID
  email: string;
  role: "admin" | "viewer";
  created_at: Timestamp;
}
```

---

## 5. LinkedIn Scraping Strategy

### Approach: Server-side route + Scraper subagent

The admin pastes a LinkedIn job URL into the Import tool. The flow:

```
Admin UI (paste URL) 
  → POST /api/admin/import-linkedin { url }
  → Server-side route validates URL pattern
  → Spawns scraper (Puppeteer via Next.js API route or separate Node script)
  → Scraper navigates to URL, extracts structured data
  → Returns JSON to client
  → Admin reviews pre-filled form, edits if needed
  → Submits → saves to Firestore as new Job document
```

### Scraper implementation

Use `puppeteer-core` with `@sparticuz/chromium` for serverless compatibility (runs in Next.js API route on Vercel).

**Target data to extract from LinkedIn job page:**
```
- job title (.top-card-layout__title)
- company name (.topcard__org-name-link or text)
- company logo URL (img.artdeco-entity-image)
- location (.topcard__flavor--bullet)
- job type (remote/hybrid/onsite from criteria list)
- seniority level
- employment type (full-time/contract/part-time)
- posted date
- job description (#job-details .show-more-less-html__markup)
- apply URL (the "Apply" button href, or the LinkedIn job URL itself)
```

**Fallback:** If LinkedIn blocks (bot detection), the admin form is still shown pre-filled with just the URL and blanks — admin fills manually.

**Rate limiting:** 1 import per 10 seconds (server-side). No automated bulk import (legal grey area).

**Attribution:** Store `source_url` (the LinkedIn URL) in Firestore. Display to public as "via Comet" only — never show the LinkedIn URL on public pages.

### API Route: `app/api/admin/import-linkedin/route.ts`
```typescript
// POST body: { url: string }
// Response: { job: Partial<Job> } | { error: string }

// Steps:
// 1. Validate URL matches linkedin.com/jobs/view/
// 2. Launch Puppeteer
// 3. Navigate with realistic user-agent + wait for selectors
// 4. Extract fields, return Partial<Job>
```

---

## 6. New Firebase Project Setup

### Project
- **Firebase project name:** `comet-recruitment`
- **Project ID:** `comet-recruitment-prod`
- **Services needed:** Firestore, Authentication (Google), Storage (resume uploads)

### Required Environment Variables
```bash
# Firebase client (public — NEXT_PUBLIC_)
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=comet-recruitment-prod.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=comet-recruitment-prod
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=comet-recruitment-prod.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Firebase Admin SDK (server-side only — never expose)
FIREBASE_SERVICE_ACCOUNT_KEY={"type":"service_account",...}
# OR individual fields:
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=

# AI screening (server-side)
OPENAI_API_KEY=                  # for AI evaluation of open-text answers

# Email (server-side)
RESEND_API_KEY=                  # for confirmation emails to candidates
RESEND_FROM_EMAIL=hello@cometrecruitment.com

# App
NEXT_PUBLIC_SITE_URL=https://cometrecruitment.com
NEXT_PUBLIC_APP_ENV=production   # "development" | "production"

# Admin
ADMIN_ALLOWED_EMAILS=            # comma-separated, whitelist for admin access
```

### Firestore Security Rules (key points)
```
- jobs: read = public (is_active == true), write = admin only
- applications: create = public, read/write = admin only
- admin_users: read/write = admin only
- screening_templates: read = public, write = admin only
```

---

## 7. Tailwind Config — Full Token Replacement

Replace `tpa-*` color tokens with:

```typescript
// tailwind.config.ts
colors: {
  comet: {
    night: "#09090F",
    void: "#13121E",
    indigo: "#4338CA",
    "indigo-dark": "#3730A3",
    "indigo-light": "#EEF2FF",
    streak: "#F97316",
    "streak-dark": "#EA6B0A",
    white: "#FFFFFF",
    paper: "#FAFAF9",
    stone: "#F4F4F5",
    border: "#E4E4E7",
    text: "#09090B",
    muted: "#71717A",
    dim: "#A1A1AA",
  }
}

fontFamily: {
  display: ["Instrument Serif", "serif"],
  heading: ["Sora", "sans-serif"],
  body: ["Inter", "sans-serif"],
  mono: ["JetBrains Mono", "monospace"],
}
```

---

## 8. Executor Steps

Work in order. Each step is independent enough to run, but test before moving on.

### Step 1 — Project cleanup & token replacement
- [ ] Remove all `tpa-*` references from tailwind.config.ts, globals.css, and all component files
- [ ] Add `comet-*` tokens to tailwind.config.ts
- [ ] Update `app/layout.tsx`: new fonts (Instrument Serif, Sora, Inter, JetBrains Mono), new metadata
- [ ] Update `.env.local.example` with all new env var keys

### Step 2 — Navbar rebuild
- [ ] Create `components/navbar.tsx` from scratch
- [ ] Sticky, white, 1px border, 56px height
- [ ] Left: Comet logo SVG mark + wordmark
- [ ] Center: nav links
- [ ] Right: "Post a Role" + "Sign In"
- [ ] Mobile: hamburger → vertical dropdown

### Step 3 — Footer rebuild
- [ ] Create `components/footer.tsx`
- [ ] 3-column: Company links | For candidates | For companies
- [ ] Bottom strip: © Comet Recruitment · Privacy · Terms
- [ ] Background: comet-night, clean

### Step 4 — Homepage rebuild
- [ ] Rebuild `app/page.tsx` section by section per §3.3 spec
- [ ] Hero: dark, no gradient mesh, strong typography, search bar
- [ ] Featured jobs: list-style rows (not cards)
- [ ] How it works x2: numbered steps, no icons, no cards
- [ ] Stats bar: 3 numbers, typographic only
- [ ] Footer CTA: minimal

### Step 5 — JobCard component redesign
- [ ] Rebuild `components/job-card.tsx`
- [ ] Row-style: logo (32px) | title + meta | salary | apply link
- [ ] No shadow, no rounded card border, just row border-b
- [ ] Hover: bg-comet-stone (subtle)
- [ ] Tag pills: comet-indigo-light bg, comet-indigo text

### Step 6 — Jobs page rebuild
- [ ] Rebuild `app/jobs/page.tsx`
- [ ] Dark header, eyebrow label, H1, count
- [ ] Filter bar: sticky pill toggles (not dropdowns)
- [ ] List of JobCard rows
- [ ] Empty state: typographic (no emoji), "No roles match your filters."

### Step 7 — Job detail page rebuild
- [ ] Rebuild `app/jobs/[id]/JobDetailClient.tsx`
- [ ] Dark header with breadcrumb, title, meta, badges
- [ ] 2-col layout: main content + sidebar
- [ ] Apply sidebar: CTA, direct link, role summary, similar roles
- [ ] Clean prose sections, no "Why This Role Fits TPA Candidates" block

### Step 8 — Apply gate redesign
- [ ] Rebuild `app/apply/[id]/ApplyGateClient.tsx`
- [ ] Narrow single-column layout
- [ ] Remove info cards, simplify prose
- [ ] Clean CTA + direct apply fallback

### Step 9 — Screening redesign
- [ ] Rebuild `app/screening/[id]/ScreeningClient.tsx`
- [ ] Linear question flow (remove section tabs)
- [ ] Clean question cards (left-border selected state, no glow)
- [ ] "Question N of N" text progress, thin progress bar
- [ ] Create `app/screening/[id]/result/page.tsx` — pass/fail result page

### Step 10 — Admin dashboard rebuild
- [ ] Add sidebar navigation to admin
- [ ] Rebuild job table with proper columns (Status, Title, Company, Applications, Avg Score, Posted, Actions)
- [ ] Add candidate pipeline view: `/admin/jobs/[id]/candidates`
  - Table: Name, Email, Applied, Score, Status, LinkedIn, Actions
  - "Export CSV" button

### Step 11 — LinkedIn import tool
- [ ] Create `app/admin/import/page.tsx` — URL input + review form
- [ ] Create `app/api/admin/import-linkedin/route.ts` — server route
- [ ] Install puppeteer-core + @sparticuz/chromium
- [ ] Build scraper: navigate URL, extract fields, return JSON
- [ ] Wire up UI: loading state → pre-filled form → save to Firestore

### Step 12 — AI screening evaluation
- [ ] Create `app/api/screening/evaluate/route.ts`
- [ ] Accept: job info + candidate answers
- [ ] Call OpenAI to evaluate open-text answers against job requirements
- [ ] Return: score 0–100, category scores, summary, recommendation
- [ ] Store result in application.ai_evaluation
- [ ] Wire into screening submit flow

### Step 13 — Email confirmation
- [ ] Install resend package
- [ ] Create `lib/email.ts` with sendConfirmation function
- [ ] Trigger after screening submission: email to candidate
  - Subject: "Your Comet application for {Role Title}"
  - Body: score, pass/fail, next steps
- [ ] Create `app/api/applications/create/route.ts` if not exists

### Step 14 — Firebase project setup
- [ ] Create new Firebase project "comet-recruitment-prod"
- [ ] Enable Firestore, Authentication (Google), Storage
- [ ] Copy env vars to `.env.local`
- [ ] Update Firestore security rules per §6
- [ ] Test: add a job, subscribe, confirm real-time updates work

### Step 15 — Types update
- [ ] Update `lib/types.ts` to match new Firestore data model (§4)
- [ ] Add: company_logo_url, employment_type, expires_date, source, skill_tags, 
         screening_questions, comet_notes, ai_evaluation
- [ ] Update mock data in `lib/mock-data.ts` to match new type
- [ ] Rename all `tpa_certification_preferred` → remove (not needed for Comet)

### Step 16 — QA & polish
- [ ] Audit all pages for any remaining TPA/Prompt Academy references
- [ ] Audit all pages for emoji headers, glassmorphism, gradient blobs → remove
- [ ] Check typography: Instrument Serif italic used in exactly one place per page max
- [ ] Check color: comet-streak (orange) appears only in score display and logo
- [ ] Mobile responsive check on all pages
- [ ] Test LinkedIn import with a real job URL

---

## 9. What We're NOT Building (yet)

- Candidate accounts / login (not needed for MVP)
- Company dashboard (companies receive candidates via email for now)
- Stripe billing
- Automated LinkedIn job discovery (manual import only)
- Multi-step resume parsing

These are post-MVP. Don't scope-creep the executor.

---

## 10. Key Decisions Log

| Decision | Rationale |
|---|---|
| No login wall on job board | Friction kills top-of-funnel. Public browsing is table stakes. |
| Row-style job list, not card grid | Cards = visual noise. Rows = information density. Better UX for scanning many roles. |
| Instrument Serif italic for display only | Editorial contrast without being precious. One use per page. |
| Comet-streak (orange) for scores only | Rarity = impact. If everything is orange, nothing is. |
| Linear screening flow (no section tabs) | Tabs create "how much is left?" anxiety. Linear with N of N is clearer. |
| Source shown as "via Comet" not "via LinkedIn" | Brand clarity. LinkedIn attribution is internal (source_url field). |
| Puppeteer for LinkedIn scraping | Best option for JS-rendered content. Fallback: manual form. |
| Resend for email | Better DX than SendGrid, similar deliverability. |

---

## AMENDMENT — Light Mode Only (added by Reena, 2026-03-15)

**Kaz direction: no dark mode. Light mode only throughout.**

### Updated color palette

```
comet-bg        #FFFFFF     Page background
comet-surface   #F8F8FC     Secondary surface (sidebar, cards, table rows)
comet-border    #E5E5E5     Borders, dividers
comet-text      #09090F     Primary text (comet-night — text only, never bg)
comet-muted     #6B7280     Secondary text
comet-indigo    #4338CA     Primary brand accent (CTAs, links, active states)
comet-indigo-lt #EEF2FF     Indigo tint bg (subtle badges, hover states)
comet-streak    #F97316     Orange accent (logo tail, passing score only)
```

### What changes from the original plan
- `comet-night` and `comet-void` are NO LONGER used as backgrounds
- Hero section: white/light background, not dark
- Nav: white with bottom border, not dark
- Footer: light gray (`#F8F8FC`), not dark
- All `bg-comet-night` references → `bg-white` or `bg-comet-surface`
- Text on all surfaces: `text-comet-text` (dark on light)
- Strong typography contrast still achieved — just dark-on-light instead of light-on-dark

