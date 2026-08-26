import { NavLink, useNavigate } from 'react-router-dom'
import logoutUser from '../api/logout.js'
import { useAuth } from '../contex/AuthContex.jsx'

export default function Navbar({ isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate()
  const { setUser } = useAuth()

  const handleLogout = async () => {
    try {
      const response = await logoutUser()
      if (response.success === true) {
        setUser(null)
        setIsAuthenticated(false)
        navigate('/login')
        return
      }
      alert(response.message)
    } catch (error) {
      console.log('logout error:', error)
      alert(error)
    }
  }

  const linkClass = ({ isActive }) =>
    `px-3 py-2 text-sm font-medium transition-colors duration-200 ${
      isActive
        ? 'text-[#C4782A]'
        : 'text-[#5C574F] hover:text-[#C4782A]'
    }`

  return (
    <nav className="sticky top-0 z-50 border-b border-[#E8E0D5] bg-[#FBF8F4]/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="relative flex h-16 items-center justify-between">
          {/* Left – Navigation links */}
          <div className="flex items-center gap-1">
            <NavLink to="/home" className={linkClass}>
              Home
            </NavLink>
            <NavLink to="/about" className={`${linkClass} hidden sm:inline-flex`}>
              About Us
            </NavLink>
            {isAuthenticated && (
              <NavLink to="/user" className={`${linkClass} hidden md:inline-flex md:ml-3`}>
                My Profile
              </NavLink>
            )}
            {isAuthenticated && (
              <NavLink to="/chats" className={`${linkClass} hidden sm:inline-flex md:ml-2`}>
                Chats
              </NavLink>
            )}
          </div>

          {/* Center – Logo */}
          <NavLink
            to="/home"
            className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#C4782A] text-sm font-bold text-white">
              K
            </div>
            <span className="hidden font-serif text-lg font-medium tracking-tight text-[#1A1916] sm:block">
              Kashtiya
            </span>
          </NavLink>

          {/* Right – Auth actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {isAuthenticated ? (
              <>
                <NavLink
                  to="/user"
                  className="md:hidden px-3 py-2 text-sm font-medium text-[#5C574F] hover:text-[#C4782A]"
                >
                  Profile
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="rounded-xl border border-[#E8E0D5] bg-white px-4 py-2 text-sm font-medium text-[#5C574F]
                             transition-all duration-200
                             hover:border-[#C4782A] hover:text-[#C4782A]
                             active:scale-95"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="px-3 py-2 text-sm font-medium text-[#5C574F] transition-colors hover:text-[#C4782A]"
                >
                  Sign in
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="rounded-xl bg-[#C4782A] px-4 py-2 text-sm font-semibold text-white
                             shadow-sm transition-all duration-200
                             hover:bg-[#A8651F] hover:shadow-md
                             active:scale-95"
                >
                  Join free
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}