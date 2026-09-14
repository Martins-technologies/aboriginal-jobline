import { getStoredAccessToken } from "./auth/session";

export const SITE_SLUG = (import.meta.env.VITE_SITE_SLUG || "aboriginal").trim().toLowerCase();

export class ApiError extends Error {
  constructor({ status, code, message, details, requestId }) {
    super(message || "Something went wrong. Please try again.");
    this.name = "ApiError";
    this.status = status;
    this.code = code || "INTERNAL_ERROR";
    this.details = details;
    this.requestId = requestId;
  }
}

export function getApiBaseUrl() {
  const raw =
    import.meta.env.VITE_API_BASE_URL ||
    import.meta.env.VITE_API_URL ||
    "http://localhost:4000/api/v1";
  return String(raw).replace(/\/$/, "");
}

export function fieldErrorsFromApi(error) {
  const mapped = {};
  const fieldErrors = error?.details?.fieldErrors;
  if (fieldErrors && typeof fieldErrors === "object") {
    Object.entries(fieldErrors).forEach(([key, value]) => {
      if (Array.isArray(value) && value[0]) mapped[key] = String(value[0]);
      else if (typeof value === "string" && value) mapped[key] = value;
    });
  }
  return mapped;
}

function messageForCode(code, fallback) {
  const messages = {
    VALIDATION_ERROR: "Please check the highlighted fields and try again.",
    INVALID_JSON: "The request could not be read. Please try again.",
    AUTH_REQUIRED: "Please sign in to continue.",
    INVALID_SESSION: "Your session is invalid or expired. Please sign in again.",
    SIGN_IN_FAILED: "That email or password did not match our records.",
    ROLE_MISMATCH_SEEKER:
      "These credentials belong to an employer account. Use the Employer tab to sign in, or register a separate job seeker account with a different email.",
    ROLE_MISMATCH_EMPLOYER:
      "These credentials belong to a job seeker account. Use the Job Seeker tab to sign in, or register a separate employer account with a different email.",
    SIGN_UP_FAILED: "We could not create your account. Please try again.",
    SIGNUP_SITE_REQUIRED: "This site is not configured for new accounts.",
    COMPANY_BOOTSTRAP_FAILED: "Your company profile could not be created.",
    COMPANY_NAME_TAKEN: "A company with that name already exists.",
    ACCOUNT_INACTIVE: "This account is inactive. Contact support for help.",
    PROFILE_MISSING: "Your profile is not ready yet. Please try signing in again.",
    FORBIDDEN: "You do not have permission to do that.",
    COMPANY_FORBIDDEN: "You do not have access to this company.",
    RESUME_FORBIDDEN: "That resume does not belong to your account.",
    RESUME_PATH_FORBIDDEN: "Resume files must be stored under your own account folder.",
    RESUME_REQUIRED: "Upload a PDF resume before applying.",
    RESUME_NOT_PDF: "Resumes must be PDF files.",
    RESUME_TOO_LARGE: "That resume is larger than the 5 MB limit.",
    RESUME_SIZE_MISMATCH: "The uploaded file size does not match what we received.",
    RESUME_VERIFY_FAILED: "We could not verify that resume file.",
    RESUME_ALREADY_REGISTERED: "That resume file is already on your profile.",
    RESUME_NOT_FOUND: "No resume was found.",
    ALREADY_APPLIED: "You have already applied to this job.",
    JOB_NOT_FOUND: "This job is not available.",
    JOB_EXPIRED: "This job is no longer accepting applications.",
    COMPANY_NOT_FOUND: "That company could not be found.",
    APPLICATION_NOT_FOUND: "That application could not be found.",
    SITE_NOT_FOUND: "This Jooblie site is not configured.",
    SITE_CATEGORY_MISMATCH: "That category is not available on this site.",
    RECRUITER_COMPANY_NOT_BOUND: "Your recruiter account is not linked to a company yet.",
    INVALID_APPLICATION_TRANSITION: "That hiring-stage change is not allowed from the current status.",
    RATE_LIMITED: "Too many attempts. Please wait a moment and try again.",
    CORS_FORBIDDEN: "This origin is not allowed to call the API.",
    PUBLIC_JOBS_FAILED: "Jobs could not be loaded right now.",
    PROFILE_UPDATE_FAILED: "Your profile could not be saved.",
    JOB_CREATE_FAILED: "The job could not be posted.",
    JOB_UPDATE_FAILED: "The job could not be updated.",
    APPLICATION_FAILED: "The application could not be submitted.",
    APPLICATION_UPDATE_FAILED: "The application status could not be updated.",
    SAVE_JOB_FAILED: "This job could not be saved.",
    UNSAVE_JOB_FAILED: "This job could not be removed from saved jobs.",
    NOT_FOUND: "The requested item was not found.",
  };
  return messages[code] || fallback;
}

export async function api(path, init = {}) {
  const { token: tokenOverride, headers: initHeaders, ...rest } = init;
  const url = `${getApiBaseUrl()}${path.startsWith("/") ? path : `/${path}`}`;
  const token = tokenOverride !== undefined ? tokenOverride : getStoredAccessToken();

  const headers = {
    Accept: "application/json",
    "X-Site-Slug": SITE_SLUG,
    ...(initHeaders || {}),
  };

  if (rest.body && typeof rest.body !== "string" && !(rest.body instanceof FormData)) {
    rest.body = JSON.stringify(rest.body);
  }

  if (rest.body && !(rest.body instanceof FormData) && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, { ...rest, headers });
  const text = await response.text();
  let payload = null;
  if (text) {
    try {
      payload = JSON.parse(text);
    } catch {
      payload = null;
    }
  }

  if (!response.ok) {
    const envelope = payload?.error || {};
    const code = envelope.code || "INTERNAL_ERROR";
    throw new ApiError({
      status: response.status,
      code,
      message: messageForCode(code, envelope.message || `Request failed (${response.status}).`),
      details: envelope.details,
      requestId: envelope.requestId,
    });
  }

  return payload;
}
