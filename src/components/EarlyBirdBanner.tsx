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
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[60] max-w-sm w-[90%] bg-charcoal text-white px-5 py-3 rounded-sm shadow-lg animate-slide-down-banner flex items-center gap-3">
      <span className="text-lg">☕</span>
      <p className="text-xs leading-snug flex-1">
        You&apos;re up early. Joseph Pilates would approve.
      </p>
      <button
        onClick={dismiss}
        className="text-white/50 hover:text-white transition-colors"
        aria-label="Dismiss"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
