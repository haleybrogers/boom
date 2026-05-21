// Shared location helpers used by /events and /schedule.
//
// Three concerns:
//   1. Detect whether a location string is the studio (so cards collapse
//      the address to just "Studio" instead of dominating with the full
//      "345 W Main St, Durham, NC").
//   2. Detect residents-only pop-up locations (apartment buildings that
//      gate entry). Critical — if we surface a class at one of these
//      without a badge, non-residents will show up to a locked gate.
//   3. Render a short display-friendly label for the card UI.
//
// Add new residents-only buildings here as they come online.

const STUDIO_LOCATION_KEYWORDS = ["345 w main", "boomerang pilates"];

const RESIDENTS_ONLY_BUILDINGS: Array<{ keyword: string; building: string }> = [
  { keyword: "cortland", building: "Cortland Bull City" },
  { keyword: "atlas", building: "Atlas Durham" },
];

export function isStudioLocation(location: string): boolean {
  if (!location) return false;
  const lower = location.toLowerCase();
  return STUDIO_LOCATION_KEYWORDS.some((k) => lower.includes(k));
}

export function detectResidentsOnly(
  location: string
): { building: string } | undefined {
  if (!location) return undefined;
  const lower = location.toLowerCase();
  const match = RESIDENTS_ONLY_BUILDINGS.find((b) => lower.includes(b.keyword));
  return match ? { building: match.building } : undefined;
}

// Short location label for schedule + event cards. Studio classes
// collapse to "Studio"; pop-ups show just the venue name (first
// comma-segment). The full address still renders in the detail modal.
export function displayLocation(location: string): string {
  if (!location) return "";
  if (isStudioLocation(location)) return "Studio";
  return location.split(",")[0].trim();
}
