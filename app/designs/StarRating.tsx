export default function StarRating({ n }: { n: number }) {
  return (
    <span className="text-violet text-xs tracking-wider">
      {"★".repeat(n)}{"☆".repeat(5 - n)}
    </span>
  );
}