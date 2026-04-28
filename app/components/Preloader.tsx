"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
  const [visible, setVisible]   = useState(true);
  const [fading, setFading]     = useState(false);
  const [phase, setPhase]       = useState(0);

  useEffect(() => {
    const p1 = setTimeout(() => setPhase(1), 400);
    const p2 = setTimeout(() => setPhase(2), 1200);
    const p3 = setTimeout(() => setFading(true), 2400);
    const p4 = setTimeout(() => setVisible(false), 3200);
    return () => [p1, p2, p3, p4].forEach(clearTimeout);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{
        background: "#080b12",
        opacity: fading ? 0 : 1,
        transition: "opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
        pointerEvents: fading ? "none" : "all",
      }}
    >

      {/* Mist particles */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width:  `${2 + (i % 3)}px`,
            height: `${2 + (i % 3)}px`,
            top:    `${20 + (i * 17.3) % 60}%`,
            left:   `${10 + (i * 23.7) % 80}%`,
            background: i % 3 === 0
              ? "rgba(184,196,224,0.3)"
              : i % 3 === 1
              ? "rgba(168,157,232,0.2)"
              : "rgba(126,200,200,0.2)",
            animation: `mist-float ${6 + (i % 4)}s ease-in-out infinite`,
            animationDelay: `${(i * 0.4) % 4}s`,
            opacity: phase >= 1 ? 1 : 0,
            transition: "opacity 1.2s ease",
          }}
        />
      ))}

      {/* Central glow */}
      <div
        className="absolute rounded-full"
        style={{
          width: "320px",
          height: "320px",
          background: "radial-gradient(circle, rgba(184,196,224,0.04) 0%, transparent 70%)",
          animation: "breathe 4s ease-in-out infinite",
        }}
      />

      {/* Wordmark */}
      <div
        className="relative flex flex-col items-center"
        style={{
          opacity: phase >= 1 ? 1 : 0,
          transform: phase >= 1 ? "translateY(0)" : "translateY(12px)",
          transition: "opacity 1s ease, transform 1s ease",
        }}
      >
        {/* The word */}
        <div className="flex items-center gap-px">
          <span
            className="font-body font-light tracking-[0.35em] uppercase text-2xl"
            style={{ color: "var(--color-text-primary)" }}
          >
            ether
          </span>
          <span
            className="w-1.5 h-1.5 rounded-full mb-4 ml-1"
            style={{
              background: "var(--color-mist)",
              boxShadow: "0 0 8px 2px rgba(184,196,224,0.4)",
              animation: "breathe 3s ease-in-out infinite",
            }}
          />
        </div>

        {/* Tagline — phases in slightly after */}
        <p
          className="text-[0.6rem] tracking-[0.4em] uppercase mt-3"
          style={{
            color: "rgba(184,196,224,0.35)",
            opacity: phase >= 2 ? 1 : 0,
            transform: phase >= 2 ? "translateY(0)" : "translateY(6px)",
            transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
          }}
        >
          every story leaves a mark
        </p>
      </div>

      {/* Bottom mist line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(to right, transparent, rgba(184,196,224,0.08), transparent)",
          opacity: phase >= 1 ? 1 : 0,
          transition: "opacity 1.5s ease",
        }}
      />

      <style>{`
        @keyframes mist-float {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.4; }
          33%       { transform: translateY(-8px) translateX(4px); opacity: 0.8; }
          66%       { transform: translateY(4px) translateX(-4px); opacity: 0.3; }
        }
        @keyframes breathe {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.08); }
        }
      `}</style>

    </div>
  );
}