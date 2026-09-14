import { api } from "./api";
import { createUserSupabase } from "./supabase";
import { mapPublicJob } from "./mappers";
import { categories as staticCategories } from "../data/categories";

export { mapPublicJob as normalizeJob } from "./mappers";

export function normalizeCategory(cat) {
  if (!cat) return null;
  const name = cat.name || cat.title || "";
  const slug =
    cat.slug ||
    name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const staticConfig =
    staticCategories.find(
      (item) => item.slug === slug || item.title?.toLowerCase() === name.toLowerCase(),
    ) || {};

  return {
    id: cat.id,
    slug,
    title: name,
    description: staticConfig.description || `Find roles in ${name.toLowerCase()}.`,
    icon: staticConfig.icon || "briefcase",
    iconColor: staticConfig.iconColor || "text-primary",
    iconBg: staticConfig.iconBg || "bg-primary/10",
    sector_id: cat.sector_id,
    sort_order: cat.sort_order,
    is_active: cat.is_active,
  };
}

function toQuery(params = {}) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    query.set(key, String(value));
  });
  const qs = query.toString();
  return qs ? `?${qs}` : "";
}

export async function getPublicCategories() {
  const data = await api("/public/categories");
  return (data.items || []).map(normalizeCategory);
}

export async function getServiceCareCategories() {
  return getPublicCategories();
}

export async function getPublicJobs(params = {}) {
  const data = await api(`/public/jobs${toQuery(params)}`);
  const items = data.items || [];
  return {
    items: items.map((job) => mapPublicJob(job)),
    pagination: data.pagination || { page: 1, limit: items.length, total: items.length, pages: 1 },
    raw: items,
  };
}

export async function getPublicJob(id) {
  const data = await api(`/public/jobs/${id}`);
  return mapPublicJob(data.job);
}

export async function getPublicCompanies() {
  const data = await api("/public/companies");
  return data.items || [];
}

export async function applyToJob(jobId, payload = {}) {
  return api(`/job-seeker/jobs/${jobId}/apply`, {
    method: "POST",
    body: {
      cover_letter: payload.cover_letter || payload.coverLetter || null,
      resume_path: payload.resume_path || undefined,
    },
  });
}

export async function saveJob(jobId) {
  return api(`/job-seeker/jobs/${jobId}/save`, { method: "POST" });
}

export async function unsaveJob(jobId) {
  return api(`/job-seeker/jobs/${jobId}/save`, { method: "DELETE" });
}

export async function getSeekerDashboard() {
  return api("/job-seeker/dashboard");
}

export async function getRecommendedJobs(limit = 6) {
  return api(`/job-seeker/recommended-jobs${toQuery({ limit })}`);
}

export async function listResumes() {
  return api("/job-seeker/resumes");
}

export async function getResumeUrl(resumeId) {
  return api(`/job-seeker/resume-url${toQuery({ id: resumeId })}`);
}

export async function registerResume(body) {
  return api("/job-seeker/resumes", { method: "POST", body });
}

export async function uploadAndRegisterResume(file, userId, token) {
  if (!file) {
    throw new Error("Choose a PDF resume to upload.");
  }
  if (file.type !== "application/pdf") {
    throw new Error("Resumes must be PDF files.");
  }
  if (file.size < 1 || file.size > 5 * 1024 * 1024) {
    throw new Error("Resumes must be 5 MB or smaller.");
  }
  const safeName = file.name.replace(/[^\w.\-]+/g, "_").slice(0, 180);
  const path = `${userId}/${Date.now()}-${safeName}`;
  const supabase = createUserSupabase(token);
  const { error } = await supabase.storage.from("resumes").upload(path, file, {
    contentType: "application/pdf",
    upsert: false,
  });
  if (error) {
    throw new Error(error.message || "The resume could not be uploaded.");
  }
  return registerResume({
    path,
    original_name: file.name.slice(0, 255),
    size_bytes: file.size,
    content_type: "application/pdf",
  });
}

export async function updateProfile(body) {
  return api("/auth/profile", { method: "PATCH", body });
}

export async function getRecruiterDashboard() {
  return api("/recruiter/dashboard");
}

export async function getRecruiterCompanies() {
  const data = await api("/recruiter/companies");
  return data.items || [];
}

export async function createRecruiterJob(payload) {
  return api("/recruiter/jobs", { method: "POST", body: payload });
}

export async function updateRecruiterJob(jobId, payload) {
  return api(`/recruiter/jobs/${jobId}`, { method: "PATCH", body: payload });
}

export async function getJobApplications(jobId) {
  const data = await api(`/recruiter/jobs/${jobId}/applications`);
  return data.items || [];
}

export async function getRecruiterApplications(params = {}) {
  return api(`/recruiter/applications${toQuery(params)}`);
}

export async function updateApplicationStatus(applicationId, status) {
  return api(`/recruiter/applications/${applicationId}`, {
    method: "PATCH",
    body: { status },
  });
}

export async function getApplicantResumeUrl(applicationId) {
  return api(`/recruiter/applications/${applicationId}/resume-url`);
}
