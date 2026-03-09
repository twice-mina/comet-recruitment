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

// ---------- types ----------
type FormData = Omit<Job, "id"> & { requirementsText: string };

const emptyForm: FormData = {
  title: "",
  company: "",
  location: "",
  description: "",
  requirements: [],
  requirementsText: "",
  salary_min: 0,
  salary_max: 0,
  job_type: "remote",
  category: JOB_CATEGORIES[0],
  posted_date: new Date().toISOString().split("T")[0],
  is_active: true,
  tpa_certification_preferred: false,
  apply_url: "",
};

// ---------- component ----------
export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [view, setView] = useState<"list" | "form">("list");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Auth listener
  useEffect(() => {
    if (!auth) {
      setAuthLoading(false);
      return;
    }
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthLoading(false);
    });
    return unsub;
  }, []);

  // Jobs listener
  useEffect(() => {
    if (!user) return;
    const unsub = subscribeToAllJobs(setJobs);
    return unsub;
  }, [user]);

  // ---------- handlers ----------
  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Login failed");
    }
  };

  const handleLogout = async () => {
    await logOut();
    setUser(null);
  };

  const openNewForm = () => {
    setEditingId(null);
    setForm(emptyForm);
    setView("form");
  };

  const openEditForm = (job: Job) => {
    setEditingId(job.id);
    setForm({
      ...job,
      requirementsText: job.requirements.join("\n"),
    });
    setView("form");
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      const data: Omit<Job, "id"> = {
        ...form,
        requirements: form.requirementsText
          .split("\n")
          .map((r) => r.trim())
          .filter(Boolean),
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { requirementsText, ...rest } = data as FormData;
      if (editingId) {
        await updateJobInFirestore(editingId, rest);
      } else {
        await addJobToFirestore(rest);
      }
      setView("list");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this job listing?")) return;
    try {
      await deleteJobFromFirestore(id);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Delete failed");
    }
  };

  const handleToggleActive = useCallback(
    async (job: Job) => {
      try {
        await updateJobInFirestore(job.id, { is_active: !job.is_active });
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : "Update failed");
      }
    },
    []
  );

  // ---------- render: loading ----------
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-tpa-cream">
        <p className="text-tpa-text font-body">Loading...</p>
      </div>
    );
  }

  // ---------- render: login ----------
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-tpa-cream">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center border border-tpa-border">
          <div className="mb-6">
            <h1 className="text-2xl font-bold font-heading text-tpa-dark mb-2">
              TPA Careers Admin
            </h1>
            <p className="text-tpa-text/60 font-body text-sm">
              Sign in to manage job listings
            </p>
          </div>
          {error && (
            <p className="text-red-600 text-sm mb-4 font-body">{error}</p>
          )}
          <button
            onClick={handleLogin}
            className="w-full flex items-center justify-center gap-3 px-6 py-3 rounded-xl bg-tpa-gold text-tpa-dark font-semibold font-body hover:bg-tpa-gold-light transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  // ---------- render: form ----------
  if (view === "form") {
    return (
      <div className="min-h-screen bg-tpa-cream">
        {/* Header */}
        <div className="bg-tpa-dark border-b border-tpa-dark-secondary">
          <div className="max-w-4xl mx-auto px-4 py-6 flex items-center justify-between">
            <h1 className="text-xl font-bold font-heading text-tpa-hero-text">
              {editingId ? "Edit Job" : "Add New Job"}
            </h1>
            <button
              onClick={() => setView("list")}
              className="text-sm font-body text-tpa-gold hover:text-tpa-gold-light"
            >
              ← Back to list
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8">
          {error && (
            <p className="text-red-600 text-sm mb-4 font-body bg-red-50 p-3 rounded-lg">
              {error}
            </p>
          )}
          <div className="bg-white rounded-xl border border-tpa-border p-6 space-y-5">
            {/* Title & Company */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold font-body text-tpa-text mb-1">
                  Job Title *
                </label>
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-tpa-border font-body text-sm focus:outline-none focus:ring-2 focus:ring-tpa-gold/40"
                  placeholder="e.g. Senior Prompt Engineer"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold font-body text-tpa-text mb-1">
                  Company *
                </label>
                <input
                  value={form.company}
                  onChange={(e) =>
                    setForm({ ...form, company: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-tpa-border font-body text-sm focus:outline-none focus:ring-2 focus:ring-tpa-gold/40"
                  placeholder="e.g. NexusAI Labs"
                />
              </div>
            </div>

            {/* Location & Category */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold font-body text-tpa-text mb-1">
                  Location *
                </label>
                <input
                  value={form.location}
                  onChange={(e) =>
                    setForm({ ...form, location: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-tpa-border font-body text-sm focus:outline-none focus:ring-2 focus:ring-tpa-gold/40"
                  placeholder="e.g. San Francisco, CA or Remote"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold font-body text-tpa-text mb-1">
                  Category *
                </label>
                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-tpa-border font-body text-sm focus:outline-none focus:ring-2 focus:ring-tpa-gold/40"
                >
                  {JOB_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Job Type & Salary */}
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold font-body text-tpa-text mb-1">
                  Job Type *
                </label>
                <select
                  value={form.job_type}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      job_type: e.target.value as Job["job_type"],
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-tpa-border font-body text-sm focus:outline-none focus:ring-2 focus:ring-tpa-gold/40"
                >
                  {JOB_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold font-body text-tpa-text mb-1">
                  Salary Min ($)
                </label>
                <input
                  type="number"
                  value={form.salary_min || ""}
                  onChange={(e) =>
                    setForm({ ...form, salary_min: Number(e.target.value) })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-tpa-border font-body text-sm focus:outline-none focus:ring-2 focus:ring-tpa-gold/40"
                  placeholder="80000"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold font-body text-tpa-text mb-1">
                  Salary Max ($)
                </label>
                <input
                  type="number"
                  value={form.salary_max || ""}
                  onChange={(e) =>
                    setForm({ ...form, salary_max: Number(e.target.value) })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-tpa-border font-body text-sm focus:outline-none focus:ring-2 focus:ring-tpa-gold/40"
                  placeholder="120000"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold font-body text-tpa-text mb-1">
                Description *
              </label>
              <textarea
                rows={6}
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="w-full px-3 py-2 rounded-lg border border-tpa-border font-body text-sm focus:outline-none focus:ring-2 focus:ring-tpa-gold/40"
                placeholder="Full job description..."
              />
            </div>

            {/* Requirements */}
            <div>
              <label className="block text-sm font-semibold font-body text-tpa-text mb-1">
                Requirements (one per line)
              </label>
              <textarea
                rows={5}
                value={form.requirementsText}
                onChange={(e) =>
                  setForm({ ...form, requirementsText: e.target.value })
                }
                className="w-full px-3 py-2 rounded-lg border border-tpa-border font-body text-sm focus:outline-none focus:ring-2 focus:ring-tpa-gold/40"
                placeholder="3+ years experience in AI&#10;Python proficiency&#10;..."
              />
            </div>

            {/* Apply URL & Date */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold font-body text-tpa-text mb-1">
                  Apply URL *
                </label>
                <input
                  value={form.apply_url}
                  onChange={(e) =>
                    setForm({ ...form, apply_url: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-tpa-border font-body text-sm focus:outline-none focus:ring-2 focus:ring-tpa-gold/40"
                  placeholder="https://company.com/apply"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold font-body text-tpa-text mb-1">
                  Posted Date
                </label>
                <input
                  type="date"
                  value={form.posted_date}
                  onChange={(e) =>
                    setForm({ ...form, posted_date: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-tpa-border font-body text-sm focus:outline-none focus:ring-2 focus:ring-tpa-gold/40"
                />
              </div>
            </div>

            {/* Toggles */}
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.is_active}
                  onChange={(e) =>
                    setForm({ ...form, is_active: e.target.checked })
                  }
                  className="w-4 h-4 accent-tpa-gold"
                />
                <span className="text-sm font-body text-tpa-text">Active</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.tpa_certification_preferred}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      tpa_certification_preferred: e.target.checked,
                    })
                  }
                  className="w-4 h-4 accent-tpa-gold"
                />
                <span className="text-sm font-body text-tpa-text">
                  TPA Certification Preferred
                </span>
              </label>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-6 py-2.5 rounded-xl bg-tpa-gold text-tpa-dark font-semibold font-body hover:bg-tpa-gold-light transition-colors disabled:opacity-50"
              >
                {saving ? "Saving..." : editingId ? "Update Job" : "Create Job"}
              </button>
              <button
                onClick={() => setView("list")}
                className="px-6 py-2.5 rounded-xl border border-tpa-border text-tpa-text font-body hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ---------- render: list ----------
  return (
    <div className="min-h-screen bg-tpa-cream">
      {/* Header */}
      <div className="bg-tpa-dark border-b border-tpa-dark-secondary">
        <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold font-heading text-tpa-hero-text">
              TPA Careers Admin
            </h1>
            <p className="text-sm font-body text-tpa-hero-text/50">
              {user.email} • {jobs.length} jobs
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={openNewForm}
              className="px-4 py-2 rounded-xl bg-tpa-gold text-tpa-dark font-semibold font-body text-sm hover:bg-tpa-gold-light transition-colors"
            >
              + Add Job
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl border border-tpa-hero-text/20 text-tpa-hero-text/60 font-body text-sm hover:bg-tpa-dark-secondary transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {error && (
          <p className="text-red-600 text-sm mb-4 font-body bg-red-50 p-3 rounded-lg">
            {error}
          </p>
        )}

        {jobs.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-tpa-text/60 font-body">
              No jobs yet. Click &ldquo;+ Add Job&rdquo; to create your first listing.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-tpa-border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-tpa-dark text-tpa-hero-text/80 font-heading text-left">
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3 hidden md:table-cell">Company</th>
                  <th className="px-4 py-3 hidden lg:table-cell">Category</th>
                  <th className="px-4 py-3 hidden lg:table-cell">Salary</th>
                  <th className="px-4 py-3 hidden sm:table-cell">Posted</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr
                    key={job.id}
                    className="border-t border-tpa-border hover:bg-tpa-cream/50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleToggleActive(job)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium font-body transition-colors ${
                          job.is_active
                            ? "bg-green-100 text-green-700 hover:bg-green-200"
                            : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            job.is_active ? "bg-green-500" : "bg-gray-400"
                          }`}
                        />
                        {job.is_active ? "Active" : "Inactive"}
                      </button>
                    </td>
                    <td className="px-4 py-3 font-medium font-body text-tpa-text">
                      {job.title}
                      {job.tpa_certification_preferred && (
                        <span className="ml-1.5 text-tpa-gold text-xs">✦ TPA</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-tpa-text/60 font-body hidden md:table-cell">
                      {job.company}
                    </td>
                    <td className="px-4 py-3 text-tpa-text/60 font-body hidden lg:table-cell">
                      {job.category}
                    </td>
                    <td className="px-4 py-3 text-tpa-text/60 font-body hidden lg:table-cell">
                      {formatSalary(job.salary_min, job.salary_max)}
                    </td>
                    <td className="px-4 py-3 text-tpa-text/60 font-body hidden sm:table-cell">
                      {formatDate(job.posted_date)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditForm(job)}
                          className="px-3 py-1 rounded-lg text-xs font-body text-tpa-gold-dark hover:bg-tpa-gold/10 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(job.id)}
                          className="px-3 py-1 rounded-lg text-xs font-body text-red-500 hover:bg-red-50 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
