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

export default function FoundingCountdown() {
  const [time, setTime] = useState<ReturnType<typeof calc>>(null);

  useEffect(() => {
    setTime(calc());
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;

  const Box = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="bg-charcoal text-white font-serif text-2xl sm:text-3xl font-light tabular-nums w-14 sm:w-16 py-2 rounded-sm">
        {value.toString().padStart(2, "0")}
      </div>
      <p className="text-[9px] tracking-widest uppercase text-muted mt-1.5">
        {label}
      </p>
    </div>
  );

  return (
    <div className="flex flex-col items-center mb-8">
      <p className="text-[10px] tracking-widest uppercase text-accent mb-3">
        Founding Member Pricing Ends June 15
      </p>
      <div className="flex items-center gap-2 sm:gap-3">
        <Box value={time.days} label="Days" />
        <span className="font-serif text-2xl text-charcoal/30 -mt-4">:</span>
        <Box value={time.hours} label="Hrs" />
        <span className="font-serif text-2xl text-charcoal/30 -mt-4">:</span>
        <Box value={time.minutes} label="Min" />
        <span className="font-serif text-2xl text-charcoal/30 -mt-4">:</span>
        <Box value={time.seconds} label="Sec" />
      </div>
    </div>
  );
}
