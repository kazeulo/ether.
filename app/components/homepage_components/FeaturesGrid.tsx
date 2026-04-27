import { features } from "@/lib/Constants";

export default function FeaturesGrid() {
  return (
    <section className="relative z-10 bg-bg-surface border-t border-border-subtle">
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <p className="text-teal text-[0.7rem] tracking-[0.2em] uppercase font-medium mb-3">Why bingelog</p>
          <h2 className="font-display text-[clamp(2rem,3vw,2.5rem)] font-bold leading-snug">
            Everything you need to remember<br />
            <em className="italic font-logo text-text-secondary font-normal">what you loved</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-bg-card border border-border-subtle rounded-lg p-7 hover:bg-bg-card-hover hover:border-border-medium hover:-translate-y-0.5 transition-all"
            >
              <div className="w-10 h-10 rounded-lg bg-bg-base border border-border-medium flex items-center justify-center text-violet text-lg mb-5">
                {f.icon}
              </div>
              <h3 className="font-display text-sm font-bold mb-2">{f.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}