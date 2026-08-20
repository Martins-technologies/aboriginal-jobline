import { ArrowRight } from "lucide-react";
import FilterSidebar from "../jobs/FilterSidebar";
import JobResultsToolbar from "../jobs/JobResultsToolbar";
import JobsGrid from "../jobs/JobsGrid";
import Button from "../common/Button";
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
    <PageSection id="featured-jobs" className="bg-topo section-pad scroll-mt-20">
      <div className="flex w-full flex-col gap-8 lg:gap-10">
        <SectionHeader
          className="w-full"
          eyebrow="Featured Opportunities"
          title="Latest Jobs in Demand"
          description="Discover current job openings from inclusive employers across Canada committed to community."
        />

        <div className="grid w-full items-start gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
          <FilterSidebar filters={filters} onApply={onApplyFilters} onReset={onResetFilters} />
          <div className="min-w-0">
            <JobResultsToolbar
              count={count}
              sort={sort}
              view={view}
              onSortChange={onSortChange}
              onViewChange={onViewChange}
            />
            <JobsGrid jobs={jobs} view={view} />
            <div className="mt-6 text-center">
              <Button href="#browse-categories" variant="ghost" icon={ArrowRight} iconPosition="right">
                View More Jobs
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageSection>
  );
}
