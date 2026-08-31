import { useMemo, useState } from "react";
import DashboardTopBanner from "../../components/dashboard/DashboardTopBanner";
import { useDashboard } from "../../context/DashboardDataContext";
import ApplicationListItem from "../../components/dashboard/ApplicationListItem";
import Button from "../../components/common/Button";

const STATUS_OPTIONS = ["All", "Applied", "In Review", "Interview", "Offer", "Not Selected"];

/**
 * MyApplicationsPage — list of the user's applications.
 * Filter by status + sort by date. Empty state when no applications.
 */
export default function MyApplicationsPage() {
  const { applications, withdrawApplication } = useDashboard();
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("newest");

  const filtered = useMemo(() => {
    let list = applications;
    if (statusFilter !== "All") {
      list = list.filter((a) => a.status === statusFilter);
    }
    return [...list].sort((a, b) => {
      if (sortOrder === "newest") return b.dateApplied.localeCompare(a.dateApplied);
      return a.dateApplied.localeCompare(b.dateApplied);
    });
  }, [applications, statusFilter, sortOrder]);

  return (
    <div>
      <DashboardTopBanner
        eyebrow="Newcomer Jobline Dashboard"
        title="My Applications"
        subtitle="Track the status of every job you've applied to."
      />

      <div className="px-6 py-6 lg:px-8">
        {/* Filters / sort */}
        {applications.length > 0 && (
          <div className="mb-5 flex flex-wrap items-center gap-3">
            {/* Status filter pills */}
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by status">
              {STATUS_OPTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStatusFilter(s)}
                  aria-pressed={statusFilter === s}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                    statusFilter === s
                      ? "bg-primary text-white"
                      : "bg-black/8 text-body hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="ml-auto flex items-center gap-2">
              <label htmlFor="app-sort" className="text-xs font-medium text-muted">
                Sort:
              </label>
              <select
                id="app-sort"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="rounded-xl border border-black/10 bg-white py-1.5 pl-3 pr-8 text-xs font-medium text-body focus:border-primary focus:outline-none"
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
              </select>
            </div>
          </div>
        )}

        {/* List */}
        {filtered.length === 0 ? (
          <div className="surface-card p-10 text-center">
            {applications.length === 0 ? (
              <>
                <p className="font-serif text-2xl text-primary">No applications yet</p>
                <p className="mt-2 text-sm text-muted">
                  Start exploring jobs and apply to positions that interest you.
                </p>
                <div className="mt-5">
                  <Button to="/dashboard/find-jobs" variant="secondary">
                    Browse Jobs
                  </Button>
                </div>
              </>
            ) : (
              <>
                <p className="font-serif text-2xl text-primary">No results</p>
                <p className="mt-2 text-sm text-muted">
                  No applications match the selected status filter.
                </p>
                <button
                  type="button"
                  onClick={() => setStatusFilter("All")}
                  className="mt-4 text-sm font-semibold text-accent hover:underline"
                >
                  Clear filter
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((app) => (
              <ApplicationListItem
                key={app.id}
                application={app}
                onWithdraw={withdrawApplication}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
