export const EMPLOYMENT_TYPE_LABELS = {
  full_time: "Full-time",
  part_time: "Part-time",
  contract: "Contract",
  temporary: "Temporary",
  internship: "Internship",
  seasonal: "Seasonal",
};

export const EXPERIENCE_LABELS = {
  entry_level: "Entry-level",
  mid_level: "Mid-level",
  senior: "Senior",
  executive: "Executive",
};

export const WORKPLACE_LABELS = {
  onsite: "On-site",
  hybrid: "Hybrid",
  remote: "Remote",
};

export const SEEKER_STATUS_LABELS = {
  submitted: "Applied",
  viewed: "In Review",
  shortlisted: "In Review",
  interviewing: "Interview",
  offered: "Offer",
  hired: "Offer",
  rejected: "Not Selected",
  withdrawn: "Withdrawn",
};

export const RECRUITER_STAGE_LABELS = {
  submitted: "New",
  viewed: "Reviewed",
  shortlisted: "Shortlisted",
  interviewing: "Interview",
  offered: "Offer",
  hired: "Hired",
  rejected: "Rejected",
  withdrawn: "Withdrawn",
};

export const RECRUITER_STAGE_TO_STATUS = {
  New: "submitted",
  Reviewed: "viewed",
  Shortlisted: "shortlisted",
  Interview: "interviewing",
  Offer: "offered",
  Hired: "hired",
  Rejected: "rejected",
  Withdrawn: "withdrawn",
};

export const EMPLOYER_STAGES = [
  "New",
  "Reviewed",
  "Shortlisted",
  "Interview",
  "Offer",
  "Hired",
  "Rejected",
];

const ADVANCE_MAP = {
  submitted: "viewed",
  viewed: "shortlisted",
  shortlisted: "interviewing",
  interviewing: "offered",
  offered: "hired",
};

export function nextApplicationStatus(currentStatus) {
  return ADVANCE_MAP[currentStatus] || null;
}

export function formatEmploymentType(value) {
  if (!value) return "Full-time";
  return EMPLOYMENT_TYPE_LABELS[value] || value;
}

export function formatExperience(value) {
  if (!value) return "Mid-level";
  return EXPERIENCE_LABELS[value] || value;
}

export function formatWorkplace(job) {
  if (job?.is_remote || job?.workplace_type === "remote") return "Remote";
  if (job?.workplace_type) return WORKPLACE_LABELS[job.workplace_type] || job.workplace_type;
  return "On-site";
}

export function employmentTypeFromLabel(label) {
  const match = Object.entries(EMPLOYMENT_TYPE_LABELS).find(([, text]) => text === label);
  return match ? match[0] : "full_time";
}

export function experienceFromLabel(label) {
  const match = Object.entries(EXPERIENCE_LABELS).find(([, text]) => text === label);
  return match ? match[0] : "mid_level";
}

export function workplaceFromLabel(label) {
  const match = Object.entries(WORKPLACE_LABELS).find(([, text]) => text === label);
  return match ? match[0] : "onsite";
}

export function mapJobStatus(status) {
  if (status === "active") return "Active";
  if (status === "pending_review") return "Draft";
  if (status === "closed" || status === "expired" || status === "removed") return "Closed";
  return status || "Active";
}

export function splitLocation(location) {
  const raw = (location || "").trim();
  if (!raw) return { city: "", province: "", isRemote: false };
  if (/remote/i.test(raw)) return { city: "", province: "", isRemote: true };
  const parts = raw.split(",").map((part) => part.trim()).filter(Boolean);
  return { city: parts[0] || "", province: parts[1] || "", isRemote: false };
}

export function joinLocation(city, province, isRemote) {
  if (isRemote) return "Remote, Canada";
  return [city, province].filter(Boolean).join(", ");
}

export function mapRegion(province, isRemote) {
  if (isRemote || !province) return "remote";
  const provLower = province.toLowerCase();
  if (provLower === "on" || provLower === "ontario") return "ontario";
  if (provLower === "bc" || provLower === "british columbia") return "british-columbia";
  if (provLower === "ab" || provLower === "alberta") return "alberta";
  if (provLower === "mb" || provLower === "manitoba") return "manitoba";
  if (provLower === "sk" || provLower === "saskatchewan") return "saskatchewan";
  if (["ns", "nb", "pe", "nl", "nova scotia", "new brunswick", "prince edward island", "newfoundland"].includes(provLower)) {
    return "atlantic-canada";
  }
  return "remote";
}

