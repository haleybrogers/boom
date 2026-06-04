// Momence integration — single source of truth for everything we pull from
// the Momence API. Pages render whatever is in Momence; nothing is hardcoded
// here (no prices, no IDs, no URLs). When Emilie adds/edits/removes things
// in Momence, the site reflects within ~60s.
//
// API base per the boilerplate Momence ships:
//   GET https://api.withribbon.com/api/v1/Memberships?hostId=...&token=...
// Returns memberships (`type: "subscription"`) + packs (`type: "package-events"`).

export const MOMENCE_HOST_ID = process.env.MOMENCE_HOST_ID || "270195";
export const MOMENCE_API_TOKEN = process.env.MOMENCE_API_TOKEN || "da1030e20e";

// Per-host appointment-reservation URL — direct slug form (vs the
// `/appointments/{id}` 302-redirect, which lands on a less-functional
// page). If the studio slug changes in Momence, update both halves below.
export const MOMENCE_APPOINTMENTS_URL = `https://momence.com/Boomerang-Pilates/appointment-reservation/${MOMENCE_HOST_ID}`;

// Direct Momence short link for the FREE apparatus demo session.
// Surfaced on the home page, /privates, and /packs as the low-friction
// first touchpoint for anyone curious about the apparatus.
export const MOMENCE_DEMO_URL = "https://momence.com/m/783283";

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

// ---------- Mat tier pairing (founding + regular) ----------

const FOUNDING_PREFIX = /^founding\s+membership\s*\|\s*/i;

export type MatTier = {
  key: string; // e.g. "4x", "8x", "unlimited"
  name: string; // human-readable name, sourced from the regular tier
  founding?: Membership;
  regular?: Membership;
};

/** Strip the "Founding Membership | " prefix to compare base tier names. */
function stripFoundingPrefix(name: string) {
  return name.replace(FOUNDING_PREFIX, "").trim();
}

/** Best-effort tier key from a name. Stable across founding/regular pairs. */
function tierKey(name: string): string {
  const base = stripFoundingPrefix(name).toLowerCase();
  if (base.includes("unlimited")) return "unlimited";
  const numMatch = base.match(/(\d+)\s*x/);
  if (numMatch) return `${numMatch[1]}x`;
  // Fallback: full normalized name so unknown tiers still group with themselves
  return base.replace(/\s+/g, "-");
}

/** Pull all subscription-type memberships and pair founding ↔ regular by tier key. */
export function pairMatTiers(memberships: Membership[]): MatTier[] {
  const subs = memberships.filter((m) => m.type === "subscription");
  const byKey = new Map<string, MatTier>();

  for (const m of subs) {
    const key = tierKey(m.name);
    const isFounding = FOUNDING_PREFIX.test(m.name);

    const existing = byKey.get(key) ?? {
      key,
      name: isFounding ? stripFoundingPrefix(m.name) : m.name,
    };

    if (isFounding) {
      existing.founding = m;
    } else {
      existing.regular = m;
      existing.name = m.name; // prefer the regular name as the display name
    }

    byKey.set(key, existing);
  }

  // Sort: known order (4x → 8x → unlimited) first, then anything else by name.
  const order = ["4x", "8x", "unlimited"];
  return Array.from(byKey.values()).sort((a, b) => {
    const ai = order.indexOf(a.key);
    const bi = order.indexOf(b.key);
    if (ai === -1 && bi === -1) return a.name.localeCompare(b.name);
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });
}

/** Friendly tagline for known tiers; empty string for unknown so the card
 *  just doesn't render a tagline. */
export function tierTagline(key: string): string {
  switch (key) {
    case "4x":
      return "Once a week-ish";
    case "8x":
      return "Twice a week-ish";
    case "unlimited":
      return "All the mat, all the time";
    default:
      return "";
  }
}

/** Cleaner display name for known tier keys; falls back to the Momence name. */
export function tierDisplayName(t: MatTier): string {
  switch (t.key) {
    case "4x":
      return "4× Month Mat";
    case "8x":
      return "8× Month Mat";
    case "unlimited":
      return "Unlimited Mat";
    default:
      return t.name;
  }
}

/** Classes per month for a known tier key — null if no fixed class count
 *  (unlimited tiers, unknown tiers). Used to compute per-class breakdowns. */
export function classesPerMonth(key: string): number | null {
  if (key === "unlimited") return null;
  const match = key.match(/^(\d+)x$/);
  return match ? parseInt(match[1], 10) : null;
}

// ---------- Apparatus packs (privates / duets / trios) ----------

export type ApparatusCategory = "private" | "duet" | "trio";
export type PackSize = "single" | "five" | "ten";

export type ApparatusPack = {
  category: ApparatusCategory;
  size: PackSize;
  membership: Membership;
};

export type ApparatusGroup = {
  category: ApparatusCategory;
  label: string;
  note: string;
  single?: Membership;
  five?: Membership;
  ten?: Membership;
};

