import FilterSidebar from "../jobs/FilterSidebar";
import JobResultsToolbar from "../jobs/JobResultsToolbar";
import JobsGrid from "../jobs/JobsGrid";
import SectionEyebrow from "../common/SectionEyebrow";

export default function FeaturedJobsSection({
  jobs,
  count,
  filters,
  sort,
  view,
  onApplyFilters,
  onResetFilters,
  onSortChange,
  onViewChange,
}) {
  return (
    <section id="featured-jobs" className="bg-topo scroll-mt-24 py-20">
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <SectionEyebrow>Featured Opportunities</SectionEyebrow>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Latest Jobs in Demand</h2>
          <p className="mt-3 text-muted">
            Discover current job openings from inclusive employers across Canada who are committed
            to diversity, inclusion, and community.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
          <FilterSidebar filters={filters} onApply={onApplyFilters} onReset={onResetFilters} />
          <div>
            <JobResultsToolbar
              count={count}
              sort={sort}
              view={view}
              onSortChange={onSortChange}
              onViewChange={onViewChange}
            />
            <JobsGrid jobs={jobs} view={view} />
          </div>
        </div>
      </div>
    </section>
  );
}
