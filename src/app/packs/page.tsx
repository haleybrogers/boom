import Image from "next/image";
import Link from "next/link";
import FoundingCountdown from "@/components/FoundingCountdown";
import PackPickerModal from "@/components/PackPickerModal";
import { SHOW_FOUNDING } from "@/lib/flags";
import {
  fetchMemberships,
  pairMatTiers,
  tierTagline,
  tierDisplayName,
  groupApparatus,
  findDropIn,
  findRtlCourses,
  findOtherOfferings,
} from "@/lib/momence";

export const metadata = {
  title: "Memberships + Pricing",
  description:
    "Memberships, privates, apparatus packs, and the Return to Life course series at Boomerang Pilates — Durham, NC.",
};

export default async function Packs() {
  const memberships = await fetchMemberships();
  const tiers = pairMatTiers(memberships);
  const apparatus = groupApparatus(memberships);
  const dropIn = findDropIn(memberships);
  const rtl = findRtlCourses(memberships);
  const others = findOtherOfferings(memberships);

  // Featured tier — middle-position by convention (8x), falls back to first.
  const featuredKey = tiers.length >= 2 ? tiers[1].key : tiers[0]?.key;

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
            <p className="text-[10px] tracking-[0.4em] uppercase text-accent mb-5">
              Memberships + Pricing
            </p>
            <h1 className="font-serif text-5xl md:text-6xl font-light text-charcoal leading-tight mb-6">
              Make it a habit.
            </h1>
            <div className="w-12 h-px bg-accent mb-6" />
            <p className="text-base text-muted leading-relaxed mb-4">
              The people who get the most out of Pilates are the ones who keep
              showing up. Memberships are how the regulars do it — lock in a
              rhythm, save per class, and skip the checkout dance every time
              you come back.
            </p>
            <p className="text-base text-muted leading-relaxed">
              Everything we offer, organized below — founding pricing while
              it lasts, regular memberships, privates and small-group
              apparatus, and the Return to Life series. Tap any card to buy.
            </p>
          </div>
        </div>
      </div>

      {/* 1. Founding Member — only renders when SHOW_FOUNDING is on AND
          there's at least one founding tier in Momence */}
      {SHOW_FOUNDING && tiers.some((t) => t.founding) && (
        <div className="bg-accent/5 border-y border-accent/15 py-20 lg:py-24">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-12">
              <span className="inline-block bg-white border border-accent/30 text-accent text-[10px] tracking-[0.3em] uppercase px-3 py-1 rounded-full mb-5">
                Limited Time
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal mb-4">
                Founding Member.
              </h2>
              <p className="text-muted text-base leading-relaxed max-w-xl mx-auto mb-5">
                25% off membership for life, as long as it stays active. 15
                spots per tier. Plus opening night, the welcome kit, intro
                privates bundle, and a bring-a-friend pass.
              </p>
              <FoundingCountdown showLabel={false} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
              {tiers
                .filter((t) => t.founding)
                .map((t) => {
                  const founding = t.founding!;
                  const regular = t.regular;
                  const savings = regular && founding.price !== undefined && regular.price !== undefined
                    ? regular.price - founding.price
                    : null;
                  const isFeatured = t.key === featuredKey;
                  return (
                    <a
                      key={t.key}
                      href={founding.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group flex flex-col bg-white rounded-sm p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
                        isFeatured
                          ? "border-2 border-accent/50 shadow-sm"
                          : "border border-charcoal/10 hover:border-accent/30"
                      }`}
                    >
                      {isFeatured && (
                        <p className="text-[10px] tracking-[0.25em] uppercase text-accent mb-3">
                          Most popular
                        </p>
                      )}
                      <h3 className="font-serif text-xl font-light text-charcoal mb-1">
                        {tierDisplayName(t)}
                      </h3>
                      {tierTagline(t.key) && (
                        <p className="text-xs text-muted mb-1">{tierTagline(t.key)}</p>
                      )}
                      <p className="text-[10px] tracking-widest uppercase text-muted/70 mb-5">
                        Monthly Membership
                      </p>

                      <div className="border-t border-charcoal/5 pt-4 mb-2">
                        <p className="text-[10px] tracking-widest uppercase text-accent mb-1">
                          Founding
                        </p>
                        <p className="font-serif text-3xl font-light text-charcoal">
                          ${founding.price}
                          <span className="text-sm text-muted font-sans">/month</span>
                        </p>
                        {savings !== null && savings > 0 && (
                          <p className="text-xs text-accent font-medium mt-1">
                            Save ${savings}/month
                          </p>
                        )}
                      </div>

                      {regular && (
                        <div className="pt-3 mb-5">
                          <p className="text-[10px] tracking-widest uppercase text-muted mb-1">
                            Regular
                          </p>
                          <p className="font-serif text-lg font-light text-muted/70">
                            <span className="line-through decoration-accent/50 decoration-1">
                              ${regular.price}
                            </span>
                            <span className="text-xs text-muted/70 font-sans">/month</span>
                          </p>
                        </div>
                      )}

                      <div className="mt-auto pt-4 border-t border-charcoal/5 flex items-center justify-between">
                        <span className="text-[10px] tracking-widest uppercase text-accent group-hover:text-accent/80 transition-colors">
                          Lock in this rate
                        </span>
                        <span className="text-accent group-hover:translate-x-0.5 transition-transform">
                          →
                        </span>
                      </div>
                    </a>
                  );
                })}
            </div>

            <div className="text-center">
              <Link
                href="/founding"
                className="text-xs tracking-widest uppercase text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent transition-colors"
              >
                See full founding details →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* 2. Mat Classes — regular pricing */}
      {tiers.some((t) => t.regular) && (
        <div className="py-20 lg:py-24">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-12">
              <p className="text-[10px] tracking-[0.4em] uppercase text-accent mb-4">
                By Membership or Drop-in
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal mb-4">
                Mat Classes.
              </h2>
              <p className="text-muted text-base leading-relaxed max-w-xl mx-auto">
                Three-month commitment. Up to four unused classes roll over each
                month. Pause anytime after the first three.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
              {tiers
                .filter((t) => t.regular)
                .map((t) => {
                  const regular = t.regular!;
                  const isFeatured = t.key === featuredKey;
                  return (
                    <a
                      key={t.key}
                      href={regular.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group flex flex-col bg-white rounded-sm p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
                        isFeatured
                          ? "border-2 border-charcoal/20"
                          : "border border-charcoal/10 hover:border-accent/30"
                      }`}
                    >
                      {isFeatured && (
                        <p className="text-[10px] tracking-[0.25em] uppercase text-charcoal/60 mb-3">
                          Most popular
                        </p>
                      )}
                      <h3 className="font-serif text-xl font-light text-charcoal mb-1">
                        {tierDisplayName(t)}
                      </h3>
                      {tierTagline(t.key) && (
                        <p className="text-xs text-muted mb-1">{tierTagline(t.key)}</p>
                      )}
                      <p className="text-[10px] tracking-widest uppercase text-muted/70 mb-5">
                        Monthly Membership
                      </p>

                      <div className="border-t border-charcoal/5 pt-4 mb-5">
                        <p className="font-serif text-3xl font-light text-charcoal">
                          ${regular.price}
                          <span className="text-sm text-muted font-sans">/month</span>
                        </p>
                      </div>

                      <div className="mt-auto pt-4 border-t border-charcoal/5 flex items-center justify-between">
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

      {/* 3. Privates, Duets & Trios — opens the modal */}
      {apparatus.some((g) => g.single || g.five || g.ten) && (
        <div className="bg-warm-white py-20 lg:py-24 border-t border-charcoal/5">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-12">
              <p className="text-[10px] tracking-[0.4em] uppercase text-accent mb-4">
                By Appointment
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal mb-4">
                Privates, Duets &amp; Trios.
              </h2>
              <p className="text-muted text-base leading-relaxed max-w-xl mx-auto">
                The full classical apparatus, built around you. Single sessions
                or packs of 5 or 10 — all packs expire 6 months after purchase.
              </p>
            </div>

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
                    <p className="text-xs text-muted mb-5">{g.note}</p>

                    <div className="space-y-2 border-t border-charcoal/5 pt-4 mb-5">
                      {g.single?.price !== undefined && (
                        <div className="flex justify-between items-baseline text-sm">
                          <span className="text-muted">Single</span>
                          <span className="text-charcoal font-medium">${g.single.price}</span>
                        </div>
                      )}
                      {g.five?.price !== undefined && (
                        <div className="flex justify-between items-baseline text-sm">
                          <span className="text-muted">5-pack</span>
                          <span className="text-right">
                            <span className="text-charcoal font-medium">${g.five.price}</span>
                            <span className="block text-[11px] text-muted/70">
                              ${Math.ceil(g.five.price / 5)}/class
                            </span>
                          </span>
                        </div>
                      )}
                      {g.ten?.price !== undefined && (
                        <div className="flex justify-between items-baseline text-sm">
                          <span className="text-muted">10-pack</span>
                          <span className="text-right">
                            <span className="text-charcoal font-medium">${g.ten.price}</span>
                            <span className="block text-[11px] text-muted/70">
                              ${Math.ceil(g.ten.price / 10)}/class
                            </span>
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-center">
              <PackPickerModal buttonLabel="Buy a Pack" groups={apparatus} />
            </div>
          </div>
        </div>
      )}

      {/* 4. Return to Life Series */}
      {rtl.length > 0 && (
        <div className="py-20 lg:py-24 border-t border-charcoal/5">
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-12">
              <p className="text-[10px] tracking-[0.4em] uppercase text-accent mb-4">
                8-Week Course Series
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal mb-4">
                Return to Life.
              </h2>
              <p className="text-muted text-base leading-relaxed max-w-lg mx-auto">
                A structured, progressive series that builds your classical mat
                practice from the ground up. Runs once per quarter — eight weeks,
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
                    <p className="text-xs text-accent mb-3">{c.level}</p>
                  )}
                  <div className="mt-auto pt-4 border-t border-charcoal/5 flex items-center justify-between">
                    <span className="text-[10px] tracking-widest uppercase text-accent group-hover:text-accent/80 transition-colors">
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

      {/* 5. More options — anything in Momence that didn't fit the known buckets */}
      {others.length > 0 && (
        <div className="bg-warm-white py-16 lg:py-20 border-t border-charcoal/5">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-10">
              <p className="text-[10px] tracking-[0.4em] uppercase text-accent mb-4">
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
                    <span className="text-[10px] tracking-widest uppercase text-accent group-hover:text-accent/80 transition-colors">
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
