import { useState } from "react";
import { Mail, CheckCircle2 } from "lucide-react";
import Button from "../common/Button";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function NewsletterForm({
  id = "newsletter-email",
  buttonLabel = "Subscribe",
  buttonVariant = "secondary",
  layout = "inline",
  placeholder = "Enter your email address",
  successMessage = "Thanks — you're signed up for job alerts.",
  inputClassName = "",
  successClassName = "text-primary",
}) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const value = email.trim();

    if (!EMAIL_PATTERN.test(value)) {
      setError("Please enter a valid email address.");
      setSuccess(false);
      return;
    }

    setError("");
    setSuccess(true);
    setEmail("");
  };

  if (success) {
    return (
      <p className={`flex items-center gap-2 text-sm font-medium ${successClassName}`} role="status">
        <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
        {successMessage}
      </p>
    );
  }

  const stacked = layout === "stacked";

  return (
    <form onSubmit={handleSubmit} noValidate className={stacked ? "space-y-3" : ""}>
      <div className={stacked ? "space-y-3" : "flex flex-col gap-2 sm:flex-row"}>
        <label htmlFor={id} className="sr-only">
          Email address
        </label>
        <div className="relative flex-1">
          <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
          <input
            id={id}
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={placeholder}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${id}-error` : undefined}
            className={`w-full rounded-xl border border-black/10 bg-white py-2.5 pl-10 pr-3 text-sm text-body placeholder:text-muted/80 focus:border-primary focus:outline-none ${inputClassName}`}
          />
        </div>
        <Button type="submit" variant={buttonVariant} className={stacked ? "w-full" : "shrink-0"}>
          {buttonLabel}
        </Button>
      </div>
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm text-accent" role="alert">
          {error}
        </p>
      ) : null}
    </form>
  );
}
