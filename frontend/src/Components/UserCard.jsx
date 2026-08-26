import React from 'react'
import LocationIcon from './LocationIcon'
import { addInterest } from '../api/addInterest'
import default_image from '../assets/default_image.webp'
 
export default function UserCard({ user, delay = '0ms', onClick }) {
  const defaultAvatar = default_image;
  const hobbies = Array.isArray(user.hobbies) ? user.hobbies : []
  const interests = Array.isArray(user.interests) ? user.interests : []
 
  const handleInterest = async (e) => {
    e.stopPropagation()
    console.log('Interest clicked for:', user.name)
 
    const response = await addInterest(user)
    if (response) {
      alert('Interest request has been sent')
    }
  }
 
  return (
    <article
      className="group relative flex h-full flex-col bg-white rounded-xl border border-gray-200
                 overflow-hidden shadow-sm
                 transition-all duration-300 ease-out
                 hover:-translate-y-1 hover:shadow-lg hover:border-rose-200
                 animate-fade-in-up"
      style={{ animationDelay: delay }}
    >
      {/* Clickable card area */}
      <button
        onClick={onClick}
        className="flex w-full flex-1 flex-col text-left focus:outline-none focus-visible:ring-2
                   focus-visible:ring-rose-500 focus-visible:ring-offset-2"
      >
        {/* Portrait */}
        <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
          <img
            src={user.avatar || defaultAvatar}
            alt={user.name}
            onError={(event) => {
              event.currentTarget.onerror = null
              event.currentTarget.src = defaultAvatar
            }}
            className="w-full h-full object-cover object-top
                       transition-transform duration-500 ease-out
                       group-hover:scale-105"
          />
 
          {/* Soft bottom gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t
                          from-black/70 via-black/20 to-transparent" />
 
          {/* Age badge */}
          <div className="absolute top-3 right-3 min-w-[36px] h-9 px-2 rounded-full
                          bg-rose-600 text-white
                          flex items-center justify-center font-semibold text-sm
                          shadow-md border border-white/30">
            {user.age}
          </div>
 
          {/* Name + location overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h2 className="text-lg font-semibold text-white mb-0.5 drop-shadow-sm">
              {user.name}
            </h2>
            <p className="text-white/90 text-sm flex items-center gap-1.5">
              <LocationIcon className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{user.location}</span>
            </p>
          </div>
        </div>
 
        {/* Content below image */}
        <div className="p-4">
          {/* Bio */}
          {user.bio && (
            <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-2">
              {user.bio}
            </p>
          )}
 
          {/* Hobbies */}
          {hobbies.length > 0 && (
            <div className="mb-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                Hobbies
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {hobbies.slice(0, 4).map((hobby) => (
                  <span
                    key={hobby}
                    className="px-2.5 py-1 text-xs font-medium rounded-full
                               bg-rose-50 text-rose-700
                               border border-rose-100"
                  >
                    {hobby}
                  </span>
                ))}
                {hobbies.length > 4 && (
                  <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-gray-50 text-gray-500 border border-gray-100">
                    +{hobbies.length - 4}
                  </span>
                )}
              </div>
            </div>
          )}
 
          {/* Interests */}
          {interests.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                Interests
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {interests.slice(0, 4).map((interest) => (
                  <span
                    key={interest}
                    className="px-2.5 py-1 text-xs font-medium rounded-full
                               bg-pink-50 text-pink-700
                               border border-pink-100"
                  >
                    {interest}
                  </span>
                ))}
                {interests.length > 4 && (
                  <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-gray-50 text-gray-500 border border-gray-100">
                    +{interests.length - 4}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </button>
 
      {/* Show Interest CTA */}
      <div className="px-4 pb-4 pt-0 ">
        <button
          onClick={handleInterest}
          className="w-full py-2.5 rounded-lg font-semibold text-white text-sm
                     bg-rose-600 hover:bg-rose-700
                     active:scale-[0.98]
                     shadow-sm hover:shadow-md
                     transition-all duration-200
                     flex items-center justify-center gap-2"
        >
          <span>Show Interest</span>
          <svg
            className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
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
 