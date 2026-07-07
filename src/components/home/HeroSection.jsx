import { useState } from 'react'
import { FiSearch, FiUsers, FiMapPin } from 'react-icons/fi'

export default function Hero() {
  const [keyword, setKeyword] = useState('')
  const [location, setLocation] = useState('')
  const [searched, setSearched] = useState(null)

  const handleSearch = (e) => {
    e.preventDefault()
    setSearched({ keyword: keyword.trim(), location: location.trim() })
  }

  const features = [
    {
      icon: FiSearch,
      title: "Find Your Dream Job",
      text: "Browse thousands of opportunities from inclusive employers across Canada."
    },
    {
      icon: FiUsers,
      title: "Connect with Employers",
      text: "Network with companies that value Indigenous talent and diversity."
    },
    {
      icon: FiMapPin,
      title: "Work Anywhere",
      text: "Find remote, hybrid, or on-site positions that fit your lifestyle."
    }
  ]

  return (
    <section id="home" className="relative bg-[#F5F0E8] overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[oklch(38.6%_0.063_188.416)]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[oklch(38.6%_0.063_188.416)]/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative grid items-center gap-10 pb-24 pt-14 lg:grid-cols-2 lg:gap-6 lg:pt-20">
        <div>
          <div className="inline-block bg-[oklch(38.6%_0.063_188.416)]/10 text-[oklch(38.6%_0.063_188.416)] px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            Indigenous Job Board
          </div>
          <h1 className="font-serif text-4xl font-bold leading-[1.12] sm:text-5xl xl:text-6xl">
            <span className="text-[oklch(38.6%_0.063_188.416)]">Find Aboriginal</span> and Indigenous Jobs <br />
            <span className="text-[oklch(38.6%_0.063_188.416)]">Across Canada</span>
          </h1>
          <span className="mt-5 block h-1 w-20 rounded-full bg-[oklch(38.6%_0.063_188.416)]" aria-hidden="true" />
          <p className="mt-6 max-w-md text-base leading-relaxed text-[#2C1810]/75 sm:text-lg">
            Connecting Aboriginal talent with inclusive employers and meaningful career
            opportunities.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#browse-jobs" className="inline-flex items-center gap-2 bg-[oklch(38.6%_0.063_188.416)] text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-[oklch(32%_0.06_188.416)] transition-all hover:scale-105 shadow-lg">
              <FiSearch aria-hidden="true" /> Browse Jobs
            </a>
            <a href="#employers" className="inline-flex items-center gap-2 border-2 border-[oklch(38.6%_0.063_188.416)] text-[oklch(38.6%_0.063_188.416)] px-8 py-3.5 rounded-lg font-semibold hover:bg-[oklch(38.6%_0.063_188.416)] hover:text-white transition-all hover:scale-105">
              <FiUsers aria-hidden="true" /> For Employers
            </a>
          </div>
          
          <div className="mt-8 flex items-center gap-6">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-[oklch(38.6%_0.063_188.416)]/20 border-2 border-white flex items-center justify-center text-xs text-[oklch(38.6%_0.063_188.416)] font-bold">
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <p className="text-sm text-[#2C1810]/70">
              <span className="font-bold text-[oklch(38.6%_0.063_188.416)]">500+</span> professionals hired
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="bg-gradient-to-br from-[oklch(38.6%_0.063_188.416)] to-[oklch(25%_0.05_188.416)] rounded-3xl shadow-2xl h-64 sm:h-80 lg:h-[420px] flex items-center justify-center p-8 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(#F5F0E8_1px,transparent_1px)] [background-size:20px_20px]"></div>
            <div className="text-center text-white relative z-10">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
                <FiUsers size={40} className="text-white/80" />
              </div>
              <h3 className="text-2xl font-bold">Aboriginal Jobline</h3>
              <p className="text-sm opacity-70 mt-1">Building careers, strengthening communities</p>
              <div className="mt-4 flex justify-center gap-3">
                <span className="px-3 py-1 bg-white/10 rounded-full text-xs">Inclusive</span>
                <span className="px-3 py-1 bg-white/10 rounded-full text-xs">Diverse</span>
                <span className="px-3 py-1 bg-white/10 rounded-full text-xs">Respectful</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative -mb-14 lg:-mb-12">
        <form
          onSubmit={handleSearch}
          role="search"
          className="bg-white rounded-2xl shadow-2xl relative z-10 -translate-y-10 p-5 sm:p-6 border border-[#EDE4D8]"
        >
          <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-center">
            <div className="flex items-center gap-4 md:border-r md:border-[#EDE4D8] md:pr-6">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[oklch(38.6%_0.063_188.416)]/10 text-[oklch(38.6%_0.063_188.416)]">
                <FiSearch size={20} aria-hidden="true" />
              </span>
              <label className="w-full">
                <span className="block text-sm font-bold text-[#2C1810]">Job title or keyword</span>
                <input
                  type="search"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="e.g. Teacher, Administrator, Nurse"
                  className="mt-0.5 w-full bg-transparent text-sm text-[#2C1810] placeholder:text-[#2C1810]/40 focus:outline-none"
                />
              </label>
            </div>

            <div className="flex items-center gap-4 md:pr-6">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[oklch(38.6%_0.063_188.416)]/10 text-[oklch(38.6%_0.063_188.416)]">
                <FiMapPin size={20} aria-hidden="true" />
              </span>
              <label className="w-full">
                <span className="block text-sm font-bold text-[#2C1810]">Location</span>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Toronto, ON or Remote"
                  className="mt-0.5 w-full bg-transparent text-sm text-[#2C1810] placeholder:text-[#2C1810]/40 focus:outline-none"
                />
              </label>
            </div>

            <button type="submit" className="inline-flex items-center gap-2 bg-[oklch(38.6%_0.063_188.416)] text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-[oklch(32%_0.06_188.416)] transition-all hover:scale-105 shadow-lg w-full md:w-auto">
              <FiSearch aria-hidden="true" /> Search Jobs
            </button>
          </div>

          {searched && (
            <p className="mt-3 border-t border-[#EDE4D8] pt-3 text-sm text-[#2C1810]/70" aria-live="polite">
              Searching for{' '}
              <span className="font-bold text-[oklch(38.6%_0.063_188.416)]">{searched.keyword || 'all jobs'}</span>
              {searched.location && (
                <>
                  {' '}
                  in <span className="font-bold text-[oklch(38.6%_0.063_188.416)]">{searched.location}</span>
                </>
              )}
              … 6 featured opportunities below match your search.
            </p>
          )}
        </form>
      </div>

      <div className="border-t border-[#EDE4D8] bg-white pb-12 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-8 sm:grid-cols-3 sm:divide-x sm:divide-[#EDE4D8]">
          {features.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-start gap-4 sm:px-6 sm:first:pl-0 sm:last:pr-0 group">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border-2 border-dashed border-[oklch(38.6%_0.063_188.416)] bg-[oklch(38.6%_0.063_188.416)]/10 text-[oklch(38.6%_0.063_188.416)] group-hover:bg-[oklch(38.6%_0.063_188.416)] group-hover:text-white transition-all duration-300">
                <Icon size={22} aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-sans text-base font-extrabold text-[#2C1810] group-hover:text-[oklch(38.6%_0.063_188.416)] transition-colors">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-[#2C1810]/70">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}