import DashboardTopBanner from "../../components/dashboard/DashboardTopBanner";
import CompanyProfileForm from "../../components/employerDashboard/CompanyProfileForm";
import { useEmployerData } from "../../context/EmployerDataContext";

/**
 * CompanyProfilePage — manage employer company information.
 * Route: /employer-dashboard/company-profile
 */
export default function CompanyProfilePage() {
  const { companyProfile, updateCompanyProfile } = useEmployerData();

  return (
    <div>
      <DashboardTopBanner
        eyebrow="Aboriginal Jobline Dashboard"
        title="Company Profile"
        subtitle="Manage how your organization appears to job seekers on Aboriginal Jobline."
      />

      <div className="mx-auto max-w-3xl px-6 py-8 lg:px-8">
        <div className="surface-card p-6 sm:p-8">
          <CompanyProfileForm
            profile={companyProfile}
            onSave={updateCompanyProfile}
          />
        </div>
      </div>
    </div>
  );
}
