import { FiSearch, FiMapPin, FiGrid, FiBriefcase } from 'react-icons/fi'
import { JOB_CATEGORIES, JOB_TYPES } from '../data/browserJobsContent'

/**
 * 4-field search bar from the mockup: keyword, location, category, job type.
 * Fully controlled — state lives in the BrowseJobs page.
 */
export default function JobSearchBar({ filters, onChange, onSearch }) {
  const set = (key) => (e) => onChange({ ...filters, [key]: e.target.value })

  return (
    <div className="relative z-10 -mb-10 px-4 sm:px-6 lg:px-10">
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault()
          onSearch?.()
        }}
        className="rounded-2xl bg-white p-4 shadow-lg sm:p-6"
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-[1.3fr_1.2fr_1fr_1fr_auto] xl:items-center">
          {/* Keyword */}
          <div className="flex items-center gap-3 xl:border-r xl:border-gray-200 xl:pr-5">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#f5f7f6] text-[#1a4a4a]">
              <FiSearch size={18} aria-hidden="true" />
            </span>
            <label className="w-full">
              <span className="block text-sm font-bold text-[#1a4a4a]">Job title or keyword</span>
              <input
                type="search"
                value={filters.keyword}
                onChange={set('keyword')}
                placeholder="e.g. Teacher, Administrator, Nurse"
                className="mt-0.5 w-full bg-transparent text-sm text-[#333] placeholder:text-[#999] focus:outline-none"
              />
            </label>
          </div>

          {/* Location */}
          <div className="flex items-center gap-3 xl:border-r xl:border-gray-200 xl:pr-5">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#f5f7f6] text-[#1a4a4a]">
              <FiMapPin size={18} aria-hidden="true" />
            </span>
            <label className="w-full">
              <span className="block text-sm font-bold text-[#1a4a4a]">Location</span>
              <input
                type="text"
                value={filters.location}
                onChange={set('location')}
                placeholder="e.g. Toronto, ON or Remote"
                className="mt-0.5 w-full bg-transparent text-sm text-[#333] placeholder:text-[#999] focus:outline-none"
              />
            </label>
          </div>

          {/* Category */}
          <div className="flex items-center gap-3 xl:border-r xl:border-gray-200 xl:pr-5">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#f5f7f6] text-[#1a4a4a]">
              <FiGrid size={18} aria-hidden="true" />
            </span>
            <label className="w-full">
              <span className="block text-sm font-bold text-[#1a4a4a]">Category</span>
              <select
                value={filters.category}
                onChange={set('category')}
                className="mt-0.5 w-full bg-transparent text-sm text-[#333] focus:outline-none"
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
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#f5f7f6] text-[#1a4a4a]">
              <FiBriefcase size={18} aria-hidden="true" />
            </span>
            <label className="w-full">
              <span className="block text-sm font-bold text-[#1a4a4a]">Job type</span>
              <select
                value={filters.type}
                onChange={set('type')}
                className="mt-0.5 w-full bg-transparent text-sm text-[#333] focus:outline-none"
              >
                <option value="">All Job Types</option>
                {JOB_TYPES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </label>
          </div>

          {/* Search Button */}
          <button 
            type="submit" 
            className="flex items-center justify-center gap-2 rounded-xl bg-rust-500 px-6 py-3.5 text-[15px] font-bold text-white bg-[oklch(47%_0.157_37.304)] transition-colors hover:bg-rust-600 md:col-span-2 xl:col-span-1 xl:w-auto"
          >
            <FiSearch size={19} aria-hidden="true" /> Search Jobs
          </button>
        </div>
      </form>
    </div>
  )
}