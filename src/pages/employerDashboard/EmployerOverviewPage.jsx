import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Briefcase, Plus } from "lucide-react";
import DashboardTopBanner from "../../components/dashboard/DashboardTopBanner";
import StatCardRow from "../../components/dashboard/StatCardRow";
import JobPostingCard from "../../components/employerDashboard/JobPostingCard";
import ApplicantListItem from "../../components/employerDashboard/ApplicantListItem";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import ApplicantProfileDrawer from "../../components/employerDashboard/ApplicantProfileDrawer";
import Button from "../../components/common/Button";
import { useEmployerData } from "../../context/EmployerDataContext";

/**
 * EmployerOverviewPage — the employer dashboard home.
 * Banner → stat cards → recent applicants → active job postings.
 * Empty state when no postings exist yet.
 */
export default function EmployerOverviewPage() {
  const {
    stats,
    jobPostings,
    applicants,
    closeJobPosting,
    advanceApplicantStage,
    rejectApplicant,
    updateApplicantNotes,
    setApplicantStage,
    openResume,
    actionError,
    actionMessage,
  } = useEmployerData();

  const [confirmClose, setConfirmClose] = useState(null);
  const [confirmReject, setConfirmReject] = useState(null);
  const [activeDrawer, setActiveDrawer] = useState(null); // applicant object

  // Map stat keys expected by StatCardRow component
  const mappedStats = {
    applications: stats.activePostings,
    savedJobs: stats.totalApplicants,
    interviews: stats.interviewsScheduled,
    offers: stats.positionsFilled,
  };

  // Show up to 4 active postings on Overview
  const activePostings = jobPostings.filter((p) => p.status === "Active").slice(0, 4);

  // Show the 5 most recent applicants across all postings
  const recentApplicants = [...applicants]
    .sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate))
    .slice(0, 5);

  const getJobTitle = (jobId) =>
    jobPostings.find((p) => p.id === jobId)?.title || "";

  const hasPostings = jobPostings.length > 0;

  return (
    <div>
      <DashboardTopBanner
        eyebrow="Aboriginal Jobline Dashboard"
        title="Overview"
        subtitle="Your hiring activity at a glance."
      />

      {actionError || actionMessage ? (
        <div className={`mx-6 mt-4 rounded-xl p-3.5 text-sm font-semibold lg:mx-8 ${actionError ? "bg-accent/10 text-accent" : "bg-primary/10 text-primary"}`} role="status">
          {actionError || actionMessage}
        </div>
      ) : null}
      <StatCardRow stats={mappedStats} />

      {/* Empty state — no postings yet */}
      {!hasPostings && (
        <div className="mx-6 mt-2 mb-6 rounded-2xl border border-dashed border-black/20 bg-white p-10 text-center lg:mx-8">
          <Briefcase className="mx-auto h-10 w-10 text-muted" aria-hidden="true" />
          <h2 className="mt-4 font-serif text-xl font-bold text-primary">
            Post your first job
          </h2>
          <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
            Connect with skilled Indigenous talent across Canada. Create your first job listing to
            get started.
          </p>
          <div className="mt-6">
            <Button to="/employer-dashboard/post-a-job" variant="secondary" icon={Plus}>
              Post Your First Job →
            </Button>
          </div>
        </div>
      )}

      {/* Recent Applicants */}
      {recentApplicants.length > 0 && (
        <section className="px-6 py-6 lg:px-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-serif text-lg font-bold text-primary">Recent Applicants</h2>
            <Link
              to="/employer-dashboard/applicants"
              className="flex items-center gap-1 text-sm font-semibold text-accent hover:text-accent/80 hover:underline"
            >
              View All Applicants <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="surface-card px-5">
            {recentApplicants.map((applicant) => (
              <ApplicantListItem
                key={applicant.id}
                applicant={applicant}
                jobTitle={getJobTitle(applicant.jobId)}
                onAdvance={advanceApplicantStage}
                onReject={(a) => setConfirmReject(a)}
                onViewProfile={(a) => setActiveDrawer(a)}
              />
            ))}
          </div>
        </section>
      )}

      {/* Active Job Postings */}
      {activePostings.length > 0 && (
        <section className="px-6 pb-8 lg:px-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-serif text-lg font-bold text-primary">
              Your Active Job Postings
            </h2>
            <Link
              to="/employer-dashboard/job-postings"
              className="flex items-center gap-1 text-sm font-semibold text-accent hover:text-accent/80 hover:underline"
            >
              View All Postings <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="space-y-4">
            {activePostings.map((posting) => (
              <JobPostingCard
                key={posting.id}
                posting={posting}
                onClose={(id) => setConfirmClose(id)}
              />
            ))}
          </div>
        </section>
      )}

      {/* Confirm dialogs */}
      {confirmClose && (
        <ConfirmDialog
          title="Close this posting?"
          description="This posting will stop accepting new applicants. You can still view existing applicants."
          confirmLabel="Close Posting"
          onConfirm={() => {
            closeJobPosting(confirmClose);
            setConfirmClose(null);
          }}
          onCancel={() => setConfirmClose(null)}
        />
      )}
      {confirmReject && (
        <ConfirmDialog
          title={`Reject ${confirmReject.name}?`}
          description="This will mark the candidate as Rejected. This action is reversible — you can change their stage later."
          confirmLabel="Reject Candidate"
          dangerous
          onConfirm={() => {
            rejectApplicant(confirmReject.id);
            setConfirmReject(null);
          }}
          onCancel={() => setConfirmReject(null)}
        />
      )}

      {/* Applicant Profile Drawer */}
      {activeDrawer && (
        <ApplicantProfileDrawer
          applicant={activeDrawer}
          onClose={() => setActiveDrawer(null)}
          onStageChange={(id, stage) => {
            setApplicantStage(id, stage);
            setActiveDrawer((prev) => prev ? { ...prev, stage } : null);
          }}
          onNotesChange={updateApplicantNotes}
          onOpenResume={openResume}
        />
      )}
    </div>
  );
}
