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
    <div className="min-h-screen bg-white font-sans text-gray-800 antialiased">
     
 
      {/* ========== HERO + SEARCH ========== */}
      <section className="bg-gradient-to-b from-rose-50 to-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <div className="text-center mb-8">
            <p className="text-rose-600 font-semibold text-sm uppercase tracking-wider mb-2">
              Trusted Matrimony Platform
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3">
              Find Your Perfect Life Partner
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              100% screened profiles • Verified members • Meaningful connections
            </p>
          </div>
 
          {/* Search Card */}
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg border border-gray-200 p-5 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">I'm looking for</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none">
                  <option>Bride</option>
                  <option>Groom</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Age</label>
                <div className="flex gap-2">
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-rose-500 outline-none">
                    <option>21</option>
                    <option>25</option>
                    <option>30</option>
                  </select>
                  <span className="self-center text-gray-400">to</span>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-rose-500 outline-none">
                    <option>28</option>
                    <option>32</option>
                    <option>35</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Religion</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-rose-500 outline-none">
                  <option>Any</option>
                  <option>Hindu</option>
                  <option>Muslim</option>
                  <option>Christian</option>
                  <option>Sikh</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Mother Tongue</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-rose-500 outline-none">
                  <option>Any</option>
                  <option>Hindi</option>
                  <option>English</option>
                  <option>Marathi</option>
                  <option>Bengali</option>
                  <option>Tamil</option>
                </select>
              </div>
            </div>
            <div className="mt-5 flex justify-center">
              <button className="w-full sm:w-auto px-10 py-3 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-lg shadow-md transition flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search Matches
              </button>
            </div>
          </div>
 
          {/* Trust badges */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 sm:gap-10 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                ✓
              </span>
              100% Screened Profiles
            </div>
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                🔒
              </span>
              Privacy Protected
            </div>
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center">
                ♥
              </span>
              Genuine Intent for Marriage
            </div>
          </div>
        </div>
      </section>
 
      {/* ========== PROFILES SECTION ========== */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Featured Profiles</h2>
            <p className="text-gray-500 text-sm mt-1">Discover verified members looking for a life partner</p>
          </div>
          <a href="#" className="text-rose-600 hover:text-rose-700 text-sm font-medium hidden sm:block">
            View All →
          </a>
        </div>
 
        {users.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            Loading profiles...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {users.map((user, index) => (
              <UserCard
                key={user.id || user._id || `profile-${index}`}
                user={user}
                delay={`${(index + 1) * 0.05}s`}
                onClick={() =>
                  navigate(`/profile/${user.id || user._id}`, { state: { user } })
                }
              />
            ))}
          </div>
        )}
      </main>
 
      {/* ========== WHY US / FEATURES ========== */}
      <section className="bg-gray-50 border-y border-gray-200 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-10">
            Why Choose Kashtiya Matrimony?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Verified & Screened',
                desc: 'Every profile goes through thorough screening so you meet genuine people serious about marriage.',
                icon: '🛡️',
              },
              {
                title: 'Advanced Matching',
                desc: 'Filter by religion, caste, mother tongue, education, location and more to find compatible matches.',
                icon: '🎯',
              },
              {
                title: 'Safe & Private',
                desc: 'You control who sees your photos and contact details. Your privacy is our priority.',
                icon: '🔐',
              },
            ].map((item) => (
              <div key={item.title} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-center">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* ========== SUCCESS STORIES ========== */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900">Happy Couples</h2>
            <p className="text-gray-500 mt-1">Stories of successful matches made on Kashtiya</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { names: 'Rahul & Priya', date: 'Married Dec 2024', story: 'Found each other through shared values and family background.' },
              { names: 'Amit & Sneha', date: 'Married Mar 2025', story: 'The perfect match in education, culture and life goals.' },
              { names: 'Vikram & Ananya', date: 'Married Jan 2025', story: 'Connected over common interests and traditional values.' },
            ].map((couple) => (
              <div key={couple.names} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 font-bold">
                    ♥
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{couple.names}</p>
                    <p className="text-xs text-gray-500">{couple.date}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 italic">"{couple.story}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* ========== FOOTER ========== */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-rose-600 flex items-center justify-center text-white font-bold">
                  K
                </div>
                <span className="text-white font-bold text-lg">Kashtiya Matrimony</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Helping people find meaningful life partners with trust, privacy and genuine intent for marriage.
              </p>
            </div>
 
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Browse By</h4>
              <ul className="space-y-2 text-sm">
                {['Religion', 'Caste', 'Mother Tongue', 'City', 'Occupation', 'NRI'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-rose-400 transition">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
 
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Company</h4>
              <ul className="space-y-2 text-sm">
                {['About Us', 'Contact', 'Careers', 'Success Stories', 'Blog'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-rose-400 transition">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
 
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Help & Legal</h4>
              <ul className="space-y-2 text-sm">
                {['Help Center', 'Terms of Use', 'Privacy Policy', 'Safety Tips', 'Report Abuse'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-rose-400 transition">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
 
          <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p>© {new Date().getFullYear()} Kashtiya Matrimony. All rights reserved.</p>
            <p className="text-center sm:text-right">
              This platform is intended only for users with genuine intent for marriage.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}