import { NavLink, useNavigate } from 'react-router-dom'

export default function PublicNavbar() {
  const navigate = useNavigate()

  const linkClass = ({ isActive }) =>
    [
      'relative inline-flex items-center px-3 py-2 text-sm font-medium transition-all duration-200',
      isActive ? 'text-[#1A1916]' : 'text-[#5C574F] hover:text-[#C4782A]',
      // underline base
      'after:absolute after:-bottom-1 after:left-1/2 after:h-[2px] after:w-[calc(100%-0.5rem)] after:-translate-x-1/2 after:rounded-full after:bg-[#C4782A] after:content-[""]',
      // show underline when active, or on hover when inactive
      isActive ? 'after:opacity-100' : 'after:opacity-0 hover:after:opacity-100',
    ].join(' ')

  return (
    <nav className="sticky top-0 z-50 border-b border-[#E8E0D5] bg-[#FBF8F4]/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Pass the function directly — do NOT wrap it in a template string */}
            <NavLink to="/" className={linkClass} end>
              Discover
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `${linkClass({ isActive })} hidden sm:inline-flex`
              }
            >
              About Us
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `${linkClass({ isActive })} hidden md:inline-flex`
              }
            >
              Contact
            </NavLink>

            <NavLink
              to="/pricing"
              className={({ isActive }) =>
                `${linkClass({ isActive })} hidden md:inline-flex`
              }
            >
              Pricing
            </NavLink>
          </div>

          <NavLink
            to="/"
            className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#C4782A] text-sm font-bold text-white">
              K
            </div>
            <span className="hidden font-serif text-lg font-medium tracking-tight text-[#1A1916] sm:block">
              Kashtiya
            </span>
          </NavLink>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="px-3 py-2 text-sm font-medium text-[#5C574F] transition-colors hover:text-[#C4782A]"
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="rounded-xl bg-[#C4782A] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#A8651F] hover:shadow-md active:scale-95"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}