function detectCategory(name: string): ApparatusCategory | null {
  const n = name.toLowerCase();
  if (n.includes("private")) return "private";
  if (n.includes("duet")) return "duet";
  if (n.includes("trio") || n.includes("small group")) return "trio";
  return null;
}

function detectPackSize(name: string): PackSize | null {
  const n = name.toLowerCase();
  if (/\b10[\s-]*pack/.test(n)) return "ten";
  if (/\b5[\s-]*pack/.test(n)) return "five";
  if (n.includes("single") || /\b1\s*drop\s*in/.test(n)) return "single";
  return null;
}

/** Group Momence package-events into apparatus rows (private/duet/trio) × size. */
export function groupApparatus(memberships: Membership[]): ApparatusGroup[] {
  const groups: Record<ApparatusCategory, ApparatusGroup> = {
    private: { category: "private", label: "Privates", note: "1 student · Full apparatus" },
    duet: { category: "duet", label: "Duets", note: "2 students · Full apparatus" },
    trio: { category: "trio", label: "Trios", note: "3 students · Full apparatus" },
  };

  for (const m of memberships) {
    if (m.type !== "package-events") continue;
    const cat = detectCategory(m.name);
    if (!cat) continue;
    const size = detectPackSize(m.name);
    if (!size) continue;
    groups[cat][size] = m;
  }

  return [groups.private, groups.duet, groups.trio];
}

// ---------- Drop-in ----------

/** Single mat drop-in pack — by name match. */
export function findDropIn(memberships: Membership[]): Membership | undefined {
  return memberships.find((m) => {
    const n = m.name.toLowerCase();
    return (
      m.type === "package-events" &&
      (n.includes("drop in") || n.includes("drop-in")) &&
      n.includes("mat")
    );
  });
}

// ---------- Return to Life courses ----------

export type RtlCourse = {
  membership: Membership;
  level: "Beginner" | "Intermediate" | "Advanced" | "Unknown";
};

export function findRtlCourses(memberships: Membership[]): RtlCourse[] {
  const rtl = memberships.filter((m) => {
    const n = m.name.toLowerCase();
    return n.includes("return to life") || /\bcourse\s+i+/i.test(m.name);
  });

  // De-dupe by name + price so the duplicate "Course II" entries collapse.
  const seen = new Map<string, RtlCourse>();
  for (const m of rtl) {
    const key = `${m.name.toLowerCase()}|${m.price}`;
    if (seen.has(key)) continue;
    let level: RtlCourse["level"] = "Unknown";
    if (/\bcourse\s*iii\b/i.test(m.name)) level = "Advanced";
    else if (/\bcourse\s*ii\b/i.test(m.name)) level = "Intermediate";
    else if (/\bcourse\s*i\b/i.test(m.name)) level = "Beginner";
    seen.set(key, { membership: m, level });
  }

  return Array.from(seen.values()).sort((a, b) => a.membership.name.localeCompare(b.membership.name));
}

// ---------- Intro Privates Bundle ----------

/** The introductory privates pack — typically a 3-session bundle for
 *  brand-new clients to try the apparatus before committing. Surfaces
 *  separately on /packs (with the founding-member price callout) so it
 *  doesn't disappear into the catch-all bucket. */
export function findIntroPrivates(memberships: Membership[]): Membership | undefined {
  return memberships.find((m) => {
    const n = m.name.toLowerCase();
    return (
      m.type === "package-events" &&
      n.includes("intro") &&
      n.includes("private")
    );
  });
}

/** Hardcoded founding-member price for the intro privates bundle. Keep
 *  in sync with the perk copy on /founding ($220). When Momence gets a
 *  dedicated founding intro SKU we can swap this for a live lookup. */
export const INTRO_PRIVATES_FOUNDING_PRICE = 220;

// ---------- Unknown / catch-all ----------

/** Returns anything that didn't fit into the known buckets, so the page can
 *  surface it in a generic "More options" footer rather than silently hide it. */
export function findOtherOfferings(memberships: Membership[]): Membership[] {
  const matTierIds = new Set(
    memberships
      .filter((m) => m.type === "subscription")
      .map((m) => m.id)
  );
  const apparatusIds = new Set(
    memberships
      .filter((m) => m.type === "package-events" && detectCategory(m.name) && detectPackSize(m.name))
      .map((m) => m.id)
  );
  const dropIn = findDropIn(memberships);
  const intro = findIntroPrivates(memberships);
  const rtlIds = new Set(findRtlCourses(memberships).map((c) => c.membership.id));

  return memberships.filter(
    (m) =>
      !matTierIds.has(m.id) &&
      !apparatusIds.has(m.id) &&
      m.id !== dropIn?.id &&
      m.id !== intro?.id &&
      !rtlIds.has(m.id)
  );
}
