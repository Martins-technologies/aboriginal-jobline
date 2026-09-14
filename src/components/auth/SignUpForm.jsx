import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Building2, Eye, EyeOff, Globe, Hash, Lock, Mail, User } from "lucide-react";
import Button from "../common/Button";
import { ApiError, fieldErrorsFromApi } from "../../lib/api";
import { isRecruiterRole } from "../../lib/mappers";
import { useAuth } from "../../lib/auth/AuthContext";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_PATTERN = /^https?:\/\/.+/i;

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-primary">
        {label}
        <span className="ml-0.5 text-accent" aria-hidden="true">*</span>
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

export default function SignUpForm({ role = "job_seeker" }) {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const isEmployer = role === "recruiter";
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    company_name: "",
    company_website: "",
    company_registration_number: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [info, setInfo] = useState("");

  const update = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: "" }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Enter your full name.";
    else if (form.name.trim().length < 2) next.name = "Name must be at least 2 characters.";
    else if (form.name.trim().length > 160) next.name = "Name cannot be longer than 160 characters.";

    if (!form.email.trim()) next.email = "Enter an email we can use to sign you in.";
    else if (!EMAIL_PATTERN.test(form.email.trim())) next.email = "Enter a valid email address, like name@example.com.";
    else if (form.email.trim().length > 320) next.email = "Email addresses cannot be longer than 320 characters.";

    if (!form.password) next.password = "Create a password.";
    else if (form.password.length < 8) next.password = "Use at least 8 characters for your password.";
    else if (form.password.length > 200) next.password = "Passwords cannot be longer than 200 characters.";

    if (!form.confirmPassword) next.confirmPassword = "Re-enter your password to confirm it.";
    else if (form.confirmPassword !== form.password) next.confirmPassword = "The two passwords do not match.";

    if (isEmployer) {
      if (!form.company_name.trim()) next.company_name = "Enter your company name.";
      else if (form.company_name.trim().length > 180) next.company_name = "Company name cannot be longer than 180 characters.";
      if (!form.company_website.trim()) next.company_website = "Enter your company website.";
      else if (!URL_PATTERN.test(form.company_website.trim())) next.company_website = "Website must start with http:// or https://.";
      else if (form.company_website.trim().length > 1000) next.company_website = "Website URL cannot be longer than 1000 characters.";
      if (!form.company_registration_number.trim()) next.company_registration_number = "Enter your company registration number.";
      else if (form.company_registration_number.trim().length > 180) {
        next.company_registration_number = "Registration number cannot be longer than 180 characters.";
      }
    }
    return next;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    setInfo("");
    if (Object.keys(nextErrors).length > 0) {
      const firstId = Object.keys(nextErrors)[0];
      document.getElementById(`signup-${firstId}`)?.focus();
      return;
    }

    setLoading(true);
    try {
      const payload = {
        email: form.email.trim(),
        password: form.password,
        name: form.name.trim(),
        role,
      };
      if (isEmployer) {
        payload.company_name = form.company_name.trim();
        payload.company_website = form.company_website.trim();
        payload.company_registration_number = form.company_registration_number.trim();
      }
      const result = await signUp(payload);
      if (result.confirmationRequired || !result.accessToken) {
        setInfo("Check your email to confirm this account before signing in.");
        return;
      }
      navigate(isRecruiterRole(result.profile?.role) ? "/employer-dashboard/overview" : "/dashboard/overview", {
        replace: true,
      });
    } catch (err) {
      const fields = err instanceof ApiError ? fieldErrorsFromApi(err) : {};
      const mapped = {
        name: fields.name,
        email: fields.email,
        password: fields.password,
        company_name: fields.company_name,
        company_website: fields.company_website,
        company_registration_number: fields.company_registration_number,
      };
      let submit = err.message || "We could not create your account.";
      if (err instanceof ApiError) {
        if (err.code === "COMPANY_NAME_TAKEN") submit = "That company name is already registered.";
        else if (err.code === "COMPANY_BOOTSTRAP_FAILED") submit = "Your company could not be set up. Try a different company name.";
        else if (err.code === "RATE_LIMITED") submit = "Too many sign-up attempts. Wait a few minutes and try again.";
        else if (err.code === "VALIDATION_ERROR" && Object.keys(fields).length) {
          submit = "Fix the highlighted fields, then try again.";
        }
      }
      setErrors({ ...mapped, submit });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {errors.submit ? (
        <div className="rounded-xl bg-accent/10 p-3.5 text-sm font-semibold text-accent" role="alert">
          {errors.submit}
        </div>
      ) : null}
      {info ? (
        <div className="rounded-xl bg-primary/10 p-3.5 text-sm font-semibold text-primary" role="status">
          {info}
        </div>
      ) : null}

      <Field id="signup-name" label="Full name" error={errors.name}>
        <div className="relative">
          <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input id="signup-name" type="text" value={form.name} onChange={update("name")} placeholder="Your name" className={inputClass} aria-invalid={Boolean(errors.name)} />
        </div>
      </Field>
      <Field id="signup-email" label="Email address" error={errors.email}>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input id="signup-email" type="email" autoComplete="email" value={form.email} onChange={update("email")} placeholder="you@example.com" className={inputClass} aria-invalid={Boolean(errors.email)} />
        </div>
      </Field>
      <Field id="signup-password" label="Password" error={errors.password}>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input id="signup-password" type={showPassword ? "text" : "password"} autoComplete="new-password" value={form.password} onChange={update("password")} placeholder="At least 8 characters" className={`${inputClass} pr-11`} aria-invalid={Boolean(errors.password)} />
          <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted hover:text-primary" onClick={() => setShowPassword((v) => !v)} aria-label={showPassword ? "Hide password" : "Show password"}>
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </Field>
      <Field id="signup-confirmPassword" label="Confirm password" error={errors.confirmPassword}>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input id="signup-confirmPassword" type={showPassword ? "text" : "password"} autoComplete="new-password" value={form.confirmPassword} onChange={update("confirmPassword")} placeholder="Re-enter your password" className={inputClass} aria-invalid={Boolean(errors.confirmPassword)} />
        </div>
      </Field>

      {isEmployer ? (
        <>
          <Field id="signup-company_name" label="Company name" error={errors.company_name}>
            <div className="relative">
              <Building2 className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input id="signup-company_name" type="text" value={form.company_name} onChange={update("company_name")} placeholder="Your organization" className={inputClass} aria-invalid={Boolean(errors.company_name)} />
            </div>
          </Field>
          <Field id="signup-company_website" label="Company website" error={errors.company_website}>
            <div className="relative">
              <Globe className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input id="signup-company_website" type="url" value={form.company_website} onChange={update("company_website")} placeholder="https://yourcompany.ca" className={inputClass} aria-invalid={Boolean(errors.company_website)} />
            </div>
          </Field>
          <Field id="signup-company_registration_number" label="Company registration number" error={errors.company_registration_number}>
            <div className="relative">
              <Hash className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input id="signup-company_registration_number" type="text" value={form.company_registration_number} onChange={update("company_registration_number")} placeholder="Registration or business number" className={inputClass} aria-invalid={Boolean(errors.company_registration_number)} />
            </div>
          </Field>
        </>
      ) : null}

      <Button type="submit" variant="secondary" icon={loading ? undefined : ArrowRight} iconPosition="right" className="w-full" size="lg" disabled={loading}>
        {loading ? (
          <span className="inline-flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            Creating account
          </span>
        ) : isEmployer ? (
          "Create employer account"
        ) : (
          "Create job seeker account"
        )}
      </Button>

      <p className="text-center text-sm text-muted">
        Already have an account?{" "}
        <Link to="/sign-in" className="font-semibold text-accent hover:text-accent/80 hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}
