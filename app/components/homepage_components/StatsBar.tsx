import { stats } from "@/lib/Constants";

export default function StatsBar() {
  return (
    <section className="relative z-10 border-y border-border-subtle bg-bg-surface">
      <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-4 divide-x divide-border-subtle">
        {stats.map((s, i) => (
          <div key={i} className="text-center px-6">
            <p className="font-display font-bold text-[2.5rem] leading-none text-violet mb-1">
              {s.value}<span className="text-2xl opacity-50">+</span>
            </p>
            <p className="text-text-muted text-[0.7rem] tracking-[0.1em] uppercase">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}