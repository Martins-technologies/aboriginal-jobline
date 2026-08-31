import { useState } from "react";
import { Plus, Briefcase } from "lucide-react";
import DashboardTopBanner from "../../components/dashboard/DashboardTopBanner";
import JobPostingCard from "../../components/employerDashboard/JobPostingCard";
import JobPostingsFilterBar from "../../components/employerDashboard/JobPostingsFilterBar";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import Button from "../../components/common/Button";
import { useEmployerData } from "../../context/EmployerDataContext";

/**
 * JobPostingsPage — list/manage all of the employer's job postings.
 * Supports filtering by status and searching by title.
 * Each posting card has Edit, View Applicants, Close, and Delete actions.
 */
export default function JobPostingsPage() {
  const { jobPostings, closeJobPosting, deleteJobPosting } = useEmployerData();

  const [activeStatus, setActiveStatus] = useState("All");
  const [search, setSearch] = useState("");
  const [confirmClose, setConfirmClose] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  // Filter postings by status and search term
  const filtered = jobPostings.filter((posting) => {
    const matchStatus = activeStatus === "All" || posting.status === activeStatus;
    const matchSearch = posting.title.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div>
      <DashboardTopBanner
        eyebrow="Newcomer Jobline Dashboard"
        title="Job Postings"
        subtitle="Manage all of your active, draft, and closed job listings."
      />

      <div className="px-6 py-6 lg:px-8">
        {/* Filter bar + Post a Job CTA */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <JobPostingsFilterBar
            activeStatus={activeStatus}
            onStatusChange={setActiveStatus}
            search={search}
            onSearchChange={setSearch}
          />
          <Button
            to="/employer-dashboard/post-a-job"
            variant="secondary"
            icon={Plus}
            className="ml-auto shrink-0"
          >
            Post a Job
          </Button>
        </div>

        {/* Postings list */}
        {filtered.length > 0 ? (
          <div className="space-y-4">
            {filtered.map((posting) => (
              <JobPostingCard
                key={posting.id}
                posting={posting}
                onClose={(id) => setConfirmClose(id)}
                onDelete={(p) => setConfirmDelete(p)}
              />
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="rounded-2xl border border-dashed border-black/20 bg-white p-12 text-center">
            <Briefcase className="mx-auto h-10 w-10 text-muted" aria-hidden="true" />
            <h2 className="mt-4 font-serif text-xl font-bold text-primary">
              {search || activeStatus !== "All"
                ? "No postings match your filter"
                : "No job postings yet"}
            </h2>
            <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
              {search || activeStatus !== "All"
                ? "Try adjusting your search or changing the status filter."
                : "Create your first listing to start connecting with Indigenous talent across Canada."}
            </p>
            {!search && activeStatus === "All" && (
              <div className="mt-6">
                <Button to="/employer-dashboard/post-a-job" variant="secondary" icon={Plus}>
                  Post a Job
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

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
      {confirmDelete && (
        <ConfirmDialog
          title={`Delete "${confirmDelete.title}"?`}
          description="This action cannot be undone. The posting and any associated applicants will be permanently removed."
          confirmLabel="Delete Posting"
          dangerous
          onConfirm={() => {
            deleteJobPosting(confirmDelete.id);
            setConfirmDelete(null);
          }}
          onCancel={() => setConfirmDelete(null)}
        />
      )}
    </div>
  );
}
