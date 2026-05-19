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
  default_filter: "show-all",
  locale: "en",
};

// Momence's plugin appends its rendered UI as a direct child of <body> under
// id="momence-plugin-host-schedule", completely ignoring our #ribbon-schedule
// placeholder. So we set up a MutationObserver that watches for the widget to
// land in <body>, then relocates it into the slot we actually want.
const WIDGET_ID = "momence-plugin-host-schedule";
const SLOT_ID = "ribbon-schedule";

function relocateWidget() {
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
    // 1) Inject the plugin script once.
    if (!document.getElementById(SCRIPT_ID)) {
      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.async = true;
      script.type = "module";
      script.src = PLUGIN_SRC;
      Object.entries(PLUGIN_ATTRS).forEach(([k, v]) => script.setAttribute(k, v));
      document.body.appendChild(script);
    } else {
      // Script already loaded (client-side nav) — widget may already exist.
      relocateWidget();
    }

    // 2) Watch <body> for the widget node so we can move it into the slot
    //    the moment Momence inserts it. Once moved, disconnect.
    if (relocateWidget()) return;
    const observer = new MutationObserver(() => {
      if (relocateWidget()) observer.disconnect();
    });
    observer.observe(document.body, { childList: true });

    return () => observer.disconnect();
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
