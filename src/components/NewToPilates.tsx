import Link from "next/link";

export default function NewToPilates() {
  return (
    <section className="py-20 lg:py-28 border-t border-charcoal/5">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header — centered */}
        <div className="text-center mb-12">
          <p className="text-xs tracking-widest uppercase text-accent mb-4">
            New to Pilates?
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal mb-3">
            You belong here.
          </h2>
          <p className="text-muted text-base leading-relaxed max-w-lg mx-auto">
            Classical Pilates was designed for every body — not just flexible ones.
            No experience required. Our instructors meet you exactly where you are.
          </p>
        </div>

        {/* Two-path cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Path 1 — Jump right in */}
          <div className="group border border-charcoal/10 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
            {/* Icon — mat silhouette */}
            <div className="w-12 h-12 rounded-full bg-accent/8 flex items-center justify-center mb-5">
              <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 20h16M4 20V10l8-6 8 6v10M4 20h16" />
                <rect x="3" y="18" width="18" height="3" rx="1" fill="currentColor" opacity="0.15" stroke="none" />
                <path strokeLinecap="round" d="M7 18v-4c0-1 .5-2 2-3s3.5-1 5 0 2 2 2 3v4" />
              </svg>
            </div>

            <p className="text-[10px] tracking-widest uppercase text-accent mb-2">
              Jump Right In
            </p>
            <h3 className="font-serif text-xl font-light text-charcoal mb-3">
              Open Level Classical Mat
            </h3>
            <p className="text-sm text-muted leading-relaxed mb-4">
              Group class. All levels. You don&apos;t need to know anything — we&apos;ll guide you through it.
            </p>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="font-serif text-2xl font-light text-charcoal">$25</span>
              <span className="text-xs text-muted">drop-in</span>
            </div>
            <Link
              href="/classes"
              className="btn-animated inline-block bg-charcoal text-white text-xs tracking-widest uppercase px-6 py-3 hover:bg-charcoal/85 transition-colors"
            >
              Book a Mat Class
            </Link>
          </div>

          {/* Path 2 — Get personalized guidance */}
          <div className="group relative border border-accent/20 bg-accent/3 p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
            {/* Recommended badge */}
            <span className="absolute top-4 right-4 text-[9px] tracking-widest uppercase text-accent bg-accent/10 px-2.5 py-1 rounded-sm">
              Recommended
            </span>

            {/* Icon — one-on-one */}
            <div className="w-12 h-12 rounded-full bg-accent/12 flex items-center justify-center mb-5">
              <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
                <circle cx="12" cy="8" r="3.5" />
                <path strokeLinecap="round" d="M6.5 20c0-3 2.5-5.5 5.5-5.5s5.5 2.5 5.5 5.5" />
                <path strokeLinecap="round" d="M16 4l2 2-2 2" opacity="0.5" />
              </svg>
            </div>

            <p className="text-[10px] tracking-widest uppercase text-accent mb-2">
              Get Personalized Guidance
            </p>
            <h3 className="font-serif text-xl font-light text-charcoal mb-3">
              Private Session
            </h3>
            <p className="text-sm text-muted leading-relaxed mb-4">
              One-on-one. We assess where you are and build a plan around your body and your goals.
            </p>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="font-serif text-2xl font-light text-charcoal">$110</span>
              <span className="text-xs text-muted">50 min · full apparatus</span>
            </div>
            <Link
              href="/classes#privates"
              className="btn-animated inline-block bg-accent text-white text-xs tracking-widest uppercase px-6 py-3 hover:bg-accent/90 transition-colors"
            >
              Book a Private
            </Link>
          </div>
        </div>

        {/* Help line */}
        <p className="text-center text-sm text-muted/70 mt-8">
          Not sure?{" "}
          <a
            href="mailto:info@boomerangpilatesnc.com"
            className="text-accent hover:text-accent/80 transition-colors underline underline-offset-2"
          >
            Email us
          </a>
          {" "}or{" "}
          <Link
            href="/classes#faq"
            className="text-accent hover:text-accent/80 transition-colors underline underline-offset-2"
          >
            read our FAQ
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
