import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'
import { PiBriefcaseBold } from 'react-icons/pi'
import Logo from './Logo'
import { useAuth } from '../../dashboard/auth/AuthContext'

const LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Browse Jobs', path: '/browse-jobs' },
  { label: 'Employers', path: '/employers' },
  { label: 'About Us', path: '/about' }, // You'll need to add this route
  { label: 'Contact', path: '/contact' }
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const { isAuthenticated, role } = useAuth()

  const dashboardPath = role === 'recruiter' ? '/dashboard/recruiter' : '/dashboard/seeker'

  // Determine active link based on current path
  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

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
          {LINKS.map(({ label, path }) => (
            <li key={path}>
              <Link
                to={path}
                aria-current={isActive(path) ? 'page' : undefined}
                className={`relative pb-2 text-[15px] transition-colors ${
                  isActive(path)
                    ? 'font-bold text-pine-800 after:absolute after:inset-x-0 after:bottom-0 after:h-[2.5px] after:rounded-full after:bg-rust-500'
                    : 'font-semibold text-ink/80 hover:text-pine-700'
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Dashboard / Sign in — right (desktop) */}
        <div className="hidden items-center gap-4 lg:flex">
          <Link
            to={isAuthenticated ? dashboardPath : '/login'}
            className="text-[15px] font-semibold text-ink/80 hover:text-pine-700"
          >
            {isAuthenticated ? 'My Dashboard' : 'Sign In'}
          </Link>

          {/* Post a Job */}
          <Link
            to="/post-job"
            className="bg-[oklch(47%_0.157_37.304)] inline-flex items-center gap-2.5 rounded-xl bg-rust-500 px-6 py-3.5 text-[15px] font-bold text-white transition-colors hover:bg-rust-600"
          >
            <PiBriefcaseBold size={19} aria-hidden="true" /> Post a Job
          </Link>
        </div>

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
            {LINKS.map(({ label, path }) => (
              <li key={path}>
                <Link
                  to={path}
                  onClick={() => setOpen(false)}
                  className={`block rounded-lg px-3 py-3 text-[15px] font-bold ${
                    isActive(path)
                      ? 'bg-cream-100 text-rust-500'
                      : 'text-ink/80 hover:bg-cream-100 hover:text-pine-700'
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to={isAuthenticated ? dashboardPath : '/login'}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-3 text-[15px] font-bold text-ink/80 hover:bg-cream-100 hover:text-pine-700"
              >
                {isAuthenticated ? 'My Dashboard' : 'Sign In'}
              </Link>
            </li>
            <li className="mt-2">
              <Link
                to="/post-job"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2.5 rounded-xl bg-rust-500 px-6 py-3.5 text-[15px] font-bold bg-[oklch(47%_0.157_37.304)] text-white "
              >
                <PiBriefcaseBold size={19} aria-hidden="true" /> Post a Job
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}