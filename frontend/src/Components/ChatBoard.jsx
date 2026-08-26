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

  const title = otherUser?.name || 'Your match'
  const avatar = otherUser?.avatar || otherUser?.image || otherUser?.profilePic

  return (
    <main className="min-h-[calc(100vh-65px)] bg-[#FFF8F9] px-3 py-6 sm:px-4">
      <section className="mx-auto flex h-[calc(100vh-120px)] max-w-2xl flex-col overflow-hidden rounded-2xl border border-[#F3D9DF] bg-white shadow-lg shadow-rose-100/50">
        
        {/* Header */}
        <header className="flex items-center gap-3 border-b border-[#F3D9DF] bg-white px-4 py-3.5">
          <button
            type="button"
            onClick={() => navigate('/user')}
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#6B7280] transition hover:bg-[#FFF1F4] hover:text-[#E11D48]"
            aria-label="Back"
          >
            ←
          </button>

          <img
            src={avatar || 'https://via.placeholder.com/64'}
            alt={title}
            className="h-11 w-11 rounded-full object-cover ring-2 ring-[#FCE7EB]"
          />

          <div className="min-w-0 flex-1">
            <h1 className="truncate text-[15px] font-semibold text-[#1F2937]">
              {title}
            </h1>
            <p className={`text-xs ${status === 'Connected' ? 'text-emerald-600' : 'text-[#9CA3AF]'}`}>
              {status}
            </p>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 space-y-3 overflow-y-auto bg-[#FFF8F9] px-4 py-5">
          {messages.length === 0 && status === 'Connected' && (
            <div className="flex h-full flex-col items-center justify-center pt-10 text-center">
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#FCE7EB]">
                <span className="text-2xl">💬</span>
              </div>
              <p className="text-sm font-medium text-[#4B5563]">Start your conversation</p>
              <p className="mt-1 text-xs text-[#9CA3AF]">Say hello to your match</p>
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
                      ? 'rounded-br-md bg-[#E11D48] text-white'
                      : 'rounded-bl-md border border-[#F3D9DF] bg-white text-[#1F2937]'
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
            className="flex items-center gap-2 border-t border-[#F3D9DF] bg-white px-3 py-3"
          >
            <input
              value={text}
              onChange={(event) => setText(event.target.value)}
              maxLength={1000}
              placeholder="Write a message..."
              className="min-w-0 flex-1 rounded-full border border-[#E5E7EB] bg-[#FFF8F9] px-4 py-2.5 text-sm text-[#1F2937] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#E11D48] focus:ring-2 focus:ring-[#FCE7EB]"
            />
            <button
              type="submit"
              className="flex h-11 items-center justify-center rounded-full bg-[#E11D48] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#C9183B] active:scale-95"
            >
              Send
            </button>
          </form>
        )}
      </section>
    </main>
  )
}