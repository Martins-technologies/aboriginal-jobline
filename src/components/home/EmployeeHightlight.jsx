import { FiEdit3, FiUsers, FiTarget } from 'react-icons/fi'

const ITEMS = [
  { icon: FiEdit3, title: 'Post Jobs Easily' },
  { icon: FiUsers, title: 'Connect with Talent' },
  { icon: FiTarget, title: 'Inclusive Hiring Support' },
]

export default function EmployerHighlight() {
  return (
    <section className="bg-gradient-to-b from-[#F5F0E8] to-[#EDE4D8] pb-16 sm:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-xl border border-[#EDE4D8] grid items-center gap-8 p-8 lg:grid-cols-[1.2fr_2fr] lg:p-12 hover:shadow-2xl transition-shadow">
          <div>
            <span className="inline-block text-[oklch(38.6%_0.063_188.416)] font-semibold text-sm uppercase tracking-wider mb-2">
              For Employers
            </span>
            <h2 className="font-serif text-2xl font-bold text-[oklch(38.6%_0.063_188.416)] sm:text-3xl">
              Build an Inclusive Workforce
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#2C1810]/70 sm:text-base">
              Access a diverse pool of talented Indigenous professionals and build a stronger, more
              inclusive team.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a 
                href="#post-a-job" 
                className="inline-flex items-center gap-2 bg-[oklch(38.6%_0.063_188.416)] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[oklch(32%_0.06_188.416)] transition-all hover:scale-105 shadow-md"
              >
                Post a Job Now
              </a>
              <a 
                href="#learn-more" 
                className="inline-flex items-center gap-2 border-2 border-[oklch(38.6%_0.063_188.416)] text-[oklch(38.6%_0.063_188.416)] px-6 py-3 rounded-lg font-semibold hover:bg-[oklch(38.6%_0.063_188.416)] hover:text-white transition-all hover:scale-105"
              >
                Learn More
              </a>
            </div>
          </div>
          <ul className="grid gap-6 sm:grid-cols-3 sm:divide-x sm:divide-[#EDE4D8]">
            {ITEMS.map(({ icon: Icon, title }) => (
              <li key={title} className="flex flex-col items-center gap-3 text-center sm:px-5 sm:first:pl-0 sm:last:pr-0 group">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[oklch(38.6%_0.063_188.416)]/10 text-[oklch(38.6%_0.063_188.416)] group-hover:bg-[oklch(38.6%_0.063_188.416)] group-hover:text-white transition-all">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <span className="text-sm font-extrabold text-[#2C1810] group-hover:text-[oklch(38.6%_0.063_188.416)] transition-colors">{title}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}