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
  // Warm dusty rose. Most common class type, gets the friendliest tone.
  mat: {
    label: "Mat",
    bgSoft: "#f6e3df",
    border: "#c47a6e",
    text: "#8a3a30",
    bgChip: "rgba(196, 122, 110, 0.18)",
  },
  // Dusty teal-slate. Cooler tone keeps apparatus visually separated.
  apparatus: {
    label: "Apparatus",
    bgSoft: "#dfe7e6",
    border: "#5e7c7a",
    text: "#2e4644",
    bgChip: "rgba(94, 124, 122, 0.18)",
  },
  // Brand accent red. Reserved for special / workshops / pop-ups so they
  // pop visually on the grid the way they should.
  special: {
    label: "Special",
    bgSoft: "#fbe7ec",
    border: "#b02d4a",
    text: "#8e1f37",
    bgChip: "rgba(176, 45, 74, 0.18)",
  },
};
