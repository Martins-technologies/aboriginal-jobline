import FilterSidebar from "../jobs/FilterSidebar";
import JobResultsToolbar from "../jobs/JobResultsToolbar";
import JobsGrid from "../jobs/JobsGrid";
import PageSection from "../common/PageSection";
import SectionHeader from "../common/SectionHeader";

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
    <PageSection id="featured-jobs" className="bg-topo section-pad scroll-mt-24">
      <SectionHeader
        eyebrow="Featured Opportunities"
        title="Latest Jobs in Demand"
        description="Discover current job openings from inclusive employers across Canada who are committed to diversity, inclusion, and community."
      />

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
          <div className="mt-8 text-center">
            <a
              href="#browse-categories"
              className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline"
            >
              View More Jobs
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </PageSection>
  );
}
