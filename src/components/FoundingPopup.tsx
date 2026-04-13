"use client";

import { useState, useEffect } from "react";

// TODO: Replace with actual Arketa membership purchase URLs when available
const MEMBERSHIP_URL = "https://app.arketa.co/boomerangpilates/memberships";

const rates = [
  { name: "Unlimited Mat", price: "$199", perClass: "$12/class", savings: "Save $50/mo" },
  { name: "2x/Week Mat", price: "$150", perClass: "$18.75/class", savings: "Save $50/mo" },
  { name: "1x/Week Tower", price: "$120", perClass: "$30/class", savings: "Save $60/mo" },
  { name: "Tower + Mat Combo", price: "$200", perClass: "$25/class", savings: "Save $80/mo" },
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
            Be one of the first 50. Your rate never goes up — and you help set the tone.
          </p>
        </div>

        {/* Clickable pricing grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {rates.map((rate) => (
            <a
              key={rate.name}
              href={MEMBERSHIP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={dismiss}
              className="group bg-white border border-charcoal/10 rounded-sm p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-accent/20"
            >
              <p className="text-xs text-muted mb-2">{rate.name}</p>
              <p className="font-serif text-2xl font-light text-charcoal">{rate.price}<span className="text-sm text-muted">/mo</span></p>
              <p className="text-[11px] text-accent mt-1">{rate.perClass}</p>
              <span className="inline-block text-[9px] tracking-wide uppercase text-accent bg-accent/10 px-2 py-0.5 rounded-sm mt-1.5">
                {rate.savings}
              </span>
              <p className="text-[9px] tracking-widest uppercase text-charcoal/0 group-hover:text-accent mt-2 transition-colors duration-200">
                Select →
              </p>
            </a>
          ))}
        </div>

        <p className="text-center text-muted/70 text-xs mb-4">
          First access to the schedule + invite to opening night.
        </p>

        <div className="text-center">
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
