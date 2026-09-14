import { useMemo, useState } from "react";
import DashboardTopBanner from "../../components/dashboard/DashboardTopBanner";
import FilterSidebar from "../../components/jobs/FilterSidebar";
import JobResultsToolbar from "../../components/jobs/JobResultsToolbar";
import { useDashboard } from "../../context/DashboardDataContext";
import { useServiceCareJobs } from "../../hooks/useServiceCareJobs";
import {
  emptyFilters,
  filterJobs,
  formatSalary,
  sortJobs,
} from "../../utils/jobs";
import { Bookmark, BookmarkCheck, Check, ArrowRight, MapPin, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
import Spinner from "../../components/common/Spinner";
import { getIcon } from "../../utils/icons";
// ---------------------------------------------------------------------------
// Inline dashboard-aware job card for Find Jobs page
// ---------------------------------------------------------------------------
function FindJobsCard({ job, isApplied, isSaved, onApply, onToggleSave, layout }) {
  const Icon = getIcon(job.icon);
  const isList = layout === "list";

  if (isList) {
    return (
      <article className="surface-card flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:gap-5">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="font-sans text-sm font-semibold text-primary">
            <Link to={`/jobs/${job.id}`} className="hover:text-accent">
              {job.title}
            </Link>
          </h3>
          <p className="text-xs text-muted">{job.company}</p>
          <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-muted">
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3 w-3" /> {job.location}
            </span>
            <span className="inline-flex items-center gap-1">
              <Briefcase className="h-3 w-3" /> {job.type}
            </span>
            <span className="font-semibold text-accent">{formatSalary(job)}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onToggleSave(job)}
            aria-label={isSaved ? "Remove from saved" : "Save job"}
            className="rounded-lg p-1.5 text-muted hover:text-accent"
          >
            {isSaved ? <BookmarkCheck className="h-4 w-4 text-accent" /> : <Bookmark className="h-4 w-4" />}
          </button>
          {isApplied ? (
            <span className="inline-flex items-center gap-1 rounded-xl bg-primary/10 px-3 py-2 text-xs font-semibold text-primary">
              <Check className="h-3.5 w-3.5" /> Applied
            </span>
          ) : (
            <button
              type="button"
              onClick={() => onApply(job)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-accent px-3 py-2 text-xs font-semibold text-white hover:bg-accent/90"
            >
              Apply Now <ArrowRight className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </article>
    );
  }

  return (
    <article className="surface-card flex h-full flex-col p-5">
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <button
          type="button"
          onClick={() => onToggleSave(job)}
          aria-label={isSaved ? "Remove from saved" : "Save job"}
          className="rounded-lg p-1.5 text-muted hover:text-accent"
        >
          {isSaved ? <BookmarkCheck className="h-4 w-4 text-accent" /> : <Bookmark className="h-4 w-4" />}
        </button>
      </div>
      <div className="mt-4 flex flex-1 flex-col">
        <h3 className="font-serif text-lg leading-snug text-primary">
          <Link to={`/jobs/${job.id}`} className="hover:text-accent">{job.title}</Link>
        </h3>
        <p className="mt-1 text-sm text-muted">{job.company}</p>
        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted">
          <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3 text-primary" />{job.location}</span>
          <span className="inline-flex items-center gap-1"><Briefcase className="h-3 w-3 text-primary" />{job.type}</span>
        </div>
        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted">{job.description}</p>
        <p className="mt-2 text-sm font-bold text-accent">{formatSalary(job)}</p>
        <div className="mt-4 flex items-center justify-between gap-2">
          <Link to={`/jobs/${job.id}`} className="rounded-xl border border-primary px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary hover:text-white">
            View Details
          </Link>
          {isApplied ? (
            <span className="inline-flex items-center gap-1 rounded-xl bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
              <Check className="h-3.5 w-3.5" /> Applied
            </span>
          ) : (
            <button
              type="button"
              onClick={() => onApply(job)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-accent px-3 py-1.5 text-xs font-semibold text-white hover:bg-accent/90"
            >
              Apply Now <ArrowRight className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

// ---------------------------------------------------------------------------
// FindJobsPage — reuses existing hook + filter/toolbar components
// ---------------------------------------------------------------------------
export default function FindJobsPage() {
  const { jobs: rawJobs, loading, error } = useServiceCareJobs({ limit: 100 });
  const { isApplied, isSaved, applyToJob, toggleSaveJob } = useDashboard();

  const [filters, setFilters] = useState(emptyFilters);
  const [sort, setSort] = useState("relevant");
  const [view, setView] = useState("grid");

  const visibleJobs = useMemo(
    () => sortJobs(filterJobs(rawJobs, filters), sort),
    [rawJobs, filters, sort],
  );

  const handleApplyFilters = (draft) => setFilters({ ...emptyFilters, ...draft });
  const handleResetFilters = () => setFilters(emptyFilters);

  return (
    <div>
      <DashboardTopBanner
        eyebrow="Aboriginal Jobline Dashboard"
        title="Find Jobs"
        subtitle="Search and filter jobs from inclusive employers across Canada."
      />

      <div className="px-6 py-6 lg:px-8">
        <div className="grid items-start gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
          {/* Filter sidebar — reused from Browse Jobs */}
          <FilterSidebar
            filters={filters}
            onApply={handleApplyFilters}
            onReset={handleResetFilters}
          />

          <div className="min-w-0">
            <JobResultsToolbar
              count={visibleJobs.length}
              sort={sort}
              view={view}
              onSortChange={setSort}
              onViewChange={setView}
            />

            {loading ? (
              <Spinner label="Loading jobs" />
            ) : error ? (
              <p className="py-12 text-center text-accent">{error}</p>
            ) : visibleJobs.length === 0 ? (
              <div className="surface-card p-10 text-center">
                <p className="font-serif text-2xl text-primary">No jobs match these filters</p>
                <p className="mt-2 text-sm text-muted">Try clearing a filter or choosing a different category.</p>
                <button type="button" onClick={handleResetFilters} className="mt-4 text-sm font-semibold text-accent hover:underline">
                  Clear filters
                </button>
              </div>
            ) : (
              <div
                className={
                  view === "list"
                    ? "mt-4 space-y-3"
                    : "mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
                }
              >
                {visibleJobs.map((job) => (
                  <FindJobsCard
                    key={job.id}
                    job={job}
                    layout={view}
                    isApplied={isApplied(job.id)}
                    isSaved={isSaved(job.id)}
                    onApply={applyToJob}
                    onToggleSave={toggleSaveJob}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
