"use client";

import Link from "next/link";
import { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { stars } from "@/designs/Stars";

// Types
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

// Constants
const fields: Field[] = [
  { id: "username", label: "Username", type: "text",     placeholder: "cosmicwatcher" },
  { id: "email",    label: "Email",    type: "email",    placeholder: "you@example.com" },
  { id: "password", label: "Password", type: "password", placeholder: "••••••••" },
];

// Component 
export default function RegisterPage() {
  const router   = useRouter();
  const supabase = createClient();

  const [focused, setFocused] = useState<keyof FormState | null>(null);
  const [form, setForm]       = useState<FormState>({ username: "", email: "", password: "" });
  const [error, setError]     = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const update = (field: keyof FormState) => (e: ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleRegister = async () => {
    setError(null);

    // Basic client-side validation
    if (!form.username.trim()) { setError("Username is required."); return; }
    if (!form.email.trim())    { setError("Email is required.");    return; }
    if (form.password.length < 6) { setError("Password must be at least 6 characters."); return; }

    setLoading(true);

    const { error: signUpError } = await supabase.auth.signUp({
      email:    form.email,
      password: form.password,
      options: {
        data: { username: form.username }, // stored in user_metadata
      },
    });

    setLoading(false);

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    // If email confirmation is disabled in Supabase, go straight to dashboard
    // If email confirmation is enabled, redirect to a verify-email page
    router.push("/dashboard");
  };

  const inputStyle = (id: keyof FormState): React.CSSProperties => ({
    borderColor: focused === id ? "rgba(200,212,240,0.3)" : "rgba(200,212,240,0.07)",
    boxShadow:   focused === id ? "0 0 0 3px rgba(184,196,224,0.06)" : "none",
    background:  "rgba(255,255,255,0.03)",
    transition:  "border-color 0.2s ease, box-shadow 0.2s ease",
  });

  return (
    <div className="min-h-screen bg-bg-base text-text-primary flex relative overflow-hidden">

      {/* Back button */}
      <Link
        href="/"
        className="absolute top-14 left-16 z-10 flex items-center justify-center w-9 h-9 rounded-full transition-all hover:-translate-x-0.5 hover:brightness-125"
        style={{
          background: "rgba(200,212,240,0.05)",
          border: "1px solid rgba(200,212,240,0.1)",
          color: "var(--color-mist)",
        }}
        aria-label="Go back"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          // style={{ transform: "translateX(-0.5px)" }}
        >
          <path d="M19 12H5" />
          <path d="M12 19l-7-7 7-7" />
        </svg>
      </Link>

      {/* Starfield */}
      <div className="fixed inset-0 pointer-events-none">
        {stars.map((s, i) => (
          <span
            key={i}
            className="star absolute rounded-full bg-white"
            style={{
              top:               s.top,
              left:              s.left,
              width:             s.size,
              height:            s.size,
              animationDuration: s.duration,
              animationDelay:    s.delay,
            }}
          />
        ))}
        <div
          className="glow-orb-1 absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full blur-[130px]"
          style={{ background: "rgba(142,212,212,0.06)" }}
        />
        <div
          className="glow-orb-2 absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full blur-[110px]"
          style={{ background: "rgba(184,174,240,0.06)" }}
        />
      </div>

      {/* Right panel — decorative */}
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
          <p className="font-display text-[2rem] font-black leading-[1.1] tracking-tight mb-6">
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
              <span
                className="w-1.5 h-1.5 rounded-full mb-3 ml-0.5"
                style={{ background: "var(--color-mist)" }}
              />
            </Link>
          </div>

          {/* Heading */}
          <div className="mb-10">
            <p
              className="text-[0.6rem] tracking-[0.4em] uppercase mb-3 font-medium"
              style={{ color: "var(--color-mist)", opacity: 0.5 }}
            >
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
                  disabled={loading}
                  className="w-full border rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted outline-none disabled:opacity-50"
                  style={inputStyle(id)}
                />
              </div>
            ))}

            {/* Error message */}
            {error && (
              <p
                className="text-[0.7rem] tracking-wide leading-relaxed px-4 py-3 rounded-lg"
                style={{
                  color:      "rgba(255,100,100,0.9)",
                  background: "rgba(255,80,80,0.06)",
                  border:     "1px solid rgba(255,80,80,0.12)",
                }}
              >
                {error}
              </p>
            )}

            {/* Terms */}
            <p className="text-[0.65rem] text-text-muted leading-relaxed tracking-wide">
              By continuing you agree to our{" "}
              <Link
                href="/terms"
                className="transition-colors hover:text-mist"
                style={{ color: "var(--color-mist)", opacity: 0.7 }}
              >
                Terms
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="transition-colors hover:text-mist"
                style={{ color: "var(--color-mist)", opacity: 0.7 }}
              >
                Privacy Policy
              </Link>.
            </p>

            {/* Submit */}
            <button
              type="button"
              onClick={handleRegister}
              disabled={loading}
              className="w-full py-3 rounded-xl text-xs tracking-[0.25em] uppercase font-medium transition-all hover:-translate-y-px hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:brightness-100"
              style={{
                background: "rgba(200,212,240,0.08)",
                border:     "1px solid rgba(200,212,240,0.15)",
                color:      "var(--color-mist)",
              }}
            >
              {loading ? "Creating account…" : "Enter the Ether"}
            </button>

            {/* Sign in link */}
            <p className="text-center text-xs text-text-muted">
              Already have an account?{" "}
              <Link
                href="/login"
                className="transition-colors hover:text-mist"
                style={{ color: "var(--color-mist)", opacity: 0.7 }}
              >
                Sign in
              </Link>
            </p>

          </div>
        </div>
      </div>

    </div>
  );
}