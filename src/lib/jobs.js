import { api } from "./api";
import { categories as staticCategories } from "../data/categories";

// Normalization function to map dynamic API category output to UI model with visual fallback config
export function normalizeCategory(cat) {
  if (!cat) return null;
  const name = cat.name || cat.title || "";
  const slug = cat.slug || name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  
  const staticConfig = staticCategories.find(
    (c) => c.slug === slug || c.title?.toLowerCase() === name.toLowerCase()
  ) || {};

  return {
    id: cat.id,
    slug,
    title: name,
    description: staticConfig.description || `Find roles in ${name.toLowerCase()}.`,
    icon: staticConfig.icon || "briefcase",
    iconColor: staticConfig.iconColor || "text-primary",
    iconBg: staticConfig.iconBg || "bg-primary/10",
  };
}

// Normalization function to map raw API job records to frontend representation
export function normalizeJob(job, categories = []) {
  if (!job) return null;

  // Resolve category slug
  let categorySlug = "";
  if (job.category_id) {
    const matchedCategory = categories.find((c) => c.id === job.category_id);
    categorySlug = matchedCategory ? matchedCategory.slug || matchedCategory.name?.toLowerCase().replace(/\s+/g, "-") : "";
  } else if (job.category) {
    categorySlug = typeof job.category === "string" ? job.category : job.category.slug;
  }

  // Region/Province mapping
  const province = job.province || "";
  let region = "remote";
  if (province && !job.is_remote) {
    const provLower = province.toLowerCase();
    if (provLower === "on" || provLower === "ontario") region = "ontario";
    else if (provLower === "bc" || provLower === "british columbia") region = "british-columbia";
    else if (provLower === "ab" || provLower === "alberta") region = "alberta";
    else if (provLower === "mb" || provLower === "manitoba") region = "manitoba";
    else if (provLower === "sk" || provLower === "saskatchewan") region = "saskatchewan";
    else if (["ns", "nb", "pe", "nl", "nova scotia", "new brunswick", "prince edward island", "newfoundland"].includes(provLower)) region = "atlantic-canada";
  }

  // Workplace mapping
  let workplace = "On-site";
  if (job.is_remote) workplace = "Remote";
  else if (job.workplace_type) {
    workplace = job.workplace_type.charAt(0).toUpperCase() + job.workplace_type.slice(1);
  } else if (job.workplace) {
    workplace = job.workplace;
  }

  // Type mapping
  const type = job.employment_type || job.type || "Full-time";

  // Salary Period
  const salaryPeriod = job.salary_period === "hourly" || job.salary_period === "hour" ? "hour" : "year";

  // Icon picking based on category or default
  const iconsByCategory = {
    "office-administration": "file-text",
    "skilled-trades": "wrench",
    "education": "book-open",
    "healthcare": "heart-pulse",
    "hospitality": "utensils",
    "transportation": "truck",
    "community-services": "users",
    "remote-opportunities": "globe",
  };
  const icon = iconsByCategory[categorySlug] || job.icon || "briefcase";

  return {
    id: String(job.id),
    title: job.title,
    company: job.company?.name || job.company || "Unknown Company",
    location: job.is_remote ? "Remote, Canada" : `${job.city || ""}, ${job.province || ""}`.trim().replace(/^,\s*|,\s*$/, ""),
    province: job.province || "",
    region,
    type,
    category: categorySlug,
    workplace,
    experience: job.experience_level || job.experience || "Entry-level",
    salaryMin: job.salary_min || job.salaryMin || 0,
    salaryMax: job.salary_max || job.salaryMax || 0,
    salaryPeriod,
    hasBenefits: job.has_benefits || job.hasBenefits || false,
    description: job.description || "",
    badge: job.company?.verification_status === "verified" ? "Verified Employer" : "Inclusive Employer",
    icon,
    postedAt: job.published_at || job.created_at || job.postedAt || new Date().toISOString().split("T")[0],
  };
}

export async function getServiceCareCategories() {
  const raw = await api("/v1/taxonomy/categories?sector_id=3");
  return (raw || []).map(normalizeCategory);
}

export async function getPublicJobs(params = {}) {
  const query = new URLSearchParams();
  const limit = params.limit || 100;
  query.set("limit", String(limit));

  if (params.q) query.set("q", params.q);
  if (params.category_id) query.set("category_id", String(params.category_id));
  if (params.city) query.set("city", params.city);
  if (params.province) query.set("province", params.province);
  if (params.employment_type) query.set("employment_type", params.employment_type);
  if (params.is_remote !== undefined) query.set("is_remote", String(params.is_remote));

  return api(`/v1/jobs?${query.toString()}`);
}

export async function getPublicJob(id) {
  return api(`/v1/jobs/${id}`);
}

export async function recordJobView(id) {
  return api(`/v1/jobs/${id}/view`, {
    method: "POST",
    body: JSON.stringify({}),
  });
}

export async function applyToJob(id, token, payload = {}) {
  return api(`/v1/jobs/${id}/applications`, {
    method: "POST",
    body: JSON.stringify({
      cover_letter: payload.coverLetter || "",
      ...payload,
    }),
  }, token);
}

export async function getMyApplications(token) {
  return api("/v1/me/applications", {}, token);
}

export async function getMyCompanies(token) {
  return api("/v1/companies", {}, token);
}

export async function getEmployerJobs(token) {
  return api("/v1/employer/jobs", {}, token);
}

export async function getJobApplications(jobId, token) {
  return api(`/v1/employer/jobs/${jobId}/applications`, {}, token);
}

export async function getJobViews(jobId, token) {
  return api(`/v1/employer/jobs/${jobId}/views`, {}, token);
}

export async function createEmployerJob(payload, token) {
  return api("/v1/employer/jobs", {
    method: "POST",
    body: JSON.stringify(payload),
  }, token);
}
