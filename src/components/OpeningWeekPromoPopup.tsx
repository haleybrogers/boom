"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { isOpeningWeekPromoActive } from "@/lib/flags";

// Home-page pop-up for the opening-week apparatus discount (10% off
// Private/Duet/Trio 5- and 10-packs, code OPENINGWEEK). Shows once per
// session, a few seconds after load, dismissable. Auto-hides once
// OPENING_WEEK_PROMO_DEADLINE passes (see flags.ts).
//
// Waits for the founding-membership pop-up (PreOpeningPopup) to be
// dismissed first so the two full-screen modals don't stack. Falls back
// to showing anyway after a few seconds if that pop-up never appears.

const DISMISS_KEY = "opening-week-promo-popup-dismissed";
const FOUNDING_POPUP_DISMISSED_KEY = "founding-live-popup-dismissed";

export default function OpeningWeekPromoPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!isOpeningWeekPromoActive()) return;
    if (sessionStorage.getItem(DISMISS_KEY)) return;

    const tryShow = () => {
      if (sessionStorage.getItem(FOUNDING_POPUP_DISMISSED_KEY)) {
        setShow(true);
        return true;
      }
      return false;
    };

    if (tryShow()) return;
    const poll = setInterval(() => {
      if (tryShow()) clearInterval(poll);
    }, 500);
    // Founding pop-up may not be active at all (e.g. after its deadline) —
    // don't wait forever for a dismissal that'll never come.
    const fallback = setTimeout(() => {
      clearInterval(poll);
      setShow(true);
    }, 8000);
    return () => {
      clearInterval(poll);
      clearTimeout(fallback);
    };
  }, []);

  const dismiss = () => {
    setShow(false);
    sessionStorage.setItem(DISMISS_KEY, "true");
  };

  if (!show) return null;

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
            Opening Week Only
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl font-light text-charcoal mb-3">
            10% off apparatus packs.
          </h2>
          <p className="text-muted text-sm max-w-sm mx-auto leading-relaxed">
            Privates, duets, and trios (group apparatus) — 10% off every
            5- and 10-pack, this week only. Use code{" "}
            <span className="font-medium text-charcoal">OPENINGWEEK</span> at
            checkout.
          </p>
        </div>

        <div className="text-center">
          <Link
            href="/packs"
            onClick={dismiss}
            className="btn-animated inline-block bg-accent text-white text-sm tracking-widest uppercase px-8 py-3.5 hover:bg-accent/90 transition-colors mb-3"
          >
            See Apparatus Pricing →
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
