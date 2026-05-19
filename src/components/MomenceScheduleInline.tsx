"use client";

import { useEffect } from "react";

// Inline variant of the Momence host-schedule plugin.
//
// History of pain:
//  - Momence's plugin renders its widget into <div id="momence-plugin-host-schedule">
//    which it appends to <body>, NOT into our <div id="ribbon-schedule"> placeholder.
//  - The plugin script (an ES module) only initialises once per module load.
//  - On Next.js soft-nav between pages, React removes the slot div (and the widget
//    inside it) — but the module stays loaded, so the next mount finds nothing
//    and the schedule renders empty.
//
// The earlier "stash widget back to <body> on unmount" approach was fragile —
// race conditions between React DOM removal and useEffect cleanup meant the
// widget was sometimes already gone by the time cleanup ran, leaving the user
// with a blank schedule.
//
// This version is the brute-force-reliable approach:
//   on every mount: nuke any leftover widget+script, then inject a fresh
//   cache-busted module URL so the plugin re-initialises from scratch.
//   on unmount: remove widget+script so the next mount starts clean.
//
// Costs a few ms re-fetch per visit (Momence's script is small) in exchange
// for the schedule actually being there every single time.

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

function cleanup() {
  document.getElementById(WIDGET_ID)?.remove();
  document.getElementById(SCRIPT_ID)?.remove();
}

export default function MomenceScheduleInline() {
  useEffect(() => {
    // Nuke any stale widget + script from a prior mount.
    cleanup();

    // Set up the relocator FIRST so it catches the widget the instant
    // the plugin creates it.
    const observer = new MutationObserver(() => {
      if (relocateWidget()) observer.disconnect();
    });
    observer.observe(document.body, { childList: true });

    // Inject a fresh script with a cache-busted URL so the ES module
    // re-executes (browsers cache modules by URL, so the same URL won't
    // re-run on subsequent loads).
    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.async = true;
    script.type = "module";
    script.src = `${PLUGIN_SRC}?t=${Date.now()}`;
    Object.entries(PLUGIN_ATTRS).forEach(([k, v]) => script.setAttribute(k, v));
    document.body.appendChild(script);

    return () => {
      observer.disconnect();
      cleanup();
    };
  }, []);

  return (
    <>
      <style>{`
        :root {
          --momenceColorBackground: #FDFCFA;
          --momenceColorPrimary: 244, 240, 235;
          --momenceColorBlack: 176, 45, 74;
        }
      `}</style>
      <div id={SLOT_ID} />
    </>
  );
}
