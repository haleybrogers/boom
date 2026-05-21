// Server component — fetches Momence events, merges them with the
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

// Residents-only apartment buildings. If a pop-up's location contains one
// of these keywords, we surface a "Residents Only" badge + disclaimer so
// non-residents don't show up and find a locked gate. Add new buildings
// here as they come online.
const RESIDENTS_ONLY_BUILDINGS: Array<{ keyword: string; building: string }> = [
  { keyword: "cortland", building: "Cortland Bull City" },
  { keyword: "atlas", building: "Atlas Durham" },
];

function detectResidentsOnly(location: string): { building: string } | undefined {
  const lower = location.toLowerCase();
  const match = RESIDENTS_ONLY_BUILDINGS.find((b) => lower.includes(b.keyword));
  return match ? { building: match.building } : undefined;
}

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

  // De-dupe: if a Momence event has the same title as a static event,
  // prefer the Momence one (real buy link) and drop the static stub.
  const momenceTitles = new Set(
    momenceEvents.map((e) => e.title.toLowerCase())
  );
  const filteredStatic = staticEvents.filter(
    (e) => !momenceTitles.has(e.title.toLowerCase())
  );

  // Date.now() in a server component is fine — runs at request/revalidate
  // time, not during render of a long-lived component. Lint rule doesn't
  // know the difference.
  // eslint-disable-next-line react-hooks/purity
  const now = Date.now();
  const allEvents = [...momenceEvents, ...filteredStatic]
    .filter((e) => new Date(e.dateTime).getTime() > now)
    .sort(
      (a, b) =>
        new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
    );

  return <EventsCalendarClient events={allEvents} />;
}
