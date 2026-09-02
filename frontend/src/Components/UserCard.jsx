import React, { useState } from 'react'
import { addInterest } from '../api/addInterest'
import toggleShortlist from '../api/toggleShortlist'
import { useAuth } from '../contex/AuthContex'
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
  const { user: currentUser, setUser: setCurrentUser } = useAuth()
  const [interestSent, setInterestSent] = useState(false)
  const isMale = user?.gender === 'male'
  const defaultAvatar = isMale ? default_profile_male : default_profile_female
  const hasPhoto = Boolean(user?.avatar || user?.image)

  const isShortlisted = currentUser?.shortlisted?.some(
    (u) => (u._id || u) === (user?._id || user?.id)
  )

  const name         = user?.name || 'Profile'
  const age          = user?.age
  const height       = user?.height
  const city         = user?.city || user?.location?.split(',')?.[0]?.trim() || null
  const location     = user?.location || user?.city || null
  const gender       = user?.gender
  const religion     = user?.religion || user?.community || user?.caste || null
  const motherTongue = user?.motherTongue || null
  const maritalStatus= user?.maritalStatus || null
  const education    = user?.education || null
  const occupation   = user?.occupation || null
  const income       = user?.income || user?.annualIncome || user?.salary || null
  const photoCount   = user?.photoCount || user?.photos?.length || 1

  const handleInterest = async (e) => {
    e.stopPropagation()
    const response = await addInterest(user)
    if (response) { setInterestSent(true); alert('Interest request has been sent') }
  }

  const handleShortlist = async (e) => {
    e.stopPropagation()
    const targetUserId = user?._id || user?.id
    if (!targetUserId) return
    const response = await toggleShortlist(targetUserId)
    if (response.success) {
      // Update local state if needed
      setCurrentUser(prev => ({
        ...prev,
        shortlisted: response.shortlisted
      }))
    } else {
      alert(response.message)
    }
  }

  const handlePrimaryAction = async (e) => {
    e.stopPropagation()
    if (onPrimaryAction) { await onPrimaryAction(user); return }
    await handleInterest(e)
  }

  const handleSecondaryAction = async (e) => {
    e.stopPropagation()
    if (onSecondaryAction) await onSecondaryAction(user)
  }

  const genderGradient = isMale
    ? 'from-blue-500/20 to-blue-500/5'
    : 'from-pink-500/20 to-pink-500/5'

  const genderBadge = isMale
    ? 'bg-blue-50 text-blue-600 ring-1 ring-blue-100'
    : 'bg-pink-50 text-pink-600 ring-1 ring-pink-100'

  const details = [
    city          && { title: 'City',           value: city },
    religion      && { title: 'Religion',        value: religion },
    motherTongue  && { title: 'Mother Tongue',   value: motherTongue },
    maritalStatus && { title: 'Marital Status',  value: maritalStatus },
    education     && { title: 'Education',       value: education },
    occupation    && { title: 'Occupation',      value: occupation },
    income        && { title: 'Annual Income',   value: income },
    height        && { title: 'Height',          value: height },
  ].filter(Boolean)

  return (
    <article
      className="group relative flex overflow-hidden rounded-3xl border border-[#FECDD3] bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#B91C1C]/40 hover:shadow-lg"
      style={{ animationDelay: delay }}
    >
      {/* ─────────────── LEFT: Photo Panel ─────────────── */}
      <div className="relative w-[220px] shrink-0 overflow-hidden sm:w-[260px]">

        {/* Photo */}
        <img
          src={hasPhoto ? (user.avatar || user.image) : defaultAvatar}
          alt={name}
          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = defaultAvatar }}
          className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />

        {/* Gradient overlay bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* Top badges */}
        <div className="absolute left-2.5 top-2.5 flex flex-col gap-1.5">
          {/* Photo count */}
          <div className="flex items-center gap-1 rounded-lg bg-black/50 px-2 py-1 text-[10px] font-semibold text-white backdrop-blur-md">
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {photoCount}
          </div>
        </div>

        {/* Active dot + label */}
        <div className="absolute right-2.5 top-2.5">
          <span className="flex items-center gap-1 rounded-full bg-green-500/90 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
            Online
          </span>
        </div>

        {/* Bottom: Name on photo */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <p className="truncate text-sm font-bold text-white drop-shadow">
            {name}{age ? `, ${age}` : ''}
          </p>
          {height && (
            <p className="text-[11px] text-white/80">{height}</p>
          )}
        </div>
      </div>

      {/* ─────────────── RIGHT: Content Panel ─────────────── */}
      <div className="flex flex-1 flex-col min-w-0">

        {/* Top accent bar */}
        <div className={`h-1 w-full bg-gradient-to-r from-red-800 to-red-700`} />

        {/* Main clickable info */}
        <button
          onClick={onClick}
          className="flex flex-1 flex-col px-5 pt-4 pb-3 text-left focus:outline-none"
        >

          {/* Header row */}
          <div className="mb-3 flex items-start justify-between gap-2">
            <div>
              <h2 className="text-xl font-bold text-[#1C1917] leading-tight">
                {name}
                {age && <span className="ml-1.5 text-lg font-normal text-[#5C574F]">{age}</span>}
              </h2>
              {location && (
                <p className="mt-0.5 flex items-center gap-1 text-xs text-[#A39E96]">
                  <svg className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {location}
                </p>
              )}
            </div>

            {/* Gender + New badges */}
            <div className="flex shrink-0 flex-col items-end gap-1">
              {gender && (
                <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold capitalize ${genderBadge}`}>
                  {gender}
                </span>
              )}
              {user?.isJustJoined && (
                <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-600 ring-1 ring-amber-100">
                  New ✨
                </span>
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="mb-3 h-px bg-gradient-to-r from-[#FECDD3] to-transparent" />

          {/* Details grid — label / value */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-3">
            {details.map(({ title, value }, i) => (
              <div key={i} className="flex flex-col gap-0.5">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-[#A39E96]">
                  {title}
                </span>
                <span className="truncate text-sm font-medium text-[#1C1917]">{value}</span>
              </div>
            ))}
          </div>
        </button>

        {/* ── Action Bar ── */}
        {(showInterestButton || showActions) && (
          <div className="border-t border-[#FFE4E6] bg-[#FFF8F8] px-4 py-3">
            {showActions ? (
              <div className="flex gap-2.5">
                <button
                  onClick={handlePrimaryAction}
                  disabled={primaryActionDisabled}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#B91C1C] py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#991B1B] hover:shadow-md active:scale-95 disabled:opacity-60"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  {primaryActionLabel}
                </button>
                <button
                  onClick={handleSecondaryAction}
                  disabled={secondaryActionDisabled}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-[#FECDD3] bg-white py-2.5 text-sm font-semibold text-[#5C574F] transition-all hover:border-red-300 hover:bg-red-50 hover:text-red-500 active:scale-95 disabled:opacity-60"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  {secondaryActionLabel}
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                {/* Send Interest — primary */}
                <button
                  onClick={handleInterest}
                  disabled={interestSent}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition-all active:scale-95 ${
                    interestSent
                      ? 'bg-[#FFE4E6] text-[#B91C1C] cursor-default'
                      : 'bg-[#B91C1C] text-white hover:bg-[#991B1B] shadow-sm hover:shadow-md'
                  }`}
                >
                  <svg className="h-4 w-4" fill={interestSent ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  {interestSent ? 'Interest Sent' : 'Send Interest'}
                </button>

                {/* Shortlist */}
                <button
                  onClick={handleShortlist}
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#FECDD3] transition active:scale-95 ${
                    isShortlisted
                      ? 'bg-amber-50 text-amber-500 border-amber-300'
                      : 'bg-white text-[#A39E96] hover:border-amber-300 hover:bg-amber-50 hover:text-amber-500'
                  }`}
                  title={isShortlisted ? 'Remove from Shortlist' : 'Shortlist'}
                >
                  <svg className="h-4 w-4" fill={isShortlisted ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </button>

                {/* Ignore */}
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#FECDD3] bg-white text-[#A39E96] transition hover:border-red-200 hover:bg-red-50 hover:text-red-400 active:scale-95"
                  title="Ignore"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </article>
  )
}