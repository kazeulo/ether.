"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

const mediaTypes = [
  { label: "Movies", color: "var(--color-rose)"   },
  { label: "Series", color: "var(--color-teal)"   },
  { label: "Books",  color: "var(--color-violet)"  },
  { label: "Games",  color: "var(--color-gold)"    },
];

const marqueeItems = [
  "All About Lily Chou-Chou", "Norwegian Wood", "In the Mood for Love",
  "Spirited Away", "Vespertine", "The Virgin Suicides",
  "Kokoro", "Nier: Automata", "Shogun", "The Master and Margarita",
];

// Add this to globals.css @layer utilities:
// @keyframes marquee {
//   from { transform: translateX(0); }
//   to   { transform: translateX(-50%); }
// }
// .animate-marquee { animation: marquee 26s linear infinite; }

function Stars() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    for (let i = 0; i < 55; i++) {
      const s = document.createElement("div");
      const size = Math.random() * 1.5 + 0.5;
      s.className = "star";
      s.style.cssText = `
        width:${size}px;height:${size}px;
        top:${Math.random() * 100}%;left:${Math.random() * 100}%;
        animation-duration:${Math.random() * 4 + 3}s;
        animation-delay:${Math.random() * 6}s;
      `;
      ref.current.appendChild(s);
    }
  }, []);
  return <div ref={ref} className="absolute inset-0 pointer-events-none z-[1]" />;
}

function CornerMark({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const base: React.CSSProperties = {
    position: "absolute", width: 14, height: 14,
    opacity: 0.28, zIndex: 3, pointerEvents: "none",
  };
  const positions: Record<string, React.CSSProperties> = {
    tl: { top: 24, left: 24 },
    tr: { top: 24, right: 24, transform: "scaleX(-1)" },
    bl: { bottom: 24, left: 24, transform: "scaleY(-1)" },
    br: { bottom: 24, right: 24, transform: "scale(-1)" },
  };
  return (
    <div style={{ ...base, ...positions[pos] }}>
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "0.5px", background: "var(--color-mist)" }} />
      <div style={{ position: "absolute", top: 0, left: 0, width: "0.5px", height: "100%", background: "var(--color-mist)" }} />
    </div>
  );
}

