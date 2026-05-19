"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

// Momence host-schedule plugin embed, wrapped in a click-to-open modal.
//
// The widget div (#ribbon-schedule) lives inside the modal but the modal is
// always mounted in the DOM (visibility toggled via opacity + pointer-events)
// — that way Momence's plugin script can hydrate the widget on page load, so
// when the user clicks "Book a Class" the schedule appears instantly with no
// loading spinner. display:none would tear the widget out of layout and many
// embedded calendars miscalculate their dimensions when that happens.
//
// Script tag uses non-React attribute names (host_id, teacher_ids, etc.) read
// by the plugin at load time; we inject it programmatically in useEffect so
// hydration doesn't choke and so we can keep config in one object.
//
// To filter, populate the JSON arrays — e.g. teacher_ids='[413561,413068]'
// for Emilie + Annie only. Teacher IDs come from the /Teachers Momence API.

const SCRIPT_ID = "momence-host-schedule";
const PLUGIN_SRC = "https://momence.com/plugin/host-schedule/host-schedule.js";

const PLUGIN_ATTRS: Record<string, string> = {
  host_id: process.env.NEXT_PUBLIC_MOMENCE_HOST_ID || "270195",
  teacher_ids: "[]",
  location_ids: "[]",
  tag_ids: "[]",
  lite_mode: "true",
  default_filter: "today",
  locale: "en",
};

export default function MomenceSchedule() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (!document.getElementById(SCRIPT_ID)) {
      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.async = true;
      script.type = "module";
      script.src = PLUGIN_SRC;
      Object.entries(PLUGIN_ATTRS).forEach(([k, v]) => script.setAttribute(k, v));
      document.body.appendChild(script);
    }
  }, []);

  // Lock body scroll while the modal is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Esc to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <style>{`
        :root {
          --momenceColorBackground: #FDFCFA;
          --momenceColorPrimary: 244, 240, 235;
          --momenceColorBlack: 176, 45, 74;
        }
      `}</style>

      {/* Trigger */}
      <div className="text-center">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="btn-animated inline-block bg-accent text-white text-xs tracking-widest uppercase px-10 py-4 hover:bg-accent/90 transition-colors"
        >
          Book a Class
        </button>
      </div>

      {/* Modal — portaled to body so it escapes any transform/filter ancestors.
          Always rendered after first client mount; opacity + pointer-events
          toggle visibility so the Momence widget keeps its hydration. */}
      {mounted &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 transition-opacity duration-200"
            style={{
              opacity: open ? 1 : 0,
              pointerEvents: open ? "auto" : "none",
            }}
            aria-hidden={!open}
            onClick={() => setOpen(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-charcoal/50 backdrop-blur-sm" />

            {/* Panel */}
            <div
              className="relative w-full max-w-4xl max-h-[90vh] bg-warm-white shadow-xl overflow-y-auto rounded-sm"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 bg-warm-white/95 backdrop-blur-sm border-b-2 border-accent px-6 py-5 flex items-center justify-between z-10">
                <div>
                  <p className="text-[10px] tracking-[0.3em] uppercase text-accent mb-1">
                    Schedule
                  </p>
                  <h3 className="font-serif text-2xl font-light text-charcoal">
                    Book a Class
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="text-charcoal/40 hover:text-charcoal transition-colors"
                  aria-label="Close schedule"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Widget */}
              <div className="px-4 sm:px-6 py-4">
                <div id="ribbon-schedule" />
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
