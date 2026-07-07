import { useState } from 'react'
import { FiMapPin, FiBriefcase, FiArrowRight, FiCheckCircle, FiAward, FiChevronUp } from 'react-icons/fi'
import { TONE } from '../data/content'

/** Job listing card: badge, details, salary, View Details + Apply Now. */
export default function JobCard({ job }) {
  const [showDetails, setShowDetails] = useState(false)
  const [applied, setApplied] = useState(false)
  const Icon = job.icon

  return (
    <article className="card flex flex-col p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lift">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3.5">
          <span
            className={`relative grid h-12 w-12 shrink-0 place-items-center rounded-full ${TONE[job.color].solid}`}
          >
            <span
              className="absolute inset-[-4px] rounded-full border border-dashed border-current opacity-40"
              aria-hidden="true"
            />
            <Icon size={20} aria-hidden="true" />
          </span>
          <div>
            <h3 className="font-sans text-sm font-extrabold leading-snug text-pine-800">
              {job.title}
            </h3>
            <p className="mt-0.5 text-xs text-ink/60">{job.company}</p>
          </div>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-gold-500/50 bg-gold-500/10 px-2 py-0.5 text-[10px] font-extrabold text-gold-600">
          <FiAward size={10} aria-hidden="true" /> Inclusive Employer
        </span>
      </div>

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink/70">
        <span className="inline-flex items-center gap-1.5">
          <FiMapPin className="text-rust-600" aria-hidden="true" /> {job.location}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <FiBriefcase className="text-rust-600" aria-hidden="true" /> {job.type}
        </span>
      </div>

      <p className="mt-3 text-xs leading-relaxed text-ink/70 sm:text-sm">{job.description}</p>
      <p className="mt-3 text-sm font-extrabold text-rust-600">{job.salaryText}</p>

      {showDetails && (
        <dl className="mt-3 grid grid-cols-2 gap-2 rounded-xl bg-cream-100 p-3 text-xs">
          <div>
            <dt className="font-extrabold text-pine-800">Category</dt>
            <dd className="text-ink/70">{job.category}</dd>
          </div>
          <div>
            <dt className="font-extrabold text-pine-800">Workplace</dt>
            <dd className="text-ink/70">{job.workplace}</dd>
          </div>
          <div>
            <dt className="font-extrabold text-pine-800">Experience</dt>
            <dd className="text-ink/70">{job.experience}</dd>
          </div>
          <div>
            <dt className="font-extrabold text-pine-800">Posted</dt>
            <dd className="text-ink/70">{job.postedDays} day{job.postedDays > 1 ? 's' : ''} ago</dd>
          </div>
        </dl>
      )}

      <div className="mt-4 flex items-center justify-between gap-3 border-t border-cream-200 pt-4">
        <button
          type="button"
          onClick={() => setShowDetails((s) => !s)}
          aria-expanded={showDetails}
          className="inline-flex items-center gap-1.5 rounded-lg border border-cream-200 px-4 py-2 text-xs font-bold text-pine-800 transition-colors hover:border-pine-700"
        >
          {showDetails ? (
            <>
              Hide Details <FiChevronUp aria-hidden="true" />
            </>
          ) : (
            'View Details'
          )}
        </button>
        {applied ? (
          <span className="inline-flex items-center gap-1.5 text-sm font-bold text-pine-700">
            <FiCheckCircle aria-hidden="true" /> Applied
          </span>
        ) : (
          <button
            type="button"
            onClick={() => setApplied(true)}
            className="inline-flex items-center gap-1.5 text-sm font-extrabold text-rust-600 hover:text-rust-500"
          >
            Apply Now <FiArrowRight aria-hidden="true" />
          </button>
        )}
      </div>
    </article>
  )
}
