"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import ContactForm from "./ContactForm";

// A trigger button + modal containing ContactForm. Used on the home page
// for "Get the Scoop" and on /events for the opening-party RSVP.
//
// Same pattern as ClassGuideModal — portaled to body, backdrop-click +
// X + Esc all close, body scroll locked while open.

type ContactFormModalProps = {
  buttonLabel: string;
  buttonClassName?: string;
  heading?: string;
  subhead?: string;
  source?: string;
  sourceId?: number;
  showMessage?: boolean;
  showPhone?: boolean;
  showGuests?: boolean;
  showRtlFields?: boolean;
};

export default function ContactFormModal({
  buttonLabel,
  buttonClassName = "btn-animated inline-block bg-accent text-white text-xs tracking-widest uppercase px-8 py-3.5 hover:bg-accent/90 transition-colors",
  heading = "Get the scoop.",
  subhead = "Grand opening details, new class drops, events, and the stuff we only share with our people.",
  source = "waitlist",
  sourceId,
  showMessage = false,
  showPhone = false,
  showGuests = false,
  showRtlFields = false,
}: ContactFormModalProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={buttonClassName}>
        {buttonLabel}
      </button>

      {open && mounted && createPortal(
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          onClick={() => setOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-charcoal/50 backdrop-blur-sm" />

          {/* Panel */}
          <div
            className="relative w-full max-w-md max-h-[90vh] bg-warm-white shadow-xl overflow-y-auto rounded-sm animate-fade-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-charcoal/40 hover:text-charcoal transition-colors"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="px-7 sm:px-9 py-9">
              <div className="text-center mb-7">
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-charcoal mb-3">
                  {heading}
                </h3>
                <p className="text-sm text-muted max-w-sm mx-auto leading-relaxed">
                  {subhead}
                </p>
              </div>
              <ContactForm source={source} sourceId={sourceId} showMessage={showMessage} showPhone={showPhone} showGuests={showGuests} showRtlFields={showRtlFields} />
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
