import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Booking",
  description:
    "Three ways into Boomerang. Book a class, book a private session, or grab a membership. Durham, NC.",
};

// Three ways to book. Keep in sync with the Booking dropdown in Navigation.tsx.
// /schedule needs a hard nav (Momence plugin state survives soft nav).
type BookingOption = {
  href: string;
  label: string;
  hint: string;
  hardNav?: boolean;
  icon: React.ReactNode;
};

const bookingOptions: BookingOption[] = [
  {
    href: "/schedule",
    label: "Class Schedule",
    hint: "See what's on the calendar",
    hardNav: true,
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.25} viewBox="0 0 24 24">
        <rect x="3" y="5" width="18" height="16" rx="1.5" />
        <path d="M3 9h18M8 3v4M16 3v4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: "/privates",
    label: "Privates, Duets & Trios",
    hint: "One-on-one or with friends",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.25} viewBox="0 0 24 24">
        <circle cx="9" cy="8" r="3" />
        <circle cx="17" cy="9" r="2.5" />
        <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M14 20c0-2.5 1.8-4.5 4-4.5s4 2 4 4.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: "/packs",
    label: "Memberships + Pricing",
    hint: "Monthly memberships and packs",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.25} viewBox="0 0 24 24">
        <rect x="3" y="6" width="18" height="13" rx="1.5" />
        <path d="M3 10h18M7 15h4" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function Booking() {
  return (
    <>
      {/* Hero. Header + one big photo */}
      <section className="pt-28 lg:pt-36 pb-12 lg:pb-16 bg-warm-white">
        <div className="max-w-2xl mx-auto px-6 text-center mb-12">
          <h1
            className="font-serif text-5xl md:text-6xl font-light text-charcoal leading-tight animate-fade-up"
            style={{ animationDelay: "0.15s" }}
          >
            Come move with us.
          </h1>
          <div
            className="w-12 h-px bg-accent mx-auto mt-8 mb-6 animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          />
          <p
            className="text-base md:text-lg text-muted leading-relaxed max-w-md mx-auto animate-fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            Whatever you&apos;re after, we&apos;ve got a way in. Pick whichever fits.
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-6">
          <div className="relative w-full aspect-[4/5] sm:aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-sm">
            <Image
              src="/photo-booking-hero.jpg"
              alt="Classical Pilates at Boomerang"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1152px"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Icon tiles. Three across on desktop, stacked on mobile. */}
      <section className="py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {bookingOptions.map((opt) => {
              const Tag = opt.hardNav ? "a" : Link;
              return (
                <Tag
                  key={opt.href}
                  href={opt.href}
                  className="group flex flex-col items-center text-center bg-white border border-charcoal/10 rounded-sm px-6 py-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-accent/40"
                >
                  <div className="text-accent mb-4 transition-transform duration-300 group-hover:scale-110">
                    {opt.icon}
                  </div>
                  <h2 className="font-serif text-lg font-light text-charcoal mb-1 leading-snug">
                    {opt.label}
                  </h2>
                  <p className="text-sm text-muted mb-4">{opt.hint}</p>
                  <span className="mt-auto text-[11px] tracking-widest uppercase text-accent group-hover:text-accent/80 transition-colors flex items-center gap-1">
                    <span>Go</span>
                    <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                  </span>
                </Tag>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ footnote */}
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
