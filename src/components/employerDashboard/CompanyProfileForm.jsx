import { useRef, useState } from "react";
import { Upload, X } from "lucide-react";
import Button from "../common/Button";

const inputClass =
  "w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-body placeholder:text-muted/80 focus:border-primary focus:outline-none";

const INDUSTRY_OPTIONS = [
  "Healthcare",
  "Education",
  "Government & Public Service",
  "Non-Profit / NGO",
  "Construction & Trades",
  "Technology",
  "Hospitality & Tourism",
  "Finance & Banking",
  "Natural Resources",
  "Retail & Commerce",
  "Arts & Culture",
  "Other",
];

const SIZE_OPTIONS = [
  "1–10",
  "11–50",
  "51–200",
  "201–500",
  "500+",
];

/**
 * CompanyProfileForm — company info form wrapped in a surface-card.
 * Persists to EmployerDataContext via the onSave callback.
 */
export default function CompanyProfileForm({ profile, onSave }) {
  const fileRef = useRef(null);
  const [form, setForm] = useState({
    name: profile?.name || "",
    logoFilename: profile?.logoFilename || "",
    industry: profile?.industry || "",
    size: profile?.size || "",
    website: profile?.website || "",
    location: profile?.location || "",
    description: profile?.description || "",
  });
  const [saved, setSaved] = useState(false);

  const update = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm((prev) => ({ ...prev, logoFilename: file.name }));
    }
  };

  const clearLogo = () => {
    setForm((prev) => ({ ...prev, logoFilename: "" }));
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave?.(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Company Name */}
      <div>
        <label htmlFor="cp-name" className="mb-1.5 block text-sm font-semibold text-primary">
          Company Name <span className="text-accent" aria-hidden="true">*</span>
        </label>
        <input
          id="cp-name"
          type="text"
          value={form.name}
          onChange={update("name")}
          placeholder="e.g. Northern Health Services"
          className={inputClass}
        />
      </div>

      {/* Logo upload */}
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-primary">Company Logo</label>
        {form.logoFilename ? (
          <div className="flex items-center gap-3 rounded-xl border border-black/10 bg-white px-4 py-3">
            <span className="flex-1 truncate text-sm text-body">{form.logoFilename}</span>
            <button
              type="button"
              onClick={clearLogo}
              className="rounded-lg p-1 text-muted hover:text-accent"
              aria-label="Remove logo"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-black/20 bg-white px-4 py-5 text-sm font-medium text-muted transition-colors hover:border-primary/40 hover:text-primary"
          >
            <Upload className="h-4 w-4" aria-hidden="true" />
            Upload logo (PNG, JPG, SVG)
          </button>
        )}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleLogoChange}
          aria-label="Upload company logo"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {/* Industry */}
        <div>
          <label htmlFor="cp-industry" className="mb-1.5 block text-sm font-semibold text-primary">
            Industry
          </label>
          <select
            id="cp-industry"
            value={form.industry}
            onChange={update("industry")}
            className={inputClass}
          >
            <option value="">Select industry</option>
            {INDUSTRY_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        {/* Company Size */}
        <div>
          <label htmlFor="cp-size" className="mb-1.5 block text-sm font-semibold text-primary">
            Company Size
          </label>
          <select
            id="cp-size"
            value={form.size}
            onChange={update("size")}
            className={inputClass}
          >
            <option value="">Select size</option>
            {SIZE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        {/* Website */}
        <div>
          <label htmlFor="cp-website" className="mb-1.5 block text-sm font-semibold text-primary">
            Website
          </label>
          <input
            id="cp-website"
            type="url"
            value={form.website}
            onChange={update("website")}
            placeholder="https://yourcompany.ca"
            className={inputClass}
          />
        </div>

        {/* Headquarters Location */}
        <div>
          <label htmlFor="cp-location" className="mb-1.5 block text-sm font-semibold text-primary">
            Headquarters Location
          </label>
          <input
            id="cp-location"
            type="text"
            value={form.location}
            onChange={update("location")}
            placeholder="e.g. Winnipeg, MB"
            className={inputClass}
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label htmlFor="cp-description" className="mb-1.5 block text-sm font-semibold text-primary">
          Company Description
        </label>
        <textarea
          id="cp-description"
          rows={5}
          value={form.description}
          onChange={update("description")}
          placeholder="Describe your organization's mission, culture, and what makes you an inclusive employer."
          className={`${inputClass} min-h-[120px] resize-y`}
        />
      </div>

      <div className="flex items-center gap-4">
        <Button type="submit" variant="secondary">
          Save Changes
        </Button>
        {saved && (
          <span className="text-sm font-semibold text-green-600" role="status">
            ✓ Profile saved!
          </span>
        )}
      </div>
    </form>
  );
}
