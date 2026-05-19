import type { EventItem } from "./eventTypes";

// Static events that don't (yet) live in Momence. These are the curated
// big-deal events Emilie cares about — once she publishes them in
// Momence too, the calendar de-dupes by title (keeping the Momence one
// since it has a real buy link). We can also remove entries here as they
// land in Momence.
//
// All times are America/New_York (EDT in summer = UTC-4).

export const staticEvents: EventItem[] = [
  {
    id: "opening-party",
    title: "Opening Party",
    dateTime: "2026-07-18T17:00:00-04:00",
    durationMin: 180,
    category: "soft-opening",
    description:
      "Five nights after we open, we're throwing a party. Studio tours, equipment demos, and a chance to meet the Boomerang community before the schedule fills up. Limited tote bags printed on site by Inkfinity Printing — first come, first served.",
    shortDescription: "Five nights after we open, we're throwing a party.",
    location: "345 W Main St, Unit 2 (upstairs), Durham, NC",
    price: "Free",
    action: { type: "rsvp-party" },
    featured: true,
    heroNote: "You're invited.",
    details: [
      { label: "What to wear", value: "Cocktail / party" },
      { label: "Food & drink", value: "Light bites and spritzes" },
      { label: "How long", value: "3 hours · studio tours, demos, meet the team. Limited tote bags printed on site by Inkfinity Printing — first come, first served." },
    ],
  },
  {
    id: "craft-night",
    title: "Boomerang Craft Night",
    dateTime: "2026-06-24T17:30:00-04:00",
    durationMin: 120,
    category: "soft-opening",
    description:
      "Like wine & design, but make it Pilates. We'll kick off with a 30-minute mat class — then settle in to paint your own hand-shaped Baltic birch boomerang, primed and ready by NC artist Kirk Fry. Paint, brushes, light refreshments, and the boomerang itself — all included.",
    shortDescription: "Wine & design, but make it Pilates.",
    location: "345 W Main St, Durham, NC",
    price: "$40",
    action: {
      type: "info-only",
      note: "Booking opens in Momence soon — we'll send a heads-up to anyone on the waitlist.",
    },
    featured: true,
    heroNote: "Workshop · Pop-up event.",
    details: [
      { label: "The mat", value: "30-minute open-level class to start" },
      { label: "The craft", value: "Hand-shaped, gesso-primed Baltic birch boomerang to paint & take home" },
      { label: "What to bring", value: "Yourself, a mat if you have one, maybe a friend. Paint & refreshments on us." },
    ],
  },
  {
    id: "mat-series-classic",
    title: "Classic Mat",
    dateTime: "2026-06-13T10:30:00-04:00",
    durationMin: 50,
    category: "soft-opening",
    description:
      "The original 34-exercise mat sequence — breath, center, and flow, exactly as written. First class in the 3-Part Mat Series: no straps, no springs, no limits.",
    shortDescription: "3-Part Mat Series · No straps. No springs. No limits.",
    location: "345 W Main St, Durham, NC",
    price: "Suggested $20",
    action: {
      type: "info-only",
      note: "Suggested $20 per class or $55 for all three. Booking opens in Momence soon.",
    },
  },
  {
    id: "mat-series-magic",
    title: "Magic Mat",
    dateTime: "2026-06-20T10:30:00-04:00",
    durationMin: 50,
    category: "soft-opening",
    description:
      "Classical mat with the Magic Circle — a small ring that turns every cue into a felt sensation. Second class in the 3-Part Mat Series.",
    shortDescription: "3-Part Mat Series · The Magic Circle entry point.",
    location: "345 W Main St, Durham, NC",
    price: "Suggested $20",
    action: {
      type: "info-only",
      note: "Suggested $20 per class or $55 for all three. Booking opens in Momence soon.",
    },
  },
  {
    id: "mat-series-reformer",
    title: "Reformer on the Mat",
    dateTime: "2026-06-27T10:30:00-04:00",
    durationMin: 50,
    category: "soft-opening",
    description:
      "Reformer exercises adapted to the mat — a preview of the apparatus work, no equipment required. Final class in the 3-Part Mat Series.",
    shortDescription: "3-Part Mat Series · Reformer work, no equipment required.",
    location: "345 W Main St, Durham, NC",
    price: "Suggested $20",
    action: {
      type: "info-only",
      note: "Suggested $20 per class or $55 for all three. Booking opens in Momence soon.",
    },
  },
  {
    id: "mat-matcha",
    title: "Mat and Matcha + Apparatus Demos",
    dateTime: "2026-07-12T10:30:00-04:00",
    durationMin: 90,
    category: "soft-opening",
    description:
      "Come for the Mat Class! Stay for matcha and a studio tour. Sign up for one of 15 slots to try out the new Gratz apparatus the day before we officially open.",
    shortDescription: "Mat class, matcha, and a peek at the Gratz apparatus.",
    location: "345 W Main St, Durham, NC",
    price: "Free",
    action: {
      type: "info-only",
      note: "15 apparatus demo slots — booking opens in Momence soon.",
    },
  },
];
