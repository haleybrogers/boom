import Image from "next/image";
import Link from "next/link";
import ContactFormModal from "@/components/ContactFormModal";
import FoundingCountdown from "@/components/FoundingCountdown";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "Founding Members",
  description:
    "Become a founding member at Boomerang Pilates — 25% off mat for life, opening night invite, welcome kit, and intro privates. 15 spots per tier. Ends July 13, 2026.",
};

// Mat tiers, mirrored from /packs so the two pages stay in sync.
// Founding rate is 25% off the regular price and locks in for life
// as long as the membership stays active.
const matMemberships = [
  {
    name: "4× Month Mat",
    tagline: "Twice a week-ish",
    founding: 60,
    regular: 80,
  },
  {
    name: "8× Month Mat",
    tagline: "The sweet spot",
    founding: 110,
    regular: 150,
    featured: true,
  },
  {
    name: "Unlimited Mat",
    tagline: "All the mat, all the time",
    founding: 149,
    regular: 199,
  },
];

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
      "Three introductory privates for $180 — meet the apparatus with one of us before you bring it into class.",
  },
  {
    title: "Bring-a-Friend Pass",
    detail:
      "One free mat class for a friend each month, for your first three months.",
  },
];

export default function Founding() {
  return (
    <>
      {/* Hero — full-bleed founding photo with overlaid kicker, headline, countdown */}
      <section className="relative h-[80vh] min-h-[560px] overflow-hidden">
        <Image
          src="/photo-founding-hero.jpg"
          alt="Founding moments at Boomerang Pilates"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/20 via-charcoal/10 to-charcoal/60" />

        <div className="relative h-full flex items-end">
          <div className="max-w-6xl mx-auto px-6 pb-16 lg:pb-24 w-full">
            <div className="max-w-2xl text-white">
              <p className="text-[10px] tracking-[0.4em] uppercase text-white/90 mb-5 animate-fade-up-lux" style={{ animationDelay: "0.3s" }}>
                Founding Member · Ends July 13, 2026
              </p>
              <h1 className="font-serif text-5xl md:text-7xl font-light leading-[1.05] mb-6 animate-fade-up-lux" style={{ animationDelay: "0.5s" }}>
                Be one of the first.
              </h1>
              <p className="text-white/85 text-base md:text-lg leading-relaxed max-w-xl animate-fade-up-lux" style={{ animationDelay: "0.7s" }}>
                15 founding spots at each tier. 25% off your mat membership for
                life. The best deal we&apos;ll ever run, and the only chance to
                be in the room on opening night.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Countdown band — small, urgent, sits just under the hero */}
      <section className="bg-cream/60 border-y border-accent/10 py-8">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <FoundingCountdown showLabel={true} />
        </div>
      </section>

      {/* The story — intimate photo + the why */}
      <section className="py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="flex flex-col md:flex-row gap-10 md:gap-16 items-center">
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
              <p className="text-xs tracking-widest uppercase text-accent mb-4">
                Why founding
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal leading-tight mb-5">
                The people in the room first build the room.
              </h2>
              <p className="text-muted text-base leading-relaxed mb-4">
                A studio is only as good as the regulars who keep showing up
                for it. We&apos;re looking for the people who&apos;ll set the
                tone — the ones who&apos;ll know each other&apos;s names by
                week three, who&apos;ll request the same teacher, who&apos;ll
                drag a friend along.
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

      {/* The perks — 4-up grid on warm white */}
      <section className="bg-warm-white py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal className="text-center mb-14">
            <p className="text-[10px] tracking-[0.4em] uppercase text-accent mb-4">
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
                <p className="text-[10px] tracking-[0.3em] uppercase text-accent mb-3">
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

      {/* Mat photo + pricing intro */}
      <section className="py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="flex flex-col md:flex-row-reverse gap-10 md:gap-16 items-center">
            <div className="relative w-full md:w-1/2 aspect-[4/5] overflow-hidden">
              <Image
                src="/photo-founding-mat.jpg"
                alt="Mat class at Boomerang Pilates"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="w-full md:w-1/2">
              <p className="text-xs tracking-widest uppercase text-accent mb-4">
                The pricing
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal leading-tight mb-5">
                25% off mat. For life.
              </h2>
              <p className="text-muted text-base leading-relaxed mb-4">
                Three tiers — pick the one that matches how often you&apos;ll
                actually show up. Your founding rate locks in the moment you
                join and never goes up, as long as your membership stays
                active.
              </p>
              <p className="text-muted text-base leading-relaxed">
                Three-month commitment to start. Up to four unused classes
                roll over each month. Mat only — apparatus, privates, and
                duets have their own pricing.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Pricing cards — same layout as /packs */}
      <section className="bg-warm-white py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {matMemberships.map((m) => (
              <div
                key={m.name}
                className={`flex flex-col bg-white rounded-sm p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
                  m.featured
                    ? "border-2 border-accent/50 shadow-sm"
                    : "border border-charcoal/10"
                }`}
              >
                {m.featured && (
                  <p className="text-[10px] tracking-[0.25em] uppercase text-accent mb-3">
                    Most popular
                  </p>
                )}
                <h3 className="font-serif text-xl font-light text-charcoal mb-1">
                  {m.name}
                </h3>
                <p className="text-xs text-muted mb-5">{m.tagline}</p>

                <div className="border-t border-charcoal/5 pt-4 mb-3">
                  <p className="text-[10px] tracking-widest uppercase text-accent mb-1">
                    Founding
                  </p>
                  <p className="font-serif text-3xl font-light text-charcoal">
                    ${m.founding}
                    <span className="text-sm text-muted font-sans">/mo</span>
                  </p>
                </div>

                <div className="pt-2">
                  <p className="text-[10px] tracking-widest uppercase text-muted mb-1">
                    Regular
                  </p>
                  <p className="font-serif text-lg font-light text-muted/70 line-through decoration-accent/50 decoration-1">
                    ${m.regular}
                    <span className="text-xs text-muted/70 font-sans">/mo</span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-muted">
            15 founding spots at each tier. Once they&apos;re gone, they&apos;re gone.
          </p>
        </div>
      </section>

      {/* The fine print — small, honest, easy to scan */}
      <section className="py-20 lg:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal>
            <p className="text-[10px] tracking-[0.4em] uppercase text-accent mb-4 text-center">
              The fine print
            </p>
            <h2 className="font-serif text-2xl md:text-3xl font-light text-charcoal text-center mb-10">
              The honest details.
            </h2>

            <dl className="divide-y divide-charcoal/10 border-y border-charcoal/10">
              <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2 sm:gap-8 py-5">
                <dt className="text-xs tracking-widest uppercase text-accent">
                  Deadline
                </dt>
                <dd className="text-sm text-muted leading-relaxed">
                  Founding pricing is available until July 13, 2026, or the
                  day we open — whichever comes first.
                </dd>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2 sm:gap-8 py-5">
                <dt className="text-xs tracking-widest uppercase text-accent">
                  Spots
                </dt>
                <dd className="text-sm text-muted leading-relaxed">
                  15 founding members at each tier (4×, 8×, and Unlimited).
                  45 total. First come, first locked.
                </dd>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2 sm:gap-8 py-5">
                <dt className="text-xs tracking-widest uppercase text-accent">
                  Commitment
                </dt>
                <dd className="text-sm text-muted leading-relaxed">
                  Three months to start. After that, month to month. Up to
                  four unused classes roll over each month.
                </dd>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2 sm:gap-8 py-5">
                <dt className="text-xs tracking-widest uppercase text-accent">
                  Mat only
                </dt>
                <dd className="text-sm text-muted leading-relaxed">
                  Founding pricing applies to mat memberships. Apparatus
                  classes, privates, and duets have separate pricing.
                </dd>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2 sm:gap-8 py-5">
                <dt className="text-xs tracking-widest uppercase text-accent">
                  Forever, with a catch
                </dt>
                <dd className="text-sm text-muted leading-relaxed">
                  Your rate stays put as long as your membership stays
                  active. Pause or cancel and the founding rate is gone — you
                  can re-join later at the regular price.
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Final CTA — primary lock-in via /packs, secondary waitlist */}
      <section className="bg-accent/5 border-t border-accent/15 py-20 lg:py-28">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <Reveal>
            <p className="text-[10px] tracking-[0.4em] uppercase text-accent mb-5">
              Ready
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-charcoal leading-tight mb-5">
              Lock in your spot.
            </h2>
            <p className="text-muted text-base leading-relaxed mb-8 max-w-md mx-auto">
              Live pricing pulled from our booking system. Pick a tier, lock
              in your rate, and we&apos;ll see you on opening night.
            </p>

            <Link
              href="/packs"
              className="btn-animated inline-block bg-accent text-white text-xs tracking-widest uppercase px-10 py-4 hover:bg-accent/90 transition-colors mb-5"
            >
              See Founding Pricing
            </Link>

            <div className="text-xs text-muted/80">
              <span>Not ready yet? </span>
              <ContactFormModal
                buttonLabel="Join the waitlist"
                buttonClassName="text-xs text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent transition-colors"
                heading="Stay in the loop."
                subhead="Grand opening details, founding spot openings, and the stuff we only share with our people."
                source="founding-page"
                sourceId={204540}
                showMessage={false}
                showPhone={true}
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
