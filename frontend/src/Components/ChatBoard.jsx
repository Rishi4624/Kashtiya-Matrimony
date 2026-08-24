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
    <main className="min-h-[calc(100vh-65px)] bg-gradient-to-br from-[#0a0a1a] via-[#1a1035] to-[#0f172a] px-4 py-8 text-white">
      <section className="mx-auto flex h-[calc(100vh-130px)] max-w-2xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl">
        <header className="flex items-center gap-3 border-b border-white/10 p-4">
          <button type="button" onClick={() => navigate('/user')} className="text-slate-400 hover:text-white" aria-label="Back to profile">←</button>
          <img src={avatar || 'https://via.placeholder.com/64'} alt={title} className="h-11 w-11 rounded-full object-cover" />
          <div>
            <h1 className="font-semibold">{title}</h1>
            <p className="text-xs text-slate-400">{status}</p>
          </div>
        </header>

        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          {messages.length === 0 && status === 'Connected' && <p className="pt-16 text-center text-sm text-slate-500">Start your conversation</p>}
          {messages.map((message, index) => {
            const mine = message.senderId === String(user?._id || user?.id)
            return <div key={`${message.createdAt}-${index}`} className={`flex ${mine ? 'justify-end' : 'justify-start'}`}><p className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${mine ? 'bg-violet-500 text-white' : 'bg-white/10 text-slate-200'}`}>{message.text}</p></div>
          })}
          <div ref={bottomRef} />
        </div>

        {status === 'Connected' && <form onSubmit={sendMessage} className="flex gap-2 border-t border-white/10 p-4"><input value={text} onChange={(event) => setText(event.target.value)} maxLength={1000} placeholder="Write a message..." className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-violet-400" /><button type="submit" className="rounded-xl bg-violet-500 px-5 text-sm font-semibold hover:bg-violet-400">Send</button></form>}
      </section>
    </main>
  )
}
