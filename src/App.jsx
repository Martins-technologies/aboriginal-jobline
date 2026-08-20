import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
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
import JobDetailsPage from "./pages/JobDetailsPage";

const comingSoonRoutes = [
  { path: "/forgot-password", title: "Forgot Password" },
  { path: "/create-profile", title: "Create Profile" },
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
  { path: "/create-employer-account", title: "Create Employer Account" },
  { path: "/employer-dashboard", title: "Employer Dashboard" },
  { path: "/recruitment-solutions", title: "Recruitment Solutions" },
  { path: "/pricing", title: "Pricing" },
  { path: "/community-focus", title: "Community Focus" },
];

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
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/browse-jobs" element={<BrowseJobsPage />} />
          <Route path="/employers" element={<EmployersPage />} />
          <Route path="/about" element={<Navigate to="/about-us" replace />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/contact-us" element={<Navigate to="/contact" replace />} />
          <Route path="/post-a-job" element={<PostJobPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/jobs/:id" element={<JobDetailsPage />} />
          {comingSoonRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<ComingSoonPage title={route.title} />}
            />
          ))}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppLayout />
    </BrowserRouter>
  );
}
