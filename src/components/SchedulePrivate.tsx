"use client";

import Link from "next/link";

export default function SchedulePrivate() {
  return (
    <div className="max-w-4xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        {/* Text */}
        <div>
          <p className="text-xs tracking-widest uppercase text-accent mb-3">
            By Appointment
          </p>
          <h2 className="font-serif text-2xl md:text-3xl font-light text-charcoal mb-4">
            Schedule a Private
          </h2>
          <p className="text-muted text-base leading-relaxed mb-4">
            One-on-one sessions on the full apparatus — Reformer, Cadillac, Chair,
            Barrels — tailored entirely to your body and your goals.
          </p>
          <p className="text-muted text-base leading-relaxed mb-6">
            Prefer to bring a partner? Duet sessions give you semi-private
            attention at a more accessible price point.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/#waitlist"
              className="btn-animated inline-block bg-accent text-white text-xs tracking-widest uppercase px-7 py-3.5 hover:bg-accent/90 transition-colors text-center"
            >
              Request a Session
            </Link>
          </div>
        </div>

        {/* Pricing cards */}
        <div className="space-y-4">
          <div className="group bg-white border border-charcoal/10 rounded-sm p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-accent/20">
            <div className="flex items-baseline justify-between mb-2">
              <h3 className="font-serif text-lg font-light text-charcoal">Private Session</h3>
              <span className="font-serif text-2xl font-light text-charcoal">$110</span>
            </div>
            <p className="text-xs text-muted">
              50 minutes · Full apparatus · Completely customized
            </p>
          </div>

          <div className="group bg-white border border-charcoal/10 rounded-sm p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-accent/20">
            <div className="flex items-baseline justify-between mb-2">
              <h3 className="font-serif text-lg font-light text-charcoal">Duet Session</h3>
              <span className="font-serif text-2xl font-light text-charcoal">$60</span>
            </div>
            <p className="text-xs text-muted">
              50 minutes · Full apparatus · Per person · Bring a friend
            </p>
          </div>

          <div className="bg-accent/5 border border-accent/15 rounded-sm p-5">
            <p className="text-xs text-accent font-medium mb-1">Founding Member Rate</p>
            <p className="text-xs text-muted">
              Lock in discounted private &amp; duet rates when you become a founding member.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
