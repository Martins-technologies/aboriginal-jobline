import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Users } from "lucide-react";
import DashboardTopBanner from "../../components/dashboard/DashboardTopBanner";
import ApplicantListItem from "../../components/employerDashboard/ApplicantListItem";
import ApplicantProfileDrawer from "../../components/employerDashboard/ApplicantProfileDrawer";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import { useEmployerData } from "../../context/EmployerDataContext";

/**
 * JobApplicantsPage — candidates for one specific job posting.
 * Route: /employer-dashboard/job-postings/:jobId/applicants
 */
export default function JobApplicantsPage() {
  const { jobId } = useParams();
  const {
    jobPostings,
    applicants,
    advanceApplicantStage,
    rejectApplicant,
    updateApplicantNotes,
    setApplicantStage,
    openResume,
    actionError,
  } = useEmployerData();

  const [confirmReject, setConfirmReject] = useState(null);
  const [activeDrawer, setActiveDrawer] = useState(null);

  const posting = jobPostings.find((p) => p.id === jobId);
  const postingApplicants = applicants.filter((a) => a.jobId === jobId);

  const jobTitle = posting?.title || "Job Posting";

  return (
    <div>
      <DashboardTopBanner
        eyebrow="Aboriginal Jobline Dashboard"
        title={`Applicants: ${jobTitle}`}
        subtitle={`Review and manage candidates who applied for this role (${postingApplicants.length}).`}
      />

      <div className="px-6 py-6 lg:px-8">
        {actionError ? (
          <div className="mb-4 rounded-xl bg-accent/10 p-3.5 text-sm font-semibold text-accent" role="alert">
            {actionError}
          </div>
        ) : null}
        {/* Back link */}
        <div className="mb-6">
          <Link
            to="/employer-dashboard/job-postings"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent/80 hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all job postings
          </Link>
        </div>

        {postingApplicants.length > 0 ? (
          <div className="surface-card px-5">
            {postingApplicants.map((applicant) => (
              <ApplicantListItem
                key={applicant.id}
                applicant={applicant}
                jobTitle={jobTitle}
                onAdvance={advanceApplicantStage}
                onReject={(a) => setConfirmReject(a)}
                onViewProfile={(a) => setActiveDrawer(a)}
              />
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="rounded-2xl border border-dashed border-black/20 bg-white p-12 text-center">
            <Users className="mx-auto h-10 w-10 text-muted" aria-hidden="true" />
            <h2 className="mt-4 font-serif text-xl font-bold text-primary">
              No applicants yet
            </h2>
            <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
              No candidates have applied for this position yet. Check back soon!
            </p>
          </div>
        )}
      </div>

      {/* Confirm Reject */}
      {confirmReject && (
        <ConfirmDialog
          title={`Reject ${confirmReject.name}?`}
          description="This will mark the candidate as Rejected. You can change their stage later if needed."
          confirmLabel="Reject Candidate"
          dangerous
          onConfirm={() => {
            rejectApplicant(confirmReject.id);
            setConfirmReject(null);
          }}
          onCancel={() => setConfirmReject(null)}
        />
      )}

      {/* Profile Drawer */}
      {activeDrawer && (
        <ApplicantProfileDrawer
          applicant={activeDrawer}
          onClose={() => setActiveDrawer(null)}
          onStageChange={(id, stage) => {
            setApplicantStage(id, stage);
            setActiveDrawer((prev) => (prev ? { ...prev, stage } : null));
          }}
          onNotesChange={updateApplicantNotes}
          onOpenResume={openResume}
        />
      )}
    </div>
  );
}
