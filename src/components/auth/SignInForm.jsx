import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Briefcase, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import Button from "../common/Button";
import { useAuth } from "../../lib/auth/AuthContext";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const emptyForm = {
  email: "",
  username: "",
  password: "",
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
  const { mockSignIn } = useAuth();
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const update = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: "" }));
    }
  };

  // No validation — any username + password works in demo mode.
  // The role tab determines where the user lands after sign-in.
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setErrors({});

    // Mock sign-in: create a local session without hitting the API.
    // Role is read from the active tab so RequireAuth guards route correctly.
    mockSignIn({
      email: form.email || "user@example.com",
      full_name: form.email?.split("@")[0] || "User",
      role: role === "employer" ? "employer" : "job-seeker",
    });

    const dest = role === "employer" ? "/employer-dashboard/overview" : "/dashboard/overview";
    navigate(dest, { replace: true });
    setLoading(false);
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

      {errors.submit ? (
        <div className="rounded-xl bg-accent/10 p-3.5 text-sm font-semibold text-accent" role="alert">
          {errors.submit}
        </div>
      ) : null}

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

      <div className="flex justify-end">
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
        disabled={loading}
      >
        {loading ? "Signing In..." : "Sign In"}
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
