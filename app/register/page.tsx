"use client";

import Link from "next/link";
import { useState, ChangeEvent } from "react";

type FormState = {
  username: string;
  email:    string;
  password: string;
};

type Field = {
  id:          keyof FormState;
  label:       string;
  type:        string;
  placeholder: string;
};

const fields: Field[] = [
  { id: "username", label: "Username", type: "text",     placeholder: "cosmicwatcher" },
  { id: "email",    label: "Email",    type: "email",    placeholder: "you@example.com" },
  { id: "password", label: "Password", type: "password", placeholder: "••••••••" },
];

const stars = Array.from({ length: 50 }, (_, i) => ({
  top:      `${(i * 37.3) % 100}%`,
  left:     `${(i * 61.8) % 100}%`,
  size:     (i % 3) + 1,
  duration: `${3 + (i % 5)}s`,
  delay:    `${(i * 0.37) % 5}s`,
}));

export default function RegisterPage() {
  const [focused, setFocused] = useState<keyof FormState | null>(null);
  const [form, setForm]       = useState<FormState>({ username: "", email: "", password: "" });

  const update = (field: keyof FormState) => (e: ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const inputStyle = (id: keyof FormState) => ({
    borderColor: focused === id ? "rgba(200,212,240,0.3)" : "rgba(200,212,240,0.07)",
    boxShadow:   focused === id ? "0 0 0 3px rgba(184,196,224,0.06)" : "none",
    background:  "rgba(255,255,255,0.03)",
    transition:  "border-color 0.2s ease, box-shadow 0.2s ease",
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
        <div className="glow-orb-1 absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full blur-[130px]"
          style={{ background: "rgba(142,212,212,0.06)" }} />
        <div className="glow-orb-2 absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full blur-[110px]"
          style={{ background: "rgba(184,174,240,0.06)" }} />
      </div>

      {/* Right panel — decorative (flipped from login) */}
      <div className="hidden lg:flex flex-col justify-between w-[45%] order-last relative px-16 py-14 border-l border-border-subtle">

        {/* Logo */}
        <div className="flex justify-end">
          <Link href="/" className="flex items-center gap-1 group">
            <span className="font-body font-light tracking-[0.3em] uppercase text-lg text-text-primary">
              ether
            </span>
            <span
              className="w-1.5 h-1.5 rounded-full mb-3 ml-0.5 group-hover:scale-125 transition-transform"
              style={{ background: "var(--color-mist)", boxShadow: "0 0 6px 2px rgba(200,212,240,0.3)" }}
            />
          </Link>
        </div>

        {/* Quote */}
        <div className="max-w-xs ml-auto text-right">
          <p
            className="font-display text-[2rem] font-black leading-[1.1] tracking-tight mb-6"
          >
            Your universe{" "}
            <em className="not-italic" style={{ color: "var(--color-gold)" }}>begins</em>
            {" "}here.
          </p>
          <p className="text-xs tracking-[0.25em] uppercase" style={{ color: "var(--color-mist)", opacity: 0.4 }}>
            every story leaves a mark
          </p>
        </div>

        {/* Steps */}
        <div className="flex flex-col gap-4 ml-auto text-right">
          {[
            { step: "01", label: "Create your account" },
            { step: "02", label: "Log what you've experienced" },
            { step: "03", label: "Watch your universe grow" },
          ].map(({ step, label }) => (
            <div key={step} className="flex items-center justify-end gap-3">
              <span className="text-[0.65rem] tracking-[0.15em] uppercase text-text-muted">
                {label}
              </span>
              <span
                className="text-[0.6rem] font-medium tabular-nums"
                style={{ color: "var(--color-mist)", opacity: 0.4 }}
              >
                {step}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Left panel — form */}
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
              new arrival
            </p>
            <h1 className="font-display text-3xl font-black tracking-tight">
              Create account
            </h1>
          </div>

          {/* Form */}
          <div className="flex flex-col gap-6">

            {fields.map(({ id, label, type, placeholder }) => (
              <div key={id} className="flex flex-col gap-2">
                <label className="text-[0.6rem] tracking-[0.2em] uppercase text-text-muted font-medium">
                  {label}
                </label>
                <input
                  type={type}
                  value={form[id]}
                  onChange={update(id)}
                  onFocus={() => setFocused(id)}
                  onBlur={() => setFocused(null)}
                  placeholder={placeholder}
                  className="w-full border rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted outline-none"
                  style={inputStyle(id)}
                />
              </div>
            ))}

            {/* Terms */}
            <p className="text-[0.65rem] text-text-muted leading-relaxed tracking-wide">
              By continuing you agree to our{" "}
              <Link href="/terms"
                className="transition-colors hover:text-mist"
                style={{ color: "var(--color-mist)", opacity: 0.7 }}>
                Terms
              </Link>{" "}
              and{" "}
              <Link href="/privacy"
                className="transition-colors hover:text-mist"
                style={{ color: "var(--color-mist)", opacity: 0.7 }}>
                Privacy Policy
              </Link>.
            </p>

            {/* Submit */}
            <button
              type="button"
              className="w-full py-3 rounded-xl text-xs tracking-[0.25em] uppercase font-medium transition-all hover:-translate-y-px hover:brightness-110"
              style={{
                background: "rgba(200,212,240,0.08)",
                border:     "1px solid rgba(200,212,240,0.15)",
                color:      "var(--color-mist)",
              }}
            >
              Enter the Ether
            </button>

            {/* Sign in link */}
            <p className="text-center text-xs text-text-muted">
              Already have an account?{" "}
              <Link href="/login"
                className="transition-colors hover:text-mist"
                style={{ color: "var(--color-mist)", opacity: 0.7 }}>
                Sign in
              </Link>
            </p>

          </div>
        </div>
      </div>

    </div>
  );
}