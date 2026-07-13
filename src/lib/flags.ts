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
// Founding memberships went LIVE Wednesday May 27, 2026. Haley gave the
// go-ahead the morning of launch day, so this was moved to start-of-day
// to flip it live immediately rather than waiting for the 9 AM mark.
export const FOUNDING_LAUNCH = new Date("2026-05-27T00:00:00-04:00");

export function isFoundingLaunched(): boolean {
  return Date.now() >= FOUNDING_LAUNCH.getTime();
}

// FOUNDING_SPOTS_LEFT: manually-maintained count of founding spots still
// available PER TIER (4x / 8x / unlimited). Drives the "X spots left"
// badge on each pricing card + the scarcity banner at the top of
// /founding.
//
// Why manual: Momence's public API doesn't expose membership sales, so
// there's no way to count these automatically. Update each number by hand
// as that tier sells (you can hold a tier at 1 for urgency near the end).
// A tier at 0 shows "Full" and its card stops linking to checkout.
//
// Keys must match the tier keys from pairMatTiers() in momence.ts.
export const FOUNDING_SPOTS_TOTAL = 15;
export const FOUNDING_SPOTS_LEFT: Record<string, number> = {
  "4x": 0, // sold out (15 of 15)
  "8x": 0, // sold out (15 of 15)
  unlimited: 10, // 5 of 15 sold
};

// PRIVATES_BOOKABLE: gates the direct request flow for privates,
// duets, and trios. When true, every "Request a Session" CTA links
// out to Momence's appointment-reservation board (request-only —
// Emilie confirms each request manually). When false, the same CTAs
// render as a disabled "Booking Opens Soon" state with a waitlist
// signup form on /privates as the fallback.
export const PRIVATES_BOOKABLE = true;

// OPENING_WEEK_PROMO: 10% off Private/Duet/Trio (group) apparatus 5- and
// 10-packs, code OPENINGWEEK. Gates the pricing display on /packs, the
// homepage offering-card note, and the homepage pop-up. Opening week runs
// Mon July 13 - Sun July 19, 2026; auto-flips off end of day Sunday.
export const OPENING_WEEK_PROMO_DEADLINE = new Date("2026-07-20T00:00:00-04:00");

export function isOpeningWeekPromoActive(): boolean {
  return Date.now() < OPENING_WEEK_PROMO_DEADLINE.getTime();
}
