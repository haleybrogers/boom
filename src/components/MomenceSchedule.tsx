"use client";

import { useEffect } from "react";

// Momence host-schedule plugin embed.
//
// The snippet Momence generates uses non-React-friendly attribute names on the
// <script> tag (host_id, teacher_ids, etc.) — those are read by the plugin
// when it loads, not by React. Injecting via useEffect on mount keeps Next's
// hydration happy and lets us control parameters from a single config object.
//
// To filter by specific teachers, locations, or tags, populate the JSON arrays
// (e.g. teacher_ids='[413561,413068]' for Emilie + Annie only). Empty arrays
// mean "show all". Teacher IDs are returned by GET /Teachers — see
// src/lib/momence.ts for the API client.

const SCRIPT_ID = "momence-host-schedule";
const PLUGIN_SRC = "https://momence.com/plugin/host-schedule/host-schedule.js";

const PLUGIN_ATTRS: Record<string, string> = {
  host_id: process.env.NEXT_PUBLIC_MOMENCE_HOST_ID || "270195",
  teacher_ids: "[]",
  location_ids: "[]",
  tag_ids: "[]",
  default_filter: "show-all",
  locale: "en",
};

export default function MomenceSchedule() {
  useEffect(() => {
    if (document.getElementById(SCRIPT_ID)) return;

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.async = true;
    script.type = "module";
    script.src = PLUGIN_SRC;
    Object.entries(PLUGIN_ATTRS).forEach(([k, v]) => script.setAttribute(k, v));
    document.body.appendChild(script);
  }, []);

  return <div id="ribbon-schedule" />;
}
