import { useState } from "react";
import { Search, Users } from "lucide-react";
import DashboardTopBanner from "../../components/dashboard/DashboardTopBanner";
import ApplicantListItem from "../../components/employerDashboard/ApplicantListItem";
import ApplicantProfileDrawer from "../../components/employerDashboard/ApplicantProfileDrawer";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import { useEmployerData, EMPLOYER_STAGES } from "../../context/EmployerDataContext";

const inputClass =
  "rounded-xl border border-black/10 bg-white px-3.5 py-2.5 text-sm text-body placeholder:text-muted/70 focus:border-primary focus:outline-none";

/**
 * AllApplicantsPage — candidates across all job postings.
 * Route: /employer-dashboard/applicants
 * Supports filtering by job posting, pipeline stage, and candidate name search.
 */
export default function AllApplicantsPage() {
  const {
    jobPostings,
    applicants,
    advanceApplicantStage,
    rejectApplicant,
    updateApplicantNotes,
    setApplicantStage,
  } = useEmployerData();

  const [selectedPostingId, setSelectedPostingId] = useState("All");
  const [selectedStage, setSelectedStage] = useState("All");
  const [searchName, setSearchName] = useState("");
  const [confirmReject, setConfirmReject] = useState(null);
  const [activeDrawer, setActiveDrawer] = useState(null);

  const getJobTitle = (jobId) =>
    jobPostings.find((p) => p.id === jobId)?.title || "";

  // Filter applicants
  const filtered = applicants.filter((applicant) => {
    const matchPosting =
      selectedPostingId === "All" || applicant.jobId === selectedPostingId;
    const matchStage =
      selectedStage === "All" || applicant.stage === selectedStage;
    const matchName = applicant.name
      .toLowerCase()
      .includes(searchName.toLowerCase());
    return matchPosting && matchStage && matchName;
  });

  return (
    <div>
      <DashboardTopBanner
        eyebrow="Newcomer Jobline Dashboard"
        title="All Applicants"
        subtitle="Review, filter, and advance candidates across all of your job listings."
      />

      <div className="px-6 py-6 lg:px-8">
        {/* Filter bar */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          {/* Search by name */}
          <div className="relative min-w-[200px] flex-1">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              placeholder="Search candidate name…"
              className={`w-full pl-10 ${inputClass}`}
              aria-label="Search applicants by candidate name"
            />
          </div>

          {/* Filter by Job Posting */}
          <select
            value={selectedPostingId}
            onChange={(e) => setSelectedPostingId(e.target.value)}
            className={inputClass}
            aria-label="Filter by job posting"
          >
            <option value="All">All Job Postings</option>
            {jobPostings.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </select>

          {/* Filter by Pipeline Stage */}
          <select
            value={selectedStage}
            onChange={(e) => setSelectedStage(e.target.value)}
            className={inputClass}
            aria-label="Filter by pipeline stage"
          >
            <option value="All">All Stages</option>
            {EMPLOYER_STAGES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Applicant list */}
        {filtered.length > 0 ? (
          <div className="surface-card px-5">
            {filtered.map((applicant) => (
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
        ) : (
          /* Empty state */
          <div className="rounded-2xl border border-dashed border-black/20 bg-white p-12 text-center">
            <Users className="mx-auto h-10 w-10 text-muted" aria-hidden="true" />
            <h2 className="mt-4 font-serif text-xl font-bold text-primary">
              No applicants found
            </h2>
            <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
              {searchName || selectedPostingId !== "All" || selectedStage !== "All"
                ? "No candidates match your current filter criteria."
                : "No candidates have applied to any of your postings yet."}
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
        />
      )}
    </div>
  );
}
