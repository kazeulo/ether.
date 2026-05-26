"use client";

import Link from "next/link";
import { useState } from "react";
import { stars } from "@/designs/Stars";

// Types

type MediaType = "movie" | "series" | "book" | "game";

type MediaEntry = {
  id:       string;
  type:     MediaType;
  title:    string;
  subtitle: string;
  status:   "in-progress" | "completed" | "dropped";
  mood?:    string;
  tags?:    string[];
  cover?:   string; // url or placeholder color
};

type Stat = {
  label: string;
  value: string | number;
  sub?:  string;
};

// Mock Data
const inProgress: MediaEntry[] = [
  { id: "1", type: "series",  title: "Severance",          subtitle: "Season 2",           status: "in-progress", mood: "eerie",       tags: ["corporate", "surreal"]   },
  { id: "2", type: "book",    title: "The Waves",           subtitle: "Virginia Woolf",     status: "in-progress", mood: "melancholic",  tags: ["stream-of-consciousness"] },
  { id: "3", type: "game",    title: "Disco Elysium",       subtitle: "The Final Cut",      status: "in-progress", mood: "chaotic",      tags: ["noir", "political"]      },
  { id: "4", type: "movie",   title: "In the Mood for Love",subtitle: "Wong Kar-wai",       status: "in-progress", mood: "nostalgic",    tags: ["romance", "longing"]     },
];

const favorites: MediaEntry[] = [
  { id: "5", type: "movie",  title: "All About Lily Chou Chou", subtitle: "Shunji Iwai, 2001",  status: "completed", mood: "ethereal",    tags: ["identity", "ether"] },
  { id: "6", type: "series", title: "Twin Peaks",               subtitle: "David Lynch",        status: "completed", mood: "uncanny",     tags: ["mystery", "surreal"] },
  { id: "7", type: "book",   title: "Norwegian Wood",           subtitle: "Haruki Murakami",    status: "completed", mood: "melancholic", tags: ["memory", "loss"] },
  { id: "8", type: "game",   title: "Hollow Knight",            subtitle: "Team Cherry",        status: "completed", mood: "serene",      tags: ["isolation", "beauty"] },
];

const stats: Stat[] = [
  { label: "Total logged",   value: 142,   sub: "entries" },
  { label: "This month",     value: 11,    sub: "new logs" },
  { label: "Hours consumed", value: "840+", sub: "estimated" },
  { label: "Unique moods",   value: 18,    sub: "tagged" },
];

const moodData = [
  { mood: "melancholic", count: 34, color: "var(--color-violet)" },
  { mood: "serene",      count: 28, color: "var(--color-teal)"   },
  { mood: "nostalgic",   count: 22, color: "var(--color-gold)"   },
  { mood: "chaotic",     count: 19, color: "var(--color-rose)"   },
  { mood: "ethereal",    count: 17, color: "var(--color-mist)"   },
  { mood: "uncanny",     count: 12, color: "rgba(200,212,240,0.4)" },
];

const mediaBreakdown: { type: MediaType; label: string; count: number; color: string }[] = [
  { type: "movie",  label: "Movies", count: 48, color: "var(--color-rose)"   },
  { type: "series", label: "Series", count: 31, color: "var(--color-teal)"   },
  { type: "book",   label: "Books",  count: 38, color: "var(--color-violet)" },
  { type: "game",   label: "Games",  count: 25, color: "var(--color-gold)"   },
];

const etherWords = [
  "longing", "silence", "memory", "dusk", "signal",
  "static",  "tender",  "hollow", "drift", "echo",
  "ache",    "liminal", "blur",   "pulse", "fade",
];

// Helpers

const typeIcon: Record<MediaType, string> = {
  movie:  "◈",
  series: "◉",
  book:   "◌",
  game:   "◆",
};

const typeColor: Record<MediaType, string> = {
  movie:  "var(--color-rose)",
  series: "var(--color-teal)",
  book:   "var(--color-violet)",
  game:   "var(--color-gold)",
};

