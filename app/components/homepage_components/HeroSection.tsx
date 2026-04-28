import Link from "next/link";

const mediaTypes = [
  { label: "Movies", color: "text-rose"   },
  { label: "Series", color: "text-teal"   },
  { label: "Books",  color: "text-violet" },
  { label: "Games",  color: "text-violet" },
];

export default function HeroSection() {
  return (
    <section className="relative z-10 min-h-screen max-w-4xl mx-auto px-6 flex flex-col items-center justify-center text-center">

      {/* Eyebrow */}
      <p
        className="animate-fade-up text-[0.65rem] tracking-[0.35em] uppercase mb-8 font-medium"
        style={{ color: "var(--color-mist)", opacity: 0.6 }}
      >
        every story leaves a mark
      </p>

      {/* Headline */}
      <h1 className="animate-fade-up [animation-delay:100ms] font-display font-black text-[clamp(2.2rem,6vw,4.8rem)] leading-[1.05] tracking-tight max-w-3xl mb-8">
        Every world you&apos;ve{" "}
        <em className="not-italic" style={{ color: "var(--color-mist)" }}>
          entered
        </em>
        ,{" "}
        <em className="not-italic text-gold">
          remembered
        </em>
        .
      </h1>

      {/* Subtext */}
      <p className="animate-fade-up [animation-delay:200ms] text-text-secondary text-sm font-light max-w-sm leading-loose mb-12 tracking-wide">
        Every story you enter leaves a mark.
        <br />
        Ether helps you hold onto all of them.
      </p>

      {/* CTAs */}
      <div className="animate-fade-up [animation-delay:300ms] flex gap-3 flex-wrap justify-center mb-16">
        <Link
          href="/register"
          className="px-8 py-3 text-xs tracking-[0.2em] uppercase rounded-full font-medium transition-all hover:-translate-y-px hover:brightness-110"
          style={{
            background: "rgba(184,196,224,0.1)",
            border: "1px solid rgba(184,196,224,0.2)",
            color: "var(--color-mist)",
          }}
        >
          Enter the Ether — Free
        </Link>
        <Link
          href="/explore"
          className="px-8 py-3 text-xs tracking-[0.2em] uppercase rounded-full transition-all text-text-muted hover:text-text-secondary"
        >
          Explore →
        </Link>
      </div>

      {/* Media type tags */}
      <div className="animate-fade-up [animation-delay:400ms] flex items-center gap-3 flex-wrap justify-center">
        {mediaTypes.map((type, i) => (
          <div key={type.label} className="flex items-center gap-3">
            <span
              className={`text-[0.65rem] tracking-[0.2em] uppercase ${type.color}`}
              style={{ opacity: 0.5 }}
            >
              {type.label}
            </span>
            {i < mediaTypes.length - 1 && (
              <span
                className="w-px h-3 block"
                style={{ background: "rgba(184,196,224,0.15)" }}
              />
            )}
          </div>
        ))}
      </div>

    </section>
  );
}