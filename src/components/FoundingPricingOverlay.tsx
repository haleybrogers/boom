"use client";

import { useState } from "react";

// TODO: Replace with actual Arketa membership purchase URLs when available
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
  const [minimized, setMinimized] = useState(false);

  return (
    <div className="mb-10">
      {/* Minimized state — just a banner */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          minimized ? "max-h-16 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <button
          onClick={() => setMinimized(false)}
          className="w-full flex items-center justify-between bg-accent/5 border border-accent/15 rounded-sm px-5 py-3 group hover:border-accent/30 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-[10px] tracking-widest uppercase text-accent bg-accent/10 px-2 py-0.5 rounded-sm">
              Founding Rates
            </span>
            <span className="text-sm text-charcoal">Lock in your rate forever — limited to first 50 members</span>
          </div>
          <span className="text-xs text-accent group-hover:text-accent/80 transition-colors">
            Show ↓
          </span>
        </button>
      </div>

      {/* Expanded state — full pricing */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          minimized ? "max-h-0 opacity-0" : "max-h-[800px] opacity-100"
        }`}
      >
        <div className="bg-white border border-charcoal/10 rounded-sm px-6 sm:px-10 py-8 sm:py-10 shadow-sm">
          <div className="text-center mb-6">
            <span className="text-[10px] tracking-widest uppercase text-accent bg-accent/10 px-3 py-1.5 rounded-sm">
              Limited to First 50 Members
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-light text-charcoal mt-4 mb-2">
              Lock In Your Rate Forever
            </h2>
            <p className="text-xs text-muted max-w-sm mx-auto">
              The first 50 members set the tone for this studio. Your rate never goes up — and you&apos;re in from day one.
            </p>
          </div>

          {/* 2x2 grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {memberships.map((tier) => (
              <a
                key={tier.name}
                href={MEMBERSHIP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`group p-4 rounded-sm border text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer ${
                  tier.highlight
                    ? "border-accent/20 bg-accent/3 hover:border-accent/40"
                    : "border-charcoal/8 bg-white hover:border-accent/20"
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
                <span className="inline-block text-[9px] tracking-wide uppercase text-accent bg-accent/10 px-2 py-0.5 rounded-sm mt-1.5">
                  {tier.savings}
                </span>
                <p className="text-[9px] tracking-widest uppercase text-charcoal/0 group-hover:text-accent mt-2 transition-colors duration-200">
                  Select →
                </p>
              </a>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <p className="text-[10px] text-muted/50">3-month minimum commitment</p>
            <button
              onClick={() => setMinimized(true)}
              className="text-[10px] tracking-widest uppercase text-muted/50 hover:text-charcoal transition-colors"
            >
              Minimize ↑
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
