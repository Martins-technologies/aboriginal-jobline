import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LogOut,
  Menu,
  Settings,
  X,
} from "lucide-react";
import Logo from "../layout/Logo";
import SidebarNavItem from "./SidebarNavItem";
import { useAuth } from "../../lib/auth/AuthContext";
import { useSession } from "../../utils/auth";

// ---------------------------------------------------------------------------
// Avatar — initial-based with navy/teal color scheme
// ---------------------------------------------------------------------------
function DashboardUserCard({ session, roleLabel = "Job Seeker" }) {
  const name = session?.username || session?.email || roleLabel;
  const initial = name.trim()[0]?.toUpperCase() || "J";

  return (
    <div className="flex items-center gap-3 rounded-xl bg-primary/5 px-3 py-3">
      {/* Avatar */}
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white"
        aria-hidden="true"
      >
        {initial}
      </span>
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-primary">{name}</p>
        <p className="text-xs text-muted">{roleLabel}</p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Inner sidebar content (shared between desktop and mobile drawer)
// ---------------------------------------------------------------------------
function SidebarContent({ onNavigate, navLinks = [], roleLabel = "Job Seeker", settingsPath = "/dashboard/settings" }) {
  const session = useSession();
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate("/", { replace: true });
  };

  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="px-4 pb-4 pt-5">
        <Logo compact />
      </div>

      {/* User card */}
      <div className="px-3 pb-4">
        <DashboardUserCard session={session} roleLabel={roleLabel} />
      </div>

      <div className="flex-1 overflow-y-auto px-3 pb-4">
        {/* Workspace group */}
        <p className="mb-1.5 px-3 text-[10px] font-bold uppercase tracking-eyebrow text-muted">
          Workspace
        </p>
        <nav aria-label="Dashboard workspace navigation">
          <ul className="space-y-0.5">
            {navLinks.map((link) => (
              <li key={link.to}>
                <SidebarNavItem
                  to={link.to}
                  icon={link.icon}
                  label={link.label}
                  onClick={onNavigate}
                />
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Bottom pinned: Settings + Sign Out */}
      <div className="border-t border-black/8 px-3 py-3">
        <ul className="space-y-0.5">
          <li>
            <SidebarNavItem
              to={settingsPath}
              icon={Settings}
              label="Settings"
              onClick={onNavigate}
            />
          </li>
          <li>
            <button
              type="button"
              onClick={handleSignOut}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-body transition-colors hover:bg-accent/10 hover:text-accent"
            >
              <LogOut className="h-[18px] w-[18px] shrink-0" aria-hidden="true" />
              Sign Out
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// DashboardSidebar — desktop + mobile
// Props:
//   navLinks      — array of { to, label, icon } (workspace nav items)
//   roleLabel     — string shown under the user's name, e.g. "Job Seeker" | "Employer"
//   settingsPath  — route for the Settings nav item
// ---------------------------------------------------------------------------
export default function DashboardSidebar({ navLinks, roleLabel, settingsPath }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const closeDrawer = () => setDrawerOpen(false);

  return (
    <>
      {/* ------------------------------------------------------------------ */}
      {/* Desktop sidebar — hidden on mobile                                  */}
      {/* ------------------------------------------------------------------ */}
      <aside
        className="hidden h-screen w-64 shrink-0 flex-col border-r border-black/8 bg-white lg:flex"
        aria-label="Dashboard sidebar"
      >
        <SidebarContent
          navLinks={navLinks}
          roleLabel={roleLabel}
          settingsPath={settingsPath}
        />
      </aside>

      {/* ------------------------------------------------------------------ */}
      {/* Mobile top bar (hamburger trigger)                                   */}
      {/* ------------------------------------------------------------------ */}
      <div className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-black/8 bg-white px-4 lg:hidden">
        <Logo compact />
        <button
          type="button"
          aria-label={drawerOpen ? "Close menu" : "Open menu"}
          aria-expanded={drawerOpen}
          aria-controls="dashboard-drawer"
          className="rounded-lg p-2 text-primary hover:bg-primary/5"
          onClick={() => setDrawerOpen((v) => !v)}
        >
          {drawerOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Mobile off-canvas drawer                                             */}
      {/* ------------------------------------------------------------------ */}
      {drawerOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/30 lg:hidden"
            aria-hidden="true"
            onClick={closeDrawer}
          />
          {/* Drawer panel */}
          <aside
            id="dashboard-drawer"
            className="fixed inset-y-0 left-0 z-50 w-72 overflow-y-auto border-r border-black/8 bg-white shadow-xl lg:hidden"
            aria-label="Dashboard mobile sidebar"
          >
            <div className="flex h-full flex-col">
              {/* Close button row */}
              <div className="flex items-center justify-between px-4 py-4">
                <Logo compact />
                <button
                  type="button"
                  aria-label="Close menu"
                  className="rounded-lg p-2 text-primary hover:bg-primary/5"
                  onClick={closeDrawer}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <SidebarContent
                onNavigate={closeDrawer}
                navLinks={navLinks}
                roleLabel={roleLabel}
                settingsPath={settingsPath}
              />
            </div>
          </aside>
        </>
      )}
    </>
  );
}
