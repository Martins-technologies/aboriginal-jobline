import { ChevronDown, LayoutGrid, List } from "lucide-react";

export default function JobResultsToolbar({ count, sort, view, onSortChange, onViewChange }) {
  return (
    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted">
        Showing <span className="font-semibold text-primary">{count}</span> {count === 1 ? "job" : "jobs"}
      </p>
      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2 text-sm text-muted">
          Sort by:
          <span className="relative">
            <select
              value={sort}
              onChange={(event) => onSortChange(event.target.value)}
              className="appearance-none rounded-lg border border-black/10 bg-white py-1.5 pl-3 pr-8 text-sm text-body focus:outline-none"
            >
              <option value="relevant">Most Relevant</option>
              <option value="newest">Newest</option>
              <option value="salary-high">Salary High–Low</option>
              <option value="salary-low">Salary Low–High</option>
              <option value="title">Title A–Z</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          </span>
        </label>
        <div className="flex overflow-hidden rounded-lg border border-black/10 bg-white" role="group" aria-label="Results layout">
          <button
            type="button"
            onClick={() => onViewChange("grid")}
            aria-pressed={view === "grid"}
            aria-label="Grid view"
            className={`p-2 ${view === "grid" ? "bg-primary text-white" : "text-muted hover:text-primary"}`}
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => onViewChange("list")}
            aria-pressed={view === "list"}
            aria-label="List view"
            className={`p-2 ${view === "list" ? "bg-primary text-white" : "text-muted hover:text-primary"}`}
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
