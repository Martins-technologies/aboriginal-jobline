import { FiSearch, FiMapPin, FiGrid, FiBriefcase } from 'react-icons/fi'
import { JOB_CATEGORIES, JOB_TYPES } from '../data/browserJobsContent'

/**
 * 4-field search bar from the mockup: keyword, location, category, job type.
 * Fully controlled — state lives in the BrowseJobs page.
 */
export default function JobSearchBar({ filters, onChange, onSearch }) {
  const set = (key) => (e) => onChange({ ...filters, [key]: e.target.value })

  return (
    <div className="container-x relative z-10 -mb-10">
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault()
          onSearch?.()
        }}
        className="card rounded-2xl p-4 sm:p-5"
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-[1.3fr_1.2fr_1fr_1fr_auto] xl:items-center">
          {/* Keyword */}
          <div className="flex items-center gap-3 xl:border-r xl:border-cream-200 xl:pr-5">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-cream-100 text-pine-700">
              <FiSearch size={18} aria-hidden="true" />
            </span>
            <label className="w-full">
              <span className="block text-sm font-bold text-pine-800">Job title or keyword</span>
              <input
                type="search"
                value={filters.keyword}
                onChange={set('keyword')}
                placeholder="e.g. Teacher, Administrator, Nurse"
                className="mt-0.5 w-full bg-transparent text-sm text-ink placeholder:text-ink/40 focus:outline-none"
              />
            </label>
          </div>

          {/* Location */}
          <div className="flex items-center gap-3 xl:border-r xl:border-cream-200 xl:pr-5">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-cream-100 text-pine-700">
              <FiMapPin size={18} aria-hidden="true" />
            </span>
            <label className="w-full">
              <span className="block text-sm font-bold text-pine-800">Location</span>
              <input
                type="text"
                value={filters.location}
                onChange={set('location')}
                placeholder="e.g. Toronto, ON or Remote"
                className="mt-0.5 w-full bg-transparent text-sm text-ink placeholder:text-ink/40 focus:outline-none"
              />
            </label>
          </div>

          {/* Category */}
          <div className="flex items-center gap-3 xl:border-r xl:border-cream-200 xl:pr-5">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-cream-100 text-pine-700">
              <FiGrid size={18} aria-hidden="true" />
            </span>
            <label className="w-full">
              <span className="block text-sm font-bold text-pine-800">Category</span>
              <select
                value={filters.category}
                onChange={set('category')}
                className="mt-0.5 w-full bg-transparent text-sm text-ink/70 focus:outline-none"
              >
                <option value="">All Categories</option>
                {JOB_CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>
          </div>

          {/* Job type */}
          <div className="flex items-center gap-3 xl:pr-5">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-cream-100 text-pine-700">
              <FiBriefcase size={18} aria-hidden="true" />
            </span>
            <label className="w-full">
              <span className="block text-sm font-bold text-pine-800">Job type</span>
              <select
                value={filters.type}
                onChange={set('type')}
                className="mt-0.5 w-full bg-transparent text-sm text-ink/70 focus:outline-none"
              >
                <option value="">All Job Types</option>
                {JOB_TYPES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </label>
          </div>

          <button type="submit" className="btn-rust w-full px-8 md:col-span-2 xl:col-span-1 xl:w-auto">
            <FiSearch aria-hidden="true" /> Search Jobs
          </button>
        </div>
      </form>
    </div>
  )
}
