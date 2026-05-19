"use client";

import { useEffect } from "react";

// Momence lead-form plugin — collects name + email + phone, drops the lead
// into the same Momence account as bookings/schedule. Replaces the old
// Formspree WaitlistForm so every email signup lives in one place.
//
// Same general pattern as MomenceScheduleInline:
//  - inject the script once per page load (canonical URL, no cache-bust)
//  - plugin hydrates whatever it needs into #momence-plugin-lead-form

const SCRIPT_ID = "momence-plugin-lead-form-src";
const PLUGIN_SRC = "https://momence.com/plugin/lead-form/lead-form.js";

const PLUGIN_ATTRS: Record<string, string> = {
  host_id: process.env.NEXT_PUBLIC_MOMENCE_HOST_ID || "270195",
  fields: "firstName,lastName,email,phoneNumber",
  // Lead-form token is distinct from the host-schedule token; tied to this
  // specific plugin instance in Momence dashboard.
  token: "BZ8lpMEm8R",
  country_code: "us",
  "data-field-def": JSON.stringify({
    firstName: { type: "text", label: "First name", required: true },
    lastName: { type: "text", label: "Last name", required: true },
    email: { type: "email", label: "Email", required: true },
    phoneNumber: { type: "phone-number", label: "Phone number", required: true },
  }),
};

export default function MomenceLeadForm() {
  useEffect(() => {
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

  return <div id="momence-plugin-lead-form" />;
}
