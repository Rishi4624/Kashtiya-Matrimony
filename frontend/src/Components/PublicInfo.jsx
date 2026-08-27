import React, { useState } from 'react'

export default function PublicInfo({ type }) {
  const isPricing = type === 'pricing'
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const update = (e) => {
    const { name, value } = e.target
    setForm((c) => ({ ...c, [name]: value }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    // Wire to your API / email service
    setSubmitted(true)
  }

  const inputClass =
    'w-full rounded-xl border border-[#E8E0D5] bg-white px-3.5 py-2.5 text-sm text-[#2C2A26] outline-none transition focus:border-[#C4782A] focus:ring-2 focus:ring-[#C4782A]/20'

  /* ───────────── PRICING ───────────── */
  if (isPricing) {
    const plans = [
      {
        name: 'Free',
        price: '₹0',
        period: 'forever',
        badge: null,
        desc: 'Start exploring verified profiles at no cost.',
        features: [
          'Create & complete your profile',
          'Browse limited matches daily',
          'Send 5 interests per week',
          'Basic filters (age, city, community)',
          'Family can view your profile',
        ],
        cta: 'Get started free',
        href: '/register',
        highlight: false,
      },
      {
        name: 'Gold',
        price: '₹1,499',
        period: 'for 3 months',
        badge: 'Most popular',
        desc: 'For serious seekers ready to connect faster.',
        features: [
          'Unlimited profile views',
          'Send unlimited interests',
          'Advanced filters (education, diet, lifestyle)',
          'See who viewed your profile',
          'Priority in search results',
          'Chat with mutual matches',
          'Family access included',
        ],
        cta: 'Choose Gold',
        href: '/register?plan=gold',
        highlight: true,
      },
      {
        name: 'Platinum',
        price: '₹2,999',
        period: 'for 6 months',
        badge: 'Best value',
        desc: 'Full access with personal guidance.',
        features: [
          'Everything in Gold',
          'Dedicated relationship manager',
          'Profile boost once a month',
          'Verified badge on your profile',
          'Priority customer support',
          'Horoscope matching insights',
          'Introductions curated for you',
        ],
        cta: 'Choose Platinum',
        href: '/register?plan=platinum',
        highlight: false,
      },
    ]

    return (
      <main className="min-h-[calc(100vh-4rem)] bg-[#FDF8F3] px-4 py-14 text-[#2C2A26] sm:px-6 sm:py-16">
        <section className="mx-auto max-w-5xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C4782A]">
            Kashtiya Matrimony
          </p>
          <h1 className="mt-4 font-serif text-4xl font-medium text-[#1A1916] sm:text-5xl">
            Simple plans for meaningful beginnings
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#5C574F]">
            Join Kashtiya and meet people with shared values, clear intentions, and family in mind.
            No hidden fees — upgrade only when you are ready.
          </p>
        </section>

        {/* Plans */}
        <section className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-3xl border bg-white p-6 sm:p-7 shadow-sm transition ${
                plan.highlight
                  ? 'border-[#C4782A] shadow-md ring-1 ring-[#C4782A]/20'
                  : 'border-[#E8E0D5]'
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#C4782A] px-3 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-white">
                  {plan.badge}
                </span>
              )}

              <div className="mb-5 text-left">
                <h2 className="font-serif text-xl font-medium text-[#1A1916]">{plan.name}</h2>
                <p className="mt-1 text-sm text-[#5C574F]">{plan.desc}</p>
                <div className="mt-4 flex items-baseline gap-1.5">
                  <span className="font-serif text-3xl font-medium text-[#1A1916]">{plan.price}</span>
                  <span className="text-sm text-[#A39E96]">{plan.period}</span>
                </div>
              </div>

              <ul className="mb-6 flex-1 space-y-2.5 text-left">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-2.5 text-sm text-[#5C574F]">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#C4782A]/10 text-[#C4782A]">
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href={plan.href}
                className={`block w-full rounded-xl py-3 text-center text-sm font-semibold transition ${
                  plan.highlight
                    ? 'bg-[#C4782A] text-white hover:bg-[#A8651F]'
                    : 'border border-[#E8E0D5] bg-[#FDF8F3] text-[#1A1916] hover:border-[#C4782A] hover:text-[#C4782A]'
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </section>

        {/* Conditions */}
        <section className="mx-auto mt-14 max-w-3xl rounded-2xl border border-[#E8E0D5] bg-white p-6 sm:p-8 text-left shadow-sm">
          <h3 className="font-serif text-lg font-medium text-[#1A1916]">Subscription terms</h3>
          <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-[#5C574F]">
            <li>• Plans are billed as a one-time amount for the selected duration (3 or 6 months). No auto-renewal unless you choose it.</li>
            <li>• Free plan remains available forever; paid features unlock only while your subscription is active.</li>
            <li>• You can upgrade anytime; remaining days on a lower plan are adjusted toward the new plan.</li>
            <li>• Refunds are available within 7 days of purchase if you have not used paid contact or chat features.</li>
            <li>• Prices include applicable GST. Invoice is sent to your registered email.</li>
            <li>• Kashtiya is intended only for users with genuine intent for marriage.</li>
          </ul>
        </section>
      </main>
    )
  }

  /* ───────────── CONTACT ───────────── */
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-[#FDF8F3] px-4 py-14 text-[#2C2A26] sm:px-6 sm:py-16">
      <section className="mx-auto max-w-5xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C4782A]">
          Kashtiya Matrimony
        </p>
        <h1 className="mt-4 font-serif text-4xl font-medium text-[#1A1916] sm:text-5xl">
          We are here to help
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#5C574F]">
          Have a question about profiles, introductions, or your journey? Our team would be happy to hear from you.
        </p>
      </section>

      <section className="mx-auto mt-12 grid max-w-5xl gap-8 lg:grid-cols-5">
        {/* Company details */}
        <div className="space-y-5 lg:col-span-2">
          <div className="rounded-2xl border border-[#E8E0D5] bg-white p-6 shadow-sm">
            <h2 className="font-serif text-xl font-medium text-[#1A1916]">Company</h2>
            <p className="mt-3 text-sm leading-relaxed text-[#5C574F]">
              Kashtiya Matrimony Pvt. Ltd.
              <br />
              Helping families find meaningful life partners with trust and privacy.
            </p>
            <div className="mt-5 space-y-3 text-sm text-[#5C574F]">
              <p className="flex gap-2">
                <span className="shrink-0 text-[#C4782A]">📍</span>
                <span>
                  4th Floor, Orchid Business Park
                  <br />
                  Andheri East, Mumbai 400069
                  <br />
                  Maharashtra, India
                </span>
              </p>
              <p className="flex gap-2">
                <span className="shrink-0 text-[#C4782A]">🕒</span>
                <span>Mon–Sat · 10:00 AM – 7:00 PM IST</span>
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-[#E8E0D5] bg-white p-6 shadow-sm">
            <h2 className="font-serif text-xl font-medium text-[#1A1916]">Reach us</h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#A39E96]">General</p>
                <a href="mailto:hello@kashtiya.com" className="text-[#C4782A] hover:underline">
                  hello@kashtiya.com
                </a>
              </li>
              <li>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#A39E96]">Support</p>
                <a href="mailto:support@kashtiya.com" className="text-[#C4782A] hover:underline">
                  support@kashtiya.com
                </a>
              </li>
              <li>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#A39E96]">Safety &amp; abuse</p>
                <a href="mailto:safety@kashtiya.com" className="text-[#C4782A] hover:underline">
                  safety@kashtiya.com
                </a>
              </li>
              <li>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#A39E96]">Phone</p>
                <a href="tel:+912240001234" className="text-[#2C2A26] hover:text-[#C4782A]">
                  +91 22 4000 1234
                </a>
                <br />
                <a href="tel:+919876543210" className="text-[#2C2A26] hover:text-[#C4782A]">
                  +91 98765 43210
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Message form */}
        <div className="rounded-2xl border border-[#E8E0D5] bg-white p-6 sm:p-8 shadow-sm lg:col-span-3">
          <h2 className="font-serif text-xl font-medium text-[#1A1916]">Send a message</h2>
          <p className="mt-1 text-sm text-[#5C574F]">
            We usually reply within one business day.
          </p>

          {submitted ? (
            <div className="mt-8 rounded-xl border border-[#C4782A]/30 bg-[#C4782A]/5 p-6 text-center">
              <p className="font-serif text-lg text-[#1A1916]">Thank you for writing in.</p>
              <p className="mt-2 text-sm text-[#5C574F]">
                We have received your message and will get back to you shortly.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false)
                  setForm({ name: '', email: '', phone: '', subject: '', message: '' })
                }}
                className="mt-4 text-sm font-medium text-[#C4782A] hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#A39E96]">
                    Full name
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={update}
                    required
                    placeholder="Your name"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#A39E96]">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={update}
                    required
                    placeholder="you@example.com"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#A39E96]">
                    Phone (optional)
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={update}
                    placeholder="+91 98XXX XXXXX"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#A39E96]">
                    Subject
                  </label>
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={update}
                    required
                    className={inputClass}
                  >
                    <option value="">Select a topic</option>
                    <option value="profile">Profile or account</option>
                    <option value="membership">Membership &amp; billing</option>
                    <option value="match">Matches &amp; introductions</option>
                    <option value="safety">Safety or report</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#A39E96]">
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={update}
                  required
                  rows={5}
                  placeholder="How can we help?"
                  className={`${inputClass} resize-y min-h-[120px]`}
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-[#C4782A] py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#A8651F] sm:w-auto sm:px-8"
              >
                Send message
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  )
}