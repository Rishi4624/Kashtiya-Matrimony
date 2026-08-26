import React from 'react'

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-[#F7F3EE] text-[#2C2A26]">
      {/* ========== HERO ========== */}
      <section className="border-b border-[#E8E0D5]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-20 sm:py-28 text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#C4782A]">
            About Kashtiya Matrimony
          </p>
          <h1 className="mb-6 font-serif text-4xl sm:text-5xl md:text-[3.25rem] font-medium leading-tight text-[#1A1916]">
            Marriage, arranged
            <br />
            with <span className="italic text-[#C4782A]">intention.</span>
          </h1>
          <p className="mx-auto max-w-xl text-base sm:text-lg leading-relaxed text-[#5C574F]">
            A calm, family-first way to meet. Verified profiles, community
            you can filter by, and introductions your parents can read too.
          </p>
        </div>
      </section>

      {/* ========== MISSION ========== */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-20">
        <div className="rounded-3xl border border-[#E8E0D5] bg-[#FBF8F4] p-8 sm:p-12 shadow-sm">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#C4782A]">
            Our Mission
          </p>
          <h2 className="mb-6 font-serif text-2xl sm:text-3xl font-medium text-[#1A1916]">
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
      </section>

      {/* ========== WHAT WE BELIEVE ========== */}
      <section className="border-y border-[#E8E0D5] bg-[#FBF8F4] py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#C4782A]">
              Principles
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1A1916]">
              What we believe
            </h2>
            <p className="mt-2 text-[#5C574F]">The values that guide everything we do</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                title: 'Authenticity',
                desc: 'Real connections begin with real people. We encourage genuine profiles and honest intentions so matches are meaningful from the start.',
              },
              {
                title: 'Safety First',
                desc: 'Your privacy and security matter. You control who sees your information, and we maintain a respectful community environment.',
              },
              {
                title: 'Shared Values',
                desc: 'Compatibility goes beyond looks. We help you find partners who share your culture, beliefs, lifestyle, and long-term vision.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-[#E8E0D5] bg-white p-6 sm:p-7
                           transition-all duration-300 hover:border-[#D4A574] hover:shadow-md"
              >
                <div className="mb-4 h-1 w-10 rounded-full bg-[#C4782A]" />
                <h3 className="mb-3 font-serif text-xl font-medium text-[#1A1916]">
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
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#C4782A]">
            Why us
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1A1916]">
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
              className="flex gap-4 rounded-2xl border border-[#E8E0D5] bg-white p-5 sm:p-6
                         transition-colors hover:border-[#D4A574]"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#C4782A]/10 text-[#C4782A]">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="mb-1 font-semibold text-[#1A1916]">{item.title}</h3>
                <p className="text-sm leading-relaxed text-[#5C574F]">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========== STATS ========== */}
      <section className="border-y border-[#E8E0D5] bg-[#1A1916] py-14 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 text-center">
            {[
              { value: '2.4L+', label: 'Verified profiles' },
              { value: '190+', label: 'Cities' },
              { value: '100%', label: 'ID-verified members' },
              { value: '40+', label: 'Screening checks' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-serif text-3xl sm:text-4xl font-medium text-[#C4782A]">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-[#A39E96]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 text-center">
          <h2 className="mb-4 font-serif text-2xl sm:text-3xl font-medium text-[#1A1916]">
            Ready to find your perfect match?
          </h2>
          <p className="mb-8 text-[#5C574F]">
            Join members who are looking for a meaningful life partner.
          </p>
          <a
            href="/register"
            className="inline-block rounded-xl bg-[#C4782A] px-8 py-3.5 text-sm font-semibold text-white
                       shadow-sm transition-all duration-200
                       hover:bg-[#A8651F] hover:shadow-md active:scale-[0.98]"
          >
            Register Free
          </a>
        </div>
      </section>
    </div>
  )
}