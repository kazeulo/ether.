"use client";

import { useState } from "react";

// ── Types ─────────────────────────────────────────────────────────
type Mood = {
  label: string;
  color: string;
  bg: string;
};

type FeaturedItem = {
  title: string;
  creator: string;
  type: string;
  year: string;
  rating: string;
  mood: string;
  moodColor: string;
  desc: string;
  grad: string;
};

type GridItem = {
  title: string;
  type: string;
  year: string;
  rating: string;
  grad: string;
};

// ── Data ──────────────────────────────────────────────────────────
const moods: Mood[] = [
  { label: "melancholic", color: "var(--color-mist)",           bg: "rgba(200,212,240,0.12)" },
  { label: "liminal",     color: "var(--color-teal)",           bg: "rgba(142,212,212,0.12)" },
  { label: "dreamlike",   color: "var(--color-violet)",         bg: "rgba(184,174,240,0.12)" },
  { label: "wistful",     color: "var(--color-gold)",           bg: "rgba(237,220,176,0.12)" },
  { label: "tender",      color: "var(--color-rose)",           bg: "rgba(212,154,174,0.12)" },
  { label: "ethereal",    color: "var(--color-mist)",           bg: "rgba(200,212,240,0.12)" },
  { label: "aching",      color: "var(--color-rose)",           bg: "rgba(212,154,174,0.12)" },
  { label: "hushed",      color: "var(--color-teal)",           bg: "rgba(142,212,212,0.12)" },
  { label: "restless",    color: "var(--color-violet)",         bg: "rgba(184,174,240,0.12)" },
  { label: "hollow",      color: "var(--color-text-secondary)", bg: "rgba(138,150,184,0.1)"  },
  { label: "luminous",    color: "var(--color-gold)",           bg: "rgba(237,220,176,0.12)" },
  { label: "fractured",   color: "var(--color-rose)",           bg: "rgba(212,154,174,0.12)" },
];

const thumbGrads = [
  "linear-gradient(160deg,#6a7a9a,#3a4a60)",
  "linear-gradient(160deg,#8a7060,#5a4030)",
  "linear-gradient(160deg,#607080,#303848)",
  "linear-gradient(160deg,#7a6880,#4a3858)",
  "linear-gradient(160deg,#608070,#304840)",
  "linear-gradient(160deg,#8a8070,#584e3e)",
  "linear-gradient(160deg,#607898,#384860)",
  "linear-gradient(160deg,#8a7868,#5a4838)",
];

const featuredItems: FeaturedItem[] = [
  {
    title: "All About Lily Chou-Chou", creator: "Shunji Iwai",
    type: "Film", year: "2001", rating: "9.1",
    mood: "melancholic", moodColor: "var(--color-mist)",
    desc: "Ether. The invisible medium that connects us all.",
    grad: thumbGrads[0],
  },
  {
    title: "Norwegian Wood", creator: "Haruki Murakami",
    type: "Book", year: "1987", rating: "9.0",
    mood: "wistful", moodColor: "var(--color-gold)",
    desc: "A grief so tender it feels like morning.",
    grad: thumbGrads[1],
  },
  {
    title: "In the Mood for Love", creator: "Wong Kar-wai",
    type: "Film", year: "2000", rating: "9.3",
    mood: "aching", moodColor: "var(--color-rose)",
    desc: "Love restrained until it breaks everything.",
    grad: thumbGrads[2],
  },
];

const gridItems: GridItem[] = [
  { title: "Shogun",                     type: "Series", year: "2024", rating: "9.0", grad: thumbGrads[0] },
  { title: "The Remains of the Day",     type: "Book",   year: "1989", rating: "8.7", grad: thumbGrads[1] },
  { title: "Arrival",                    type: "Film",   year: "2016", rating: "8.8", grad: thumbGrads[2] },
  { title: "Hollow Knight",              type: "Game",   year: "2017", rating: "9.1", grad: thumbGrads[3] },
  { title: "Colorless Tsukuru Tazaki",   type: "Book",   year: "2013", rating: "8.3", grad: thumbGrads[4] },
  { title: "Portrait of a Lady on Fire", type: "Film",   year: "2019", rating: "9.2", grad: thumbGrads[5] },
  { title: "Disco Elysium",              type: "Game",   year: "2019", rating: "9.4", grad: thumbGrads[6] },
  { title: "Slowdive",                   type: "Album",  year: "2017", rating: "8.5", grad: thumbGrads[7] },
];

const spotlightItems = [
  "Lost in Translation", "Somewhere", "Paterson",
  "The Double", "Under the Skin", "Limbo", "Transit",
];

const stars = Array.from({ length: 50 }, (_, i) => ({
  top:      `${(i * 37.3) % 100}%`,
  left:     `${(i * 61.8) % 100}%`,
  size:     (i % 3) + 1,
  duration: `${3 + (i % 5)}s`,
  delay:    `${(i * 0.37) % 5}s`,
}));

