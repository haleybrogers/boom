"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const rates = [
  { name: "Unlimited Mat", price: "$199", perClass: "$12/class" },
  { name: "2x/Week Mat", price: "$150", perClass: "$18.75/class" },
  { name: "1x/Week Tower", price: "$120", perClass: "$30/class" },
  { name: "Tower + Mat Combo", price: "$200", perClass: "$25/class" },
];

export default function FoundingPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("founding-popup-dismissed");
    if (dismissed) return;

    const timer = setTimeout(() => setShow(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setShow(false);
    sessionStorage.setItem("founding-popup-dismissed", "true");
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
        {/* Close button */}
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
          <p className="text-xs tracking-widest uppercase text-accent mb-3">Limited to First 50 Members</p>
          <h2 className="font-serif text-2xl sm:text-3xl font-light text-charcoal mb-2">
            Founding Member Rates
          </h2>
          <p className="text-muted text-sm">
            Lock in your rate before we open. It never goes up.
          </p>
        </div>

        {/* Pricing grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {rates.map((rate) => (
            <div key={rate.name} className="bg-white border border-charcoal/10 rounded-sm p-4 text-center">
              <p className="text-xs text-muted mb-2">{rate.name}</p>
              <p className="font-serif text-2xl font-light text-charcoal">{rate.price}<span className="text-sm text-muted">/mo</span></p>
              <p className="text-[11px] text-accent mt-1">{rate.perClass}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-muted/70 text-xs mb-6">
          Plus exclusive invites to our soft opening and celebratory events.
        </p>

        <div className="flex flex-col gap-3 text-center">
          <Link
            href="/classes#founding"
            onClick={dismiss}
            className="inline-block bg-accent text-white text-xs tracking-widest uppercase py-3.5 px-8 hover:bg-accent/90 transition-colors"
          >
            See All Founding Rates
          </Link>
          <button
            onClick={dismiss}
            className="text-xs text-muted/60 hover:text-charcoal transition-colors"
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
