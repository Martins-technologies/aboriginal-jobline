import { useState, useEffect } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Button from "../common/Button";
import { categories as staticCategories } from "../../data/categories";
import { useAuth } from "../../lib/auth/AuthContext";
import { getMyCompanies, createEmployerJob, getServiceCareCategories } from "../../lib/jobs";

const employmentTypes = ["Full-time", "Part-time", "Contract", "Remote"];

const emptyForm = {
  title: "",
  company: "",
  location: "",
  category: "",
  employmentType: "",
  salaryRange: "",
  summary: "",
};

function Field({ id, label, required = false, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-primary">
        {label}
        {required ? (
          <span className="ml-0.5 text-accent" aria-hidden="true">
            *
          </span>
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

export default function JobPostingForm() {
  const { session } = useAuth();
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState("form");
  const [companies, setCompanies] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (session?.accessToken) {
      getMyCompanies(session.accessToken)
        .then(setCompanies)
        .catch((err) => console.error("Error fetching companies", err));
    }
    getServiceCareCategories()
      .then(setCategoriesList)
      .catch((err) => console.error("Error fetching categories", err));
  }, [session?.accessToken]);

  const update = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: "" }));
    }
  };

  const validate = () => {
    const next = {};
    if (!form.title.trim()) next.title = "Please enter a job title.";
    if (!form.company.trim()) next.company = "Please enter a company name.";
    if (!form.location.trim()) next.location = "Please enter a location.";
    if (!form.category) next.category = "Please select a job category.";
    if (!form.employmentType) next.employmentType = "Please select an employment type.";
    if (!form.summary.trim()) next.summary = "Please enter a job summary.";
    return next;
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
    if (!session?.accessToken) {
      setErrors({ submit: "You must be logged in to publish a job." });
      return;
    }

    setLoading(true);
    setErrors({});

    const matchedCategory = categoriesList.find((c) => c.slug === form.category);
    const category_id = matchedCategory ? matchedCategory.id : 1;

    const matchedCompany = companies.find(
      (c) => c.name?.toLowerCase() === form.company.trim().toLowerCase()
    );
    const company_id = matchedCompany ? matchedCompany.id : (companies[0]?.id || "1");

    const parts = form.location.split(",");
    const city = parts[0]?.trim() || form.location;
    const province = parts[1]?.trim() || "ON";
    const is_remote =
      form.employmentType?.toLowerCase() === "remote" ||
      form.location.toLowerCase().includes("remote");

    let salary_min = 45000;
    let salary_max = 60000;
    let salary_period = "yearly";

    if (form.salaryRange) {
      const nums = form.salaryRange.match(/\d[\d,.]*/g);
      if (nums && nums.length > 0) {
        salary_min = parseFloat(nums[0].replace(/,/g, ""));
        if (nums[1]) {
          salary_max = parseFloat(nums[1].replace(/,/g, ""));
        } else {
          salary_max = salary_min;
        }
      }
      if (form.salaryRange.toLowerCase().includes("hour")) {
        salary_period = "hourly";
      }
    }

    const payload = {
      company_id,
      category_id,
      title: form.title.trim(),
      description: form.summary.trim(),
      city,
      province,
      is_remote,
      employment_type: form.employmentType,
      salary_currency: "CAD",
      salary_min,
      salary_max,
      salary_period,
    };

    try {
      const res = await createEmployerJob(payload, session.accessToken);
      setSuccessMessage(
        `Job submitted successfully. Status: ${res.status || "pending review"}.`
      );
      setStep("published");
    } catch (err) {
      setErrors({ submit: err.message || "Failed to submit job posting." });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm(emptyForm);
    setErrors({});
    setStep("form");
    setSuccessMessage("");
  };

  const displayCategories = categoriesList.length > 0 ? categoriesList : staticCategories;
  const categoryTitle = displayCategories.find((item) => item.slug === form.category)?.title || form.category;

  if (!session?.accessToken) {
    return (
      <div className="rounded-2xl border border-black/10 bg-white px-6 py-8 shadow-card text-center">
        <h3 className="font-serif text-2xl text-primary">Sign in to post a job</h3>
        <p className="mt-2 text-sm text-muted">
          You must be signed in to your employer account to post a job listing.
        </p>
        <div className="mt-6">
          <Button to="/sign-in" variant="secondary">
            Sign In to Employer Account
          </Button>
        </div>
      </div>
    );
  }

  if (step === "published") {
    return (
      <div
        className="rounded-2xl border border-primary/15 bg-primary-50 px-6 py-8"
        role="status"
      >
        <p className="flex items-start gap-3 text-base font-medium text-primary">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          Thank you — {form.title} at {form.company} is ready for review by our team and will
          appear with other employer listings once published. {successMessage}
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button type="button" variant="outline" onClick={resetForm}>
            Post another job
          </Button>
          <Button to="/browse-jobs" variant="secondary">
            Browse jobs
          </Button>
          <Button to="/employers" variant="outline">
            Employer resources
          </Button>
        </div>
      </div>
    );
  }

  if (step === "review") {
    return (
      <div className="rounded-2xl border border-black/10 bg-white px-6 py-8 shadow-card">
        <h3 className="font-serif text-2xl text-primary">Review your listing</h3>
        <p className="mt-2 text-sm text-muted">
          Confirm the details below, then publish. You can go back to edit anything first.
        </p>
        {errors.submit ? (
          <div className="mt-4 rounded-xl bg-accent/10 p-3.5 text-sm font-semibold text-accent" role="alert">
            {errors.submit}
          </div>
        ) : null}
        <dl className="mt-6 space-y-3 text-sm">
          <div>
            <dt className="font-semibold text-primary">Job title</dt>
            <dd className="text-muted">{form.title}</dd>
          </div>
          <div>
            <dt className="font-semibold text-primary">Company</dt>
            <dd className="text-muted">{form.company}</dd>
          </div>
          <div>
            <dt className="font-semibold text-primary">Location</dt>
            <dd className="text-muted">{form.location}</dd>
          </div>
          <div>
            <dt className="font-semibold text-primary">Category</dt>
            <dd className="text-muted">{categoryTitle}</dd>
          </div>
          <div>
            <dt className="font-semibold text-primary">Employment type</dt>
            <dd className="text-muted">{form.employmentType}</dd>
          </div>
          {form.salaryRange ? (
            <div>
              <dt className="font-semibold text-primary">Salary range</dt>
              <dd className="text-muted">{form.salaryRange}</dd>
            </div>
          ) : null}
          <div>
            <dt className="font-semibold text-primary">Summary</dt>
            <dd className="text-muted">{form.summary}</dd>
          </div>
        </dl>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button type="button" variant="outline" onClick={() => setStep("form")} disabled={loading}>
            Edit details
          </Button>
          <Button type="button" variant="secondary" onClick={handlePublish} disabled={loading}>
            {loading ? "Publishing..." : "Publish listing"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="job-title" label="Job Title" required error={errors.title}>
          <input
            id="job-title"
            type="text"
            value={form.title}
            onChange={update("title")}
            placeholder="e.g. Community Engagement Coordinator"
            aria-invalid={Boolean(errors.title)}
            aria-required="true"
            aria-describedby={errors.title ? "job-title-error" : undefined}
            className={inputClass}
          />
        </Field>
        <Field id="job-company" label="Company Name" required error={errors.company}>
          <input
            id="job-company"
            type="text"
            value={form.company}
            onChange={update("company")}
            placeholder="e.g. Northern Health Services"
            aria-invalid={Boolean(errors.company)}
            aria-required="true"
            aria-describedby={errors.company ? "job-company-error" : undefined}
            className={inputClass}
          />
        </Field>
        <Field id="job-location" label="Location" required error={errors.location}>
          <input
            id="job-location"
            type="text"
            value={form.location}
            onChange={update("location")}
            placeholder="e.g. Vancouver, BC or Remote"
            aria-invalid={Boolean(errors.location)}
            aria-required="true"
            aria-describedby={errors.location ? "job-location-error" : undefined}
            className={inputClass}
          />
        </Field>
        <Field id="job-category" label="Job Category" required error={errors.category}>
          <select
            id="job-category"
            value={form.category}
            onChange={update("category")}
            aria-invalid={Boolean(errors.category)}
            aria-required="true"
            aria-describedby={errors.category ? "job-category-error" : undefined}
            className={inputClass}
          >
            <option value="">Select a category</option>
            {displayCategories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.title}
              </option>
            ))}
          </select>
        </Field>
        <Field
          id="job-employmentType"
          label="Employment Type"
          required
          error={errors.employmentType}
        >
          <select
            id="job-employmentType"
            value={form.employmentType}
            onChange={update("employmentType")}
            aria-invalid={Boolean(errors.employmentType)}
            aria-required="true"
            aria-describedby={errors.employmentType ? "job-employmentType-error" : undefined}
            className={inputClass}
          >
            <option value="">Select employment type</option>
            {employmentTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </Field>
        <Field id="job-salaryRange" label="Salary Range" error={errors.salaryRange}>
          <input
            id="job-salaryRange"
            type="text"
            value={form.salaryRange}
            onChange={update("salaryRange")}
            placeholder="e.g. $50,000 – $65,000"
            className={inputClass}
          />
        </Field>
      </div>

      <Field id="job-summary" label="Job Summary" required error={errors.summary}>
        <textarea
          id="job-summary"
          rows={6}
          value={form.summary}
          onChange={update("summary")}
          placeholder="Briefly describe the role, key responsibilities, and what you're looking for."
          aria-invalid={Boolean(errors.summary)}
          aria-required="true"
          aria-describedby={errors.summary ? "job-summary-error" : undefined}
          className={`${inputClass} min-h-[140px] resize-y`}
        />
      </Field>

      <Button
        type="submit"
        variant="secondary"
        icon={ArrowRight}
        iconPosition="right"
        className="w-full justify-between"
        size="lg"
      >
        Continue
      </Button>
    </form>
  );
}
