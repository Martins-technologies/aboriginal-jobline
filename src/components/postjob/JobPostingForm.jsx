import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Button from "../common/Button";
import { categories } from "../../data/categories";

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
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

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

    console.log("Job posting submitted", {
      title: form.title.trim(),
      company: form.company.trim(),
      location: form.location.trim(),
      category: form.category,
      employmentType: form.employmentType,
      salaryRange: form.salaryRange.trim(),
      summary: form.summary.trim(),
    });
    setSuccess(true);
  };

  if (success) {
    return (
      <div
        className="rounded-2xl border border-primary/15 bg-primary-50 px-6 py-8"
        role="status"
      >
        <p className="flex items-start gap-3 text-base font-medium text-primary">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          Thank you — your job listing details have been received. A review and publish step
          will be available in a future update.
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-5"
          onClick={() => {
            setForm(emptyForm);
            setErrors({});
            setSuccess(false);
          }}
        >
          Post another job
        </Button>
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
            {categories.map((category) => (
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
