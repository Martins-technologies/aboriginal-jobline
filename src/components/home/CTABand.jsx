import { FiSearch, FiBriefcase, FiUsers } from 'react-icons/fi'

export default function CTABand() {
  return (
    <section className="relative overflow-hidden bg-[oklch(38.6%_0.063_188.416)]">
      {/* Wave pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path 
            fill="#F5F0E8"
            fillOpacity="0.3"
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,192C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>
      
      {/* Second wave layer */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path 
            fill="#F5F0E8"
            d="M0,192L48,176C96,160,192,128,288,122.7C384,117,480,139,576,160C672,181,768,203,864,202.7C960,203,1056,181,1152,160C1248,139,1344,117,1392,106.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative flex flex-col items-start gap-6 py-16 lg:flex-row lg:items-center z-10">
        <span className="relative grid h-16 w-16 shrink-0 place-items-center rounded-full border border-dashed border-[#F5F0E8]/50 text-[#F5F0E8] bg-white/5">
          <FiUsers size={26} aria-hidden="true" />
        </span>
        <div className="flex-1">
          <h2 className="font-serif text-2xl font-bold text-white sm:text-3xl">
            Ready to Take the Next Step?
          </h2>
          <p className="mt-1.5 text-sm text-[#F5F0E8]/90 sm:text-base">
            Explore job opportunities or connect with inclusive employers who value your talent.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a 
            href="#browse-jobs" 
            className="inline-flex items-center gap-2 bg-white text-[oklch(38.6%_0.063_188.416)] px-6 py-2.5 rounded-lg font-semibold hover:bg-[#F5F0E8] transition-all hover:scale-105 shadow-lg"
          >
            <FiSearch aria-hidden="true" /> Browse Jobs
          </a>
          <a 
            href="#post-a-job" 
            className="inline-flex items-center gap-2 border-2 border-white text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-white hover:text-[oklch(38.6%_0.063_188.416)] transition-all hover:scale-105"
          >
            <FiBriefcase aria-hidden="true" /> Post a Job
          </a>
        </div>
      </div>
    </section>
  )
}