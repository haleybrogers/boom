"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { ScheduleClass } from "@/lib/scheduleData";
import { CLASS_TYPE_STYLES } from "@/lib/classStyles";

// Detail modal for a single class block. Mirrors the visual feel of the
// /events EventDetailModal so the two surfaces feel like part of the
// same family. Open-source booking is intentionally outsourced to
// Momence — the Book button opens that session's Momence page in a new
// tab where auth + payment happen.

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
          <h3 className="font-serif text-2xl sm:text-3xl font-light text-charcoal mb-4 leading-tight">
            {cls.title}
          </h3>

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

          <a
            href={cls.bookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-animated w-full block text-center bg-accent text-white text-sm tracking-widest uppercase px-8 py-3.5 hover:bg-accent/90 transition-colors"
          >
            Book →
          </a>
        </div>
      </div>
    </div>,
    document.body
  );
}
