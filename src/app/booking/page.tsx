import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Booking",
  description:
    "Three ways into Boomerang — book a class, book a private session, or grab a membership. Durham, NC.",
};

// Three ways to book — keep in sync with the Booking dropdown in Navigation.tsx.
// /schedule needs a hard nav (Momence plugin state survives soft nav).
const bookingOptions = [
  {
    href: "/schedule",
    kicker: "Take a Class",
    title: "Want to drop in?",
    teaser: "Group mat and apparatus — book live from the schedule.",
    cta: "See the Schedule",
    hardNav: true,
  },
  {
    href: "/privates",
    kicker: "One-on-One",
    title: "Want to book a private?",
    teaser: "Privates, duets, or trios on the full apparatus.",
    cta: "Book a Session",
    hardNav: false,
  },
  {
    href: "/packs",
    kicker: "Memberships + Pricing",
    title: "Questions about pricing?",
    teaser: "Founding rates, memberships, packs — all in one place.",
    cta: "See Pricing",
    hardNav: false,
  },
];

export default function Booking() {
  return (
    <>
      {/* Hero — header + one big photo */}
      <section className="pt-28 lg:pt-36 pb-12 lg:pb-16 bg-warm-white">
        <div className="max-w-3xl mx-auto px-6 text-center mb-12">
          <h1
            className="font-serif text-5xl md:text-6xl font-light text-charcoal leading-tight animate-fade-up"
            style={{ animationDelay: "0.15s" }}
          >
            How to book.
          </h1>
          <div
            className="w-12 h-px bg-accent mx-auto mt-8 mb-6 animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          />
          <p
            className="font-serif italic text-base md:text-lg text-charcoal/70 max-w-md mx-auto animate-fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            Pick what fits.
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-6">
          <div className="relative w-full aspect-[21/9] overflow-hidden rounded-sm">
            <Image
              src="/photo-apparatus.jpg"
              alt="Classical Pilates at Boomerang"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1152px"
            />
          </div>
        </div>
      </section>

      {/* Stacked sections — each a teaser leading to its page */}
      <section className="py-20 lg:py-24">
        <div className="max-w-3xl mx-auto px-6 divide-y divide-charcoal/10">
          {bookingOptions.map((opt) => {
            const Tag = opt.hardNav ? "a" : Link;
            return (
              <div key={opt.href} className="py-12 first:pt-0 last:pb-0">
                <p className="text-[11px] tracking-[0.4em] uppercase text-accent mb-4">
                  {opt.kicker}
                </p>
                <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal leading-tight mb-4">
                  {opt.title}
                </h2>
                <p className="text-base text-muted leading-relaxed mb-6 max-w-xl">
                  {opt.teaser}
                </p>
                <Tag
                  href={opt.href}
                  className="link-arrow inline-block text-sm tracking-widest uppercase text-accent hover:text-accent/80 transition-colors"
                >
                  {opt.cta}
                </Tag>
              </div>
            );
          })}
        </div>
      </section>

      {/* Subtle footer note */}
      <section className="pb-20 lg:pb-28">
        <p className="text-center text-sm text-muted max-w-md mx-auto px-6">
          See the{" "}
          <Link
            href="/faq"
            className="text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent transition-colors"
          >
            FAQ
          </Link>{" "}
          for booking + cancellation details.
        </p>
      </section>
    </>
  );
}
