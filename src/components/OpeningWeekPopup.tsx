"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  isFoundingActive,
  isFoundingLaunched,
  isOpeningWeekPromoActive,
  FOUNDING_DEADLINE,
  OPENING_WEEK_PROMO_DEADLINE,
} from "@/lib/flags";

// Single home-page pop-up for opening week. Combines what used to be two
// separate pop-ups (founding "last chance" + apparatus discount) so they
// don't stack. Shows once per session, ~4s after load, dismissable.
//
// Countdown targets whichever deadline is more urgent: founding (tonight)
// while it's still live, then the opening-week promo deadline (Sunday)
// after that. The founding block below the countdown only renders while
// founding is actually active; the apparatus-discount block always shows
// as long as the promo itself is active.

const DISMISS_KEY = "opening-week-popup-dismissed";

type Remaining = { days: number; hours: number; mins: number; secs: number };

function calc(target: Date): Remaining {
  const ms = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor((ms % 86_400_000) / 3_600_000),
    mins: Math.floor((ms % 3_600_000) / 60_000),
    secs: Math.floor((ms % 60_000) / 1000),
  };
}

export default function OpeningWeekPopup() {
  const [show, setShow] = useState(false);
  const [time, setTime] = useState<Remaining | null>(null);

  const foundingLive = isFoundingLaunched() && isFoundingActive();
  const promoActive = isOpeningWeekPromoActive();
  const countdownTarget = foundingLive ? FOUNDING_DEADLINE : OPENING_WEEK_PROMO_DEADLINE;

  useEffect(() => {
    if (!promoActive) return;
    if (sessionStorage.getItem(DISMISS_KEY)) return;
    const timer = setTimeout(() => setShow(true), 4000);
    return () => clearTimeout(timer);
  }, [promoActive]);

  useEffect(() => {
    if (!show) return;
    setTime(calc(countdownTarget));
    const id = setInterval(() => setTime(calc(countdownTarget)), 1000);
    return () => clearInterval(id);
  }, [show, countdownTarget]);

  const dismiss = () => {
    setShow(false);
    sessionStorage.setItem(DISMISS_KEY, "true");
  };

  if (!show || !promoActive) return null;

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
      <div className="relative bg-cream rounded-sm max-w-lg w-full p-8 sm:p-10 animate-slide-up shadow-2xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 text-charcoal/40 hover:text-charcoal transition-colors"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center mb-6">
          <p className="text-sm tracking-widest uppercase text-accent mb-3">
            Opening Week
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl font-light text-charcoal mb-3">
            It&apos;s opening week!
          </h2>
          <p className="text-muted text-sm max-w-sm mx-auto leading-relaxed">
            {foundingLive
              ? "Founding pricing ends tonight, plus 10% off apparatus packs all week."
              : "10% off apparatus packs, all week long."}
          </p>
        </div>

        {/* Countdown */}
        {blocks.length > 0 && (
          <>
            <p className="text-[10px] tracking-[0.25em] uppercase text-accent/80 text-center mb-2">
              {foundingLive ? "Founding pricing ends in" : "Opening week ends in"}
            </p>
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
          </>
        )}

        {/* The offers */}
        <div className="space-y-3 border-t border-charcoal/10 pt-6">
          {foundingLive && (
            <div className="bg-white border border-charcoal/10 rounded-sm px-4 py-3.5 text-center">
              <p className="text-sm text-charcoal/80 leading-snug mb-2">
                <span className="font-medium">25% off mat, for life.</span>{" "}
                4&times; and 8&times; Month Mat are sold out — a few
                Unlimited Mat spots are still open.
              </p>
              <Link
                href="/founding"
                onClick={dismiss}
                className="text-[11px] tracking-widest uppercase text-accent hover:text-accent/80 transition-colors"
              >
                Become a Founding Member →
              </Link>
            </div>
          )}

          <div className="bg-white border border-charcoal/10 rounded-sm px-4 py-3.5 text-center">
            <p className="text-sm text-charcoal/80 leading-snug mb-2">
              <span className="font-medium">10% off apparatus packs.</span>{" "}
              Private, Duet &amp; Trio 5- and 10-packs — code{" "}
              <span className="font-medium">OPENINGWEEK</span> at checkout.
            </p>
            <Link
              href="/packs"
              onClick={dismiss}
              className="text-[11px] tracking-widest uppercase text-accent hover:text-accent/80 transition-colors"
            >
              See Apparatus Pricing →
            </Link>
          </div>
        </div>

        <div className="text-center mt-6">
          <button
            onClick={dismiss}
            className="text-sm text-muted/80 hover:text-charcoal transition-colors"
          >
            Maybe later
          </button>
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
