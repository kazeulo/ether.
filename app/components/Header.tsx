import Link from "next/link";

export default function Header() {
  return (
    <header className="relative z-50 sticky top-0 bg-bg-base/80 backdrop-blur-md border-b border-border-subtle">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">

        <Link href="/" className="flex items-baseline">
          <span className="font-logo italic text-2xl tracking-tight text-text-primary">binge</span>
          <span className="font-logo text-2xl tracking-tight text-violet">log</span>
        </Link>

        <nav className="flex items-center gap-8">
          {[
            { label: "Home",     href: "/"         },
            { label: "Discover", href: "/discover" },
            { label: "About",    href: "/about"    },
            { label: "FAQs",    href: "/faqs"      },
          ].map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-text-secondary text-sm tracking-wide hover:text-text-primary transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-[0.7rem] tracking-widest uppercase px-5 py-2 rounded-full border border-border-medium text-text-secondary hover:border-violet hover:text-violet transition-all"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="text-[0.7rem] tracking-widest uppercase px-5 py-2 rounded-full bg-violet text-bg-base font-medium hover:brightness-110 transition-all"
          >
            Get Started
          </Link>
        </div>

      </div>
    </header>
  );
}