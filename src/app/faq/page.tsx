import Link from "next/link";
import FAQ from "@/components/FAQ";

export const metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about Boomerang Pilates in Durham, NC. How to book, cancellation, parking, what to wear, mat vs. Apparatus, and more.",
};

export default function FaqPage() {
  return (
    <section className="pt-28 lg:pt-36 pb-20 lg:pb-28 bg-warm-white">
      <div className="max-w-5xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-[11px] tracking-[0.4em] uppercase text-accent mb-5 animate-fade-up" style={{ animationDelay: "0.05s" }}>
            Common Questions
          </p>
          <h1 className="font-serif text-5xl md:text-6xl font-light text-charcoal leading-tight animate-fade-up" style={{ animationDelay: "0.15s" }}>
            FAQ
          </h1>
          <div className="w-12 h-px bg-accent mx-auto mt-8 animate-fade-up" style={{ animationDelay: "0.3s" }} />
        </div>

        {/* Lead with the studio. Address + arrival logistics first */}
        <div className="max-w-2xl mx-auto mb-20">
          <div className="text-center mb-12 pb-12 border-b border-charcoal/10">
            <p className="text-sm tracking-widest uppercase text-accent mb-3">
              The Studio
            </p>
            <a
              href="https://maps.google.com/?q=345+W+Main+St+Durham+NC"
              target="_blank"
              rel="noopener noreferrer"
              className="font-serif text-xl md:text-2xl font-light text-charcoal hover:text-accent transition-colors leading-snug"
            >
              345 W Main St, Unit 2 (upstairs)
              <br />
              Durham, NC 27701
            </a>
            <p className="text-sm text-muted mt-3">Tap the address for directions.</p>
          </div>

          {/* Detail blocks. Placeholders Emilie can fill in */}
          <div className="space-y-10">
            <div>
              <h3 className="font-serif text-xl font-light text-charcoal mb-3">
                Where to park
              </h3>
              <p className="text-base text-muted leading-relaxed">
                Free street parking along Ramseur St. Paid parking in the lot
                directly behind the studio and in the Five Points parking
                deck. Paid spots on W. Main St too.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-xl font-light text-charcoal mb-3">
                Getting here
              </h3>
              <p className="text-base text-muted leading-relaxed">
                We&apos;re on West Main Street in the heart of downtown Durham ,
                walkable from Brightleaf, Five Points, and the American Tobacco
                Campus. Specific transit + bike routes coming soon.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-xl font-light text-charcoal mb-3">
                When you arrive
              </h3>
              <p className="text-base text-muted leading-relaxed">
                We&apos;re upstairs. Top of the stairs, door on the left.
                Arrive 10–15 minutes before your first class so you have time
                to park, get settled, get set up with props, and meet your
                instructor before we start.
              </p>
            </div>
          </div>
        </div>

        {/* FAQs. Logistics visible at the top; beginner Qs nested in a "Never done Pilates before?" dropdown */}
        <FAQ />

        {/* Pre-opening CTA */}
        <div className="max-w-2xl mx-auto mt-16 pt-12 border-t border-charcoal/10 text-center">
          <p className="text-muted text-sm leading-relaxed mb-6 max-w-md mx-auto">
            Don&apos;t want to wait until July? We&apos;re running pop-up
            classes around town until then.
          </p>
          <Link
            href="/events"
            className="btn-animated inline-block bg-accent text-white text-sm tracking-widest uppercase px-8 py-3.5 hover:bg-accent/90 transition-colors"
          >
            Find a pop-up class →
          </Link>
        </div>
      </div>
    </section>
  );
}
