// Feature flags — toggle UI surfaces without ripping out code.
//
// SHOW_FOUNDING: gates everything related to founding-member pricing —
// the home-page tease + popup, the footer CTA, the sticky-CTA copy.
// Founding pricing itself now lives on /packs (always visible), so the
// flag only controls the "limited time" surfaces (countdown, popup,
// teaser). Flip to false after July 13, 2026 (when the offer expires).
export const SHOW_FOUNDING = true;
