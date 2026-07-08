import { FaQuoteLeft } from 'react-icons/fa'
import { FiUser, FiBriefcase, FiStar } from 'react-icons/fi'
import SectionHeading from '../common/SectionHeading'

const TESTIMONIALS = [
  {
    quote: "Aboriginal Jobline helped me find a career where I can grow, support my family, and give back to my community.",
    name: "Melissa K.",
    role: "Job Seeker",
    gradient: "from-[oklch(38.6%_0.063_188.416)]/5 to-[#2C1810]/5"
  },
  {
    quote: "We've hired incredible Indigenous talent through this platform. It's transformed our workplace culture.",
    name: "James T.",
    role: "Employer",
    gradient: "from-[#2C1810]/5 to-[oklch(38.6%_0.063_188.416)]/5"
  },
  {
    quote: "The support and resources available made my job search journey smooth and successful.",
    name: "Tanya R.",
    role: "Job Seeker",
    gradient: "from-[oklch(38.6%_0.063_188.416)]/5 to-[#EDE4D8]/5"
  }
]

export default function Testimonials() {
  return (
    <section className="bg-white pb-16 sm:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Community Voices"
          title="Voices from the Community"
          subtitle="Real stories from job seekers and employers making a difference together."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map(({ quote, name, role, gradient }) => (
            <figure 
              key={name} 
              className={`bg-gradient-to-br ${gradient} rounded-2xl shadow-lg border border-[#EDE4D8] relative flex flex-col p-6 pt-9 hover:shadow-2xl transition-all hover:-translate-y-1`}
            >
              <span className="absolute -top-5 left-6 grid h-10 w-10 place-items-center rounded-full bg-[oklch(38.6%_0.063_188.416)] text-white">
                <FaQuoteLeft size={14} />
              </span>
              
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} className="text-[#D4C5B2] fill-[#D4C5B2]" size={14} />
                ))}
              </div>
              
              <blockquote className="flex-1 text-sm leading-relaxed text-[#2C1810]/80">
                “{quote}”
              </blockquote>
              <figcaption className="mt-5 flex items-center justify-between gap-4 border-t border-[#EDE4D8] pt-4">
                <div>
                  <p className="text-sm font-extrabold text-[oklch(38.6%_0.063_188.416)]">{name}</p>
                  <p className="text-xs text-[#2C1810]/60 flex items-center gap-1">
                    <FiBriefcase size={12} /> {role}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-[oklch(38.6%_0.063_188.416)]/10 text-[oklch(47%_0.157_37.304)] flex items-center justify-center text-lg font-bold">
                  {name.charAt(0)}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}