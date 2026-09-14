import { Link } from "react-router-dom";
import { CalendarDays, Edit2, MapPin, Users, X } from "lucide-react";
import JobPostingStatusBadge from "./JobPostingStatusBadge";
import Button from "../common/Button";

/**
 * JobPostingCard — a posting summary card used on Job Postings and Overview pages.
 * Shows: title, location, type, status badge, applicant count, posted date,
 * and an actions group (Edit, View Applicants, Close, Delete).
 */
export default function JobPostingCard({ posting, onClose, onDelete }) {
  const {
    id,
    title,
    location,
    employmentType,
    status,
    applicantCount,
    postedDate,
  } = posting;

  return (
    <article className="surface-card p-5 transition-shadow hover:shadow-md">
      <div className="flex flex-wrap items-start justify-between gap-3">
        {/* Left — title + meta */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-serif text-base font-bold text-primary">{title}</h3>
            <JobPostingStatusBadge status={status} />
          </div>
          <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3 shrink-0" aria-hidden="true" />
              {location}
            </span>
            <span>{employmentType}</span>
            <span className="flex items-center gap-1">
              <CalendarDays className="h-3 w-3 shrink-0" aria-hidden="true" />
              Posted {postedDate}
            </span>
          </div>
        </div>

        {/* Right — applicant count pill */}
        <Link
          to={`/employer-dashboard/job-postings/${id}/applicants`}
          className="flex shrink-0 items-center gap-1.5 rounded-full bg-primary/8 px-3 py-1 text-sm font-semibold text-primary transition-colors hover:bg-primary/15"
          aria-label={`${applicantCount} applicants for ${title}`}
        >
          <Users className="h-3.5 w-3.5" aria-hidden="true" />
          {applicantCount} {applicantCount === 1 ? "applicant" : "applicants"}
        </Link>
      </div>

      {/* Actions */}
      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-black/6 pt-4">
        <Button
          to={`/employer-dashboard/post-a-job?edit=${id}`}
          variant="outline"
          size="sm"
          icon={Edit2}
        >
          Edit
        </Button>
        <Button
          to={`/employer-dashboard/job-postings/${id}/applicants`}
          variant="outline"
          size="sm"
          icon={Users}
        >
          View Applicants
        </Button>

        {status !== "Closed" && (
          <button
            type="button"
            onClick={() => onClose?.(id)}
            className="flex items-center gap-1.5 rounded-xl border border-black/10 bg-white px-3 py-1.5 text-xs font-semibold text-body transition-colors hover:border-primary/30 hover:text-primary"
            aria-label={`Close posting: ${title}`}
          >
            <X className="h-3.5 w-3.5" aria-hidden="true" />
            Close Posting
          </button>
        )}
      </div>
    </article>
  );
}
