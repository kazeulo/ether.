import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About",    href: "/about"    },
];

export default function Header() {
  return (
    <header className="relative z-50 sticky top-0 border-b border-border-subtle"
      style={{ background: "rgba(8, 11, 18, 0.75)", backdropFilter: "blur(20px)" }}
    >
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Wordmark */}
        <Link href="/" className="flex items-center gap-px group">
          <span className="font-body text-lg font-light tracking-[0.18em] text-text-primary uppercase">
            ether
          </span>
          <span
            className="w-1.5 h-1.5 rounded-full mb-3 ml-0.5 transition-all group-hover:scale-125"
            style={{ background: "var(--color-mist)" }}
          />
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-8">
          {navLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-text-muted text-xs tracking-[0.12em] uppercase hover:text-mist transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-[0.7rem] tracking-widest uppercase px-5 py-2 rounded-full text-text-secondary hover:text-mist transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="text-[0.7rem] tracking-widest uppercase px-5 py-2 rounded-full border transition-all hover:brightness-110"
            style={{
              borderColor: "rgba(184, 196, 224, 0.2)",
              color: "var(--color-mist)",
            }}
          >
            Get Started
          </Link>
        </div>

      </div>
    </header>
  );
}