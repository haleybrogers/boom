import Image from "next/image";
import { notFound } from "next/navigation";
import FoundingLaunchCard from "@/components/FoundingLaunchCard";
import Reveal from "@/components/Reveal";
import {
  SHOW_FOUNDING,
  isFoundingLaunched,
  FOUNDING_LAUNCH,
  FOUNDING_SPOTS_LEFT,
  FOUNDING_SPOTS_TOTAL,
} from "@/lib/flags";

// Display labels for the scarcity banner (keyed by tier key).
const TIER_SHORT_LABELS: Record<string, string> = {
  "4x": "4× Mat",
  "8x": "8× Mat",
  unlimited: "Unlimited Mat",
};
import {
  fetchMemberships,
  pairMatTiers,
  tierTagline,
  tierDisplayName,
  classesPerMonth,
} from "@/lib/momence";

// Re-render hourly so the launch gate auto-flips from "countdown +
// waitlist" to "live pricing cards" shortly after FOUNDING_LAUNCH
// without needing a redeploy.
export const revalidate = 3600;

export const metadata = {
  title: "Founding Members",
  description:
    "Become a founding member at Boomerang Pilates. 25% off mat for life, opening night invite, welcome kit, and intro privates. 15 spots per tier. Ends July 13, 2026.",
};

const perks = [
  {
    title: "Opening Night Party",
    detail:
      "First through the doors. Champagne, music, a room full of the people who got us here.",
  },
  {
    title: "Welcome Kit",
    detail: "A cute tee, grip socks, and a sticker. Yours when you join.",
  },
  {
    title: "Intro Privates Bundle",
    detail:
      "Three introductory privates for $220. Meet the apparatus with one of us before you bring it into class.",
  },
  {
    title: "Bring-a-Friend Pass",
    detail:
      "One free mat class for a friend each month, for your first three months.",
  },
];

