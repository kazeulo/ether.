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
    num: "01",
    word: "Atmospheric",
    color: "var(--color-mist)",
    desc: "Ether isn't a database. It's a feeling — the quiet weight of every story you've carried.",
  },
  {
    num: "02",
    word: "Personal",
    color: "var(--color-gold)",
    desc: "Your universe is yours alone. No algorithms, no feeds, no noise. Just you and what you've lived.",
  },
  {
    num: "03",
    word: "Universal",
    color: "var(--color-teal)",
    desc: "Movies, series, books, games — every medium is a world. Ether holds all of them equally.",
  },
  {
    num: "04",
    word: "Timeless",
    color: "var(--color-violet)",
    desc: "The things that moved you deserve to be remembered. Not just tracked — treasured.",
  },
];

function Label({ children, centered }: { children: React.ReactNode; centered?: boolean }) {
  return (
    <div
      className="flex items-center gap-3 mb-6"
      style={{ justifyContent: centered ? "center" : "flex-start" }}
    >
      <span style={{ display: "block", width: 24, height: "0.5px", background: "var(--color-border-medium)" }} />
      <span style={{ fontSize: 9, letterSpacing: "0.38em", textTransform: "uppercase", color: "var(--color-text-muted)", fontWeight: 400 }}>
        {children}
      </span>
      {centered && <span style={{ display: "block", width: 24, height: "0.5px", background: "var(--color-border-medium)" }} />}
    </div>
  );
}

function CornerTick({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const positions: Record<string, React.CSSProperties> = {
    tl: { top: -1, left: -1 },
    tr: { top: -1, right: -1, transform: "scaleX(-1)" },
    bl: { bottom: -1, left: -1, transform: "scaleY(-1)" },
    br: { bottom: -1, right: -1, transform: "scale(-1)" },
  };
  return (
    <div style={{ position: "absolute", width: 12, height: 12, opacity: 0.3, ...positions[pos] }}>
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "0.5px", background: "var(--color-mist)" }} />
      <div style={{ position: "absolute", top: 0, left: 0, width: "0.5px", height: "100%", background: "var(--color-mist)" }} />
    </div>
  );
}

export default function AboutPage() {
  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ background: "var(--color-bg-base)", color: "var(--color-text-primary)", fontFamily: "var(--font-body)", fontWeight: 300 }}
    >

      {/* Back button */}
      <Link
        href="/"
        className="absolute top-14 left-16 z-10 flex items-center justify-center w-9 h-9 rounded-full transition-all hover:-translate-x-0.5 hover:brightness-125"
        style={{
          background: "rgba(200,212,240,0.05)",
          border: "1px solid rgba(200,212,240,0.1)",
          color: "var(--color-mist)",
        }}
        aria-label="Go back"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 12H5" />
          <path d="M12 19l-7-7 7-7" />
        </svg>
      </Link> 

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {stars.map((s, i) => (
          <span
            key={i}
            className="star absolute rounded-full bg-white"
            style={{ top: s.top, left: s.left, width: s.size, height: s.size, animationDuration: s.duration, animationDelay: s.delay }}
          />
        ))}
        <div
          className="glow-orb-1 absolute rounded-full"
          style={{ width: 500, height: 500, top: "-10%", left: "10%", background: "radial-gradient(circle, rgba(184,174,240,0.08), transparent 65%)", filter: "blur(100px)" }}
        />
        <div
          className="glow-orb-2 absolute rounded-full"
          style={{ width: 420, height: 420, bottom: "5%", right: "-5%", background: "radial-gradient(circle, rgba(142,212,212,0.06), transparent 65%)", filter: "blur(100px)" }}
        />
      </div>

      {/* HERO */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 pt-32 pb-20 flex flex-col items-center text-center">
        <Label centered>about ether</Label>
        <h1
          style={{
            fontFamily: "var(--font-logo)",
            fontSize: "clamp(2.4rem, 6vw, 4.2rem)",
            fontWeight: 400, fontStyle: "italic",
            lineHeight: 1.1, letterSpacing: "-0.01em",
            marginBottom: "1.5rem",
          }}
        >
          Built for people who{" "}
          <em style={{ fontStyle: "normal", color: "var(--color-mist)" }}>feel</em>
          <br />their media.
        </h1>
        {/* <p style={{ fontSize: 13, color: "var(--color-text-secondary)", lineHeight: 1.9, maxWidth: 420, letterSpacing: "0.02em" }}>
          Ether started as a simple question — why is there no beautiful, honest place to
          remember everything you've watched, read, and played? Not a social network.
          Not a recommendation engine. Just yours.
        </p> */}
      </section>

      {/* DIVIDER */}
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <div style={{ height: "0.5px", background: "var(--color-border-subtle)" }} />
      </div>

      {/* DIVIDER */}
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <div style={{ height: "0.5px", background: "var(--color-border-subtle)" }} />
      </div>

      {/* ORIGIN */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-16 items-start">

          <div className="lg:sticky lg:top-32">
            <Label>the origin</Label>
            <h2
              style={{
                fontFamily: "var(--font-logo)",
                fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                fontWeight: 400, fontStyle: "italic",
                lineHeight: 1.2,
              }}
            >
              A log that became a{" "}
              <em style={{ fontStyle: "normal", color: "var(--color-mist)" }}>universe</em>.
            </h2>
          </div>

          <div className="flex flex-col gap-6">
            {[
              "Ether began as a personal spreadsheet — a quiet habit of writing down every film, book, game, or any type of media that left a mark. Over time it became clear that the act of logging wasn't about organization. It was about memory. About holding onto the feeling a story gives you before it fades.",
              "I built Ether because that feeling deserves a home. Something as atmospheric as the stories themselves. Not clinical, not social — just a place where your media life can breathe.",
              "The name comes from the ancient idea of ether — the invisible substance that fills the space between stars. That's where I believe my stories live, where every stories live. In the space between moments, always there when you reach for them.",
            ].map((para, i) => (
              <p
                key={i}
                style={{
                  fontSize: 12.5,
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.9,
                  letterSpacing: "0.02em",
                  ...(i === 0 ? {
                    // Drop cap on first paragraph
                  } : {}),
                }}
              >
                {i === 0 && (
                  <span
                    style={{
                      fontFamily: "var(--font-logo)", fontStyle: "italic",
                      fontSize: "2.8em", lineHeight: 0.85,
                      float: "left", marginRight: "0.08em",
                      color: "var(--color-gold)",
                    }}
                  >
                    {para[0]}
                  </span>
                )}
                {i === 0 ? para.slice(1) : para}
              </p>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}