// Server-side fetch + classification for the custom schedule view at
// /schedule. Replaces the embedded Momence host-schedule widget.
//
// Source: the same /api/v1/Events endpoint we already use for /events.
// Momence returns every scheduled session here (Regular, Workshop,
// semester) — we filter to bookable ones, classify by title into
// mat / apparatus / special, and hand the result to the client view.
//
// "Type" classification is keyword-based against the class title.
// Momence doesn't expose a clean category field via this endpoint, so
// we infer. The classifier is conservative — anything we can't confidently
// place lands in "special" so it still renders, just with the highlight
// color instead of being miscategorized.

export type ClassType = "mat" | "apparatus" | "special";

// "book" = standard Momence-hosted booking (default).
export type ScheduleAction = { type: "book"; bookUrl: string };

export type ScheduleClass = {
  id: string;              // string so we can mix Momence (numeric) + static (slug) ids
  title: string;
  startISO: string;        // "2026-06-13T14:30:00.000Z"
  endISO: string;          // computed from duration
  durationMin: number;
  type: ClassType;
  action: ScheduleAction;
  // Free-text description Momence carries on the event. Surfaced in the
  // detail modal alongside the action.
  description: string;
  // "Free", "$25", etc. — empty string means no price posted.
  price: string;
  location: string;
  // Optional italic tagline — used by the Opening Party for the
  // "You're invited." line. Renders below the title in the modal.
  heroNote?: string;
  // Residents-only pop-ups (apartment buildings, etc.). Surfaces a
  // "Residents Only" badge on the card and a centered disclaimer in
  // the modal so non-residents don't show up to a locked gate.
  residentsOnly?: { building: string };
  // Capacity state. When Momence reports the class as sold out, we swap
  // the "Book →" CTA for either "Class Full · Join Waitlist" (when
  // allowsWaitlist is true) or just "Sold Out" (when it isn't). The
  // booking link itself is unchanged — Momence handles the waitlist
  // signup on the same page.
  isFull?: boolean;
  allowsWaitlist?: boolean;
  // Instructor teaching the session, straight from Momence's `teacher`
  // field. Undefined for static entries that don't carry one.
  instructor?: string;
  // Session already happened. Kept in the list (not booked) — grid/list
  // cards render it greyed out and non-clickable instead of dropping it.
  isPast?: boolean;
};

const HOST_ID = process.env.MOMENCE_HOST_ID || "270195";
const TOKEN = process.env.MOMENCE_API_TOKEN || "da1030e20e";

type MomenceEvent = {
  id: number;
  title: string;
  description: string | null;
  type: string;
  link: string;
  dateTime: string;
  duration: number;
  fixedPrice: number | null;
  location: string | null;
  isCancelled: boolean;
  isDeleted: boolean;
  published: boolean;
  // Capacity-related fields surfaced by the Momence Events API.
  // capacity         null when uncapped, else the max attendance.
  // spotsRemaining   null when uncapped or when the API doesn't compute
  //                  it (some pop-ups), else the live remaining count.
  // ticketsSold      live count of confirmed signups.
  // allowWaitlist    studio setting — controls whether the page offers
  //                  a waitlist when full vs. just a sold-out screen.
  capacity?: number | null;
  spotsRemaining?: number | null;
  ticketsSold?: number | null;
  allowWaitlist?: boolean;
  // Instructor name as entered in Momence.
  teacher?: string | null;
};

// Decide whether a Momence event is "full" right now. Conservative: only
// say full when we have a hard signal (spotsRemaining === 0, or capacity
// is set and ticketsSold has reached it). If the API doesn't surface
// numbers (capacity = null / spotsRemaining = null), default to NOT full
// so we don't false-flag open pop-ups as sold out.
function isEventFull(e: MomenceEvent): boolean {
  if (typeof e.spotsRemaining === "number") return e.spotsRemaining <= 0;
  if (
    typeof e.capacity === "number" &&
    typeof e.ticketsSold === "number"
  ) {
    return e.ticketsSold >= e.capacity;
  }
  return false;
}

import { detectResidentsOnly } from "./locations";

// Re-export so existing imports of `displayLocation` from this module
// continue to resolve. New code should import directly from "./locations".
export { displayLocation } from "./locations";

