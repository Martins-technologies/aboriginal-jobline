import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import Button from "../common/Button";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const emptyForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-primary">
        {label}
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

export default function ContactForm() {
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
    if (!form.name.trim()) next.name = "Please enter your full name.";
    if (!form.email.trim()) {
      next.email = "Please enter your email address.";
    } else if (!EMAIL_PATTERN.test(form.email.trim())) {
      next.email = "Please enter a valid email.";
    }
    if (!form.subject.trim()) next.subject = "Please enter a subject.";
    if (!form.message.trim()) next.message = "Please enter a message.";
    return next;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      const firstId = Object.keys(nextErrors)[0];
      document.getElementById(`contact-${firstId}`)?.focus();
      return;
    }

    setErrors({
      submit:
        "This contact form is not connected to the API yet. Use the email address listed on this page instead of sending through the form.",
    });
  };

  if (success) {
    return (
      <div
        className="rounded-2xl border border-primary/15 bg-primary-50 px-6 py-8"
        role="status"
      >
        <p className="flex items-start gap-3 text-base font-medium text-primary">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          Thank you — your message has been sent. We’ll get back to you within 1–2 business days.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setForm(emptyForm);
              setErrors({});
              setSuccess(false);
            }}
          >
            Send another message
          </Button>
          <Button to="/browse-jobs" variant="secondary">
            Browse jobs
          </Button>
          <Button to="/" variant="outline">
            Back to home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {errors.submit ? (
        <div className="rounded-xl bg-accent/10 p-3.5 text-sm font-semibold text-accent" role="alert">
          {errors.submit}
        </div>
      ) : null}
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="contact-name" label="Full Name" error={errors.name}>
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={update("name")}
            placeholder="Your full name"
            aria-invalid={Boolean(errors.name)}
            aria-required="true"
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className={inputClass}
          />
        </Field>
        <Field id="contact-email" label="Email Address" error={errors.email}>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={update("email")}
            placeholder="you@email.com"
            aria-invalid={Boolean(errors.email)}
            aria-required="true"
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            className={inputClass}
          />
        </Field>
      </div>

      <Field id="contact-subject" label="Subject" error={errors.subject}>
        <input
          id="contact-subject"
          type="text"
          value={form.subject}
          onChange={update("subject")}
          placeholder="How can we help?"
          aria-invalid={Boolean(errors.subject)}
          aria-required="true"
          aria-describedby={errors.subject ? "contact-subject-error" : undefined}
          className={inputClass}
        />
      </Field>

      <Field id="contact-message" label="Message" error={errors.message}>
        <textarea
          id="contact-message"
          rows={6}
          value={form.message}
          onChange={update("message")}
          placeholder="Write your message here..."
          aria-invalid={Boolean(errors.message)}
          aria-required="true"
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className={`${inputClass} min-h-[140px] resize-y`}
        />
      </Field>

      <Button type="submit" variant="secondary" icon={Send} className="w-full" size="lg">
        Submit Message
      </Button>
    </form>
  );
}
