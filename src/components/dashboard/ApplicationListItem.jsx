import { useState } from "react";
import { CalendarDays, MapPin, Briefcase, Trash2 } from "lucide-react";
import ApplicationStatusBadge from "./ApplicationStatusBadge";
import Button from "../common/Button";
import { getIcon } from "../../utils/icons";

/**
 * ApplicationListItem — one row in the My Applications list.
 * Shows job info + status badge + Withdraw action (with inline confirmation).
 */
export default function ApplicationListItem({ application, onWithdraw }) {
  const [confirming, setConfirming] = useState(false);
  const Icon = getIcon(application.icon);

  const handleWithdraw = () => {
    if (confirming) {
      onWithdraw(application.id);
    } else {
      setConfirming(true);
    }
  };

  return (
    <article className="surface-card flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:gap-6">
      {/* Icon */}
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>

      {/* Job info */}
      <div className="min-w-0 flex-1">
        <p className="truncate font-sans text-sm font-semibold text-primary">
          {application.title}
        </p>
        <p className="text-xs text-muted">{application.company}</p>
        <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-muted">
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3 w-3" aria-hidden="true" />
            {application.location}
          </span>
          <span className="inline-flex items-center gap-1">
            <Briefcase className="h-3 w-3" aria-hidden="true" />
            {application.type}
          </span>
          <span className="inline-flex items-center gap-1">
            <CalendarDays className="h-3 w-3" aria-hidden="true" />
            Applied {application.dateApplied}
          </span>
        </div>
      </div>

      {/* Status + actions */}
      <div className="flex flex-wrap items-center gap-3">
        <ApplicationStatusBadge status={application.status} />

        {confirming ? (
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted">Are you sure?</span>
            <button
              type="button"
              onClick={handleWithdraw}
              className="rounded-lg bg-accent px-2.5 py-1 text-xs font-semibold text-white hover:bg-accent/90"
            >
              Yes, withdraw
            </button>
            <button
              type="button"
              onClick={() => setConfirming(false)}
              className="rounded-lg bg-black/8 px-2.5 py-1 text-xs font-semibold text-body hover:bg-black/15"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleWithdraw}
            aria-label={`Withdraw application for ${application.title}`}
            className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-muted transition-colors hover:bg-accent/10 hover:text-accent"
          >
            <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
            Withdraw
          </button>
        )}
      </div>
    </article>
  );
}
