import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Button from "../common/Button";
import { ApiError, fieldErrorsFromApi } from "../../lib/api";
import { useAuth } from "../../lib/auth/AuthContext";
import {
  createRecruiterJob,
  getPublicCategories,
  getRecruiterCompanies,
  updateRecruiterJob,
} from "../../lib/jobs";
import { EMPLOYMENT_TYPE_LABELS, EXPERIENCE_LABELS, WORKPLACE_LABELS, splitLocation } from "../../lib/mappers";

function Field({ id, label, required = false, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-primary">
        {label}
        {required ? <span className="ml-0.5 text-accent" aria-hidden="true">*</span> : null}
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

const emptyForm = {
  title: "",
  location: "",
  category_id: "",
  employment_type: "",
  workplace_type: "onsite",
  experience_level: "mid_level",
  salary_min: "",
  salary_max: "",
  salary_period: "yearly",
  summary: "",
};

export default function JobPostingForm({ initialValues, jobId, onSuccess, isDashboard = false }) {
  const { session, isRecruiter } = useAuth();
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState("form");
  const [company, setCompany] = useState(null);
  const [categoriesList, setCategoriesList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialValues) {
      setForm((current) => ({
        ...current,
        title: initialValues.title || "",
        location: initialValues.location || "",
        category_id: initialValues.category_id ? String(initialValues.category_id) : "",
        employment_type: initialValues.employment_type || "",
        workplace_type: initialValues.workplace_type || "onsite",
        experience_level: initialValues.experience_level || "mid_level",
        salary_min: initialValues.salary_min ?? "",
        salary_max: initialValues.salary_max ?? "",
        salary_period: initialValues.salary_period || "yearly",
        summary: initialValues.summary || initialValues.description || "",
      }));
    }
  }, [initialValues]);

  useEffect(() => {
    if (session?.accessToken && isRecruiter) {
      getRecruiterCompanies()
        .then((items) => setCompany(items[0] || null))
        .catch((err) => setErrors((current) => ({ ...current, submit: err.message })));
    }
    getPublicCategories()
      .then(setCategoriesList)
      .catch((err) => setErrors((current) => ({ ...current, submit: err.message })));
  }, [isRecruiter, session?.accessToken]);

  const update = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: "" }));
  };

  const validate = () => {
    const next = {};
    if (!form.title.trim()) next.title = "Enter a job title.";
    else if (form.title.trim().length < 3) next.title = "Job titles must be at least 3 characters.";
    else if (form.title.trim().length > 180) next.title = "Job titles cannot be longer than 180 characters.";
    if (!form.location.trim()) next.location = "Enter a city and province, or Remote.";
    if (!form.category_id) next.category_id = "Select a category for this listing.";
    if (!form.employment_type) next.employment_type = "Select an employment type.";
    if (!form.workplace_type) next.workplace_type = "Select a workplace type.";
    if (!form.experience_level) next.experience_level = "Select an experience level.";
    if (!form.summary.trim()) next.summary = "Write a job description.";
    else if (form.summary.trim().length < 20) next.summary = "Descriptions must be at least 20 characters.";
    else if (form.summary.trim().length > 30000) next.summary = "Descriptions cannot be longer than 30,000 characters.";
    if (form.salary_min !== "" && Number(form.salary_min) < 0) next.salary_min = "Minimum salary cannot be negative.";
    if (form.salary_max !== "" && Number(form.salary_max) < 0) next.salary_max = "Maximum salary cannot be negative.";
    if (form.salary_min !== "" && form.salary_max !== "" && Number(form.salary_max) < Number(form.salary_min)) {
      next.salary_max = "Maximum salary must be greater than or equal to the minimum.";
    }
    return next;
  };

  const buildPayload = () => {
    const { city, province, isRemote } = splitLocation(form.location);
    const workplace = form.workplace_type || "onsite";
    return {
      title: form.title.trim(),
      category_id: Number(form.category_id),
      employment_type: form.employment_type,
      description: form.summary.trim(),
      province: province || null,
      city: city || null,
      is_remote: workplace === "remote" || isRemote,
      workplace_type: workplace,
      experience_level: form.experience_level,
      salary_min: form.salary_min === "" ? null : Number(form.salary_min),
      salary_max: form.salary_max === "" ? null : Number(form.salary_max),
      salary_currency: "CAD",
      salary_period: form.salary_period || null,
      skills: [],
      audience_sites: [],
    };
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const firstId = Object.keys(nextErrors)[0];
      document.getElementById(`job-${firstId}`)?.focus();
      return;
    }
    setStep("review");
  };

  const handlePublish = async () => {
    setLoading(true);
    setErrors({});
    try {
      const payload = buildPayload();
      if (jobId) {
        await updateRecruiterJob(jobId, payload);
      } else {
        await createRecruiterJob(payload);
      }
      setStep("published");
    } catch (err) {
      const fields = err instanceof ApiError ? fieldErrorsFromApi(err) : {};
      let submit = err.message || "This job could not be published.";
      if (err instanceof ApiError) {
        if (err.code === "SITE_CATEGORY_MISMATCH") submit = "That category is not available on Aboriginal Jobline.";
        else if (err.code === "RECRUITER_COMPANY_NOT_BOUND") submit = "Your recruiter account is not linked to a company yet.";
        else if (err.code === "AUDIENCE_SITE_INVALID") submit = "An audience site on this posting is not allowed.";
        else if (err.code === "VALIDATION_ERROR") submit = "Fix the highlighted fields, then publish again.";
      }
      setErrors({ ...fields, category_id: fields.category_id, employment_type: fields.employment_type, submit });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm(emptyForm);
    setErrors({});
    setStep("form");
  };

  const categoryTitle = categoriesList.find((item) => String(item.id) === String(form.category_id))?.title || "";

  if (!session?.accessToken) {
    return (
      <div className="rounded-2xl border border-black/10 bg-white px-6 py-8 shadow-card text-center">
        <h3 className="font-serif text-2xl text-primary">Sign in to post a job</h3>
        <p className="mt-2 text-sm text-muted">You must be signed in to a recruiter account to post a listing.</p>
        <div className="mt-6">
          <Button to="/sign-in" variant="secondary">Sign In to Employer Account</Button>
        </div>
      </div>
    );
  }

  if (!isRecruiter) {
    return (
      <div className="rounded-2xl border border-black/10 bg-white px-6 py-8 shadow-card text-center">
        <h3 className="font-serif text-2xl text-primary">Recruiter account required</h3>
        <p className="mt-2 text-sm text-muted">Job seeker accounts cannot post jobs. Create an employer account instead.</p>
        <div className="mt-6">
          <Button to="/create-employer-account" variant="secondary">Create employer account</Button>
        </div>
      </div>
    );
  }

  if (step === "published") {
    return (
      <div className="rounded-2xl border border-primary/15 bg-primary-50 px-6 py-8" role="status">
        <p className="flex items-start gap-3 text-base font-medium text-primary">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          {jobId ? `${form.title} has been updated.` : `${form.title} is now live for Aboriginal Jobline.`}
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          {isDashboard ? (
            <Button to="/employer-dashboard/job-postings" variant="secondary">View postings</Button>
          ) : (
            <Button type="button" variant="outline" onClick={resetForm}>Post another job</Button>
          )}
          <Button to="/browse-jobs" variant="outline">Browse jobs</Button>
        </div>
      </div>
    );
  }

  if (step === "review") {
    return (
      <div className="rounded-2xl border border-black/10 bg-white px-6 py-8 shadow-card">
        <h3 className="font-serif text-2xl text-primary">Review your listing</h3>
        <p className="mt-2 text-sm text-muted">Confirm the details below, then publish.</p>
        {errors.submit ? (
          <div className="mt-4 rounded-xl bg-accent/10 p-3.5 text-sm font-semibold text-accent" role="alert">
            {errors.submit}
          </div>
        ) : null}
        <dl className="mt-6 space-y-3 text-sm">
          <div><dt className="font-semibold text-primary">Job title</dt><dd className="text-muted">{form.title}</dd></div>
          <div><dt className="font-semibold text-primary">Company</dt><dd className="text-muted">{company?.name || "Your bound company"}</dd></div>
          <div><dt className="font-semibold text-primary">Location</dt><dd className="text-muted">{form.location}</dd></div>
          <div><dt className="font-semibold text-primary">Category</dt><dd className="text-muted">{categoryTitle}</dd></div>
          <div><dt className="font-semibold text-primary">Employment type</dt><dd className="text-muted">{EMPLOYMENT_TYPE_LABELS[form.employment_type]}</dd></div>
          <div><dt className="font-semibold text-primary">Workplace</dt><dd className="text-muted">{WORKPLACE_LABELS[form.workplace_type]}</dd></div>
          <div><dt className="font-semibold text-primary">Experience</dt><dd className="text-muted">{EXPERIENCE_LABELS[form.experience_level]}</dd></div>
          <div><dt className="font-semibold text-primary">Summary</dt><dd className="text-muted">{form.summary}</dd></div>
        </dl>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button type="button" variant="outline" onClick={() => setStep("form")} disabled={loading}>Edit details</Button>
          <Button type="button" variant="secondary" onClick={handlePublish} disabled={loading}>
            {loading ? "Publishing…" : jobId ? "Save changes" : "Publish listing"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {errors.submit ? (
        <div className="rounded-xl bg-accent/10 p-3.5 text-sm font-semibold text-accent" role="alert">{errors.submit}</div>
      ) : null}
      <div className="rounded-xl bg-primary/5 px-4 py-3 text-sm text-muted">
        Posting as <span className="font-semibold text-primary">{company?.name || "your linked company"}</span>. Company is set by your recruiter account, not this form.
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="job-title" label="Job Title" required error={errors.title}>
          <input id="job-title" type="text" value={form.title} onChange={update("title")} placeholder="e.g. Community Engagement Coordinator" className={inputClass} />
        </Field>
        <Field id="job-location" label="Location" required error={errors.location}>
          <input id="job-location" type="text" value={form.location} onChange={update("location")} placeholder="e.g. Vancouver, BC or Remote" className={inputClass} />
        </Field>
        <Field id="job-category_id" label="Job Category" required error={errors.category_id}>
          <select id="job-category_id" value={form.category_id} onChange={update("category_id")} className={inputClass}>
            <option value="">Select a category</option>
            {categoriesList.map((category) => (
              <option key={category.id} value={category.id}>{category.title}</option>
            ))}
          </select>
        </Field>
        <Field id="job-employment_type" label="Employment Type" required error={errors.employment_type}>
          <select id="job-employment_type" value={form.employment_type} onChange={update("employment_type")} className={inputClass}>
            <option value="">Select employment type</option>
            {Object.entries(EMPLOYMENT_TYPE_LABELS).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </Field>
        <Field id="job-workplace_type" label="Workplace Type" required error={errors.workplace_type}>
          <select id="job-workplace_type" value={form.workplace_type} onChange={update("workplace_type")} className={inputClass}>
            {Object.entries(WORKPLACE_LABELS).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </Field>
        <Field id="job-experience_level" label="Experience Level" required error={errors.experience_level}>
          <select id="job-experience_level" value={form.experience_level} onChange={update("experience_level")} className={inputClass}>
            {Object.entries(EXPERIENCE_LABELS).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </Field>
        <Field id="job-salary_min" label="Salary minimum" error={errors.salary_min}>
          <input id="job-salary_min" type="number" min="0" value={form.salary_min} onChange={update("salary_min")} placeholder="Optional" className={inputClass} />
        </Field>
        <Field id="job-salary_max" label="Salary maximum" error={errors.salary_max}>
          <input id="job-salary_max" type="number" min="0" value={form.salary_max} onChange={update("salary_max")} placeholder="Optional" className={inputClass} />
        </Field>
        <Field id="job-salary_period" label="Salary period" error={errors.salary_period}>
          <select id="job-salary_period" value={form.salary_period} onChange={update("salary_period")} className={inputClass}>
            <option value="hourly">Hourly</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </Field>
      </div>
      <Field id="job-summary" label="Job Summary" required error={errors.summary}>
        <textarea id="job-summary" rows={6} value={form.summary} onChange={update("summary")} placeholder="Describe the role, responsibilities, and who you are looking for (at least 20 characters)." className={`${inputClass} min-h-[140px] resize-y`} />
      </Field>
      <Button type="submit" variant="secondary" icon={ArrowRight} iconPosition="right" className="w-full justify-between" size="lg">
        Continue
      </Button>
    </form>
  );
}
