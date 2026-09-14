import { useEffect, useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import Button from "../common/Button";
import { ApiError, fieldErrorsFromApi } from "../../lib/api";
import { useAuth } from "../../lib/auth/AuthContext";
import { applyToJob, listResumes, uploadAndRegisterResume } from "../../lib/jobs";

function Field({ id, label, required = false, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-primary">
        {label}
        {required ? (
          <span className="ml-0.5 text-accent" aria-hidden="true">*</span>
        ) : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-accent" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-body placeholder:text-muted/80 focus:border-primary focus:outline-none";

export default function JobApplyForm({ job }) {
  const { session, profile, user, isSeeker } = useAuth();
  const [form, setForm] = useState({
    coverLetter: "",
    resumeId: "",
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [resumes, setResumes] = useState([]);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingResumes, setLoadingResumes] = useState(false);

  useEffect(() => {
    if (!session?.accessToken || !isSeeker) return undefined;
    let active = true;
    setLoadingResumes(true);
    listResumes()
      .then((data) => {
        if (!active) return;
        const items = data.items || [];
        setResumes(items);
        const defaultPath = profile?.default_resume_path;
        const match = items.find((item) => item.storage_path === defaultPath) || items[0];
        if (match) setForm((current) => ({ ...current, resumeId: match.id }));
      })
      .catch((err) => {
        if (active) setErrors({ submit: err.message || "Your resumes could not be loaded." });
      })
      .finally(() => {
        if (active) setLoadingResumes(false);
      });
    return () => {
      active = false;
    };
  }, [isSeeker, profile?.default_resume_path, session?.accessToken]);

  const update = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: "" }));
  };

  const validate = () => {
    const next = {};
    if (!form.resumeId && !resumeFile) next.resume = "Choose an existing PDF resume or upload a new one.";
    if (resumeFile && resumeFile.type !== "application/pdf") next.resume = "Upload a PDF file only.";
    else if (resumeFile && resumeFile.size > 5 * 1024 * 1024) next.resume = "That PDF is larger than the 5 MB limit.";
    if (form.coverLetter && form.coverLetter.length > 10000) {
      next.coverLetter = "Cover notes cannot be longer than 10,000 characters.";
    }
    return next;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    if (!isSeeker) {
      setErrors({ submit: "Only job seeker accounts can apply for jobs." });
      return;
    }

    setLoading(true);
    try {
      let resumePath = resumes.find((item) => item.id === form.resumeId)?.storage_path;
      if (resumeFile) {
        const registered = await uploadAndRegisterResume(resumeFile, user?.id || profile?.id, session.accessToken);
        resumePath = registered.resume?.storage_path;
      }
      await applyToJob(job.id, {
        cover_letter: form.coverLetter.trim() || null,
        resume_path: resumePath,
      });
      setSubmitted(true);
    } catch (err) {
      const fields = err instanceof ApiError ? fieldErrorsFromApi(err) : {};
      let submit = err.message || "Your application could not be submitted.";
      if (err instanceof ApiError) {
        if (err.code === "ALREADY_APPLIED") submit = "You have already applied to this job.";
        else if (err.code === "RESUME_REQUIRED") submit = "A registered PDF resume is required before you can apply.";
        else if (err.code === "JOB_EXPIRED") submit = "This job is no longer accepting applications.";
        else if (err.code === "JOB_NOT_FOUND") submit = "This job is not available on Aboriginal Jobline.";
        else if (err.code === "VALIDATION_ERROR") submit = "Fix the highlighted fields, then submit again.";
      }
      setErrors({ ...fields, resume: fields.resume_path || fields.resume, coverLetter: fields.cover_letter, submit });
    } finally {
      setLoading(false);
    }
  };

  if (!session?.accessToken) {
    return (
      <div className="rounded-2xl border border-black/10 bg-white p-6 text-center shadow-card">
        <h3 className="font-serif text-lg font-bold text-primary">Sign in to apply</h3>
        <p className="mt-2 text-sm text-muted">
          You must be signed in as a job seeker to apply.
        </p>
        <div className="mt-5">
          <Button to="/sign-in" variant="secondary" className="w-full">
            Sign In
          </Button>
        </div>
      </div>
    );
  }

  if (!isSeeker) {
    return (
      <div className="rounded-2xl border border-black/10 bg-white p-6 text-center shadow-card">
        <h3 className="font-serif text-lg font-bold text-primary">Job seeker account required</h3>
        <p className="mt-2 text-sm text-muted">
          Recruiter accounts cannot apply to jobs. Sign in with a job seeker profile.
        </p>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-primary/15 bg-white px-6 py-8 shadow-card" role="status">
        <p className="flex items-start gap-3 text-base font-medium text-primary">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
          Your application for {job.title} at {job.company} has been submitted.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          You can track this application from your dashboard.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button to="/dashboard/applications" variant="secondary">
            View applications
          </Button>
          <Button to="/browse-jobs" variant="outline">
            Browse more jobs
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form id="apply" onSubmit={handleSubmit} noValidate className="scroll-mt-24 space-y-4">
      {errors.submit ? (
        <div className="rounded-xl bg-accent/10 p-3.5 text-sm font-semibold text-accent" role="alert">
          {errors.submit}
        </div>
      ) : null}

      <Field id="apply-resume" label="Resume (PDF)" required error={errors.resume}>
        {loadingResumes ? (
          <p className="text-sm text-muted">Loading your resumes…</p>
        ) : resumes.length ? (
          <select
            id="apply-resume"
            value={form.resumeId}
            onChange={update("resumeId")}
            className={inputClass}
          >
            <option value="">Select a saved resume</option>
            {resumes.map((item) => (
              <option key={item.id} value={item.id}>
                {item.original_name}
              </option>
            ))}
          </select>
        ) : (
          <p className="text-sm text-muted">No resume on file yet — upload a PDF below.</p>
        )}
        <input
          className={`${inputClass} mt-2`}
          type="file"
          accept="application/pdf"
          onChange={(event) => {
            setResumeFile(event.target.files?.[0] || null);
            if (errors.resume) setErrors((current) => ({ ...current, resume: "" }));
          }}
        />
      </Field>

      <Field id="apply-coverLetter" label="Cover note" error={errors.coverLetter}>
        <textarea
          id="apply-coverLetter"
          rows={5}
          value={form.coverLetter}
          onChange={update("coverLetter")}
          placeholder="Optional — share why this role is a good fit (max 10,000 characters)."
          aria-invalid={Boolean(errors.coverLetter)}
          className={`${inputClass} min-h-[120px] resize-y`}
        />
      </Field>
      <Button type="submit" variant="secondary" icon={Send} className="w-full" size="lg" disabled={loading}>
        {loading ? (
          <span className="inline-flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            Submitting
          </span>
        ) : (
          "Submit application"
        )}
      </Button>
    </form>
  );
}
