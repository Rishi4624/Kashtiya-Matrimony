import { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'

export default function Profile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [user, setUser] = useState(null)

  useEffect(() => {
    setUser(location.state?.user || null)
  }, [id, location.state])

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0a1a] via-[#1a1035] to-[#0f172a] text-white">
        <div className="text-center">
          <p className="text-slate-400 text-lg mb-4">User not found</p>
          <button
            onClick={() => navigate('/')}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-600 hover:to-pink-600 transition"
          >
            Go Home
          </button>
        </div>
      </div>
    )
  }

  const posts = user.posts || []

  return (
    <div className="min-h-screen font-sans text-white antialiased relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#0a0a1a] via-[#1a1035] to-[#0f172a] -z-20" />
      <div className="fixed top-[-120px] left-[-80px] w-96 h-96 bg-violet-700/30 rounded-full blur-[100px] -z-10" />
      <div className="fixed bottom-[-100px] right-[-60px] w-80 h-80 bg-pink-600/25 rounded-full blur-[100px] -z-10" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-violet-300 transition mb-6"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        {/* ========== TOP: PROFILE INFO ========== */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 mb-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-10">

            {/* Avatar */}
            <div className="relative shrink-0">
              <img
                src={user.image || user.avatar}
                alt={user.name}
                className="w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover border-4 border-violet-500/30 shadow-xl shadow-violet-500/20"
              />
            </div>

            {/* Name + Info */}
            <div className="flex-1 text-center sm:text-left w-full">
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">{user.name}</h1>

              <p className="text-violet-300 text-sm mb-3 flex items-center justify-center sm:justify-start gap-1.5">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                {user.location} · {user.age} yrs
              </p>

              {/* Stats */}
              <div className="flex justify-center sm:justify-start gap-8 mb-4">
                <div className="text-center">
                  <p className="text-xl font-bold text-white">{posts.length}</p>
                  <p className="text-xs text-slate-400">Posts</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-white">{(user.hobbies || []).length}</p>
                  <p className="text-xs text-slate-400">Hobbies</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-white">{(user.interests || []).length}</p>
                  <p className="text-xs text-slate-400">Interests</p>
                </div>
              </div>

              {/* Bio */}
              <p className="text-slate-300 text-sm leading-relaxed mb-4 max-w-lg">
                {user.bio}
              </p>

              {/* Contact */}
              {(user.email || user.phone) && (
                <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-sm text-slate-400 mb-4">
                  {user.email && (
                    <span className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {user.email}
                    </span>
                  )}
                  {user.phone && (
                    <span className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {user.phone}
                    </span>
                  )}
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                {(user.hobbies || []).map((h) => (
                  <span
                    key={h}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-violet-500/15 text-violet-300 border border-violet-500/25"
                  >
                    {h}
                  </span>
                ))}
                {(user.interests || []).map((i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-pink-500/10 text-pink-300 border border-pink-500/25"
                  >
                    {i}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ========== BOTTOM: IMAGE GALLERY ========== */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Posts
              <span className="text-slate-500 text-sm font-normal">({posts.length})</span>
            </h2>
          </div>

          {posts.length > 0 ? (
            <div className="grid grid-cols-3 gap-1 sm:gap-2">
              {posts.map((post, index) => (
                <div
                  key={index}
                  className="relative aspect-square overflow-hidden rounded-lg sm:rounded-xl group cursor-pointer"
                >
                  <img
                    src={post}
                    alt={`Post ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-slate-500">
              <svg className="w-12 h-12 mx-auto mb-3 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-sm">No posts yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
