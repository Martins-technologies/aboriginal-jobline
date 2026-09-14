import { useEffect, useState } from "react";
import Button from "../common/Button";

const inputClass =
  "w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-body placeholder:text-muted/80 focus:border-primary focus:outline-none";

export default function CompanyProfileForm({ profile, onSave }) {
  const [form, setForm] = useState({
    name: profile?.name || "",
    website: profile?.website || "",
    registration_number: profile?.registration_number || "",
    description: profile?.description || "",
    logo_path: profile?.logo_path || "",
    verification_status: profile?.verification_status || "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setForm({
      name: profile?.name || "",
      website: profile?.website || "",
      registration_number: profile?.registration_number || "",
      description: profile?.description || "",
      logo_path: profile?.logo_path || "",
      verification_status: profile?.verification_status || "",
    });
  }, [profile]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      await onSave?.(form);
      setMessage("Saved.");
    } catch (err) {
      setError(err.message || "Company profile updates are not available on the API yet.");
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
      {error ? (
        <div className="rounded-xl bg-accent/10 p-3.5 text-sm font-semibold text-accent" role="alert">
          {error}
        </div>
      ) : null}
      {message ? (
        <div className="rounded-xl bg-primary/10 p-3.5 text-sm font-semibold text-primary" role="status">
          {message}
        </div>
      ) : null}

      <div>
        <label htmlFor="cp-name" className="mb-1.5 block text-sm font-semibold text-primary">Company Name</label>
        <input id="cp-name" type="text" value={form.name} readOnly className={`${inputClass} bg-black/5`} />
      </div>
      <div>
        <label htmlFor="cp-website" className="mb-1.5 block text-sm font-semibold text-primary">Website</label>
        <input id="cp-website" type="url" value={form.website} readOnly className={`${inputClass} bg-black/5`} />
      </div>
      <div>
        <label htmlFor="cp-reg" className="mb-1.5 block text-sm font-semibold text-primary">Registration number</label>
        <input id="cp-reg" type="text" value={form.registration_number} readOnly className={`${inputClass} bg-black/5`} />
      </div>
      <div>
        <label htmlFor="cp-status" className="mb-1.5 block text-sm font-semibold text-primary">Verification</label>
        <input id="cp-status" type="text" value={form.verification_status || "pending"} readOnly className={`${inputClass} bg-black/5`} />
      </div>
      <div>
        <label htmlFor="cp-description" className="mb-1.5 block text-sm font-semibold text-primary">Company Description</label>
        <textarea id="cp-description" rows={5} value={form.description} readOnly className={`${inputClass} min-h-[120px] resize-y bg-black/5`} />
      </div>
      <p className="text-sm text-muted">
        Logo and company edits are not available on the recruiter API yet. These details were saved when the company was created.
      </p>
      <Button type="submit" variant="secondary">
        Save Changes
      </Button>
    </form>
  );
}
