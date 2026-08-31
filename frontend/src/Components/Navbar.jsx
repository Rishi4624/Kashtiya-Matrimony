import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import logoutUser from '../api/logout.js'
import { useAuth } from '../contex/AuthContex.jsx'

export default function Navbar({ isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate()
  const { user, setUser } = useAuth()
  const [showRequests, setShowRequests] = useState(false)

  const likedUsers = user?.likes || user?.like || []
  const interestTags = user?.interests || []
  const requestCount = likedUsers.length + interestTags.length

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

  // NavLink automatically passes { isActive }
  const linkClass = ({ isActive }) =>
    [
      'relative inline-flex items-center px-3 py-2 text-sm font-medium transition-all duration-200',
      isActive ? 'text-[#1A1916]' : 'text-[#5C574F] hover:text-[#C4782A]',
      'after:absolute after:-bottom-1 after:left-1/2 after:h-[2px] after:w-[calc(100%-0.5rem)] after:-translate-x-1/2 after:rounded-full after:bg-[#C4782A] after:content-[""]',
      isActive ? 'after:opacity-100' : 'after:opacity-0 hover:after:opacity-100',
    ].join(' ')

  return (
    <nav className="sticky top-0 z-50 border-b border-[#E8E0D5] bg-[#FBF8F4]/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="relative flex h-16 items-center justify-between">
          {/* Left – Navigation links */}
          <div className="relative flex items-center gap-1">
            <NavLink to="/home" className={linkClass} end>
              Discover
            </NavLink>
            {/* <NavLink
              to="/about"
              className={({ isActive }) =>
                `${linkClass({ isActive })} hidden sm:inline-flex`
              }
            >
              About Us
            </NavLink> */}


            {isAuthenticated && (
              <button
                type="button"
                onClick={() => setShowRequests((prev) => !prev)}
                className={[
                  'relative px-3 py-2 text-sm font-medium transition-all duration-200',
                  showRequests ? 'text-[#1A1916]' : 'text-[#5C574F] hover:text-[#C4782A]',
                  'after:absolute after:-bottom-1 after:left-1/2 after:h-[2px] after:w-[calc(100%-0.5rem)] after:-translate-x-1/2 after:rounded-full after:bg-[#C4782A] after:content-[""]',
                  showRequests ? 'after:opacity-100' : 'after:opacity-0 hover:after:opacity-100',
                ].join(' ')}
              >
                Requests
                {requestCount > 0 && (
                  <span className="ml-2 inline-flex min-w-5 items-center justify-center rounded-full bg-[#C4782A] px-1.5 py-0.5 text-[10px] font-bold text-white">
                    {requestCount}
                  </span>
                )}
              </button>
            )}


            {isAuthenticated && (
              <NavLink
                to="/user"
                className={({ isActive }) =>
                  `${linkClass({ isActive })} hidden md:inline-flex md:ml-3`
                }
              >
                My Profile
              </NavLink>
            )}

            {isAuthenticated && (
              <NavLink
                to="/chats"
                className={({ isActive }) =>
                  `${linkClass({ isActive })} hidden sm:inline-flex md:ml-2`
                }
              >
                Chats
              </NavLink>
            )}

            

            {showRequests && (
              <div className="absolute left-0 top-full z-50 mt-2 w-[340px] rounded-2xl border border-[#E8E0D5] bg-white p-3 shadow-xl shadow-[#2C2A26]/10">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#A39E96]">
                    Requests
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowRequests(false)}
                    className="text-xs text-[#A39E96] hover:text-[#5C574F]"
                  >
                    Close
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#A39E96]">
                      Received likes
                    </p>
                    {likedUsers.length > 0 ? (
                      <div className="space-y-2">
                        {likedUsers.map((likedUser, index) => {
                          const likedUserId = likedUser?._id || likedUser?.id
                          const likedUserName = likedUser?.name || 'User'
                          const likedUserLocation = likedUser?.location || 'Location unavailable'
                          const likedUserAvatar =
                            likedUser?.avatar || likedUser?.image || likedUser?.profilePic

                          return (
                            <div
                              key={likedUserId || index}
                              className="flex items-center gap-3 rounded-xl border border-[#E8E0D5] bg-[#FBF8F4] p-2.5"
                            >
                              <img
                                src={likedUserAvatar || 'https://via.placeholder.com/72'}
                                alt={likedUserName}
                                className="h-10 w-10 rounded-full object-cover"
                              />
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-semibold text-[#1A1916]">
                                  {likedUserName}
                                </p>
                                <p className="truncate text-[11px] text-[#A39E96]">
                                  {likedUserLocation}
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => navigate(`/profile/${likedUserId}`)}
                                className="rounded-lg bg-[#C4782A] px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-[#A8651F]"
                              >
                                View
                              </button>
                            </div>
                          )
                        })}
                      </div>
                    ) : (
                      <p className="rounded-xl border border-dashed border-[#E8E0D5] bg-[#FBF8F4] px-3 py-4 text-xs text-[#A39E96]">
                        No one has liked your profile yet.
                      </p>
                    )}
                  </div>

                  <div>
                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#A39E96]">
                      Interests
                    </p>
                    {interestTags.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {interestTags.map((item) => (
                          <span
                            key={item}
                            className="rounded-full border border-[#E8E0D5] bg-[#FBF8F4] px-2.5 py-1 text-xs text-[#5C574F]"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="rounded-xl border border-dashed border-[#E8E0D5] bg-[#FBF8F4] px-3 py-4 text-xs text-[#A39E96]">
                        No interests added yet.
                      </p>
                    )}
                  </div>
                </div>
              </div>
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