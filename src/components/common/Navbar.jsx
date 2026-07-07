import { useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'
import { PiBriefcaseBold } from 'react-icons/pi'
import Logo from './Logo'

const LINKS = ['Home', 'Browse Jobs', 'Employers', 'About Us', 'Contact']

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('Browse Jobs')

  return (
    <header className="sticky top-0 z-40 bg-white shadow-[0_1px_0_0_rgba(23,73,77,0.08)]">
      <nav
        className="mx-auto flex h-[88px] w-full max-w-[1500px] items-center justify-between px-4 sm:px-6 lg:px-10"
        aria-label="Main"
      >
        {/* Logo — left */}
        <Logo />

        {/* Links — center (desktop) */}
        <ul className="hidden items-center gap-10 lg:flex">
          {LINKS.map((label) => (
            <li key={label}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  setActive(label)
                }}
                aria-current={active === label ? 'page' : undefined}
                className={`relative pb-2 text-[15px] transition-colors ${
                  active === label
                    ? 'font-bold text-pine-800 after:absolute after:inset-x-0 after:bottom-0 after:h-[2.5px] after:rounded-full after:bg-rust-500'
                    : 'font-semibold text-ink/80 hover:text-pine-700'
                }`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Post a Job — right (desktop) */}
        <a
          href="#"
          className="hidden items-center gap-2.5 rounded-xl bg-rust-500 px-6 py-3.5 text-[15px] font-bold text-white transition-colors hover:bg-rust-600 lg:inline-flex"
        >
          <PiBriefcaseBold size={19} aria-hidden="true" /> Post a Job
        </a>

        {/* Hamburger (mobile) */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="grid h-11 w-11 place-items-center rounded-lg text-pine-700 hover:bg-cream-100 lg:hidden"
        >
          {open ? <FiX size={26} /> : <FiMenu size={26} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div id="mobile-menu" className="border-t border-cream-200 bg-white lg:hidden">
          <ul className="flex flex-col gap-1 px-4 py-4">
            {LINKS.map((label) => (
              <li key={label}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    setActive(label)
                    setOpen(false)
                  }}
                  className={`block rounded-lg px-3 py-3 text-[15px] font-bold ${
                    active === label
                      ? 'bg-cream-100 text-rust-500'
                      : 'text-ink/80 hover:bg-cream-100 hover:text-pine-700'
                  }`}
                >
                  {label}
                </a>
              </li>
            ))}
            <li className="mt-2">
              <a
                href="#"
                className="flex items-center justify-center gap-2.5 rounded-xl bg-rust-500 px-6 py-3.5 text-[15px] font-bold text-white"
              >
                <PiBriefcaseBold size={19} aria-hidden="true" /> Post a Job
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
