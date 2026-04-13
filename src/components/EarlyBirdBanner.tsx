"use client";

import { useState, useEffect } from "react";

export default function EarlyBirdBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const check = () => {
      const now = new Date();
      const h = now.getHours();
      const m = now.getMinutes();
      // Show between 5:30am and 6:30am local time
      const early = (h === 5 && m >= 30) || h === 6;
      // Don't show if already dismissed this session
      if (early && !sessionStorage.getItem("early-bird-dismissed")) {
        setShow(true);
      }
    };
    check();
    const interval = setInterval(check, 60000);
    return () => clearInterval(interval);
  }, []);

  const dismiss = () => {
    setShow(false);
    sessionStorage.setItem("early-bird-dismissed", "true");
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] max-w-md w-[92%] bg-cream border border-accent/20 text-charcoal pl-5 pr-3 py-4 rounded-sm shadow-xl animate-slide-down-banner flex items-center gap-4">
      {/* Sunrise icon */}
      <svg className="w-5 h-5 text-accent shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M3 18h18" />
        <path d="M5 14a7 7 0 0114 0" />
        <path d="M12 3v3" />
        <path d="M5.6 6.6l1.4 1.4" />
        <path d="M18.4 6.6l-1.4 1.4" />
      </svg>

      <div className="flex-1 min-w-0">
        <p className="text-[10px] tracking-[0.2em] uppercase text-accent mb-0.5">
          Up before the sun
        </p>
        <p className="text-xs leading-snug text-charcoal/80">
          Joseph Pilates rose at dawn for cold showers and disciplined work. You&apos;re in good company.
        </p>
      </div>

      <button
        onClick={dismiss}
        className="text-charcoal/30 hover:text-charcoal transition-colors p-1 shrink-0"
        aria-label="Dismiss"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
