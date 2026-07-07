import { useMemo, useState } from 'react'
import {
  JobsHero,
  JobSearchBar,
  PopularSearches,
  FilterSidebar,
  JobsGrid,
  BrowseByRegion,
  JobAlerts,
  CareerResources,
  JobsFAQ,
} from '../components/jobs'
import SectionHeading from '../components/common/SectionHeading'
import { BROWSE_JOBS } from '../components/data/browserJobsContent'

const EMPTY_FILTERS = {
  keyword: '',
  location: '',
  category: '',
  type: '',
  salary: '',
  experience: '',
  workplace: '',
}

export default function BrowseJobs() {
  const [filters, setFilters] = useState(EMPTY_FILTERS)
  const [sort, setSort] = useState('relevant')
  const [view, setView] = useState('grid')

  const jobs = useMemo(() => {
    const kw = filters.keyword.trim().toLowerCase()
    const loc = filters.location.trim().toLowerCase()

    let list = BROWSE_JOBS.filter((job) => {
      const matchKw =
        !kw ||
        job.title.toLowerCase().includes(kw) ||
        job.company.toLowerCase().includes(kw) ||
        job.category.toLowerCase().includes(kw) ||
        job.location.toLowerCase().includes(kw)
      const matchLoc = !loc || job.location.toLowerCase().includes(loc)
      const matchCat = !filters.category || job.category === filters.category
      const matchType = !filters.type || job.type === filters.type
      const matchExp = !filters.experience || job.experience === filters.experience
      const matchWp = !filters.workplace || job.workplace === filters.workplace
      let matchSalary = true
      if (filters.salary) {
        const [min, max] = filters.salary.split('-').map(Number)
        matchSalary = job.salaryValue >= min && job.salaryValue <= max
      }
      return matchKw && matchLoc && matchCat && matchType && matchExp && matchWp && matchSalary
    })

    if (sort === 'recent') list = [...list].sort((a, b) => a.postedDays - b.postedDays)
    if (sort === 'salary-high') list = [...list].sort((a, b) => b.salaryValue - a.salaryValue)
    if (sort === 'salary-low') list = [...list].sort((a, b) => a.salaryValue - b.salaryValue)
    return list
  }, [filters, sort])

  const applyQuickFilter = (partial) => setFilters({ ...EMPTY_FILTERS, ...partial })
  const reset = () => setFilters(EMPTY_FILTERS)

  const scrollToJobs = () =>
    document.getElementById('jobs')?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <>
      <JobsHero />
      <JobSearchBar filters={filters} onChange={setFilters} onSearch={scrollToJobs} />
      <PopularSearches active={filters} onPick={(f) => { applyQuickFilter(f); scrollToJobs() }} />

      {/* Latest Jobs in Demand */}
      <section id="jobs" className="scroll-mt-24 bg-cream-100 py-16 sm:py-20">
        <div className="container-x">
          <div className="mb-10">
            <p className="eyebrow">Featured Opportunities</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-pine-800 sm:text-4xl">
              Latest Jobs in Demand
            </h2>
            <p className="mt-2 max-w-lg text-sm text-ink/70 sm:text-base">
              Discover current job openings from inclusive employers across Canada who are
              committed to diversity, inclusion, and community.
            </p>
          </div>
          <div className="flex flex-col gap-8 lg:flex-row">
            <FilterSidebar filters={filters} onChange={setFilters} onReset={reset} />
            <JobsGrid
              jobs={jobs}
              sort={sort}
              onSortChange={setSort}
              view={view}
              onViewChange={setView}
              onReset={reset}
            />
          </div>
        </div>
      </section>

      <BrowseByRegion
        onPickCategory={(cat) => {
          const known = cat === 'Remote Opportunities'
          setFilters(known ? { ...EMPTY_FILTERS, workplace: 'Remote' } : { ...EMPTY_FILTERS, category: cat })
          scrollToJobs()
        }}
      />
      <JobAlerts onPickSearch={(s) => { setFilters({ ...EMPTY_FILTERS, keyword: s.split(' jobs')[0].replace('Indigenous jobs in ', '').replace('Aboriginal ', '') }); scrollToJobs() }} />
      <CareerResources />
      <JobsFAQ />
    </>
  )
}
