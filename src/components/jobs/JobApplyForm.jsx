import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import Button from "../common/Button";
import { getApplication, saveApplication } from "../../utils/applications";
import { useSession } from "../../utils/auth";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

export default function JobApplyForm({ job }) {
  const session = useSession();
  const existing = getApplication(job.id);
  const [form, setForm] = useState({
    name: session?.username || "",
    email: session?.email || "",
    phone: "",
    coverLetter: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(existing);

  const update = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: "" }));
    }
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Please enter your full name.";
    if (!form.email.trim()) {
      next.email = "Please enter your email address.";
    } else if (!EMAIL_PATTERN.test(form.email.trim())) {
      next.email = "Please enter a valid email address.";
    }
    if (!form.coverLetter.trim()) next.coverLetter = "Please add a short note for the employer.";
    return next;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const firstId = Object.keys(nextErrors)[0];
      document.getElementById(`apply-${firstId}`)?.focus();
      return;
    }

    const application = saveApplication({
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      coverLetter: form.coverLetter.trim(),
      appliedAt: new Date().toISOString(),
    });
    setSubmitted(application);
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-primary/15 bg-white px-6 py-8 shadow-card" role="status">
        <p className="flex items-start gap-3 text-base font-medium text-primary">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
          Your application for {job.title} at {job.company} has been submitted.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          We saved your details so you can continue browsing. A recruiter from {job.company} can
          follow up at {submitted.email}.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button to="/browse-jobs" variant="secondary">
            Browse more jobs
          </Button>
          <Button to="/" variant="outline">
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form id="apply" onSubmit={handleSubmit} noValidate className="scroll-mt-24 space-y-4">
      <Field id="apply-name" label="Full name" required error={errors.name}>
        <input
          id="apply-name"
          type="text"
          value={form.name}
          onChange={update("name")}
          placeholder="Your full name"
          aria-invalid={Boolean(errors.name)}
          aria-required="true"
          className={inputClass}
        />
      </Field>
      <Field id="apply-email" label="Email address" required error={errors.email}>
        <input
          id="apply-email"
          type="email"
          value={form.email}
          onChange={update("email")}
          placeholder="you@email.com"
          aria-invalid={Boolean(errors.email)}
          aria-required="true"
          className={inputClass}
        />
      </Field>
      <Field id="apply-phone" label="Phone" error={errors.phone}>
        <input
          id="apply-phone"
          type="tel"
          value={form.phone}
          onChange={update("phone")}
          placeholder="Optional"
          className={inputClass}
        />
      </Field>
      <Field id="apply-coverLetter" label="Cover note" required error={errors.coverLetter}>
        <textarea
          id="apply-coverLetter"
          rows={5}
          value={form.coverLetter}
          onChange={update("coverLetter")}
          placeholder="Share why this role is a good fit and what you bring to the team."
          aria-invalid={Boolean(errors.coverLetter)}
          aria-required="true"
          className={`${inputClass} min-h-[120px] resize-y`}
        />
      </Field>
      <Button type="submit" variant="secondary" icon={Send} className="w-full" size="lg">
        Submit application
      </Button>
    </form>
  );
}
