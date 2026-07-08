import { FiArrowRight, FiMapPin, FiMap, FiGlobe } from 'react-icons/fi'
import SectionHeading from '../common/SectionHeading'
import { BROWSE_CATEGORIES, REGIONS } from '../data/browserJobsContent'

export default function BrowseByRegion({ onPickCategory }) {
  return (
    <section className="bg-[#f5f7f6] py-16 sm:py-20">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-10">
        <div className="mb-12">
          <span className="inline-block rounded-full bg-rust-500/10 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-rust-600">
            Explore Opportunities
          </span>
          <h2 className="mt-4 font-serif text-3xl font-bold text-[#1a4a4a] sm:text-4xl">
            Browse by Category and Region
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-[#666] sm:text-base">
            Find meaningful work in your field and community across Canada.
          </p>
        </div>

        {/* Category cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {BROWSE_CATEGORIES.map(({ icon: Icon, title, text }) => (
            <article 
              key={title} 
              className="group rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-start gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl text-white  bg-[oklch(47%_0.157_37.304)] text-rust-500 transition-colors group-hover:bg-rust-500 group-hover:text-white">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <div className="flex-1">
                  <h3 className="font-sans text-sm font-extrabold text-[#1a4a4a]">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#666]">{text}</p>
                  <button
                    type="button"
                    onClick={() => onPickCategory?.(title)}
                    className="mt-3 inline-flex items-center   text-[oklch(47%_0.157_37.304)] gap-1.5 text-sm font-bold text-rust-500 transition-colors hover:text-rust-600"
                  >
                    Explore Jobs <FiArrowRight size={14} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Regions */}
        <div className="mt-16">
          <h3 className="flex items-center gap-2 font-sans text-lg font-extrabold text-[#1a4a4a] hover: text-[oklch(47%_0.157_37.304)]">
            <FiMapPin className="text-[#1a4a4a]" aria-hidden="true" /> Browse by Region
          </h3>
          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
            {REGIONS.map((region) => (
              <a
                key={region}
                href="#jobs"
                className="group flex flex-col items-center rounded-2xl  text-[oklch(47%_0.157_37.304)] p-5 text-center shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl "
              >
                <span className="grid h-14 w-14 place-items-center rounded-full border-2 border-dashed border-[#1a4a4a]/20  text-[oklch(47%_0.157_37.304)] transition-all duration-300 group-hover:border-rust-500 group-hover:bg-rust-500 group-hover:text-white group-hover:shadow-md">
                  {region === 'Remote Jobs' ? <FiGlobe size={22} /> : <FiMap size={22} />}
                </span>
                <span className="mt-3 text-sm font-extrabold leading-snug text-[#1a4a4a]">
                  {region}
                </span>
                <span className="mt-2 inline-flex items-center gap-1.5  text-[oklch(47%_0.157_37.304)] text-xs font-bold transition-colors group-hover:text-rust-600">
                  Explore <FiArrowRight size={12} aria-hidden="true" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}