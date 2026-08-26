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
      <div className="min-h-screen flex items-center justify-center bg-[#FFF8F9]">
        <div className="text-center">
          <p className="text-gray-500 text-lg mb-4">User not found</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-[#E11D48] hover:bg-[#C9183B] transition"
          >
            Go Home
          </button>
        </div>
      </div>
    )
  }

  const posts = user.posts || []

  const profileDetails = [
    { label: 'Gender', value: user.gender },
    { label: 'Religion', value: user.religion },
    { label: 'Marital Status', value: user.maritalStatus },
    { label: 'Mother Tongue', value: user.motherTongue },
    { label: 'Education', value: user.education },
    { label: 'Occupation', value: user.occupation },
    { label: 'Annual Income', value: user.income },
    { label: 'Height', value: user.height },
    { label: 'Diet', value: user.diet },
    { label: 'Smoking', value: user.smoking },
    { label: 'Drinking', value: user.drinking },
  ].filter((item) => item.value)

  return (
    <div className="min-h-screen bg-[#FFF8F9]">
      {/* ========== COVER + HEADER ========== */}
      <div className="relative">
        {/* Cover */}
        <div className="h-48 sm:h-56 md:h-64 w-full bg-gradient-to-r from-[#E11D48] via-[#F43F5E] to-[#FB7185]" />

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 z-20 flex items-center gap-2 rounded-full bg-black/30 px-3 py-1.5 text-sm text-white backdrop-blur-sm hover:bg-black/50 transition"
        >
          ← Back
        </button>

        {/* Profile header content */}
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="relative -mt-16 sm:-mt-20 flex flex-col sm:flex-row sm:items-end gap-5 pb-6">
            {/* Avatar */}
            <div className="relative shrink-0 self-center sm:self-end">
              <img
                src={user.image || user.avatar || 'https://via.placeholder.com/200'}
                alt={user.name}
                className="h-32 w-32 sm:h-40 sm:w-40 rounded-full object-cover border-4 border-white shadow-xl"
              />
            </div>

            {/* Name + meta */}
            <div className="flex-1 text-center sm:text-left pb-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{user.name}</h1>
              <p className="mt-1 text-sm text-gray-600 flex items-center justify-center sm:justify-start gap-1.5">
                <svg className="w-4 h-4 text-[#E11D48]" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                {user.location || 'Unknown'} · {user.age || '—'} yrs
              </p>
            </div>
          </div>

          {/* Stats bar */}
          <div className="flex justify-center sm:justify-start gap-8 border-b border-rose-100 pb-4 mb-6">
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
        </div>
      </div>

      {/* ========== MAIN CONTENT (two-column) ========== */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT COLUMN – About & Details */}
          <div className="lg:col-span-4 space-y-5">
            {/* About card */}
            <div className="bg-white rounded-2xl border border-rose-100 shadow-sm p-5">
              <h2 className="text-base font-semibold text-gray-900 mb-3">About</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                {user.bio || 'No bio available.'}
              </p>

              {(user.email || user.phone) && (
                <div className="mt-4 space-y-2 text-sm text-gray-600">
                  {user.email && (
                    <div className="flex items-center gap-2">
                      <span className="text-[#E11D48]">✉</span>
                      <span className="truncate">{user.email}</span>
                    </div>
                  )}
                  {user.phone && (
                    <div className="flex items-center gap-2">
                      <span className="text-[#E11D48]">📞</span>
                      <span>{user.phone}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Profile Details card */}
            {profileDetails.length > 0 && (
              <div className="bg-white rounded-2xl border border-rose-100 shadow-sm p-5">
                <h2 className="text-base font-semibold text-gray-900 mb-4">Profile Details</h2>
                <div className="space-y-3">
                  {profileDetails.map(({ label, value }) => (
                    <div key={label} className="flex justify-between gap-3 text-sm">
                      <span className="text-gray-500 shrink-0">{label}</span>
                      <span className="font-medium text-gray-800 text-right">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Family */}
            {user.familyDetails && (
              <div className="bg-white rounded-2xl border border-rose-100 shadow-sm p-5">
                <h2 className="text-base font-semibold text-gray-900 mb-3">Family Details</h2>
                <p className="text-sm text-gray-600 leading-relaxed">{user.familyDetails}</p>
              </div>
            )}

            {/* Hobbies & Interests */}
            <div className="bg-white rounded-2xl border border-rose-100 shadow-sm p-5">
              <h2 className="text-base font-semibold text-gray-900 mb-3">Hobbies & Interests</h2>
              <div className="flex flex-wrap gap-2">
                {(user.hobbies || []).map((h) => (
                  <span
                    key={h}
                    className="rounded-full bg-rose-50 px-3 py-1 text-xs font-medium text-[#E11D48] border border-rose-100"
                  >
                    {h}
                  </span>
                ))}
                {(user.interests || []).map((i) => (
                  <span
                    key={i}
                    className="rounded-full bg-pink-50 px-3 py-1 text-xs font-medium text-pink-700 border border-pink-100"
                  >
                    {i}
                  </span>
                ))}
                {(user.hobbies || []).length === 0 && (user.interests || []).length === 0 && (
                  <p className="text-sm text-gray-400">None added yet</p>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN – Posts */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                <svg className="w-5 h-5 text-[#E11D48]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Posts
                <span className="text-gray-400 text-sm font-normal">({posts.length})</span>
              </h2>
            </div>

            {posts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {posts.map((post, index) => (
                  <div
                    key={index}
                    className="relative aspect-square overflow-hidden rounded-xl border border-rose-100 group bg-white"
                  >
                    <img
                      src={post}
                      alt={`Post ${index + 1}`}
                      className="h-full w-full object-cover transition group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-rose-200 bg-white py-20 text-gray-400">
                <svg className="w-12 h-12 mb-3 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p className="text-sm">No posts yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}