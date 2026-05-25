// Shared color tokens for the three class-type buckets surfaced on the
// custom /schedule view. One source of truth so the week grid, day list,
// and detail modal all stay in sync.
//
// Picked to feel cohesive with the existing brand palette (warm-white
// page, charcoal text, accent red CTAs). Each token uses a soft tinted
// background + a stronger border + a still-readable text color so the
// block reads as a category at a glance without screaming.

import type { ClassType } from "./scheduleData";

export type ClassStyle = {
  label: string;   // human-readable category name
  bgSoft: string;  // block background tint (cards on cream grid)
  border: string;  // left border + outline color
  text: string;    // category label color (used on chips)
  bgChip: string;  // small "type" chip background used inside the block
};

export const CLASS_TYPE_STYLES: Record<ClassType, ClassStyle> = {
  // Muted dusty rose. Mat is the most-common class type, so it fills
  // most of the calendar. Brand accent red (#b02d4a) was too aggressive
  // when repeated across that many cards — dialed back to a softer
  // rose that still reads as the "default" type but doesn't shout.
  mat: {
    label: "Mat",
    bgSoft: "#f4e1e4",
    border: "#b3727c",
    text: "#7a3a44",
    bgChip: "rgba(179, 114, 124, 0.18)",
  },
  // Warm greige (gray-beige). Neutral counterpoint to Mat's rose and
  // Special's gold — three categories, three distinct hues. Earlier
  // iterations were sage green (read as Christmas next to the rose)
  // and slate blue (too "blue"). Greige sits quietly off-cream — clearly
  // its own bucket without competing for attention.
  apparatus: {
    label: "Apparatus",
    bgSoft: "#dfdbd2",
    border: "#7d786e",
    text: "#3f3b34",
    bgChip: "rgba(125, 120, 110, 0.2)",
  },
  // Warm gold / ochre. Reserved for events, workshops, pop-ups. Feels
  // celebratory (works for the Opening Party especially) without
  // competing with the brand red. Cream-friendly warm tone.
  special: {
    label: "Special",
    bgSoft: "#f3e5b8",
    border: "#b8943a",
    text: "#6e5418",
    bgChip: "rgba(184, 148, 58, 0.2)",
  },
};
