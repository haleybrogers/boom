// Shared Momence helpers — used by /founding and /packs to deep-link cards
// straight to specific Momence purchase URLs. Fetches the live published
// memberships/packs at request time (60s revalidate) and provides a forgiving
// keyword-based matcher so a tier card can find its Momence pack by name.

export const MOMENCE_HOST_ID = process.env.MOMENCE_HOST_ID || "270195";
export const MOMENCE_API_TOKEN = process.env.MOMENCE_API_TOKEN || "da1030e20e";

// Catch-all buy page — used as a fallback when a specific pack can't be matched.
export const MOMENCE_FALLBACK_URL = `https://momence.com/host/${MOMENCE_HOST_ID}/memberships`;

// Appointments URL — used by /privates for booking single sessions. The
// per-host appointments URL 302-redirects to the slug-based reservation page,
// so we don't have to hard-code the slug.
export const MOMENCE_APPOINTMENTS_URL = `https://momence.com/appointments/${MOMENCE_HOST_ID}`;

export type Membership = {
  id: number;
  name: string;
  description?: string | null;
  type?: string;
  link: string;
  price?: number;
  isDisabled: boolean;
  isDeleted: boolean;
};

export async function fetchMemberships(): Promise<Membership[]> {
  try {
    const res = await fetch(
      `https://api.withribbon.com/api/v1/Memberships?hostId=${MOMENCE_HOST_ID}&token=${MOMENCE_API_TOKEN}`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return [];
    const data = (await res.json()) as unknown;
    if (!Array.isArray(data)) return [];
    return (data as Membership[]).filter((m) => !m.isDeleted && !m.isDisabled);
  } catch {
    return [];
  }
}

// Find a Momence membership/pack by keyword. `keywords` must all appear in the
// name (case-insensitive); `excludes` keeps "4× Month Mat" from accidentally
// matching "Unlimited Mat" (which also contains "mat").
export function matchMembership(
  memberships: Membership[],
  keywords: string[],
  excludes: string[] = []
): Membership | undefined {
  return memberships.find((m) => {
    const n = m.name.toLowerCase();
    return (
      keywords.every((k) => n.includes(k.toLowerCase())) &&
      excludes.every((x) => !n.includes(x.toLowerCase()))
    );
  });
}