// Title keywords → class type. First match wins, so order matters:
// apparatus-specific tokens before "mat" so "Mixed Apparatus" doesn't
// trip on a stray "mat" substring (none currently, but future-proofing).
const APPARATUS_KEYWORDS = [
  "reformer",
  "tower",
  "apparatus",
  "lengthen & strengthen",
  "lengthen and strengthen",
];
const MAT_KEYWORDS = [
  "mat",          // catches "Open Level Classical Mat", "Return to Life Mat", etc.
  "rtl",
  "return to life",
  "power hour",   // Lunch Power Hour is mat
];

// The 3-part Mat Series sessions live in Momence under their tagline
// "No straps. No springs. No limits." — it's a special limited series, so
// it renders gold/"special" (not a regular rose Mat class).
const SPECIAL_KEYWORDS = ["no straps", "no springs", "no limits"];

export function classifyClass(title: string): ClassType {
  const t = title.toLowerCase();
  if (SPECIAL_KEYWORDS.some((k) => t.includes(k))) return "special";
  if (APPARATUS_KEYWORDS.some((k) => t.includes(k))) return "apparatus";
  if (MAT_KEYWORDS.some((k) => t.includes(k))) return "mat";
  return "special";
}

// (Location helpers moved to ./locations.ts so /events and /schedule
// share the same studio + residents-only detection.)

// Work out the price string to show.
//
// The Momence Events API only carries `fixedPrice` (a single number), and
// for a lot of our classes that's null — including sliding-scale classes
// AND genuinely free pop-ups. So `fixedPrice` alone can't tell those
// apart, and defaulting null → "Free" mislabels paid sliding-scale
// classes. The real price for those lives only in the free-text
// description (e.g. "sliding scale price ($10-25)"), so we parse it from
// there as a fallback. When we can't determine a price with confidence we
// return "" so the modal simply hides the Price row (better than a wrong
// "Free").
function derivePrice(e: MomenceEvent): string {
  if (typeof e.fixedPrice === "number" && e.fixedPrice > 0) {
    return `$${e.fixedPrice}`;
  }
  const desc = e.description || "";

  // Price range, e.g. "$10-25" / "$10 – $25" / "$10 to 25" → sliding scale.
  const range = desc.match(/\$\s?(\d+)\s*(?:-|–|—|to)\s*\$?\s?(\d+)/i);
  if (range) {
    const label = `$${range[1]}-${range[2]}`;
    return /sliding scale/i.test(desc) ? `${label} sliding scale` : label;
  }

  // Explicitly free.
  if (/\bfree\b/i.test(desc)) return "Free";

  // Single dollar amount mentioned, e.g. "$25".
  const single = desc.match(/\$\s?(\d+)/);
  if (single) return `$${single[1]}`;

  // Nothing reliable — let the modal omit the Price row.
  return "";
}

export async function fetchSchedule(): Promise<ScheduleClass[]> {
  const now = Date.now();
  try {
    const res = await fetch(
      `https://api.withribbon.com/api/v1/Events?hostId=${HOST_ID}&token=${TOKEN}`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return [];
    const data = (await res.json()) as unknown;
    if (!Array.isArray(data)) return [];

    const momence = (data as MomenceEvent[])
      .filter((e) => !e.isCancelled && !e.isDeleted && e.published)
      // "semester" is Momence's type for course/bundle parents — they
      // have midnight placeholder times and aren't real sessions to
      // render on the grid.
      .filter((e) => e.type !== "semester")
      .map((e): ScheduleClass => {
        const start = new Date(e.dateTime);
        const end = new Date(start.getTime() + (e.duration || 50) * 60_000);
        const location = e.location?.trim() || "343 W Main St, Durham, NC";
        return {
          id: `momence-${e.id}`,
          title: e.title.trim(),
          startISO: start.toISOString(),
          endISO: end.toISOString(),
          durationMin: e.duration || 50,
          type: classifyClass(e.title),
          action: { type: "book", bookUrl: e.link },
          description: e.description?.trim() || "",
          price: derivePrice(e),
          location,
          residentsOnly: detectResidentsOnly(location),
          isFull: isEventFull(e),
          allowsWaitlist: e.allowWaitlist === true,
          instructor: e.teacher?.trim() || undefined,
          isPast: start.getTime() <= now,
        };
      });

    return momence.sort(
      (a, b) =>
        new Date(a.startISO).getTime() - new Date(b.startISO).getTime()
    );
  } catch {
    return [];
  }
}
