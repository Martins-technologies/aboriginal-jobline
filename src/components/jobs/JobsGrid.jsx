import { FiGrid, FiList, FiSearch } from 'react-icons/fi'
import JobCard from './JobCard'

const SORTS = [
  { value: 'relevant', label: 'Most Relevant' },
  { value: 'recent', label: 'Most Recent' },
  { value: 'salary-high', label: 'Salary: High to Low' },
  { value: 'salary-low', label: 'Salary: Low to High' },
]

/** Results header (count, sort, view toggle) + job cards grid/list. */
export default function JobsGrid({ jobs, sort, onSortChange, view, onViewChange, onReset }) {
  return (
    <div className="min-w-0 flex-1">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-ink/80" aria-live="polite">
          Showing <span className="font-extrabold text-pine-800">{jobs.length}</span>{' '}
          {jobs.length === 1 ? 'job' : 'jobs'}
        </p>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-sm text-ink/70">
            Sort by:
            <select
              value={sort}
              onChange={(e) => onSortChange(e.target.value)}
              className="rounded-lg border border-cream-200 bg-white px-3 py-2 text-sm text-ink/80 focus:border-rust-500 focus:outline-none"
            >
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
          <div className="flex overflow-hidden rounded-lg border border-cream-200" role="group" aria-label="View layout">
            <button
              type="button"
              onClick={() => onViewChange('grid')}
              aria-pressed={view === 'grid'}
              aria-label="Grid view"
              className={`grid h-10 w-10 place-items-center ${
                view === 'grid' ? 'bg-pine-700 text-white' : 'bg-white text-pine-700 hover:bg-cream-100'
              }`}
            >
              <FiGrid size={16} />
            </button>
            <button
              type="button"
              onClick={() => onViewChange('list')}
              aria-pressed={view === 'list'}
              aria-label="List view"
              className={`grid h-10 w-10 place-items-center ${
                view === 'list' ? 'bg-pine-700 text-white' : 'bg-white text-pine-700 hover:bg-cream-100'
              }`}
            >
              <FiList size={16} />
            </button>
          </div>
        </div>
      </div>

      {jobs.length > 0 ? (
        <div className={view === 'grid' ? 'grid gap-5 md:grid-cols-2 2xl:grid-cols-3' : 'grid gap-5'}>
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="card flex flex-col items-center gap-4 px-6 py-16 text-center">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-cream-100 text-pine-700">
            <FiSearch size={26} aria-hidden="true" />
          </span>
          <div>
            <h3 className="font-serif text-xl font-bold text-pine-800">No jobs match your filters</h3>
            <p className="mt-1 text-sm text-ink/70">
              Try a different keyword or reset the filters to see all opportunities.
            </p>
          </div>
          <button type="button" onClick={onReset} className="btn-rust">
            Reset Filters
          </button>
        </div>
      )}
    </div>
  )
}
