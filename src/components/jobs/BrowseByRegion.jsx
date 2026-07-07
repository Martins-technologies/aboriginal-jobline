import { FiArrowRight, FiMapPin, FiMap, FiGlobe } from 'react-icons/fi'
import SectionHeading from '../common/SectionHeading'
import { BROWSE_CATEGORIES, REGIONS } from '../data/browserJobsContent'

export default function BrowseByRegion({ onPickCategory }) {
  return (
    <section className="bg-cream-100 py-16 sm:py-20">
      <div className="container-x">
        <div className="mb-10">
          <p className="eyebrow">Explore Opportunities</p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-pine-800 sm:text-4xl">
            Browse by Category and Region
          </h2>
          <p className="mt-2 text-sm text-ink/70 sm:text-base">
            Find meaningful work in your field and community across Canada.
          </p>
        </div>

        {/* Category cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {BROWSE_CATEGORIES.map(({ icon: Icon, title, text }) => (
            <article key={title} className="card flex items-start gap-4 p-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-cream-100 text-rust-600">
                <Icon size={20} aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-sans text-sm font-extrabold text-pine-800">{title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-ink/70">{text}</p>
                <button
                  type="button"
                  onClick={() => onPickCategory?.(title)}
                  className="explore-link mt-3 text-xs"
                >
                  Explore Jobs <FiArrowRight aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Regions */}
        <h3 className="mt-12 flex items-center gap-2 font-sans text-base font-extrabold text-pine-800">
          <FiMapPin className="text-pine-700" aria-hidden="true" /> Browse by Region
        </h3>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
          {REGIONS.map((region) => (
            <a
              key={region}
              href="#jobs"
              className="card group flex flex-col items-center p-5 text-center transition-all hover:-translate-y-1 hover:shadow-lift"
            >
              <span className="grid h-12 w-12 place-items-center rounded-full border border-dashed border-pine-700/40 text-pine-700 group-hover:border-rust-500 group-hover:text-rust-600">
                {region === 'Remote Jobs' ? <FiGlobe size={20} /> : <FiMap size={20} />}
              </span>
              <span className="mt-3 text-xs font-extrabold leading-snug text-pine-800">{region}</span>
              <span className="explore-link mt-2 text-[11px]">
                Explore Jobs <FiArrowRight aria-hidden="true" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