const total = mediaBreakdown.reduce((a, b) => a + b.count, 0);
const moodMax = Math.max(...moodData.map((m) => m.count));

// Sub-components

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[0.6rem] tracking-[0.4em] uppercase font-medium mb-5"
       style={{ color: "var(--color-mist)", opacity: 0.45 }}>
      {children}
    </p>
  );
}

function MediaCard({ entry }: { entry: MediaEntry }) {
  return (
    <div
      className="group flex flex-col gap-2 p-4 rounded-2xl transition-all hover:brightness-110 cursor-pointer"
      style={{
        background:  "rgba(255,255,255,0.02)",
        border:      "1px solid rgba(200,212,240,0.07)",
        transition:  "border-color 0.2s ease, background 0.2s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(200,212,240,0.15)";
        (e.currentTarget as HTMLElement).style.background  = "rgba(255,255,255,0.04)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(200,212,240,0.07)";
        (e.currentTarget as HTMLElement).style.background  = "rgba(255,255,255,0.02)";
      }}
    >
      {/* Type badge */}
      <div className="flex items-center justify-between">
        <span className="text-[0.55rem] tracking-[0.25em] uppercase font-medium"
              style={{ color: typeColor[entry.type], opacity: 0.8 }}>
          {typeIcon[entry.type]} {entry.type}
        </span>
        {entry.mood && (
          <span className="text-[0.55rem] tracking-[0.15em] uppercase"
                style={{ color: "var(--color-mist)", opacity: 0.35 }}>
            {entry.mood}
          </span>
        )}
      </div>

      {/* Title */}
      <div>
        <p className="text-sm font-medium leading-snug text-text-primary">{entry.title}</p>
        <p className="text-[0.65rem] text-text-muted mt-0.5">{entry.subtitle}</p>
      </div>

      {/* Tags */}
      {entry.tags && (
        <div className="flex flex-wrap gap-1 mt-1">
          {entry.tags.map((tag) => (
            <span key={tag}
                  className="text-[0.55rem] tracking-[0.1em] uppercase px-2 py-0.5 rounded-full"
                  style={{
                    background: "rgba(200,212,240,0.05)",
                    border:     "1px solid rgba(200,212,240,0.08)",
                    color:      "var(--color-mist)",
                    opacity:    0.6,
                  }}>
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// Page

export default function DashboardPage() {
  const [activeFilter, setActiveFilter] = useState<MediaType | "all">("all");

  const filteredFavorites = activeFilter === "all"
    ? favorites
    : favorites.filter((e) => e.type === activeFilter);

  return (
    <div className="min-h-screen bg-bg-base text-text-primary relative overflow-x-hidden">

      {/* ── Starfield ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {stars.map((s, i) => (
          <span key={i} className="star absolute rounded-full bg-white"
                style={{ top: s.top, left: s.left, width: s.size, height: s.size,
                         animationDuration: s.duration, animationDelay: s.delay }} />
        ))}
        <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full blur-[160px]"
             style={{ background: "rgba(142,212,212,0.04)" }} />
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full blur-[130px]"
             style={{ background: "rgba(184,174,240,0.05)" }} />
      </div>

      {/* ── Nav ── */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 border-b"
           style={{ borderColor: "rgba(200,212,240,0.06)" }}>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-1 group">
          <span className="font-body font-light tracking-[0.3em] uppercase text-lg text-text-primary">ether</span>
          <span className="w-1.5 h-1.5 rounded-full mb-3 ml-0.5 group-hover:scale-125 transition-transform"
                style={{ background: "var(--color-mist)", boxShadow: "0 0 6px 2px rgba(200,212,240,0.3)" }} />
        </Link>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-8">
          {["Dashboard", "Library", "Discover", "Profile"].map((item) => (
            <Link key={item} href={`/${item.toLowerCase()}`}
                  className="text-[0.65rem] tracking-[0.2em] uppercase transition-colors hover:text-text-primary"
                  style={{ color: item === "Dashboard" ? "var(--color-mist)" : "var(--color-text-muted)" }}>
              {item}
            </Link>
          ))}
        </div>

        {/* Avatar */}
        <div className="flex items-center gap-3">
          <span className="text-[0.6rem] tracking-[0.2em] uppercase text-text-muted hidden sm:block">
            cosmicwatcher
          </span>
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-[0.6rem] font-medium"
               style={{
                 background: "rgba(200,212,240,0.08)",
                 border:     "1px solid rgba(200,212,240,0.12)",
                 color:      "var(--color-mist)",
               }}>
            CW
          </div>
        </div>
      </nav>

      {/* ── Main ── */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 py-12">

        {/* Page header */}
        <div className="mb-14">
          <p className="text-[0.6rem] tracking-[0.4em] uppercase mb-3 font-medium"
             style={{ color: "var(--color-mist)", opacity: 0.45 }}>
            your universe
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-black tracking-tight">
            Dashboard
          </h1>
        </div>

        {/* ── Stats row ── */}
        <section className="mb-16">
          <SectionLabel>at a glance</SectionLabel>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {stats.map((s) => (
              <div key={s.label}
                   className="flex flex-col gap-1 p-5 rounded-2xl"
                   style={{
                     background: "rgba(255,255,255,0.02)",
                     border:     "1px solid rgba(200,212,240,0.07)",
                   }}>
                <span className="text-[0.55rem] tracking-[0.25em] uppercase text-text-muted">{s.label}</span>
                <span className="font-display text-3xl font-black tracking-tight text-text-primary">{s.value}</span>
                {s.sub && <span className="text-[0.6rem] text-text-muted">{s.sub}</span>}
              </div>
            ))}
          </div>
        </section>

        {/* ── Two-col: media breakdown + mood profile ── */}
        <section className="mb-16 grid md:grid-cols-2 gap-6">

          {/* Media breakdown */}
          <div className="p-6 rounded-2xl"
               style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(200,212,240,0.07)" }}>
            <SectionLabel>media breakdown</SectionLabel>
            <div className="flex flex-col gap-4">
              {mediaBreakdown.map((m) => {
                const pct = Math.round((m.count / total) * 100);
                return (
                  <div key={m.type} className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[0.6rem] tracking-[0.2em] uppercase text-text-muted flex items-center gap-2">
                        <span style={{ color: m.color }}>{typeIcon[m.type]}</span>
                        {m.label}
                      </span>
                      <span className="text-[0.6rem] text-text-muted">{m.count} · {pct}%</span>
                    </div>
                    <div className="h-px w-full rounded-full overflow-hidden"
                         style={{ background: "rgba(200,212,240,0.06)" }}>
                      <div className="h-full rounded-full transition-all duration-700"
                           style={{ width: `${pct}%`, background: m.color, opacity: 0.7 }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mood profile */}
          <div className="p-6 rounded-2xl"
               style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(200,212,240,0.07)" }}>
            <SectionLabel>mood profile</SectionLabel>
            <div className="flex flex-col gap-3">
              {moodData.map((m) => {
                const pct = Math.round((m.count / moodMax) * 100);
                return (
                  <div key={m.mood} className="flex items-center gap-4">
                    <span className="text-[0.6rem] tracking-[0.15em] uppercase w-24 shrink-0"
                          style={{ color: m.color, opacity: 0.8 }}>
                      {m.mood}
                    </span>
                    <div className="flex-1 h-px rounded-full overflow-hidden"
                         style={{ background: "rgba(200,212,240,0.06)" }}>
                      <div className="h-full rounded-full"
                           style={{ width: `${pct}%`, background: m.color, opacity: 0.5 }} />
                    </div>
                    <span className="text-[0.6rem] text-text-muted w-6 text-right shrink-0">{m.count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Currently in progress ── */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-5">
            <SectionLabel>currently in progress</SectionLabel>
            <Link href="/library"
                  className="text-[0.55rem] tracking-[0.2em] uppercase transition-colors hover:opacity-100"
                  style={{ color: "var(--color-mist)", opacity: 0.4 }}>
              view all →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {inProgress.map((entry) => (
              <MediaCard key={entry.id} entry={entry} />
            ))}
          </div>
        </section>

        {/* ── Favorites ── */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-5">
            <SectionLabel>favorites</SectionLabel>
            {/* Filter tabs */}
            <div className="flex items-center gap-1">
              {(["all", "movie", "series", "book", "game"] as const).map((f) => (
                <button key={f}
                        onClick={() => setActiveFilter(f)}
                        className="text-[0.55rem] tracking-[0.15em] uppercase px-3 py-1 rounded-full transition-all"
                        style={{
                          background:  activeFilter === f ? "rgba(200,212,240,0.08)" : "transparent",
                          border:      `1px solid ${activeFilter === f ? "rgba(200,212,240,0.15)" : "transparent"}`,
                          color:       activeFilter === f ? "var(--color-mist)" : "var(--color-text-muted)",
                        }}>
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {filteredFavorites.map((entry) => (
              <MediaCard key={entry.id} entry={entry} />
            ))}
          </div>
        </section>

        {/* ── Ether visualization ── */}
        <section className="mb-16">
          <SectionLabel>your ether</SectionLabel>
          <div className="relative rounded-2xl overflow-hidden p-8 md:p-12"
               style={{
                 background: "rgba(255,255,255,0.015)",
                 border:     "1px solid rgba(200,212,240,0.07)",
                 minHeight:  "240px",
               }}>

            {/* Ambient orbs */}
            <div className="absolute top-[-20%] left-[10%] w-64 h-64 rounded-full blur-[80px] pointer-events-none"
                 style={{ background: "rgba(184,174,240,0.07)" }} />
            <div className="absolute bottom-[-20%] right-[15%] w-48 h-48 rounded-full blur-[60px] pointer-events-none"
                 style={{ background: "rgba(142,212,212,0.06)" }} />

            {/* Word cloud */}
            <div className="relative flex flex-wrap gap-x-6 gap-y-3 items-center justify-center max-w-2xl mx-auto">
              {etherWords.map((word, i) => {
                const sizes  = ["text-xs", "text-sm", "text-base", "text-lg", "text-xl"];
                const opacs  = [0.2, 0.3, 0.45, 0.6, 0.8];
                const idx    = i % sizes.length;
                return (
                  <span key={word}
                        className={`${sizes[idx]} font-display font-black tracking-tight select-none`}
                        style={{ color: "var(--color-mist)", opacity: opacs[idx] }}>
                    {word}
                  </span>
                );
              })}
            </div>

            {/* Bottom label */}
            <p className="text-center mt-10 text-[0.6rem] tracking-[0.35em] uppercase"
               style={{ color: "var(--color-mist)", opacity: 0.25 }}>
              shaped by 142 entries across all media
            </p>
          </div>
        </section>

        {/* ── Quick log CTA ── */}
        <section>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl"
               style={{
                 background: "rgba(200,212,240,0.03)",
                 border:     "1px solid rgba(200,212,240,0.08)",
               }}>
            <div>
              <p className="text-sm font-medium text-text-primary mb-1">Add to your Ether</p>
              <p className="text-[0.65rem] text-text-muted tracking-wide">Log a movie, series, book, or game to keep your universe growing.</p>
            </div>
            <Link href="/log"
                  className="shrink-0 px-5 py-2.5 rounded-xl text-xs tracking-[0.2em] uppercase font-medium transition-all hover:-translate-y-px hover:brightness-110"
                  style={{
                    background: "rgba(200,212,240,0.08)",
                    border:     "1px solid rgba(200,212,240,0.15)",
                    color:      "var(--color-mist)",
                  }}>
              + Log entry
            </Link>
          </div>
        </section>

      </main>
    </div>
  );
}