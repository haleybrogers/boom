import Link from "next/link";

export const metadata = {
  title: "Visit",
  description:
    "How to get to Boomerang Pilates — 343 W Main St, Unit 2 (upstairs) in Durham, NC. Parking, transit, and what to expect when you arrive.",
};

// Placeholder content — Emilie still needs to fill in the parking details
// (waiting on Tom, per the original Class Plans doc) and confirm best
// transit / walking notes. Each "TBD" block is here so the page has shape
// and the link in nav goes somewhere real until copy lands.

export default function Visit() {
  return (
    <section className="pt-28 lg:pt-36 pb-20 lg:pb-28 bg-warm-white">
      <div className="max-w-3xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-14">
          <p className="text-[10px] tracking-[0.4em] uppercase text-accent mb-5 animate-fade-up" style={{ animationDelay: "0.05s" }}>
            Finding Us
          </p>
          <h1 className="font-serif text-5xl md:text-6xl font-light text-charcoal leading-tight animate-fade-up" style={{ animationDelay: "0.15s" }}>
            Visit.
          </h1>
          <div className="w-12 h-px bg-accent mx-auto mt-8 mb-6 animate-fade-up" style={{ animationDelay: "0.3s" }} />
          <p className="font-serif italic text-base md:text-lg text-charcoal/70 max-w-md mx-auto animate-fade-up" style={{ animationDelay: "0.4s" }}>
            Downtown Durham. Right above Main Street.
          </p>
        </div>

        {/* Address */}
        <div className="text-center mb-14 pb-14 border-b border-charcoal/10">
          <p className="text-xs tracking-widest uppercase text-accent mb-3">
            The Studio
          </p>
          <a
            href="https://maps.google.com/?q=343+W+Main+St+Durham+NC"
            target="_blank"
            rel="noopener noreferrer"
            className="font-serif text-2xl md:text-3xl font-light text-charcoal hover:text-accent transition-colors leading-snug"
          >
            343 W Main St, Unit 2 (upstairs)
            <br />
            Durham, NC 27701
          </a>
          <p className="text-xs text-muted mt-3">Tap the address for directions.</p>
        </div>

        {/* Detail blocks — placeholders */}
        <div className="space-y-12">
          {/* Parking */}
          <div>
            <h2 className="font-serif text-2xl font-light text-charcoal mb-3">
              Where to park
            </h2>
            <p className="text-base text-muted leading-relaxed">
              Parking details coming soon. We&apos;ll update this page with the
              closest paid lots, free street parking windows, and the spots
              within easy walking distance once we have them mapped.
            </p>
          </div>

          {/* Getting here */}
          <div>
            <h2 className="font-serif text-2xl font-light text-charcoal mb-3">
              Getting here
            </h2>
            <p className="text-base text-muted leading-relaxed">
              We&apos;re on West Main Street in the heart of downtown Durham —
              walkable from Brightleaf, Five Points, and the American Tobacco
              Campus. Specific transit + bike routes coming soon.
            </p>
          </div>

          {/* When you arrive */}
          <div>
            <h2 className="font-serif text-2xl font-light text-charcoal mb-3">
              When you arrive
            </h2>
            <p className="text-base text-muted leading-relaxed">
              Look for Unit 2 — we&apos;re on the second floor. Arrive 5–10
              minutes before your first class so we can show you around, get
              you set up with props, and answer anything before we start.
            </p>
          </div>
        </div>

        {/* CTA back to schedule */}
        <div className="text-center mt-16">
          <Link
            href="/schedule"
            className="btn-animated inline-block bg-accent text-white text-xs tracking-widest uppercase px-8 py-3.5 hover:bg-accent/90 transition-colors"
          >
            See the Schedule
          </Link>
        </div>
      </div>
    </section>
  );
}
