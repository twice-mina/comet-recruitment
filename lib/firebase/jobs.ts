import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  Unsubscribe,
  Timestamp,
} from "firebase/firestore"
import { db } from "./config"
import { Job } from "../types"

const COLLECTION = "jobs"

/**
 * Convert Firestore document to Job type
 */
function docToJob(id: string, data: Record<string, unknown>): Job {
  const postedDate = data.posted_date
  let dateStr: string
  if (postedDate instanceof Timestamp) {
    dateStr = postedDate.toDate().toISOString().split("T")[0]
  } else if (postedDate && typeof postedDate === "object" && "seconds" in postedDate) {
    dateStr = new Date((postedDate as { seconds: number }).seconds * 1000).toISOString().split("T")[0]
  } else {
    dateStr = String(postedDate || new Date().toISOString().split("T")[0])
  }

  const lastVerified = data.last_verified
  let lastVerifiedStr: string
  if (lastVerified instanceof Timestamp) {
    lastVerifiedStr = lastVerified.toDate().toISOString().split("T")[0]
  } else if (lastVerified && typeof lastVerified === "object" && "seconds" in lastVerified) {
    lastVerifiedStr = new Date((lastVerified as { seconds: number }).seconds * 1000).toISOString().split("T")[0]
  } else {
    lastVerifiedStr = String(lastVerified || dateStr)
  }

  return {
    id,
    title: String(data.title || ""),
    company: String(data.company || ""),
    location: String(data.location || ""),
    description: String(data.description || ""),
    responsibilities: Array.isArray(data.responsibilities) ? data.responsibilities : [],
    requirements: Array.isArray(data.requirements) ? data.requirements : [],
    preferred_qualifications: Array.isArray(data.preferred_qualifications) ? data.preferred_qualifications : [],
    salary_min: Number(data.salary_min || 0),
    salary_max: Number(data.salary_max || 0),
    job_type: (data.job_type as Job["job_type"]) || "remote",
    category: String(data.category || ""),
    posted_date: dateStr,
    is_active: Boolean(data.is_active),
    tpa_certification_preferred: Boolean(data.tpa_certification_preferred),
    apply_url: String(data.apply_url || ""),
    experience_level: (data.experience_level as Job["experience_level"]) || "mid",
    employer_confidential: Boolean(data.employer_confidential),
    verification_status: (data.verification_status as Job["verification_status"]) || "pending",
    last_verified: lastVerifiedStr,
    certification_tier: (data.certification_tier as Job["certification_tier"]) || "core",
    skill_categories: Array.isArray(data.skill_categories) ? data.skill_categories : [],
    source_url: String(data.source_url || ""),
    compensation_details: data.compensation_details ? String(data.compensation_details) : undefined,
    benefits: Array.isArray(data.benefits) ? data.benefits : undefined,
  }
}

/**
 * Get all active jobs from Firestore
 */
export async function getActiveJobsFromFirestore(): Promise<Job[]> {
  if (!db) return []
  const q = query(
    collection(db, COLLECTION),
    where("is_active", "==", true),
    orderBy("posted_date", "desc")
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map((d) => docToJob(d.id, d.data()))
}

/**
 * Get all jobs (including inactive) from Firestore
 */
export async function getAllJobsFromFirestore(): Promise<Job[]> {
  if (!db) return []
  const q = query(collection(db, COLLECTION), orderBy("posted_date", "desc"))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((d) => docToJob(d.id, d.data()))
}

/**
 * Get a single job by ID
 */
export async function getJobFromFirestore(id: string): Promise<Job | null> {
  if (!db) return null
  const docRef = doc(db, COLLECTION, id)
  const docSnap = await getDoc(docRef)
  if (!docSnap.exists()) return null
  return docToJob(docSnap.id, docSnap.data())
}

/**
 * Add a new job
 */
export async function addJobToFirestore(
  job: Omit<Job, "id">
): Promise<string> {
  if (!db) throw new Error("Firestore not initialized")
  const data = {
    ...job,
    posted_date: Timestamp.fromDate(new Date(job.posted_date)),
  }
  const ref = await addDoc(collection(db, COLLECTION), data)
  return ref.id
}

/**
 * Update a job
 */
export async function updateJobInFirestore(
  id: string,
  updates: Partial<Omit<Job, "id">>
): Promise<void> {
  if (!db) throw new Error("Firestore not initialized")
  const data: Record<string, unknown> = { ...updates }
  if (updates.posted_date) {
    data.posted_date = Timestamp.fromDate(new Date(updates.posted_date))
  }
  await updateDoc(doc(db, COLLECTION, id), data)
}

/**
 * Delete a job
 */
export async function deleteJobFromFirestore(id: string): Promise<void> {
  if (!db) throw new Error("Firestore not initialized")
  await deleteDoc(doc(db, COLLECTION, id))
}

/**
 * Subscribe to active jobs (real-time)
 */
export function subscribeToActiveJobs(
  callback: (jobs: Job[]) => void
): Unsubscribe {
  if (!db) {
    callback([])
    return () => {}
  }
  const q = query(
    collection(db, COLLECTION),
    where("is_active", "==", true),
    orderBy("posted_date", "desc")
  )
  return onSnapshot(q, (snapshot) => {
    callback(snapshot.docs.map((d) => docToJob(d.id, d.data())))
  })
}

/**
 * Subscribe to all jobs (real-time, for admin)
 */
export function subscribeToAllJobs(
  callback: (jobs: Job[]) => void
): Unsubscribe {
  if (!db) {
    callback([])
    return () => {}
  }
  const q = query(collection(db, COLLECTION), orderBy("posted_date", "desc"))
  return onSnapshot(q, (snapshot) => {
    callback(snapshot.docs.map((d) => docToJob(d.id, d.data())))
  })
}
