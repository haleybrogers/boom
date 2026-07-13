import type { EventItem } from "./eventTypes";

// Static events that don't (yet) live in Momence. These are the curated
// big-deal events Emilie cares about — once she publishes them in
// Momence too, the calendar de-dupes by title (keeping the Momence one
// since it has a real buy link). We can also remove entries here as they
// land in Momence.
//
// All times are America/New_York (EDT in summer = UTC-4).

// Bundle link for the 3-Part Mat Series. Used by MatSeriesCard for the
// "Book all three" CTA. Each individual class also has its own Momence
// link on its EventItem.action above. Verified against the Momence API
// (id 136914732, type: "semester") on 2026-05-21.
export const MAT_SERIES_BUNDLE_URL = "https://momence.com/l/oAh1qEjr";

export const staticEvents: EventItem[] = [
  {
    id: "opening-party",
    title: "Opening Party",
    dateTime: "2026-07-18T17:00:00-04:00",
    durationMin: 180,
    category: "soft-opening",
    description:
      "We're throwing a party. Studio tours, equipment demos, and a chance to meet the Boomerang community before the schedule fills up. $10 cover — free for founding members. Limited tote bags printed on site by Inkfinity Printing — first come, first served. Plus a raffle with items from local vendors — one raffle entry included with every ticket.",
    shortDescription: "Studio tours, demos, and the first time you meet the room.",
    location: "343 W Main St, Unit 2 (upstairs), Durham, NC",
    price: "$10 cover · Free for founding members",
    action: {
      type: "external",
      href: "https://momence.com/l/dahvGexy",
      label: "RSVP →",
    },
    featured: true,
    heroNote: "You're invited.",
    image: "/photo-opening-party.jpg",
    details: [
      { label: "What to wear", value: "Cocktail / party" },
      { label: "Food & drink", value: "Light bites and spritzes" },
      { label: "How long", value: "3 hours · studio tours, demos, meet the team. Limited tote bags printed on site by Inkfinity Printing — first come, first served." },
    ],
  },
  {
    id: "mat-matcha",
    title: "Mat and Matcha + Apparatus Demos",
    dateTime: "2026-07-12T10:30:00-04:00",
    durationMin: 90,
    category: "soft-opening",
    description:
      "Come for the Mat Class! Stay for matcha and a studio tour. Sign up for one of 10 spots to try out the new Gratz apparatus the day before we officially open.",
    shortDescription: "Mat class, matcha, and a peek at the Gratz apparatus.",
    location: "343 W Main St, Durham, NC",
    price: "$20",
    // Intentionally no image or iconKey — Haley wanted the card to
    // read as a pure copy block (date / title / description / CTA)
    // without a photo or decorative glyph.
    action: {
      type: "external",
      href: "https://momence.com/Boomerang-Pilates/Mat-and-Matcha-%2B-Apparatus-Demos/136916030",
    },
  },
  // (When more soft-opening events come, add them above.)
];
