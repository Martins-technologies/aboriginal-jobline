/**
 * ApplicationStatusBadge — colored status pill.
 * Colors drawn exclusively from the site's navy/orange/teal/green/gray palette.
 *
 * Statuses:
 *   Applied      → neutral teal (primary tint)
 *   In Review    → orange (accent)
 *   Interview    → solid teal (primary)
 *   Offer        → green (success)
 *   Not Selected → muted gray
 */

const STATUS_STYLES = {
  Applied:        "bg-primary/10 text-primary",
  "In Review":    "bg-accent/15 text-accent",
  Interview:      "bg-primary text-white",
  Offer:          "bg-green-100 text-green-700",
  "Not Selected": "bg-black/8 text-muted",
};

export default function ApplicationStatusBadge({ status }) {
  const style = STATUS_STYLES[status] ?? "bg-black/8 text-muted";
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${style}`}
    >
      {status}
    </span>
  );
}
