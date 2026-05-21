// Server component. Fetches Momence events, merges them with the
// curated staticEvents list, sorts chronologically, dedupes by title,
// and hands the result to <EventsCalendarClient/> which renders the
// grid + modal.
//
// Same Momence endpoint as the old MomenceEvents component (which this
// replaces). 60s revalidate so new events Emilie publishes appear within
// a minute.

import EventsCalendarClient from "./EventsCalendarClient";
import { staticEvents } from "@/lib/staticEvents";
import type { EventItem, EventCategory } from "@/lib/eventTypes";
import { detectResidentsOnly } from "@/lib/locations";

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

// Studio address keywords. If a Momence event's location contains any of
// these, the event auto-categorizes as soft-opening (lives in the
// "Soft Opening" section). Otherwise it's a pop-up around town.
// Add more variants here if Emilie ever types the address differently.
const STUDIO_LOCATION_KEYWORDS = ["345 w main", "boomerang pilates"];

function categorizeByLocation(location: string): EventCategory {
  const lower = location.toLowerCase();
  return STUDIO_LOCATION_KEYWORDS.some((k) => lower.includes(k))
    ? "soft-opening"
    : "around-town";
}

// Residents-only detection lives in src/lib/locations.ts so /events and
// /schedule share the same keyword list and badge behavior.

// Mat Series sessions in Momence are all titled "No straps. No springs.
// No limits." (the series tagline). We render them via the staticEvents
// mat-series-* entries + the grouped MatSeriesCard, with their real
// Momence links wired in by hand — so we drop the Momence duplicates
// here entirely (would otherwise render as four extra plain EventCards).
const MAT_SERIES_TITLE_RE = /^no straps\.?\s+no springs\.?\s+no limits\.?$/i;

async function fetchMomenceEvents(): Promise<EventItem[]> {
  try {
    const res = await fetch(
      `https://api.withribbon.com/api/v1/Events?hostId=${HOST_ID}&token=${TOKEN}`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return [];
    const data = (await res.json()) as unknown;
    if (!Array.isArray(data)) return [];
    return (data as MomenceEvent[])
      .filter((e) => !e.isCancelled && !e.isDeleted && e.published)
      // "semester" is Momence's type for a course/bundle (the parent of
      // a multi-session series). It has a midnight placeholder dateTime
      // and isn't a bookable session itself — purchase happens via its
      // link on the relevant static entry / MatSeriesCard. Drop it from
      // the calendar feed.
      .filter((e) => e.type !== "semester")
      // Drop the Mat Series session dupes (see comment above the regex).
      .filter((e) => !MAT_SERIES_TITLE_RE.test(e.title.trim()))
      .map((e) => {
        const location = e.location?.trim() || "Durham, NC";
        return {
          id: `momence-${e.id}`,
          title: e.title.trim(),
          dateTime: e.dateTime,
          durationMin: e.duration,
          category: categorizeByLocation(location),
          description: e.description?.trim() || "",
          location,
          price: e.fixedPrice && e.fixedPrice > 0 ? `$${e.fixedPrice}` : "Free",
          action: { type: "external" as const, href: e.link, label: "Reserve a Spot" },
          residentsOnly: detectResidentsOnly(location),
        };
      });
  } catch {
    return [];
  }
}

export default async function EventsCalendar() {
  const momenceEvents = await fetchMomenceEvents();

  // De-dupe by title: PREFER STATIC over Momence when both exist.
  // Rationale: static entries carry the rich extras (iconKey for the
  // boomerang/coffee glyphs, hero image, partLabel, heroNote, details
  // tiles) and we now wire the real Momence buy link directly into the
  // static entry's action.external.href by hand. So static wins,
  // Momence duplicate is dropped. Previously this was inverted, which
  // is why Craft Night lost its boomerang icon the moment Emilie
  // published it in Momence.
  const staticTitles = new Set(
    staticEvents.map((e) => e.title.toLowerCase())
  );
  const filteredMomence = momenceEvents.filter(
    (e) => !staticTitles.has(e.title.toLowerCase())
  );

  // Date.now() in a server component is fine. Runs at request/revalidate
  // time, not during render of a long-lived component. Lint rule doesn't
  // know the difference.
  // eslint-disable-next-line react-hooks/purity
  const now = Date.now();
  const allEvents = [...filteredMomence, ...staticEvents]
    .filter((e) => new Date(e.dateTime).getTime() > now)
    .sort(
      (a, b) =>
        new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
    );

  return <EventsCalendarClient events={allEvents} />;
}
