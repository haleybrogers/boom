// Feature flags — toggle UI surfaces without ripping out code.
//
// SHOW_FOUNDING: gates everything related to founding-member pricing —
// the /classes pricing section, the home-page tease + popup, the footer
// CTA, the sticky-CTA copy. Flip to true when founding pricing resumes;
// the underlying components (FoundingPricingOverlay, FoundingPopup,
// FoundingCountdown, etc.) are intact and ready.
export const SHOW_FOUNDING = false;
