import { useNavigate, useSearchParams } from "react-router-dom";
import DashboardTopBanner from "../../components/dashboard/DashboardTopBanner";
import JobPostingForm from "../../components/postjob/JobPostingForm";
import { useEmployerData } from "../../context/EmployerDataContext";

export default function PostJobDashboardPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editJobId = searchParams.get("edit");

  const { jobPostings, companyProfile } = useEmployerData();

  const existingPosting = editJobId
    ? jobPostings.find((p) => p.id === editJobId)
    : null;

  const initialValues = existingPosting
    ? {
        title: existingPosting.title,
        location: existingPosting.location,
        category_id: existingPosting.categoryId,
        employment_type: existingPosting.employment_type,
        workplace_type: existingPosting.workplace_type,
        experience_level: existingPosting.experience_level,
        salary_min: existingPosting.salaryMin || "",
        salary_max: existingPosting.salaryMax || "",
        salary_period: existingPosting.salary_period || "yearly",
        summary: existingPosting.description,
      }
    : {};

  const pageTitle = existingPosting ? "Edit Job Posting" : "Post a New Job";
  const pageSubtitle = existingPosting
    ? `Updating details for "${existingPosting.title}".`
    : "Create a job listing to reach skilled Indigenous candidates across Canada.";

  return (
    <div>
      <DashboardTopBanner
        eyebrow="Aboriginal Jobline Dashboard"
        title={pageTitle}
        subtitle={pageSubtitle}
      />

      <div className="mx-auto max-w-4xl px-6 py-8 lg:px-8">
        <div className="surface-card p-6 sm:p-8">
          <JobPostingForm
            initialValues={initialValues}
            jobId={existingPosting?.id}
            isDashboard
            onSuccess={() => navigate("/employer-dashboard/job-postings")}
          />
        </div>
      </div>
    </div>
  );
}