const ICONS_BY_CATEGORY = {
  "office-administration": "file-text",
  "skilled-trades": "wrench",
  education: "book-open",
  healthcare: "heart-pulse",
  hospitality: "utensils",
  transportation: "truck",
  "community-services": "users",
  "remote-opportunities": "globe",
};

export function mapPublicJob(job, categories = []) {
  if (!job) return null;
  const nestedCategory = job.categories;
  const matchedCategory =
    nestedCategory ||
    categories.find((item) => item.id === job.category_id) ||
    null;
  const categorySlug =
    matchedCategory?.slug ||
    (typeof job.category === "string" ? job.category : "") ||
    "";
  const company = job.companies || job.company || {};
  const companyName = company.name || (typeof job.company === "string" ? job.company : "Employer");
  const isRemote = Boolean(job.is_remote) || job.workplace_type === "remote";

  return {
    id: String(job.id),
    title: job.title || "Untitled role",
    company: companyName,
    location: joinLocation(job.city, job.province, isRemote),
    province: job.province || "",
    city: job.city || "",
    region: mapRegion(job.province, isRemote),
    type: formatEmploymentType(job.employment_type || job.type),
    employmentType: formatEmploymentType(job.employment_type || job.type),
    employment_type: job.employment_type,
    category: categorySlug,
    categoryId: job.category_id,
    workplace: formatWorkplace(job),
    workplace_type: job.workplace_type || (isRemote ? "remote" : "onsite"),
    experience: formatExperience(job.experience_level || job.experience),
    experience_level: job.experience_level,
    salaryMin: job.salary_min ?? 0,
    salaryMax: job.salary_max ?? 0,
    salaryPeriod: job.salary_period === "hourly" || job.salary_period === "hour" ? "hour" : "year",
    salary_period: job.salary_period,
    hasBenefits: Boolean(job.has_benefits || job.hasBenefits),
    description: job.description || "",
    skills: Array.isArray(job.skills) ? job.skills : [],
    badge: company.verification_status === "verified" ? "Verified Employer" : "Inclusive Employer",
    icon: ICONS_BY_CATEGORY[categorySlug] || "briefcase",
    postedAt: job.published_at || job.created_at || new Date().toISOString(),
    status: job.status,
    company_id: job.company_id,
    raw: job,
  };
}

export function mapSeekerApplication(item) {
  const job = mapPublicJob(item.jobs || item.job || {});
  return {
    id: item.id,
    jobId: String(item.job_id || job?.id || ""),
    title: job?.title || "Job",
    company: job?.company || "Employer",
    location: job?.location || "",
    type: job?.type || "",
    icon: job?.icon || "briefcase",
    status: SEEKER_STATUS_LABELS[item.status] || item.status,
    apiStatus: item.status,
    dateApplied: (item.created_at || "").slice(0, 10),
    job,
  };
}

export function mapSavedJob(item) {
  const job = mapPublicJob(item.jobs || item.job || {});
  return {
    ...job,
    savedAt: item.created_at,
    savedViaSiteId: item.saved_via_site_id,
  };
}

export function mapSeekerProfile(profile, user) {
  const experience = Array.isArray(profile?.experience) ? profile.experience : [];
  const education = Array.isArray(profile?.education) ? profile.education : [];
  return {
    fullName: profile?.full_name || "",
    email: profile?.email || user?.email || "",
    phone: profile?.phone || "",
    headline: profile?.headline || "",
    location: joinLocation(profile?.location_city, profile?.location_province, false),
    location_city: profile?.location_city || "",
    location_province: profile?.location_province || "",
    skills: Array.isArray(profile?.skills) ? profile.skills : [],
    experience: experience.map((entry, index) => ({
      id: entry.id || `exp-${index}`,
      jobTitle: entry.title || entry.jobTitle || "",
      company: entry.company || "",
      dates: [entry.startDate, entry.current ? "Present" : entry.endDate].filter(Boolean).join(" – "),
      startDate: entry.startDate || "",
      endDate: entry.endDate || "",
      current: Boolean(entry.current),
      description: entry.description || "",
    })),
    education: education.map((entry, index) => ({
      id: entry.id || `edu-${index}`,
      school: entry.institution || entry.school || "",
      field: entry.field || "",
      degree: entry.degree || "",
      dates: [entry.startDate, entry.current ? "Present" : entry.endDate].filter(Boolean).join(" – "),
      startDate: entry.startDate || "",
      endDate: entry.endDate || "",
      current: Boolean(entry.current),
    })),
    default_resume_path: profile?.default_resume_path || "",
    role: profile?.role,
    status: profile?.status,
  };
}

