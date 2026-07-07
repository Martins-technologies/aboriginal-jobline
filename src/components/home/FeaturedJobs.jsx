import { useState } from 'react'
import { FiSearch, FiMapPin, FiBriefcase, FiChevronRight, FiCheckCircle } from 'react-icons/fi'
import { JOBS } from '../data/content'

function JobCard({ job, onApply, applied }) {
  const Icon = job.icon
  return (
    <article className="bg-white rounded-2xl shadow-lg p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl border border-[#EDE4D8]">
      <div className="flex items-start gap-4">
        <span className="relative grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[oklch(38.6%_0.063_188.416)]/10 text-[oklch(38.6%_0.063_188.416)]">
          <span
            className="absolute inset-[-4px] rounded-full border border-dashed border-current opacity-40"
            aria-hidden="true"
          />
          <Icon size={22} aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <h3 className="font-sans text-sm font-extrabold leading-snug text-[#2C1810]">
            {job.title}
          </h3>
          <p className="mt-2 flex items-center gap-1.5 text-xs text-[#2C1810]/70">
            <FiMapPin className="shrink-0 text-[oklch(38.6%_0.063_188.416)]" aria-hidden="true" /> {job.location}
          </p>
          <p className="mt-1 flex items-center gap-1.5 text-xs text-[#2C1810]/70">
            <FiBriefcase className="shrink-0 text-[oklch(38.6%_0.063_188.416)]" aria-hidden="true" /> {job.type}
          </p>
        </div>
      </div>
      <div className="mt-4 flex justify-end border-t border-[#EDE4D8] pt-3">
        {applied ? (
          <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[#2C1810]">
            <FiCheckCircle className="text-[oklch(38.6%_0.063_188.416)]" aria-hidden="true" /> Applied
          </span>
        ) : (
          <button
            type="button"
            onClick={() => onApply(job.title)}
            className="inline-flex items-center gap-2 bg-[oklch(38.6%_0.063_188.416)] text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-[oklch(32%_0.06_188.416)] transition-all hover:scale-105"
          >
            Apply Now
          </button>
        )}
      </div>
    </article>
  )
}

export default function FeaturedJobs() {
  const [appliedJobs, setAppliedJobs] = useState([])
  const apply = (title) => setAppliedJobs((prev) => [...prev, title])

  return (
    <section id="browse-jobs" className="bg-[#EDE4D8] py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-10 lg:grid-cols-[1fr_2.2fr] lg:gap-14">
        <div>
          <p className="inline-block text-[oklch(38.6%_0.063_188.416)] font-semibold text-sm uppercase tracking-wider mb-2">
            Featured Opportunities
          </p>
          <h2 className="mt-4 font-serif text-3xl font-bold leading-tight text-[oklch(38.6%_0.063_188.416)] sm:text-4xl">
            Featured Jobs Across Canada
          </h2>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#2C1810]/70 sm:text-base">
            Explore handpicked job opportunities from employers who value Indigenous talent and
            inclusive workplaces.
          </p>
          <a 
            href="#browse-jobs" 
            className="inline-flex items-center gap-2 border-2 border-[oklch(38.6%_0.063_188.416)] text-[oklch(38.6%_0.063_188.416)] px-6 py-2.5 rounded-lg font-semibold mt-8 hover:bg-[oklch(38.6%_0.063_188.416)] hover:text-white transition-all hover:scale-105"
          >
            <FiSearch aria-hidden="true" /> Browse All Jobs
          </a>
        </div>

        <div>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {JOBS.map((job) => (
              <JobCard
                key={job.title}
                job={job}
                onApply={apply}
                applied={appliedJobs.includes(job.title)}
              />
            ))}
          </div>
          <div className="mt-8 text-center">
            <a
              href="#browse-jobs"
              className="inline-flex items-center gap-1 text-sm font-extrabold text-[#2C1810] hover:text-[oklch(38.6%_0.063_188.416)] transition"
            >
              View More Jobs <FiChevronRight aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}