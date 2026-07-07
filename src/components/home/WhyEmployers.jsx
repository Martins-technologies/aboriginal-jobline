import { FiUsers, FiBriefcase, FiHeart, FiTarget, FiAward, FiUserCheck, FiTrendingUp, FiStar } from 'react-icons/fi'

const WHY_EMPLOYERS = [
  {
    icon: FiUsers,
    title: "Diverse Talent Pool",
    text: "Access a network of skilled Indigenous professionals across Canada."
  },
  {
    icon: FiBriefcase,
    title: "Quality Candidates",
    text: "Find qualified, motivated candidates ready to contribute to your team."
  },
  {
    icon: FiHeart,
    title: "Inclusive Culture",
    text: "Build a workplace that values diversity and fosters belonging."
  },
  {
    icon: FiTarget,
    title: "Community Impact",
    text: "Make a difference by supporting Indigenous employment and economic growth."
  },
  {
    icon: FiAward,
    title: "Diversity Recognition",
    text: "Showcase your commitment to inclusive hiring practices."
  },
  {
    icon: FiUserCheck,
    title: "Easy Hiring Process",
    text: "Streamlined tools to post jobs and connect with candidates quickly."
  },
  {
    icon: FiTrendingUp,
    title: "Business Growth",
    text: "Diverse teams drive innovation and better business outcomes."
  },
  {
    icon: FiStar,
    title: "Trusted Platform",
    text: "Join hundreds of employers who trust Aboriginal Jobline."
  }
]

export default function WhyEmployers() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="inline-block text-[oklch(38.6%_0.063_188.416)] font-semibold text-sm uppercase tracking-wider mb-2">
            Why Employers Choose
          </span>
          <h2 className="mt-3 font-serif text-3xl font-bold text-[oklch(38.6%_0.063_188.416)] sm:text-4xl">
            Aboriginal Jobline
          </h2>
          <p className="mt-3 text-[#2C1810]/70">
            Join hundreds of employers building inclusive workplaces with Aboriginal Jobline
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_EMPLOYERS.map(({ icon: Icon, title, text }) => (
            <article 
              key={title} 
              className="bg-white rounded-2xl shadow-lg border border-[#EDE4D8] flex items-start gap-4 p-6 hover:shadow-2xl transition-all hover:-translate-y-1 group"
            >
              <span className="relative grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[oklch(38.6%_0.063_188.416)]/10 text-[oklch(38.6%_0.063_188.416)] group-hover:scale-110 group-hover:bg-[oklch(38.6%_0.063_188.416)] group-hover:text-white transition-all">
                <span
                  className="absolute inset-[-4px] rounded-full border border-dashed border-current opacity-40"
                  aria-hidden="true"
                />
                <Icon size={22} aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-sans text-sm font-extrabold text-[oklch(38.6%_0.063_188.416)] group-hover:text-[oklch(32%_0.06_188.416)] transition-colors">
                  {title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-[#2C1810]/70 sm:text-sm">{text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}