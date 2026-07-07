import { FiArrowRight, FiSearch, FiUser } from 'react-icons/fi'
import SectionHeading from '../common/SectionHeading'
import PhotoPlaceholder from '../common/PhotoPlaceholder'
import WaveArt from '../common/WaveArt'
import { CAREER_RESOURCES } from '../data/browserJobsContent'
import { TONE } from '../data/content'

/** Resource cards + the dark-teal "Ready to Find Your Next Opportunity?" band. */
export default function CareerResources() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container-x">
        <SectionHeading
          eyebrow="Resources &amp; Support"
          title="Career Resources & Community Support"
          subtitle="Helpful guides, tools, and community support to help you grow your career and achieve your goals."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {CAREER_RESOURCES.map(({ badge, badgeColor, imageTone, title, text }) => (
            <article
              key={title}
              className="card grid grid-cols-[42%_1fr] overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-lift"
            >
              <div className="relative">
                <PhotoPlaceholder
                  tone={imageTone}
                  wave={false}
                  label={`Illustration for: ${title}`}
                  className="h-full min-h-[170px]"
                />
                <span
                  className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-extrabold tracking-wider text-white ${TONE[badgeColor].solid}`}
                >
                  {badge}
                </span>
              </div>
              <div className="flex flex-col p-5">
                <h3 className="font-sans text-sm font-extrabold leading-snug text-pine-800">{title}</h3>
                <p className="mt-2 flex-1 text-xs leading-relaxed text-ink/70">{text}</p>
                <a href="#resources" className="explore-link mt-4">
                  Read More <FiArrowRight aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* CTA band */}
        <div className="relative mt-14 overflow-hidden rounded-3xl bg-pine-800">
          <WaveArt className="absolute inset-y-0 right-0 h-full w-2/5 opacity-90" />
          <div className="relative flex flex-col items-start gap-6 p-8 sm:p-10 lg:flex-row lg:items-center">
            <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full border border-dashed border-cream-200/50 text-cream-200">
              <FiUser size={26} aria-hidden="true" />
            </span>
            <div className="flex-1">
              <h3 className="font-serif text-2xl font-bold text-white sm:text-3xl">
                Ready to Find Your Next Opportunity?
              </h3>
              <p className="mt-1.5 max-w-md text-sm text-cream-200/90">
                Explore meaningful jobs with inclusive employers who value your talent, experience,
                and community.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="#jobs" className="btn-outline-white">
                <FiSearch aria-hidden="true" /> Browse Jobs
              </a>
              <a href="#profile" className="btn bg-white text-pine-800 hover:bg-cream-100">
                <FiUser aria-hidden="true" /> Create Profile
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
