"use client";

import { useState } from "react";
import Link from "next/link";

const MEMBERSHIP_URL = "https://app.arketa.co/boomerangpilates/memberships";

type Pack = {
  name: string;
  price: string;
  savings?: string;
  detail: string;
  description: string;
  group: "mat" | "apparatus";
};

const packs: Pack[] = [
  {
    name: "Mat Drop-In",
    price: "$25",
    detail: "Single class",
    description: "No commitment. Walk in, take a mat class, walk out. Good for trying us out or dropping in when your schedule allows.",
    group: "mat",
  },
  {
    name: "5-Pack Mat",
    price: "$110",
    savings: "Save $15",
    detail: "$22/class",
    description: "Five mat classes to use on your schedule. Great if you come once a week or want to test the waters before committing to a membership.",
    group: "mat",
  },
  {
    name: "10-Pack Mat",
    price: "$200",
    savings: "Save $50",
    detail: "$20/class",
    description: "Ten mat classes at the best per-class rate outside of a membership. Use them at your own pace — valid for 6 months from purchase.",
    group: "mat",
  },
  {
    name: "Unlimited Mat",
    price: "$249",
    savings: "Best Value",
    detail: "Unlimited classes/mo",
    description: "Unlimited mat classes every month. Come as often as you want — the more you show up, the less each class costs. Month-to-month, cancel anytime.",
    group: "mat",
  },
  {
    name: "Apparatus Drop-In",
    price: "$45",
    detail: "Single class · 3 spots",
    description: "One small-group apparatus class — reformer, tower, barrels, or chair. Three students max with hands-on instruction.",
    group: "apparatus",
  },
  {
    name: "5-Pack Apparatus",
    price: "$200",
    savings: "Save $25",
    detail: "$40/class",
    description: "Five apparatus classes. Perfect for supplementing a mat membership or building a consistent apparatus practice without a monthly commitment.",
    group: "apparatus",
  },
  {
    name: "10-Pack Apparatus",
    price: "$375",
    savings: "Save $75",
    detail: "$37.50/class",
    description: "Ten apparatus classes — our best per-class value for apparatus outside of a membership. Valid for 6 months from purchase.",
    group: "apparatus",
  },
  {
    name: "Unlimited Apparatus",
    price: "$349",
    savings: "Best Value",
    detail: "Unlimited classes/mo",
    description: "Unlimited small-group apparatus classes every month. Three spots per class, hands-on instruction every time. Month-to-month, cancel anytime.",
    group: "apparatus",
  },
];

const privatePacks = [
  {
    name: "Single Private",
    price: "$110",
    detail: "50 min · 1 student",
    description: "One-on-one session on the full range of classical apparatus. Your instructor builds the entire session around you.",
  },
  {
    name: "5-Pack Privates",
    price: "$500",
    savings: "Save $50",
    detail: "$100/session",
    description: "Five private sessions. Build consistency in your practice with personalized instruction. Valid for 6 months from purchase.",
  },
  {
    name: "10-Pack Privates",
    price: "$900",
    savings: "Save $200",
    detail: "$90/session",
    description: "Ten private sessions at our best per-session rate. Ideal for committed practitioners working toward specific goals. Valid for 12 months.",
  },
  {
    name: "Single Duet",
    price: "$60",
    detail: "50 min · per person",
    description: "Bring a partner, friend, or family member. Two students, one instructor, full apparatus. A great way to share the work.",
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
          Buy single classes or packs at a discount.
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {packs.map((pack) => (
          <button
            key={pack.name}
            onClick={() => setExpanded(expanded === pack.name ? null : pack.name)}
            className={`group text-left border rounded-sm p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md border-l-[3px] ${
              expanded === pack.name
                ? "border-accent/30 shadow-md"
                : "border-charcoal/10"
            } ${
              pack.group === "mat"
                ? "bg-white !border-l-charcoal/25"
                : "bg-accent/[0.04] !border-l-accent"
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
                  ? "max-h-40 opacity-100 mt-3 pt-3 border-t border-charcoal/5"
                  : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-sm text-muted leading-relaxed mb-3">
                {pack.description}
              </p>
              <a
                href={MEMBERSHIP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-block text-[10px] tracking-widest uppercase text-accent hover:text-accent/80 transition-colors"
              >
                Buy Now →
              </a>
            </div>
            <div className={`mt-3 text-[10px] tracking-widest uppercase transition-colors ${
              expanded === pack.name ? "text-accent" : "text-charcoal/30 group-hover:text-accent/60"
            }`}>
              {expanded === pack.name ? "Less ↑" : "Details ↓"}
            </div>
          </button>
        ))}
      </div>

      {/* Private Packs */}
      <div className="text-center mt-16 mb-8">
        <h3 className="font-serif text-xl md:text-2xl font-light text-charcoal mb-2">
          Private &amp; Duet Sessions
        </h3>
        <p className="text-muted text-sm max-w-md mx-auto">
          One-on-one or two-on-one instruction on the full classical apparatus.
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {privatePacks.map((pack) => (
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
                  ? "max-h-40 opacity-100 mt-3 pt-3 border-t border-charcoal/5"
                  : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-sm text-muted leading-relaxed mb-3">
                {pack.description}
              </p>
              <a
                href={MEMBERSHIP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-block text-[10px] tracking-widest uppercase text-accent hover:text-accent/80 transition-colors"
              >
                Buy Now →
              </a>
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
