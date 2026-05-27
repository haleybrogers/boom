"use client";

import { useState, useEffect } from "react";

// Serif countdown to opening day (Monday, July 13, 2026). Sits under the
// "Opening Soon" eyebrow on the home page. Renders nothing until mounted
// (avoids SSR/hydration mismatch) and auto-hides once we've opened.

const OPENING_DATE = new Date("2026-07-13T00:00:00-04:00");

type Remaining = { days: number; hours: number; mins: number; secs: number };

function calc(): Remaining {
  const ms = Math.max(0, OPENING_DATE.getTime() - Date.now());
  return {
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor((ms % 86_400_000) / 3_600_000),
    mins: Math.floor((ms % 3_600_000) / 60_000),
    secs: Math.floor((ms % 60_000) / 1000),
  };
}

export default function OpeningCountdown() {
  const [t, setT] = useState<Remaining | null>(null);

  useEffect(() => {
    setT(calc());
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!t) return null;
  // Opened — hide the countdown.
  if (t.days === 0 && t.hours === 0 && t.mins === 0 && t.secs === 0) return null;

  const blocks: { value: number; label: string }[] = [
    { value: t.days, label: "Days" },
    { value: t.hours, label: "Hrs" },
    { value: t.mins, label: "Min" },
    { value: t.secs, label: "Sec" },
  ];

  return (
    <div className="flex justify-center gap-5 sm:gap-8 mb-6">
      {blocks.map((b) => (
        <div key={b.label} className="flex flex-col items-center">
          <span className="font-serif text-3xl sm:text-4xl font-light text-charcoal leading-none tabular-nums">
            {String(b.value).padStart(2, "0")}
          </span>
          <span className="text-[10px] tracking-[0.25em] uppercase text-muted mt-1.5">
            {b.label}
          </span>
        </div>
      ))}
    </div>
  );
}
