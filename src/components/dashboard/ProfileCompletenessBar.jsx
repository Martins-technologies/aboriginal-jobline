import { Link } from "react-router-dom";

/**
 * ProfileCompletenessBar
 * Calculates completion % from the simplified profile field set (no resume).
 * Fields counted: fullName, email, phone, location, skills(≥1), experience(≥1), education(≥1)
 */
const PROFILE_FIELDS = [
  { key: "fullName",    label: "Full name",    check: (v) => !!v?.trim() },
  { key: "email",       label: "Email",        check: (v) => !!v?.trim() },
  { key: "phone",       label: "Phone number", check: (v) => !!v?.trim() },
  { key: "location",    label: "Location",     check: (v) => !!v?.trim() },
  { key: "skills",      label: "Skills",       check: (v) => Array.isArray(v) && v.length > 0 },
  { key: "experience",  label: "Work experience (optional)", check: (v) => Array.isArray(v) && v.length > 0 },
  { key: "education",   label: "Education (optional)",       check: (v) => Array.isArray(v) && v.length > 0 },
];

export function calcCompleteness(profile) {
  if (!profile) return 0;
  const filled = PROFILE_FIELDS.filter((f) => f.check(profile[f.key])).length;
  return Math.round((filled / PROFILE_FIELDS.length) * 100);
}

export default function ProfileCompletenessBar({ profile }) {
  const pct = calcCompleteness(profile);
  const isComplete = pct === 100;

  return (
    <div className="surface-card mx-6 mb-0 p-4 lg:mx-8">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-semibold text-primary">Profile completeness</p>
            <span
              className={`text-sm font-bold ${isComplete ? "text-green-600" : "text-accent"}`}
            >
              {pct}%
            </span>
          </div>
          <div
            className="mt-2 h-2 w-full overflow-hidden rounded-full bg-black/10"
            role="progressbar"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Profile completeness"
          >
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isComplete ? "bg-green-500" : "bg-accent"
              }`}
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
        {!isComplete && (
          <Link
            to="/dashboard/profile"
            className="shrink-0 text-sm font-semibold text-accent hover:text-accent/80 hover:underline"
          >
            Complete profile →
          </Link>
        )}
      </div>
    </div>
  );
}
