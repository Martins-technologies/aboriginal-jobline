import { useState } from 'react'
import { FiMapPin, FiBriefcase, FiArrowRight, FiCheckCircle, FiAward, FiChevronUp } from 'react-icons/fi'
import { TONE } from '../data/content'

/** Job listing card: badge, details, salary, View Details + Apply Now. */
export default function JobCard({ job }) {
  const [showDetails, setShowDetails] = useState(false)
  const [applied, setApplied] = useState(false)
  const Icon = job.icon

  return (
    <article className="group rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3.5">
          <span
            className={`relative grid h-12 w-12 shrink-0 place-items-center rounded-full ${TONE[job.color].solid}`}
          >
            <span
              className="absolute inset-[-4px] rounded-full border border-dashed border-current opacity-40"
              aria-hidden="true"
            />
            <Icon size={20} className="text-white" aria-hidden="true" />
          </span>
          <div>
            <h3 className="font-sans text-base font-extrabold leading-snug text-[#1a4a4a]">
              {job.title}
            </h3>
            <p className="mt-0.5 text-sm text-[#666]">{job.company}</p>
          </div>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-[#c9a96e]/50 bg-[#c9a96e]/10 px-2.5 py-1 text-[10px] font-extrabold text-[#b8944a]">
          <FiAward size={10} aria-hidden="true" /> Inclusive Employer
        </span>
      </div>

      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-[#666]">
        <span className="inline-flex items-center gap-1.5">
          <FiMapPin className="text-rust-500" aria-hidden="true" /> {job.location}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <FiBriefcase className="text-rust-500" aria-hidden="true" /> {job.type}
        </span>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-[#666] line-clamp-2">{job.description}</p>
      
      <div className="mt-3 flex items-center justify-between">
        <p className="text-lg font-extrabold text-rust-500">{job.salaryText}</p>
        <span className="text-xs text-[#999]">Posted {job.postedDays} day{job.postedDays > 1 ? 's' : ''} ago</span>
      </div>

      {showDetails && (
        <dl className="mt-4 grid grid-cols-2 gap-3 rounded-xl bg-[#f5f7f6] p-4 text-sm">
          <div>
            <dt className="font-extrabold text-[#1a4a4a]">Category</dt>
            <dd className="text-[#666]">{job.category}</dd>
          </div>
          <div>
            <dt className="font-extrabold text-[#1a4a4a]">Workplace</dt>
            <dd className="text-[#666]">{job.workplace}</dd>
          </div>
          <div>
            <dt className="font-extrabold text-[#1a4a4a]">Experience</dt>
            <dd className="text-[#666]">{job.experience}</dd>
          </div>
          <div>
            <dt className="font-extrabold text-[#1a4a4a]">Posted</dt>
            <dd className="text-[#666]">{job.postedDays} day{job.postedDays > 1 ? 's' : ''} ago</dd>
          </div>
        </dl>
      )}

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-gray-200 pt-5">
        <button
          type="button"
          onClick={() => setShowDetails((s) => !s)}
          aria-expanded={showDetails}
          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-4 py-2 text-sm font-bold text-[#1a4a4a] transition-all duration-200 hover:border-rust-500 hover:bg-rust-50 hover:text-rust-600"
        >
          {showDetails ? (
            <>
              Hide Details <FiChevronUp size={16} aria-hidden="true" />
            </>
          ) : (
            'View Details'
          )}
        </button>
        {applied ? (
          <span className="inline-flex items-center gap-2 text-sm font-bold text-green-600">
            <FiCheckCircle size={18} aria-hidden="true" /> Applied Successfully
          </span>
        ) : (
          <button
            type="button"
            onClick={() => setApplied(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-rust-500 px-5 py-2.5 text-sm font-bold text-white bg-[oklch(47%_0.157_37.304)]  transition-all duration-200 hover:bg-rust-600 hover:shadow-md active:scale-95"
          >
            Apply Now <FiArrowRight size={16} aria-hidden="true" />
          </button>
        )}
      </div>
    </article>
  )
}