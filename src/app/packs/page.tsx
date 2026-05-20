import Image from "next/image";
import Link from "next/link";
import FoundingCountdown from "@/components/FoundingCountdown";
import { SHOW_FOUNDING } from "@/lib/flags";

export const metadata = {
  title: "Memberships, Packs & Pricing",
  description:
    "Memberships, privates, apparatus packs, and the Return to Life course series at Boomerang Pilates — Durham, NC.",
};

// Single source of truth for membership pricing. Founding rate is 25% off
// the regular and applies only while SHOW_FOUNDING is true (pre-opening).
const memberships = [
  { name: "4× / Month", tagline: "Twice a week-ish", founding: 60, regular: 80 },
  { name: "8× / Month", tagline: "The sweet spot", founding: 110, regular: 150, featured: true },
  { name: "Unlimited", tagline: "All the mat, all the time", founding: 149, regular: 199 },
];

// Apparatus pricing — packs expire 6 months after purchase. Same data the
// /privates page renders; centralized here so both pages stay in sync.
const apparatus = [
  { label: "Privates", note: "1 student · Full apparatus", single: 110, five: 525, ten: 995 },
  { label: "Duets", note: "2 students · Full apparatus", single: 65, five: 300, ten: 585 },
  { label: "Trios", note: "3 students · Full apparatus", single: 45, five: 200, ten: 375 },
];

const rtlCourses = [
  {
    name: "Course I",
    level: "Beginner · No experience required",
    price: 160,
    blurb:
      "Your foundation. An 8-week progressive series that builds your classical mat practice from the ground up — beginner and intermediate exercises with a focus on breath, center, and flow.",
    meta: "8 weeks · 1×/week · 50 min per session",
  },
  {
    name: "Course II",
    level: "Intermediate · Course I or equivalent required",
    price: 160,
    blurb:
      "The next chapter. Picks up where Course I left off and takes you through the remainder of the 34-exercise classical mat. Focus shifts to concentration, fluidity, and precision.",
    meta: "8 weeks · 1×/week · 50 min per session",
  },
];

export default function Packs() {
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
              Memberships &amp; Pricing
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
              apparatus, and the Return to Life series.
            </p>
          </div>
        </div>
      </div>

      {/* 1. Founding Member — only renders pre-opening */}
      {SHOW_FOUNDING && (
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
              {memberships.map((m) => (
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

            <div className="text-center">
              <Link
                href="/founding"
                className="btn-animated inline-block bg-accent text-white text-xs tracking-widest uppercase px-8 py-3.5 hover:bg-accent/90 transition-colors"
              >
                See Founding Details
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* 2. Membership — regular pricing (mat-only by design; no qualifier needed) */}
      <div className="py-20 lg:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[10px] tracking-[0.4em] uppercase text-accent mb-4">
              02 · Membership
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal mb-4">
              Membership.
            </h2>
            <p className="text-muted text-base leading-relaxed max-w-xl mx-auto">
              Three-month commitment. Up to four unused classes roll over each
              month. Pause anytime after the first three.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {memberships.map((m) => (
              <div
                key={m.name}
                className={`flex flex-col bg-white rounded-sm p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
                  m.featured
                    ? "border-2 border-charcoal/20"
                    : "border border-charcoal/10"
                }`}
              >
                {m.featured && (
                  <p className="text-[10px] tracking-[0.25em] uppercase text-charcoal/60 mb-3">
                    Most popular
                  </p>
                )}
                <h3 className="font-serif text-xl font-light text-charcoal mb-1">
                  {m.name}
                </h3>
                <p className="text-xs text-muted mb-5">{m.tagline}</p>

                <div className="border-t border-charcoal/5 pt-4">
                  <p className="font-serif text-3xl font-light text-charcoal">
                    ${m.regular}
                    <span className="text-sm text-muted font-sans">/mo</span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-muted">
            Prefer to drop in? Single class · <span className="text-charcoal font-medium">$25</span>
          </p>
        </div>
      </div>

      {/* 3. Privates, Duets & Trios */}
      <div className="bg-warm-white py-20 lg:py-24 border-t border-charcoal/5">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[10px] tracking-[0.4em] uppercase text-accent mb-4">
              03 · By Appointment
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
            {apparatus.map((a) => (
              <div
                key={a.label}
                className="flex flex-col bg-white border border-charcoal/10 rounded-sm p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <h3 className="font-serif text-xl font-light text-charcoal mb-1">
                  {a.label}
                </h3>
                <p className="text-xs text-muted mb-5">{a.note}</p>

                <div className="space-y-3 border-t border-charcoal/5 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Single</span>
                    <span className="text-charcoal font-medium">${a.single}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">5-pack</span>
                    <span className="text-charcoal font-medium">${a.five}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">10-pack</span>
                    <span className="text-charcoal font-medium">${a.ten}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/privates"
              className="btn-animated inline-block bg-accent text-white text-xs tracking-widest uppercase px-8 py-3.5 hover:bg-accent/90 transition-colors"
            >
              Book a Session
            </Link>
          </div>
        </div>
      </div>

      {/* 4. Return to Life Series */}
      <div className="py-20 lg:py-24 border-t border-charcoal/5">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[10px] tracking-[0.4em] uppercase text-accent mb-4">
              04 · 8-Week Course Series
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
            {rtlCourses.map((c) => (
              <div
                key={c.name}
                className="flex flex-col border border-charcoal/10 rounded-sm p-7 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-baseline justify-between mb-3">
                  <h3 className="font-serif text-xl font-light text-charcoal">{c.name}</h3>
                  <span className="font-serif text-2xl font-light text-charcoal">${c.price}</span>
                </div>
                <p className="text-xs text-accent mb-3">{c.level}</p>
                <p className="text-sm text-muted leading-relaxed mb-4">{c.blurb}</p>
                <div className="border-t border-charcoal/5 pt-3 mt-auto">
                  <p className="text-xs text-muted">{c.meta}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-sm text-muted mb-4">
              Next session dates coming soon — sign up to be first to know.
            </p>
            <Link
              href="/events"
              className="btn-animated inline-block bg-accent text-white text-xs tracking-widest uppercase px-8 py-3.5 hover:bg-accent/90 transition-colors"
            >
              Return to Life Details
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