export default async function Founding() {
  // After the deadline (EOD July 13, 2026), this page disappears.
  if (!SHOW_FOUNDING) notFound();
  const memberships = await fetchMemberships();

  // Scarcity banner: surface the tier with the fewest spots left (most
  // urgent). Manual counts live in FOUNDING_SPOTS_LEFT (flags.ts).
  const scarcestTier = Object.entries(FOUNDING_SPOTS_LEFT)
    .filter(([, n]) => n > 0)
    .sort((a, b) => a[1] - b[1])[0];
  const allFoundingFull = !scarcestTier;

  return (
    <>
      {/* Hero. Full-bleed Pilates photo with overlaid kicker, headline, countdown */}
      <section className="relative h-[70vh] min-h-[480px] md:h-[80vh] md:min-h-[560px] overflow-hidden">
        <Image
          src="/photo-mat-2.jpg"
          alt="Classical mat Pilates at Boomerang"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Mobile: dark fade at the top behind the text. Desktop: dark
            fade at the bottom (text sits at the bottom). */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/65 via-charcoal/25 to-charcoal/35 md:from-charcoal/20 md:via-charcoal/10 md:to-charcoal/60" />

        <div className="relative h-full flex items-start md:items-end">
          <div className="max-w-6xl mx-auto px-6 pt-28 pb-8 md:pt-0 md:pb-24 w-full">
            <div className="max-w-2xl text-white">
              <p className="text-[11px] tracking-[0.4em] uppercase text-white/90 mb-5 animate-fade-up-lux" style={{ animationDelay: "0.3s" }}>
                Founding Member · Ends July 13, 2026
              </p>
              <h1 className="font-serif text-5xl md:text-7xl font-light leading-[1.05] mb-6 animate-fade-up-lux" style={{ animationDelay: "0.5s" }}>
                Be one of the first.
              </h1>
              {/* Scarcity banner. Manual per-tier counts (FOUNDING_SPOTS_LEFT
                  in flags.ts). Surfaces the scarcest tier; flips to "full"
                  once every tier hits 0. */}
              {isFoundingLaunched() && (
                <p
                  className="inline-flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase bg-white/15 backdrop-blur-sm border border-white/40 rounded-full px-4 py-2 animate-fade-up-lux"
                  style={{ animationDelay: "0.7s" }}
                >
                  {allFoundingFull ? (
                    <>Founding memberships are full</>
                  ) : (
                    <>
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      Only {scarcestTier[1]}{" "}
                      {scarcestTier[1] === 1 ? "spot" : "spots"} left in{" "}
                      {TIER_SHORT_LABELS[scarcestTier[0]] ?? scarcestTier[0]}
                    </>
                  )}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>


      {/* Pricing header. Photo block (was /photo-founding-mat.jpg + a
          side-by-side intro) intentionally pulled. Headline now lives
          here as the centered header for the tier-cards section below.
          Kept the photo file on disk so it's a one-line swap to bring
          back if we ever want it again. */}
      <section className="pt-20 lg:pt-28 pb-8 lg:pb-10">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-sm tracking-widest uppercase text-accent mb-4">
            Limited Time
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-charcoal leading-tight mb-6">
            25% off mat. For life.
          </h2>
          <p className="text-muted text-base leading-relaxed">
            Only 15 spots per tier, and they&apos;ll go fast. Pick the
            membership that matches how often you&apos;ll show up. Your
            rate locks in the moment you join and never moves as long as
            it stays active.
          </p>
        </div>
      </section>

      {/* Launch card. Slim early-access strip sits between the pricing
          header and the tier cards pre-launch — countdown + a single CTA
          that expands to the signup form on click. Returns null once
          launch passes. */}
      {!isFoundingLaunched() && (
        <section className="pb-12 lg:pb-14">
          <div className="max-w-5xl mx-auto px-6">
            <FoundingLaunchCard />
          </div>
        </section>
      )}

      {/* Pricing cards. Dynamic from Momence. Render only tiers that actually
          have a founding pair in Momence; featured = middle tier when present.
          When pre-launch, cards render in a disabled "preview" state — same
          info, no link, "Launches [date]" instead of "Lock in this rate". */}
      {(() => {
        const tiers = pairMatTiers(memberships).filter((t) => t.founding);
        if (tiers.length === 0) return null;
        const featuredKey = tiers.length >= 2 ? tiers[1].key : tiers[0].key;
        const launched = isFoundingLaunched();
        const launchDateShort = FOUNDING_LAUNCH.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          timeZone: "America/New_York",
        });
        return (
          <section className="bg-warm-white py-16 lg:py-20">
            <div className="max-w-5xl mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
                {tiers.map((t) => {
                  const founding = t.founding!;
                  const regular = t.regular;
                  const classes = classesPerMonth(t.key);
                  const savings =
                    regular && founding.price !== undefined && regular.price !== undefined
                      ? regular.price - founding.price
                      : null;
                  const foundingPerClass =
                    classes && founding.price !== undefined
                      ? Math.ceil(founding.price / classes)
                      : null;
                  const regularPerClass =
                    classes && regular?.price !== undefined
                      ? Math.ceil(regular.price / classes)
                      : null;
                  const isFeatured = t.key === featuredKey;
                  // Manual per-tier spots-left (flags.ts). A tier at 0 is
                  // "Full" and its card stops linking to checkout.
                  const spotsLeft =
                    FOUNDING_SPOTS_LEFT[t.key] ?? FOUNDING_SPOTS_TOTAL;
                  const soldOut = spotsLeft <= 0;
                  const clickable = launched && !soldOut;
                  // Shared inner content — same regardless of launched state.
                  const cardInner = (
                    <>
                      <h3 className="font-serif text-xl font-light text-charcoal mb-1">
                        {tierDisplayName(t)}
                      </h3>
                      {tierTagline(t.key) && (
                        <p className="text-sm text-muted mb-1">{tierTagline(t.key)}</p>
                      )}
                      <p className="text-[11px] tracking-widest uppercase text-muted mb-2">
                        Monthly Membership
                      </p>
                      {launched && (
                        <p
                          className={`inline-block text-[10px] tracking-[0.2em] uppercase rounded-full px-2.5 py-1 mb-4 ${
                            soldOut
                              ? "bg-charcoal/5 text-charcoal/50"
                              : "bg-accent/10 text-accent font-medium"
                          }`}
                        >
                          {soldOut
                            ? "Full"
                            : `${spotsLeft} ${spotsLeft === 1 ? "spot" : "spots"} left`}
                        </p>
                      )}

                      <div className="border-t border-charcoal/5 pt-4 mb-2">
                        <p className="text-[11px] tracking-widest uppercase text-accent mb-1">
                          Founding
                        </p>
                        <p className="font-serif text-3xl font-light text-charcoal">
                          ${founding.price}
                          <span className="text-sm text-muted font-sans">/month</span>
                        </p>
                        {foundingPerClass !== null && (
                          <p className="text-sm text-muted mt-0.5">
                            ~${foundingPerClass}/class
                          </p>
                        )}
                        {savings !== null && savings > 0 && (
                          <p className="text-sm text-accent font-medium mt-1">
                            Save ${savings}/month
                          </p>
                        )}
                      </div>

                      {regular && (
                        <div className="pt-3 mb-5">
                          <p className="text-[11px] tracking-widest uppercase text-muted mb-1">
                            Regular
                          </p>
                          <p className="font-serif text-lg font-light text-muted">
                            <span className="line-through decoration-accent/50 decoration-1">
                              ${regular.price}
                            </span>
                            <span className="text-sm text-muted font-sans">/month</span>
                          </p>
                          {regularPerClass !== null && (
                            <p className="text-sm text-muted/80 mt-0.5">
                              ~${regularPerClass}/class
                            </p>
                          )}
                        </div>
                      )}

                      <div className="mt-auto pt-4 border-t border-charcoal/5 flex items-center justify-between">
                        <span
                          className={`text-[11px] tracking-widest uppercase transition-colors ${
                            soldOut
                              ? "text-charcoal/40"
                              : "text-accent group-hover:text-accent/80"
                          }`}
                        >
                          {soldOut
                            ? "Full"
                            : launched
                            ? "Become a founding member"
                            : `Launches ${launchDateShort}`}
                        </span>
                        <span className="text-accent group-hover:translate-x-0.5 transition-transform">
                          {clickable ? "→" : ""}
                        </span>
                      </div>
                    </>
                  );
                  // Launched: clickable card linking to Momence checkout.
                  // Pre-launch: same content rendered as a div with a
                  // subtle disabled treatment — no link, slightly muted.
                  const baseClasses = `group flex flex-col bg-white rounded-sm p-7 transition-all duration-300 ${
                    isFeatured
                      ? "border-2 border-accent/50 shadow-sm"
                      : "border border-charcoal/10"
                  } ${
                    clickable
                      ? "hover:-translate-y-1 hover:shadow-md " +
                        (isFeatured ? "" : "hover:border-accent/30")
                      : "opacity-90"
                  }`;
                  return clickable ? (
                    <a
                      key={t.key}
                      href={founding.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={baseClasses}
                    >
                      {cardInner}
                    </a>
                  ) : (
                    <div
                      key={t.key}
                      className={baseClasses + " cursor-default select-none"}
                      aria-disabled="true"
                    >
                      {cardInner}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })()}

      {/* The story. Intimate photo + the why */}
      <section className="py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="flex flex-col-reverse md:flex-row gap-10 md:gap-16 items-center">
            <div className="relative w-full md:w-1/2 aspect-[4/5] overflow-hidden">
              <Image
                src="/photo-founding-intimate.jpg"
                alt="Inside the Boomerang Pilates studio"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="w-full md:w-1/2">
              <p className="text-sm tracking-widest uppercase text-accent mb-4">
                Why founding
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal leading-tight mb-5">
                The people in the room first build the room.
              </h2>
              <p className="text-muted text-base leading-relaxed mb-4">
                A studio is only as good as the regulars who keep showing up
                for it. We&apos;re looking for the people who&apos;ll set the
                tone. The ones who&apos;ll know each other&apos;s names by
                week three and who&apos;ll drag a friend along.
              </p>
              <p className="text-muted text-base leading-relaxed">
                Founding membership is how we say thank you for taking a
                chance on us before there&apos;s even a sign on the door. Your
                rate never goes up. The perks don&apos;t expire. You were
                here first, and we won&apos;t forget it.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* The perks. 4-up grid on warm white */}
      <section className="bg-warm-white py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal className="text-center mb-14">
            <p className="text-[11px] tracking-[0.4em] uppercase text-accent mb-4">
              What&apos;s included
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal mb-4">
              A few things just for the first ones in.
            </h2>
            <div className="w-12 h-px bg-accent mx-auto mt-5" />
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {perks.map((p, i) => (
              <Reveal
                key={p.title}
                delay={i * 80}
                className="bg-white border border-charcoal/10 rounded-sm p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <p className="text-[11px] tracking-[0.3em] uppercase text-accent mb-3">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="font-serif text-xl font-light text-charcoal mb-2">
                  {p.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {p.detail}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* The fine print. Small, honest, easy to scan */}
      <section className="py-20 lg:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal>
            <h2 className="font-serif text-2xl md:text-3xl font-light text-charcoal text-center mb-10">
              The fine print.
            </h2>

            <dl className="divide-y divide-charcoal/10 border-y border-charcoal/10">
              <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2 sm:gap-8 py-5">
                <dt className="text-sm tracking-widest uppercase text-accent">
                  Deadline
                </dt>
                <dd className="text-sm text-muted leading-relaxed">
                  Founding pricing is available until July 13, 2026, or
                  when we&apos;re sold out. Whichever comes first.
                </dd>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2 sm:gap-8 py-5">
                <dt className="text-sm tracking-widest uppercase text-accent">
                  Spots
                </dt>
                <dd className="text-sm text-muted leading-relaxed">
                  15 spots per tier (4×, 8×, and Unlimited Mat).
                </dd>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2 sm:gap-8 py-5">
                <dt className="text-sm tracking-widest uppercase text-accent">
                  Commitment
                </dt>
                <dd className="text-sm text-muted leading-relaxed">
                  Three months to start. After that, month to month. Up to
                  four unused classes roll over each month.
                </dd>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2 sm:gap-8 py-5">
                <dt className="text-sm tracking-widest uppercase text-accent">
                  Mat only
                </dt>
                <dd className="text-sm text-muted leading-relaxed">
                  Founding pricing applies to mat memberships. Apparatus
                  classes, privates, and duets have separate pricing.
                </dd>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2 sm:gap-8 py-5">
                <dt className="text-sm tracking-widest uppercase text-accent">
                  Forever, with a catch
                </dt>
                <dd className="text-sm text-muted leading-relaxed">
                  Your rate stays put as long as your membership stays
                  active. Pause or cancel and the founding rate is gone. You
                  can re-join later at the regular price.
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>

    </>
  );
}
