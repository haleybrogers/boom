"use client";

import Link from "next/link";

const memberships = [
  {
    name: "Unlimited Mat",
    price: "$199",
    perClass: "As low as $12/class",
    includes: "Unlimited mat classes per month",
    highlight: true,
  },
  {
    name: "2x/Week Mat",
    price: "$150",
    perClass: "$18.75/class",
    includes: "Up to 8 mat classes per month",
    highlight: false,
  },
  {
    name: "1x/Week Group Tower",
    price: "$120",
    perClass: "$30/class",
    includes: "4 small-group tower classes per month",
    highlight: false,
  },
  {
    name: "Tower + Mat Combo",
    price: "$200",
    perClass: "$25/class",
    includes: "1x tower + 1x mat per week",
    highlight: true,
  },
];

export default function FoundingPricing() {
  return (
    <div id="founding" className="max-w-4xl mx-auto px-6">
      <div className="text-center mb-12">
        <span className="text-[10px] tracking-widest uppercase text-accent bg-accent/10 px-3 py-1.5 rounded-sm">
          Limited to First 50 Members
        </span>
        <h2 className="font-serif text-2xl md:text-3xl font-light text-charcoal mt-5 mb-3">
          Lock In Your Rate Forever
        </h2>
        <p className="text-sm text-muted max-w-lg mx-auto">
          Sign up before we open and your monthly rate never goes up.
          Plus exclusive invites to our soft opening and celebratory events.
        </p>
      </div>

      {/* Membership tiers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {memberships.map((tier) => (
          <div
            key={tier.name}
            className={`group relative p-7 rounded-sm border text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
              tier.highlight
                ? "border-accent/30 bg-white shadow-sm"
                : "border-charcoal/10 bg-white"
            }`}
          >
            <h3 className="font-serif text-lg font-light text-charcoal mb-1">
              {tier.name}
            </h3>
            <p className="text-xs text-muted mb-4">{tier.includes}</p>
            <div className="flex items-baseline justify-center gap-2 mb-1">
              <span className="font-serif text-3xl font-light text-charcoal">
                {tier.price}
              </span>
              <span className="text-sm text-muted">/mo</span>
            </div>
            <p className="text-xs text-accent">{tier.perClass}</p>
            <p className="text-[10px] text-muted/60 mt-3">3-month minimum</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center">
        <Link
          href="#book"
          className="btn-animated inline-block bg-accent text-white text-xs tracking-widest uppercase px-8 py-3.5 hover:bg-accent/90 transition-colors"
        >
          Become a Founding Member
        </Link>
      </div>
    </div>
  );
}
