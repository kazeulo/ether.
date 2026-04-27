"use client";

import Link from "next/link";
import { useState } from "react";

const stars = Array.from({ length: 60 }, (_, i) => ({
  top: `${(i * 37.3) % 100}%`,
  left: `${(i * 61.8) % 100}%`,
  size: (i % 3) + 1,
  duration: `${3 + (i % 5)}s`,
  delay: `${(i * 0.37) % 5}s`,
}));

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focused, setFocused] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-bg-base text-text-primary flex items-center justify-center py-2 px-6 relative overflow-hidden">

      {/* Starfield */}
      <div className="fixed inset-0 pointer-events-none">
        {stars.map((s, i) => (
          <span
            key={i}
            className="star absolute rounded-full bg-white"
            style={{
              top: s.top,
              left: s.left,
              width: s.size,
              height: s.size,
              animationDuration: s.duration,
              animationDelay: s.delay,
            }}
          />
        ))}

        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-violet/8 blur-[130px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-teal/6 blur-[110px]" />
        <div className="absolute top-[40%] left-[40%] w-[300px] h-[300px] rounded-full bg-rose/4 blur-[90px]" />
      </div>

      {/* Page wrapper */}
      <div className="relative z-10 w-full max-w-lg animate-fade-up">

        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-baseline gap-0.5">
            <span className="font-display italic text-5xl font-bold tracking-tight">
              binge
            </span>
            <span className="font-display text-5xl font-black tracking-tight text-violet">
              log
            </span>
          </Link>
          <p className="text-text-muted text-xs tracking-[0.25em] uppercase mt-3">
            Welcome back
          </p>
        </div>

        {/* CARD (MATCHED STYLE) */}
        <div className="bg-bg-card border border-border-subtle rounded-2xl px-4 py-4 relative overflow-hidden">

          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal/40 to-transparent" />

          <h1 className="font-display text-4xl font-bold mb-2 text-center">
            Sign in
          </h1>

          <p className="text-text-secondary text-base mb-10 text-center">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-violet hover:underline">
              Create one
            </Link>
          </p>

          {/* INNER CONTAINER (SAME AS REGISTER) */}
          <div className="px-2 sm:px-4 max-w-md mx-auto">

            <div className="flex flex-col gap-8">

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label className="text-xs tracking-[0.15em] uppercase text-text-muted font-medium">
                  Email
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                  placeholder="you@example.com"
                  className="w-full bg-bg-surface border rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted outline-none transition-all"
                  style={{
                    borderColor:
                      focused === "email"
                        ? "var(--color-violet)"
                        : "var(--color-border-medium)",
                    boxShadow:
                      focused === "email"
                        ? "0 0 0 3px rgba(180,142,240,0.1)"
                        : "none",
                  }}
                />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs tracking-[0.15em] uppercase text-text-muted font-medium">
                    Password
                  </label>

                  <Link
                    href="/forgot-password"
                    className="text-xs text-text-muted hover:text-violet transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocused("password")}
                  onBlur={() => setFocused(null)}
                  placeholder="••••••••"
                  className="w-full bg-bg-surface border rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted outline-none transition-all"
                  style={{
                    borderColor:
                      focused === "password"
                        ? "var(--color-violet)"
                        : "var(--color-border-medium)",
                    boxShadow:
                      focused === "password"
                        ? "0 0 0 3px rgba(180,142,240,0.1)"
                        : "none",
                  }}
                />
              </div>

              {/* BUTTON */}
              <button
                type="button"
                className="w-full py-3 rounded-xl bg-violet text-bg-base text-sm font-medium tracking-widest uppercase hover:brightness-110 transition-all hover:-translate-y-px active:translate-y-0"
              >
                Sign In
              </button>

              {/* DIVIDER */}
              <div className="flex items-center gap-4 py-2">
                <div className="flex-1 h-px bg-border-subtle" />
                <span className="text-text-muted text-xs tracking-widest uppercase">
                  or continue with
                </span>
                <div className="flex-1 h-px bg-border-subtle" />
              </div>

              {/* GOOGLE */}
              <button
                type="button"
                className="w-full py-3 rounded-xl bg-bg-surface border border-border-medium hover:border-violet/40 hover:bg-bg-card-hover transition-all flex items-center justify-center gap-3"
              >
                <span className="text-sm text-text-secondary">
                  Continue with Google
                </span>
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}