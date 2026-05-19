"use client";

import { useEffect } from "react";

// Inline variant of the Momence host-schedule plugin — same widget as
// MomenceSchedule.tsx but rendered directly in the page instead of inside a
// click-to-open modal. Used on the home page where the schedule is the
// primary action.
//
// IMPORTANT: only one ribbon-schedule div per page. Don't render both this
// and the modal MomenceSchedule on the same route.

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

export default function MomenceScheduleInline() {
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

  return (
    <>
      <style>{`
        :root {
          --momenceColorBackground: #FDFCFA;
          --momenceColorPrimary: 244, 240, 235;
          --momenceColorBlack: 176, 45, 74;
        }
      `}</style>
      <div id="ribbon-schedule" />
    </>
  );
}
