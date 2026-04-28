import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-border-subtle">
			<div className="max-w-5xl mx-auto px-6 py-8 flex items-center justify-between flex-wrap gap-4">
				<Link href="/" className="flex items-baseline">
					<span className="font-body text-md font-light tracking-[0.18em] text-text-primary uppercase">
						ether
					</span>
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