import { FiSearch, FiBriefcase } from 'react-icons/fi'

export default function EmployerCTA() {
  return (
    <section className="bg-[oklch(38.6%_0.063_188.416)] py-16 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Ready to Take the Next Step?
        </h2>
        <p className="text-[#F5F0E8]/90 text-base max-w-2xl mx-auto mb-8">
          Explore job opportunities or connect with inclusive employers who value your talent.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a 
            href="#browse-jobs" 
            className="inline-flex items-center gap-2 bg-white text-[oklch(38.6%_0.063_188.416)] px-8 py-3.5 rounded-lg font-semibold hover:bg-[#F5F0E8] transition-all hover:scale-105 shadow-lg"
          >
            <FiSearch /> Browse Jobs
          </a>
          <a 
            href="#post-a-job" 
            className="inline-flex items-center gap-2 bg-[#2C1810] text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-[#4A2A1A] transition-all hover:scale-105 shadow-lg"
          >
            <FiBriefcase /> Post a Job
          </a>
        </div>
      </div>
    </section>
  )
}