import DashboardTopBanner from "../../components/dashboard/DashboardTopBanner";
import StatCardRow from "../../components/dashboard/StatCardRow";
import ProfileCompletenessBar from "../../components/dashboard/ProfileCompletenessBar";
import RecommendedJobsSection from "../../components/dashboard/RecommendedJobsSection";
import { useDashboard } from "../../context/DashboardDataContext";

/**
 * OverviewPage — the dashboard home.
 * Banner → stat cards → profile completeness → recommended jobs grid.
 */
export default function OverviewPage() {
  const { stats, profile, recommendedJobs, isApplied, isSaved, applyToJob, toggleSaveJob } =
    useDashboard();

  return (
    <div>
      <DashboardTopBanner
        eyebrow="Newcomer Jobline Dashboard"
        title="Overview"
        subtitle="Your job search at a glance."
      />

      <StatCardRow stats={stats} />

      <div className="px-6 pb-4 lg:px-8">
        <ProfileCompletenessBar profile={profile} />
      </div>

      <RecommendedJobsSection
        jobs={recommendedJobs}
        isApplied={isApplied}
        isSaved={isSaved}
        onApply={applyToJob}
        onToggleSave={toggleSaveJob}
      />
    </div>
  );
}
