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

// "book" = standard Momence-hosted booking (default). "rsvp" = inline
// ContactForm RSVP flow — used for the Opening Party, which has no
// Momence checkout but does collect names + guest counts via Momence
// lead form 204606.
export type ScheduleAction =
  | { type: "book"; bookUrl: string }
  | { type: "rsvp"; sourceId: number; rsvpHeading?: string; rsvpSubhead?: string };

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
};

import { staticEvents } from "./staticEvents";

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
  // The 3-part Mat Series sessions live in Momence under their tagline
  // "No straps. No springs. No limits." instead of "Mat" — so catch on
  // the distinctive "no straps" / "no springs" substring.
  "no straps",
  "no springs",
];

export function classifyClass(title: string): ClassType {
  const t = title.toLowerCase();
  if (APPARATUS_KEYWORDS.some((k) => t.includes(k))) return "apparatus";
  if (MAT_KEYWORDS.some((k) => t.includes(k))) return "mat";
  return "special";
}

// Short location label for the schedule cards. Studio classes collapse
// to "Studio" (the full address would dominate the card); pop-ups show
// just the venue name (first comma-segment). Modal still renders the
// full address.
const STUDIO_LOCATION_KEYWORDS = ["345 w main", "boomerang pilates"];

export function displayLocation(location: string): string {
  if (!location) return "";
  const lower = location.toLowerCase();
  if (STUDIO_LOCATION_KEYWORDS.some((k) => lower.includes(k))) {
    return "Studio";
  }
  return location.split(",")[0].trim();
}

// Custom non-Momence entries to fold into the schedule. Right now this
// is just the Opening Party (RSVP, not a Momence booking). Anything
// else with the same dual-source pattern would slot in here.
function staticScheduleExtras(now: number): ScheduleClass[] {
  const extras: ScheduleClass[] = [];

  // Opening Party — pulled from staticEvents so a copy/date change
  // there flows here too.
  const party = staticEvents.find((e) => e.id === "opening-party");
  if (party) {
    const start = new Date(party.dateTime);
    const end = new Date(start.getTime() + (party.durationMin || 180) * 60_000);
    if (start.getTime() > now) {
      extras.push({
        id: "opening-party",
        title: party.title,
        startISO: start.toISOString(),
        endISO: end.toISOString(),
        durationMin: party.durationMin || 180,
        type: "special",
        action: {
          type: "rsvp",
          sourceId: 204606, // Momence lead form id, matches /events RSVP
          rsvpHeading: "See you July 18.",
          rsvpSubhead:
            "Drop your info so we know to expect you. We'll send a reminder + the address as the party gets closer.",
        },
        description: party.description,
        price: party.price,
        location: party.location,
        heroNote: party.heroNote,
      });
    }
  }
  return extras;
}

export async function fetchSchedule(): Promise<ScheduleClass[]> {
  const now = Date.now();
  try {
    const res = await fetch(
      `https://api.withribbon.com/api/v1/Events?hostId=${HOST_ID}&token=${TOKEN}`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return staticScheduleExtras(now);
    const data = (await res.json()) as unknown;
    if (!Array.isArray(data)) return staticScheduleExtras(now);

    const momence = (data as MomenceEvent[])
      .filter((e) => !e.isCancelled && !e.isDeleted && e.published)
      // "semester" is Momence's type for course/bundle parents — they
      // have midnight placeholder times and aren't real sessions to
      // render on the grid.
      .filter((e) => e.type !== "semester")
      // Future only — past sessions clog the grid and aren't bookable.
      .filter((e) => new Date(e.dateTime).getTime() > now)
      .map((e): ScheduleClass => {
        const start = new Date(e.dateTime);
        const end = new Date(start.getTime() + (e.duration || 50) * 60_000);
        return {
          id: `momence-${e.id}`,
          title: e.title.trim(),
          startISO: start.toISOString(),
          endISO: end.toISOString(),
          durationMin: e.duration || 50,
          type: classifyClass(e.title),
          action: { type: "book", bookUrl: e.link },
          description: e.description?.trim() || "",
          price:
            e.fixedPrice && e.fixedPrice > 0 ? `$${e.fixedPrice}` : "Free",
          location: e.location?.trim() || "345 W Main St, Durham, NC",
        };
      });

    return [...momence, ...staticScheduleExtras(now)].sort(
      (a, b) =>
        new Date(a.startISO).getTime() - new Date(b.startISO).getTime()
    );
  } catch {
    return staticScheduleExtras(now);
  }
}
