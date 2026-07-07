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
    <div>
      <label className="mb-1.5 flex items-center gap-2 text-sm font-extrabold text-pine-800">
        <Icon size={15} className="text-pine-700" aria-hidden="true" /> {label}
      </label>
      <select
        value={value}
        onChange={onChange}
        className="w-full rounded-lg border border-cream-200 bg-white px-3 py-2.5 text-sm text-ink/80 focus:border-rust-500 focus:outline-none"
      >
        <option value="">{placeholder}</option>
        {options.map((opt) =>
          typeof opt === 'string' ? (
            <option key={opt}>{opt}</option>
          ) : (
            opt.value !== '' && (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            )
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
    <aside className="card sticky top-24 h-fit w-full shrink-0 p-6 lg:w-72" aria-label="Filter jobs">
      <h2 className="font-serif text-xl font-bold text-pine-800">Filter Jobs</h2>

      <div className="mt-5 space-y-5">
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

      <div className="mt-6 flex items-center gap-3 border-t border-cream-200 pt-5">
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1.5 text-sm font-bold text-ink/70 hover:text-rust-600"
        >
          <FiRotateCcw size={14} aria-hidden="true" /> Reset Filters
        </button>
        <span className="btn-rust ml-auto !px-4 !py-2 text-xs" aria-hidden="true">
          <FiSliders size={13} /> Filters Live
        </span>
      </div>
    </aside>
  )
}
