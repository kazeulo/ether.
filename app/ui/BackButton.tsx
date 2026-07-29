import Link from "next/link";

type BackButtonProps = {
  href?: string;
};

export default function BackButton({ href = "/" }: BackButtonProps) {
  return (
    <Link
      href={href}
      className="flex items-center justify-center w-9 h-9 rounded-full transition-all hover:-translate-x-0.5 hover:brightness-125"
      style={{
        background: "rgba(200,212,240,0.05)",
        border:     "1px solid rgba(200,212,240,0.1)",
        color:      "var(--color-mist)",
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
  );
}