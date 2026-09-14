import { Star } from "lucide-react";

export default function Badge({ children, icon: Icon = Star, className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border border-accent/30 bg-accent-50 px-2.5 py-1 text-[11px] font-semibold text-accent ${className}`}
    >
      {Icon ? <Icon className="h-3 w-3" aria-hidden="true" /> : null}
      {children}
    </span>
  );
}
