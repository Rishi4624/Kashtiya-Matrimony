import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import acceptInterest from '../api/acceptInterest'
import rejectInterest from '../api/rejectInterest'
import { useAuth } from '../contex/AuthContex.jsx'
import UserCard from './UserCard.jsx'

export default function RequestsPage() {
  const navigate = useNavigate()
  const { user, setUser } = useAuth()
  const [activeTab, setActiveTab] = useState('requests')

  const likedUsers = user?.likes || user?.like || []
  const acceptedUsers = user?.acceptedChats || []

  const acceptedUserIds = useMemo(
    () => new Set((acceptedUsers || []).map((u) => String(u?._id || u?.id))),
    [acceptedUsers],
  )

  const pendingUsers = useMemo(
    () => (likedUsers || []).filter((u) => !acceptedUserIds.has(String(u?._id || u?.id))),
    [likedUsers, acceptedUserIds],
  )

  const handleAcceptUser = async (likedUser) => {
    const userId = likedUser?._id || likedUser?.id
    if (!userId) return
    const response = await acceptInterest(userId)
    if (response?.success) {
      setUser((current) => {
        if (!current) return current
        const currentAccepted = current.acceptedChats || []
        const exists = currentAccepted.some((item) => String(item?._id || item?.id) === String(userId))
        return {
          ...current,
          likes: (current.likes || current.like || []).filter(
            (item) => String(item?._id || item?.id) !== String(userId),
          ),
          acceptedChats: exists ? currentAccepted : [...currentAccepted, likedUser],
        }
      })
    }
  }

  const handleRejectUser = async (likedUser) => {
    const userId = likedUser?._id || likedUser?.id
    if (!userId) return
    const response = await rejectInterest(userId)
    if (response?.success) {
      setUser((current) => {
        if (!current) return current
        const currentLikes = current.likes || current.like || []
        return {
          ...current,
          likes: currentLikes.filter((item) => String(item?._id || item?.id) !== String(userId)),
        }
      })
    }
  }

  const renderCards = (users, isHistory = false) => {
    if (!users.length) {
      return (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#FECDD3] bg-[#FFF5F5] py-16 text-center">
          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#FFE4E6]">
            <svg className="h-7 w-7 text-[#B91C1C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <p className="text-sm font-medium text-[#5C574F]">
            {isHistory ? 'No accepted requests yet.' : 'No incoming requests right now.'}
          </p>
          <p className="mt-1 text-xs text-[#A39E96]">
            {isHistory
              ? 'Accept a request to start chatting.'
              : 'When someone likes your profile, they will appear here.'}
          </p>
        </div>
      )
    }

    return (
      <div className="flex flex-col gap-4">
        {users.map((userItem, index) => (
          <UserCard
            key={userItem?._id || userItem?.id || `req-${index}`}
            user={userItem}
            delay={`${(index + 1) * 0.05}s`}
            showInterestButton={false}
            showActions={true}
            primaryActionLabel={isHistory ? 'Start Chat' : 'Accept'}
            secondaryActionLabel={isHistory ? 'View Profile' : 'Reject'}
            primaryActionDisabled={false}
            onPrimaryAction={
              isHistory
                ? () => navigate(`/chat/${userItem?._id || userItem?.id}`, { state: { user: userItem } })
                : handleAcceptUser
            }
            onSecondaryAction={
              isHistory
                ? () => navigate(`/profile/${userItem?._id || userItem?.id}`, { state: { user: userItem } })
                : handleRejectUser
            }
            onClick={() =>
              navigate(`/profile/${userItem?._id || userItem?.id}`, { state: { user: userItem } })
            }
          />
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FFF5F5] px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-8">
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#B91C1C]">
            Requests
          </p>
          <h1 className="font-serif text-3xl font-medium text-[#1C1917] sm:text-4xl">
            Matches & Requests
          </h1>
          <p className="mt-1 text-sm text-[#A39E96]">
            People who are interested in connecting with you
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-6 inline-flex rounded-full border border-[#FECDD3] bg-[#FFF8F8] p-1 shadow-sm">
          {[
            { key: 'requests', label: 'Requests', count: pendingUsers.length },
            { key: 'history', label: 'Accepted', count: acceptedUsers.length },
          ].map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                activeTab === tab.key
                  ? 'bg-[#1C1917] text-white shadow-sm'
                  : 'text-[#5C574F] hover:text-[#1C1917]'
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                    activeTab === tab.key
                      ? 'bg-white/20 text-white'
                      : 'bg-[#FFE4E6] text-[#7A4C1F]'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Panel */}
        <div className="rounded-3xl border border-[#FECDD3] bg-[#FFF8F8] p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-serif text-xl font-medium text-[#1C1917]">
              {activeTab === 'requests' ? 'All Requests' : 'Accepted History'}
            </h2>
            <span className="rounded-full bg-[#FFE4E6] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#7A4C1F]">
              {activeTab === 'requests' ? pendingUsers.length : acceptedUsers.length}
            </span>
          </div>
          {activeTab === 'requests' ? renderCards(pendingUsers, false) : renderCards(acceptedUsers, true)}
        </div>

      </div>
    </div>
  )
}
