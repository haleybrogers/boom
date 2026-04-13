"use client";

import FoundingCountdown from "./FoundingCountdown";

const MEMBERSHIP_URL = "https://app.arketa.co/boomerangpilates/memberships";

const memberships = [
  {
    name: "Unlimited Mat",
    price: "$199",
    perClass: "As low as $12/class",
    includes: "Unlimited mat classes per month",
    savings: "Save $50/mo",
    highlight: true,
  },
  {
    name: "2x/Week Mat",
    price: "$150",
    perClass: "$18.75/class",
    includes: "Up to 8 mat classes per month",
    savings: "Save $50/mo",
    highlight: false,
  },
  {
    name: "1x/Week Group Tower",
    price: "$120",
    perClass: "$30/class",
    includes: "4 small-group tower classes per month",
    savings: "Save $60/mo",
    highlight: false,
  },
  {
    name: "Tower + Mat Combo",
    price: "$200",
    perClass: "$25/class",
    includes: "1x tower + 1x mat per week",
    savings: "Save $80/mo",
    highlight: true,
  },
];

export default function FoundingPricingOverlay() {
  return (
    <div>
      <div className="text-center mb-8">
        <span className="text-[10px] tracking-widest uppercase text-accent bg-accent/10 px-3 py-1.5 rounded-sm">
          Limited to First 50 Members
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl font-light text-charcoal mt-5 mb-3">
          Lock In Your Rate Forever
        </h2>
        <p className="text-sm text-muted max-w-md mx-auto mb-8">
          The first 50 members set the tone for this studio. Your rate never goes up — and you&apos;re in from day one.
        </p>
        <FoundingCountdown />
      </div>

      {/* 2x2 grid */}
      <div className="max-w-3xl mx-auto grid grid-cols-2 gap-4 mb-6">
        {memberships.map((tier) => (
          <a
            key={tier.name}
            href={MEMBERSHIP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`group p-5 rounded-sm border text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer ${
              tier.highlight
                ? "border-accent/20 bg-accent/5 hover:border-accent/40"
                : "border-charcoal/10 bg-white hover:border-accent/20"
            }`}
          >
            <p className="font-serif text-base font-light text-charcoal mb-0.5">
              {tier.name}
            </p>
            <p className="text-xs text-muted mb-3">{tier.includes}</p>
            <div className="flex items-baseline justify-center gap-1">
              <span className="font-serif text-2xl font-light text-charcoal">
                {tier.price}
              </span>
              <span className="text-sm text-muted">/mo</span>
            </div>
            <p className="text-xs text-accent mt-1">{tier.perClass}</p>
            <span className="inline-block text-[9px] tracking-wide uppercase text-accent bg-accent/10 px-2 py-0.5 rounded-sm mt-2">
              {tier.savings}
            </span>
            <p className="text-[10px] tracking-widest uppercase text-charcoal/0 group-hover:text-accent mt-2 transition-colors duration-200">
              Select →
            </p>
          </a>
        ))}
      </div>

      <p className="text-center text-xs text-muted/60">3-month minimum commitment</p>
    </div>
  );
}
