import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { io } from 'socket.io-client'
import { useAuth } from '../contex/AuthContex.jsx'

export default function ChatBoard() {
  const { id: otherUserId } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const otherUser = location.state?.user
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')
  const [status, setStatus] = useState('Connecting...')
  const socketRef = useRef(null)
  const bottomRef = useRef(null)

  useEffect(() => {
    const socket = io(import.meta.env.VITE_AXIOS_API, { withCredentials: true })
    socketRef.current = socket

    socket.on('connect', () => {
      socket.emit('join-chat', otherUserId, (response) => {
        if (!response?.success) {
          setStatus(response?.message || 'Chat access denied')
          socket.disconnect()
          return
        }
        setMessages(response.messages || [])
        setStatus('Connected')
      })
    })
    socket.on('connect_error', () => setStatus('Unable to connect to chat'))
    socket.on('new-message', (message) => setMessages((current) => [...current, message]))
    socket.on('chat-deleted', () => setMessages([]))

    return () => {
      socket.disconnect()
    }
  }, [otherUserId])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = (event) => {
    event.preventDefault()
    const message = text.trim()
    if (!message || status !== 'Connected') return

    socketRef.current.emit('send-message', { otherUserId, text: message }, (response) => {
      if (!response?.success) setStatus(response?.message || 'Message not sent')
    })
    setText('')
  }

  const deleteChat = () => {
    if (!window.confirm('Delete this entire chat? This cannot be undone.')) return

    socketRef.current?.emit('delete-chat', otherUserId, (response) => {
      if (!response?.success) {
        setStatus(response?.message || 'Chat could not be deleted')
        return
      }
      navigate('/user')
    })
  }

  const title = otherUser?.name || 'Your match'
  const avatar = otherUser?.avatar || otherUser?.image || otherUser?.profilePic

  return (
    <main className="min-h-[calc(100vh-65px)] bg-[#F7F3EE] px-3 py-6 sm:px-4">
      <section className="mx-auto flex h-[calc(100vh-120px)] max-w-2xl flex-col overflow-hidden rounded-3xl border border-[#E8E0D5] bg-[#FBF8F4] shadow-sm">
        {/* Header */}
        <header className="flex items-center gap-3 border-b border-[#E8E0D5] bg-[#FBF8F4] px-4 py-3.5">
          <button
            type="button"
            onClick={() => navigate('/user')}
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#5C574F] transition hover:bg-[#E8E0D5]/60 hover:text-[#C4782A]"
            aria-label="Back"
          >
            ←
          </button>

          <img
            src={avatar || 'https://via.placeholder.com/64'}
            alt={title}
            className="h-11 w-11 rounded-full object-cover ring-2 ring-[#E8E0D5]"
          />

          <div className="min-w-0 flex-1">
            <h1 className="truncate font-serif text-[15px] font-medium text-[#1A1916]">
              {title}
            </h1>
            <p
              className={`text-xs ${
                status === 'Connected' ? 'text-emerald-600' : 'text-[#A39E96]'
              }`}
            >
              {status}
            </p>
          </div>

          <button
            type="button"
            onClick={deleteChat}
            disabled={status !== 'Connected'}
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#A39E96] transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Delete chat"
            title="Delete chat"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 6h18M9 6V4h6v2m-9 0 1 14h10l1-14M10 10v6m4-6v6"
              />
            </svg>
          </button>
        </header>

        {/* Messages */}
        <div className="flex-1 space-y-3 overflow-y-auto bg-[#F7F3EE] px-4 py-5">
          {messages.length === 0 && status === 'Connected' && (
            <div className="flex h-full flex-col items-center justify-center pt-10 text-center">
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#E8E0D5]">
                <span className="text-2xl">💬</span>
              </div>
              <p className="text-sm font-medium text-[#5C574F]">Start your conversation</p>
              <p className="mt-1 text-xs text-[#A39E96]">Say hello to your match</p>
            </div>
          )}

          {messages.map((message, index) => {
            const mine = message.senderId === String(user?._id || user?.id)
            return (
              <div
                key={`${message.createdAt}-${index}`}
                className={`flex ${mine ? 'justify-end' : 'justify-start'}`}
              >
                <p
                  className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-[14px] leading-relaxed shadow-sm ${
                    mine
                      ? 'rounded-br-md bg-[#C4782A] text-white'
                      : 'rounded-bl-md border border-[#E8E0D5] bg-white text-[#1A1916]'
                  }`}
                >
                  {message.text}
                </p>
              </div>
            )
          })}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        {status === 'Connected' && (
          <form
            onSubmit={sendMessage}
            className="flex items-center gap-2 border-t border-[#E8E0D5] bg-[#FBF8F4] px-3 py-3"
          >
            <input
              value={text}
              onChange={(event) => setText(event.target.value)}
              maxLength={1000}
              placeholder="Write a message..."
              className="min-w-0 flex-1 rounded-full border border-[#E8E0D5] bg-white px-4 py-2.5 text-sm text-[#1A1916] outline-none transition placeholder:text-[#A39E96] focus:border-[#C4782A] focus:ring-2 focus:ring-[#C4782A]/15"
            />
            <button
              type="submit"
              className="flex h-11 items-center justify-center rounded-full bg-[#C4782A] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#A8651F] active:scale-95"
            >
              Send
            </button>
          </form>
        )}
      </section>
    </main>
  )
}