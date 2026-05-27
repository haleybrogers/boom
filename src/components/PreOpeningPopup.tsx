"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  isFoundingActive,
  isFoundingLaunched,
  FOUNDING_DEADLINE,
} from "@/lib/flags";

// Home-page pop-up. Now that founding memberships are LIVE, this announces
// the offer with a live countdown to the deadline + a CTA to /founding.
// (Was the pre-opening pop-up; repurposed at launch.) Shows once per
// session, ~4s after load, dismissable. Only renders while founding is
// both launched and still within its window.

type Remaining = { days: number; hours: number; mins: number; secs: number };

function calc(): Remaining {
  const ms = Math.max(0, FOUNDING_DEADLINE.getTime() - Date.now());
  return {
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor((ms % 86_400_000) / 3_600_000),
    mins: Math.floor((ms % 3_600_000) / 60_000),
    secs: Math.floor((ms % 60_000) / 1000),
  };
}

export default function PreOpeningPopup() {
  const [show, setShow] = useState(false);
  const [time, setTime] = useState<Remaining | null>(null);

  useEffect(() => {
    // Only surface while founding is live and still open.
    if (!isFoundingLaunched() || !isFoundingActive()) return;
    const dismissed = sessionStorage.getItem("founding-live-popup-dismissed");
    if (dismissed) return;

    const timer = setTimeout(() => setShow(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  // Tick the countdown once a second while visible.
  useEffect(() => {
    if (!show) return;
    setTime(calc());
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, [show]);

  const dismiss = () => {
    setShow(false);
    sessionStorage.setItem("founding-live-popup-dismissed", "true");
  };

  if (!show) return null;

  const blocks: { value: number; label: string }[] = time
    ? [
        { value: time.days, label: "Days" },
        { value: time.hours, label: "Hrs" },
        { value: time.mins, label: "Min" },
        { value: time.secs, label: "Sec" },
      ]
    : [];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-charcoal/50 backdrop-blur-sm animate-fade-in"
        onClick={dismiss}
      />

      {/* Modal */}
      <div className="relative bg-cream rounded-sm max-w-lg w-full p-8 sm:p-10 animate-slide-up shadow-2xl">
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 text-charcoal/40 hover:text-charcoal transition-colors"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center mb-7">
          <p className="text-sm tracking-widest uppercase text-accent mb-3">
            Limited Time
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl font-light text-charcoal mb-3">
            Founding memberships are live.
          </h2>
          <p className="text-muted text-sm max-w-sm mx-auto leading-relaxed">
            25% off mat, locked in for life. Only 15 spots per tier, and
            they&apos;re going fast.
          </p>
        </div>

        {/* Countdown */}
        {blocks.length > 0 && (
          <div className="flex justify-center gap-3 sm:gap-4 mb-7">
            {blocks.map((b) => (
              <div
                key={b.label}
                className="flex flex-col items-center bg-white border border-charcoal/10 rounded-sm px-3 py-2 min-w-[52px]"
              >
                <span className="font-serif text-2xl font-light text-charcoal leading-none">
                  {String(b.value).padStart(2, "0")}
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-muted mt-1">
                  {b.label}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="text-center">
          <Link
            href="/founding"
            onClick={dismiss}
            className="btn-animated inline-block bg-accent text-white text-sm tracking-widest uppercase px-8 py-3.5 hover:bg-accent/90 transition-colors mb-3"
          >
            Become a Founding Member →
          </Link>
          <div>
            <button
              onClick={dismiss}
              className="text-sm text-muted/80 hover:text-charcoal transition-colors"
            >
              Maybe later
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}
