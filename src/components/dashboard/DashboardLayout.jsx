import { Outlet } from "react-router-dom";
import {
  BookMarked,
  FileText,
  LayoutDashboard,
  SearchIcon,
  User,
} from "lucide-react";
import DashboardSidebar from "./DashboardSidebar";

/**
 * Default nav config for the Job Seeker dashboard.
 * Employer dashboard passes its own config via sidebarProps.
 */
const JOB_SEEKER_NAV = [
  { to: "/dashboard/overview", label: "Overview", icon: LayoutDashboard },
  { to: "/dashboard/find-jobs", label: "Find Jobs", icon: SearchIcon },
  { to: "/dashboard/applications", label: "My Applications", icon: FileText },
  { to: "/dashboard/saved-jobs", label: "Saved Jobs", icon: BookMarked },
  { to: "/dashboard/profile", label: "My Profile", icon: User },
];

/**
 * DashboardLayout — wraps all /dashboard/* and /employer-dashboard/* pages.
 * Desktop: sidebar on left, content on right (full viewport height).
 * Mobile: sidebar collapses into an off-canvas drawer via DashboardSidebar.
 * Intentionally has NO public Navbar or Footer — this is a private workspace shell.
 *
 * Props:
 *   sidebarProps — forwarded to DashboardSidebar; override to inject employer nav config.
 *                  Defaults to Job Seeker nav when omitted.
 */
export default function DashboardLayout({ sidebarProps }) {
  const resolvedSidebarProps = sidebarProps ?? {
    navLinks: JOB_SEEKER_NAV,
    roleLabel: "Job Seeker",
    settingsPath: "/dashboard/settings",
  };

  return (
    <div className="flex min-h-screen flex-col bg-background lg:flex-row">
      {/* Sidebar (handles its own mobile drawer internally) */}
      <DashboardSidebar {...resolvedSidebarProps} />

      {/* Main content area */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* On lg+ there's no top bar; on mobile the sidebar renders the top bar */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
