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

export default function FoundingPricingOverlay() {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-4">
      <div className="bg-white/97 backdrop-blur-sm border border-charcoal/10 px-6 sm:px-10 py-8 sm:py-10 shadow-sm max-w-lg w-full">
        <div className="text-center mb-6">
          <span className="text-[10px] tracking-widest uppercase text-accent bg-accent/10 px-3 py-1.5 rounded-sm">
            Limited to First 50 Members
          </span>
          <h2 className="font-serif text-xl sm:text-2xl font-light text-charcoal mt-4 mb-2">
            Lock In Your Rate Forever
          </h2>
          <p className="text-xs text-muted max-w-sm mx-auto">
            Sign up before we open and your monthly rate never goes up.
          </p>
        </div>

        {/* Compact 2x2 grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {memberships.map((tier) => (
            <div
              key={tier.name}
              className={`p-4 rounded-sm border text-center ${
                tier.highlight
                  ? "border-accent/20 bg-accent/3"
                  : "border-charcoal/8 bg-white"
              }`}
            >
              <p className="font-serif text-sm font-light text-charcoal mb-0.5">
                {tier.name}
              </p>
              <p className="text-[10px] text-muted mb-2">{tier.includes}</p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="font-serif text-xl font-light text-charcoal">
                  {tier.price}
                </span>
                <span className="text-[11px] text-muted">/mo</span>
              </div>
              <p className="text-[10px] text-accent mt-0.5">{tier.perClass}</p>
            </div>
          ))}
        </div>

        <p className="text-[10px] text-muted/50 text-center mb-5">3-month minimum commitment</p>

        <div className="text-center">
          <Link
            href="#book"
            className="btn-animated inline-block bg-accent text-white text-xs tracking-widest uppercase px-8 py-3 hover:bg-accent/90 transition-colors"
          >
            Become a Founding Member
          </Link>
        </div>
      </div>
    </div>
  );
}
