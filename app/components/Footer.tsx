import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-border-subtle">
			<div className="max-w-5xl mx-auto px-6 py-8 flex items-center justify-between flex-wrap gap-4">
				<Link href="/" className="flex items-baseline">
					<span className="font-logo italic text-2xl tracking-tight text-text-primary">binge</span>
					<span className="font-logo text-2xl tracking-tight text-violet">log</span>
				</Link>
				<p className="text-text-muted text-xs">© {new Date().getFullYear()} bingelog. All rights reserved.</p>
				<div className="flex gap-6">
					{["Privacy", "Terms", "Contact"].map((l) => (
						<Link key={l} href={`/${l.toLowerCase()}`} className="text-text-muted text-xs hover:text-text-primary transition-colors">
							{l}
						</Link>
					))}
				</div>
			</div>
		</footer>
  )
}