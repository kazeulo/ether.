import Link from "next/link";

export default function CtaSection() {
  return (
    <section className="relative z-10 max-w-5xl mx-auto px-6 py-24">
      <div className="bg-bg-card border border-border-medium rounded-xl px-8 py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet/5 via-transparent to-teal/5 pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet/40 to-transparent" />

        <p className="text-violet text-[0.7rem] tracking-[0.2em] uppercase font-medium mb-4">Free forever</p>
        <h2 className="font-display font-black text-[clamp(2rem,4vw,3rem)] tracking-tight mb-4">
          Create and explore your universe.
        </h2>
        <p className="text-text-secondary text-sm max-w-sm mx-auto leading-relaxed mb-9">
          Join thousands of people who track what they watch, read, and play — all in one beautiful place.
        </p>
        <Link
          href="/register"
          className="inline-block px-9 py-3.5 bg-violet text-bg-base text-sm font-medium tracking-widest uppercase rounded-full hover:brightness-110 transition-all hover:-translate-y-px"
        >
          Create Your Free Account
        </Link>
      </div>
    </section>
  );
}