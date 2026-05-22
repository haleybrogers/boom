// POST /api/notify
//
// Light-touch email notification endpoint. Every site form (Contact,
// Get the Scoop, RSVP, founding early-access, privates waitlist) also
// POSTs here so Emilie's inbox gets a real-time copy of every signup,
// independent of Momence's lead funnel.
//
// Uses the Resend HTTPS API directly (no SDK / new dependency). Resend's
// free tier covers far more than a pre-launch studio will ever send.
//
// Required env vars (set in Vercel → Project Settings → Environment):
//   RESEND_API_KEY   API key from resend.com dashboard
//
// Optional env vars (with defaults):
//   NOTIFY_TO        recipient (defaults to emilie@boomerangnc.com)
//   NOTIFY_FROM      sender (defaults to Resend's "onboarding@resend.dev"
//                    which only works if NOTIFY_TO is verified in Resend.
//                    Swap to a verified domain sender like
//                    "site@boomerangnc.com" once Emilie verifies the
//                    domain in Resend.)
//
// Failure mode is silent-by-design: if the API key isn't set, or Resend
// returns an error, we log and return 200. The form's primary submission
// path is Momence; email is bonus. Don't break the form if email fails.

import { NextRequest, NextResponse } from "next/server";

type NotifyPayload = {
  source?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  message?: string;
  // Free-form extras — guests count, RTL course selection, etc. — get
  // rendered into the email body as a definition list.
  extras?: Record<string, string | number | boolean | undefined>;
};

const SOURCE_LABELS: Record<string, string> = {
  contact: "Contact Form",
  "rsvp-party": "Opening Party RSVP",
  waitlist: "Get the Scoop (Home Waitlist)",
  "founding-early-access": "Founding Early Access",
  "founding-page": "Founding Page Waitlist",
  "privates-waitlist": "Privates Booking Waitlist",
  "founding-sms-waitlist": "Founding Early Access (legacy tag)",
};

function escape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildEmail(p: NotifyPayload): { subject: string; html: string; text: string } {
  const sourceLabel = SOURCE_LABELS[p.source || ""] || p.source || "Form Submission";
  const fullName = [p.firstName, p.lastName].filter(Boolean).join(" ").trim() || "(no name)";
  const subject = `${sourceLabel} — ${fullName}`;

  const rows: Array<[string, string | undefined]> = [
    ["Source", sourceLabel],
    ["Name", fullName],
    ["Email", p.email],
    ["Phone", p.phone],
  ];
  if (p.extras) {
    for (const [k, v] of Object.entries(p.extras)) {
      if (v === undefined || v === null || v === "") continue;
      rows.push([k, String(v)]);
    }
  }

  const htmlRows = rows
    .filter(([, v]) => v && v.length > 0)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#9b9590;font-size:13px;white-space:nowrap;vertical-align:top;">${escape(
          k
        )}</td><td style="padding:4px 0;color:#3f3936;font-size:14px;">${escape(v!)}</td></tr>`
    )
    .join("\n");

  const messageBlock = p.message
    ? `<div style="margin-top:18px;padding-top:14px;border-top:1px solid #eee;color:#3f3936;font-size:14px;white-space:pre-wrap;">${escape(p.message)}</div>`
    : "";

  const html = `<!doctype html><html><body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#FDFCFA;padding:24px;">
    <div style="max-width:520px;margin:0 auto;background:white;border:1px solid #eee;border-radius:4px;padding:24px;">
      <p style="margin:0 0 18px;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#b02d4a;">Boomerang Pilates</p>
      <h2 style="margin:0 0 16px;font-family:Georgia,serif;font-weight:300;color:#3f3936;font-size:22px;">${escape(subject)}</h2>
      <table style="border-collapse:collapse;width:100%;">${htmlRows}</table>
      ${messageBlock}
    </div>
  </body></html>`;

  const textRows = rows
    .filter(([, v]) => v && v.length > 0)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
  const text = `${subject}\n\n${textRows}${p.message ? `\n\n${p.message}` : ""}`;

  return { subject, html, text };
}

export async function POST(request: NextRequest) {
  let body: NotifyPayload;
  try {
    body = (await request.json()) as NotifyPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "bad-json" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Soft-fail: form's primary path is Momence; don't break the user
    // flow because the env var hasn't been set yet.
    console.warn("[notify] RESEND_API_KEY not set — skipping email");
    return NextResponse.json({ ok: true, sent: false, reason: "no-api-key" });
  }

  const to = process.env.NOTIFY_TO || "emilie@boomerangnc.com";
  const from = process.env.NOTIFY_FROM || "Boomerang Pilates <onboarding@resend.dev>";

  const { subject, html, text } = buildEmail(body);

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ from, to, subject, html, text, reply_to: body.email }),
    });
    if (!res.ok) {
      const errText = await res.text();
      console.warn(`[notify] Resend ${res.status}: ${errText}`);
      return NextResponse.json({ ok: true, sent: false, reason: "resend-error" });
    }
    return NextResponse.json({ ok: true, sent: true });
  } catch (err) {
    console.warn("[notify] fetch failed:", err);
    return NextResponse.json({ ok: true, sent: false, reason: "fetch-failed" });
  }
}
