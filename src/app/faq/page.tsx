import Link from "next/link";
import FAQ from "@/components/FAQ";

export const metadata = {
  title: "FAQ + Visit",
  description:
    "Frequently asked questions about Boomerang Pilates in Durham, NC — what to wear, how to book, mat vs. apparatus, cancellation policy, plus how to find us.",
};

export default function FaqPage() {
  return (
    <section className="pt-28 lg:pt-36 pb-20 lg:pb-28 bg-warm-white">
      <div className="max-w-5xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-[10px] tracking-[0.4em] uppercase text-accent mb-5 animate-fade-up" style={{ animationDelay: "0.05s" }}>
            Common Questions
          </p>
          <h1 className="font-serif text-5xl md:text-6xl font-light text-charcoal leading-tight animate-fade-up" style={{ animationDelay: "0.15s" }}>
            FAQ
          </h1>
          <div className="w-12 h-px bg-accent mx-auto mt-8 mb-6 animate-fade-up" style={{ animationDelay: "0.3s" }} />
          <p className="font-serif italic text-base md:text-lg text-charcoal/70 max-w-md mx-auto animate-fade-up" style={{ animationDelay: "0.4s" }}>
            Everything we get asked most. Still curious? Drop us a note.
          </p>
        </div>

        <FAQ />

        {/* Visit — merged in so address/parking/getting-here lives in one place */}
        <div className="max-w-2xl mx-auto mt-20 pt-16 border-t border-charcoal/10">
          <div className="text-center mb-12">
            <p className="text-[10px] tracking-[0.4em] uppercase text-accent mb-4">
              Finding Us
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal leading-tight">
              Visit.
            </h2>
          </div>

          {/* Address */}
          <div className="text-center mb-12 pb-12 border-b border-charcoal/10">
            <p className="text-xs tracking-widest uppercase text-accent mb-3">
              The Studio
            </p>
            <a
              href="https://maps.google.com/?q=343+W+Main+St+Durham+NC"
              target="_blank"
              rel="noopener noreferrer"
              className="font-serif text-xl md:text-2xl font-light text-charcoal hover:text-accent transition-colors leading-snug"
            >
              343 W Main St, Unit 2 (upstairs)
              <br />
              Durham, NC 27701
            </a>
            <p className="text-xs text-muted mt-3">Tap the address for directions.</p>
          </div>

          {/* Detail blocks — placeholders Emilie can fill in */}
          <div className="space-y-10">
            <div>
              <h3 className="font-serif text-xl font-light text-charcoal mb-3">
                Where to park
              </h3>
              <p className="text-base text-muted leading-relaxed">
                Parking details coming soon. We&apos;ll update this section
                with the closest paid lots, free street parking windows, and
                the spots within easy walking distance once we have them mapped.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-xl font-light text-charcoal mb-3">
                Getting here
              </h3>
              <p className="text-base text-muted leading-relaxed">
                We&apos;re on West Main Street in the heart of downtown Durham —
                walkable from Brightleaf, Five Points, and the American Tobacco
                Campus. Specific transit + bike routes coming soon.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-xl font-light text-charcoal mb-3">
                When you arrive
              </h3>
              <p className="text-base text-muted leading-relaxed">
                Look for Unit 2 — we&apos;re on the second floor. Arrive 5–10
                minutes before your first class so we can show you around, get
                you set up with props, and answer anything before we start.
              </p>
            </div>
          </div>

          {/* Pre-opening CTA */}
          <div className="mt-16 pt-12 border-t border-charcoal/10 text-center">
            <p className="text-muted text-sm leading-relaxed mb-6 max-w-md mx-auto">
              Don&apos;t want to wait until July? We&apos;re running pop-up
              classes around town until then.
            </p>
            <Link
              href="/events"
              className="btn-animated inline-block bg-accent text-white text-xs tracking-widest uppercase px-8 py-3.5 hover:bg-accent/90 transition-colors"
            >
              Find a pop-up class →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
