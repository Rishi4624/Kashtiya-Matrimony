import { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { addInterest } from '../api/addInterest'

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
      <div className="flex min-h-screen items-center justify-center bg-[#F7F3EE]">
        <div className="text-center">
          <p className="mb-4 text-lg text-[#5C574F]">User not found</p>
          <button
            onClick={() => navigate('/')}
            className="rounded-xl bg-[#C4782A] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#A8651F]"
          >
            Go Home
          </button>
        </div>
      </div>
    )
  }

  const posts = user.posts || []
  const interests = user.interests || user.hobbies || []

  const detailGrid = [
    { label: 'Age', value: user.age ? `${user.age} years` : null },
    { label: 'Height', value: user.height },
    { label: 'City', value: user.location },
    { label: 'Community', value: user.religion },
    { label: 'Education', value: user.education },
    { label: 'Diet', value: user.diet },
    { label: 'Profession', value: user.occupation },
    { label: 'Languages', value: user.motherTongue },
    { label: 'Gender', value: user.gender },
    { label: 'Marital status', value: user.maritalStatus },
    { label: 'Smoking', value: user.smoking },
    { label: 'Drinking', value: user.drinking },
  ].filter((item) => item.value)

  const handleInterest = async () => {
    const response = await addInterest(user)
    if (response) {
      alert('Interest request has been sent')
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F3EE]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-[#C4782A] transition hover:text-[#A8651F]"
        >
          ← All profiles
        </button>

        {/* Main layout */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          {/* ========== LEFT: PHOTO ========== */}
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-3xl border border-[#E8E0D5] bg-[#FBF8F4] shadow-sm">
              <div className="aspect-[4/5] overflow-hidden bg-[#E8E0D5]">
                <img
                  src={user.image || user.avatar || 'https://via.placeholder.com/600x750'}
                  alt={user.name}
                  className="h-full w-full object-cover object-top"
                />
              </div>
              <div className="flex items-center justify-between px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#A39E96]">
                <span>ID verified</span>
                <span>Photo visible to members</span>
              </div>
            </div>

            {/* Posts grid under photo (if any) */}
            {posts.length > 0 && (
              <div className="mt-5">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#A39E96]">
                  Photos ({posts.length})
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {posts.slice(0, 6).map((post, index) => (
                    <div
                      key={index}
                      className="aspect-square overflow-hidden rounded-xl border border-[#E8E0D5] bg-white"
                    >
                      <img src={post} alt={`Post ${index + 1}`} className="h-full w-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ========== RIGHT: DETAILS ========== */}
          <div className="lg:col-span-7">
            {/* Community · City */}
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#C4782A]">
              {[user.religion, user.location].filter(Boolean).join(' · ') || 'Profile'}
            </p>

            {/* Name */}
            <h1 className="font-serif text-3xl sm:text-4xl font-medium text-[#1A1916]">
              {user.name}
            </h1>

            {/* Age · Profession */}
            <p className="mt-2 text-sm text-[#5C574F]">
              {[user.age, user.occupation].filter(Boolean).join(' · ') || '—'}
            </p>

            {/* Bio */}
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#5C574F]">
              {user.bio || 'No bio available.'}
            </p>

            {/* Detail grid */}
            {detailGrid.length > 0 && (
              <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-3 border-t border-[#E8E0D5] pt-6">
                {detailGrid.map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-[#A39E96]">
                      {label}
                    </p>
                    <p className="mt-1 text-sm font-medium text-[#1A1916]">{value}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Family + Looking for */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {user.familyDetails && (
                <div className="rounded-2xl border border-[#E8E0D5] bg-[#FBF8F4] p-4">
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-[#A39E96]">
                    Family
                  </p>
                  <p className="text-sm leading-relaxed text-[#5C574F]">{user.familyDetails}</p>
                </div>
              )}
              {(user.lookingFor || user.partnerPreference) && (
                <div className="rounded-2xl border border-[#E8E0D5] bg-[#FBF8F4] p-4">
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-[#A39E96]">
                    Looking for
                  </p>
                  <p className="text-sm leading-relaxed text-[#5C574F]">
                    {user.lookingFor || user.partnerPreference}
                  </p>
                </div>
              )}
            </div>

            {/* Interests */}
            {interests.length > 0 && (
              <div className="mt-8">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-[#A39E96]">
                  Interests
                </p>
                <div className="flex flex-wrap gap-2">
                  {interests.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-[#E8E0D5] bg-white px-3.5 py-1.5 text-sm text-[#5C574F]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={handleInterest}
                className="rounded-xl bg-[#C4782A] px-6 py-3 text-sm font-semibold text-white
                           shadow-sm transition-all duration-200
                           hover:bg-[#A8651F] hover:shadow-md active:scale-[0.98]"
              >
                Send an interest
              </button>
              <button
                type="button"
                className="rounded-xl border border-[#E8E0D5] bg-white px-6 py-3 text-sm font-semibold text-[#5C574F]
                           transition hover:border-[#C4782A] hover:text-[#C4782A]"
              >
                Share with family
              </button>
            </div>

            <p className="mt-3 text-xs text-[#A39E96]">
              Contact details are shared only after both sides accept.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}