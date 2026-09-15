import { useEffect, useState } from "react";
import Button from "../common/Button";
import { ApiError, fieldErrorsFromApi } from "../../lib/api";

const URL_PATTERN = /^https?:\/\/.+/i;

const inputClass =
  "w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-body placeholder:text-muted/80 focus:border-primary focus:outline-none";

const readOnlyClass = `${inputClass} bg-black/5 text-muted`;

export default function CompanyProfileForm({ profile, onSave }) {
  const [form, setForm] = useState({
    name: profile?.name || "",
    website: profile?.website || "",
    registration_number: profile?.registration_number || "",
    description: profile?.description || "",
    verification_status: profile?.verification_status || "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setForm({
      name: profile?.name || "",
      website: profile?.website || "",
      registration_number: profile?.registration_number || "",
      description: profile?.description || "",
      verification_status: profile?.verification_status || "",
    });
  }, [profile]);

  const update = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
    setErrors((current) => ({ ...current, [field]: "", submit: "" }));
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = "Enter your company name.";
    else if (form.name.trim().length > 180) nextErrors.name = "Company name cannot be longer than 180 characters.";
    if (!form.website.trim()) nextErrors.website = "Enter your company website.";
    else if (!URL_PATTERN.test(form.website.trim())) nextErrors.website = "Website must start with http:// or https://.";
    if (form.registration_number.trim().length > 180) {
      nextErrors.registration_number = "Registration number cannot be longer than 180 characters.";
    }

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    setSaving(true);
    setErrors({});
    setMessage("");
    try {
      await onSave?.(form);
      setMessage("Company profile saved.");
    } catch (err) {
      const fields = err instanceof ApiError ? fieldErrorsFromApi(err) : {};
      setErrors({
        name: fields.name || fields.company_name,
        website: fields.website || fields.company_website,
        registration_number: fields.registration_number || fields.company_registration_number,
        description: fields.description,
        submit: err.message || "Your company profile could not be saved.",
      });
    } finally {
      setSaving(false);
    }
  };

  if (!profile) {
    return (
      <p className="text-sm text-muted">
        No company is linked to this recruiter account yet.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {errors.submit ? (
        <div className="rounded-xl bg-accent/10 p-3.5 text-sm font-semibold text-accent" role="alert">
          {errors.submit}
        </div>
      ) : null}
      {message ? (
        <div className="rounded-xl bg-primary/10 p-3.5 text-sm font-semibold text-primary" role="status">
          {message}
        </div>
      ) : null}

      <div>
        <label htmlFor="cp-name" className="mb-1.5 block text-sm font-semibold text-primary">Company Name</label>
        <input
          id="cp-name"
          type="text"
          value={form.name}
          onChange={update("name")}
          className={inputClass}
          aria-invalid={Boolean(errors.name)}
        />
        {errors.name ? <p className="mt-1 text-xs font-semibold text-accent">{errors.name}</p> : null}
      </div>
      <div>
        <label htmlFor="cp-website" className="mb-1.5 block text-sm font-semibold text-primary">Website</label>
        <input
          id="cp-website"
          type="url"
          value={form.website}
          onChange={update("website")}
          placeholder="https://yourcompany.ca"
          className={inputClass}
          aria-invalid={Boolean(errors.website)}
        />
        {errors.website ? <p className="mt-1 text-xs font-semibold text-accent">{errors.website}</p> : null}
      </div>
      <div>
        <label htmlFor="cp-reg" className="mb-1.5 block text-sm font-semibold text-primary">Registration number</label>
        <input
          id="cp-reg"
          type="text"
          value={form.registration_number}
          onChange={update("registration_number")}
          className={inputClass}
          aria-invalid={Boolean(errors.registration_number)}
        />
        {errors.registration_number ? (
          <p className="mt-1 text-xs font-semibold text-accent">{errors.registration_number}</p>
        ) : null}
      </div>
      <div>
        <label htmlFor="cp-status" className="mb-1.5 block text-sm font-semibold text-primary">Verification</label>
        <input
          id="cp-status"
          type="text"
          value={form.verification_status || "pending"}
          readOnly
          className={readOnlyClass}
        />
        <p className="mt-1 text-xs text-muted">Verification is reviewed by Aboriginal Jobline and cannot be changed here.</p>
      </div>
      <div>
        <label htmlFor="cp-description" className="mb-1.5 block text-sm font-semibold text-primary">Company Description</label>
        <textarea
          id="cp-description"
          rows={5}
          value={form.description}
          onChange={update("description")}
          placeholder="What does your company do?"
          className={`${inputClass} min-h-[120px] resize-y`}
        />
        {errors.description ? <p className="mt-1 text-xs font-semibold text-accent">{errors.description}</p> : null}
      </div>
      <Button type="submit" variant="secondary" disabled={saving}>
        {saving ? "Saving…" : "Save Changes"}
      </Button>
    </form>
  );
}
