import Link from "next/link";

const pills = [
  { icon: "🎬", label: "Movies", color: "text-rose"   },
  { icon: "📺", label: "Series", color: "text-teal"   },
  { icon: "📖", label: "Books",  color: "text-violet" },
  { icon: "🎮", label: "Games",  color: "text-violet" },
];

export default function HeroSection() {
  return (
    <section className="relative z-10 min-h-screen max-w-5xl mx-auto px-6 pt-35 flex flex-col items-center text-center">
      <p className="animate-fade-up text-violet text-[0.7rem] tracking-[0.25em] uppercase font-medium mb-6">
        Your personal media universe
      </p>

      <h1 className="animate-fade-up [animation-delay:100ms] font-display font-black text-[clamp(2rem,6vw,4.5rem)] leading-[1.05] tracking-tight max-w-3xl mb-10">
        Every story you&apos;ve{" "}
        <em className="not-italic text-violet">lived</em>,{" "}
        <em className="not-italic text-gold">charted</em>.
      </h1>

      <p className="animate-fade-up [animation-delay:200ms] text-text-secondary text-sm font-light max-w-md leading-relaxed mb-10">
        bingelog is your all-in-one tracker for movies, series, books, and games.
        Rate, organize, and reflect on everything you consume.
      </p>

      <div className="animate-fade-up [animation-delay:300ms] flex gap-4 flex-wrap justify-center">
        <Link
          href="/register"
          className="px-5 py-3 bg-violet text-bg-base text-sm font-medium tracking-widest uppercase rounded-full hover:brightness-110 transition-all hover:-translate-y-px"
        >
          Start Tracking — Free
        </Link>
        <Link
          href="/explore"
          className="px-7 py-3 border border-border-medium text-sm tracking-widest uppercase rounded-full text-text-secondary hover:border-violet hover:text-violet transition-all"
        >
          Explore
        </Link>
      </div>

      <div className="animate-fade-up [animation-delay:400ms] flex gap-2 mt-10 flex-wrap justify-center">
        {pills.map((pill) => (
          <span
            key={pill.label}
            className={`text-[0.8rem] bg-bg-card border border-border-subtle px-4 py-1.5 rounded-full ${pill.color}`}
          >
            {pill.icon} {pill.label}
          </span>
        ))}
      </div>
    </section>
  );
}