import { FiSearch, FiUsers } from 'react-icons/fi'
import PhotoPlaceholder from '../common/PhotoPlaceholder'

export default function JobsHero() {
  return (
    <section className="relative bg-cream-100">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:radial-gradient(#e9dcc4_1px,transparent_1px)] [background-size:26px_26px]"
        aria-hidden="true"
      />
      <div className="container-x relative grid items-center gap-10 pb-10 pt-14 lg:grid-cols-2 lg:gap-6 lg:pt-16">
        <div>
          <p className="eyebrow">Explore Opportunities</p>
          <h1 className="mt-4 font-serif text-4xl font-bold leading-[1.12] text-pine-800 sm:text-5xl">
            Browse Aboriginal and Indigenous Jobs{' '}
            <span className="text-rust-600">Across Canada</span>
          </h1>
          <p className="mt-5 max-w-lg text-sm leading-relaxed text-ink/75 sm:text-base">
            Discover meaningful career opportunities with inclusive employers who value Aboriginal
            and Indigenous talent. Find jobs in communities across Canada and build a stronger
            future—together.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#jobs" className="btn-pine px-7">
              <FiSearch aria-hidden="true" /> Search Jobs
            </a>
            <a href="#employers" className="btn-outline-pine px-7">
              <FiUsers aria-hidden="true" /> For Employers
            </a>
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
