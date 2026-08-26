import React from 'react'
import { addInterest } from '../api/addInterest'
import default_profile_male from '../assets/default-profile-male.jpg'
import default_profile_female from '../assets/default-profile-female.jpg'

export default function UserCard({ user, delay = '0ms', onClick }) {
  const defaultAvatar = user.avatar ? user.avatar : default_profile_male;
  const defaultAvatar_female = user.avatar ? user.avatar : default_profile_female;

  const handleInterest = async (e) => {
    e.stopPropagation()
    const response = await addInterest(user)
    if (response) {
      alert('Interest request has been sent')
    }
  }

  return (
    <article
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#E8E0D5] bg-[#FBF8F4]
                 shadow-sm transition-all duration-300 ease-out
                 hover:-translate-y-1 hover:shadow-lg hover:border-[#D4A574]
                 animate-fade-in-up"
      style={{ animationDelay: delay }}
    >
      {/* Clickable portrait + info */}
      <button
        onClick={onClick}
        className="flex w-full flex-1 flex-col text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C4782A] focus-visible:ring-offset-2"
      >
        {/* Photo */}
        <div className="relative aspect-[4/5] overflow-hidden bg-[#E8E0D5]">
          <img
            src={user.avatar || user.image || user.gender == 'male'?defaultAvatar : defaultAvatar_female}
            alt={user.name}
            onError={(event) => {
              event.currentTarget.onerror = null
              event.currentTarget.src = defaultAvatar
            }}
            className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />

          {/* Verified badge */}
          <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#5C574F] shadow-sm backdrop-blur-sm">
            Verified
          </span>
        </div>

        {/* Content below photo */}
        <div className="flex flex-1 flex-col px-4 pb-4 pt-3.5">
          {/* Age · City */}
          <div className="mb-1.5 flex items-center justify-between gap-2 text-[11px] font-medium uppercase tracking-wider text-[#A39E96]">
            <span>{user.age ? `${user.age} yrs` : '—'}</span>
            <span className="truncate">{user.location || '—'}</span>
          </div>

          {/* Name */}
          <h2 className="truncate font-serif text-lg font-medium text-[#1A1916]">
            {user.name}
          </h2>

          {/* Occupation */}
          {user.occupation && (
            <p className="mt-0.5 truncate text-sm text-[#5C574F]">
              {user.occupation}
            </p>
          )}

          {/* Community / Religion */}
          {user.religion && (
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-wider text-[#A39E96]">
              {user.religion}
            </p>
          )}
        </div>
      </button>

      {/* Show Interest */}
      <div className="px-4 pb-4">
        <button
          onClick={handleInterest}
          className="w-full rounded-xl bg-[#C4782A] py-2.5 text-sm font-semibold text-white
                     shadow-sm transition-all duration-200
                     hover:bg-[#A8651F] hover:shadow-md
                     active:scale-[0.98]"
        >
          Send an interest
        </button>
      </div>
    </article>
  )
}