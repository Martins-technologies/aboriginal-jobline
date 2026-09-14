import { FiSearch, FiUsers } from 'react-icons/fi'
import PhotoPlaceholder from '../common/PhotoPlaceholder'

export default function JobsHero() {
  return (
    <section className="relative bg-cream-100 mx-6">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:radial-gradient(#e9dcc4_1px,transparent_1px)] [background-size:26px_26px]"
        aria-hidden="true"
      />
      <div className="container-x relative grid items-center gap-10 pb-10 pt-14 lg:grid-cols-2 lg:gap-6 lg:pt-16">
        <div>
          <p className="eyebrow text-[oklch(47%_0.157_37.304)]">----Explore Opportunities----</p>
          <h1 className="mt-4  font-serif text-4xl font-bold leading-[1.12]  text-[oklch(38.6%_0.063_188.416)] sm:text-5xl">
            Browse Aboriginal and Indigenous Jobs{' '}
            <span className="text-rust-600">Across Canada</span>
          </h1>
          <p className="mt-5 max-w-lg text-sm leading-relaxed text-ink/75 sm:text-base">
            Discover meaningful career opportunities with inclusive employers who value Aboriginal
            and Indigenous talent. Find jobs in communities across Canada and build a stronger
            future—together.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <button href="#jobs" className="flex items-center justify-center gap-2 rounded text-white bg-[oklch(38.6%_0.063_188.416)] btn-pine px-7 py-3">
              <FiSearch aria-hidden="true" /> Search Jobs
            </button>
            <button href="#employers" className="flex items-center justify-center gap-2 rounded border-2 border-[oklch(38.6%_0.063_188.416)] btn-outline-pine px-7 py-3 text-[oklch(38.6%_0.063_188.416)]">
              <FiUsers aria-hidden="true" /> For Employers
            </button>
          </div>
        </div>

        <PhotoPlaceholder
          tone="warm"
          label="Indigenous professionals in a modern office reviewing opportunities together"
          className="h-64 rounded-3xl shadow-lift sm:h-80 lg:h-[400px]"
        />
      </div>
    </section>
  )
}
