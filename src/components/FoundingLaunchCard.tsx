"use client";

import { useEffect, useState } from "react";
import ContactForm from "./ContactForm";
import { FOUNDING_LAUNCH } from "@/lib/flags";

// Slim early-access strip. Lives ABOVE the founding pricing cards on
// /founding. Three states:
//
//   collapsed   (default) → compact horizontal countdown + scarcity line
//                           + "Get Early Access" button.
//   expanded    (click)   → same countdown, but the line + button area
//                           swaps to the email/phone signup form.
//   submitted   (post)    → "You're in" confirmation in the same slot.
//
// Goal is to take up much less vertical space than the old big-card
// version. The actual signup is one click away — the strip doesn't
// dominate the page unless someone opts in. Form posts to Momence lead
// 204540 tagged "founding-early-access" so Emilie can filter and
// broadcast the link on launch morning.
//
// Separate from FoundingCountdown.tsx, which counts to the founding
// DEADLINE (July 13). Different moment, different component.

type Remaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getRemaining(targetMs: number): Remaining | null {
  const diff = targetMs - Date.now();
  if (diff <= 0) return null;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds };
}

const TZ = "America/New_York";

function fmtLaunchDate(d: Date): string {
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: TZ,
  });
}

function fmtLaunchTime(d: Date): string {
  return (
    d
      .toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        timeZone: TZ,
      })
      .toLowerCase()
      .replace(" ", "") + " ET"
  );
}

export default function FoundingLaunchCard() {
  const targetMs = FOUNDING_LAUNCH.getTime();
  // null on first render → avoid SSR/CSR mismatch; useEffect populates
  // immediately on mount and ticks per second after.
  const [remaining, setRemaining] = useState<Remaining | null>(null);
  const [mounted, setMounted] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setRemaining(getRemaining(targetMs));
    const id = setInterval(() => {
      const next = getRemaining(targetMs);
      setRemaining(next);
      if (next === null) clearInterval(id);
    }, 1000);
    return () => clearInterval(id);
  }, [targetMs]);

  // Launch already passed → render nothing.
  if (mounted && remaining === null) return null;

  return (
    <div className="bg-accent/5 border border-accent/30 rounded-sm px-5 py-5 sm:px-7 sm:py-6 max-w-3xl mx-auto">
      {/* Top row: tiny header + the compact countdown blocks. */}
      <div className="text-center mb-4">
        <p className="text-[10px] tracking-[0.35em] uppercase text-accent mb-3">
          Founding drops {fmtLaunchDate(FOUNDING_LAUNCH).split(",")[0]} ·{" "}
          {fmtLaunchTime(FOUNDING_LAUNCH)}
        </p>
        <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-md mx-auto">
          {(
            [
              ["days", "Days"],
              ["hours", "Hrs"],
              ["minutes", "Min"],
              ["seconds", "Sec"],
            ] as const
          ).map(([key, label]) => (
            <div
              key={key}
              className="bg-white border border-accent/20 rounded-sm py-2"
            >
              <p className="font-serif text-2xl font-light text-charcoal leading-none tabular-nums">
                {remaining ? String(remaining[key]).padStart(2, "0") : "——"}
              </p>
              <p className="text-[9px] tracking-[0.2em] uppercase text-muted mt-1">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom region: scarcity line + CTA, OR the expanded form, OR the
          submitted confirmation. The component takes the same horizontal
          footprint in every state — only the contents change. */}
      {submitted ? (
        <div className="text-center pt-3">
          <p className="font-serif text-lg font-light text-charcoal mb-1">
            You&apos;re in.
          </p>
          <p className="text-sm text-muted leading-relaxed max-w-sm mx-auto">
            Watch your inbox 24 hours before founding opens to the public.
          </p>
        </div>
      ) : expanded ? (
        <div className="pt-3">
          <p className="text-center text-xs text-muted mb-4 leading-relaxed max-w-md mx-auto">
            Drop your info and we&apos;ll send the link 24 hours before
            founding goes public.
          </p>
          <ContactForm
            source="founding-early-access"
            sourceId={204540}
            showMessage={false}
            showPhone={true}
            requirePhone={true}
            onSuccess={() => setSubmitted(true)}
          />
          <button
            type="button"
            onClick={() => setExpanded(false)}
            className="block mx-auto mt-4 text-[11px] tracking-widest uppercase text-charcoal/50 hover:text-charcoal transition-colors"
          >
            ← Cancel
          </button>
        </div>
      ) : (
        <div className="text-center pt-3">
          <p className="text-sm text-muted mb-4 leading-relaxed">
            <strong className="text-charcoal">15 spots per tier.</strong>{" "}
            Newsletter folks get 24-hour early access.
          </p>
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="btn-animated inline-block bg-accent text-white text-sm tracking-widest uppercase px-7 py-3 hover:bg-accent/90 transition-colors"
          >
            Get Early Access →
          </button>
        </div>
      )}
    </div>
  );
}
