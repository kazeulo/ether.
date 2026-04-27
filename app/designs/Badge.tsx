const badgeStyles: Record<string, string> = {
  movie:  "bg-rose/10 text-rose",
  series: "bg-teal/10 text-teal",
  book:   "bg-violet/10 text-violet",
  game:   "bg-violet/10 text-violet",
};

export default function Badge({ type }: { type: string }) {
  return (
    <span className={`text-[0.7rem] font-medium tracking-widest uppercase px-2 py-0.5 rounded ${badgeStyles[type]}`}>
      {type}
    </span>
  );
}