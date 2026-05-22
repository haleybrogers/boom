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
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.25} viewBox="0 0 24 24">
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
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.25} viewBox="0 0 24 24">
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
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.25} viewBox="0 0 24 24">
        <rect x="3" y="6" width="18" height="13" rx="1.5" />
        <path d="M3 10h18M7 15h4" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function Booking() {
  return (
    <>
      {/* Split layout. Photo left, header + intro + stacked tiles right. */}
      <section className="pt-28 lg:pt-36 pb-20 lg:pb-28 bg-warm-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-start">
            {/* Photo */}
            <div className="relative w-full aspect-[4/5] overflow-hidden">
              <Image
                src="/photo-booking-hero.jpg"
                alt="Classical Pilates at Boomerang"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            {/* Right column: header + intro + tiles */}
            <div>
              <h1 className="font-serif text-5xl md:text-6xl font-light text-charcoal leading-tight mb-6">
                Come move with us.
              </h1>
              <div className="w-12 h-px bg-accent mb-8" />

              {/* Stacked tiles. Icon left, label + hint middle, arrow right. */}
              <div className="divide-y divide-charcoal/10 border-y border-charcoal/10">
                {bookingOptions.map((opt) => {
                  const Tag = opt.hardNav ? "a" : Link;
                  return (
                    <Tag
                      key={opt.href}
                      href={opt.href}
                      className="group flex items-center gap-4 py-5 transition-colors hover:bg-accent/5 -mx-3 px-3 rounded-sm"
                    >
                      <div className="text-accent shrink-0 transition-transform duration-300 group-hover:scale-110">
                        {opt.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h2 className="font-serif text-lg font-light text-charcoal leading-snug group-hover:text-accent transition-colors">
                          {opt.label}
                        </h2>
                        <p className="text-sm text-muted">{opt.hint}</p>
                      </div>
                      <span className="text-accent group-hover:translate-x-0.5 transition-transform shrink-0">
                        →
                      </span>
                    </Tag>
                  );
                })}
              </div>

              <p className="text-sm text-muted mt-8">
                See the{" "}
                <Link
                  href="/faq"
                  className="text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent transition-colors"
                >
                  FAQ
                </Link>{" "}
                for booking + cancellation details.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
