import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import hero_page from '../assets/hero_couple.jpg'
import mission_img1 from '../assets/mission_img1.jpg'
import story3 from '../assets/story3.jpg'
import story2 from '../assets/mission_img.jpg'

/* ── Images ── */
const HERO_COUPLE = mission_img1
const STORY_1 = hero_page
const STORY_2 =  story2
const STORY_3 = story3

export default function Landing() {
  const navigate = useNavigate()

  // Search filters (kept for the lower search section)
  const [filters, setFilters] = useState({
    lookingFor: '',
    minAge: '',
    maxAge: '',
    community: '',
    city: '',
  })

  // Registration form state
  const [reg, setReg] = useState({
    fullName: '',
    email: '',
    phone: '',
    lookingFor: '',
    community: '',
  })

  const update = (e) => {
    const { name, value } = e.target
    setFilters((c) => ({ ...c, [name]: value }))
  }

  const updateReg = (e) => {
    const { name, value } = e.target
    setReg((c) => ({ ...c, [name]: value }))
  }

  const onSearch = (e) => {
    e.preventDefault()
    navigate('./register')
  }

  const onRegister = (e) => {
    e.preventDefault()
    // You can pass reg data via state or query if needed
    navigate('/register', { state: reg })
  }

  const field =
    'w-full rounded-xl border border-[#FECDD3] bg-white px-3.5 py-2.5 text-sm text-[#1C1917] outline-none transition focus:border-[#B91C1C] focus:ring-2 focus:ring-[#B91C1C]/15'

  return (
    <div className="min-h-screen bg-[#FFF5F5] text-[#1C1917] antialiased">
      {/* ════════════ HERO ════════════ */}
      <section className="relative overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${HERO_COUPLE})` }}
        />
        {/* Soft dark overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#3B0000]/80 via-[#3B0000]/55 to-[#3B0000]/30" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-16">
          {/* Left — copy */}
          <div>
            <span className="mb-5 inline-block rounded-full bg-white/15 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#FCA5A5] backdrop-blur-sm">
              Wedding season 2026
            </span>

            <h1 className="mb-5 font-serif text-4xl font-medium leading-[1.15] tracking-tight text-white sm:text-5xl lg:text-[3.25rem]">
              The season of{' '}
              <span className="italic text-[#FCA5A5]">marigolds</span>
              {' '}— and of finding your person.
            </h1>

            <p className="mb-8 max-w-md text-base leading-relaxed text-[#FECDD3]/90">
              Gulmohar is a calm, family-first matrimony service. Every profile is
              ID-verified, every introduction is one your parents can read too.
            </p>

            <div className="mb-10 flex flex-wrap gap-3">
              <a
                href="#search"
                className="rounded-full bg-[#B91C1C] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#991B1B]"
              >
                Browse profiles
              </a>
              <a
                href="#how"
                className="rounded-full border border-white/40 bg-transparent px-6 py-2.5 text-sm font-semibold text-white transition hover:border-[#FCA5A5] hover:text-[#FCA5A5]"
              >
                How it works
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[#FECDD3]/80">
              <span>
                <strong className="font-semibold text-white">2.4L+</strong> verified profiles
              </span>
              <span className="hidden text-white/30 sm:inline">|</span>
              <span>
                <strong className="font-semibold text-white">190+</strong> Indian cities
              </span>
              <span className="hidden text-white/30 sm:inline">|</span>
              <span>
                <strong className="font-semibold text-white">12,000</strong> weddings a year
              </span>
            </div>
          </div>

          {/* Right — Registration form card (replaces the image cart) */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="overflow-hidden rounded-[1.75rem] border border-white/20 bg-white/95 p-6 shadow-2xl shadow-black/20 backdrop-blur-md sm:p-8">
              <div className="mb-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#B91C1C]">
                  Start free
                </p>
                <h2 className="mt-1 font-serif text-2xl font-medium text-[#1C1917]">
                  Create your profile
                </h2>
                <p className="mt-1 text-sm text-[#6B7280]">
                  Takes under 2 minutes. Your details stay private until you choose otherwise.
                </p>
              </div>

              <form onSubmit={onRegister} className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]">
                    Full name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={reg.fullName}
                    onChange={updateReg}
                    placeholder="Your name"
                    required
                    className={field}
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={reg.email}
                    onChange={updateReg}
                    placeholder="you@example.com"
                    required
                    className={field}
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={reg.phone}
                    onChange={updateReg}
                    placeholder="+91 98765 43210"
                    className={field}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]">
                      Looking for
                    </label>
                    <select
                      name="lookingFor"
                      value={reg.lookingFor}
                      onChange={updateReg}
                      className={field}
                    >
                      <option value="">Any</option>
                      <option value="bride">Bride</option>
                      <option value="groom">Groom</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]">
                      Community
                    </label>
                    <select
                      name="community"
                      value={reg.community}
                      onChange={updateReg}
                      className={field}
                    >
                      <option value="">Any</option>
                      <option>Maratha</option>
                      <option>Sikh</option>
                      <option>Brahmin</option>
                      <option>Kannada</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-2 w-full rounded-full bg-[#B91C1C] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#991B1B]"
                >
                  Register free
                </button>

                <p className="text-center text-xs text-[#9CA3AF]">
                  Already have an account?{' '}
                  <Link to="/login" className="font-medium text-[#B91C1C] hover:underline">
                    Sign in
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ SEARCH ════════════ */}
      <section id="search" className="border-t border-[#FECDD3] bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-8 text-center">
            <h2 className="font-serif text-2xl font-medium text-[#1C1917] sm:text-3xl">
              Start your search
            </h2>
            <p className="mt-2 text-sm text-[#6B7280]">
              Community is optional. Family members can join any profile.
            </p>
          </div>

          <form
            onSubmit={onSearch}
            className="mx-auto max-w-4xl rounded-3xl border border-[#FECDD3] bg-[#FFF5F5] p-6 shadow-sm sm:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]">
                  Looking for
                </label>
                <select name="lookingFor" value={filters.lookingFor} onChange={update} className={field}>
                  <option value="">Any</option>
                  <option value="bride">Bride</option>
                  <option value="groom">Groom</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]">
                  Age from
                </label>
                <select name="minAge" value={filters.minAge} onChange={update} className={field}>
                  <option value="">Min</option>
                  {[21, 25, 28, 30, 35, 40].map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]">
                  Age to
                </label>
                <select name="maxAge" value={filters.maxAge} onChange={update} className={field}>
                  <option value="">Max</option>
                  {[28, 30, 35, 40, 45, 50].map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]">
                  Community
                </label>
                <select name="community" value={filters.community} onChange={update} className={field}>
                  <option value="">Any</option>
                  <option>Maratha</option>
                  <option>Sikh</option>
                  <option>Brahmin</option>
                  <option>Kannada</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]">
                  City
                </label>
                <select name="city" value={filters.city} onChange={update} className={field}>
                  <option value="">Any</option>
                  <option>Mumbai</option>
                  <option>Pune</option>
                  <option>Delhi</option>
                  <option>Chennai</option>
                  <option>Bangalore</option>
                  <option>Hyderabad</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
              <p className="text-xs text-[#9CA3AF]">Free to register</p>
              <button
                type="submit"
                className="w-full rounded-full bg-[#B91C1C] px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#991B1B] sm:w-auto"
              >
                Show my matches
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* ════════════ TRUST ════════════ */}
      <section id="safety" className="bg-[#7F1D1D] py-12 sm:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="mb-8 text-center text-sm text-[#D1D5DB]">
            Verification, so trust isn&apos;t something you have to assume.
          </p>
          <div className="grid grid-cols-3 gap-6 text-center">
            {[
              { v: '100%', l: 'ID-verified members' },
              { v: '40+', l: 'Screening checks' },
              { v: '18mo', l: 'Avg. to engagement' },
            ].map((s) => (
              <div key={s.l}>
                <p className="font-serif text-2xl font-medium text-[#FCA5A5] sm:text-3xl">{s.v}</p>
                <p className="mt-1 text-xs text-[#D1D5DB] sm:text-sm">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ STORIES ════════════ */}
      <section id="stories" className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#B91C1C]">
                Wedding stories
              </p>
              <h2 className="font-serif text-2xl font-medium text-[#1C1917] sm:text-3xl">
                Two garlands, one meeting.
              </h2>
            </div>
            <a href="#" className="text-sm font-medium text-[#B91C1C] transition hover:underline">
              All stories →
            </a>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                img: STORY_1,
                tag: 'Married 2025 · Bangalore',
                names: 'Kavya & Rohan',
                story: 'Two families first, a phone call, then chai. They met through a shared Maratha community.',
              },
              {
                img: STORY_2,
                tag: 'Engaged · Mumbai',
                names: 'Meera & Arjun',
                story: 'Her mother joined the profile. A verified match across two cities turned into a family visit.',
              },
              {
                img: STORY_3,
                tag: 'Married 2024 · Hyderabad',
                names: 'Ananya & Dev',
                story: 'Chose not to filter by community. A quiet intro, a long letter, and a yes.',
              },
            ].map((c) => (
              <article
                key={c.names}
                className="group overflow-hidden rounded-2xl border border-[#FECDD3] bg-white shadow-sm transition hover:shadow-md"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={c.img}
                    alt={c.names}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-[#B91C1C]">
                    {c.tag}
                  </p>
                  <h3 className="mt-1 font-serif text-lg font-medium text-[#1C1917]">{c.names}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">{c.story}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ HOW IT WORKS ════════════ */}
      <section id="how" className="border-y border-[#FECDD3] bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-12 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#B91C1C]">
              How it works
            </p>
            <h2 className="font-serif text-2xl font-medium text-[#1C1917] sm:text-3xl">
              Three unhurried steps.
            </h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {[
              {
                n: '01',
                title: 'Create your profile',
                desc: 'Age, community, city and values — every field optional, all of it yours.',
              },
              {
                n: '02',
                title: 'Meet verified matches',
                desc: 'Curated introductions you and your family can read through together.',
              },
              {
                n: '03',
                title: 'Say yes at your pace',
                desc: 'Call, chat, or keep browsing. No countdowns, no pressure, ever.',
              },
            ].map((step) => (
              <div key={step.n} className="text-center sm:text-left">
                <span className="font-serif text-3xl font-medium text-[#B91C1C]/40">{step.n}</span>
                <h3 className="mt-3 font-serif text-xl font-medium text-[#1C1917]">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ BROWSE BY ════════════ */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="mb-8 text-center font-serif text-2xl font-medium text-[#1C1917] sm:text-3xl">
            Browse by community or city.
          </h2>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { type: 'Community', name: 'Maratha', count: '38,400 profiles' },
              { type: 'Community', name: 'Sikh', count: '21,900 profiles' },
              { type: 'City', name: 'Mumbai', count: '64,200 profiles' },
              { type: 'City', name: 'Pune', count: '29,700 profiles' },
              { type: 'Community', name: 'Brahmin', count: '51,300 profiles' },
              { type: 'Community', name: 'Kannada', count: '18,600 profiles' },
              { type: 'City', name: 'Delhi', count: '58,100 profiles' },
              { type: 'City', name: 'Chennai', count: '26,800 profiles' },
            ].map((item) => (
              <a
                key={item.name}
                href="#search"
                className="rounded-2xl border border-[#FECDD3] bg-white p-4 transition hover:border-[#B91C1C]/40 hover:shadow-sm"
              >
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#9CA3AF]">
                  {item.type}
                </p>
                <p className="mt-1 font-serif text-lg font-medium text-[#1C1917]">{item.name}</p>
                <p className="mt-0.5 text-xs text-[#6B7280]">{item.count}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ FINAL CTA ════════════ */}
      <section className="border-t border-[#FECDD3] bg-[#7F1D1D] py-16 sm:py-20">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2 className="mb-4 font-serif text-2xl font-medium text-white sm:text-3xl">
            This wedding season, start with one honest introduction.
          </h2>
          <p className="mb-8 text-sm text-[#D1D5DB]">
            Registration is free, your profile stays private until you choose otherwise.
          </p>
          <Link
            to="/register"
            className="inline-block rounded-full bg-[#B91C1C] px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#991B1B]"
          >
            Register free
          </Link>
        </div>
      </section>
    </div>
  )
}