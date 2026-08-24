import React from 'react'
import LocationIcon from './LocationIcon'
import { addInterest } from '../api/addInterest'

export default function UserCard({ user, delay = '0ms', onClick }) {
  const hobbies = Array.isArray(user.hobbies) ? user.hobbies : []
  const interests = Array.isArray(user.interests) ? user.interests : []

  const handleInterest = async (e) => {
    e.stopPropagation()
    console.log('Interest clicked for:', user.name);

    const response = await addInterest(user);
    if(response){
      alert("Liked Request has sent");
    }

  }

  return (
    <article
      className="group relative bg-white/5 backdrop-blur-2xl border border-white/10 
                 rounded-2xl overflow-hidden
                 transition-all duration-400 ease-out
                 hover:-translate-y-1.5 hover:scale-[1.015]
                 hover:shadow-[0_20px_40px_-12px_rgba(6,182,212,0.3)]
                 hover:border-cyan-400/40
                 animate-fade-in-up"
      style={{ animationDelay: delay }}
    >
      {/* Clickable card area */}
      <button
        onClick={onClick}
        className="w-full text-left focus:outline-none focus-visible:ring-2 
                   focus-visible:ring-cyan-400 focus-visible:ring-offset-2 
                   focus-visible:ring-offset-[#0a0f1c]"
      >
        {/* Portrait - smaller height */}
        <div className="relative aspect-[4/5] overflow-hidden">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-full h-full object-cover object-top 
                       transition-transform duration-600 ease-out 
                       group-hover:scale-105"
          />

          {/* Soft gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t 
                          from-[#0a0f1c] via-[#0a0f1c]/45 to-transparent 
                          opacity-85 group-hover:opacity-95 transition-opacity" />

          {/* Age badge - smaller */}
          <div className="absolute top-3 right-3 w-9 h-9 rounded-full 
                          bg-gradient-to-br from-cyan-400 via-teal-400 to-indigo-500
                          flex items-center justify-center font-bold text-white text-xs
                          shadow-md shadow-cyan-500/40 border border-white/25">
            {user.age}
          </div>

          {/* Name + location */}
          <div className="absolute bottom-0 left-0 right-0 p-3.5 pb-4">
            <h2 className="text-lg font-semibold text-white mb-0.5 
                           drop-shadow-md group-hover:text-cyan-100 transition-colors">
              {user.name}
            </h2>
            <p className="text-cyan-200/85 text-xs flex items-center gap-1 font-medium">
              <LocationIcon className="w-3.5 h-3.5" />
              {user.location}
            </p>
          </div>
        </div>

        {/* Content below image */}
        <div className="p-3.5 pt-3">
          {/* Bio */}
          <p className="text-slate-300/90 text-xs leading-relaxed mb-3.5 line-clamp-2">
            {user.bio}
          </p>

          {/* Hobbies */}
          {hobbies.length > 0 && (
            <div className="mb-3">
              <h3 className="text-[10px] font-semibold uppercase tracking-wider 
                             text-slate-500 mb-1.5">
                Hobbies
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {hobbies.map((hobby) => (
                  <span
                    key={hobby}
                    className="px-2 py-1 text-[11px] font-medium rounded-full
                               bg-cyan-500/15 text-cyan-200
                               border border-cyan-400/25
                               transition-all duration-300
                               group-hover:bg-cyan-500/20"
                  >
                    {hobby}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Interests */}
          {interests.length > 0 && (
            <div className="mb-0.5">
              <h3 className="text-[10px] font-semibold uppercase tracking-wider 
                             text-slate-500 mb-1.5">
                Interests
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {interests.map((interest) => (
                  <span
                    key={interest}
                    className="px-2 py-1 text-[11px] font-medium rounded-full
                               bg-indigo-500/15 text-indigo-200
                               border border-indigo-400/20
                               transition-all duration-300
                               group-hover:bg-indigo-500/20"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </button>

      {/* Interest CTA - smaller */}
      <div className="px-3.5 pb-3.5">
        <button
          onClick={handleInterest}
          className="w-full py-2.5 rounded-xl font-medium text-white text-xs
                     bg-gradient-to-r from-cyan-500 via-teal-500 to-indigo-600
                     hover:from-cyan-400 hover:via-teal-400 hover:to-indigo-500
                     active:scale-[0.98]
                     shadow-md shadow-cyan-500/25
                     hover:shadow-cyan-500/40
                     transition-all duration-300
                     flex items-center justify-center gap-1.5"
        >
          <span>Show Interest</span>
          <svg
            className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
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