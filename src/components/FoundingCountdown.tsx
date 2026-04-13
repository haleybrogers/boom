"use client";

import { useState, useEffect } from "react";

// Founding member offer ends at end of day (local) on this date
const DEADLINE = new Date("2026-06-15T23:59:59");

function calc() {
  const diff = DEADLINE.getTime() - Date.now();
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

  const Unit = ({ value, label }: { value: number; label: string }) => (
    <span className="inline-flex items-baseline gap-1">
      <span className="font-serif text-base text-accent tabular-nums font-medium">
        {value.toString().padStart(2, "0")}
      </span>
      <span className="text-[9px] tracking-widest uppercase text-accent/70">
        {label}
      </span>
    </span>
  );

  return (
    <div className="flex flex-col items-center mb-4">
      {showLabel && (
        <p className="text-[10px] tracking-widest uppercase text-accent mb-2">
          Founding Member Pricing Ends June 15
        </p>
      )}
      <div className="flex items-baseline gap-2.5">
        <Unit value={time.days} label="d" />
        <span className="text-accent/30 text-xs">·</span>
        <Unit value={time.hours} label="h" />
        <span className="text-accent/30 text-xs">·</span>
        <Unit value={time.minutes} label="m" />
        <span className="text-accent/30 text-xs">·</span>
        <Unit value={time.seconds} label="s" />
      </div>
    </div>
  );
}
