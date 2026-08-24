import axios from 'axios';

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-950/40 via-slate-950 to-slate-950" />
        <div className="relative mx-auto max-w-4xl px-6 py-24 text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-violet-400 sm:text-5xl">
            About Us
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-8 text-slate-300">
            We help people discover meaningful connections through shared interests,
            values, and genuine compatibility.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 shadow-xl backdrop-blur-sm">
          <h2 className="mb-4 text-2xl font-semibold text-violet-300">
            Our Mission
          </h2>
          <p className="text-lg leading-8 text-slate-300">
            Our platform brings together people from different backgrounds and creates
            a safe, welcoming space to connect, build trust, and start a new chapter.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-4xl px-6 pb-20">
        <h2 className="mb-10 text-center text-2xl font-semibold text-violet-300">
          What We Believe
        </h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            {
              title: "Authenticity",
              desc: "Real connections start with real people. No filters, no pressure — just genuine personalities.",
            },
            {
              title: "Safety First",
              desc: "We prioritize a respectful, secure environment so everyone can feel comfortable being themselves.",
            },
            {
              title: "Shared Values",
              desc: "Matching on interests and core beliefs helps create deeper, longer-lasting relationships.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 transition hover:border-violet-700/50 hover:bg-slate-900"
            >
              <h3 className="mb-3 text-lg font-medium text-violet-400">
                {item.title}
              </h3>
              <p className="text-sm leading-6 text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}