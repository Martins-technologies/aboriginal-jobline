import { useState } from 'react'
import { FiChevronDown, FiHelpCircle } from 'react-icons/fi'
import SectionHeading from '../common/SectionHeading'
import { JOBS_FAQS } from '../data/browserJobsContent'

/** "Common Questions from Job Seekers" accordion. */
export default function JobsFAQ() {
  const [open, setOpen] = useState(0)

  return (
    <section className="bg-white pb-16 sm:pb-20">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-10">
        <SectionHeading 
          eyebrow="FAQ" 
          title="Common Questions from Job Seekers" 
          className="!mb-10" 
        />
        
        <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
          {JOBS_FAQS.map((faq, i) => {
            const isOpen = open === i
            return (
              <div 
                key={faq.q} 
                className={`overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 self-start ${
                  isOpen ? 'shadow-xl ring-2 ring-rust-500/20' : 'hover:shadow-xl'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  aria-controls={`jobs-faq-${i}`}
                  className="flex w-full items-center gap-3 p-5 text-left transition-colors hover:bg-[#f5f7f6]"
                >
                  <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full transition-colors duration-300 ${
                    isOpen ? 'bg-rust-500 text-white' : 'bg-[#f5f7f6] text-[#1a4a4a]'
                  }`}>
                    <FiHelpCircle size={18} aria-hidden="true" />
                  </span>
                  <span className={`flex-1 text-sm font-extrabold transition-colors duration-300 ${
                    isOpen ? 'text-rust-600' : 'text-[#1a4a4a]'
                  }`}>
                    {faq.q}
                  </span>
                  <FiChevronDown
                    className={`shrink-0 text-rust-500 transition-all duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>
                
                {isOpen && (
                  <div className="border-t border-gray-200 p-5 pt-4">
                    <p className="text-sm leading-relaxed text-[#666]">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}