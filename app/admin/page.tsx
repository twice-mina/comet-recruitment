"use client";

import { useEffect, useState, useCallback } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { signInWithGoogle, logOut } from "@/lib/firebase/auth";
import {
  subscribeToAllJobs,
  addJobToFirestore,
  updateJobInFirestore,
  deleteJobFromFirestore,
} from "@/lib/firebase/jobs";
import { Job, JOB_CATEGORIES, JOB_TYPES } from "@/lib/types";
import { formatSalary, formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";

type SidebarTab = "dashboard" | "jobs" | "candidates" | "import";

// ---------- mock candidates ----------
const MOCK_CANDIDATES = [
  { id: "1", name: "Sarah Chen", role: "Senior Software Engineer, Backend", score: 87, date: "2026-03-13", status: "Screened" },
  { id: "2", name: "Marcus Rivera", role: "Product Designer", score: 74, date: "2026-03-12", status: "Submitted" },
  { id: "3", name: "Priya Patel", role: "Staff Machine Learning Engineer", score: 92, date: "2026-03-11", status: "Interviewing" },
  { id: "4", name: "Jordan Osei", role: "Product Manager, Growth", score: 41, date: "2026-03-10", status: "Screened" },
  { id: "5", name: "Yuki Tanaka", role: "Frontend Engineer", score: 68, date: "2026-03-09", status: "Rejected" },
];

type FormData = Omit<Job, "id"> & { requirementsText: string };

const emptyForm: FormData = {
  title: "",
  company: "",
  location: "",
  description: "",
  responsibilities: [],
  requirements: [],
  preferred_qualifications: [],
  requirementsText: "",
  salary_min: 0,
  salary_max: 0,
  job_type: "remote",
  category: JOB_CATEGORIES[0],
  posted_date: new Date().toISOString().split("T")[0],
  is_active: true,
  tpa_certification_preferred: false,
  apply_url: "",
  experience_level: "mid",
  employer_confidential: false,
  verification_status: "pending",
  last_verified: "",
  certification_tier: "core",
  skill_categories: [],
  source_url: "",
};

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [activeTab, setActiveTab] = useState<SidebarTab>("dashboard");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [importUrl, setImportUrl] = useState("");
  const [importing, setImporting] = useState(false);
  const [importStatus, setImportStatus] = useState<string>("");

  useEffect(() => {
    if (!auth) { setAuthLoading(false); return; }
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthLoading(false);
    });
    return unsub;
  }, []);

  useEffect(() => {
    if (!user) return;
    const unsub = subscribeToAllJobs(setJobs);
    return unsub;
  }, [user]);

  const handleLogin = async () => {
    try { await signInWithGoogle(); }
    catch (e: unknown) { setError(e instanceof Error ? e.message : "Login failed"); }
  };

  const handleLogout = async () => {
    await logOut();
    setUser(null);
  };

  const openNewForm = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEditForm = (job: Job) => {
    setEditingId(job.id);
    setForm({ ...job, requirementsText: job.requirements.join("\n") });
    setShowForm(true);
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      const data: Omit<Job, "id"> = {
        ...form,
        requirements: form.requirementsText.split("\n").map((r) => r.trim()).filter(Boolean),
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { requirementsText, ...rest } = data as FormData;
      if (editingId) {
        await updateJobInFirestore(editingId, rest);
      } else {
        await addJobToFirestore(rest);
      }
      setShowForm(false);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this job listing?")) return;
    try { await deleteJobFromFirestore(id); }
    catch (e: unknown) { setError(e instanceof Error ? e.message : "Delete failed"); }
  };

  const handleToggleActive = useCallback(async (job: Job) => {
    try { await updateJobInFirestore(job.id, { is_active: !job.is_active }); }
    catch (e: unknown) { setError(e instanceof Error ? e.message : "Update failed"); }
  }, []);

  const handleImport = () => {
    if (!importUrl.trim()) return;
    setImporting(true);
    setImportStatus("");
    setTimeout(() => {
      setImporting(false);
      setImportStatus("Extraction complete. Review and save the extracted details below.");
    }, 1500);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-comet-surface">
        <p className="text-comet-muted font-body text-sm">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-comet-surface">
        <div className="bg-white rounded-lg border border-comet-border p-8 max-w-sm w-full text-center">
          <div className="flex items-center justify-center gap-2 mb-5">
            <svg width="18" height="18" viewBox="0 0 22 22" fill="none">
              <circle cx="14" cy="8" r="5" fill="#4338CA" />
              <path d="M10.5 11.5L3 19" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <span className="font-heading font-semibold text-comet-text">Comet Admin</span>
          </div>
          <p className="text-sm font-body text-comet-muted mb-6">Sign in to manage job listings</p>
          {error && <p className="text-red-500 text-sm mb-4 font-body">{error}</p>}
          <button
            onClick={handleLogin}
            className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-comet-indigo text-white text-sm font-medium font-body hover:bg-[#3730A3] transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  // Form view
  if (showForm) {
    return (
      <div className="min-h-screen bg-comet-surface">
        <div className="bg-white border-b border-comet-border">
          <div className="max-w-3xl mx-auto px-4 py-5 flex items-center justify-between">
            <h1 className="font-heading font-semibold text-comet-text">
              {editingId ? "Edit Job" : "Add New Job"}
            </h1>
            <button onClick={() => setShowForm(false)} className="text-sm font-body text-comet-indigo hover:underline">
              ← Back
            </button>
          </div>
        </div>
        <div className="max-w-3xl mx-auto px-4 py-8">
          {error && <p className="text-red-500 text-sm mb-4 font-body bg-red-50 p-3 rounded">{error}</p>}
          <div className="bg-white rounded-lg border border-comet-border p-6 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium font-body text-comet-muted mb-1.5">Job Title *</label>
                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full rounded-md border border-comet-border px-3 py-2 text-sm font-body text-comet-text focus:outline-none" placeholder="e.g. Senior Engineer" />
              </div>
              <div>
                <label className="block text-xs font-medium font-body text-comet-muted mb-1.5">Company *</label>
                <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })}
                  className="w-full rounded-md border border-comet-border px-3 py-2 text-sm font-body text-comet-text focus:outline-none" placeholder="e.g. Vercel" />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium font-body text-comet-muted mb-1.5">Location *</label>
                <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="w-full rounded-md border border-comet-border px-3 py-2 text-sm font-body text-comet-text focus:outline-none" placeholder="Remote / San Francisco, CA" />
              </div>
              <div>
                <label className="block text-xs font-medium font-body text-comet-muted mb-1.5">Category *</label>
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full rounded-md border border-comet-border px-3 py-2 text-sm font-body text-comet-text focus:outline-none">
                  {JOB_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium font-body text-comet-muted mb-1.5">Job Type</label>
                <select value={form.job_type} onChange={(e) => setForm({ ...form, job_type: e.target.value as Job["job_type"] })}
                  className="w-full rounded-md border border-comet-border px-3 py-2 text-sm font-body text-comet-text focus:outline-none">
                  {JOB_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium font-body text-comet-muted mb-1.5">Salary Min ($)</label>
                <input type="number" value={form.salary_min || ""}
                  onChange={(e) => setForm({ ...form, salary_min: Number(e.target.value) })}
                  className="w-full rounded-md border border-comet-border px-3 py-2 text-sm font-body text-comet-text focus:outline-none" placeholder="120000" />
              </div>
              <div>
                <label className="block text-xs font-medium font-body text-comet-muted mb-1.5">Salary Max ($)</label>
                <input type="number" value={form.salary_max || ""}
                  onChange={(e) => setForm({ ...form, salary_max: Number(e.target.value) })}
                  className="w-full rounded-md border border-comet-border px-3 py-2 text-sm font-body text-comet-text focus:outline-none" placeholder="160000" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium font-body text-comet-muted mb-1.5">Description *</label>
              <textarea rows={5} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full rounded-md border border-comet-border px-3 py-2 text-sm font-body text-comet-text focus:outline-none" placeholder="Full job description..." />
            </div>
            <div>
              <label className="block text-xs font-medium font-body text-comet-muted mb-1.5">Requirements (one per line)</label>
              <textarea rows={4} value={form.requirementsText} onChange={(e) => setForm({ ...form, requirementsText: e.target.value })}
                className="w-full rounded-md border border-comet-border px-3 py-2 text-sm font-body text-comet-text focus:outline-none" placeholder="5+ years experience..." />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium font-body text-comet-muted mb-1.5">Apply URL *</label>
                <input value={form.apply_url} onChange={(e) => setForm({ ...form, apply_url: e.target.value })}
                  className="w-full rounded-md border border-comet-border px-3 py-2 text-sm font-body text-comet-text focus:outline-none" placeholder="https://company.com/apply" />
              </div>
              <div>
                <label className="block text-xs font-medium font-body text-comet-muted mb-1.5">Posted Date</label>
                <input type="date" value={form.posted_date} onChange={(e) => setForm({ ...form, posted_date: e.target.value })}
                  className="w-full rounded-md border border-comet-border px-3 py-2 text-sm font-body text-comet-text focus:outline-none" />
              </div>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                className="w-4 h-4 accent-comet-indigo" />
              <span className="text-sm font-body text-comet-text">Active</span>
            </label>
            <div className="flex items-center gap-3 pt-2">
              <button onClick={handleSave} disabled={saving}
                className="px-5 py-2.5 rounded-md bg-comet-indigo text-white text-sm font-medium font-body hover:bg-[#3730A3] transition-colors disabled:opacity-50">
                {saving ? "Saving..." : editingId ? "Update" : "Create Job"}
              </button>
              <button onClick={() => setShowForm(false)}
                className="px-5 py-2.5 rounded-md border border-comet-border text-comet-muted text-sm font-body hover:text-comet-text transition-colors">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const NAV_TABS: [SidebarTab, string][] = [
    ["dashboard", "Dashboard"],
    ["jobs", "Jobs"],
    ["candidates", "Candidates"],
    ["import", "Import"],
  ];

  // Main admin layout
  return (
    <div className="min-h-screen bg-comet-surface flex flex-col md:flex-row">
      {/* Mobile top nav */}
      <div className="md:hidden bg-white border-b border-comet-border">
        <div className="flex items-center justify-between px-4 py-3 border-b border-comet-border">
          <div className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 22 22" fill="none">
              <circle cx="14" cy="8" r="5" fill="#4338CA" />
              <path d="M10.5 11.5L3 19" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <span className="font-heading font-semibold text-sm text-comet-text">Comet Admin</span>
          </div>
          <button onClick={handleLogout} className="text-xs font-body text-comet-muted hover:text-comet-text transition-colors">
            Sign out
          </button>
        </div>
        <div className="flex overflow-x-auto no-scrollbar">
          {NAV_TABS.map(([tab, label]) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "flex-shrink-0 px-4 py-2.5 text-sm font-body border-b-2 transition-colors whitespace-nowrap",
                activeTab === tab
                  ? "border-comet-indigo text-comet-indigo font-medium"
                  : "border-transparent text-comet-muted hover:text-comet-text"
              )}
            >
              {label}
              {tab === "jobs" && jobs.length > 0 && (
                <span className="ml-1 text-xs text-comet-muted">({jobs.length})</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-52 bg-white border-r border-comet-border flex-shrink-0 flex-col">
        <div className="p-5 border-b border-comet-border">
          <div className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 22 22" fill="none">
              <circle cx="14" cy="8" r="5" fill="#4338CA" />
              <path d="M10.5 11.5L3 19" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <span className="font-heading font-semibold text-sm text-comet-text">Comet Admin</span>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-0.5">
          {NAV_TABS.map(([tab, label]) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "w-full text-left px-3 py-2 rounded-md text-sm font-body transition-colors",
                activeTab === tab
                  ? "bg-comet-indigo-lt text-comet-indigo font-medium"
                  : "text-comet-muted hover:text-comet-text hover:bg-comet-surface"
              )}
            >
              {label}
              {tab === "jobs" && jobs.length > 0 && (
                <span className="ml-1.5 text-xs text-comet-muted">({jobs.length})</span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-comet-border">
          <p className="text-xs font-body text-comet-muted truncate mb-2">{user.email}</p>
          <button onClick={handleLogout}
            className="text-xs font-body text-comet-muted hover:text-comet-text transition-colors">
            Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto min-w-0">
        {error && (
          <div className="bg-red-50 border-b border-red-200 px-6 py-3">
            <p className="text-sm text-red-600 font-body">{error}</p>
          </div>
        )}

        {/* Dashboard */}
        {activeTab === "dashboard" && (
          <div className="p-4 sm:p-8">
            <h1 className="font-heading font-semibold text-xl text-comet-text mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                ["Active Listings", jobs.filter((j) => j.is_active).length],
                ["Applications this week", MOCK_CANDIDATES.length],
                ["Avg. screening score", "72%"],
                ["Pending review", MOCK_CANDIDATES.filter((c) => c.status === "Screened").length],
              ].map(([label, value]) => (
                <div key={label as string} className="bg-white border border-comet-border rounded-lg p-5">
                  <p className="text-xs font-body text-comet-muted uppercase tracking-wide mb-1">{label}</p>
                  <p className="font-heading font-bold text-2xl text-comet-text">{value}</p>
                </div>
              ))}
            </div>
            <p className="text-sm font-body text-comet-muted">Use the sidebar to manage jobs, review candidates, or import from LinkedIn.</p>
          </div>
        )}

        {/* Jobs */}
        {activeTab === "jobs" && (
          <div className="p-4 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="font-heading font-semibold text-xl text-comet-text">Jobs</h1>
              <button onClick={openNewForm}
                className="px-4 py-2 rounded-md bg-comet-indigo text-white text-sm font-medium font-body hover:bg-[#3730A3] transition-colors">
                + Add Job
              </button>
            </div>

            {jobs.length === 0 ? (
              <p className="text-sm font-body text-comet-muted">No jobs yet. Click &ldquo;+ Add Job&rdquo; to get started.</p>
            ) : (
              <div className="bg-white border border-comet-border rounded-lg overflow-x-auto">
                <table className="w-full text-sm min-w-[500px]">
                  <thead>
                    <tr className="bg-comet-surface border-b border-comet-border text-left">
                      <th className="px-4 py-3 text-xs font-medium font-body text-comet-muted uppercase tracking-wide">Status</th>
                      <th className="px-4 py-3 text-xs font-medium font-body text-comet-muted uppercase tracking-wide">Title</th>
                      <th className="px-4 py-3 text-xs font-medium font-body text-comet-muted uppercase tracking-wide hidden md:table-cell">Company</th>
                      <th className="px-4 py-3 text-xs font-medium font-body text-comet-muted uppercase tracking-wide hidden lg:table-cell">Salary</th>
                      <th className="px-4 py-3 text-xs font-medium font-body text-comet-muted uppercase tracking-wide hidden sm:table-cell">Posted</th>
                      <th className="px-4 py-3 text-xs font-medium font-body text-comet-muted uppercase tracking-wide text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobs.map((job) => (
                      <tr key={job.id} className="border-b border-comet-border hover:bg-comet-surface transition-colors last:border-0">
                        <td className="px-4 py-3">
                          <button
                            onClick={() => handleToggleActive(job)}
                            className={cn(
                              "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-body transition-colors",
                              job.is_active
                                ? "bg-green-50 text-green-700 hover:bg-green-100"
                                : "bg-comet-surface text-comet-muted hover:bg-comet-border"
                            )}
                          >
                            <span className={cn("w-1.5 h-1.5 rounded-full", job.is_active ? "bg-green-500" : "bg-comet-muted")} />
                            {job.is_active ? "Active" : "Inactive"}
                          </button>
                        </td>
                        <td className="px-4 py-3 font-medium font-body text-comet-text">{job.title}</td>
                        <td className="px-4 py-3 text-comet-muted font-body hidden md:table-cell">{job.company}</td>
                        <td className="px-4 py-3 text-comet-muted font-body hidden lg:table-cell">{formatSalary(job.salary_min, job.salary_max)}</td>
                        <td className="px-4 py-3 text-comet-muted font-body hidden sm:table-cell">{formatDate(job.posted_date)}</td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-3">
                            <button onClick={() => openEditForm(job)}
                              className="text-xs font-body text-comet-indigo hover:underline">Edit</button>
                            <button onClick={() => handleDelete(job.id)}
                              className="text-xs font-body text-red-500 hover:underline">Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Candidates */}
        {activeTab === "candidates" && (
          <div className="p-4 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="font-heading font-semibold text-xl text-comet-text">Candidates</h1>
              <button className="px-4 py-2 rounded-md border border-comet-border text-comet-muted text-sm font-body hover:text-comet-text transition-colors">
                Export CSV
              </button>
            </div>

            <div className="bg-white border border-comet-border rounded-lg overflow-x-auto">
              <table className="w-full text-sm min-w-[500px]">
                <thead>
                  <tr className="bg-comet-surface border-b border-comet-border text-left">
                    <th className="px-4 py-3 text-xs font-medium font-body text-comet-muted uppercase tracking-wide">Name</th>
                    <th className="px-4 py-3 text-xs font-medium font-body text-comet-muted uppercase tracking-wide hidden md:table-cell">Role</th>
                    <th className="px-4 py-3 text-xs font-medium font-body text-comet-muted uppercase tracking-wide">Score</th>
                    <th className="px-4 py-3 text-xs font-medium font-body text-comet-muted uppercase tracking-wide hidden sm:table-cell">Date</th>
                    <th className="px-4 py-3 text-xs font-medium font-body text-comet-muted uppercase tracking-wide">Status</th>
                    <th className="px-4 py-3 text-xs font-medium font-body text-comet-muted uppercase tracking-wide text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_CANDIDATES.map((c) => (
                    <tr key={c.id} className="border-b border-comet-border hover:bg-comet-surface transition-colors last:border-0">
                      <td className="px-4 py-3 font-medium font-body text-comet-text">{c.name}</td>
                      <td className="px-4 py-3 text-comet-muted font-body hidden md:table-cell text-xs">{c.role}</td>
                      <td className="px-4 py-3 font-body">
                        <span className={cn("text-sm font-medium", c.score < 50 ? "text-comet-streak" : "text-comet-text")}>
                          {c.score}%
                        </span>
                      </td>
                      <td className="px-4 py-3 text-comet-muted font-body text-xs hidden sm:table-cell">{c.date}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1 text-xs font-body text-comet-muted">
                          <span className={cn("w-1.5 h-1.5 rounded-full",
                            c.status === "Interviewing" ? "bg-blue-400" :
                            c.status === "Submitted" ? "bg-comet-indigo" :
                            c.status === "Rejected" ? "bg-red-400" : "bg-comet-muted"
                          )} />
                          {c.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button className="text-xs font-body text-comet-indigo hover:underline">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Import */}
        {activeTab === "import" && (
          <div className="p-8 max-w-2xl">
            <h1 className="font-heading font-semibold text-xl text-comet-text mb-2">Import from LinkedIn</h1>
            <p className="text-sm font-body text-comet-muted mb-8">
              Paste a LinkedIn job URL and we&apos;ll extract the role details automatically.
            </p>

            <div className="bg-white border border-comet-border rounded-lg p-6 space-y-4">
              <div>
                <label className="block text-xs font-medium font-body text-comet-muted mb-1.5">LinkedIn Job URL</label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={importUrl}
                    onChange={(e) => setImportUrl(e.target.value)}
                    placeholder="https://linkedin.com/jobs/view/..."
                    className="flex-1 rounded-md border border-comet-border px-3 py-2 text-sm font-body text-comet-text focus:outline-none"
                  />
                  <button
                    onClick={handleImport}
                    disabled={importing || !importUrl.trim()}
                    className="px-4 py-2 rounded-md bg-comet-indigo text-white text-sm font-medium font-body hover:bg-[#3730A3] transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                    {importing && (
                      <svg className="animate-spin w-3.5 h-3.5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                    )}
                    {importing ? "Extracting..." : "Extract →"}
                  </button>
                </div>
              </div>

              {importStatus && (
                <div className="flex items-center gap-2 text-sm font-body text-green-700">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {importStatus}
                </div>
              )}

              <p className="text-xs font-body text-comet-muted">
                Extracted data will appear below for review before saving to the job board.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