export default function HeroSection() {
  const marquee = [...marqueeItems, ...marqueeItems];

  return (
    <section
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "var(--color-bg-base)" }}
    >

      {/* Stars */}
      <Stars />

      {/* Glow orbs — keyframes from globals.css */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        <div
          className="absolute rounded-full glow-orb-1"
          style={{
            width: 480, height: 480, top: -160, left: -120,
            background: "radial-gradient(circle, var(--color-violet) 0%, transparent 65%)",
            filter: "blur(88px)", opacity: 0.13,
          }}
        />
        <div
          className="absolute rounded-full glow-orb-2"
          style={{
            width: 380, height: 380, bottom: -120, right: -100,
            background: "radial-gradient(circle, var(--color-teal) 0%, transparent 65%)",
            filter: "blur(88px)", opacity: 0.11,
          }}
        />
        <div
          className="absolute rounded-full glow-orb-3"
          style={{
            width: 240, height: 240, top: "35%", left: "58%",
            background: "radial-gradient(circle, var(--color-gold) 0%, transparent 65%)",
            filter: "blur(70px)", opacity: 0.08,
          }}
        />
      </div>

      {/* Grain */}
      <div
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          opacity: 0.032,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px",
        }}
      />

      {/* Film-frame hairlines */}
      <div className="absolute left-8 right-8 pointer-events-none z-[3]"
        style={{ top: 32, height: "0.5px", background: "var(--color-border-subtle)" }} />
      <div className="absolute left-8 right-8 pointer-events-none z-[3]"
        style={{ bottom: 32, height: "0.5px", background: "var(--color-border-subtle)" }} />

      {/* Corner ticks */}
      {(["tl", "tr", "bl", "br"] as const).map((p) => <CornerMark key={p} pos={p} />)}

      {/* Side ambient stats */}
      <div
        className="absolute right-8 top-1/2 -translate-y-1/2 z-[5] text-right
                   animate-fade-up [animation-delay:1000ms] opacity-0"
        style={{ animationFillMode: "forwards" }}
      >
        <span className="block" style={{ fontFamily: "var(--font-logo)", fontSize: 40, fontWeight: 400, color: "var(--color-text-muted)", lineHeight: 1 }}>
          247
        </span>
        <span className="block mt-1" style={{ fontSize: 8, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--color-text-muted)", opacity: 0.55 }}>
          worlds held
        </span>
      </div>

      {/* About — vertical film-spine label, left edge */}
      <Link
        href="/about"
        className="absolute left-8 top-1/2 -translate-y-1/2 z-[5]
                   animate-fade-up [animation-delay:1100ms] opacity-0
                   group flex flex-col items-center gap-3"
        style={{ animationFillMode: "forwards", textDecoration: "none" }}
      >
        {/* top tick */}
        <span style={{ display: "block", width: "0.5px", height: 32, background: "var(--color-border-medium)", transition: "height 0.4s ease" }} className="group-hover:h-10" />
        {/* rotated text */}
        <span
          style={{
            fontSize: 9, letterSpacing: "0.32em", textTransform: "uppercase",
            color: "var(--color-text-muted)", fontWeight: 400,
            writingMode: "vertical-rl", transform: "rotate(180deg)",
            transition: "color 0.3s ease",
          }}
          className="group-hover:text-[var(--color-mist)]"
        >
          about this world
        </span>
        {/* bottom tick */}
        <span style={{ display: "block", width: "0.5px", height: 32, background: "var(--color-border-medium)" }} />
      </Link>

      {/* Main content */}
      <div className="relative z-[5] flex flex-col items-center text-center px-6 max-w-2xl w-full">

        {/* Eyebrow */}
        <div
          className="animate-fade-up [animation-delay:100ms] opacity-0 flex items-center gap-4 mb-6"
          style={{ animationFillMode: "forwards" }}
        >
          <span style={{ display: "block", width: 28, height: "0.5px", background: "var(--color-border-medium)" }} />
          <span style={{ fontSize: 9, letterSpacing: "0.38em", textTransform: "uppercase", color: "var(--color-text-muted)", fontWeight: 400 }}>
            every story leaves a mark
          </span>
          <span style={{ display: "block", width: 28, height: "0.5px", background: "var(--color-border-medium)" }} />
        </div>

        {/* Wordmark */}
        <h1
          className="animate-fade-up [animation-delay:250ms] opacity-0"
          style={{
            fontFamily: "var(--font-logo)",
            fontSize: "clamp(68px, 13vw, 100px)",
            fontWeight: 400, fontStyle: "italic",
            letterSpacing: "-0.02em", lineHeight: 1,
            color: "var(--color-text-primary)",
            marginBottom: "0.1em",
            animationFillMode: "forwards",
          }}
        >
          ether
          <span style={{ color: "var(--color-gold)", fontStyle: "normal" }}>.</span>
        </h1>

        {/* Tagline */}
        <p
          className="animate-fade-up [animation-delay:420ms] opacity-0"
          style={{
            fontFamily: "var(--font-logo)",
            fontSize: 16, fontStyle: "italic", fontWeight: 400,
            color: "var(--color-text-secondary)", lineHeight: 1.8,
            letterSpacing: "0.02em", marginBottom: "2.4rem",
            animationFillMode: "forwards",
          }}
        >
          Every world you&apos;ve entered,{" "}
          <em style={{ fontStyle: "normal", color: "var(--color-mist)" }}>remembered</em>.
          <br />
          Every frequency you&apos;ve felt,{" "}
          <em style={{ fontStyle: "normal", color: "var(--color-mist)" }}>held</em>.
        </p>

        {/* Media type strip */}
        <div
          className="animate-fade-up [animation-delay:580ms] opacity-0 inline-flex mb-9"
          style={{ border: "0.5px solid var(--color-border-medium)", animationFillMode: "forwards" }}
        >
          {mediaTypes.map((type, i) => (
            <div
              key={type.label}
              style={{
                padding: "0.45rem 1.1rem",
                fontSize: 9, letterSpacing: "0.24em",
                textTransform: "uppercase",
                fontWeight: 400, color: type.color,
                borderRight: i < mediaTypes.length - 1
                  ? "0.5px solid var(--color-border-subtle)"
                  : "none",
              }}
            >
              {type.label}
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div
          className="animate-fade-up [animation-delay:720ms] opacity-0 flex items-center gap-4"
          style={{ animationFillMode: "forwards" }}
        >
          <Link
            href="/register"
            className="transition-all hover:brightness-110"
            style={{
              padding: "0.65rem 1.9rem",
              fontSize: 10, letterSpacing: "0.26em",
              textTransform: "uppercase",
              color: "var(--color-mist)",
              background: "rgba(200,212,240,0.07)",
              border: "0.5px solid var(--color-border-medium)",
              fontWeight: 400,
            }}
          >
            Enter the Ether
          </Link>
          <Link
            href="/explore"
            className="transition-colors"
            style={{
              fontSize: 10, letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--color-text-muted)", fontWeight: 400,
            }}
          >
            Explore →
          </Link>

        </div>
      </div>

      {/* Scrolling marquee */}
      {/* Add to globals.css: @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} } */}
      <div
        className="absolute left-0 right-0 z-[4] overflow-hidden"
        style={{ bottom: 44, borderTop: "0.5px solid var(--color-border-subtle)", paddingTop: 10 }}
      >
        <div
          className="flex gap-10 whitespace-nowrap"
          style={{ animation: "marquee 26s linear infinite" }}
        >
          {marquee.map((title, i) => (
            <span
              key={i}
              style={{
                fontFamily: "var(--font-logo)", fontStyle: "italic",
                fontSize: 11, color: "var(--color-text-muted)",
                letterSpacing: "0.06em", flexShrink: 0,
              }}
            >
              {title}
              <span style={{ margin: "0 1.2rem", opacity: 0.3 }}>·</span>
            </span>
          ))}
        </div>
      </div>

    </section>
  );
}