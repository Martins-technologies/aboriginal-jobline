import { FiSearch, FiUser } from 'react-icons/fi'
import SectionHeading from '../common/SectionHeading'
import WaveArt from '../common/WaveArt'
import ResourceCard from '../sections/ResourceCard'
import { browseCareerResources } from '../../data/homeResources'

/** Resource cards + the dark-teal "Ready to Find Your Next Opportunity?" band. */
export default function CareerResources() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-10">
        <SectionHeading
          eyebrow="---Resources & Support---"
          title="Career Resources & Community Support"
          subtitle="Helpful guides, tools, and community support to help you grow your career and achieve your goals."
        />

        <div className="grid gap-6 md:grid-cols-3 md:items-stretch">
          {browseCareerResources.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              showTag
              variant="split"
            />
          ))}
        </div>

        {/* CTA band */}
        <div className="relative mt-14 overflow-hidden rounded-2xl bg-[#1a4a4a] shadow-xl">
          <WaveArt className="absolute inset-y-0 right-0 h-full w-2/5 opacity-90" />
          <div className="relative flex flex-col items-start gap-6 p-8 sm:p-10 lg:flex-row lg:items-center">
            <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full border-2 border-dashed border-white/30 text-white transition-all duration-300 group-hover:border-white/50">
              <FiUser size={26} aria-hidden="true" />
            </span>
            <div className="flex-1">
              <h3 className="font-serif text-2xl font-bold text-white sm:text-3xl">
                Ready to Find Your Next Opportunity?
              </h3>
              <p className="mt-1.5 max-w-md text-sm text-white/80">
                Explore meaningful jobs with inclusive employers who value your talent, experience,
                and community.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a 
                href="#jobs" 
                className="inline-flex items-center gap-2 rounded-xl border-2 border-white px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-white hover:text-[#1a4a4a] hover:shadow-lg"
              >
                <FiSearch size={18} aria-hidden="true" /> Browse Jobs
              </a>
              <a 
                href="#profile" 
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#1a4a4a] transition-all duration-300 hover:bg-[#f5f7f6] hover:shadow-lg"
              >
                <FiUser size={18} aria-hidden="true" /> Create Profile
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}