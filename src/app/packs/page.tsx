import Image from "next/image";
import Link from "next/link";
import PackPickerModal from "@/components/PackPickerModal";
import { SHOW_FOUNDING, FOUNDING_SPOTS_LEFT, FOUNDING_SPOTS_TOTAL } from "@/lib/flags";
import {
  fetchMemberships,
  pairMatTiers,
  tierTagline,
  tierDisplayName,
  classesPerMonth,
  groupApparatus,
  findDropIn,
  findMatPacks,
  findRtlCourses,
  findOtherOfferings,
  findIntroPrivates,
  INTRO_PRIVATES_FOUNDING_PRICE,
  MOMENCE_DEMO_URL,
} from "@/lib/momence";

export const metadata = {
  title: "Memberships + Pricing",
  description:
    "Memberships, privates, apparatus packs, and the Return to Life course series at Boomerang Pilates. Durham, NC.",
};

export default async function Packs() {
  const memberships = await fetchMemberships();
  const tiers = pairMatTiers(memberships);
  const apparatus = groupApparatus(memberships);
  const dropIn = findDropIn(memberships);
  const matPacks = findMatPacks(memberships);
  const rtl = findRtlCourses(memberships);
  const intro = findIntroPrivates(memberships);
  const others = findOtherOfferings(memberships);

  const matPackLabel = (size: "five" | "ten" | "single") =>
    size === "ten" ? "10-Class Pack" : size === "five" ? "5-Class Pack" : "Single Drop-In";

  // Featured tier. Middle-position by convention (8x), falls back to first.
  const featuredKey = tiers.length >= 2 ? tiers[1].key : tiers[0]?.key;

  // While founding is live, the full-price mat memberships aren't bookable
  // yet — we steer people to the better founding deal instead.
  const matLocked = SHOW_FOUNDING;

  return (
    <section className="pt-28 lg:pt-36 pb-20 lg:pb-28">
      {/* Hero */}
      <div className="max-w-6xl mx-auto px-6 mb-20 lg:mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center">
          <div className="relative w-full aspect-[3/4] overflow-hidden order-1">
            <Image
              src="/nav-packs.jpg"
              alt="Class packs at Boomerang Pilates"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="order-2">
            <p className="text-[11px] tracking-[0.4em] uppercase text-accent mb-5">
              Memberships + Pricing
            </p>
            <h1 className="font-serif text-5xl md:text-6xl font-light text-charcoal leading-tight mb-6">
              Make it a habit.
            </h1>
            <div className="w-12 h-px bg-accent mb-6" />
            <p className="text-base text-muted leading-relaxed mb-4">
              The people who get the most out of Pilates are the ones who keep
              showing up. Memberships are how the regulars do it.
            </p>
            <p className="text-base text-muted leading-relaxed">
              Everything we offer, organized below. Founding pricing while
              it lasts, regular memberships, privates and small-group
              apparatus, and the Return to Life series.
            </p>
          </div>
        </div>
      </div>

      {/* 1. Founding Member teaser. Slim promotional callout — pricing
          + booking happen exclusively on /founding. (Previously this
          section duplicated the founding pricing grid; we ripped that
          out so there's only one place to read the details and book.) */}
      {SHOW_FOUNDING && tiers.some((t) => t.founding) && (
        <div className="bg-accent/5 border-y border-accent/15 py-16 lg:py-20">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <span className="inline-block bg-white border border-accent/30 text-accent text-[11px] tracking-[0.3em] uppercase px-3 py-1 rounded-full mb-5">
              Limited Time
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal mb-4">
              Want 25% off mat for life?
            </h2>
            <p className="text-muted text-base leading-relaxed max-w-xl mx-auto mb-8">
              Check out our founding memberships. Just 15 spots per tier
              and they&apos;ll go fast. Locked-in rate as long as your
              membership stays active, plus opening night, a welcome kit,
              an intro privates pack, and a bring-a-friend pass for your
              first three months.
            </p>
            <Link
              href="/founding"
              className="btn-animated inline-block bg-accent text-white text-sm tracking-widest uppercase px-8 py-3.5 hover:bg-accent/90 transition-colors"
            >
              See Founding Memberships →
            </Link>
          </div>
        </div>
      )}

      {/* 2. Mat Classes. Memberships + class packs in a unified row
          so users can compare every option side-by-side. Drop-in
          stays as the footer link below the grid. */}
      {tiers.some((t) => t.regular) && (
        <div className="py-20 lg:py-24">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <p className="text-[11px] tracking-[0.4em] uppercase text-accent mb-4">
                Memberships, Packs &amp; Drop-In
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal mb-4">
                Mat Classes.
              </h2>
              <p className="text-muted text-base leading-relaxed max-w-xl mx-auto">
                Memberships if you&apos;re committed, class packs if you&apos;d
                rather pay as you go, or a single drop-in. Memberships are a
                three-month commitment — up to four unused classes roll over
                each month, pause anytime after the first three.
              </p>
            </div>

            {/* Unified card row. 3 mat tiers + any number of packs share
                the same shape: title, sub-label, tagline, price block,
                CTA row. flex-wrap + justify-center so the orphan card
                in a half-wrapped row (3+2 at md, 2+2+1 at sm) sits
                centered rather than aligning left. Cards that are
                locked behind founding render with the founding-redirect
                inline rather than going blank — that's the "why can't
                I book this?" answer. */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {/* Mat class packs first — 5-pack on the left, then
                  10-pack, then memberships in ascending commitment.
                  Reads left-to-right as a "smallest commitment to
                  biggest commitment" progression. */}
              {matPacks.map((p) => {
                const m = p.membership;
                const count = p.size === "ten" ? 10 : 5;
                const perClass =
                  m.price !== undefined ? Math.ceil(m.price / count) : null;
                return (
                  <a
                    key={m.id}
                    href={m.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col bg-white border border-charcoal/10 rounded-sm p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-accent/30 basis-full sm:basis-[calc((100%-1rem)/2)] lg:basis-[220px] lg:max-w-[220px]"
                  >
                    <h3 className="font-serif text-lg font-light text-charcoal mb-1">
                      {matPackLabel(p.size)}
                    </h3>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-muted mb-2">
                      Class Pack
                    </p>
                    <p className="text-xs text-muted mb-4 leading-snug">
                      {count} classes · 6 months to use
                    </p>

                    <div className="border-t border-charcoal/5 pt-3">
                      <p className="font-serif text-2xl font-light text-charcoal leading-none">
                        ${m.price}
                      </p>
                      {perClass !== null && (
                        <p className="text-xs text-muted mt-1">
                          ~${perClass}/class
                        </p>
                      )}
                    </div>

                    <div className="mt-auto pt-3 border-t border-charcoal/5 flex items-center justify-between">
                      <span className="text-[10px] tracking-widest uppercase text-accent group-hover:text-accent/80 transition-colors">
                        Buy
                      </span>
                      <span className="text-accent group-hover:translate-x-0.5 transition-transform">
                        →
                      </span>
                    </div>
                  </a>
                );
              })}

              {/* Mat tier memberships */}
              {tiers
                .filter((t) => t.regular)
                .map((t) => {
                  const regular = t.regular!;
                  const founding = t.founding;
                  const classes = classesPerMonth(t.key);
                  const perClass =
                    classes && regular.price !== undefined
                      ? Math.ceil(regular.price / classes)
                      : null;
                  const isFeatured = t.key === featuredKey;
                  // A tier is locked while its founding pair is still
                  // available — we want people on the founding deal,
                  // not paying full price.
                  const tierLocked =
                    matLocked &&
                    (FOUNDING_SPOTS_LEFT[t.key] ?? FOUNDING_SPOTS_TOTAL) > 0;

                  const cardInner = (
                    <>
                      {isFeatured && (
                        <p className="text-[11px] tracking-[0.25em] uppercase text-charcoal/60 mb-2">
                          Most popular
                        </p>
                      )}
                      <h3 className="font-serif text-lg font-light text-charcoal mb-1">
                        {tierDisplayName(t)}
                      </h3>
                      <p className="text-[10px] tracking-[0.2em] uppercase text-muted mb-2">
                        Monthly Membership
                      </p>
                      {tierTagline(t.key) && (
                        <p className="text-xs text-muted mb-4 leading-snug">
                          {tierTagline(t.key)}
                        </p>
                      )}

                      <div className="border-t border-charcoal/5 pt-3">
                        <p className="font-serif text-2xl font-light text-charcoal leading-none">
                          ${regular.price}
                          <span className="text-xs text-muted font-sans">
                            /mo
                          </span>
                        </p>
                        {perClass !== null && (
                          <p className="text-xs text-muted mt-1">
                            ~${perClass}/class
                          </p>
                        )}
                      </div>

                      {/* CTA / locked-reason row. Locked cards link to
                          /founding with a single accent line — the
                          "why" is implied by the message itself
                          (founding is still running and cheaper). */}
                      {tierLocked ? (
                        <div className="mt-auto pt-3 border-t border-charcoal/5">
                          <p className="text-xs text-accent leading-snug group-hover:text-accent/80 transition-colors">
                            Founding membership still available!{" "}
                            {founding?.price !== undefined && (
                              <>${founding.price}/mo for life </>
                            )}
                            →
                          </p>
                        </div>
                      ) : (
                        <div className="mt-auto pt-3 border-t border-charcoal/5 flex items-center justify-between">
                          <span className="text-[10px] tracking-widest uppercase text-accent group-hover:text-accent/80 transition-colors">
                            Buy
                          </span>
                          <span className="text-accent group-hover:translate-x-0.5 transition-transform">
                            →
                          </span>
                        </div>
                      )}
                    </>
                  );

                  // basis-* values target ~220px per card on lg
                  // (5-up), ~50% width on sm (2-up), full width on
                  // mobile (1-up). Gap-4 = 1rem accounted for in math.
                  const baseClasses = `flex flex-col bg-white rounded-sm p-5 transition-all duration-300 basis-full sm:basis-[calc((100%-1rem)/2)] lg:basis-[220px] lg:max-w-[220px] ${
                    isFeatured
                      ? "border-2 border-charcoal/20"
                      : "border border-charcoal/10"
                  } ${
                    tierLocked
                      ? "group cursor-pointer hover:-translate-y-0.5 hover:shadow-md hover:border-accent/40"
                      : "group hover:-translate-y-1 hover:shadow-md" +
                        (isFeatured ? "" : " hover:border-accent/30")
                  }`;

                  // Locked tiers now link to /founding (where the
                  // user CAN do something), not /packs/checkout (where
                  // they can't). Unlocked tiers link to Momence as
                  // usual.
                  return tierLocked ? (
                    <Link
                      key={t.key}
                      href="/founding"
                      className={baseClasses}
                    >
                      {cardInner}
                    </Link>
                  ) : (
                    <a
                      key={t.key}
                      href={regular.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={baseClasses}
                    >
                      {cardInner}
                    </a>
                  );
                })}
            </div>

            <p className="text-center text-sm text-muted">
              Prefer to drop in?{" "}
              <a
                href="/schedule"
                className="text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent transition-colors"
              >
                See the schedule
                {dropIn?.price !== undefined && (
                  <>
                    {" · "}
                    <span className="text-charcoal font-medium">
                      ${dropIn.price}/class
                    </span>
                  </>
                )}
              </a>
            </p>
          </div>
        </div>
      )}

      {/* 3. Privates, Duets & Trios. Opens with the featured Intro 3-Pack
          callout (the canonical first step into private sessions), then
          the regular Private/Duet/Trio pack cards below. Free apparatus
          demo gets a small footer line — it's the lower-commitment door
          for anyone not ready to buy a pack. */}
      {apparatus.some((g) => g.single || g.five || g.ten) && (
        <div className="bg-warm-white py-20 lg:py-24 border-t border-charcoal/5">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-12">
              <p className="text-[11px] tracking-[0.4em] uppercase text-accent mb-4">
                By Appointment
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal mb-4">
                Privates, Duets &amp; Trios.
              </h2>
              <p className="text-muted text-base leading-relaxed max-w-xl mx-auto">
                The full classical apparatus, built around you. Single sessions
                or packs of 5 or 10. All packs expire 6 months after purchase.
              </p>
            </div>

            {/* Intro 3-Pack callout. Intentionally subtle — only
                relevant to people new to the studio. Thin accent
                border, one-line copy, founding price is its own
                /founding link so the limited-time framing is clear
                and clickable. */}
            {intro && intro.price !== undefined && (
              <div className="max-w-2xl mx-auto mb-10 bg-cream border border-accent/40 rounded-sm px-5 py-4 sm:px-6 sm:py-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] tracking-[0.3em] uppercase text-accent/80 mb-0.5">
                      New to the studio · Intro 3-Pack
                    </p>
                    <p className="text-sm text-charcoal/80 leading-snug">
                      Three private sessions to get you started —
                      <span className="text-charcoal font-medium"> ${intro.price}</span>
                      .
                    </p>
                    {SHOW_FOUNDING && (
                      <p className="text-xs text-accent mt-1.5 leading-snug">
                        <Link
                          href="/founding"
                          className="underline underline-offset-4 decoration-accent/40 hover:decoration-accent transition-colors"
                        >
                          Founding members: ${INTRO_PRIVATES_FOUNDING_PRICE} — limited time →
                        </Link>
                      </p>
                    )}
                  </div>
                  <a
                    href={intro.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center text-[10px] tracking-widest uppercase text-accent shrink-0 hover:text-accent/80 transition-colors"
                  >
                    Buy the pack{" "}
                    <span className="ml-1 group-hover:translate-x-0.5 transition-transform">
                      →
                    </span>
                  </a>
                </div>
              </div>
            )}

            {/* Regular pack cards (Private / Duet / Trio · single / 5 / 10). */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
              {apparatus.map((g) => {
                const allPrices = [g.single?.price, g.five?.price, g.ten?.price].filter(
                  (p): p is number => p !== undefined
                );
                const fromPrice = allPrices.length ? Math.min(...allPrices) : null;
                if (!fromPrice) return null;
                return (
                  <div
                    key={g.category}
                    className="flex flex-col bg-white border border-charcoal/10 rounded-sm p-7"
                  >
                    <h3 className="font-serif text-xl font-light text-charcoal mb-1">
                      {g.label}
                    </h3>
                    <p className="text-sm text-muted mb-5">{g.note}</p>

                    <div className="space-y-2 border-t border-charcoal/5 pt-4 mb-5">
                      {g.single?.price !== undefined && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted">Single</span>
                          <span className="text-charcoal font-medium">${g.single.price}</span>
                        </div>
                      )}
                      {g.five?.price !== undefined && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted">5-pack</span>
                          <span className="text-charcoal font-medium">${g.five.price}</span>
                        </div>
                      )}
                      {g.ten?.price !== undefined && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted">10-pack</span>
                          <span className="text-charcoal font-medium">${g.ten.price}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-center mb-6">
              <PackPickerModal buttonLabel="Buy a Pack" groups={apparatus} />
            </div>

            {/* Free demo footer line. Subtle on purpose — it's the
                lower-commitment door, not the main CTA. */}
            <p className="text-center text-sm text-muted">
              Not sure yet?{" "}
              <a
                href={MOMENCE_DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent transition-colors"
              >
                Book a free apparatus demo →
              </a>
            </p>
          </div>
        </div>
      )}

      {/* 4. Return to Life Series */}
      {rtl.length > 0 && (
        <div className="py-20 lg:py-24 border-t border-charcoal/5">
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-12">
              <p className="text-[11px] tracking-[0.4em] uppercase text-accent mb-4">
                8-Week Course Series
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal mb-4">
                Return to Life.
              </h2>
              <p className="text-muted text-base leading-relaxed max-w-lg mx-auto">
                A structured, progressive series that builds your classical mat
                practice from the ground up. Runs as interest demands. Eight weeks,
                taught the way the method was designed to be learned.
              </p>
            </div>

            <div
              className={`grid gap-5 mb-10 ${
                rtl.length === 1 ? "grid-cols-1 max-w-md mx-auto" : "grid-cols-1 md:grid-cols-2"
              }`}
            >
              {rtl.map((c) => (
                <a
                  key={c.membership.id}
                  href={c.membership.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col border border-charcoal/10 rounded-sm p-7 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-accent/30"
                >
                  <div className="flex items-baseline justify-between mb-3">
                    <h3 className="font-serif text-xl font-light text-charcoal">
                      {c.membership.name}
                    </h3>
                    <span className="font-serif text-2xl font-light text-charcoal">
                      ${c.membership.price}
                    </span>
                  </div>
                  {c.level !== "Unknown" && (
                    <p className="text-sm text-accent mb-3">{c.level}</p>
                  )}
                  <div className="mt-auto pt-4 border-t border-charcoal/5 flex items-center justify-between">
                    <span className="text-[11px] tracking-widest uppercase text-accent group-hover:text-accent/80 transition-colors">
                      Enroll
                    </span>
                    <span className="text-accent group-hover:translate-x-0.5 transition-transform">
                      →
                    </span>
                  </div>
                </a>
              ))}
            </div>

            <p className="text-center text-sm text-muted">
              Tap a course to enroll, or{" "}
              <Link
                href="/events"
                className="text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent transition-colors"
              >
                see all workshops &amp; events
              </Link>
              .
            </p>
          </div>
        </div>
      )}

      {/* 5. More options. Anything in Momence that didn't fit the known buckets */}
      {others.length > 0 && (
        <div className="bg-warm-white py-16 lg:py-20 border-t border-charcoal/5">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-10">
              <p className="text-[11px] tracking-[0.4em] uppercase text-accent mb-4">
                Also Available
              </p>
              <h2 className="font-serif text-2xl md:text-3xl font-light text-charcoal">
                More options.
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {others.map((m) => (
                <a
                  key={m.id}
                  href={m.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col bg-white border border-charcoal/10 rounded-sm p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-accent/30"
                >
                  <h3 className="font-serif text-base font-light text-charcoal mb-2 leading-tight">
                    {m.name}
                  </h3>
                  <div className="mt-auto flex items-baseline justify-between border-t border-charcoal/5 pt-3">
                    <span className="font-serif text-xl font-light text-charcoal">
                      ${m.price}
                    </span>
                    <span className="text-[11px] tracking-widest uppercase text-accent group-hover:text-accent/80 transition-colors">
                      Buy →
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
