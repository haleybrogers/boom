"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// Pre-opening pop-up: nudges visitors toward /events where the free
// community classes live. Shows once per session, ~4s after page load,
// dismissable. Modeled on FoundingPopup so the dismissal semantics +
// animation feel consistent.

export default function PreOpeningPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("preopening-popup-dismissed");
    if (dismissed) return;

    const timer = setTimeout(() => setShow(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setShow(false);
    sessionStorage.setItem("preopening-popup-dismissed", "true");
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
            Before the Doors Open
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl font-light text-charcoal mb-3">
            Move with us before opening day.
          </h2>
          <p className="text-muted text-sm max-w-sm mx-auto leading-relaxed">
            Free and low-cost mat classes at favorite Durham spots leading up
            to July 13. All levels welcome.
          </p>
        </div>

        <div className="text-center">
          <Link
            href="/events"
            onClick={dismiss}
            className="btn-animated inline-block bg-accent text-white text-sm tracking-widest uppercase px-8 py-3.5 hover:bg-accent/90 transition-colors mb-3"
          >
            See Pop-Up Classes
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
