import { ArrowRight, Bookmark, BookmarkCheck, Check, MapPin, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
import { getIcon } from "../../utils/icons";
import { formatSalary } from "../../utils/jobs";

/**
 * DashboardJobCard — an apply/save-aware job card for use inside the dashboard.
 * Extends the visual pattern of the existing JobCard but wires Apply + Bookmark
 * into DashboardDataContext handlers passed as props.
 * Shows a "✓ Applied" state when the job is already in the user's applications.
 */
function DashboardJobCard({ job, isApplied, isSaved, onApply, onToggleSave }) {
  const Icon = getIcon(job.icon);

  const iconColors = {
    users: "bg-primary/10 text-primary",
    "file-text": "bg-accent-light/20 text-accent-light",
    heart: "bg-accent/10 text-accent",
    "heart-pulse": "bg-accent/10 text-accent",
    wrench: "bg-accent-light/20 text-accent-light",
    utensils: "bg-primary/10 text-primary",
    "book-open": "bg-accent-light/20 text-accent-light",
    globe: "bg-primary/10 text-primary",
    truck: "bg-accent/10 text-accent",
  };

  return (
    <article className="surface-card flex h-full flex-col p-5">
      {/* Top row: icon + bookmark */}
      <div className="flex items-start justify-between gap-3">
        <span
          className={`flex h-12 w-12 items-center justify-center rounded-full ${
            iconColors[job.icon] || "bg-primary/10 text-primary"
          }`}
        >
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <button
          type="button"
          onClick={() => onToggleSave(job)}
          aria-label={isSaved ? `Remove ${job.title} from saved jobs` : `Save ${job.title}`}
          className="rounded-lg p-1.5 text-muted transition-colors hover:text-accent"
        >
          {isSaved ? (
            <BookmarkCheck className="h-4 w-4 text-accent" aria-hidden="true" />
          ) : (
            <Bookmark className="h-4 w-4" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Job details */}
      <div className="mt-4 flex flex-1 flex-col">
        <h3 className="font-serif text-xl leading-snug text-primary">
          <Link to={`/jobs/${job.id}`} className="hover:text-accent">
            {job.title}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-muted">{job.company}</p>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            {job.location}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Briefcase className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            {job.type}
          </span>
        </div>

        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted">{job.description}</p>
        <p className="mt-3 font-sans text-base font-bold text-accent">{formatSalary(job)}</p>

        {/* CTA */}
        <div className="mt-5 flex items-center justify-between gap-3">
          <Link
            to={`/jobs/${job.id}`}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary bg-transparent px-3 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            View Details
          </Link>

          {isApplied ? (
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-primary/10 px-3 py-2 text-sm font-semibold text-primary">
              <Check className="h-4 w-4" aria-hidden="true" />
              Applied
            </span>
          ) : (
            <button
              type="button"
              onClick={() => onApply(job)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Apply Now
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

/**
 * RecommendedJobsSection — heading + grid of DashboardJobCards.
 * Receive handlers from parent (OverviewPage) so context stays at page level.
 */
export default function RecommendedJobsSection({ jobs, isApplied, isSaved, onApply, onToggleSave }) {
  return (
    <section className="px-6 pb-8 pt-2 lg:px-8">
      <div className="mb-4">
        <h2 className="font-serif text-2xl font-bold text-primary">Recommended Jobs</h2>
        <p className="mt-1 text-sm text-muted">Jobs selected for you based on your profile.</p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {jobs.length === 0 ? (
          <div className="surface-card col-span-full p-10 text-center">
            <p className="font-serif text-2xl text-primary">No recommendations yet</p>
            <p className="mt-2 text-sm text-muted">
              Add skills and experience to your profile to see jobs chosen for you.
            </p>
          </div>
        ) : (
          jobs.map((job) => (
            <DashboardJobCard
              key={job.id}
              job={job}
              isApplied={isApplied(job.id)}
              isSaved={isSaved(job.id)}
              onApply={onApply}
              onToggleSave={onToggleSave}
            />
          ))
        )}
      </div>
    </section>
  );
}
