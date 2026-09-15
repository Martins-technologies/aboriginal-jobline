import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import FilterSidebar from "./FilterSidebar";

/**
 * Filter sidebar with a mobile-only toggle. Desktop (lg+) always shows filters unchanged.
 */
export default function FilterSidebarPanel({ filters, onApply, onReset }) {
  const [open, setOpen] = useState(false);

  const handleApply = (draft) => {
    onApply(draft);
    setOpen(false);
  };

  const handleReset = () => {
    onReset();
    setOpen(false);
  };

  return (
    <div className="min-w-0">
      <button
        type="button"
        className="mb-4 flex w-full items-center justify-center gap-2 rounded-xl border border-black/10 bg-white px-4 py-3 text-sm font-semibold text-primary shadow-sm transition-colors hover:bg-background/80 lg:hidden"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <SlidersHorizontal className="h-4 w-4 shrink-0" aria-hidden="true" />
        {open ? "Hide Filters" : "Show Filters"}
      </button>
      <div className={open ? "block" : "hidden lg:block"}>
        <FilterSidebar filters={filters} onApply={handleApply} onReset={handleReset} />
      </div>
    </div>
  );
}
