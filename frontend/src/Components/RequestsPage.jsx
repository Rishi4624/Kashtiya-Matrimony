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
    () => new Set((acceptedUsers || []).map((acceptedUser) => String(acceptedUser?._id || acceptedUser?.id))),
    [acceptedUsers],
  )

  const pendingUsers = useMemo(
    () => (likedUsers || []).filter((likedUser) => !acceptedUserIds.has(String(likedUser?._id || likedUser?.id))),
    [likedUsers, acceptedUserIds],
  )

  const removeUserFromLikes = (userId) => {
    setUser((currentUser) => {
      if (!currentUser) return currentUser

      const currentLikes = currentUser.likes || currentUser.like || []
      const nextLikes = currentLikes.filter((item) => String(item?._id || item?.id) !== String(userId))

      return {
        ...currentUser,
        likes: nextLikes,
      }
    })
  }

  const handleAcceptUser = async (likedUser) => {
    const userId = likedUser?._id || likedUser?.id
    if (!userId) return

    const response = await acceptInterest(userId)
    if (response?.success) {
      setUser((currentUser) => {
        if (!currentUser) return currentUser

        const currentAccepted = currentUser.acceptedChats || []
        const exists = currentAccepted.some((item) => String(item?._id || item?.id) === String(userId))

        return {
          ...currentUser,
          likes: (currentUser.likes || currentUser.like || []).filter(
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
      removeUserFromLikes(userId)
    }
  }

  const renderRequestCards = (users, includeHistory = false) => {
    if (!users.length) {
      return (
        <div className="rounded-2xl border border-dashed border-[#E8E0D5] bg-[#F7F3EE] p-8 text-center text-sm text-[#5C574F]">
          {includeHistory ? 'No accepted requests yet.' : 'No incoming requests right now.'}
        </div>
      )
    }

    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {users.map((userItem, index) => (
          <UserCard
            key={userItem?._id || userItem?.id || `request-user-${index}`}
            user={userItem}
            delay={`${(index + 1) * 0.04}s`}
            showInterestButton={false}
            showActions={!includeHistory}
            primaryActionLabel={includeHistory ? 'Start chat' : 'Accept'}
            secondaryActionLabel={includeHistory ? 'View profile' : 'Reject'}
            primaryActionDisabled={includeHistory}
            onPrimaryAction={includeHistory
              ? () => navigate(`/chat/${userItem?._id || userItem?.id}`, { state: { user: userItem } })
              : handleAcceptUser}
            onSecondaryAction={includeHistory
              ? () => navigate(`/profile/${userItem?._id || userItem?.id}`, { state: { user: userItem } })
              : handleRejectUser}
            onClick={() => navigate(`/profile/${userItem?._id || userItem?.id}`, { state: { user: userItem } })}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F7F3EE] px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#C4782A]">
            Requests
          </p>
          <h1 className="font-serif text-3xl font-medium text-[#1A1916] sm:text-4xl">
            Matches and requests
          </h1>
        </div>

        <div className="mb-6 inline-flex rounded-full border border-[#E8E0D5] bg-[#FBF8F4] p-1 shadow-sm">
          {[
            { key: 'requests', label: 'Requests' },
            { key: 'history', label: 'History' },
          ].map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                activeTab === tab.key
                  ? 'bg-[#1A1916] text-white shadow-sm'
                  : 'text-[#5C574F] hover:text-[#1A1916]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'requests' ? (
          <div className="rounded-3xl border border-[#E8E0D5] bg-[#FBF8F4] p-4 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center justify-between gap-3">
              <h2 className="font-serif text-2xl font-medium text-[#1A1916]">All requests</h2>
              <span className="rounded-full bg-[#F2E7DA] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#7A4C1F]">
                {pendingUsers.length}
              </span>
            </div>
            {renderRequestCards(pendingUsers, false)}
          </div>
        ) : (
          <div className="rounded-3xl border border-[#E8E0D5] bg-[#FBF8F4] p-4 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center justify-between gap-3">
              <h2 className="font-serif text-2xl font-medium text-[#1A1916]">Accepted history</h2>
              <span className="rounded-full bg-[#F2E7DA] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#7A4C1F]">
                {acceptedUsers.length}
              </span>
            </div>
            {renderRequestCards(acceptedUsers, true)}
          </div>
        )}
      </div>
    </div>
  )
}
