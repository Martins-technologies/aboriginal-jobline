import { useState } from 'react'
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from 'react-icons/fa'
import { FiPhone, FiMail, FiMapPin, FiLock, FiCheckCircle } from 'react-icons/fi'
import Logo from './Logo'

const SOCIALS = [
  { Icon: FaFacebookF, label: 'Facebook' },
  { Icon: FaInstagram, label: 'Instagram' },
  { Icon: FaLinkedinIn, label: 'LinkedIn' },
  { Icon: FaYoutube, label: 'YouTube' },
]

const FOOTER_COLUMNS = [
  {
    heading: "Quick Links",
    links: ["Home", "Browse Jobs", "Employers", "About Us", "Careers", "FAQ"]
  },
  {
    heading: "Job Search",
    links: ["Browse Jobs", "Job Tips", "Career Resources", "Community Resources", "Business Ideas", "Support & FAQ"]
  },
  {
    heading: "Employers",
    links: ["Post a Job", "Browse Hiring", "Why Hire Indigenous Talent?", "Employer Resources", "Partnerships", "Contact Us"]
  }
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState('idle')

  const subscribe = (e) => {
    e.preventDefault()
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setState('done')
    } else {
      setState('error')
    }
  }

  return (
    <footer id="contact" className="bg-[oklch(38.6%_0.063_188.416)] text-[#F5F0E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-10 py-14 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.3fr_1.4fr] lg:gap-8">
        <div>
          <Logo light />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-[#F5F0E8]/80">
            Aboriginal Jobline connects Indigenous talent with inclusive employers across Canada.
            Together, we build stronger futures and stronger communities.
          </p>
          <div className="mt-5 flex gap-3">
            {SOCIALS.map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="grid h-9 w-9 place-items-center rounded-full border border-[#F5F0E8]/40 text-[#F5F0E8] transition-colors hover:border-[#D4C5B2] hover:text-[#D4C5B2]"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        {FOOTER_COLUMNS.map(({ heading, links }) => (
          <nav key={heading} aria-label={heading}>
            <h3 className="text-xs font-extrabold uppercase tracking-[0.18em] text-white">
              {heading}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-[#F5F0E8]/80 transition-colors hover:text-[#D4C5B2]"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div>
          <h3 className="text-xs font-extrabold uppercase tracking-[0.18em] text-white">
            Contact Us
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-[#F5F0E8]/80">
            <li className="flex items-center gap-2.5">
              <FiPhone className="shrink-0 text-[#D4C5B2]" aria-hidden="true" />
              <a href="tel:18665229898" className="hover:text-[#D4C5B2]">
                1-866-522-9898
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <FiMail className="shrink-0 text-[#D4C5B2]" aria-hidden="true" />
              <a href="mailto:info@aboriginaljobline.com" className="hover:text-[#D4C5B2]">
                info@aboriginaljobline.com
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <FiMapPin className="mt-0.5 shrink-0 text-[#D4C5B2]" aria-hidden="true" />
              <span>
                200 – 275 Slater Street
                <br />
                Ottawa, ON K1P 5H9
                <br />
                Canada
              </span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-extrabold uppercase tracking-[0.18em] text-white">
            Stay Connected
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-[#F5F0E8]/80">
            Subscribe to our newsletter for job alerts, career tips, and community updates.
          </p>
          {state === 'done' ? (
            <p className="mt-4 flex items-center gap-2 text-sm font-bold text-[#D4C5B2]" aria-live="polite">
              <FiCheckCircle aria-hidden="true" /> You're subscribed — welcome!
            </p>
          ) : (
            <form className="mt-4" onSubmit={subscribe} noValidate>
              <div className="flex overflow-hidden rounded-lg">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (state === 'error') setState('idle')
                  }}
                  placeholder="Enter your email"
                  className="w-full bg-white px-4 py-2.5 text-sm text-[#2C1810] placeholder:text-[#2C1810]/40 focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-[#2C1810] px-4 text-sm font-bold text-white transition-colors hover:bg-[#4A2A1A]"
                >
                  Subscribe
                </button>
              </div>
              {state === 'error' && (
                <p className="mt-2 text-xs font-bold text-[#D4C5B2]" aria-live="polite">
                  Please enter a valid email address.
                </p>
              )}
            </form>
          )}
          <p className="mt-3 flex items-center gap-1.5 text-xs text-[#F5F0E8]/70">
            <FiLock aria-hidden="true" /> We respect your privacy.
          </p>
        </div>
      </div>

      <div className="border-t border-[#F5F0E8]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-between gap-3 py-5 text-xs text-[#F5F0E8]/70 sm:flex-row">
          <p>© 2026 Aboriginal Jobline. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#D4C5B2]">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[#D4C5B2]">
              Terms of Use
            </a>
            <a href="#" className="hover:text-[#D4C5B2]">
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}