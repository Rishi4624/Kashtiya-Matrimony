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
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-gray-500 text-lg mb-4">User not found</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2.5 rounded-lg text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 transition"
          >
            Go Home
          </button>
        </div>
      </div>
    )
  }
 
  const posts = user.posts || []
 
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 antialiased">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
 
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-rose-600 transition mb-6"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
 
        {/* ========== TOP: PROFILE CARD ========== */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 mb-8 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-10">
 
            {/* Avatar */}
            <div className="relative shrink-0">
              <img
                src={user.image || user.avatar}
                alt={user.name}
                className="w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover border-4 border-rose-100 shadow-md"
              />
            </div>
 
            {/* Name + Info */}
            <div className="flex-1 text-center sm:text-left w-full">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{user.name}</h1>
 
              <p className="text-rose-600 text-sm mb-4 flex items-center justify-center sm:justify-start gap-1.5">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                {user.location} · {user.age} yrs
              </p>
 
              {/* Stats */}
              <div className="flex justify-center sm:justify-start gap-8 mb-4">
                <div className="text-center">
                  <p className="text-xl font-bold text-gray-900">{posts.length}</p>
                  <p className="text-xs text-gray-500">Posts</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-gray-900">{(user.hobbies || []).length}</p>
                  <p className="text-xs text-gray-500">Hobbies</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-gray-900">{(user.interests || []).length}</p>
                  <p className="text-xs text-gray-500">Interests</p>
                </div>
              </div>
 
              {/* Bio */}
              <p className="text-gray-600 text-sm leading-relaxed mb-4 max-w-lg">
                {user.bio || 'No bio available.'}
              </p>
 
              {/* Contact */}
              {(user.email || user.phone) && (
                <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-sm text-gray-500 mb-4">
                  {user.email && (
                    <span className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {user.email}
                    </span>
                  )}
                  {user.phone && (
                    <span className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    className="px-3 py-1 text-xs font-medium rounded-full bg-rose-50 text-rose-700 border border-rose-100"
                  >
                    {h}
                  </span>
                ))}
                {(user.interests || []).map((i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-pink-50 text-pink-700 border border-pink-100"
                  >
                    {i}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
 
        {/* ========== BOTTOM: POSTS GALLERY ========== */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <svg className="w-5 h-5 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Posts
              <span className="text-gray-400 text-sm font-normal">({posts.length})</span>
            </h2>
          </div>
 
          {posts.length > 0 ? (
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {posts.map((post, index) => (
                <div
                  key={index}
                  className="relative aspect-square overflow-hidden rounded-xl border border-gray-200 group cursor-pointer bg-white"
                >
                  <img
                    src={post}
                    alt={`Post ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-400 bg-white border border-gray-200 rounded-xl">
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
 