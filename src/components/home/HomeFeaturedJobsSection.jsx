import { ChevronRight, Search } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../common/Button";
import PageSection from "../common/PageSection";
import SectionEyebrow from "../common/SectionEyebrow";
import JobCard from "../jobs/JobCard";
import { jobs } from "../../data/jobs";

const featuredJobIds = [
  "indigenous-employment-coordinator",
  "administrative-assistant-toronto",
  "community-support-worker",
  "heavy-equipment-operator-fort-mcmurray",
  "guest-services-associate-calgary",
  "health-care-aide-halifax",
];

const featuredJobs = featuredJobIds
  .map((id) => jobs.find((job) => job.id === id))
  .filter(Boolean);

export default function HomeFeaturedJobsSection() {
  return (
    <PageSection className="bg-topo section-pad">
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.32fr)_minmax(0,0.68fr)] lg:gap-10">
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
          <div className="grid gap-4 sm:grid-cols-2">
            {featuredJobs.map((job) => (
              <JobCard key={job.id} job={job} variant="compact" />
            ))}
          </div>
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
