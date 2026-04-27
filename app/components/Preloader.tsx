"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Start fade out after 2.2s, remove from DOM after transition completes
    const fadeTimer = setTimeout(() => setFading(true), 2200);
    const removeTimer = setTimeout(() => setVisible(false), 2900);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-bg-base"
      style={{
        transition: "opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
        opacity: fading ? 0 : 1,
        pointerEvents: fading ? "none" : "all",
      }}
    >
      {/* Orbiting rings */}
      <div className="relative flex items-center justify-center w-32 h-32 mb-8">

        {/* Outer ring */}
        <div
          className="absolute rounded-full border border-violet/20"
          style={{
            width: 128, height: 128,
            animation: "spin 6s linear infinite",
          }}
        >
          {/* Orbiting dot on outer ring */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-violet shadow-[0_0_8px_2px_rgba(180,142,240,0.8)]" />
        </div>

        {/* Middle ring */}
        <div
          className="absolute rounded-full border border-teal/20"
          style={{
            width: 88, height: 88,
            animation: "spin 4s linear infinite reverse",
          }}
        >
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-teal shadow-[0_0_6px_2px_rgba(94,232,208,0.8)]" />
        </div>

        {/* Inner ring */}
        <div
          className="absolute rounded-full border border-rose/20"
          style={{
            width: 52, height: 52,
            animation: "spin 2.5s linear infinite",
          }}
        >
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-rose shadow-[0_0_5px_1px_rgba(240,122,154,0.8)]" />
        </div>

        {/* Core star */}
        <div className="w-3 h-3 rounded-full bg-violet shadow-[0_0_16px_4px_rgba(180,142,240,0.6)]" />
      </div>

      {/* Logo */}
      <div
        className="flex items-baseline gap-0.5"
        style={{ animation: "preloader-fade-in 0.6s ease both 0.3s" }}
      >
        <span className="font-display italic text-2xl font-bold tracking-tight text-text-primary">binge</span>
        <span className="font-display text-2xl font-black tracking-tight text-violet">log</span>
      </div>

      {/* Tagline */}
      <p
        className="text-text-muted text-[0.7rem] tracking-[0.25em] uppercase mt-2"
        style={{ animation: "preloader-fade-in 0.6s ease both 0.6s" }}
      >
        Your personal media universe
      </p>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes preloader-fade-in {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}