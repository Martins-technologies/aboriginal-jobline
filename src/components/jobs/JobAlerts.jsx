import { useState } from 'react'
import { FiSearch, FiBell, FiCheckCircle } from 'react-icons/fi'
import { POPULAR_JOB_SEARCHES, WHY_JOB_SEEKERS } from '../data/browserJobsContent'
import { TONE } from '../data/content'

/** Popular searches card + job-alerts signup + "Why Job Seekers Use" strip. */
export default function JobAlerts({ onPickSearch }) {
  const [email, setEmail] = useState('')
  const [state, setState] = useState('idle')

  const signUp = (e) => {
    e.preventDefault()
    setState(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ? 'done' : 'error')
  }

  return (
    <section className="bg-cream-100 pb-16 sm:pb-20">
      <div className="container-x">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Popular job searches */}
          <div className="card p-6">
            <h3 className="flex items-center gap-2 font-sans text-base font-extrabold text-pine-800">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-cream-100 text-pine-700">
                <FiSearch size={16} aria-hidden="true" />
              </span>
              Popular Job Searches
            </h3>
            <ul className="mt-4 space-y-2.5">
              {POPULAR_JOB_SEARCHES.map((search) => (
                <li key={search}>
                  <button
                    type="button"
                    onClick={() => onPickSearch?.(search)}
                    className="inline-flex items-center gap-2 rounded-full border border-cream-200 px-4 py-2 text-sm font-bold text-ink/80 transition-colors hover:border-rust-500 hover:text-rust-600"
                  >
                    <FiSearch size={13} aria-hidden="true" /> {search}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Job alerts */}
          <div className="card p-6">
            <h3 className="flex items-center gap-2 font-sans text-base font-extrabold text-pine-800">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-rust-600/10 text-rust-600">
                <FiBell size={16} aria-hidden="true" />
              </span>
              Job Alerts
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ink/70">
              Get new job opportunities sent directly to your inbox.
            </p>
            {state === 'done' ? (
              <p className="mt-5 flex items-center gap-2 text-sm font-bold text-pine-700" aria-live="polite">
                <FiCheckCircle aria-hidden="true" /> You’re signed up for job alerts!
              </p>
            ) : (
              <form className="mt-5" onSubmit={signUp} noValidate>
                <label htmlFor="alerts-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="alerts-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (state === 'error') setState('idle')
                  }}
                  placeholder="Enter your email address"
                  className="w-full rounded-lg border border-cream-200 px-4 py-2.5 text-sm text-ink placeholder:text-ink/40 focus:border-rust-500 focus:outline-none"
                />
                {state === 'error' && (
                  <p className="mt-2 text-xs font-bold text-rust-600" aria-live="polite">
                    Please enter a valid email address.
                  </p>
                )}
                <button type="submit" className="btn-pine mt-3 w-full">
                  Sign Up for Alerts
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Why job seekers use */}
        <h3 className="mt-14 text-center font-serif text-2xl font-bold text-pine-800 sm:text-3xl">
          Why Job Seekers Use Aboriginal Jobline
        </h3>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {WHY_JOB_SEEKERS.map(({ icon: Icon, color, title, text }) => (
            <article key={title} className="card flex items-start gap-4 p-6">
              <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-full ${TONE[color].soft}`}>
                <Icon size={20} aria-hidden="true" />
              </span>
              <div>
                <h4 className="font-sans text-sm font-extrabold text-pine-800">{title}</h4>
                <p className="mt-1 text-xs leading-relaxed text-ink/70 sm:text-sm">{text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
