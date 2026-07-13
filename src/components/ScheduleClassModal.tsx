"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import type { ScheduleClass } from "@/lib/scheduleData";
import { CLASS_TYPE_STYLES } from "@/lib/classStyles";
import { MAT_SERIES_BUNDLE_URL } from "@/lib/staticEvents";
import { instructorPhoto } from "@/lib/instructors";

// The 3-part Mat Series sessions all share the tagline title "No straps.
// No springs. No limits." in Momence. When one of those is open we also
// surface a "Book all 3" CTA linking to the series bundle.
const MAT_SERIES_TITLE_RE = /^no straps\.?\s+no springs\.?\s+no limits\.?$/i;

// The Grand Opening Party is a Momence-hosted event (no ticketed
// checkout), so its CTA reads "RSVP" instead of "Book".
const OPENING_PARTY_TITLE_RE = /grand opening party/i;

// Detail modal for a single class block. cls.action.type === "book" →
// external Book button that opens Momence in a new tab. Auth + payment
// happen there.

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
  const [copied, setCopied] = useState(false);

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
  const isMatSeries = MAT_SERIES_TITLE_RE.test(cls.title.trim());
  const isOpeningParty = OPENING_PARTY_TITLE_RE.test(cls.title.trim());

  // "Send this to a friend" — on phones this opens the native share
  // sheet (Messages, etc.); on desktop it falls back to copying the link
  // with a brief "Link copied!" confirmation. We share the direct
  // Momence booking link so the friend lands right on checkout.
  const shareUrl = cls.action.bookUrl;

  const handleShare = async () => {
    const shareText = `Book this with me! ${cls.title} at Boomerang Pilates — ${formatDate(
      cls.startISO
    )}, ${formatTimeRange(cls.startISO, cls.endISO)}.`;
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: cls.title, text: shareText, url: shareUrl });
      } catch {
        // user dismissed the share sheet — nothing to do
      }
      return;
    }
    // Desktop fallback: copy the link (+ blurb) to the clipboard.
    try {
      await navigator.clipboard.writeText(`${shareText} ${shareUrl}`.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // clipboard blocked — silently ignore
    }
  };

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

          {/* Instructor. Small headshot when we have one on file;
              falls back to name-only for instructors without a photo. */}
          {cls.instructor && (
            <div className="flex items-center gap-3 mb-6">
              {(() => {
                const photo = instructorPhoto(cls.instructor);
                return photo ? (
                  <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 bg-warm-white">
                    <Image
                      src={photo.src}
                      alt={cls.instructor}
                      fill
                      sizes="40px"
                      className={photo.className}
                    />
                  </div>
                ) : null;
              })()}
              <p className="text-sm text-charcoal/80">
                <span className="text-charcoal/50">Instructor</span>{" "}
                {cls.instructor}
              </p>
            </div>
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

          {/* Residents-only disclaimer (above the action). Critical
              for apartment-building pop-ups — no one should book
              without seeing this and getting turned away at the gate. */}
          {cls.residentsOnly && (
            <p className="text-sm text-accent text-center mb-3 border border-accent/20 bg-accent/5 rounded-sm px-4 py-3">
              Residents of <strong>{cls.residentsOnly.building}</strong> only.
            </p>
          )}
          {cls.isFull && !cls.allowsWaitlist && (
            <span
              className="w-full block text-center bg-cream border border-accent/30 text-accent text-sm tracking-widest uppercase px-8 py-3.5 cursor-default select-none"
              aria-disabled="true"
            >
              Sold Out
            </span>
          )}
          {cls.isFull && cls.allowsWaitlist && (
            <a
              href={cls.action.bookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-animated w-full block text-center bg-charcoal text-white text-sm tracking-widest uppercase px-8 py-3.5 hover:bg-charcoal/90 transition-colors"
            >
              Class Full · Join the Waitlist →
            </a>
          )}
          {!cls.isFull && (
            <a
              href={cls.action.bookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-animated w-full block text-center bg-accent text-white text-sm tracking-widest uppercase px-8 py-3.5 hover:bg-accent/90 transition-colors"
            >
              {isOpeningParty
                ? "RSVP →"
                : isMatSeries
                  ? "Book just this date →"
                  : "Book →"}
            </a>
          )}
          {/* 3-part Mat Series — book the whole bundle in one go. Sits
              below the single-session CTA as a secondary (outline)
              action. */}
          {isMatSeries && (
            <a
              href={MAT_SERIES_BUNDLE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-animated w-full block text-center mt-3 border border-accent text-accent text-sm tracking-widest uppercase px-8 py-3.5 hover:bg-accent hover:text-white transition-colors"
            >
              Book entire series →
            </a>
          )}

          {/* Share with a friend — native share sheet on mobile,
              copy-link fallback on desktop. */}
          <button
            type="button"
            onClick={handleShare}
            className="mt-4 w-full flex items-center justify-center gap-2 text-[11px] tracking-[0.25em] uppercase text-charcoal/60 hover:text-accent transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
            {copied ? "Link copied!" : "Share with a friend"}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
