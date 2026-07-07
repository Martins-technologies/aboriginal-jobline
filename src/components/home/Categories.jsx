import { FiArrowRight } from 'react-icons/fi'
import SectionHeading from '../common/SectionHeading'
import { CATEGORIES } from '../data/content'

export default function Categories() {
  return (
    <section className="bg-[#F5F0E8] py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          eyebrow="Popular Job Categories" 
          title="" 
          className="!mb-8" 
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {CATEGORIES.map(({ icon: Icon, title, text }) => (
            <article
              key={title}
              className="bg-white rounded-2xl shadow-lg p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl border border-[#EDE4D8] group"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[oklch(38.6%_0.063_188.416)]/10 text-[oklch(38.6%_0.063_188.416)] transition-colors group-hover:bg-[oklch(38.6%_0.063_188.416)] group-hover:text-white">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <h3 className="font-sans text-sm font-extrabold leading-snug text-[#2C1810]">
                  {title}
                </h3>
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-[#2C1810]/70">{text}</p>
              <a 
                href="#browse-jobs" 
                className="mt-5 inline-flex items-center gap-2 text-[oklch(38.6%_0.063_188.416)] font-semibold hover:text-[oklch(32%_0.06_188.416)] transition group"
              >
                Explore Jobs <FiArrowRight className="transition-transform group-hover:translate-x-1" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}