export function profilePatchFromForm(form) {
  const { city, province } = splitLocation(form.location);
  return {
    full_name: form.fullName?.trim(),
    phone: form.phone?.trim() || null,
    headline: form.headline?.trim() || null,
    location_city: form.location_city?.trim() || city || null,
    location_province: form.location_province?.trim() || province || null,
    skills: (form.skills || []).slice(0, 50),
    default_resume_path: form.default_resume_path || null,
    experience: (form.experience || []).slice(0, 20).map((entry) => ({
      title: (entry.jobTitle || entry.title || "").trim(),
      company: (entry.company || "").trim(),
      startDate: entry.startDate || undefined,
      endDate: entry.current ? undefined : entry.endDate || undefined,
      current: Boolean(entry.current),
      description: (entry.description || "").trim(),
    })),
    education: (form.education || []).slice(0, 20).map((entry) => ({
      degree: (entry.degree || "").trim(),
      institution: (entry.school || entry.institution || "").trim(),
      startDate: entry.startDate || undefined,
      endDate: entry.current ? undefined : entry.endDate || undefined,
      current: Boolean(entry.current),
      field: (entry.field || "").trim(),
    })),
  };
}

export function mapRecruiterJob(job) {
  const mapped = mapPublicJob(job);
  const status = mapJobStatus(job.status);
  return {
    ...mapped,
    employmentType: mapped.employmentType,
    applicantCount: job.applications_count ?? 0,
    postedDate: (job.published_at || job.created_at || "").slice(0, 10),
    status,
    apiStatus: job.status,
    viewsCount: job.views_count ?? 0,
    salaryRange:
      job.salary_min || job.salary_max
        ? `${job.salary_min || ""} – ${job.salary_max || ""}`.trim()
        : "",
    description: job.description || "",
  };
}

export function mapApplicant(item) {
  const profile = item.profiles || {};
  const status = item.status;
  const location = joinLocation(profile.location_city, profile.location_province, false);
  const experience = Array.isArray(profile.experience) ? profile.experience : [];
  const education = Array.isArray(profile.education) ? profile.education : [];
  return {
    id: item.id,
    jobId: String(item.job_id || item.jobs?.id || ""),
    name: profile.full_name || "Applicant",
    email: profile.email || "",
    phone: profile.phone || "",
    location,
    resumeFilename: (item.resume_path || "").split("/").pop() || "",
    resumePath: item.resume_path || "",
    skills: Array.isArray(profile.skills) ? profile.skills : [],
    experience: experience.map((entry, index) => ({
      id: entry.id || `exp-${index}`,
      jobTitle: entry.title || entry.jobTitle || "",
      company: entry.company || "",
      dates: [entry.startDate, entry.current ? "Present" : entry.endDate].filter(Boolean).join(" – "),
      description: entry.description || "",
    })),
    education: education.map((entry, index) => ({
      id: entry.id || `edu-${index}`,
      degree: entry.degree || entry.field || "",
      institution: entry.institution || entry.school || "",
      year: entry.endDate || entry.startDate || "",
    })),
    stage: RECRUITER_STAGE_LABELS[status] || status,
    apiStatus: status,
    appliedDate: (item.created_at || "").slice(0, 10),
    coverLetter: item.cover_letter || "",
    recruiterNotes: "",
    jobTitle: item.jobs?.title || "",
  };
}

export function isRecruiterRole(role) {
  return role === "recruiter" || role === "admin";
}

export function isSeekerRole(role) {
  return role === "job_seeker";
}
