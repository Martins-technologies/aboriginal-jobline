import { useState } from 'react'
import { FiChevronDown, FiHelpCircle } from 'react-icons/fi'
import SectionHeading from '../common/SectionHeading'
import { JOBS_FAQS } from '../data/browserJobsContent'

/** "Common Questions from Job Seekers" accordion. */
export default function JobsFAQ() {
  const [open, setOpen] = useState(0)

  return (
    <section className="bg-white pb-16 sm:pb-20">
      <div className="container-x">
        <SectionHeading eyebrow="FAQ" title="Common Questions from Job Seekers" className="!mb-8" />
        <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
          {JOBS_FAQS.map((faq, i) => {
            const isOpen = open === i
            return (
              <div key={faq.q} className="card overflow-hidden self-start">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  aria-controls={`jobs-faq-${i}`}
                  className="flex w-full items-center gap-3 p-5 text-left"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-cream-100 text-pine-700">
                    <FiHelpCircle size={15} aria-hidden="true" />
                  </span>
                  <span className="flex-1 text-sm font-extrabold text-pine-800">{faq.q}</span>
                  <FiChevronDown
                    className={`shrink-0 text-rust-600 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>
                {isOpen && (
                  <p
                    id={`jobs-faq-${i}`}
                    className="border-t border-cream-200 p-5 pt-4 text-sm leading-relaxed text-ink/70"
                  >
                    {faq.a}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
