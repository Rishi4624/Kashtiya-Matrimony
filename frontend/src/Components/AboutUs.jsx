import React from 'react'
import hero_bg from '../assets/hero_bg.jpg'
import mission_img2 from '../assets/mission_img (2).jpg'
import mission_img from '../assets/mission_img.jpg'

/* Free Unsplash wedding images — swap anytime */
const HERO_BG = hero_bg;
const MISSION_IMG =mission_img2
const CTA_BG =mission_img

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-[#FFF5F5] text-[#2C2A26]">
      {/* ========== HERO (wedding background) ========== */}
      <section className="relative overflow-hidden border-b border-[#FECDD3]">
        <div className="absolute inset-0">
          <img
            src={HERO_BG}
            alt="Indian wedding couple"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1C1917]/75 via-[#1C1917]/55 to-[#FFF5F5]" />
          <div className="absolute inset-0 bg-[#1C1917]/25" />
        </div>

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 py-24 sm:py-32 text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#F87171]">
            About Kashtiya Matrimony
          </p>
          <h1 className="mb-6 font-serif text-4xl sm:text-5xl md:text-[3.25rem] font-medium leading-tight text-white">
            Marriage, arranged
            <br />
            with <span className="italic text-[#F87171]">intention.</span>
          </h1>
          <p className="mx-auto max-w-xl text-base sm:text-lg leading-relaxed text-[#E8D9C8]/95">
            A calm, family-first way to meet. Verified profiles, community
            you can filter by, and introductions your parents can read too.
          </p>
        </div>
      </section>

      {/* ========== MISSION (image + copy) ========== */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="relative overflow-hidden rounded-3xl shadow-xl order-2 lg:order-1">
            <img
              src={MISSION_IMG}
              alt="Happy Indian wedding couple"
              className="h-full min-h-[300px] w-full object-cover aspect-[4/5] sm:aspect-[5/4] lg:aspect-auto lg:min-h-[420px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/40 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <p className="text-sm font-medium text-white/90">
                Real families. Real introductions.
              </p>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#B91C1C]">
              Our Mission
            </p>
            <h2 className="mb-6 font-serif text-2xl sm:text-3xl font-medium text-[#1C1917] leading-snug">
              Helping you find a life partner with purpose
            </h2>
            <p className="mb-5 text-base leading-relaxed text-[#5C574F]">
              Kashtiya Matrimony is built for people who are serious about marriage.
              We create a trusted space where individuals and families can discover
              compatible matches based on values, culture, education, and life goals.
            </p>
            <p className="text-base leading-relaxed text-[#5C574F]">
              Every profile is screened, privacy is protected, and the experience is
              designed to feel respectful and purposeful — traditional matchmaking,
              powered by modern technology.
            </p>
          </div>
        </div>
      </section>

      {/* ========== WHAT WE BELIEVE ========== */}
      <section className="relative border-y border-[#FECDD3] bg-[#FFF8F8] py-16 sm:py-20 overflow-hidden">
        {/* soft decorative wash */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23B91C1C'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#B91C1C]">
              Principles
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1C1917]">
              What we believe
            </h2>
            <p className="mt-2 text-[#5C574F]">The values that guide everything we do</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                title: 'Authenticity',
                desc: 'Real connections begin with real people. We encourage genuine profiles and honest intentions so matches are meaningful from the start.',
                icon: '🪷',
              },
              {
                title: 'Safety First',
                desc: 'Your privacy and security matter. You control who sees your information, and we maintain a respectful community environment.',
                icon: '🛡️',
              },
              {
                title: 'Shared Values',
                desc: 'Compatibility goes beyond looks. We help you find partners who share your culture, beliefs, lifestyle, and long-term vision.',
                icon: '🤝',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-[#FECDD3] bg-white p-6 sm:p-7
                           transition-all duration-300 hover:border-[#FCA5A5] hover:shadow-md"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#B91C1C]/10 text-xl">
                  {item.icon}
                </div>
                <div className="mb-3 h-1 w-10 rounded-full bg-[#B91C1C]" />
                <h3 className="mb-3 font-serif text-xl font-medium text-[#1C1917]">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#5C574F]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== WHY CHOOSE US ========== */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-20">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#B91C1C]">
            Why us
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1C1917]">
            Why choose Kashtiya Matrimony?
          </h2>
          <p className="mt-2 text-[#5C574F]">Built for people who are serious about marriage</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {[
            {
              title: '100% Screened Profiles',
              desc: 'Every member goes through a screening process so you can connect with genuine people.',
            },
            {
              title: 'Privacy Controls',
              desc: 'You decide who can view your photos and contact details. Your information stays in your control.',
            },
            {
              title: 'Smart Matching',
              desc: 'Filter by religion, mother tongue, education, location, and more to find truly compatible matches.',
            },
            {
              title: 'Respectful Experience',
              desc: 'Designed for users with genuine intent for marriage — not casual dating.',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="flex gap-4 rounded-2xl border border-[#FECDD3] bg-white p-5 sm:p-6
                         transition-colors hover:border-[#FCA5A5]"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#B91C1C]/10 text-[#B91C1C]">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="mb-1 font-semibold text-[#1C1917]">{item.title}</h3>
                <p className="text-sm leading-relaxed text-[#5C574F]">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========== STATS ========== */}
      <section className="border-y border-[#FECDD3] bg-[#1C1917] py-14 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 text-center">
            {[
              { value: '2.4L+', label: 'Verified profiles' },
              { value: '190+', label: 'Cities' },
              { value: '100%', label: 'ID-verified members' },
              { value: '40+', label: 'Screening checks' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-serif text-3xl sm:text-4xl font-medium text-[#B91C1C]">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-[#A39E96]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA (wedding venue background) ========== */}
      <section className="relative overflow-hidden py-20 sm:py-24">
        <div className="absolute inset-0">
          <img
            src={CTA_BG}
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[#1C1917]/80" />
        </div>

        <div className="relative mx-auto max-w-2xl px-4 sm:px-6 text-center">
          <h2 className="mb-4 font-serif text-2xl sm:text-3xl font-medium text-white">
            Ready to find your perfect match?
          </h2>
          <p className="mb-8 text-[#E8D9C8]/90">
            Join members who are looking for a meaningful life partner.
          </p>
          <a
            href="/register"
            className="inline-block rounded-xl bg-[#B91C1C] px-8 py-3.5 text-sm font-semibold text-white
                       shadow-lg shadow-[#B91C1C]/30 transition-all duration-200
                       hover:bg-[#991B1B] hover:shadow-xl active:scale-[0.98]"
          >
            Register Free
          </a>
        </div>
      </section>
    </div>
  )
}