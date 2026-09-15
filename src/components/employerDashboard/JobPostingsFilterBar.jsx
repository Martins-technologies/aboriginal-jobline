import { Search } from "lucide-react";

const STATUS_TABS = ["All", "Active", "Draft", "Closed"];

/**
 * JobPostingsFilterBar — status filter tabs + text search for the employer's postings.
 * Controlled component: parent manages activeStatus and search values.
 */
export default function JobPostingsFilterBar({
  activeStatus,
  onStatusChange,
  search,
  onSearchChange,
}) {
  return (
    <div className="flex w-full min-w-0 flex-wrap items-center gap-3">
      {/* Status tabs */}
      <div
        className="flex max-w-full gap-1 overflow-x-auto rounded-xl border border-black/10 bg-white p-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="tablist"
        aria-label="Filter by posting status"
      >
        {STATUS_TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={activeStatus === tab}
            onClick={() => onStatusChange(tab)}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
              activeStatus === tab
                ? "bg-primary text-white"
                : "text-muted hover:text-primary"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search input */}
      <div className="relative min-w-0 w-full flex-1 sm:min-w-[200px]">
        <Search
          className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
          aria-hidden="true"
        />
        <input
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search job title…"
          className="w-full rounded-xl border border-black/10 bg-white py-2.5 pl-10 pr-4 text-sm text-body placeholder:text-muted/70 focus:border-primary focus:outline-none"
          aria-label="Search job postings by title"
        />
      </div>
    </div>
  );
}
