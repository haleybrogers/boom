"use client";

import { useState, useEffect } from "react";
import { FOUNDING_DEADLINE } from "@/lib/flags";

function calc() {
  const diff = FOUNDING_DEADLINE.getTime() - Date.now();
  if (diff <= 0) return null;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

export default function FoundingCountdown({ showLabel = true }: { showLabel?: boolean }) {
  const [time, setTime] = useState<ReturnType<typeof calc>>(null);

  useEffect(() => {
    setTime(calc());
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;

  // Small, sans-serif units — deliberately not the serif display style, so
  // it reads as a quiet "limited time" signal rather than a hero countdown.
  const Unit = ({ value, label }: { value: number; label: string }) => (
    <span className="inline-flex items-baseline gap-1 font-sans">
      <span className="text-sm font-semibold text-charcoal tabular-nums">
        {value.toString().padStart(2, "0")}
      </span>
      <span className="text-[10px] tracking-widest uppercase text-muted">
        {label}
      </span>
    </span>
  );

  return (
    <div className="flex flex-col items-center mb-4">
      {showLabel && (
        <p className="text-[10px] tracking-[0.25em] uppercase text-accent/80 mb-2">
          Available before we open · ends in
        </p>
      )}
      <div className="flex items-baseline gap-2.5">
        <Unit value={time.days} label="d" />
        <span className="text-charcoal/20 text-sm">·</span>
        <Unit value={time.hours} label="h" />
        <span className="text-charcoal/20 text-sm">·</span>
        <Unit value={time.minutes} label="m" />
        <span className="text-charcoal/20 text-sm">·</span>
        <Unit value={time.seconds} label="s" />
      </div>
    </div>
  );
}
