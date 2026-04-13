"use client";

import { useState } from "react";
import Link from "next/link";

const packs = [
  {
    name: "Mat Drop-In",
    price: "$25",
    detail: "Single class",
    description: "No commitment. Walk in, take a mat class, walk out. Good for trying us out or dropping in when your schedule allows.",
  },
  {
    name: "5-Pack Mat",
    price: "$110",
    savings: "Save $15",
    detail: "$22/class",
    description: "Five mat classes to use on your schedule. Great if you come once a week or want to test the waters before committing to a membership.",
  },
  {
    name: "10-Pack Mat",
    price: "$200",
    savings: "Save $50",
    detail: "$20/class",
    description: "Ten mat classes at the best per-class rate outside of a membership. Use them at your own pace — valid for 6 months from purchase.",
  },
  {
    name: "Unlimited Mat",
    price: "$249",
    savings: "Best Value",
    detail: "Unlimited classes/mo",
    description: "Unlimited mat classes every month. Come as often as you want — the more you show up, the less each class costs. Month-to-month, cancel anytime.",
  },
  {
    name: "Apparatus Drop-In",
    price: "$45",
    detail: "Single class · 3 spots",
    description: "One small-group apparatus class — reformer, tower, barrels, or chair. Three students max with hands-on instruction.",
  },
  {
    name: "5-Pack Apparatus",
    price: "$200",
    savings: "Save $25",
    detail: "$40/class",
    description: "Five apparatus classes. Perfect for supplementing a mat membership or building a consistent apparatus practice without a monthly commitment.",
  },
  {
    name: "10-Pack Apparatus",
    price: "$375",
    savings: "Save $75",
    detail: "$37.50/class",
    description: "Ten apparatus classes — our best per-class value for apparatus outside of a membership. Valid for 6 months from purchase.",
  },
  {
    name: "Unlimited Apparatus",
    price: "$349",
    savings: "Best Value",
    detail: "Unlimited classes/mo",
    description: "Unlimited small-group apparatus classes every month. Three spots per class, hands-on instruction every time. Month-to-month, cancel anytime.",
  },
];

export default function ClassPacks() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="font-serif text-2xl md:text-3xl font-light text-charcoal mb-3">
          Class Packs &amp; Drop-Ins
        </h2>
        <p className="text-muted text-sm max-w-md mx-auto">
          Not ready for a membership? Buy single classes or packs at a discount.
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {packs.map((pack) => (
          <button
            key={pack.name}
            onClick={() => setExpanded(expanded === pack.name ? null : pack.name)}
            className={`group text-left bg-white border rounded-sm p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
              expanded === pack.name
                ? "border-accent/30 shadow-md"
                : "border-charcoal/10"
            }`}
          >
            <div className="flex items-baseline justify-between mb-1">
              <h3 className="font-serif text-base font-light text-charcoal">
                {pack.name}
              </h3>
              <span className="font-serif text-xl font-light text-charcoal ml-2">
                {pack.price}
              </span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-muted">{pack.detail}</span>
              {pack.savings && (
                <span className="text-[10px] tracking-wide uppercase text-accent bg-accent/10 px-1.5 py-0.5 rounded-sm">
                  {pack.savings}
                </span>
              )}
            </div>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                expanded === pack.name
                  ? "max-h-32 opacity-100 mt-3 pt-3 border-t border-charcoal/5"
                  : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-sm text-muted leading-relaxed">
                {pack.description}
              </p>
            </div>
            <div className={`mt-3 text-[10px] tracking-widest uppercase transition-colors ${
              expanded === pack.name ? "text-accent" : "text-charcoal/30 group-hover:text-accent/60"
            }`}>
              {expanded === pack.name ? "Less ↑" : "Details ↓"}
            </div>
          </button>
        ))}
      </div>

      <div className="text-center mt-10">
        <Link
          href="#founding"
          className="link-arrow text-xs tracking-widest uppercase text-accent hover:text-accent/80 transition-colors"
        >
          Or save more with a founding membership
        </Link>
      </div>
    </div>
  );
}
