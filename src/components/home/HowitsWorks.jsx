import { FiUserPlus, FiSearch, FiBriefcase, FiArrowRight } from 'react-icons/fi'

const STEPS = [
  {
    icon: FiUserPlus,
    title: "Create Your Profile",
    text: "Sign up and tell us about your skills, experience, and career goals.",
    number: "01"
  },
  {
    icon: FiSearch,
    title: "Browse Opportunities",
    text: "Search through our curated list of jobs from inclusive employers.",
    number: "02"
  },
  {
    icon: FiBriefcase,
    title: "Apply & Connect",
    text: "Submit applications and connect directly with hiring managers.",
    number: "03"
  }
]

export default function HowItWorks() {
  return (
    <section className="bg-[#F5F0E8] py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block text-[oklch(38.6%_0.063_188.416)] font-semibold text-sm uppercase tracking-wider mb-2">
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2C1810]">
            Three Simple Steps to <span className="text-[oklch(38.6%_0.063_188.416)]">Your Dream Job</span>
          </h2>
          <p className="text-[#2C1810]/70 max-w-2xl mx-auto mt-3">
            Start your career journey with Aboriginal Jobline in just three easy steps
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 md:gap-6">
          {STEPS.map(({ icon: Icon, title, text, number }, i) => (
            <div key={title} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all hover:-translate-y-2 border border-[#EDE4D8] group relative">
              <div className="absolute -top-3 -right-3 bg-[oklch(38.6%_0.063_188.416)] text-white w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                {number}
              </div>
              
              <div className="w-16 h-16 rounded-full bg-[oklch(38.6%_0.063_188.416)]/10 text-[oklch(38.6%_0.063_188.416)] flex items-center justify-center text-2xl mb-4 group-hover:bg-[oklch(38.6%_0.063_188.416)] group-hover:text-white transition-all duration-300">
                <Icon size={28} />
              </div>
              
              <h3 className="text-lg font-bold text-[#2C1810] mb-2 group-hover:text-[oklch(38.6%_0.063_188.416)] transition-colors">
                {title}
              </h3>
              <p className="text-sm text-[#2C1810]/70 leading-relaxed">
                {text}
              </p>
              
              {i < STEPS.length - 1 && (
                <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 text-[oklch(38.6%_0.063_188.416)]/30">
                  <FiArrowRight size={24} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}