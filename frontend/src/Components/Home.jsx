import React, { useEffect, useState } from 'react'
import UserCard from './UserCard'
import { useNavigate } from 'react-router-dom'
import getProfiles from '../api/getProfiles.js'

export default function Home() {
  const navigate = useNavigate()
  const [users, setUsers] = useState([])

  useEffect(() => {
    const loadProfiles = async () => {
      const profiles = await getProfiles()
      setUsers(Array.isArray(profiles) ? profiles : [])
    }
    loadProfiles()
  }, [])

  return (
    <div className="min-h-screen font-sans text-white antialiased relative overflow-hidden">
      {/* Dark Navy Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#0a0f1c] via-[#0f172a] to-[#111827] -z-20" />

      {/* Soft Ambient Blobs (subtle & professional) */}
      <div className="fixed top-[-100px] left-[-60px] w-80 h-80 bg-cyan-600/20 rounded-full blur-[120px] -z-10" />
      <div className="fixed bottom-[-80px] right-[-40px] w-72 h-72 bg-indigo-600/15 rounded-full blur-[100px] -z-10" />
      <div className="fixed top-1/3 right-1/4 w-64 h-64 bg-teal-600/10 rounded-full blur-[90px] -z-10" />

      {/* Header */}
      <header className="pt-16 pb-14 px-4 text-center relative z-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 
                       bg-gradient-to-r from-cyan-300 via-teal-300 to-indigo-300 
                       bg-clip-text text-transparent">
          Kashtiya Matrimony
        </h1>
        <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
          Discover meaningful connections, shared passions, and real stories
        </p>
      </header>

      {/* Cards Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {users.map((user, index) => (
            <UserCard
              key={user.id || user._id || `profile-${index}`}
              user={user}
              delay={`${(index + 1) * 0.1}s`}
              onClick={() =>
                navigate(`/profile/${user.id || user._id}`, { state: { user } })
              }
            />
          ))}
        </div>
      </main>

      {/* ===================== FOOTER ===================== */}
      <footer className="relative z-10 border-t border-white/10 bg-white/[0.03] backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">

          {/* Top Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-300 to-indigo-300 
                             bg-clip-text text-transparent mb-3">
                Kashtiya Matrimony
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-5 max-w-xs">
                Connecting hearts with trust, tradition, and meaningful relationships.
              </p>

              {/* Social Icons */}
              <div className="flex gap-3">
                {['twitter', 'github', 'instagram', 'linkedin'].map((platform, i) => (
                  <a
                    key={platform}
                    href="#"
                    className="w-9 h-9 rounded-full bg-white/5 border border-white/10 
                               flex items-center justify-center text-slate-400 
                               hover:bg-cyan-500/15 hover:text-cyan-300 hover:border-cyan-400/30 
                               transition-all duration-300"
                  >
                    {/* Simple icons - replace with your preferred SVGs if needed */}
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      {i === 0 && <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />}
                      {i === 1 && <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599-.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />}
                      {i === 2 && <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />}
                      {i === 3 && <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />}
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Product */}
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                Product
              </h4>
              <ul className="space-y-3 text-sm">
                {['Features', 'Pricing', 'Documentation', 'API Reference', 'Changelog'].map(
                  (item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-slate-400 hover:text-cyan-300 transition-colors duration-200"
                      >
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                Company
              </h4>
              <ul className="space-y-3 text-sm">
                {['About Us', 'Careers', 'Blog', 'Press Kit', 'Contact Us'].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-slate-400 hover:text-cyan-300 transition-colors duration-200"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                Legal
              </h4>
              <ul className="space-y-3 text-sm">
                {[
                  'Terms & Conditions',
                  'Privacy Policy',
                  'Cookie Policy',
                  'Security',
                  'GDPR',
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-slate-400 hover:text-cyan-300 transition-colors duration-200"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="border-t border-white/10 pt-8 mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
              <div>
                <h4 className="text-sm font-semibold text-white mb-1">
                  Subscribe to our newsletter
                </h4>
                <p className="text-slate-400 text-sm">
                  Get updates on new matches and community stories.
                </p>
              </div>
              <div className="flex w-full sm:w-auto gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 sm:w-64 px-4 py-2.5 rounded-xl text-sm text-white
                             bg-white/5 border border-white/10 
                             focus:bg-white/10 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-500/20 
                             focus:outline-none transition placeholder-slate-500"
                />
                <button
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white
                             bg-gradient-to-r from-cyan-500 to-indigo-600 
                             hover:from-cyan-400 hover:to-indigo-500 
                             transition-all duration-300 whitespace-nowrap
                             shadow-lg shadow-cyan-500/20"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} Kashtiya Matrimony. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              {['Terms', 'Privacy', 'Cookies', 'Sitemap'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-slate-500 hover:text-cyan-300 transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}