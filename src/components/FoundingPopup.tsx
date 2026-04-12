"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function FoundingPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check if user already dismissed it this session
    const dismissed = sessionStorage.getItem("founding-popup-dismissed");
    if (dismissed) return;

    // Show after 4 seconds of browsing
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
      <div className="relative bg-cream rounded-sm max-w-md w-full p-10 text-center animate-slide-up shadow-2xl">
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

        <p className="text-xs tracking-widest uppercase text-accent mb-4">Limited Time</p>

        <h2 className="font-serif text-2xl sm:text-3xl font-light text-charcoal mb-3">
          Become a Founding Member
        </h2>

        <p className="text-muted text-base mb-2">
          Lock in your rate before we open —
        </p>

        <p className="text-charcoal font-serif text-xl mb-1">
          Save up to <span className="text-accent font-medium">$50/month forever.</span>
        </p>

        <p className="text-muted/70 text-sm mb-8">
          Your price never goes up. First class is on us.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            href="/classes#founding"
            onClick={dismiss}
            className="inline-block bg-accent text-white text-xs tracking-widest uppercase py-3.5 px-8 hover:bg-accent/90 transition-colors"
          >
            See Founding Rates
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
