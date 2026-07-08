import { FiGrid, FiMapPin, FiBriefcase, FiDollarSign, FiUser, FiHome, FiRotateCcw, FiSliders } from 'react-icons/fi'
import {
  JOB_CATEGORIES,
  JOB_LOCATIONS,
  JOB_TYPES,
  EXPERIENCE_LEVELS,
  WORKPLACE_TYPES,
} from '../data/browserJobsContent'

const SALARY_RANGES = [
  { label: 'Any Salary', value: '' },
  { label: 'Under $45,000', value: '0-45000' },
  { label: '$45,000 – $55,000', value: '45000-55000' },
  { label: '$55,000 – $70,000', value: '55000-70000' },
  { label: '$70,000+', value: '70000-999999' },
]

function FilterField({ icon: Icon, label, value, onChange, options, placeholder }) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-2 text-sm font-extrabold text-[#1a4a4a]">
        <Icon size={16} className="text-[#1a4a4a]" aria-hidden="true" /> {label}
      </label>
      <select
        value={value}
        onChange={onChange}
        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-[#333] focus:border-rust-500 focus:outline-none focus:ring-2 focus:ring-rust-500/20 transition-all duration-200"
      >
        <option value="">{placeholder}</option>
        {options.map((opt) =>
          typeof opt === 'string' ? (
            <option key={opt} value={opt}>{opt}</option>
          ) : (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          )
        )}
      </select>
    </div>
  )
}

/** "Filter Jobs" sidebar from the mockup — fully controlled from the page. */
export default function FilterSidebar({ filters, onChange, onReset }) {
  const set = (key) => (e) => onChange({ ...filters, [key]: e.target.value })

  return (
    <aside 
      className="sticky top-24 h-fit w-full shrink-0 rounded-2xl bg-white p-6 shadow-lg lg:w-72 mx-4" 
      aria-label="Filter jobs"
    >
      <h2 className="font-serif text-2xl font-bold text-[#1a4a4a]">Filter Jobs</h2>

      <div className="mt-6 space-y-5">
        <FilterField
          icon={FiGrid}
          label="Category"
          value={filters.category}
          onChange={set('category')}
          options={JOB_CATEGORIES}
          placeholder="All Categories"
        />
        <FilterField
          icon={FiMapPin}
          label="Location"
          value={filters.location}
          onChange={set('location')}
          options={JOB_LOCATIONS}
          placeholder="All Locations"
        />
        <FilterField
          icon={FiBriefcase}
          label="Job Type"
          value={filters.type}
          onChange={set('type')}
          options={JOB_TYPES}
          placeholder="All Job Types"
        />
        <FilterField
          icon={FiDollarSign}
          label="Salary Range"
          value={filters.salary}
          onChange={set('salary')}
          options={SALARY_RANGES}
          placeholder="Any Salary"
        />
        <FilterField
          icon={FiUser}
          label="Experience Level"
          value={filters.experience}
          onChange={set('experience')}
          options={EXPERIENCE_LEVELS}
          placeholder="Any Experience"
        />
        <FilterField
          icon={FiHome}
          label="Workplace Type"
          value={filters.workplace}
          onChange={set('workplace')}
          options={WORKPLACE_TYPES}
          placeholder="All Workplace Types"
        />
      </div>

      <div className="mt-8 flex items-center gap-3 border-t border-gray-200 pt-6">
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1.5 text-sm font-bold text-[#666] transition-colors hover:text-rust-600"
        >
          <FiRotateCcw size={14} aria-hidden="true" /> Reset Filters
        </button>
        <span className="ml-auto inline-flex items-center gap-1.5 rounded-lg bg-rust-500 px-4 py-2 text-xs font-bold text-white">
          <FiSliders size={13} aria-hidden="true" /> Filters Live
        </span>
      </div>
    </aside>
  )
}