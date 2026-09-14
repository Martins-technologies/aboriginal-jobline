/**
 * Employer-facing pipeline stage badge.
 * Visual sibling to ApplicationStatusBadge (seeker-facing).
 * Stage label mapping (seeker ↔ employer):
 *   Applied → New | In Review → Reviewed | Interview → Interview
 *   Offer → Offer | Not Selected → Rejected
 */

const STAGE_STYLES = {
  New: "bg-primary/10 text-primary",
  Reviewed: "bg-accent/15 text-accent",
  Shortlisted: "bg-accent-light/20 text-accent-light",
  Interview: "bg-primary text-white",
  Offer: "bg-green-100 text-green-700",
  Hired: "bg-green-100 text-green-700",
  Rejected: "bg-black/8 text-muted",
  Withdrawn: "bg-black/8 text-muted",
};

export default function ApplicantStageBadge({ stage }) {
  const style = STAGE_STYLES[stage] ?? "bg-black/8 text-muted";
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${style}`}
    >
      {stage}
    </span>
  );
}
