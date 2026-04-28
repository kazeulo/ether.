import Link from "next/link";

const stars = Array.from({ length: 50 }, (_, i) => ({
  top:      `${(i * 37.3) % 100}%`,
  left:     `${(i * 61.8) % 100}%`,
  size:     (i % 3) + 1,
  duration: `${3 + (i % 5)}s`,
  delay:    `${(i * 0.37) % 5}s`,
}));

const values = [
  {
    word:  "Atmospheric",
    color: "var(--color-mist)",
    desc:  "Ether isn't a database. It's a feeling — the quiet weight of every story you've carried.",
  },
  {
    word:  "Personal",
    color: "var(--color-gold)",
    desc:  "Your universe is yours alone. No algorithms, no feeds, no noise. Just you and what you've lived.",
  },
  {
    word:  "Universal",
    color: "var(--color-teal)",
    desc:  "Movies, series, books, games — every medium is a world. Ether holds all of them equally.",
  },
  {
    word:  "Timeless",
    color: "var(--color-violet)",
    desc:  "The things that moved you deserve to be remembered. Not just tracked — treasured.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-bg-base text-text-primary relative overflow-hidden">

      {/* Starfield */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {stars.map((s, i) => (
          <span
            key={i}
            className="star absolute rounded-full bg-white"
            style={{
              top: s.top, left: s.left,
              width: s.size, height: s.size,
              animationDuration: s.duration,
              animationDelay: s.delay,
            }}
          />
        ))}
        <div className="glow-orb-1 absolute top-[-10%] left-[20%] w-[600px] h-[500px] rounded-full blur-[140px]"
          style={{ background: "rgba(184,174,240,0.05)" }} />
        <div className="glow-orb-2 absolute bottom-[10%] right-[-5%] w-[500px] h-[400px] rounded-full blur-[120px]"
          style={{ background: "rgba(142,212,212,0.04)" }} />
      </div>

      {/* ── HERO ── */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 pt-32 pb-32 flex flex-col items-center text-center">
        <p
          className="text-[0.6rem] tracking-[0.4em] uppercase mb-6 font-medium"
          style={{ color: "var(--color-mist)", opacity: 0.5 }}
        >
          about ether
        </p>

        <h1 className="font-display font-black text-[clamp(2.5rem,6vw,5rem)] leading-[1.05] tracking-tight mb-8">
          Built for people who{" "}
          <em className="not-italic" style={{ color: "var(--color-mist)" }}>
            feel
          </em>{" "}
          their media.
        </h1>

        <p className="text-text-secondary text-sm font-light max-w-md leading-loose tracking-wide">
          Ether started as a simple question — why is there no beautiful,
          honest place to remember everything you've watched, read, and played?
          Not a social network. Not a recommendation engine. Just yours.
        </p>
      </section>

      {/* ── DIVIDER ── */}
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <div className="h-px w-full" style={{ background: "var(--color-border-subtle)" }} />
      </div>

      {/* ── MANIFESTO ── */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-28">
        <div className="grid lg:grid-cols-2 gap-20 items-start">

          <div className="lg:sticky lg:top-32">
            <p className="text-[0.6rem] tracking-[0.4em] uppercase mb-5 font-medium"
              style={{ color: "var(--color-mist)", opacity: 0.5 }}>
              what we believe
            </p>
            <h2 className="font-display font-black text-[clamp(1.8rem,3vw,2.8rem)] leading-[1.1] tracking-tight">
              Stories shape{" "}
              <em className="not-italic" style={{ color: "var(--color-gold)" }}>who you are</em>.
            </h2>
          </div>

          <div className="flex flex-col gap-10">
            {values.map(({ word, color, desc }) => (
              <div key={word} className="flex flex-col gap-2 border-l pl-6" style={{ borderColor: "var(--color-border-subtle)" }}>
                <span className="font-display font-black text-lg tracking-tight" style={{ color }}>
                  {word}
                </span>
                <p className="text-text-secondary text-sm font-light leading-loose">
                  {desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <div className="h-px w-full" style={{ background: "var(--color-border-subtle)" }} />
      </div>

      {/* ── ORIGIN ── */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-28">
        <div className="max-w-xl">
          <p className="text-[0.6rem] tracking-[0.4em] uppercase mb-5 font-medium"
            style={{ color: "var(--color-mist)", opacity: 0.5 }}>
            the origin
          </p>
          <h2 className="font-display font-black text-[clamp(1.8rem,3vw,2.8rem)] leading-[1.1] tracking-tight mb-8">
            A log that became a{" "}
            <em className="not-italic" style={{ color: "var(--color-mist)" }}>universe</em>.
          </h2>
          <div className="flex flex-col gap-5 text-text-secondary text-sm font-light leading-loose tracking-wide">
            <p>
              Ether began as a personal spreadsheet — a quiet habit of writing down
              every film, book, and game that left a mark. Over time it became clear
              that the act of logging wasn't about organisation. It was about memory.
              About holding onto the feeling a story gives you before it fades.
            </p>
            <p>
              I built Ether because that feeling deserves a home. Something as
              atmospheric as the stories themselves. Not clinical, not social —
              just a place where your media life can breathe.
            </p>
            <p>
              The name comes from the ancient idea of ether — the invisible substance
              that fills the space between stars. That's where your stories live.
              In the space between moments, always there when you reach for them.
            </p>
          </div>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <div className="h-px w-full" style={{ background: "var(--color-border-subtle)" }} />
      </div>

      {/* ── CTA ── */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-16 pb-32">
        <div
          className="rounded-2xl px-10 py-16 text-center relative overflow-hidden"
          style={{ border: "1px solid var(--color-border-subtle)", background: "rgba(255,255,255,0.01)" }}
        >
          <div className="absolute inset-x-0 top-0 h-px"
            style={{ background: "linear-gradient(to right, transparent, rgba(200,212,240,0.15), transparent)" }} />

          <p className="text-[0.6rem] tracking-[0.4em] uppercase mb-4 font-medium"
            style={{ color: "var(--color-mist)", opacity: 0.5 }}>
            ready?
          </p>
          <h2 className="font-display font-black text-[clamp(1.8rem,3vw,2.8rem)] tracking-tight mb-4">
            Your universe is waiting.
          </h2>
          <p className="text-text-secondary text-sm font-light max-w-xs mx-auto leading-loose mb-10">
            Free forever. No credit card. Just you and every story you've ever lived.
          </p>
          <Link
            href="/register"
            className="inline-block px-10 py-3.5 rounded-full text-xs tracking-[0.25em] uppercase font-medium transition-all hover:-translate-y-px hover:brightness-110"
            style={{
              background: "rgba(200,212,240,0.08)",
              border:     "1px solid rgba(200,212,240,0.15)",
              color:      "var(--color-mist)",
            }}
          >
            Enter the Ether — Free
          </Link>
        </div>
      </section>

    </div>
  );
}