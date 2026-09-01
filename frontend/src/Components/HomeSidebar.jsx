import React from 'react'
import { NavLink } from 'react-router-dom'

export default function HomeSidebar({ userName = 'Rishi' }) {
  const navItems = [
    { label: 'Matches', to: '/requests', icon: '◎' },
    { label: 'Discover', to: '/home', icon: '✦' },
    { label: 'Messenger', to: '/chats', icon: '✉' },
    { label: 'Profile', to: '/user', icon: '◉' },
  ]

  return (
    <aside className="w-full rounded-[24px] border border-[#E3DDD5] bg-[#F7F4F1] p-4 shadow-sm">
      <div className="mb-5 flex items-center gap-3 rounded-2xl bg-[#f1ece7] p-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#d7d0ca] text-xl font-semibold text-[#3b3632]">
          {userName.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="font-serif text-2xl font-medium text-[#1f1f1f]">Hi {userName}!</p>
          <p className="text-sm text-[#5F5B56]">
            <span className="text-[#C4782A]">Edit Profile</span>
          </p>
        </div>
      </div>

      <nav className="space-y-2 text-lg text-[#2e2b28]">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            end={item.to === '/home'}
            className={({ isActive }) =>
              [
                'flex w-full items-center justify-between rounded-xl px-3 py-3 text-left transition',
                isActive ? 'bg-[#efe7e0] text-[#1A1916]' : 'text-[#2e2b28] hover:bg-[#efe7e0]',
              ].join(' ')
            }
          >
            <span className="flex items-center gap-3">
              <span className="text-base text-[#C4782A]">{item.icon}</span>
              <span>{item.label}</span>
            </span>
            <span className="text-[#5a564f]">›</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
