import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../contex/AuthContex.jsx'

export default function Sidebar({ isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate()
  const { user } = useAuth()

  const likedUsers = user?.likes || user?.like || []
  const requestCount = likedUsers.length

  const linkClass = ({ isActive }) =>
    [
      'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200',
      isActive
        ? 'bg-[#9B1B2E] text-white shadow-md'          // lighter red for active
        : 'text-white/80 hover:bg-white/10 hover:text-white',
    ].join(' ')

  return (
    <aside
      className="fixed left-0 top-0 z-40 flex h-screen w-60 flex-col px-3 py-5"
      style={{ backgroundColor: '#7B0A1A' }}   // exact deep maroon from the image
    >
      {/* Logo / Brand */}
      <div className="mb-8 flex items-center gap-3 px-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
          {/* You can replace with your logo image */}
          <span className="text-lg font-bold text-white">K</span>
        </div>
        <div>
          <h1 className="text-lg font-bold leading-tight text-white">Kshtriya</h1>
          <p className="text-xs font-medium tracking-wide text-white/70">Matrimony</p>
        </div>
      </div>

      {/* User greeting */}
      {user && (
        <div className="mb-6 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#9B1B2E] text-sm font-bold text-white">
            {user.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">{user.name}</p>
            <p className="truncate text-xs text-white/50">{user.email}</p>
          </div>
        </div>
      )}

      {/* Nav links */}
      <nav className="flex flex-col gap-1">
        <p className="mb-2 px-4 text-[10px] font-semibold uppercase tracking-widest text-white/40">
          Menu
        </p>


        {isAuthenticated && (
          <NavLink to="/user" className={linkClass}>
            <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            My Profile
          </NavLink>
        )}

        <NavLink to="/home" className={linkClass}>
          <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Search Matches
        </NavLink>

        {isAuthenticated && (
          <NavLink to="/requests" className={linkClass}>
            <span className="relative flex h-5 w-5 shrink-0 items-center justify-center">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {requestCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[9px] font-bold text-[#7B0A1A]">
                  {requestCount}
                </span>
              )}
            </span>
            Interests
          </NavLink>
        )}

        {isAuthenticated && (
          <NavLink to="/chats" className={linkClass}>
            <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            Chat
          </NavLink>
        )}

        {isAuthenticated && (
          <NavLink to="/shortlist" className={linkClass}>
            <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            Shortlist
          </NavLink>
        )}

       

        {isAuthenticated && (
          <button
            onClick={() => navigate('/home', { state: { openFilter: true } })}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/80 transition-all duration-200 hover:bg-white/10 hover:text-white"
          >
            <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Preferences
          </button>
        )}
      </nav>

      {/* Logout at bottom */}
      <div className="mt-auto border-t border-white/10 pt-4">
        <button
          onClick={() => {
            // your logout logic
            setIsAuthenticated?.(false)
            navigate('/login')
          }}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </div>
    </aside>
  )
}