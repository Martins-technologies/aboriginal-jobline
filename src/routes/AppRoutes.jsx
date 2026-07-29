import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../pages/HomePage';
import BrowseJobsPage from '../pages/BrowseJobPage';
import PostJobPage from '../pages/PostJobPage';
import EmployersPage from '../pages/EmployersPage';
import ContactPage from '../pages/ContactPage';
import JobDetailsPage from '../pages/JobDetail';
import NotFoundPage from '../pages/NotFoundPage';

// Dashboard: auth + role gating
import LoginPage from '../dashboard/pages/LoginPage';
import ProtectedRoute from '../dashboard/auth/ProtectedRoute';
import { SeekerDashboardShell, RecruiterDashboardShell } from '../dashboard/routes/DashboardShells';

// Dashboard: job seeker
import SeekerDashboardHome from '../dashboard/components/seeker/DashboardHome';
import MyApplications from '../dashboard/components/seeker/MyApplications';
import SavedJobs from '../dashboard/components/seeker/SavedJobs';
import SeekerProfileSettings from '../dashboard/components/seeker/ProfileSettings';

// Dashboard: recruiter
import RecruiterDashboardHome from '../dashboard/components/recruiter/DashboardHome';
import MyJobs from '../dashboard/components/recruiter/MyJobs';
import PostEditJob from '../dashboard/components/recruiter/PostEditJob';
import Applicants from '../dashboard/components/recruiter/Applicants';
import CompanyProfile from '../dashboard/components/recruiter/CompanyProfile';

// Dashboard: shared
import NotificationsList from '../dashboard/components/shared/NotificationsList';
import { mockSeekerNotifications, mockRecruiterNotifications } from '../dashboard/mock/notifications';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Marketing site */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="browse-jobs" element={<BrowseJobsPage />} />
        <Route path="job/:id" element={<JobDetailsPage />} />
        <Route path="post-job" element={<PostJobPage />} />
        <Route path="employers" element={<EmployersPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="404" element={<NotFoundPage />} />
      </Route>

      {/* Dashboard sign-in (mock — picks a role, no backend yet) */}
      <Route path="/login" element={<LoginPage />} />

      {/* Job seeker dashboard */}
      <Route
        path="/dashboard/seeker"
        element={
          <ProtectedRoute role="job_seeker">
            <SeekerDashboardShell />
          </ProtectedRoute>
        }
      >
        <Route index element={<SeekerDashboardHome />} />
        <Route path="applications" element={<MyApplications />} />
        <Route path="saved" element={<SavedJobs />} />
        <Route path="profile" element={<SeekerProfileSettings />} />
        <Route path="notifications" element={<NotificationsList source={mockSeekerNotifications} />} />
      </Route>

      {/* Recruiter dashboard */}
      <Route
        path="/dashboard/recruiter"
        element={
          <ProtectedRoute role="recruiter">
            <RecruiterDashboardShell />
          </ProtectedRoute>
        }
      >
        <Route index element={<RecruiterDashboardHome />} />
        <Route path="jobs" element={<MyJobs />} />
        <Route path="jobs/new" element={<PostEditJob />} />
        <Route path="jobs/:id/edit" element={<PostEditJob />} />
        <Route path="applicants" element={<Applicants />} />
        <Route path="company" element={<CompanyProfile />} />
        <Route path="profile" element={<CompanyProfile />} />
        <Route path="notifications" element={<NotificationsList source={mockRecruiterNotifications} />} />
      </Route>

      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};

export default AppRoutes;
