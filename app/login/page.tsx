"use client";

import Link from "next/link";
import { useState } from "react";

const stars = Array.from({ length: 50 }, (_, i) => ({
  top:      `${(i * 37.3) % 100}%`,
  left:     `${(i * 61.8) % 100}%`,
  size:     (i % 3) + 1,
  duration: `${3 + (i % 5)}s`,
  delay:    `${(i * 0.37) % 5}s`,
}));

export default function LoginPage() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [focused, setFocused]   = useState<string | null>(null);

  const inputStyle = (field: string) => ({
    borderColor: focused === field
      ? "rgba(200,212,240,0.3)"
      : "rgba(200,212,240,0.07)",
    boxShadow: focused === field
      ? "0 0 0 3px rgba(184,196,224,0.06)"
      : "none",
    background: "rgba(255,255,255,0.03)",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
  });

  return (
    <div className="min-h-screen bg-bg-base text-text-primary flex relative overflow-hidden">

      {/* Starfield */}
      <div className="fixed inset-0 pointer-events-none">
        {stars.map((s, i) => (
          <span
            key={i}
            className="star absolute rounded-full bg-white"
            style={{
              top: s.top, left: s.left,
              width: s.size, height: s.size,
              animationDuration: s.duration,
              animationDelay: s.delay,
            }}
          />
        ))}
        <div className="glow-orb-1 absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full blur-[130px]"
          style={{ background: "rgba(184,174,240,0.07)" }} />
        <div className="glow-orb-2 absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full blur-[110px]"
          style={{ background: "rgba(142,212,212,0.05)" }} />
      </div>

      {/* Left panel — decorative */}
      <div className="hidden lg:flex flex-col justify-between w-[45%] relative px-16 py-14 border-r border-border-subtle">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-1 group">
          <span className="font-body font-light tracking-[0.3em] uppercase text-lg text-text-primary">
            ether
          </span>
          <span
            className="w-1.5 h-1.5 rounded-full mb-3 ml-0.5 group-hover:scale-125 transition-transform"
            style={{ background: "var(--color-mist)", boxShadow: "0 0 6px 2px rgba(200,212,240,0.3)" }}
          />
        </Link>

        {/* Quote */}
        <div className="max-w-xs">
          <p
            className="font-display text-[2rem] font-black leading-[1.1] tracking-tight mb-6"
            style={{ color: "var(--color-text-primary)" }}
          >
            Every world you&apos;ve{" "}
            <em className="not-italic" style={{ color: "var(--color-mist)" }}>entered</em>
            ,{" "}
            <em className="not-italic" style={{ color: "var(--color-gold)" }}>remembered</em>.
          </p>
          <p className="text-xs tracking-[0.25em] uppercase" style={{ color: "var(--color-mist)", opacity: 0.4 }}>
            your stories live here
          </p>
        </div>

        {/* Media type tags */}
        <div className="flex flex-col gap-3">
          {[
            { label: "Movies", color: "var(--color-rose)"   },
            { label: "Series", color: "var(--color-teal)"   },
            { label: "Books",  color: "var(--color-violet)" },
            { label: "Games",  color: "var(--color-violet)" },
          ].map((type) => (
            <div key={type.label} className="flex items-center gap-3">
              <div className="w-px h-4" style={{ background: type.color, opacity: 0.4 }} />
              <span className="text-[0.65rem] tracking-[0.25em] uppercase text-text-muted">
                {type.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm animate-fade-up">

          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-12">
            <Link href="/" className="inline-flex items-center gap-1">
              <span className="font-body font-light tracking-[0.3em] uppercase text-lg">ether</span>
              <span className="w-1.5 h-1.5 rounded-full mb-3 ml-0.5"
                style={{ background: "var(--color-mist)" }} />
            </Link>
          </div>

          {/* Heading */}
          <div className="mb-10">
            <p className="text-[0.6rem] tracking-[0.4em] uppercase mb-3 font-medium"
              style={{ color: "var(--color-mist)", opacity: 0.5 }}>
              welcome back
            </p>
            <h1 className="font-display text-3xl font-black tracking-tight">
              Sign in
            </h1>
          </div>

          {/* Form */}
          <div className="flex flex-col gap-6">

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-[0.6rem] tracking-[0.2em] uppercase text-text-muted font-medium">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused(null)}
                placeholder="you@example.com"
                className="w-full border rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted outline-none"
                style={inputStyle("email")}
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-[0.6rem] tracking-[0.2em] uppercase text-text-muted font-medium">
                  Password
                </label>
                <Link href="/forgot-password"
                  className="text-[0.6rem] tracking-[0.15em] uppercase text-text-muted hover:text-mist transition-colors">
                  Forgot?
                </Link>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocused("password")}
                onBlur={() => setFocused(null)}
                placeholder="••••••••"
                className="w-full border rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted outline-none"
                style={inputStyle("password")}
              />
            </div>

            {/* Submit */}
            <button
              type="button"
              className="w-full py-3 rounded-xl text-xs tracking-[0.25em] uppercase font-medium transition-all hover:-translate-y-px hover:brightness-110"
              style={{
                background: "rgba(200,212,240,0.08)",
                border: "1px solid rgba(200,212,240,0.15)",
                color: "var(--color-mist)",
              }}
            >
              Enter the Ether
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px" style={{ background: "var(--color-border-subtle)" }} />
              <span className="text-[0.6rem] tracking-[0.2em] uppercase text-text-muted">or</span>
              <div className="flex-1 h-px" style={{ background: "var(--color-border-subtle)" }} />
            </div>

            {/* Google */}
            <button
              type="button"
              className="w-full py-3 rounded-xl text-xs tracking-[0.2em] uppercase text-text-muted transition-all hover:text-text-secondary"
              style={{
                border: "1px solid rgba(200,212,240,0.07)",
                background: "rgba(255,255,255,0.02)",
              }}
            >
              Continue with Google
            </button>

            {/* Register link */}
            <p className="text-center text-xs text-text-muted">
              No account?{" "}
              <Link href="/register"
                className="transition-colors hover:text-mist"
                style={{ color: "var(--color-mist)", opacity: 0.7 }}>
                Create one
              </Link>
            </p>

          </div>
        </div>
      </div>

    </div>
  );
}