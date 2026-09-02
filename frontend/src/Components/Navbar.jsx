import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../contex/AuthContex.jsx'
import logoutUser from '../api/logout.js'

export default function Navbar({ isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate()
  const { user, setUser } = useAuth()
  const [showNotifications, setShowNotifications] = useState(false)

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

  // Derive notifications from liked users (new interest requests)
  const likedUsers = user?.likes || user?.like || []
  const notificationCount = likedUsers.length

  // Notification items — each liked user is a notification
  const notifications = likedUsers.map((u) => ({
    id: u?._id || u?.id,
    name: u?.name || 'Someone',
    message: 'sent you an interest request',
    avatar: u?.avatar || u?.image || null,
    gender: u?.gender,
  }))

  return (
    <nav className="sticky top-0 z-50 border-b border-[#FECDD3] bg-[#FFF8F8]/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-3 sm:px-6">
        <div className="flex h-16 items-center justify-between">

          {/* Logo — left */}
          <NavLink to="/home" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#B91C1C] text-sm font-bold text-white">
              K
            </div>
            <span className="font-serif text-lg font-medium tracking-tight text-[#1C1917]">
              Kashtiya
            </span>
          </NavLink>

          {/* Right side */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* Notification Bell — only when authenticated */}
            {isAuthenticated && (
              <div className="relative">
                <button
                  id="notification-bell-btn"
                  type="button"
                  onClick={() => setShowNotifications((v) => !v)}
                  className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[#FECDD3] bg-white text-[#5C574F] shadow-sm transition hover:border-[#B91C1C] hover:text-[#B91C1C]"
                  aria-label="Notifications"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>

                  {/* Red badge */}
                  {notificationCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm">
                      {notificationCount > 9 ? '9+' : notificationCount}
                    </span>
                  )}
                </button>

                {/* Dropdown panel */}
                {showNotifications && (
                  <>
                    {/* Backdrop to close */}
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setShowNotifications(false)}
                    />
                    <div className="absolute right-0 top-[calc(100%+0.75rem)] z-50 w-[320px] rounded-2xl border border-[#FECDD3] bg-white shadow-xl shadow-[#2C2A26]/10">
                      {/* Header */}
                      <div className="flex items-center justify-between border-b border-[#FECDD3] px-4 py-3">
                        <p className="text-sm font-semibold text-[#1C1917]">Notifications</p>
                        {notificationCount > 0 && (
                          <span className="rounded-full bg-[#FFE4E6] px-2 py-0.5 text-[10px] font-bold text-[#7A4C1F]">
                            {notificationCount} new
                          </span>
                        )}
                      </div>

                      {/* List */}
                      <div className="max-h-72 overflow-y-auto">
                        {notifications.length === 0 ? (
                          <div className="flex flex-col items-center py-10 text-center">
                            <svg className="mb-2 h-8 w-8 text-[#D4C5B5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                            <p className="text-sm text-[#A39E96]">No notifications yet</p>
                          </div>
                        ) : (
                          notifications.map((n, i) => (
                            <button
                              key={n.id || i}
                              type="button"
                              onClick={() => {
                                navigate(`/profile/${n.id}`)
                                setShowNotifications(false)
                              }}
                              className="flex w-full items-center gap-3 border-b border-[#F5F1EA] px-4 py-3 text-left transition hover:bg-[#FFF8F8] last:border-b-0"
                            >
                              {/* Avatar */}
                              <div className="relative shrink-0">
                                {n.avatar ? (
                                  <img
                                    src={n.avatar}
                                    alt={n.name}
                                    className="h-10 w-10 rounded-full object-cover"
                                  />
                                ) : (
                                  <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white ${
                                    n.gender === 'male' ? 'bg-blue-400' : 'bg-pink-400'
                                  }`}>
                                    {n.name.charAt(0).toUpperCase()}
                                  </div>
                                )}
                                {/* New dot */}
                                <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-white bg-[#B91C1C]" />
                              </div>

                              {/* Text */}
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-semibold text-[#1C1917]">{n.name}</p>
                                <p className="truncate text-xs text-[#A39E96]">{n.message}</p>
                              </div>

                              {/* Arrow */}
                              <svg className="h-4 w-4 shrink-0 text-[#D4C5B5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                              </svg>
                            </button>
                          ))
                        )}
                      </div>

                      {/* Footer */}
                      {notifications.length > 0 && (
                        <div className="border-t border-[#FECDD3] px-4 py-2.5">
                          <button
                            type="button"
                            onClick={() => { navigate('/requests'); setShowNotifications(false) }}
                            className="w-full rounded-xl py-2 text-xs font-semibold text-[#B91C1C] transition hover:bg-[#FFE4E6]"
                          >
                            View all requests →
                          </button>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Logout button — authenticated */}
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-xl border border-[#FECDD3] bg-white px-4 py-2 text-sm font-medium text-[#5C574F] shadow-sm transition-all duration-200 hover:border-red-300 hover:bg-red-50 hover:text-red-500 active:scale-95"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            )}

            {/* Auth buttons for unauthenticated users */}
            {!isAuthenticated && (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="hidden px-3 py-2 text-sm font-medium text-[#5C574F] transition-colors hover:text-[#B91C1C] sm:inline-flex"
                >
                  Sign in
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="rounded-xl bg-[#B91C1C] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#991B1B] hover:shadow-md active:scale-95"
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