import { useNavigate, useSearchParams } from "react-router-dom";
import DashboardTopBanner from "../../components/dashboard/DashboardTopBanner";
import JobPostingForm from "../../components/postjob/JobPostingForm";
import { useEmployerData } from "../../context/EmployerDataContext";

/**
 * PostJobDashboardPage — create or edit a job posting within the employer dashboard shell.
 * Reuses Module 2's JobPostingForm component directly.
 * Handles both new creation and edit mode via ?edit=:jobId query parameter.
 */
export default function PostJobDashboardPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editJobId = searchParams.get("edit");

  const { jobPostings, createJobPosting, updateJobPosting, companyProfile } =
    useEmployerData();

  const existingPosting = editJobId
    ? jobPostings.find((p) => p.id === editJobId)
    : null;

  const initialValues = existingPosting
    ? {
        title: existingPosting.title,
        company: existingPosting.company || companyProfile?.name,
        location: existingPosting.location,
        category: existingPosting.category,
        employmentType: existingPosting.employmentType,
        salaryRange: existingPosting.salaryRange,
        summary: existingPosting.description,
      }
    : {
        company: companyProfile?.name || "",
      };

  const handleSavePosting = (formData, status = "Active") => {
    const payload = {
      title: formData.title.trim(),
      company: formData.company.trim() || companyProfile?.name || "Company",
      location: formData.location.trim(),
      category: formData.category,
      employmentType: formData.employmentType,
      salaryRange: formData.salaryRange.trim(),
      description: formData.summary.trim(),
      status: status,
    };

    if (existingPosting) {
      updateJobPosting(existingPosting.id, payload);
    } else {
      createJobPosting(payload);
    }

    navigate("/employer-dashboard/job-postings", {
      state: {
        toastMessage: existingPosting
          ? `Successfully updated "${payload.title}".`
          : `Successfully created posting "${payload.title}" (${status}).`,
      },
    });
  };

  const pageTitle = existingPosting ? "Edit Job Posting" : "Post a New Job";
  const pageSubtitle = existingPosting
    ? `Updating details for "${existingPosting.title}".`
    : "Create a job listing to reach skilled Indigenous candidates across Canada.";

  return (
    <div>
      <DashboardTopBanner
        eyebrow="Newcomer Jobline Dashboard"
        title={pageTitle}
        subtitle={pageSubtitle}
      />

      <div className="mx-auto max-w-4xl px-6 py-8 lg:px-8">
        <div className="surface-card p-6 sm:p-8">
          <JobPostingForm
            initialValues={initialValues}
            onSavePosting={handleSavePosting}
            isDashboard
          />
        </div>
      </div>
    </div>
  );
}
