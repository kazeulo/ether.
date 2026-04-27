import { recentActivity } from "@/lib/Constants";
import Badge from "@/designs/Badge";
import StarRating from "@/designs/StarRating";

export default function RecentActivity() {
  return (
    <section className="relative z-10 max-w-5xl mx-auto px-6 py-20">
      <div className="text-center mb-12">
        <p className="text-rose text-[0.7rem] tracking-[0.2em] uppercase font-medium mb-3">Dashboard Preview</p>
        <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-bold">Your recent activity</h2>
      </div>

      <div className="bg-bg-surface border border-border-subtle rounded-xl overflow-hidden">
        <div className="grid grid-cols-[1fr_auto_auto_auto] px-6 py-3 border-b border-border-subtle">
          {["Title", "Type", "Status", "Rating"].map((h) => (
            <span key={h} className="text-[0.7rem] tracking-[0.12em] uppercase text-text-muted font-medium">{h}</span>
          ))}
        </div>

        {recentActivity.map((item, i) => (
          <div
            key={i}
            className={`grid grid-cols-[1fr_auto_auto_auto] items-center px-6 py-4 hover:bg-bg-card transition-colors ${
              i < recentActivity.length - 1 ? "border-b border-border-subtle" : ""
            }`}
          >
            <div>
              <p className="text-sm">{item.title}</p>
              <p className="text-text-muted text-xs mt-0.5">{item.year}</p>
            </div>
            <div className="pl-8"><Badge type={item.type} /></div>
            <div className="pl-8">
              <span className="text-xs text-text-secondary bg-bg-card border border-border-subtle rounded px-2 py-0.5">
                {item.status}
              </span>
            </div>
            <div className="pl-8"><StarRating n={item.rating} /></div>
          </div>
        ))}
      </div>
    </section>
  );
}