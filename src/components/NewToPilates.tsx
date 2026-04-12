import Link from "next/link";

export default function NewToPilates() {
  return (
    <section className="py-20 lg:py-28 border-t border-charcoal/5">
      <div className="max-w-4xl mx-auto px-6">
        <div className="md:flex md:items-center md:gap-16">
          {/* Left — headline */}
          <div className="md:w-1/2 mb-8 md:mb-0">
            <p className="text-xs tracking-widest uppercase text-accent mb-4">
              New to Pilates?
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal mb-4">
              You belong here.
            </h2>
            <p className="text-muted text-base leading-relaxed">
              Classical Pilates was designed for every body — not just flexible ones.
              The exercises come in a set order, so you always know what&apos;s next.
              If something doesn&apos;t work for your body today, skip it or repeat what does.
              Nothing needs to be watered down to be accessible.
            </p>
          </div>

          {/* Right — start here options */}
          <div className="md:w-1/2 space-y-4">
            <div className="border border-charcoal/10 p-6">
              <h3 className="font-serif text-lg text-charcoal mb-1">Open Level Classical Mat</h3>
              <p className="text-sm text-muted mb-3">
                All levels. Modifications built in. The best place to start.
              </p>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-charcoal">$25</span>
                <Link
                  href="/classes"
                  className="text-xs tracking-widest uppercase text-accent hover:text-accent/80 transition-colors"
                >
                  Learn More &rarr;
                </Link>
              </div>
            </div>

            <div className="border border-charcoal/10 p-6">
              <h3 className="font-serif text-lg text-charcoal mb-1">Return to Life Course I</h3>
              <p className="text-sm text-muted mb-3">
                8-week beginner series. Build your practice from the ground up.
              </p>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-charcoal">$160 for 8 weeks</span>
                <Link
                  href="/classes"
                  className="text-xs tracking-widest uppercase text-accent hover:text-accent/80 transition-colors"
                >
                  Learn More &rarr;
                </Link>
              </div>
            </div>

            <div className="border border-accent/20 bg-accent/5 p-6">
              <h3 className="font-serif text-lg text-charcoal mb-1">Not sure? Start with a private.</h3>
              <p className="text-sm text-muted mb-3">
                One-on-one with an instructor. We&apos;ll figure out the best path for you.
              </p>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-charcoal">$110</span>
                <Link
                  href="/contact"
                  className="text-xs tracking-widest uppercase text-accent hover:text-accent/80 transition-colors"
                >
                  Get in Touch &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
