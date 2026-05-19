// Server component — live event cards from the Momence /Events endpoint.
// Same pattern as MomencePacks: fetch on the server so the token stays out
// of the browser, 5-min revalidate.
//
// Each card links to the event's individual Momence page (the API returns
// `link` = `https://momence.com/s/{id}` which resolves to the slug-based
// reservation page like `momence.com/Boomerang-Pilates/{Event-Name}/{id}`).

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
  teacher: string | null;
};

const HOST_ID = process.env.MOMENCE_HOST_ID || "270195";
const TOKEN = process.env.MOMENCE_API_TOKEN || "da1030e20e";
const TZ = "America/New_York";

async function fetchEvents(): Promise<MomenceEvent[]> {
  try {
    const res = await fetch(
      `https://api.withribbon.com/api/v1/Events?hostId=${HOST_ID}&token=${TOKEN}`,
      { next: { revalidate: 300 } }
    );
    if (!res.ok) return [];
    const data = (await res.json()) as unknown;
    if (!Array.isArray(data)) return [];
    return (data as MomenceEvent[])
      .filter((e) => !e.isCancelled && !e.isDeleted && e.published)
      .filter((e) => new Date(e.dateTime).getTime() > Date.now())
      .sort(
        (a, b) =>
          new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
      );
  } catch {
    return [];
  }
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: TZ,
  });
}

function formatTimeRange(iso: string, durationMin: number): string {
  const start = new Date(iso);
  const end = new Date(start.getTime() + durationMin * 60_000);
  const opts: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: TZ,
  };
  const s = start.toLocaleTimeString("en-US", opts);
  const e = end.toLocaleTimeString("en-US", opts);
  return `${s} – ${e}`;
}

function priceLabel(p: number | null): string {
  if (p === null || p === 0) return "Free";
  return `$${p}`;
}

const FALLBACK_URL = `https://momence.com/host/${HOST_ID}`;

export default async function MomenceEvents() {
  const events = await fetchEvents();

  if (events.length === 0) {
    return (
      <div className="text-center">
        <p className="text-sm text-muted mb-5">
          New pop-ups drop regularly — check back soon.
        </p>
        <a
          href={FALLBACK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-animated inline-block bg-accent text-white text-xs tracking-widest uppercase px-8 py-3.5 hover:bg-accent/90 transition-colors"
        >
          See What&apos;s Coming Up
        </a>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
      {events.map((event) => (
        <a
          key={event.id}
          href={event.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col bg-white border border-accent/20 rounded-sm p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-accent/40"
        >
          <p className="text-[10px] tracking-[0.25em] uppercase text-accent mb-3">
            {formatDate(event.dateTime)}
          </p>
          <h3 className="font-serif text-base font-light text-charcoal leading-snug mb-1">
            {event.title.trim()}
          </h3>
          <p className="text-xs text-muted mb-3">
            {formatTimeRange(event.dateTime, event.duration)}
          </p>
          {event.location && (
            <p className="text-sm text-charcoal/70 leading-snug mb-3 flex-1">
              {event.location}
            </p>
          )}
          <div className="flex items-center justify-between border-t border-charcoal/5 pt-3 mt-auto">
            <span className="text-sm font-medium text-charcoal">
              {priceLabel(event.fixedPrice)}
            </span>
            <span className="text-[10px] tracking-widest uppercase text-accent group-hover:text-accent/80 transition-colors">
              RSVP →
            </span>
          </div>
        </a>
      ))}
    </div>
  );
}
