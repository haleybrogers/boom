"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { ScheduleClass } from "@/lib/scheduleData";
import { CLASS_TYPE_STYLES } from "@/lib/classStyles";
import ContactForm from "./ContactForm";

// Detail modal for a single class block. Two action shapes:
//   - cls.action.type === "book"  → external Book button that opens
//     Momence in a new tab. Auth + payment happen there.
//   - cls.action.type === "rsvp"  → inline ContactForm that posts to
//     Momence's lead form (sourceId). Used for the Opening Party,
//     which doesn't have a Momence booking flow but does collect
//     names + guest counts. Mirrors the RSVP flow on /events so the
//     two surfaces feel like one product.

const TZ = "America/New_York";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: TZ,
  });
}

function formatTimeRange(startISO: string, endISO: string) {
  const fmt = (iso: string) =>
    new Date(iso)
      .toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        timeZone: TZ,
      })
      .toLowerCase()
      .replace(" ", "");
  return `${fmt(startISO)} – ${fmt(endISO)}`;
}

export default function ScheduleClassModal({
  cls,
  onClose,
}: {
  cls: ScheduleClass;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  const [showRsvp, setShowRsvp] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  if (!mounted) return null;

  const style = CLASS_TYPE_STYLES[cls.type];
  const isRsvp = cls.action.type === "rsvp";

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-charcoal/50 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-lg max-h-[90vh] bg-warm-white shadow-xl overflow-y-auto rounded-sm animate-fade-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-3 text-charcoal/40 hover:text-charcoal transition-colors z-20 bg-white/80 backdrop-blur-sm rounded-full"
          aria-label="Close"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="px-7 sm:px-9 py-9">
          {/* RSVP submission view (only reachable when action is rsvp) */}
          {showRsvp && isRsvp && cls.action.type === "rsvp" ? (
            <>
              <button
                type="button"
                onClick={() => setShowRsvp(false)}
                className="text-[11px] tracking-widest uppercase text-accent/70 hover:text-accent transition-colors mb-5"
              >
                ← Back to details
              </button>
              <h3 className="font-serif text-2xl sm:text-3xl font-light text-charcoal mb-2">
                {cls.action.rsvpHeading || "Save your spot."}
              </h3>
              {cls.action.rsvpSubhead && (
                <p className="text-sm text-muted mb-7 leading-relaxed">
                  {cls.action.rsvpSubhead}
                </p>
              )}
              <ContactForm
                source="rsvp-party"
                sourceId={cls.action.sourceId}
                showMessage={false}
                showGuests={true}
              />
            </>
          ) : (
            <>
              {/* Type chip */}
              <div className="mb-5">
                <span
                  className="inline-block text-[10px] tracking-[0.25em] uppercase rounded-full px-2.5 py-1"
                  style={{
                    background: style.bgSoft,
                    color: style.text,
                    border: `1px solid ${style.border}`,
                  }}
                >
                  {style.label}
                </span>
              </div>

              <p className="text-sm tracking-widest uppercase text-accent mb-3">
                {formatDate(cls.startISO)}
              </p>
              <h3 className="font-serif text-2xl sm:text-3xl font-light text-charcoal mb-2 leading-tight">
                {cls.title}
              </h3>
              {cls.heroNote && (
                <p className="font-serif italic text-sm text-charcoal/60 mb-4">
                  {cls.heroNote}
                </p>
              )}

              {cls.description && (
                <p className="text-sm text-muted leading-relaxed mb-6 whitespace-pre-line">
                  {cls.description}
                </p>
              )}

              {/* Meta */}
              <div className="space-y-2 text-sm text-muted border-t border-charcoal/10 pt-5 mb-7">
                <p>
                  <span className="text-charcoal/50 inline-block w-20">Time</span>
                  {formatTimeRange(cls.startISO, cls.endISO)}
                </p>
                <p>
                  <span className="text-charcoal/50 inline-block w-20">Where</span>
                  {cls.location}
                </p>
                {cls.price && (
                  <p>
                    <span className="text-charcoal/50 inline-block w-20">Price</span>
                    {cls.price}
                  </p>
                )}
              </div>

              {cls.action.type === "book" && (
                <a
                  href={cls.action.bookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-animated w-full block text-center bg-accent text-white text-sm tracking-widest uppercase px-8 py-3.5 hover:bg-accent/90 transition-colors"
                >
                  Book →
                </a>
              )}
              {cls.action.type === "rsvp" && (
                <button
                  type="button"
                  onClick={() => setShowRsvp(true)}
                  className="btn-animated w-full block bg-accent text-white text-sm tracking-widest uppercase px-8 py-3.5 hover:bg-accent/90 transition-colors"
                >
                  RSVP →
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
