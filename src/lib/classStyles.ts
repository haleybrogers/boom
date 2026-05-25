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
  // Dusty slate blue. Cool counterpoint to Mat's rose and Special's
  // gold — three categories, three distinct hues. Was sage green
  // originally; sat next to the rose Mat color and read as Christmas.
  // Slate keeps the cool-quiet feel without the seasonal baggage.
  apparatus: {
    label: "Apparatus",
    bgSoft: "#dde2ec",
    border: "#5e6f87",
    text: "#2e3a4f",
    bgChip: "rgba(94, 111, 135, 0.2)",
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
