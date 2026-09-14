import { ChevronRight, Search } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../common/Button";
import PageSection from "../common/PageSection";
import SectionEyebrow from "../common/SectionEyebrow";
import JobCard from "../jobs/JobCard";
import Spinner from "../common/Spinner";
import { useServiceCareJobs } from "../../hooks/useServiceCareJobs";

export default function HomeFeaturedJobsSection() {
  const { jobs, loading, error } = useServiceCareJobs({ limit: 6 });

  return (
    <PageSection className="bg-topo section-pad">
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.28fr)_minmax(0,0.72fr)] lg:gap-12">
        <div>
          <SectionEyebrow className="justify-start">Featured Opportunities</SectionEyebrow>
          <h2 className="section-title mt-3">Featured Jobs Across Canada</h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Discover current openings from inclusive employers committed to Indigenous talent and
            community across the country.
          </p>
          <div className="mt-6">
            <Button to="/browse-jobs" variant="outline" icon={Search}>
              Browse All Jobs
            </Button>
          </div>
        </div>

        <div>
          {loading ? (
            <Spinner label="Loading jobs" />
          ) : error ? (
            <p className="text-accent py-6">{error}</p>
          ) : !jobs.length ? (
            <p className="text-muted py-6">No active jobs are available right now.</p>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {jobs.slice(0, 6).map((job) => (
                <JobCard key={job.id} job={job} variant="compact" />
              ))}
            </div>
          )}
          <div className="mt-6 text-center">
            <Link
              to="/browse-jobs"
              className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-accent"
            >
              View More Jobs
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </PageSection>
  );
}

