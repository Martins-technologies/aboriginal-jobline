import DashboardTopBanner from "../../components/dashboard/DashboardTopBanner";
import SavedJobListItem from "../../components/dashboard/SavedJobListItem";
import Button from "../../components/common/Button";
import { useDashboard } from "../../context/DashboardDataContext";

/**
 * SavedJobsPage — list of jobs the user has bookmarked.
 * Each item has Remove + Apply Now actions wired to DashboardDataContext.
 */
export default function SavedJobsPage() {
  const { savedJobs, toggleSaveJob, applyToJob, isApplied } = useDashboard();

  return (
    <div>
      <DashboardTopBanner
        eyebrow="Newcomer Jobline Dashboard"
        title="Saved Jobs"
        subtitle="Jobs you've bookmarked for later."
      />

      <div className="px-6 py-6 lg:px-8">
        {savedJobs.length === 0 ? (
          <div className="surface-card p-10 text-center">
            <p className="font-serif text-2xl text-primary">No saved jobs yet</p>
            <p className="mt-2 text-sm text-muted">
              Bookmark jobs while browsing and they'll show up here.
            </p>
            <div className="mt-5">
              <Button to="/dashboard/find-jobs" variant="secondary">
                Find Jobs
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {savedJobs.map((job) => (
              <SavedJobListItem
                key={job.id}
                job={job}
                isApplied={isApplied(job.id)}
                onRemove={toggleSaveJob}
                onApply={applyToJob}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
