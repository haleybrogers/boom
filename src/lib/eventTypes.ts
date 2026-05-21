// Shared types + labels for the unified events calendar on /events.
// Events come from two sources — Momence (dynamic, around-town pop-ups)
// and staticEvents.ts (curated, the big in-house events) — and get
// merged into one chronological list with these category tags.

export type EventCategory = "soft-opening" | "around-town";

export const CATEGORY_LABELS: Record<EventCategory, string> = {
  "soft-opening": "Soft Opening",
  "around-town": "Around Town",
};

// Action area in the detail modal. Three shapes:
//  - rsvp-party  → inline ContactForm submits to Momence lead 204606
//  - external    → "Book →" link, opens Momence event/host page
//  - info-only   → italic note ("booking opens soon"), no CTA
export type EventAction =
  | { type: "rsvp-party" }
  | { type: "external"; href: string; label?: string }
  | { type: "info-only"; note: string };

// Optional kv pairs shown in the modal as little detail tiles
// (used for the big featured events like Opening Party, Craft Night).
export type EventDetail = { label: string; value: string };

export type EventItem = {
  id: string;            // unique — used as React key + modal id
  title: string;
  dateTime: string;      // ISO 8601 (with timezone offset)
  durationMin?: number;  // for time-range display
  category: EventCategory;
  description: string;   // full body shown inside the modal
  shortDescription?: string; // optional one-liner used on the card
  location: string;
  price: string;         // "Free", "$40", "Suggested $20"
  action: EventAction;
  featured?: boolean;    // bumps it into the top featured row
  heroNote?: string;     // italic tagline shown on featured cards + modal
  details?: EventDetail[]; // detail tiles in the modal
  partLabel?: string;    // "Part 1 of 3" — shown on cards + modal for series classes
  image?: string;        // /public path — shown as hero strip in modal (and card if featured)
  iconKey?: "boomerang" | "coffee"; // featured cards can show a decorative icon instead of a photo
  residentsOnly?: {      // For pop-ups at private apartment complexes
    building: string;    // Display name, e.g. "Cortland Bull City"
  };
};
