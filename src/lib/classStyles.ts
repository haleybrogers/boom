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
  // Warm terracotta / clay. Distinctly orange-leaning so it doesn't read
  // pink alongside Special.
  mat: {
    label: "Mat",
    bgSoft: "#f5ddc5",
    border: "#b86a3a",
    text: "#7a3d1d",
    bgChip: "rgba(184, 106, 58, 0.2)",
  },
  // Sage green. Picked so it can't be mistaken for either the warm Mat
  // tone or the accent-red Special tone — clearly its own category.
  apparatus: {
    label: "Apparatus",
    bgSoft: "#dbe5cf",
    border: "#5e7a3e",
    text: "#324523",
    bgChip: "rgba(94, 122, 62, 0.2)",
  },
  // Brand accent red. Reserved for special / workshops / pop-ups so they
  // pop visually on the grid the way they should. Pushed the tint a
  // touch warmer + the border to full accent for stronger separation.
  special: {
    label: "Special",
    bgSoft: "#f8d5da",
    border: "#b02d4a",
    text: "#7a1d34",
    bgChip: "rgba(176, 45, 74, 0.2)",
  },
};
