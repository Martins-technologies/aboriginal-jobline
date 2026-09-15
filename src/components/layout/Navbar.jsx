import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Briefcase, LogIn, LogOut, Menu, X } from "lucide-react";
import Logo from "./Logo";
import Button from "../common/Button";
import { useAuth } from "../../lib/auth/AuthContext";
import { isRecruiterRole } from "../../lib/mappers";

const links = [
  { to: "/", label: "Home" },
  { to: "/browse-jobs", label: "Browse Jobs" },
  { to: "/employers", label: "Employers" },
  { to: "/about-us", label: "About Us" },
  { to: "/contact", label: "Contact" },
];

function NavItems({ onNavigate, className = "" }) {
  return (
    <ul className={className}>
      {links.map((link) => (
        <li key={link.to}>
          <NavLink
            to={link.to}
            end={link.to === "/"}
            onClick={onNavigate}
            className={({ isActive }) =>
              `relative pb-1 text-sm font-medium transition-colors ${
                isActive
                  ? "font-semibold text-primary after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-accent"
                  : "text-body hover:text-primary"
              }`
            }
          >
            {link.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { session, signOut, profile } = useAuth();
  const dashboardTo = isRecruiterRole(profile?.role)
    ? "/employer-dashboard/overview"
    : "/dashboard/overview";

  const closeMenu = () => setOpen(false);

  const handleSignOut = () => {
    signOut();
    closeMenu();
  };

  return (
    <header className="sticky top-0 z-50 shrink-0 isolate border-b border-black/5 bg-white">
      <nav
        className="container-page relative flex h-[var(--nav-height)] items-center justify-between overflow-hidden"
        aria-label="Primary"
      >
        <Logo />

        <NavItems className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex" />

        <div className="flex items-center gap-3">
          <Button
            to="/post-a-job"
            variant="secondary"
            icon={Briefcase}
            className="hidden sm:inline-flex"
          >
            Post a Job
          </Button>
          {session ? (
            <>
              <Button to={dashboardTo} variant="outline" className="hidden sm:inline-flex">
                Dashboard
              </Button>
              <Button
                type="button"
                variant="secondary"
                icon={LogOut}
                className="hidden sm:inline-flex"
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            </>
          ) : (
            <Button
              to="/sign-in"
              variant="secondary"
              icon={LogIn}
              className="hidden sm:inline-flex"
            >
              Sign In
            </Button>
          )}
          <button
            type="button"
            className="rounded-lg p-2 text-primary md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div id="mobile-nav" className="border-t border-black/5 bg-white md:hidden">
          <NavItems
            onNavigate={closeMenu}
            className="flex flex-col gap-4 px-6 py-5"
          />
          <div className="flex flex-col gap-3 px-6 pb-5">
            <Button
              to="/post-a-job"
              variant="secondary"
              icon={Briefcase}
              className="w-full"
              onClick={closeMenu}
            >
              Post a Job
            </Button>
            {session ? (
              <>
                <Button to={dashboardTo} variant="outline" className="w-full" onClick={closeMenu}>
                  Dashboard
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  icon={LogOut}
                  className="w-full"
                  onClick={handleSignOut}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <Button
                to="/sign-in"
                variant="secondary"
                icon={LogIn}
                className="w-full"
                onClick={closeMenu}
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
}
