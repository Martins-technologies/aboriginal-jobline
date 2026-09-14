import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import {
  Briefcase,
  Building2,
  LayoutDashboard,
  PlusCircle,
  Users,
} from "lucide-react";
import ScrollToTop from "./components/layout/ScrollToTop";
import Navbar from "./components/layout/Navbar";
import ComingSoonPage from "./components/common/ComingSoonPage";
import NotFoundPage from "./components/common/NotFoundPage";
import HomePage from "./pages/HomePage";
import BrowseJobsPage from "./pages/BrowseJobsPage";
import EmployersPage from "./pages/EmployersPage";
import AboutUs from "./pages/AboutUs";
import ContactPage from "./pages/ContactPage";
import PostJobPage from "./pages/PostJobPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import JobDetailsPage from "./pages/JobDetailsPage";
import Spinner from "./components/common/Spinner";
import { isRecruiterRole, isSeekerRole } from "./lib/mappers";

// Job Seeker Dashboard
import DashboardLayout from "./components/dashboard/DashboardLayout";
import OverviewPage from "./pages/dashboard/OverviewPage";
import FindJobsPage from "./pages/dashboard/FindJobsPage";
import MyApplicationsPage from "./pages/dashboard/MyApplicationsPage";
import SavedJobsPage from "./pages/dashboard/SavedJobsPage";
import MyProfilePage from "./pages/dashboard/MyProfilePage";
import SettingsPage from "./pages/dashboard/SettingsPage";

// Employer Dashboard
import EmployerOverviewPage from "./pages/employerDashboard/EmployerOverviewPage";
import JobPostingsPage from "./pages/employerDashboard/JobPostingsPage";
import PostJobDashboardPage from "./pages/employerDashboard/PostJobDashboardPage";
import JobApplicantsPage from "./pages/employerDashboard/JobApplicantsPage";
import AllApplicantsPage from "./pages/employerDashboard/AllApplicantsPage";
import CompanyProfilePage from "./pages/employerDashboard/CompanyProfilePage";
import EmployerSettingsPage from "./pages/employerDashboard/EmployerSettingsPage";

// Auth + data
import { AuthProvider, useAuth } from "./lib/auth/AuthContext";
import { SavedJobsProvider } from "./lib/SavedJobsContext";
import { DashboardDataProvider } from "./context/DashboardDataContext";
import { EmployerDataProvider } from "./context/EmployerDataContext";

// ---------------------------------------------------------------------------
// Employer Sidebar Nav Configuration
// ---------------------------------------------------------------------------
const EMPLOYER_SIDEBAR_PROPS = {
  navLinks: [
    { to: "/employer-dashboard/overview", label: "Overview", icon: LayoutDashboard },
    { to: "/employer-dashboard/job-postings", label: "Job Postings", icon: Briefcase },
    { to: "/employer-dashboard/post-a-job", label: "Post a Job", icon: PlusCircle },
    { to: "/employer-dashboard/applicants", label: "Applicants", icon: Users },
    { to: "/employer-dashboard/company-profile", label: "Company Profile", icon: Building2 },
  ],
  roleLabel: "Employer / Recruiter",
  settingsPath: "/employer-dashboard/settings",
};

// ---------------------------------------------------------------------------
// Coming-soon routes (public)
// ---------------------------------------------------------------------------
const comingSoonRoutes = [
  { path: "/forgot-password", title: "Forgot Password" },
  { path: "/resume-tips", title: "Resume Tips" },
  { path: "/career-resources", title: "Career Resources" },
  { path: "/community-stories", title: "Community Stories" },
  { path: "/success-stories", title: "Success Stories" },
  { path: "/inclusive-hiring", title: "Inclusive Hiring" },
  { path: "/why-hire", title: "Why Hire Indigenous Talent" },
  { path: "/employer-resources", title: "Employer Resources" },
  { path: "/partnerships", title: "Partnerships" },
  { path: "/privacy-policy", title: "Privacy Policy" },
  { path: "/terms-of-use", title: "Terms of Use" },
  { path: "/accessibility", title: "Accessibility" },
  { path: "/recruitment-solutions", title: "Recruitment Solutions" },
  { path: "/pricing", title: "Pricing" },
  { path: "/community-focus", title: "Community Focus" },
  { path: "/resources", title: "Resources" },
];

