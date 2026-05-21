"use client";

import { useEffect } from "react";

// Inline variant of the Momence host-schedule plugin.
//
// Lessons learned the hard way:
//  - Cache-busting the script URL (?t=Date.now()) breaks the Momence plugin:
//    it ends up reading host_id as NaN and hits a 404 on the API. So we
//    load the canonical URL only.
//  - Cleanup-on-unmount (removing the widget + script) was causing the
//    schedule to never load on re-entry. Dropped.
//
// Every link to /schedule is now a hard <a> nav (see Navigation,
// StickyCTA, OfferingCards, NewToPilates), which means every visit is a
// fresh page load. Fresh DOM, fresh script load, fresh widget. The
// component below just needs to be simple: inject the script once,
// relocate the widget into the slot when it appears, done.

const SCRIPT_ID = "momence-host-schedule";
const PLUGIN_SRC = "https://momence.com/plugin/host-schedule/host-schedule.js";
const WIDGET_ID = "momence-plugin-host-schedule";
const SLOT_ID = "ribbon-schedule";

const PLUGIN_ATTRS: Record<string, string> = {
  host_id: process.env.NEXT_PUBLIC_MOMENCE_HOST_ID || "270195",
  teacher_ids: "[]",
  location_ids: "[]",
  tag_ids: "[]",
  lite_mode: "true",
  default_filter: "show-all",
  locale: "en",
};

function relocateWidget(): boolean {
  const widget = document.getElementById(WIDGET_ID);
  const slot = document.getElementById(SLOT_ID);
  if (widget && slot && widget.parentElement !== slot) {
    slot.appendChild(widget);
    return true;
  }
  return false;
}

export default function MomenceScheduleInline() {
  useEffect(() => {
    // Widget already exists in DOM (e.g., the rare soft-nav case)? Just move it.
    if (relocateWidget()) return;

    // Watch for the widget element to appear so we can pull it into the slot.
    const observer = new MutationObserver(() => {
      if (relocateWidget()) observer.disconnect();
    });
    observer.observe(document.body, { childList: true });

    // Inject the plugin script ONCE per page load. Don't cache-bust. The
    // plugin doesn't tolerate it (reads host_id as NaN with a query param).
    if (!document.getElementById(SCRIPT_ID)) {
      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.async = true;
      script.type = "module";
      script.src = PLUGIN_SRC;
      Object.entries(PLUGIN_ATTRS).forEach(([k, v]) => script.setAttribute(k, v));
      document.body.appendChild(script);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        :root {
          /* Blend with the warm-white page background */
          --momenceColorBackground: #FDFCFA;
          --momenceColorPrimary: 244, 240, 235;     /* cream. Used by Momence for surfaces / hovers */
          /* Charcoal (#3f3936). Momence uses this var for body text and
             button copy; keeping it actually-dark gives us readable contrast
             on the cream surfaces. Was previously the brand accent red,
             which dropped contrast below comfortable on small text. */
          --momenceColorBlack: 63, 57, 54;
        }
      `}</style>
      {/* min-height pre-allocates roughly the widget's rendered space so
          when Momence hydrates the schedule, the surrounding page doesn't
          jump. Widget settles into ~1700px on a desktop screen. 80vh
          covers most viewports without leaving an absurd gap if it loads
          smaller. */}
      <div id={SLOT_ID} className="min-h-[80vh]" />
    </>
  );
}
