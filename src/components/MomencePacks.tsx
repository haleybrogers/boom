// Server component — fetches published memberships/packs from Momence on the
// server (so the token never reaches the browser) and renders one card per
// pack. As Emilie adds more in the Momence dashboard, they show up here
// automatically within the revalidate window (5 min).
//
// API base per the boilerplate Momence ships:
//   GET https://api.withribbon.com/api/v1/Memberships?hostId=...&token=...
// Same endpoint that returns Boomerang's "10 Class Pack" today; both
// memberships and class packs live in this collection.

type Membership = {
  id: number;
  name: string;
  description: string | null;
  type: string;
  link: string;
  price: number;
  isDisabled: boolean;
  isDeleted: boolean;
};

const HOST_ID = process.env.MOMENCE_HOST_ID || "270195";
const TOKEN = process.env.MOMENCE_API_TOKEN || "da1030e20e";
const FALLBACK_URL = `https://momence.com/host/${HOST_ID}/memberships`;

async function fetchMemberships(): Promise<Membership[]> {
  try {
    const res = await fetch(
      `https://api.withribbon.com/api/v1/Memberships?hostId=${HOST_ID}&token=${TOKEN}`,
      // 60s revalidate — when Emilie adds a new pack in Momence, it shows
      // up on the site within a minute instead of waiting on a longer cache.
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

export default async function MomencePacks() {
  const packs = await fetchMemberships();

  // Empty state — single CTA to the host memberships page
  if (packs.length === 0) {
    return (
      <a
        href={FALLBACK_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-animated inline-block bg-accent text-white text-xs tracking-widest uppercase px-8 py-3.5 hover:bg-accent/90 transition-colors"
      >
        Browse Packs
      </a>
    );
  }

  // Cards — one per pack, click-through to its Momence page
  return (
    <div
      className={`mx-auto grid gap-4 ${
        packs.length === 1
          ? "max-w-sm grid-cols-1"
          : packs.length === 2
          ? "max-w-2xl grid-cols-1 sm:grid-cols-2"
          : "max-w-4xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      }`}
    >
      {packs.map((pack) => (
        <a
          key={pack.id}
          href={pack.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col bg-white border border-charcoal/10 rounded-sm p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-accent/30"
        >
          <h3 className="font-serif text-lg font-light text-charcoal mb-2 leading-tight">
            {pack.name}
          </h3>
          {pack.description ? (
            <p className="text-sm text-muted leading-relaxed mb-4 flex-1">
              {pack.description}
            </p>
          ) : (
            <div className="flex-1" />
          )}
          <div className="flex items-baseline justify-between border-t border-charcoal/5 pt-3 mt-2">
            <span className="font-serif text-2xl font-light text-charcoal">
              ${pack.price}
            </span>
            <span className="text-[10px] tracking-widest uppercase text-accent group-hover:text-accent/80 transition-colors">
              Buy →
            </span>
          </div>
        </a>
      ))}
    </div>
  );
}
