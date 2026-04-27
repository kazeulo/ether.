"use client";

import Link from "next/link";
import { useState, ChangeEvent } from "react";

type FormState = {
  username: string;
  email: string;
  password: string;
};

type Field = {
  id: keyof FormState;
  label: string;
  type: string;
  placeholder: string;
};

const stars = Array.from({ length: 60 }, (_, i) => ({
  top: `${(i * 37.3) % 100}%`,
  left: `${(i * 61.8) % 100}%`,
  size: (i % 3) + 1,
  duration: `${3 + (i % 5)}s`,
  delay: `${(i * 0.37) % 5}s`,
}));

export default function RegisterPage() {
  const [focused, setFocused] = useState<keyof FormState | null>(null);

  const [form, setForm] = useState<FormState>({
    username: "",
    email: "",
    password: "",
  });

  const update =
    (field: keyof FormState) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  const fields: Field[] = [
    {
      id: "username",
      label: "Username",
      type: "text",
      placeholder: "cosmicwatcher",
    },
    {
      id: "email",
      label: "Email",
      type: "email",
      placeholder: "you@example.com",
    },
    {
      id: "password",
      label: "Password",
      type: "password",
      placeholder: "••••••••",
    },
  ];

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

        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-teal/7 blur-[130px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-violet/6 blur-[110px]" />
        <div className="absolute top-[40%] left-[40%] w-[300px] h-[300px] rounded-full bg-rose/4 blur-[90px]" />
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-lg animate-fade-up">

        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-baseline gap-0.5">
            <span className="font-display italic text-5xl font-bold tracking-tight">
              binge
            </span>
            <span className="font-display text-5xl font-black tracking-tight text-violet">
              long
            </span>
          </Link>
          <p className="text-text-muted text-xs tracking-[0.25em] uppercase mt-3">
            Your universe awaits
          </p>
        </div>

        <div className="bg-bg-card border border-border-subtle rounded-2xl px-4 py-4 relative overflow-hidden">

          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal/40 to-transparent" />

          <h1 className="font-display text-4xl font-bold mb-2 text-center">
            Create account
          </h1>

          <p className="text-text-secondary text-base mb-10 text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-violet hover:underline">
              Sign in
            </Link>
          </p>

          {/* INNER CONTAINER */}
          <div className="px-2 sm:px-4 max-w-md mx-auto">

            {/* FORM */}
            <div className="flex flex-col gap-8">
              {fields.map(({ id, label, type, placeholder }) => (
                <div key={id} className="flex flex-col gap-2">
                  <label className="text-xs tracking-[0.15em] uppercase text-text-muted font-medium">
                    {label}
                  </label>

                  <input
                    type={type}
                    value={form[id]}
                    onChange={update(id)}
                    onFocus={() => setFocused(id)}
                    onBlur={() => setFocused(null)}
                    placeholder={placeholder}
                    className="w-full bg-bg-surface border rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted outline-none transition-all"
                    style={{
                      borderColor:
                        focused === id
                          ? "var(--color-violet)"
                          : "var(--color-border-medium)",
                      boxShadow:
                        focused === id
                          ? "0 0 0 3px rgba(180,142,240,0.1)"
                          : "none",
                    }}
                  />
                </div>
              ))}

              {/* TERMS */}
              <p className="text-text-muted text-xs leading-relaxed">
                By creating an account you agree to our{" "}
                <Link href="/terms" className="text-violet hover:underline">
                  Terms
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-violet hover:underline">
                  Privacy Policy
                </Link>.
              </p>

              {/* BUTTON */}
              <button
                type="button"
                className="w-full py-3 rounded-xl bg-violet text-bg-base text-sm font-medium tracking-widest uppercase hover:brightness-110 transition-all hover:-translate-y-px active:translate-y-0"
              >
                Create Account
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}