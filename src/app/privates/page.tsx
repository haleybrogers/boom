import Image from "next/image";
import Link from "next/link";
import PackPickerModal from "@/components/PackPickerModal";
import ContactFormModal from "@/components/ContactFormModal";
import {
  fetchMemberships,
  groupApparatus,
  findIntroPrivates,
  INTRO_PRIVATES_FOUNDING_PRICE,
  MOMENCE_APPOINTMENTS_URL,
  MOMENCE_DEMO_URL,
} from "@/lib/momence";
import { PRIVATES_BOOKABLE, SHOW_FOUNDING } from "@/lib/flags";

export const metadata = {
  title: "Privates, Duets & Trios",
  description:
    "One-on-one, duet, and trio classical Pilates sessions in Durham, NC. Fully customized apparatus work with Emilie and Annie Young.",
};

export default async function Privates() {
  const memberships = await fetchMemberships();
  const apparatus = groupApparatus(memberships);
  const intro = findIntroPrivates(memberships);

  return (
    <>
      {/* Hero. Photo left, intro + CTAs right */}
      <section className="pt-28 lg:pt-36 pb-20 lg:pb-24 bg-warm-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center">
            <div className="relative w-full aspect-[3/4] overflow-hidden">
              <Image
                src="/nav-privates.jpg"
                alt="Private Pilates session at Boomerang"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            <div>
              <p className="text-[11px] tracking-[0.4em] uppercase text-accent mb-5">
                By Appointment
              </p>
              <h1 className="font-serif text-5xl md:text-6xl font-light text-charcoal leading-tight mb-6">
                Privates, duets &amp; trios.
              </h1>
              <div className="w-12 h-px bg-accent mb-6" />
              <p className="text-muted text-base leading-relaxed mb-5">
                The most personalized Pilates experience we offer. Your
                instructor builds every session around your body, your goals,
                and where you are in your practice, using the full range of
                classical apparatus.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8">
                <div>
                  <p className="text-sm text-charcoal font-medium">Private</p>
                  <p className="text-sm text-muted mt-0.5">1 student · 50 min</p>
                </div>
                <div className="sm:border-l sm:border-charcoal/10 sm:pl-4">
                  <p className="text-sm text-charcoal font-medium">Duet</p>
                  <p className="text-sm text-muted mt-0.5">2 students · 50 min</p>
                </div>
                <div className="sm:border-l sm:border-charcoal/10 sm:pl-4">
                  <p className="text-sm text-charcoal font-medium">Trio</p>
                  <p className="text-sm text-muted mt-0.5">3 students · 50 min</p>
                </div>
              </div>

              {PRIVATES_BOOKABLE ? (
                <>
                  <a
                    href={MOMENCE_APPOINTMENTS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-animated inline-block bg-accent text-white text-sm tracking-widest uppercase px-8 py-3.5 hover:bg-accent/90 transition-colors"
                  >
                    Book a Session
                  </a>
                  <p className="text-sm text-muted mt-3">
                    Privates, duets, and trios all bookable here. Opens in a new tab.
                  </p>
                </>
              ) : (
                <>
                  <span
                    className="inline-block bg-cream border border-accent/30 text-accent text-sm tracking-widest uppercase px-8 py-3.5 cursor-default select-none"
                    aria-disabled="true"
                  >
                    Booking Opens Soon
                  </span>
                  <p className="text-sm text-muted mt-3">
                    <ContactFormModal
                      buttonLabel="Sign up to be notified when booking opens →"
                      buttonClassName="text-sm text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent transition-colors"
                      heading="We'll let you know."
                      subhead="Drop your info and we'll text or email you the moment private, duet, and trio bookings open."
                      source="privates-waitlist"
                      sourceId={204540}
                      showMessage={false}
                      showPhone={true}
                    />
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* "New here?" — two-card entry block. Free demo (low commitment)
          + the Intro 3-Pack (the recommended first paid step). Sits
          between the hero and the regular pack pricing so first-time
          visitors have an obvious starting point. */}
      <section className="py-16 lg:py-20 bg-warm-white border-t border-charcoal/5">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-[11px] tracking-[0.4em] uppercase text-accent mb-3">
              New Here?
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal mb-3">
              Two ways to start.
            </h2>
            <p className="text-muted text-base leading-relaxed max-w-xl mx-auto">
              Get on the apparatus before you commit to a pack. Either step
              works — start where you feel comfortable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Free demo card */}
            <a
              href={MOMENCE_DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col bg-white border border-charcoal/15 rounded-sm p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-accent/40"
            >
              <p className="text-[11px] tracking-[0.3em] uppercase text-accent/80 mb-3">
                No commitment
              </p>
              <h3 className="font-serif text-2xl font-light text-charcoal mb-2 leading-snug">
                Free apparatus demo.
              </h3>
              <p className="text-sm text-muted leading-relaxed mb-6 flex-1">
                A short, complimentary intro session on the apparatus with
                one of us. See how it feels, ask anything, decide nothing.
              </p>
              <div className="mt-auto pt-4 border-t border-charcoal/5 flex items-center justify-between">
                <span className="text-[11px] tracking-widest uppercase text-accent group-hover:text-accent/80 transition-colors">
                  Book a free demo
                </span>
                <span className="text-accent group-hover:translate-x-0.5 transition-transform">
                  →
                </span>
              </div>
            </a>

            {/* Intro 3-Pack card — featured treatment so it visually
                leads the pair. Renders even without Momence data so the
                offer doesn't disappear; the link falls back to the
                appointment-reservation page. */}
            <a
              href={intro?.link ?? MOMENCE_APPOINTMENTS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col bg-cream border-2 border-accent rounded-sm p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white text-[10px] tracking-[0.3em] uppercase px-3 py-1 rounded-full whitespace-nowrap">
                Most popular
              </span>
              <p className="text-[11px] tracking-[0.3em] uppercase text-accent mb-3">
                3 private sessions
              </p>
              <h3 className="font-serif text-2xl font-light text-charcoal mb-2 leading-snug">
                {intro?.name ?? "Intro Privates Bundle"}
              </h3>
              <p className="text-sm text-muted leading-relaxed mb-4 flex-1">
                Three private sessions with Emilie or Annie to learn the
                reformer, cadillac, chair, and barrels. The fastest way
                onto the apparatus.
              </p>
              <div className="flex items-baseline gap-2 mb-1">
                <p className="font-serif text-3xl font-light text-charcoal leading-none">
                  ${intro?.price ?? 275}
                </p>
                <p className="text-xs text-muted">for the bundle</p>
              </div>
              {SHOW_FOUNDING && (
                <p className="text-xs text-accent mb-3">
                  <span className="font-medium">${INTRO_PRIVATES_FOUNDING_PRICE}</span>{" "}
                  with founding membership ·{" "}
                  <Link
                    href="/founding"
                    className="underline underline-offset-4 decoration-accent/40 hover:decoration-accent transition-colors"
                  >
                    see details
                  </Link>
                </p>
              )}
              <div className="mt-auto pt-4 border-t border-charcoal/5 flex items-center justify-between">
                <span className="text-[11px] tracking-widest uppercase text-accent">
                  Buy the bundle
                </span>
                <span className="text-accent group-hover:translate-x-0.5 transition-transform">
                  →
                </span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Apparatus pricing. Single / 5-pack / 10-pack, pulled live from Momence */}
      <section className="py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-sm tracking-widest uppercase text-accent mb-4">By Session or Pack</p>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal mb-4">
              Pricing.
            </h2>
            <p className="text-muted text-base leading-relaxed max-w-xl mx-auto">
              Single sessions or packs of 5 or 10. All packs expire 6 months after purchase.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {apparatus.map((g) => {
              const hasAny = g.single || g.five || g.ten;
              if (!hasAny) return null;
              return (
                <div
                  key={g.category}
                  className="flex flex-col bg-white border border-charcoal/10 rounded-sm p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <h3 className="font-serif text-xl font-light text-charcoal mb-1">{g.label}</h3>
                  <p className="text-sm text-muted mb-5">{g.note}</p>

                  <div className="space-y-3 border-t border-charcoal/5 pt-4">
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

          <div className="text-center mt-10">
            <PackPickerModal buttonLabel="Buy a Pack" groups={apparatus} />
          </div>
        </div>
      </section>
    </>
  );
}
