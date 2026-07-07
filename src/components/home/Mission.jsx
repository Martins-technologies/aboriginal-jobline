import { FiChevronRight, FiUsers, FiBriefcase, FiHeart, FiTarget } from 'react-icons/fi'

export default function Mission() {
  const stats = [
    { icon: FiUsers, number: "500+", label: "Job Seekers Helped" },
    { icon: FiBriefcase, number: "200+", label: "Employers Partnered" },
    { icon: FiHeart, number: "95%", label: "Satisfaction Rate" }
  ]

  return (
    <section id="about-us" className="bg-[#F5F0E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid items-center gap-10 py-16 sm:py-20 lg:grid-cols-2">
        <div>
          <span className="inline-block text-[oklch(38.6%_0.063_188.416)] font-semibold text-sm uppercase tracking-wider mb-2">
            Our Mission
          </span>
          <h2 className="mt-4 font-serif text-3xl font-bold leading-tight text-[oklch(38.6%_0.063_188.416)] sm:text-4xl">
            Building Stronger Futures Together
          </h2>
          <p className="mt-5 max-w-lg text-sm leading-relaxed text-[#2C1810]/75 sm:text-base">
            At Aboriginal Jobline, our mission is to connect Aboriginal and Indigenous job seekers
            with inclusive employers, creating meaningful opportunities that empower individuals,
            strengthen families, and build thriving communities across Canada.
          </p>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-[#2C1810]/75 sm:text-base">
            We believe in removing barriers, celebrating diverse talents, and fostering workplaces
            where everyone can succeed.
          </p>
          
          <div className="flex flex-wrap gap-6 mt-6">
            {stats.map(({ icon: Icon, number, label }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon className="text-[oklch(38.6%_0.063_188.416)]" size={20} />
                <div>
                  <span className="font-bold text-[oklch(38.6%_0.063_188.416)] text-lg">{number}</span>
                  <span className="text-xs text-[#2C1810]/70 block">{label}</span>
                </div>
              </div>
            ))}
          </div>

          <a 
            href="#about-us" 
            className="inline-flex items-center gap-2 bg-[oklch(38.6%_0.063_188.416)] text-white px-7 py-3 rounded-lg font-semibold mt-6 hover:bg-[oklch(32%_0.06_188.416)] transition-all hover:scale-105"
          >
            Learn More About Us <FiChevronRight aria-hidden="true" />
          </a>
        </div>

        <div className="relative">
          <div className="bg-gradient-to-br from-[oklch(38.6%_0.063_188.416)] to-[oklch(25%_0.05_188.416)] rounded-3xl shadow-2xl h-64 sm:h-80 lg:h-96 flex items-center justify-center p-8 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(#F5F0E8_1px,transparent_1px)] [background-size:20px_20px]"></div>
            <div className="text-center text-white relative z-10">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
                <FiTarget size={40} className="text-white/80" />
              </div>
              <h3 className="text-2xl font-bold">Aboriginal Jobline</h3>
              <p className="text-sm opacity-70 mt-1">Building careers, strengthening communities</p>
              <div className="mt-4 flex justify-center gap-3 flex-wrap">
                <span className="px-3 py-1 bg-white/10 rounded-full text-xs flex items-center gap-1">
                  <FiHeart size={12} /> Inclusive
                </span>
                <span className="px-3 py-1 bg-white/10 rounded-full text-xs flex items-center gap-1">
                  <FiUsers size={12} /> Diverse
                </span>
                <span className="px-3 py-1 bg-white/10 rounded-full text-xs flex items-center gap-1">
                  <FiTarget size={12} /> Respectful
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}