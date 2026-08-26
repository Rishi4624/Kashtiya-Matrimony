import React from 'react';
 
export default function AboutUs() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* ========== HERO ========== */}
      <section className="bg-gradient-to-b from-rose-50 to-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
          <p className="text-rose-600 font-semibold text-sm uppercase tracking-wider mb-3">
            About Kashtiya Matrimony
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-5">
            Helping You Find Your Life Partner
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We believe finding a life partner should be meaningful, safe, and rooted in
            genuine compatibility — not just profiles and photos.
          </p>
        </div>
      </section>
 
      {/* ========== MISSION ========== */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 sm:p-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Kashtiya Matrimony is built to bring people together who are serious about
            marriage. We focus on creating a trusted space where individuals and families
            can discover compatible matches based on values, culture, education, and life goals.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Every profile is screened, privacy is protected, and the experience is designed
            to feel respectful and purposeful — just like traditional matchmaking, powered
            by modern technology.
          </p>
        </div>
      </section>
 
      {/* ========== WHAT WE BELIEVE ========== */}
      <section className="bg-gray-50 border-y border-gray-200 py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900">What We Believe</h2>
            <p className="text-gray-500 mt-2">The principles that guide everything we do</p>
          </div>
 
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                title: 'Authenticity',
                desc: 'Real connections begin with real people. We encourage genuine profiles and honest intentions so matches are meaningful from the start.',
                icon: '🤝',
              },
              {
                title: 'Safety First',
                desc: 'Your privacy and security matter. We provide tools to control who sees your information and maintain a respectful community environment.',
                icon: '🔒',
              },
              {
                title: 'Shared Values',
                desc: 'Compatibility goes beyond looks. We help you find partners who share your culture, beliefs, lifestyle, and long-term vision.',
                icon: '💛',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm
                           hover:border-rose-200 hover:shadow-md transition-all duration-300"
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* ========== WHY CHOOSE US ========== */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-900">Why Choose Kashtiya Matrimony?</h2>
          <p className="text-gray-500 mt-2">Built for people who are serious about marriage</p>
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
              className="flex gap-4 p-5 rounded-xl border border-gray-200 bg-white
                         hover:border-rose-200 transition-colors"
            >
              <div className="shrink-0 w-10 h-10 rounded-full bg-rose-100 text-rose-600
                              flex items-center justify-center font-bold text-lg">
                ✓
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
 
      {/* ========== CTA ========== */}
      <section className="bg-gradient-to-r from-rose-600 to-pink-600 py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready to Find Your Perfect Match?
          </h2>
          <p className="text-rose-100 mb-8 text-lg">
            Join thousands of members who are looking for a meaningful life partner.
          </p>
          <a
            href="/register"
            className="inline-block px-8 py-3.5 rounded-lg bg-white text-rose-600
                       font-semibold text-sm shadow-lg
                       hover:bg-rose-50 transition-colors duration-200"
          >
            Register Free
          </a>
        </div>
      </section>
    </div>
  );
}
 