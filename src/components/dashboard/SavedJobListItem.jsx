import { ArrowRight, Bookmark, BookmarkCheck, MapPin, Briefcase, Trash2 } from "lucide-react";
import { getIcon } from "../../utils/icons";
import { formatSalary } from "../../utils/jobs";
import Button from "../common/Button";

/**
 * SavedJobListItem — compact card for a saved job.
 * Actions: "Remove from Saved" and "Apply Now" (wired to DashboardDataContext handlers).
 */
export default function SavedJobListItem({ job, onRemove, onApply, isApplied }) {
  const Icon = getIcon(job.icon);

  return (
    <article className="surface-card flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:gap-5">
      {/* Icon */}
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>

      {/* Job info */}
      <div className="min-w-0 flex-1">
        <p className="truncate font-sans text-sm font-semibold text-primary">{job.title}</p>
        <p className="text-xs text-muted">{job.company}</p>
        <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-muted">
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3 w-3" aria-hidden="true" />
            {job.location}
          </span>
          <span className="inline-flex items-center gap-1">
            <Briefcase className="h-3 w-3" aria-hidden="true" />
            {job.type}
          </span>
          <span className="font-semibold text-accent">{formatSalary(job)}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-2">
        {isApplied ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            ✓ Applied
          </span>
        ) : (
          <Button
            variant="secondary"
            size="sm"
            icon={ArrowRight}
            iconPosition="right"
            onClick={() => onApply(job)}
          >
            Apply Now
          </Button>
        )}
        <button
          type="button"
          onClick={() => onRemove(job)}
          aria-label={`Remove ${job.title} from saved jobs`}
          className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-muted transition-colors hover:bg-accent/10 hover:text-accent"
        >
          <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
          Remove
        </button>
      </div>
    </article>
  );
}
