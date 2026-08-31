/**
 * JobPostingStatusBadge — colored status pill for employer job postings.
 * Sibling to ApplicationStatusBadge; uses the same visual pattern but with
 * employer-facing posting statuses instead of application pipeline stages.
 *
 * Statuses:
 *   Active  → solid teal (primary) — matches "Interview" badge weight
 *   Draft   → muted gray
 *   Closed  → navy outline
 */

const STATUS_STYLES = {
  Active: "bg-primary text-white",
  Draft: "bg-black/8 text-muted",
  Closed: "border border-primary/30 bg-primary/5 text-primary",
};

export default function JobPostingStatusBadge({ status }) {
  const style = STATUS_STYLES[status] ?? "bg-black/8 text-muted";
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${style}`}
    >
      {status}
    </span>
  );
}
