import React from 'react'
import LocationIcon from './LocationIcon'
import { addInterest } from '../api/addInterest'
import default_image from '../assets/default_image.webp'

export default function UserCard({ user, delay = '0ms', onClick }) {
  const defaultAvatar = default_image

  const handleInterest = async (e) => {
    e.stopPropagation()
    const response = await addInterest(user)
    if (response) {
      alert('Interest request has been sent')
    }
  }

  const details = [
    { label: 'Gender', value: user.gender },
    { label: 'Occupation', value: user.occupation },
    { label: 'Religion', value: user.religion },
  ].filter((item) => item.value)

  return (
    <article
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-rose-100 bg-white shadow-sm
                 transition-all duration-300 ease-out
                 hover:-translate-y-1.5 hover:shadow-xl hover:border-rose-200
                 animate-fade-in-up"
      style={{ animationDelay: delay }}
    >
      {/* Clickable area */}
      <button
        onClick={onClick}
        className="flex w-full flex-1 flex-col text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D48] focus-visible:ring-offset-2"
      >
        {/* Portrait */}
        <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
          <img
            src={user.avatar || user.image || defaultAvatar}
            alt={user.name}
            onError={(event) => {
              event.currentTarget.onerror = null
              event.currentTarget.src = defaultAvatar
            }}
            className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
          />

          {/* Bottom gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

          {/* Age badge */}
          {user.age && (
            <div className="absolute top-3 right-3 flex h-8 min-w-[32px] items-center justify-center rounded-full bg-[#E11D48] px-2.5 text-sm font-semibold text-white shadow-md ring-2 ring-white/40">
              {user.age}
            </div>
          )}

          {/* Name + location */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h2 className="mb-0.5 truncate text-lg font-semibold text-white drop-shadow-sm">
              {user.name}
            </h2>
            {user.location && (
              <p className="flex items-center gap-1.5 text-sm text-white/90">
                <LocationIcon className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{user.location}</span>
              </p>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-4">
          {/* Bio */}
          {user.bio && (
            <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-gray-600">
              {user.bio}
            </p>
          )}

          {/* Gender · Occupation · Religion */}
          {details.length > 0 && (
            <div className="mt-auto space-y-2">
              {details.map(({ label, value }) => (
                <div
                  key={label}
                  className="flex items-center justify-between gap-3 rounded-lg bg-rose-50/60 border border-rose-100 px-3 py-2"
                >
                  <span className="text-xs text-gray-500">{label}</span>
                  <span className="truncate text-sm font-medium text-gray-800">{value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </button>

      {/* Show Interest CTA */}
      <div className="px-4 pb-4">
        <button
          onClick={handleInterest}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#E11D48] py-2.5 text-sm font-semibold text-white
                     shadow-sm transition-all duration-200
                     hover:bg-[#C9183B] hover:shadow-md
                     active:scale-[0.98]"
        >
          <span>Show Interest</span>
          <svg
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>
    </article>
  )
}