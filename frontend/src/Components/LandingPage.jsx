import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import hero_page from '../assets/hero_couple.jpg'

/* ── Images (swap for your assets if preferred) ── */
const HERO_COUPLE =hero_page;
const STORY_1 =
  'https://images.unsplash.com/photo-1606800052052-a08af952dab7?auto=format&fit=crop&w=600&q=80'
const STORY_2 =
  'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80'
const STORY_3 =
  'https://images.unsplash.com/photo-1591604466107-ec195f252baa?auto=format&fit=crop&w=600&q=80'

export default function Landing() {
  const [filters, setFilters] = useState({
    lookingFor: '',
    minAge: '',
    maxAge: '',
    community: '',
    city: '',
  })

  const update = (e) => {
    const { name, value } = e.target
    setFilters((c) => ({ ...c, [name]: value }))
  }

  const onSearch = (e) => {
    e.preventDefault()
    // wire to your /profiles or /search route
    window.location.href = '/profiles'
  }

  const field =
    'w-full rounded-xl border border-[#E8DFD4] bg-white px-3.5 py-2.5 text-sm text-[#2C2419] outline-none transition focus:border-[#C4782A] focus:ring-2 focus:ring-[#C4782A]/15'

  return (
    <div className="min-h-screen bg-[#FBF7F2] text-[#2C2419] antialiased">
      {/* ════════════ NAV ════════════ */}
    

      {/* ════════════ HERO ════════════ */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-16">
          {/* Left */}
          <div>
            <span className="mb-5 inline-block rounded-full bg-[#C45C3E]/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#C45C3E]">
              Wedding season 2026
            </span>

            <h1 className="mb-5 font-serif text-4xl font-medium leading-[1.15] tracking-tight text-[#2C2419] sm:text-5xl lg:text-[3.25rem]">
              The season of{' '}
              <span className="italic text-[#C45C3E]">marigolds</span>
              {' '}— and of finding your person.
            </h1>

            <p className="mb-8 max-w-md text-base leading-relaxed text-[#6B6258]">
              Gulmohar is a calm, family-first matrimony service. Every profile is
              ID-verified, every introduction is one your parents can read too.
            </p>

            <div className="mb-10 flex flex-wrap gap-3">
              <a
                href="#search"
                className="rounded-full bg-[#C45C3E] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#A84B32]"
              >
                Browse profiles
              </a>
              <a
                href="#how"
                className="rounded-full border border-[#D4C8B8] bg-transparent px-6 py-2.5 text-sm font-semibold text-[#2C2419] transition hover:border-[#C45C3E] hover:text-[#C45C3E]"
              >
                How it works
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[#6B6258]">
              <span><strong className="font-semibold text-[#2C2419]">2.4L+</strong> verified profiles</span>
              <span className="hidden text-[#D4C8B8] sm:inline">|</span>
              <span><strong className="font-semibold text-[#2C2419]">190+</strong> Indian cities</span>
              <span className="hidden text-[#D4C8B8] sm:inline">|</span>
              <span><strong className="font-semibold text-[#2C2419]">12,000</strong> weddings a year</span>
            </div>
          </div>

          {/* Right — couple card */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="overflow-hidden rounded-[1.75rem] shadow-2xl shadow-[#C45C3E]/15">
              <img
                src={HERO_COUPLE}
                alt="Indian wedding couple"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 left-4 right-4 rounded-2xl border border-[#EDE6DC] bg-white/95 p-4 shadow-lg backdrop-blur-sm sm:left-6 sm:right-auto sm:max-w-[220px]">
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#C45C3E]">
                Matched on Gulmohar
              </p>
              <p className="mt-1 font-serif text-lg font-medium text-[#2C2419]">
                Nikita &amp; Aarav
              </p>
              <p className="text-xs text-[#6B6258]">Jaipur · December wedding</p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ SEARCH ════════════ */}
      <section id="search" className="border-t border-[#EDE6DC] bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-8 text-center">
            <h2 className="font-serif text-2xl font-medium text-[#2C2419] sm:text-3xl">
              Start your search
            </h2>
            <p className="mt-2 text-sm text-[#6B6258]">
              Community is optional. Family members can join any profile.
            </p>
          </div>

          <form
            onSubmit={onSearch}
            className="mx-auto max-w-4xl rounded-3xl border border-[#EDE6DC] bg-[#FBF7F2] p-6 shadow-sm sm:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#9A9085]">
                  Looking for
                </label>
                <select name="lookingFor" value={filters.lookingFor} onChange={update} className={field}>
                  <option value="">Any</option>
                  <option value="bride">Bride</option>
                  <option value="groom">Groom</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#9A9085]">
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
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#9A9085]">
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
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#9A9085]">
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
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#9A9085]">
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
              <p className="text-xs text-[#9A9085]">Free to register</p>
              <button
                type="submit"
                className="w-full rounded-full bg-[#C45C3E] px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#A84B32] sm:w-auto"
              >
                Show my matches
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* ════════════ TRUST ════════════ */}
      <section id="safety" className="bg-[#2C2419] py-12 sm:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="mb-8 text-center text-sm text-[#A89F94]">
            Verification, so trust isn&apos;t something you have to assume.
          </p>
          <div className="grid grid-cols-3 gap-6 text-center">
            {[
              { v: '100%', l: 'ID-verified members' },
              { v: '40+', l: 'Screening checks' },
              { v: '18mo', l: 'Avg. to engagement' },
            ].map((s) => (
              <div key={s.l}>
                <p className="font-serif text-2xl font-medium text-[#E8A07A] sm:text-3xl">{s.v}</p>
                <p className="mt-1 text-xs text-[#A89F94] sm:text-sm">{s.l}</p>
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
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#C45C3E]">
                Wedding stories
              </p>
              <h2 className="font-serif text-2xl font-medium text-[#2C2419] sm:text-3xl">
                Two garlands, one meeting.
              </h2>
            </div>
            <a href="#" className="text-sm font-medium text-[#C45C3E] transition hover:underline">
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
                className="group overflow-hidden rounded-2xl border border-[#EDE6DC] bg-white shadow-sm transition hover:shadow-md"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={c.img}
                    alt={c.names}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-[#C45C3E]">
                    {c.tag}
                  </p>
                  <h3 className="mt-1 font-serif text-lg font-medium text-[#2C2419]">{c.names}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#6B6258]">{c.story}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ HOW IT WORKS ════════════ */}
      <section id="how" className="border-y border-[#EDE6DC] bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-12 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#C45C3E]">
              How it works
            </p>
            <h2 className="font-serif text-2xl font-medium text-[#2C2419] sm:text-3xl">
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
                <span className="font-serif text-3xl font-medium text-[#C45C3E]/40">{step.n}</span>
                <h3 className="mt-3 font-serif text-xl font-medium text-[#2C2419]">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#6B6258]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ BROWSE BY ════════════ */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="mb-8 text-center font-serif text-2xl font-medium text-[#2C2419] sm:text-3xl">
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
                className="rounded-2xl border border-[#EDE6DC] bg-white p-4 transition hover:border-[#C45C3E]/40 hover:shadow-sm"
              >
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#9A9085]">
                  {item.type}
                </p>
                <p className="mt-1 font-serif text-lg font-medium text-[#2C2419]">{item.name}</p>
                <p className="mt-0.5 text-xs text-[#6B6258]">{item.count}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ FINAL CTA ════════════ */}
      <section className="border-t border-[#EDE6DC] bg-[#2C2419] py-16 sm:py-20">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2 className="mb-4 font-serif text-2xl font-medium text-white sm:text-3xl">
            This wedding season, start with one honest introduction.
          </h2>
          <p className="mb-8 text-sm text-[#A89F94]">
            Registration is free, your profile stays private until you choose otherwise.
          </p>
          <Link
            to="/register"
            className="inline-block rounded-full bg-[#C45C3E] px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#A84B32]"
          >
            Register free
          </Link>
        </div>
      </section>

      
    </div>
  )
}