// ---------------------------------------------------------------------------
// Job Seeker Auth Guard — unauthenticated -> /sign-in; employer -> /employer-dashboard
// ---------------------------------------------------------------------------
function RequireAuth() {
  const { session, profile, loading } = useAuth();

  if (loading) {
    return <Spinner label="Checking your session" className="min-h-screen" />;
  }

  if (!session) {
    return <Navigate to="/sign-in" replace />;
  }

  if (isRecruiterRole(profile?.role)) {
    return <Navigate to="/employer-dashboard/overview" replace />;
  }

  if (profile?.role && !isSeekerRole(profile.role)) {
    return <Navigate to="/sign-in" replace />;
  }

  return <Outlet />;
}

// ---------------------------------------------------------------------------
// Employer Auth Guard — unauthenticated -> /sign-in; job seeker -> /dashboard
// ---------------------------------------------------------------------------
function RequireEmployerAuth() {
  const { session, profile, loading } = useAuth();

  if (loading) {
    return <Spinner label="Checking your session" className="min-h-screen" />;
  }

  if (!session) {
    return <Navigate to="/sign-in" replace />;
  }

  if (!isRecruiterRole(profile?.role)) {
    return <Navigate to="/dashboard/overview" replace />;
  }

  return <Outlet />;
}

// ---------------------------------------------------------------------------
// Public layout — Navbar + page content (no Footer here; each page handles it)
// ---------------------------------------------------------------------------
function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-white focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-primary focus:shadow-card"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex flex-1 flex-col outline-none">
        <Outlet />
      </main>
    </div>
  );
}

// ---------------------------------------------------------------------------
// App — top-level router
// ---------------------------------------------------------------------------
export default function App() {
  return (
    <AuthProvider>
      <SavedJobsProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* ------------------------------------------------------------ */}
            {/* JOB SEEKER DASHBOARD routes — authenticated shell            */}
            {/* ------------------------------------------------------------ */}
            <Route element={<RequireAuth />}>
              <Route
                element={
                  <DashboardDataProvider>
                    <DashboardLayout />
                  </DashboardDataProvider>
                }
              >
                <Route path="/dashboard" element={<Navigate to="/dashboard/overview" replace />} />
                <Route path="/dashboard/overview" element={<OverviewPage />} />
                <Route path="/dashboard/find-jobs" element={<FindJobsPage />} />
                <Route path="/dashboard/applications" element={<MyApplicationsPage />} />
                <Route path="/dashboard/saved-jobs" element={<SavedJobsPage />} />
                <Route path="/dashboard/profile" element={<MyProfilePage />} />
                <Route path="/dashboard/settings" element={<SettingsPage />} />
              </Route>
            </Route>

            {/* ------------------------------------------------------------ */}
            {/* EMPLOYER DASHBOARD routes — authenticated shell              */}
            {/* ------------------------------------------------------------ */}
            <Route element={<RequireEmployerAuth />}>
              <Route
                element={
                  <EmployerDataProvider>
                    <DashboardLayout sidebarProps={EMPLOYER_SIDEBAR_PROPS} />
                  </EmployerDataProvider>
                }
              >
                <Route
                  path="/employer-dashboard"
                  element={<Navigate to="/employer-dashboard/overview" replace />}
                />
                <Route path="/employer-dashboard/overview" element={<EmployerOverviewPage />} />
                <Route path="/employer-dashboard/job-postings" element={<JobPostingsPage />} />
                <Route path="/employer-dashboard/post-a-job" element={<PostJobDashboardPage />} />
                <Route
                  path="/employer-dashboard/job-postings/:jobId/applicants"
                  element={<JobApplicantsPage />}
                />
                <Route path="/employer-dashboard/applicants" element={<AllApplicantsPage />} />
                <Route path="/employer-dashboard/company-profile" element={<CompanyProfilePage />} />
                <Route path="/employer-dashboard/settings" element={<EmployerSettingsPage />} />
              </Route>
            </Route>

            {/* ------------------------------------------------------------ */}
            {/* PUBLIC routes — with Navbar                                    */}
            {/* ------------------------------------------------------------ */}
            <Route element={<AppLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/browse-jobs" element={<BrowseJobsPage />} />
              <Route path="/employers" element={<EmployersPage />} />
              <Route path="/about" element={<Navigate to="/about-us" replace />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/contact-us" element={<Navigate to="/contact" replace />} />
              <Route path="/post-a-job" element={<PostJobPage />} />
              <Route path="/sign-in" element={<SignInPage />} />
              <Route path="/create-profile" element={<SignUpPage role="job_seeker" />} />
              <Route path="/create-employer-account" element={<SignUpPage role="recruiter" />} />
              <Route path="/jobs/:id" element={<JobDetailsPage />} />
              {comingSoonRoutes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={<ComingSoonPage title={route.title} />}
                />
              ))}
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </SavedJobsProvider>
    </AuthProvider>
  );
}