// ── Helpers ───────────────────────────────────────────────────────
function Label({ children, centered }: { children: React.ReactNode; centered?: boolean }) {
  return (
    <div
      className="flex items-center gap-3"
      style={{ justifyContent: centered ? "center" : "flex-start", marginBottom: "1rem" }}
    >
      <span style={{ display: "block", width: 24, height: "0.5px", background: "var(--color-border-medium)" }} />
      <span style={{ fontSize: 9, letterSpacing: "0.38em", textTransform: "uppercase", color: "var(--color-text-muted)", fontWeight: 400 }}>
        {children}
      </span>
      {centered && <span style={{ display: "block", width: 24, height: "0.5px", background: "var(--color-border-medium)" }} />}
    </div>
  );
}

function FeaturedRow({ item, activeMood }: { item: FeaturedItem; activeMood: Mood }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "grid", gridTemplateColumns: "140px 1fr",
        border: "0.5px solid var(--color-border-subtle)",
        marginBottom: "-0.5px", cursor: "pointer",
        background: hovered ? "rgba(200,212,240,0.03)" : "transparent",
        transition: "background 0.25s",
      }}
    >
      <div style={{ height: 100, background: item.grad, display: "flex", alignItems: "flex-end", padding: "0.75rem" }}>
        <span style={{ fontFamily: "var(--font-logo)", fontStyle: "italic", fontSize: 11, color: "rgba(232,240,255,0.85)", lineHeight: 1.3 }}>
          {item.title}
        </span>
      </div>
      <div style={{ padding: "1.1rem 1.4rem", borderLeft: "0.5px solid var(--color-border-subtle)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", marginBottom: "0.4rem" }}>
            <span style={{ fontSize: 8, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-text-muted)" }}>{item.type}</span>
            <span style={{ width: 2, height: 2, borderRadius: "50%", background: "var(--color-text-muted)", display: "block" }} />
            <span style={{ fontSize: 8, letterSpacing: "0.16em", textTransform: "uppercase", color: activeMood.color }}>{activeMood.label}</span>
          </div>
          <div style={{ fontFamily: "var(--font-logo)", fontSize: 15, fontWeight: 400, lineHeight: 1.3, marginBottom: "0.35rem" }}>
            {item.title}
          </div>
          <div style={{ fontSize: 11, color: "var(--color-text-secondary)", lineHeight: 1.7 }}>{item.desc}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.7rem" }}>
          <span style={{ fontSize: 9, letterSpacing: "0.14em", color: "var(--color-text-muted)" }}>{item.creator} · {item.year}</span>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span style={{ fontFamily: "var(--font-logo)", fontSize: 18, color: "var(--color-gold-dim)" }}>{item.rating}</span>
            <span style={{ fontSize: 11, color: "var(--color-text-muted)", opacity: hovered ? 1 : 0, transform: hovered ? "translateX(0)" : "translateX(-6px)", transition: "all 0.28s" }}>→</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function GridCard({ item }: { item: GridItem }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: "0.5px solid var(--color-border-subtle)",
        marginRight: "-0.5px", marginBottom: "-0.5px",
        cursor: "pointer",
        background: hovered ? "var(--color-bg-card-hover)" : "transparent",
        transition: "background 0.25s",
      }}
    >
      <div style={{ aspectRatio: "2/3", background: item.grad, display: "flex", alignItems: "flex-end", padding: "0.7rem" }}>
        <span style={{ fontFamily: "var(--font-logo)", fontStyle: "italic", fontSize: 10, color: "rgba(232,240,255,0.8)", lineHeight: 1.3 }}>
          {item.title}
        </span>
      </div>
      <div style={{ padding: "0.8rem" }}>
        <div style={{ fontSize: 10.5, lineHeight: 1.3, marginBottom: "0.2rem" }}>{item.title}</div>
        <div style={{ fontSize: 8, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-text-muted)", display: "flex", justifyContent: "space-between" }}>
          <span>{item.type} · {item.year}</span>
          <span style={{ color: "var(--color-gold-dim)" }}>{item.rating}</span>
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────
export default function ExplorePage() {
  const [activeMood, setActiveMood] = useState<Mood>(moods[0]);

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ background: "var(--color-bg-base)", color: "var(--color-text-primary)", fontFamily: "var(--font-body)", fontWeight: 300 }}
    >

      {/* ── Background ─────────────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {stars.map((s, i) => (
          <span key={i} className="star absolute rounded-full bg-white"
            style={{ top: s.top, left: s.left, width: s.size, height: s.size, animationDuration: s.duration, animationDelay: s.delay }} />
        ))}
        <div className="glow-orb-1 absolute rounded-full"
          style={{ width: 400, height: 400, top: "-8%", left: "15%", background: "radial-gradient(circle,rgba(184,174,240,0.07),transparent 65%)", filter: "blur(90px)" }} />
        <div className="glow-orb-2 absolute rounded-full"
          style={{ width: 360, height: 360, bottom: "10%", right: "-5%", background: "radial-gradient(circle,rgba(142,212,212,0.05),transparent 65%)", filter: "blur(90px)" }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6">

        {/* ── Page header ──────────────────────────────────── */}
        <div style={{ padding: "4.5rem 0 2.5rem" }}>
          <Label>explore</Label>
          <h1 style={{ fontFamily: "var(--font-logo)", fontSize: "clamp(2rem,5vw,3.4rem)", fontWeight: 400, fontStyle: "italic", lineHeight: 1.1, letterSpacing: "-0.01em" }}>
            Find something that{" "}
            <em style={{ fontStyle: "normal", color: "var(--color-mist)" }}>moves</em> you.
          </h1>
        </div>

        <div style={{ height: "0.5px", background: "var(--color-border-subtle)" }} />

        {/* ── Mood filter ──────────────────────────────────── */}
        <div style={{ padding: "2rem 0 2.5rem" }}>
          <Label>filter by atmosphere</Label>
          <div className="flex flex-wrap gap-2">
            {moods.map((m) => (
              <button
                key={m.label}
                onClick={() => setActiveMood(m)}
                style={{
                  padding: "0.38rem 1rem",
                  border: `0.5px solid ${activeMood.label === m.label ? "transparent" : "var(--color-border-subtle)"}`,
                  fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase",
                  color: activeMood.label === m.label ? m.color : "var(--color-text-secondary)",
                  background: activeMood.label === m.label ? m.bg : "transparent",
                  cursor: "pointer", fontFamily: "var(--font-body)", fontWeight: 400,
                  transition: "all 0.22s",
                }}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ height: "0.5px", background: "var(--color-border-subtle)" }} />

        {/* ── Featured rows ────────────────────────────────── */}
        <div style={{ padding: "2rem 0 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "1.5rem" }}>
            <h2 style={{ fontFamily: "var(--font-logo)", fontSize: 20, fontWeight: 400, fontStyle: "italic" }}>
              Drifting through{" "}
              <em style={{ fontStyle: "normal", color: activeMood.color }}>{activeMood.label}</em>
            </h2>
            <span style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-text-muted)", cursor: "pointer" }}>
              see all →
            </span>
          </div>
          <div>
            {featuredItems.map((item) => (
              <FeaturedRow key={item.title} item={item} activeMood={activeMood} />
            ))}
          </div>
        </div>

        <div style={{ height: "0.5px", background: "var(--color-border-subtle)", margin: "2.5rem 0 0" }} />

        {/* ── Grid ─────────────────────────────────────────── */}
        <div style={{ padding: "2rem 0 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.2rem" }}>
            <h2 style={{ fontFamily: "var(--font-logo)", fontSize: 18, fontWeight: 400, fontStyle: "italic" }}>
              More in this frequency
            </h2>
            <span style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-text-muted)", cursor: "pointer" }}>
              see all →
            </span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}>
            {gridItems.map((item) => (
              <GridCard key={item.title} item={item} />
            ))}
          </div>
        </div>

        <div style={{ height: "0.5px", background: "var(--color-border-subtle)", margin: "2.5rem 0 0" }} />

        {/* ── Spotlight ────────────────────────────────────── */}
        <div style={{ padding: "2rem 0 6rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.2rem" }}>
            <h2 style={{ fontFamily: "var(--font-logo)", fontSize: 18, fontWeight: 400, fontStyle: "italic" }}>
              Atmosphere of the week
            </h2>
          </div>
          <div
            style={{
              border: "0.5px solid var(--color-border-medium)",
              padding: "2.5rem", position: "relative", overflow: "hidden",
            }}
          >
            {/* decorative large number */}
            <span style={{
              position: "absolute", bottom: "1.5rem", right: "2rem",
              fontFamily: "var(--font-logo)", fontSize: 64, fontWeight: 400,
              color: "var(--color-text-muted)", opacity: 0.1, lineHeight: 1, pointerEvents: "none",
            }}>
              38
            </span>
            <div style={{ fontSize: 9, letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--color-text-muted)", marginBottom: "0.6rem" }}>
              this week's atmosphere
            </div>
            <div style={{ fontFamily: "var(--font-logo)", fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 400, fontStyle: "italic", color: "var(--color-teal)", lineHeight: 1, marginBottom: "0.8rem" }}>
              liminal
            </div>
            <p style={{ fontSize: 12, color: "var(--color-text-secondary)", lineHeight: 1.8, maxWidth: 400, marginBottom: "1.8rem" }}>
              The threshold between worlds. Media that lives in the in-between — neither here nor there, suspended in transition.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {spotlightItems.map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: 10, letterSpacing: "0.1em", color: "var(--color-text-secondary)",
                    padding: "0.35rem 0.8rem", border: "0.5px solid var(--color-border-subtle)",
                    cursor: "pointer",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}