import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

export default function PublicNavbar() {
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const closeMenu = () => setMobileMenuOpen(false)

  const linkClass = ({ isActive }) =>
    [
      'relative inline-flex items-center px-3 py-2 text-sm font-medium transition-all duration-200',
      isActive ? 'text-[#1C1917]' : 'text-[#5C574F] hover:text-[#B91C1C]',
      'after:absolute after:-bottom-1 after:left-1/2 after:h-[2px] after:w-[calc(100%-0.5rem)] after:-translate-x-1/2 after:rounded-full after:bg-[#B91C1C] after:content-[""]',
      isActive ? 'after:opacity-100' : 'after:opacity-0 hover:after:opacity-100',
    ].join(' ')

  return (
    <nav className="sticky top-0 z-50 border-b border-[#FECDD3] bg-[#FFF8F8]/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-3 sm:px-6">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Toggle navigation menu"
              onClick={() => setMobileMenuOpen((value) => !value)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#FECDD3] bg-[#F8F2EB] text-[#1C1917] shadow-sm transition hover:border-[#B91C1C] hover:text-[#B91C1C] lg:hidden"
            >
              <span className="flex flex-col items-center justify-center gap-1.5">
                <span className="block h-0.5 w-5 rounded-full bg-current" />
                <span className="block h-0.5 w-5 rounded-full bg-current" />
                <span className="block h-0.5 w-5 rounded-full bg-current" />
              </span>
            </button>

            <div className="hidden items-center gap-3 sm:gap-5 lg:flex">
              <NavLink to="/" className={linkClass} end>
                Discover
              </NavLink>

              <NavLink
                to="/about"
                className={({ isActive }) => `${linkClass({ isActive })} hidden sm:inline-flex`}
              >
                About Us
              </NavLink>

              <NavLink
                to="/contact"
                className={({ isActive }) => `${linkClass({ isActive })} hidden md:inline-flex`}
              >
                Contact
              </NavLink>

              <NavLink
                to="/pricing"
                className={({ isActive }) => `${linkClass({ isActive })} hidden md:inline-flex`}
              >
                Pricing
              </NavLink>
            </div>
          </div>

          <NavLink
            to="/"
            className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#B91C1C] text-sm font-bold text-white">
              K
            </div>
            <span className="hidden font-serif text-lg font-medium tracking-tight text-[#1C1917] sm:block">
              Kashtiya
            </span>
          </NavLink>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="hidden px-3 py-2 text-sm font-medium text-[#5C574F] transition-colors hover:text-[#B91C1C] sm:inline-flex"
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="rounded-xl bg-[#B91C1C] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#991B1B] hover:shadow-md active:scale-95"
            >
              Register
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="absolute left-3 top-[calc(100%+0.5rem)] z-50 w-[220px] rounded-2xl border border-[#FECDD3] bg-[#FFF8F8] p-3 shadow-xl shadow-[#B91C1C]/10 lg:hidden">
            <div className="flex flex-col gap-1">
              <NavLink to="/" onClick={closeMenu} className={({ isActive }) => `rounded-xl px-3 py-2 text-sm font-medium ${isActive ? 'bg-[#F1E6D9] text-[#1C1917]' : 'text-[#5C574F] hover:bg-[#F5F1EA]'}`} end>
                Discover
              </NavLink>

              <NavLink to="/about" onClick={closeMenu} className={({ isActive }) => `rounded-xl px-3 py-2 text-sm font-medium ${isActive ? 'bg-[#F1E6D9] text-[#1C1917]' : 'text-[#5C574F] hover:bg-[#F5F1EA]'}`}>
                About Us
              </NavLink>

              <NavLink to="/contact" onClick={closeMenu} className={({ isActive }) => `rounded-xl px-3 py-2 text-sm font-medium ${isActive ? 'bg-[#F1E6D9] text-[#1C1917]' : 'text-[#5C574F] hover:bg-[#F5F1EA]'}`}>
                Contact
              </NavLink>

              <NavLink to="/pricing" onClick={closeMenu} className={({ isActive }) => `rounded-xl px-3 py-2 text-sm font-medium ${isActive ? 'bg-[#F1E6D9] text-[#1C1917]' : 'text-[#5C574F] hover:bg-[#F5F1EA]'}`}>
                Pricing
              </NavLink>

              <button type="button" onClick={() => { navigate('/login'); closeMenu(); }} className="mt-2 rounded-xl px-3 py-2 text-left text-sm font-medium text-[#5C574F] hover:bg-[#F5F1EA]">
                Login
              </button>

              <button type="button" onClick={() => { navigate('/register'); closeMenu(); }} className="rounded-xl bg-[#B91C1C] px-3 py-2 text-left text-sm font-semibold text-white shadow-sm hover:bg-[#991B1B]">
                Register
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}