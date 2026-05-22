"use client";

import { useEffect, useState } from "react";
import ContactForm from "./ContactForm";
import { FOUNDING_LAUNCH } from "@/lib/flags";

// Countdown card + SMS opt-in. Renders above the founding pricing cards
// on /founding while founding membership is still pre-launch. Two states:
//
//   pre-launch  → big "Founding launches in X days, Y hours" timer,
//                 inline phone capture so Emilie can SMS-blast the
//                 waitlist when it goes live. Form posts to Momence
//                 lead form 204540 (same one the home "Get the Scoop"
//                 uses); tagged "founding-sms-waitlist" so Emilie can
//                 filter by source inside Momence and broadcast.
//
//   post-launch → component renders nothing. The /founding page's own
//                 isFoundingLaunched() gate will swap to the live
//                 pricing cards on the next render / revalidate.
//
// Separate from FoundingCountdown.tsx, which counts down to the
// DEADLINE (when founding pricing ends, July 13). Two different
// moments, two different components.

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
  // Start null on first render to avoid SSR/CSR mismatch (Date.now() differs
  // between server and hydration). useEffect populates immediately on mount.
  const [remaining, setRemaining] = useState<Remaining | null>(null);
  const [mounted, setMounted] = useState(false);
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

  // Pre-hydration: render the static frame so layout doesn't shift.
  // Once mounted, we know whether we should be visible at all.
  if (mounted && remaining === null) return null;

  return (
    <div className="bg-accent/5 border border-accent/30 rounded-sm p-8 sm:p-10 max-w-3xl mx-auto">
      <div className="text-center mb-7">
        <p className="text-[11px] tracking-[0.4em] uppercase text-accent mb-4">
          Almost open
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl font-light text-charcoal leading-tight mb-3">
          Founding memberships launch{" "}
          <span className="whitespace-nowrap">
            {fmtLaunchDate(FOUNDING_LAUNCH)}
          </span>
          .
        </h2>
        <p className="text-sm text-muted">
          {fmtLaunchTime(FOUNDING_LAUNCH)} sharp. Get a text the moment they go
          live — head start before we open to everyone.
        </p>
      </div>

      {/* Countdown blocks. d / h / m / s. Render frame even pre-mount so
          the layout is stable; values stay blank until hydration ticks. */}
      <div className="grid grid-cols-4 gap-3 sm:gap-5 max-w-xl mx-auto mb-9">
        {(
          [
            ["days", "Days"],
            ["hours", "Hours"],
            ["minutes", "Min"],
            ["seconds", "Sec"],
          ] as const
        ).map(([key, label]) => (
          <div
            key={key}
            className="bg-white border border-accent/20 rounded-sm py-4 text-center"
          >
            <p className="font-serif text-3xl sm:text-4xl font-light text-charcoal leading-none tabular-nums">
              {remaining
                ? String(remaining[key]).padStart(2, "0")
                : "——"}
            </p>
            <p className="text-[10px] tracking-[0.25em] uppercase text-muted mt-2">
              {label}
            </p>
          </div>
        ))}
      </div>

      {/* SMS opt-in. Reuses ContactForm with showPhone, no message. */}
      {submitted ? (
        <div className="text-center py-6 border-t border-accent/20">
          <p className="font-serif text-xl font-light text-charcoal mb-2">
            You&apos;re on the list.
          </p>
          <p className="text-sm text-muted">
            We&apos;ll text you the second founding memberships go live.
          </p>
        </div>
      ) : (
        <div className="border-t border-accent/20 pt-7">
          <p className="text-center text-sm text-charcoal/70 mb-4 font-medium">
            Get a text when founding goes live.
          </p>
          <ContactForm
            source="founding-sms-waitlist"
            sourceId={204540}
            showMessage={false}
            showPhone={true}
            onSuccess={() => setSubmitted(true)}
          />
        </div>
      )}
    </div>
  );
}
