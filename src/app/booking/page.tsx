import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Booking",
  description:
    "Book a class, a private session, or grab a membership at Boomerang Pilates — Durham, NC.",
};

// Three ways to book — keep in sync with the Booking dropdown in Navigation.tsx.
// /schedule needs a hard nav (Momence plugin state survives soft nav), so it
// renders as a plain <a> instead of a Next <Link>.
const bookingOptions = [
  {
    href: "/schedule",
    image: "/nav-schedule.jpg",
    label: "Class Schedule",
    description:
      "Group mat and apparatus classes — drop in or book ahead. Live from our booking system.",
    cta: "See the schedule",
    hardNav: true,
  },
  {
    href: "/privates",
    image: "/nav-privates.jpg",
    label: "Privates, Duets & Trios",
    description:
      "One-on-one, or with a partner or two. Full apparatus, fully customized to you.",
    cta: "Book a session",
    hardNav: false,
  },
  {
    href: "/packs",
    image: "/nav-packs.jpg",
    label: "Memberships + Pricing",
    description:
      "Monthly mat memberships, apparatus packs, and the Return to Life series — all in one place.",
    cta: "See pricing",
    hardNav: false,
  },
];

export default function Booking() {
  return (
    <section className="pt-28 lg:pt-36 pb-20 lg:pb-28 bg-warm-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-14">
          <p
            className="text-[11px] tracking-[0.4em] uppercase text-accent mb-5 animate-fade-up"
            style={{ animationDelay: "0.05s" }}
          >
            How to Book
          </p>
          <h1
            className="font-serif text-5xl md:text-6xl font-light text-charcoal leading-tight animate-fade-up"
            style={{ animationDelay: "0.15s" }}
          >
            Book a class.
          </h1>
          <div
            className="w-12 h-px bg-accent mx-auto mt-8 mb-6 animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          />
          <p
            className="font-serif italic text-base md:text-lg text-charcoal/70 max-w-md mx-auto animate-fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            Three ways in — pick what fits.
          </p>
        </div>

        {/* Three cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7">
          {bookingOptions.map((opt) => {
            const Tag = opt.hardNav ? "a" : Link;
            return (
              <Tag
                key={opt.href}
                href={opt.href}
                className="group flex flex-col bg-white border border-charcoal/10 rounded-sm overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-accent/30"
              >
                <div className="relative w-full aspect-[4/5] overflow-hidden">
                  <Image
                    src={opt.image}
                    alt={opt.label}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="flex flex-col p-6 flex-1">
                  <h2 className="font-serif text-xl font-light text-charcoal mb-2">
                    {opt.label}
                  </h2>
                  <p className="text-sm text-muted leading-relaxed mb-5 flex-1">
                    {opt.description}
                  </p>
                  <span className="text-[11px] tracking-widest uppercase text-accent group-hover:text-accent/80 transition-colors mt-auto flex items-center justify-between">
                    <span>{opt.cta}</span>
                    <span className="group-hover:translate-x-0.5 transition-transform">
                      →
                    </span>
                  </span>
                </div>
              </Tag>
            );
          })}
        </div>

        {/* Subtle footer note */}
        <p className="text-center text-sm text-muted mt-12 max-w-md mx-auto">
          New here? A $25 mat drop-in is the easiest place to start. See the{" "}
          <Link
            href="/faq"
            className="text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent transition-colors"
          >
            FAQ
          </Link>{" "}
          for booking + cancellation details.
        </p>
      </div>
    </section>
  );
}
