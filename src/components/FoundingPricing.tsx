"use client";

import Button from "./Button";

const memberships = [
  {
    name: "Unlimited Mat",
    price: "$199",
    perClass: "As low as $12/class",
    highlight: true,
  },
  {
    name: "2x/Week Mat",
    price: "$150",
    perClass: "$18.75/class",
    highlight: false,
  },
  {
    name: "1x/Week Group Tower",
    price: "$120",
    perClass: "$30/class",
    highlight: false,
  },
  {
    name: "Tower + Mat Combo",
    price: "$200",
    perClass: "$25/class",
    highlight: true,
  },
];

const packs = [
  { name: "5-Pack Privates", price: "$500", perSession: "$100/session" },
  { name: "10-Pack Privates", price: "$900", perSession: "$90/session" },
  { name: "5-Pack Duets", price: "$275", perSession: "$55/person" },
  { name: "10-Pack Duets", price: "$500", perSession: "$50/person" },
];

export default function FoundingPricing() {
  return (
    <div id="founding" className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <span className="text-[10px] tracking-widest uppercase text-accent bg-accent/10 px-3 py-1.5 rounded-sm">
          Limited to First 50 Members · 3-Month Minimum
        </span>
        <h2 className="font-serif text-2xl md:text-3xl font-light text-charcoal mt-5 mb-3">
          Lock In Your Rate Forever
        </h2>
        <p className="text-sm text-muted max-w-lg mx-auto">
          These rates disappear once we open. Your price never goes up.
          Plus exclusive invites to our soft opening and celebratory events.
        </p>
      </div>

      {/* Membership tiers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {memberships.map((tier) => (
          <div
            key={tier.name}
            className={`relative p-7 rounded-sm border text-center ${
              tier.highlight
                ? "border-accent/30 bg-white shadow-sm"
                : "border-charcoal/10 bg-white"
            }`}
          >
            <h3 className="font-serif text-lg font-light text-charcoal mb-4">
              {tier.name}
            </h3>
            <div className="flex items-baseline justify-center gap-2 mb-1">
              <span className="font-serif text-3xl font-light text-charcoal">
                {tier.price}
              </span>
              <span className="text-sm text-muted">/mo</span>
            </div>
            <p className="text-xs text-accent">{tier.perClass}</p>
          </div>
        ))}
      </div>

      {/* Class Packs */}
      <h3 className="font-serif text-xl font-light text-charcoal mb-6 text-center">
        Founding Class Packs
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {packs.map((pack) => (
          <div key={pack.name} className="bg-white border border-charcoal/10 rounded-sm p-5 flex items-baseline justify-between">
            <div>
              <p className="font-serif text-base font-light text-charcoal">{pack.name}</p>
              <p className="text-xs text-muted">{pack.perSession} · 12-month expiry</p>
            </div>
            <span className="font-serif text-xl font-light text-charcoal">{pack.price}</span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center">
        <Button href="/#waitlist">Join as Founding Member</Button>
      </div>
    </div>
  );
}
