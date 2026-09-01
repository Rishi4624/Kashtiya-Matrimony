import React from 'react'
import { addInterest } from '../api/addInterest'
import default_profile_male from '../assets/default-profile-male.jpg'
import default_profile_female from '../assets/default-profile-female.jpg'

export default function UserCard({
  user,
  delay = '0ms',
  onClick,
  showInterestButton = true,
  showActions = false,
  primaryActionLabel = 'Accept',
  onPrimaryAction,
  primaryActionDisabled = false,
  secondaryActionLabel = 'Reject',
  onSecondaryAction,
  secondaryActionDisabled = false,
}) {
  const isMale = user?.gender === 'male'
  const defaultAvatar = isMale ? default_profile_male : default_profile_female
  const hasPhoto = Boolean(user?.avatar || user?.image)

  const name = user?.name || 'Profile'
  const age = user?.age
  const height = user?.height || '—'
  const location = user?.location || user?.city || '—'
  const community = user?.community || user?.caste || user?.religion || '—'
  const occupation = user?.occupation || '—'
  const income = user?.income || user?.salary || 'No Income'
  const education = user?.education || '—'
  const maritalStatus = user?.maritalStatus || 'Never Married'
  const photoCount = user?.photoCount || user?.photos?.length || 1

  const handleInterest = async (e) => {
    e.stopPropagation()
    const response = await addInterest(user)
    if (response) alert('Interest request has been sent')
  }

  const handlePrimaryAction = async (e) => {
    e.stopPropagation()
    if (onPrimaryAction) {
      await onPrimaryAction(user)
      return
    }
    await handleInterest(e)
  }

  const handleSecondaryAction = async (e) => {
    e.stopPropagation()
    if (onSecondaryAction) await onSecondaryAction(user)
  }

  return (
    <article
      className="group flex overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md animate-fade-in-up"
      style={{ animationDelay: delay }}
    >
      {/* ========== LEFT: Photo ========== */}
      <div className="relative w-[140px] flex-shrink-0 overflow-hidden sm:w-[160px]">
        {hasPhoto ? (
          <img
            src={user.avatar || user.image}
            alt={name}
            onError={(e) => {
              e.currentTarget.onerror = null
              e.currentTarget.src = defaultAvatar
            }}
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
        ) : (
          <div className="flex h-full min-h-[180px] w-full flex-col items-center justify-center bg-gradient-to-br from-slate-700 to-slate-900 p-3 text-white">
            <div className="mb-2 h-12 w-12 rounded-full bg-white/20" />
            <span className="text-[10px] uppercase tracking-wider text-white/70">No photo</span>
          </div>
        )}

        {/* Photo count badge */}
        <div className="absolute right-2 top-2 flex items-center gap-1 rounded-md bg-black/50 px-1.5 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {photoCount}
        </div>
      </div>

      {/* ========== RIGHT: Content ========== */}
      <div className="flex flex-1 flex-col">
        {/* Clickable info area */}
        <button
          onClick={onClick}
          className="flex flex-1 flex-col px-4 pt-3 pb-2 text-left focus:outline-none"
        >
          {/* Top row: Active Today + badges */}
          <div className="mb-1 flex items-start justify-between gap-2">
            <span className="text-xs text-gray-500">Active Today</span>

            <div className="flex flex-wrap items-center justify-end gap-1.5">
              {user?.isJustJoined && (
                <span className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white px-2.5 py-0.5 text-[11px] font-medium text-gray-600">
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  Just Joined
                </span>
              )}
              {user?.isPro && (
                <span className="rounded bg-rose-500 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                  Pro Mini
                </span>
              )}
              {user?.isMostCompatible && (
                <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2 py-0.5 text-[11px] font-medium text-rose-500">
                  <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.834a1 1 0 001.207.97l4.5-1.25A1 1 0 0012 15v-5.667a1 1 0 00-.793-.97l-4.5-1.25A1 1 0 006 10.333z" />
                  </svg>
                  Most Compatible
                </span>
              )}
            </div>
          </div>

          {/* Name + Age */}
          <h2 className="text-lg font-semibold text-gray-900 sm:text-xl">
            {name}{age ? `, ${age}` : ''}
          </h2>

          {/* Height • City • Community */}
          <p className="mt-0.5 text-sm text-gray-600">
            {[height, location, community].filter(Boolean).join(' • ')}
          </p>

          {/* Occupation • Income */}
          <p className="mt-1.5 flex items-center gap-1.5 text-sm text-gray-700">
            <span className="text-gray-400">💼</span>
            {occupation} • {income}
          </p>

          {/* Education • Marital Status */}
          <p className="mt-1 flex items-center gap-1.5 text-sm text-gray-700">
            <span className="text-gray-400">🎓</span>
            {education}
            <span className="mx-1 text-gray-300">•</span>
            <span className="text-gray-400">💍</span>
            {maritalStatus}
          </p>
        </button>

        {/* ========== Action bar ========== */}
        {(showInterestButton || showActions) && (
          <div className="border-t border-rose-50 bg-rose-50/40 px-2 py-2.5">
            {showActions ? (
              <div className="flex gap-2 px-1">
                <button
                  onClick={handlePrimaryAction}
                  disabled={primaryActionDisabled}
                  className="flex-1 rounded-lg bg-[#C4782A] py-2 text-sm font-semibold text-white transition hover:bg-[#A8651F] disabled:opacity-60"
                >
                  {primaryActionDisabled ? 'Start chat' : primaryActionLabel}
                </button>
                <button
                  onClick={handleSecondaryAction}
                  disabled={secondaryActionDisabled}
                  className="flex-1 rounded-lg border border-gray-200 bg-white py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-60"
                >
                  {secondaryActionLabel}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-1 text-center text-sm font-medium text-rose-500">
                <button
                  onClick={handleInterest}
                  className="flex flex-col items-center gap-0.5 rounded-lg py-1.5 transition hover:bg-rose-100"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 11l5-5m0 0l5 5m-5-5v12" />
                  </svg>
                  <span className="text-[11px]">Interest</span>
                </button>

                <button className="flex flex-col items-center gap-0.5 rounded-lg py-1.5 transition hover:bg-rose-100">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                  <span className="text-[11px]">Shortlist</span>
                </button>

                <button className="flex flex-col items-center gap-0.5 rounded-lg py-1.5 transition hover:bg-rose-100">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="text-[11px]">Ignore</span>
                </button>

                <button className="flex flex-col items-center gap-0.5 rounded-lg py-1.5 transition hover:bg-rose-100">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span className="text-[11px]">Chat</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </article>
  )
}