import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/layout/ScrollToTop";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ComingSoonPage from "./components/common/ComingSoonPage";
import Home from "./pages/Home";
import BrowseJobsPage from "./pages/BrowseJobsPage";
import Employers from "./pages/Employers";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";

const comingSoonRoutes = [
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
];

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/browse-jobs" element={<BrowseJobsPage />} />
            <Route path="/employers" element={<Employers />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/jobs/:id"
              element={
                <ComingSoonPage
                  title="Job Details"
                  description="Full job detail and application pages will ship in a later module."
                />
              }
            />
            {comingSoonRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<ComingSoonPage title={route.title} />}
              />
            ))}
            <Route path="*" element={<Navigate to="/browse-jobs" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
