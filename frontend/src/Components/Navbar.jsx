import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import logoutUser from '../api/logout.js'
import { useAuth } from '../contex/AuthContex.jsx'
import Requestes from './Requestes.jsx'

export default function Navbar({ isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate()
  const { user, setUser } = useAuth()
  const [showRequests, setShowRequests] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const likedUsers = user?.likes || user?.like || []
  const interestTags = user?.interests || []
  const requestCount = likedUsers.length

  const handleLogout = async () => {
    try {
      const response = await logoutUser()
      if (response.success === true) {
        setUser(null)
        setIsAuthenticated(false)
        setMobileMenuOpen(false)
        navigate('/login')
        return
      }
      alert(response.message)
    } catch (error) {
      console.log('logout error:', error)
      alert(error)
    }
  }

  const closeMenu = () => setMobileMenuOpen(false)

  const linkClass = ({ isActive }) =>
    [
      'relative inline-flex items-center px-3 py-2 text-sm font-medium transition-all duration-200',
      isActive ? 'text-[#1A1916]' : 'text-[#5C574F] hover:text-[#C4782A]',
      'after:absolute after:-bottom-1 after:left-1/2 after:h-[2px] after:w-[calc(100%-0.5rem)] after:-translate-x-1/2 after:rounded-full after:bg-[#C4782A] after:content-[""]',
      isActive ? 'after:opacity-100' : 'after:opacity-0 hover:after:opacity-100',
    ].join(' ')

  return (
    <nav className="sticky top-0 z-50 border-b border-[#E8E0D5] bg-[#FBF8F4]/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-3 sm:px-6">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Toggle navigation menu"
              onClick={() => setMobileMenuOpen((value) => !value)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E8E0D5] bg-[#F8F2EB] text-[#1A1916] shadow-sm transition hover:border-[#C4782A] hover:text-[#C4782A] lg:hidden"
            >
              <span className="flex flex-col items-center justify-center gap-1.5">
                <span className="block h-0.5 w-5 rounded-full bg-current" />
                <span className="block h-0.5 w-5 rounded-full bg-current" />
                <span className="block h-0.5 w-5 rounded-full bg-current" />
              </span>
            </button>

            <div className="hidden items-center gap-1 lg:flex">
              <NavLink to="/home" className={linkClass} end>
                Discover
              </NavLink>

              {isAuthenticated && (
                <NavLink
                  to="/requests"
                  className={({ isActive }) => `${linkClass({ isActive })} hidden xl:inline-flex`}
                >
                  Requests
                  {requestCount > 0 && (
                    <span className="ml-2 inline-flex min-w-5 items-center justify-center rounded-full bg-[#C4782A] px-1.5 py-0.5 text-[10px] font-bold text-white">
                      {requestCount}
                    </span>
                  )}
                </NavLink>
              )}

              {isAuthenticated && (
                <NavLink
                  to="/user"
                  className={({ isActive }) => `${linkClass({ isActive })} hidden md:inline-flex md:ml-3`}
                >
                  My Profile
                </NavLink>
              )}

              {isAuthenticated && (
                <NavLink
                  to="/chats"
                  className={({ isActive }) => `${linkClass({ isActive })} hidden md:inline-flex md:ml-2`}
                >
                  Chats
                </NavLink>
              )}
            </div>
          </div>

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

          <div className="flex items-center gap-2 sm:gap-3">
            {isAuthenticated ? (
              <>
                <NavLink
                  to="/user"
                  className="px-3 py-2 text-sm font-medium text-[#5C574F] hover:text-[#C4782A] md:hidden"
                >
                  Profile
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="rounded-xl border border-[#E8E0D5] bg-white px-4 py-2 text-sm font-medium text-[#5C574F] transition-all duration-200 hover:border-[#C4782A] hover:text-[#C4782A] active:scale-95"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="hidden px-3 py-2 text-sm font-medium text-[#5C574F] transition-colors hover:text-[#C4782A] sm:inline-flex"
                >
                  Sign in
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="rounded-xl bg-[#C4782A] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#A8651F] hover:shadow-md active:scale-95"
                >
                  Join free
                </button>
              </>
            )}
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="absolute left-3 top-[calc(100%+0.5rem)] z-50 w-[220px] rounded-2xl border border-[#E8E0D5] bg-[#FBF8F4] p-3 shadow-xl shadow-[#C4782A]/10 lg:hidden">
            <div className="flex flex-col gap-1">
              <NavLink to="/home" onClick={closeMenu} className={({ isActive }) => `rounded-xl px-3 py-2 text-sm font-medium ${isActive ? 'bg-[#F1E6D9] text-[#1A1916]' : 'text-[#5C574F] hover:bg-[#F5F1EA]'}`} end>
                Discover
              </NavLink>

              {isAuthenticated && (
                <NavLink to="/requests" onClick={closeMenu} className={({ isActive }) => `rounded-xl px-3 py-2 text-sm font-medium ${isActive ? 'bg-[#F1E6D9] text-[#1A1916]' : 'text-[#5C574F] hover:bg-[#F5F1EA]'}`}>
                  Requests
                  {requestCount > 0 && (
                    <span className="ml-2 inline-flex min-w-5 items-center justify-center rounded-full bg-[#C4782A] px-1.5 py-0.5 text-[10px] font-bold text-white">
                      {requestCount}
                    </span>
                  )}
                </NavLink>
              )}

              {isAuthenticated && (
                <NavLink to="/user" onClick={closeMenu} className={({ isActive }) => `rounded-xl px-3 py-2 text-sm font-medium ${isActive ? 'bg-[#F1E6D9] text-[#1A1916]' : 'text-[#5C574F] hover:bg-[#F5F1EA]'}`}>
                  My Profile
                </NavLink>
              )}

              {isAuthenticated && (
                <NavLink to="/chats" onClick={closeMenu} className={({ isActive }) => `rounded-xl px-3 py-2 text-sm font-medium ${isActive ? 'bg-[#F1E6D9] text-[#1A1916]' : 'text-[#5C574F] hover:bg-[#F5F1EA]'}`}>
                  Chats
                </NavLink>
              )}

              {!isAuthenticated && (
                <>
                  <button type="button" onClick={() => { navigate('/login'); closeMenu(); }} className="rounded-xl px-3 py-2 text-left text-sm font-medium text-[#5C574F] hover:bg-[#F5F1EA]">
                    Sign in
                  </button>
                  <button type="button" onClick={() => { navigate('/register'); closeMenu(); }} className="rounded-xl bg-[#C4782A] px-3 py-2 text-left text-sm font-semibold text-white shadow-sm hover:bg-[#A8651F]">
                    Join free
                  </button>
                </>
              )}

              {isAuthenticated && (
                <button type="button" onClick={handleLogout} className="mt-2 rounded-xl border border-[#E8E0D5] bg-white px-3 py-2 text-left text-sm font-medium text-[#5C574F] hover:border-[#C4782A] hover:text-[#C4782A]">
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {showRequests && <Requestes showRequests={showRequests} setShowRequests={setShowRequests} likedUsers={likedUsers} interestTags={interestTags} navigate={navigate} />}
    </nav>
  )
}