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

export type ScheduleClass = {
  id: number;
  title: string;
  startISO: string;        // "2026-06-13T14:30:00.000Z"
  endISO: string;          // computed from duration
  durationMin: number;
  type: ClassType;
  // Direct link to that session's Momence booking page. Clicking through
  // pops the user out to Momence to log in / pay / hold a spot.
  bookUrl: string;
  // Free-text description Momence carries on the event. Surfaced in the
  // detail modal alongside the time + book button.
  description: string;
  // "Free", "$25", etc. — empty string means no price posted.
  price: string;
  location: string;
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

export function classifyClass(title: string): ClassType {
  const t = title.toLowerCase();
  if (APPARATUS_KEYWORDS.some((k) => t.includes(k))) return "apparatus";
  if (MAT_KEYWORDS.some((k) => t.includes(k))) return "mat";
  return "special";
}

export async function fetchSchedule(): Promise<ScheduleClass[]> {
  try {
    const res = await fetch(
      `https://api.withribbon.com/api/v1/Events?hostId=${HOST_ID}&token=${TOKEN}`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return [];
    const data = (await res.json()) as unknown;
    if (!Array.isArray(data)) return [];

    const now = Date.now();
    return (data as MomenceEvent[])
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
          id: e.id,
          title: e.title.trim(),
          startISO: start.toISOString(),
          endISO: end.toISOString(),
          durationMin: e.duration || 50,
          type: classifyClass(e.title),
          bookUrl: e.link,
          description: e.description?.trim() || "",
          price:
            e.fixedPrice && e.fixedPrice > 0 ? `$${e.fixedPrice}` : "Free",
          location: e.location?.trim() || "345 W Main St, Durham, NC",
        };
      })
      .sort(
        (a, b) =>
          new Date(a.startISO).getTime() - new Date(b.startISO).getTime()
      );
  } catch {
    return [];
  }
}
