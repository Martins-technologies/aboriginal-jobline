import { Link } from "react-router-dom";

export default function Logo({ variant = "dark", compact = false }) {
  const wordmark = variant === "light" ? "text-white" : "text-primary";
  const jobline = variant === "light" ? "text-white/90" : "text-accent";

  return (
    <Link to="/browse-jobs" className="flex items-center gap-3" aria-label="Aboriginal Jobline home">
      <svg
        viewBox="0 0 48 48"
        className="h-12 w-12 shrink-0"
        aria-hidden="true"
      >
        <circle cx="24" cy="24" r="23.5" fill={variant === "light" ? "none" : "#0F3D3E"} stroke={variant === "light" ? "white" : "none"} strokeWidth="1.5" />
        <circle cx="16" cy="16" r="3.2" fill={variant === "light" ? "#ffffff" : "#C1440E"} />
        <path d="M11 26c0-3.2 2.2-5.2 5-5.2s5 2 5 5.2" fill={variant === "light" ? "#ffffff" : "#C1440E"} />
        <circle cx="24" cy="13.5" r="3.4" fill={variant === "light" ? "#ffffff" : "#D9A441"} />
        <path d="M18.5 26c0-3.6 2.4-5.8 5.5-5.8s5.5 2.2 5.5 5.8" fill={variant === "light" ? "#ffffff" : "#D9A441"} />
        <circle cx="32" cy="16" r="3.2" fill={variant === "light" ? "#ffffff" : "#7EB8B4"} />
        <path d="M27 26c0-3.2 2.2-5.2 5-5.2s5 2 5 5.2" fill={variant === "light" ? "#ffffff" : "#7EB8B4"} />
        <path d="M10 32c4-3 8-1.5 14 0s10 2 14-1" stroke={variant === "light" ? "#ffffff" : "#7EB8B4"} strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <path d="M10 36c4-3 8-1.5 14 0s10 2 14-1" stroke={variant === "light" ? "#ffffff" : "#7EB8B4"} strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <path d="M10 40c4-3 8-1.5 14 0s10 2 14-1" stroke={variant === "light" ? "#ffffff" : "#7EB8B4"} strokeWidth="1.6" fill="none" strokeLinecap="round" />
      </svg>
      <span className={`leading-tight ${compact ? "hidden sm:block" : ""}`}>
        <span className={`block font-serif text-lg font-bold tracking-wide ${wordmark}`}>
          ABORIGINAL
        </span>
        <span className={`block font-serif text-xs font-semibold tracking-[0.28em] ${jobline}`}>
          — JOBLINE —
        </span>
      </span>
    </Link>
  );
}
