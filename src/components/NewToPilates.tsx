import Link from "next/link";

export default function NewToPilates() {
  return (
    <section className="py-20 lg:py-28 border-t border-charcoal/5">
      <div className="max-w-4xl mx-auto px-6">
        <div className="md:flex md:items-start md:gap-16">
          {/* Left — headline + more copy to balance */}
          <div className="md:w-1/2 mb-10 md:mb-0">
            <p className="text-xs tracking-widest uppercase text-accent mb-4">
              New to Pilates?
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal mb-5">
              You belong here.
            </h2>
            <p className="text-muted text-base leading-relaxed mb-4">
              Classical Pilates was designed for every body — not just flexible ones.
              The exercises come in a set order, so you always know what&apos;s next.
              If something doesn&apos;t work for your body today, skip it or repeat what does.
            </p>
            <p className="text-muted text-base leading-relaxed mb-4">
              There&apos;s no experience required and nothing to be intimidated by.
              Our instructors meet you exactly where you are — whether that&apos;s
              your first class or your five hundredth.
            </p>
            <p className="text-muted text-base leading-relaxed">
              Not sure where to start? Here are three great entry points.
            </p>
          </div>

          {/* Right — compact start-here options */}
          <div className="md:w-1/2 space-y-3">
            <div className="border border-charcoal/10 p-5">
              <div className="flex items-baseline justify-between mb-1">
                <h3 className="font-serif text-base text-charcoal">Open Level Classical Mat</h3>
                <span className="text-sm font-medium text-charcoal">$25</span>
              </div>
              <p className="text-sm text-muted mb-2">
                All levels. Modifications built in.
              </p>
              <Link
                href="/classes"
                className="link-arrow text-xs tracking-widest uppercase text-accent hover:text-accent/80 transition-colors"
              >
                Learn More
              </Link>
            </div>

            <div className="border border-charcoal/10 p-5">
              <div className="flex items-baseline justify-between mb-1">
                <h3 className="font-serif text-base text-charcoal">Return to Life Course I</h3>
                <span className="text-sm font-medium text-charcoal">$160</span>
              </div>
              <p className="text-sm text-muted mb-2">
                8-week beginner series.
              </p>
              <Link
                href="/classes"
                className="link-arrow text-xs tracking-widest uppercase text-accent hover:text-accent/80 transition-colors"
              >
                Learn More
              </Link>
            </div>

            <div className="border border-accent/20 bg-accent/5 p-5">
              <div className="flex items-baseline justify-between mb-1">
                <h3 className="font-serif text-base text-charcoal">Not sure? Try a private.</h3>
                <span className="text-sm font-medium text-charcoal">$110</span>
              </div>
              <p className="text-sm text-muted mb-2">
                One-on-one. We&apos;ll find the best path for you.
              </p>
              <Link
                href="/classes#privates"
                className="link-arrow text-xs tracking-widest uppercase text-accent hover:text-accent/80 transition-colors"
              >
                Book a Private
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
