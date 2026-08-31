import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contex/AuthContex.jsx'

export default function ChatList() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()

  const connections = useMemo(() => {
    if (!user) return []

    const acceptedChats = user.acceptedChats || []
    const mutualLikes = (user.likes || []).filter((likedUser) =>
      (likedUser.likes || []).some(
        (likeId) => String(likeId?._id || likeId) === String(user._id || user.id),
      ),
    )

    return [...acceptedChats, ...mutualLikes].filter((connection, index, all) => {
      const connectionId = String(connection?._id || connection?.id)
      return connectionId !== String(user._id || user.id) &&
        all.findIndex((item) => String(item?._id || item?.id) === connectionId) === index
    })
  }, [user])

  if (loading) {
    return (
      <main className="min-h-[calc(100vh-65px)] bg-[#FBF7F2] px-4 py-12 text-center text-[#6B6258]">
        Loading chats...
      </main>
    )
  }

  return (
    <main className="min-h-[calc(100vh-65px)] bg-[#FBF7F2] px-4 py-8 sm:px-6">
      <section className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-[#EDE6DC] bg-white shadow-lg shadow-[#C45C3E]/10">
        <header className="border-b border-[#EDE6DC] px-5 py-5 sm:px-7">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#C45C3E]">
            Messages
          </p>
          <h1 className="mt-1 font-serif text-2xl font-medium text-[#2C2419]">
            Your chats
          </h1>
          <p className="mt-1 text-sm text-[#6B6258]">
            Select a connection to continue the conversation.
          </p>
        </header>

        {connections.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#C45C3E]/10 text-2xl">
              💬
            </div>
            <h2 className="font-serif font-medium text-[#2C2419]">No chats yet</h2>
            <p className="mt-1 text-sm text-[#6B6258]">
              Accept an interest to start chatting with a connection.
            </p>
            <button
              type="button"
              onClick={() => navigate('/home')}
              className="mt-5 rounded-full bg-[#C45C3E] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#A84B32]"
            >
              Find matches
            </button>
          </div>
        ) : (
          <div className="divide-y divide-[#EDE6DC]">
            {connections.map((connection) => {
              const connectionId = connection._id || connection.id
              const name = connection.name || 'Your connection'
              const avatar = connection.avatar || connection.image || connection.profilePic

              return (
                <button
                  key={connectionId}
                  type="button"
                  onClick={() => navigate(`/chat/${connectionId}`, { state: { user: connection } })}
                  className="flex w-full items-center gap-4 px-5 py-4 text-left transition hover:bg-[#FBF7F2] sm:px-7"
                >
                  <img
                    src={avatar || '/default-avatar.svg'}
                    alt={name}
                    className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-[#EDE6DC]"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-semibold text-[#2C2419]">{name}</span>
                    <span className="mt-0.5 block truncate text-sm text-[#6B6258]">
                      {[connection.location, connection.occupation].filter(Boolean).join(' · ') ||
                        'Connected match'}
                    </span>
                  </span>
                  <span className="text-xl text-[#C45C3E]" aria-hidden="true">
                    ›
                  </span>
                </button>
              )
            })}
          </div>
        )}
      </section>
    </main>
  )
}