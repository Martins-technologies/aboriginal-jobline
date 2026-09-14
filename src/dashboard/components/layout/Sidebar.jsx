import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiFileText,
  FiBookmark,
  FiUser,
  FiBell,
  FiBriefcase,
  FiUsers,
  FiSettings,
  FiX,
} from "react-icons/fi";

import { theme } from "../../theme/theme";
import logo from "../../../assets/logo.png";

const seekerLinks = [
  {
    to: "/dashboard/seeker",
    label: "Dashboard",
    icon: FiHome,
    end: true,
  },
  {
    to: "/dashboard/seeker/applications",
    label: "My Applications",
    icon: FiFileText,
  },
  {
    to: "/dashboard/seeker/saved",
    label: "Saved Jobs",
    icon: FiBookmark,
  },
  {
    to: "/dashboard/seeker/notifications",
    label: "Notifications",
    icon: FiBell,
  },
  {
    to: "/dashboard/seeker/profile",
    label: "Profile & Settings",
    icon: FiUser,
  },
];

const recruiterLinks = [
  {
    to: "/dashboard/recruiter",
    label: "Dashboard",
    icon: FiHome,
    end: true,
  },
  {
    to: "/dashboard/recruiter/jobs",
    label: "My Jobs",
    icon: FiBriefcase,
  },
  {
    to: "/dashboard/recruiter/applicants",
    label: "Applicants",
    icon: FiUsers,
  },
  {
    to: "/dashboard/recruiter/notifications",
    label: "Notifications",
    icon: FiBell,
  },
  {
    to: "/dashboard/recruiter/company",
    label: "Company Profile",
    icon: FiSettings,
  },
];

export default function Sidebar({ role, open, onClose }) {
  const links = role === "recruiter" ? recruiterLinks : seekerLinks;

  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col transition-transform duration-300
          lg:sticky lg:top-0 lg:h-screen lg:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}`}
        style={{
          background: "var(--color-success)",
        }}
      >
        {/* Logo / Header */}
        <div className="flex items-center justify-between px-5 py-5">
          <div className="flex min-w-0 items-center gap-3">
            <img
              src={logo}
              alt={theme.siteName}
              className="h-11 w-auto max-w-[150px] object-contain"
            />

          
          </div>

          {/* Mobile Close Button */}
          <button
            type="button"
            className="ml-2 shrink-0 text-white lg:hidden"
            onClick={onClose}
            aria-label="Close menu"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-[var(--radius-md)] px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "text-[var(--color-primary)]"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`
              }
              style={({ isActive }) =>
                isActive
                  ? {
                      background: "var(--color-accent)",
                    }
                  : undefined
              }
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        
        <div className="px-5 py-5 text-xs text-white/50">
          One account. All partner sites.
        </div>
      </aside>
    </>
  );
}