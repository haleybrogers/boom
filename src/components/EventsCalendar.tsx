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
import type { EventItem } from "@/lib/eventTypes";

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
      .map((e) => ({
        id: `momence-${e.id}`,
        title: e.title.trim(),
        dateTime: e.dateTime,
        durationMin: e.duration,
        category: "around-town" as const,
        description: e.description?.trim() || "",
        location: e.location?.trim() || "Durham, NC",
        price: e.fixedPrice && e.fixedPrice > 0 ? `$${e.fixedPrice}` : "Free",
        action: { type: "external" as const, href: e.link, label: "Reserve a Spot" },
      }));
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
