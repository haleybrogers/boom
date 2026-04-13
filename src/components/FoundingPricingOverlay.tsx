"use client";

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

        {/* Clickable 2x2 grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
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

        <p className="text-[10px] text-muted/50 text-center">3-month minimum commitment</p>
      </div>
    </div>
  );
}
