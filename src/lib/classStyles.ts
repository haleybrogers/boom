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
  // Brand accent red. Mat is the most common class type — gets the
  // brand color so it's the visual default of the calendar.
  mat: {
    label: "Mat",
    bgSoft: "#f8d5da",
    border: "#b02d4a",
    text: "#7a1d34",
    bgChip: "rgba(176, 45, 74, 0.2)",
  },
  // Sage green. Clearly cool/earthy so it can't be mistaken for Mat's
  // red or Special's gold — three categories, three distinct hues.
  apparatus: {
    label: "Apparatus",
    bgSoft: "#dbe5cf",
    border: "#5e7a3e",
    text: "#324523",
    bgChip: "rgba(94, 122, 62, 0.2)",
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
