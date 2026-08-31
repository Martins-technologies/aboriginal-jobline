import { useState } from "react";
import { Plus, Pencil, Trash2, X, Check } from "lucide-react";
import DashboardTopBanner from "../../components/dashboard/DashboardTopBanner";
import ProfileCompletenessBar from "../../components/dashboard/ProfileCompletenessBar";
import Button from "../../components/common/Button";
import { useDashboard } from "../../context/DashboardDataContext";

// ---------------------------------------------------------------------------
// Shared input class — matches the existing SignInForm / PostJob input style
// ---------------------------------------------------------------------------
const inputClass =
  "w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-body placeholder:text-muted/80 focus:border-primary focus:outline-none";

const labelClass = "mb-1.5 block text-sm font-semibold text-primary";

// ---------------------------------------------------------------------------
// Skills chip input
// ---------------------------------------------------------------------------
function SkillsInput({ skills, onChange }) {
  const [draft, setDraft] = useState("");

  const addSkill = () => {
    const trimmed = draft.trim();
    if (trimmed && !skills.includes(trimmed)) {
      onChange([...skills, trimmed]);
    }
    setDraft("");
  };

  const removeSkill = (s) => onChange(skills.filter((sk) => sk !== s));

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-3">
        {skills.map((s) => (
          <span
            key={s}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
          >
            {s}
            <button
              type="button"
              onClick={() => removeSkill(s)}
              aria-label={`Remove skill ${s}`}
              className="hover:text-accent"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") { e.preventDefault(); addSkill(); }
          }}
          placeholder="Type a skill and press Enter"
          className={`${inputClass} flex-1`}
          aria-label="Add a skill"
        />
        <button
          type="button"
          onClick={addSkill}
          className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90"
        >
          Add
        </button>
      </div>
      <p className="mt-1.5 text-xs text-muted">
        Press Enter after each skill to add it.
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Repeatable entry list (Experience / Education)
// ---------------------------------------------------------------------------
function emptyExperience() {
  return { id: `exp-${Date.now()}`, jobTitle: "", company: "", dates: "", description: "" };
}

function emptyEducation() {
  return { id: `edu-${Date.now()}`, school: "", field: "", dates: "" };
}

function ExperienceEntry({ entry, onChange, onRemove }) {
  return (
    <div className="rounded-xl border border-black/10 bg-white p-4 space-y-3">
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-semibold text-primary">Work Experience Entry</p>
        <button type="button" onClick={() => onRemove(entry.id)} aria-label="Remove entry" className="text-muted hover:text-accent">
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className={labelClass}>What was your job title?</label>
          <input className={inputClass} value={entry.jobTitle} onChange={(e) => onChange({ ...entry, jobTitle: e.target.value })} placeholder="e.g. Community Outreach Worker" />
        </div>
        <div>
          <label className={labelClass}>Where did you work?</label>
          <input className={inputClass} value={entry.company} onChange={(e) => onChange({ ...entry, company: e.target.value })} placeholder="e.g. First Nations Health Authority" />
        </div>
        <div>
          <label className={labelClass}>When did you work there?</label>
          <input className={inputClass} value={entry.dates} onChange={(e) => onChange({ ...entry, dates: e.target.value })} placeholder="e.g. 2021 – 2024" />
        </div>
        <div>
          <label className={labelClass}>Brief description (optional)</label>
          <input className={inputClass} value={entry.description} onChange={(e) => onChange({ ...entry, description: e.target.value })} placeholder="One sentence about what you did" />
        </div>
      </div>
    </div>
  );
}

function EducationEntry({ entry, onChange, onRemove }) {
  return (
    <div className="rounded-xl border border-black/10 bg-white p-4 space-y-3">
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-semibold text-primary">Education Entry</p>
        <button type="button" onClick={() => onRemove(entry.id)} aria-label="Remove entry" className="text-muted hover:text-accent">
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className={labelClass}>School or institution name</label>
          <input className={inputClass} value={entry.school} onChange={(e) => onChange({ ...entry, school: e.target.value })} placeholder="e.g. University of Manitoba" />
        </div>
        <div>
          <label className={labelClass}>What did you study?</label>
          <input className={inputClass} value={entry.field} onChange={(e) => onChange({ ...entry, field: e.target.value })} placeholder="e.g. Social Work" />
        </div>
        <div>
          <label className={labelClass}>Years attended</label>
          <input className={inputClass} value={entry.dates} onChange={(e) => onChange({ ...entry, dates: e.target.value })} placeholder="e.g. 2019 – 2023" />
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// MyProfilePage
// ---------------------------------------------------------------------------
export default function MyProfilePage() {
  const { profile, updateProfile } = useDashboard();
  const [form, setForm] = useState({ ...profile });
  const [saved, setSaved] = useState(false);

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const addExperience = () =>
    setForm((f) => ({ ...f, experience: [...(f.experience || []), emptyExperience()] }));
  const updateExp = (updated) =>
    setForm((f) => ({ ...f, experience: f.experience.map((e) => (e.id === updated.id ? updated : e)) }));
  const removeExp = (id) =>
    setForm((f) => ({ ...f, experience: f.experience.filter((e) => e.id !== id) }));

  const addEducation = () =>
    setForm((f) => ({ ...f, education: [...(f.education || []), emptyEducation()] }));
  const updateEdu = (updated) =>
    setForm((f) => ({ ...f, education: f.education.map((e) => (e.id === updated.id ? updated : e)) }));
  const removeEdu = (id) =>
    setForm((f) => ({ ...f, education: f.education.filter((e) => e.id !== id) }));

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <DashboardTopBanner
        eyebrow="Newcomer Jobline Dashboard"
        title="My Profile"
        subtitle="Tell us a bit about yourself so employers can get to know you."
      />

      <div className="px-6 py-6 lg:px-8">
        {/* Completeness bar (reflects current saved profile, not draft) */}
        <div className="mb-6">
          <ProfileCompletenessBar profile={profile} />
        </div>

        <form onSubmit={handleSave} noValidate>
          <div className="surface-card p-6 sm:p-8">
            <h2 className="font-serif text-2xl font-bold text-primary">Personal Details</h2>
            <p className="mt-1 text-sm text-muted">Fill in what you know — you can always come back and update this later.</p>

            <div className="mt-6 space-y-5">
              {/* Full Name */}
              <div>
                <label htmlFor="profile-fullname" className={labelClass}>Full Name</label>
                <input
                  id="profile-fullname"
                  type="text"
                  value={form.fullName}
                  onChange={set("fullName")}
                  placeholder="Enter your full name"
                  className={inputClass}
                />
              </div>

              {/* Email — prominent, near top */}
              <div>
                <label htmlFor="profile-email" className={labelClass}>Email Address</label>
                <input
                  id="profile-email"
                  type="email"
                  value={form.email}
                  onChange={set("email")}
                  placeholder="Enter your email address"
                  className={inputClass}
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="profile-phone" className={labelClass}>Phone Number</label>
                <input
                  id="profile-phone"
                  type="tel"
                  value={form.phone}
                  onChange={set("phone")}
                  placeholder="Enter your phone number"
                  className={inputClass}
                />
              </div>

              {/* Location */}
              <div>
                <label htmlFor="profile-location" className={labelClass}>City / Location</label>
                <input
                  id="profile-location"
                  type="text"
                  value={form.location}
                  onChange={set("location")}
                  placeholder="e.g., Toronto, ON"
                  className={inputClass}
                />
              </div>

              {/* Skills */}
              <div>
                <label className={labelClass}>Skills</label>
                <p className="mb-2 text-xs text-muted">
                  Add a few skills that describe what you're good at — press Enter after each one.
                </p>
                <SkillsInput
                  skills={form.skills || []}
                  onChange={(skills) => setForm((f) => ({ ...f, skills }))}
                />
              </div>

              {/* Work Experience (optional) */}
              <div>
                <div className="flex items-center justify-between gap-2">
                  <p className={labelClass}>
                    Work Experience{" "}
                    <span className="text-xs font-normal text-muted">(Optional)</span>
                  </p>
                  <button
                    type="button"
                    onClick={addExperience}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent/80"
                  >
                    <Plus className="h-4 w-4" /> Add entry
                  </button>
                </div>
                {(form.experience || []).length === 0 ? (
                  <p className="text-sm text-muted">No entries yet. Click "Add entry" to add your past work.</p>
                ) : (
                  <div className="mt-3 space-y-3">
                    {form.experience.map((entry) => (
                      <ExperienceEntry
                        key={entry.id}
                        entry={entry}
                        onChange={updateExp}
                        onRemove={removeExp}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Education (optional) */}
              <div>
                <div className="flex items-center justify-between gap-2">
                  <p className={labelClass}>
                    Education{" "}
                    <span className="text-xs font-normal text-muted">(Optional)</span>
                  </p>
                  <button
                    type="button"
                    onClick={addEducation}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent/80"
                  >
                    <Plus className="h-4 w-4" /> Add entry
                  </button>
                </div>
                {(form.education || []).length === 0 ? (
                  <p className="text-sm text-muted">No entries yet. Click "Add entry" to add your education.</p>
                ) : (
                  <div className="mt-3 space-y-3">
                    {form.education.map((entry) => (
                      <EducationEntry
                        key={entry.id}
                        entry={entry}
                        onChange={updateEdu}
                        onRemove={removeEdu}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Save */}
            <div className="mt-8 flex items-center gap-4">
              <Button type="submit" variant="secondary" size="lg">
                Save Changes
              </Button>
              {saved && (
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-green-600">
                  <Check className="h-4 w-4" /> Changes saved!
                </span>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
