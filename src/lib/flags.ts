// Feature flags — toggle UI surfaces without ripping out code.
//
// SHOW_FOUNDING: gates everything related to founding-member pricing —
// the home-page tease, the footer CTA, the sticky-CTA copy, the
// Founding Member section + countdown on /packs, and access to the
// /founding page itself (which 404s after the deadline).
//
// Auto-flips to false at end-of-day July 13, 2026 (FOUNDING_DEADLINE).
// Server pages with revalidate will pick up the flip within their
// revalidate window; client components recompute on each page load.

export const FOUNDING_DEADLINE = new Date("2026-07-14T00:00:00-04:00");

export function isFoundingActive(): boolean {
  return Date.now() < FOUNDING_DEADLINE.getTime();
}

// Backward-compatible export. Evaluates at module load:
//   - server: each render cycle / revalidate
//   - client: each page load (when the JS bundle hydrates)
export const SHOW_FOUNDING = isFoundingActive();

// FOUNDING_LAUNCH: when founding memberships actually become PURCHASABLE.
// Before this moment, the pricing cards on /founding render disabled and
// show a countdown + an SMS opt-in so people can be texted when it goes
// live. After this moment, the pricing cards link to Momence checkout
// like normal.
//
// Wednesday May 27, 2026 at 9 AM ET — set per Haley on 2026-05-21.
export const FOUNDING_LAUNCH = new Date("2026-05-27T09:00:00-04:00");

// ⚡️ founding-live BRANCH OVERRIDE ⚡️
// This branch represents the POST-LAUNCH state: founding memberships
// are purchasable, the countdown + "get early access" signup are gone,
// and the pricing tier cards link straight to Momence checkout.
// Hardcoded to true here so we don't have to wait for the launch date.
// To go live for real: merge this branch into main (or just copy this
// one-line change). To revert to the countdown state: delete this
// branch / don't merge.
export function isFoundingLaunched(): boolean {
  return true;
}

// PRIVATES_BOOKABLE: gates direct-link bookings for privates, duets,
// and trios. While false, every "Book a Session" / "Book a Private" CTA
// renders as a disabled "Booking opens soon" state. Flip to true once
// Emilie has appointment-reservation set up cleanly in Momence — every
// CTA goes live in the same beat.
export const PRIVATES_BOOKABLE = false;
