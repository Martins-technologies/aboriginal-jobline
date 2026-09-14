import { NavLink } from "react-router-dom";

/**
 * Single sidebar nav link with an icon and active-state highlight.
 * Active state: bold text + teal left accent bar + tinted background —
 * mirrors the public Navbar's active-link pattern (bold + accent underline).
 */
export default function SidebarNavItem({ to, icon: Icon, label, onClick, end = false }) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onClick}
      className={({ isActive }) =>
        `group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
          isActive
            ? "bg-primary/10 font-semibold text-primary before:absolute before:left-0 before:top-1/2 before:h-5 before:w-[3px] before:-translate-y-1/2 before:rounded-r-full before:bg-accent"
            : "text-body hover:bg-primary/5 hover:text-primary"
        }`
      }
    >
      {Icon ? <Icon className="h-[18px] w-[18px] shrink-0" aria-hidden="true" /> : null}
      <span>{label}</span>
    </NavLink>
  );
}
