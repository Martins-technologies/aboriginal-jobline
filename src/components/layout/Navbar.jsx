import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Briefcase, Menu, X } from "lucide-react";
import Logo from "./Logo";
import Button from "../common/Button";

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

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/95 backdrop-blur">
      <nav className="container-page relative flex h-20 items-center justify-between" aria-label="Primary">
        <Logo />

        <NavItems className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex" />

        <div className="flex items-center gap-3">
          <Button
            to="/employers"
            variant="secondary"
            icon={Briefcase}
            className="hidden sm:inline-flex"
          >
            Post a Job
          </Button>
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
            onNavigate={() => setOpen(false)}
            className="flex flex-col gap-4 px-6 py-5"
          />
          <div className="px-6 pb-5">
            <Button to="/employers" variant="secondary" icon={Briefcase} className="w-full">
              Post a Job
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
