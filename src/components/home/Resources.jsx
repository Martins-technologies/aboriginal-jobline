import { FiArrowRight, FiBookOpen, FiBriefcase, FiUsers, FiHeart, FiTrendingUp } from 'react-icons/fi'
import SectionHeading from '../common/SectionHeading'

const RESOURCES = [
  {
    badge: "Guide",
    title: "Inclusive Hiring Best Practices",
    text: "Learn how to create a welcoming workplace and attract diverse Indigenous talent.",
    icon: FiBookOpen,
    color: "from-[oklch(38.6%_0.063_188.416)]/10 to-[#2C1810]/10"
  },
  {
    badge: "Story",
    title: "Success Story: Melissa's Journey",
    text: "How one job seeker found her dream career and is now giving back to her community.",
    icon: FiHeart,
    color: "from-[#2C1810]/10 to-[oklch(38.6%_0.063_188.416)]/10"
  },
  {
    badge: "Tips",
    title: "Building an Inclusive Workplace Culture",
    text: "Practical strategies for fostering belonging and supporting Indigenous employees.",
    icon: FiUsers,
    color: "from-[oklch(38.6%_0.063_188.416)]/10 to-[#D4C5B2]/10"
  },
  {
    badge: "Research",
    title: "Indigenous Employment Trends 2024",
    text: "Latest data on Indigenous workforce participation and inclusive hiring outcomes.",
    icon: FiTrendingUp,
    color: "from-[#2C1810]/10 to-[#D4C5B2]/10"
  },
  {
    badge: "Toolkit",
    title: "Employer Resource Toolkit",
    text: "Downloadable guides, templates, and checklists for inclusive recruitment.",
    icon: FiBriefcase,
    color: "from-[oklch(38.6%_0.063_188.416)]/10 to-[#EDE4D8]/10"
  }
]

export default function Resources() {
  return (
    <section className="bg-white pb-16 sm:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="---Resources & Insights---"
          title="Career Resources & Community Stories"
          subtitle="Practical advice, inclusive hiring strategies, and inspiring stories from across Canada."
          className='text-[oklch(47%_0.157_37.304)]'
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {RESOURCES.map(({ badge, title, text, icon: Icon, color }) => (
            <article
              key={title}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl border border-[#EDE4D8] group"
            >
              <div className={`relative h-32 bg-gradient-to-br ${color} flex items-center justify-center`}>
                <Icon size={40} className="text-[oklch(38.6%_0.063_188.416)]/20 group-hover:text-[oklch(38.6%_0.063_188.416)]/40 transition-colors" />
                <span className="absolute right-3 top-3 rounded-full px-3 py-1 text-[10px] font-extrabold tracking-wider text-white bg-[oklch(47%_0.157_37.304)]">
                  {badge}
                </span>
              </div>
              <div className="flex flex-col p-5">
                <h3 className="font-sans text-sm font-extrabold leading-snug text-[#2C1810] group-hover:text-[oklch(38.6%_0.063_188.416)] transition-colors">
                  {title}
                </h3>
                <p className="mt-2 flex-1 text-xs leading-relaxed text-[#2C1810]/70 sm:text-sm">{text}</p>
                <a 
                  href="#resources" 
                  className="mt-4 inline-flex items-center gap-2  text-[oklch(47%_0.157_37.304)] font-semibold hover:text-[oklch(32%_0.06_188.416)] transition group"
                >
                  Read More <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}