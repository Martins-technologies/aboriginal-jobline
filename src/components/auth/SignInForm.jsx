import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Briefcase, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import Button from "../common/Button";
import { signIn } from "../../utils/auth";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const emptyForm = {
  email: "",
  username: "",
  password: "",
  remember: false,
};

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-primary">
        {label}
        <span className="ml-0.5 text-accent" aria-hidden="true">
          *
        </span>
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
  "w-full rounded-xl border border-black/10 bg-white py-3 pl-11 pr-4 text-sm text-body placeholder:text-muted/80 focus:border-primary focus:outline-none";

export default function SignInForm({ role, onRoleChange }) {
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const update = (field) => (event) => {
    const value = field === "remember" ? event.target.checked : event.target.value;
    setForm((current) => ({ ...current, [field]: value }));
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: "" }));
    }
  };

  const validate = () => {
    const next = {};
    if (!form.email.trim()) {
      next.email = "Please enter your email address.";
    } else if (!EMAIL_PATTERN.test(form.email.trim())) {
      next.email = "Please enter a valid email.";
    }
    if (!form.username.trim()) next.username = "Please enter your username.";
    if (!form.password) {
      next.password = "Please enter your password.";
    } else if (form.password.length < 6) {
      next.password = "Password must be at least 6 characters.";
    }
    return next;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      const firstId = Object.keys(nextErrors)[0];
      document.getElementById(`signin-${firstId}`)?.focus();
      return;
    }

    signIn({
      email: form.email.trim(),
      username: form.username.trim(),
      role,
      remember: form.remember,
    });
    navigate("/", { replace: true });
  };

  const signupTo = role === "employer" ? "/create-employer-account" : "/create-profile";
  const signupLabel = role === "employer" ? "Create employer account" : "Create profile";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid grid-cols-2 gap-3" role="tablist" aria-label="Account type">
        <button
          type="button"
          role="tab"
          aria-selected={role === "job-seeker"}
          onClick={() => onRoleChange("job-seeker")}
          className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm font-semibold transition-colors ${
            role === "job-seeker"
              ? "border-primary bg-primary-50 text-primary"
              : "border-black/10 bg-white text-muted hover:border-primary/40 hover:text-primary"
          }`}
        >
          <User className="h-4 w-4 shrink-0" aria-hidden="true" />
          Job Seeker
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={role === "employer"}
          onClick={() => onRoleChange("employer")}
          className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm font-semibold transition-colors ${
            role === "employer"
              ? "border-primary bg-primary-50 text-primary"
              : "border-black/10 bg-white text-muted hover:border-primary/40 hover:text-primary"
          }`}
        >
          <Briefcase className="h-4 w-4 shrink-0" aria-hidden="true" />
          Employer
        </button>
      </div>

      <Field id="signin-email" label="Email address" error={errors.email}>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            id="signin-email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={update("email")}
            placeholder="you@example.com"
            aria-invalid={Boolean(errors.email)}
            aria-required="true"
            aria-describedby={errors.email ? "signin-email-error" : undefined}
            className={inputClass}
          />
        </div>
      </Field>

      <Field id="signin-username" label="Username" error={errors.username}>
        <div className="relative">
          <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            id="signin-username"
            type="text"
            autoComplete="username"
            value={form.username}
            onChange={update("username")}
            placeholder="Your username"
            aria-invalid={Boolean(errors.username)}
            aria-required="true"
            aria-describedby={errors.username ? "signin-username-error" : undefined}
            className={inputClass}
          />
        </div>
      </Field>

      <Field id="signin-password" label="Password" error={errors.password}>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            id="signin-password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            value={form.password}
            onChange={update("password")}
            placeholder="Enter your password"
            aria-invalid={Boolean(errors.password)}
            aria-required="true"
            aria-describedby={errors.password ? "signin-password-error" : undefined}
            className={`${inputClass} pr-11`}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted hover:text-primary"
            onClick={() => setShowPassword((value) => !value)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </Field>

      <div className="flex items-center justify-between gap-3">
        <label className="inline-flex items-center gap-2 text-sm text-body">
          <input
            type="checkbox"
            checked={form.remember}
            onChange={update("remember")}
            className="h-4 w-4 rounded border-black/20 text-primary focus:ring-accent"
          />
          Remember me
        </label>
        <Link
          to="/forgot-password"
          className="text-sm font-semibold text-accent hover:text-accent/80 hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      <Button
        type="submit"
        variant="secondary"
        icon={ArrowRight}
        iconPosition="right"
        className="w-full"
        size="lg"
      >
        Sign In
      </Button>

      <p className="text-center text-sm text-muted">
        Don&apos;t have an account?{" "}
        <Link to={signupTo} className="font-semibold text-accent hover:text-accent/80 hover:underline">
          {signupLabel}
        </Link>
      </p>
    </form>
  );
}
