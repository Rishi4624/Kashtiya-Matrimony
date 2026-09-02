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
        ? 'bg-[#F1E6D9] text-[#B91C1C] shadow-sm'
        : 'text-[#5C574F] hover:bg-[#F5F1EA] hover:text-[#B91C1C]',
    ].join(' ')

  return (
    <aside className="fixed left-0 top-16 z-40 flex h-[calc(100vh-4rem)] w-60 flex-col border-r border-[#FECDD3] bg-[#FFF8F8] px-3 py-5">

      {/* User greeting */}
      {user && (
        <div className="mb-5 flex items-center gap-3 rounded-2xl border border-[#FECDD3] bg-white px-4 py-3 shadow-sm">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#B91C1C] text-sm font-bold text-white">
            {user.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-[#1C1917]">{user.name}</p>
            <p className="truncate text-xs text-[#A39E96]">{user.email}</p>
          </div>
        </div>
      )}

      {/* Nav links */}
      <nav className="flex flex-col gap-1">
        <p className="mb-1 px-4 text-[10px] font-semibold uppercase tracking-widest text-[#A39E96]">
          Menu
        </p>

        <NavLink to="/home" className={linkClass} end>
          {/* Discover icon */}
          <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Discover
        </NavLink>

        {isAuthenticated && (
          <NavLink to="/requests" className={linkClass}>
            {/* Requests icon */}
            <span className="relative flex h-5 w-5 shrink-0 items-center justify-center">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {requestCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#B91C1C] text-[9px] font-bold text-white">
                  {requestCount}
                </span>
              )}
            </span>
            Requests
          </NavLink>
        )}

        {isAuthenticated && (
          <NavLink to="/user" className={linkClass}>
            {/* Profile icon */}
            <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            My Profile
          </NavLink>
        )}

        {isAuthenticated && (
          <NavLink to="/chats" className={linkClass}>
            {/* Chats icon */}
            <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            Messages
          </NavLink>
        )}
      </nav>

    </aside>
  )
}
