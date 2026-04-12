"use client";

import { useState } from "react";
import Button from "./Button";

const foundingTiers = [
  {
    name: "Founding Mat",
    founding: "$149",
    regular: "$179",
    savings: "$30",
    yearly: "$360",
    includes: ["Unlimited mat classes", "Locked-in rate for life", "First class free"],
    popular: false,
  },
  {
    name: "Founding All-Access",
    founding: "$249",
    regular: "$299",
    savings: "$50",
    yearly: "$600",
    includes: ["Unlimited mat classes", "Unlimited apparatus classes", "Locked-in rate for life", "First class free"],
    popular: true,
  },
];

const singleClass = [
  { name: "Mat Class", price: "$25", detail: "Drop-in · 15 spots · 50 min" },
  { name: "Apparatus Class", price: "$45", detail: "Drop-in · 3 spots · 50 min" },
  { name: "Private Session", price: "$110", detail: "By appointment · 50 min" },
  { name: "Duet Session", price: "$60", detail: "By appointment · Per person · 50 min" },
];

const packs = [
  { name: "5-Class Mat", price: "$110", perClass: "$22" },
  { name: "10-Class Mat", price: "$200", perClass: "$20" },
  { name: "5-Class Apparatus", price: "$200", perClass: "$40" },
  { name: "10-Class Apparatus", price: "$375", perClass: "$37.50" },
];

export default function PricingComparison() {
  const [showPacks, setShowPacks] = useState(false);

  return (
    <>
      {/* Founding Member — the main event */}
      <section id="founding" className="py-24 lg:py-32 bg-warm-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-[10px] tracking-widest uppercase text-accent bg-accent/10 px-3 py-1.5 rounded-sm">
              Limited Time — Founding Members Only
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal mt-5 mb-3">
              Lock In Your Rate Forever
            </h2>
            <p className="text-sm text-muted max-w-lg mx-auto">
              Join before we open and your membership price never goes up. Ever.
              These rates disappear once we launch.
            </p>
          </div>

          {/* Side-by-side founding cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {foundingTiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative p-8 rounded-sm border text-center ${
                  tier.popular
                    ? "border-accent/30 bg-white shadow-sm"
                    : "border-charcoal/10 bg-white"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="text-[10px] tracking-widest uppercase text-white bg-accent px-3 py-1 rounded-sm">
                      Best Value
                    </span>
                  </div>
                )}

                <h3 className="font-serif text-2xl font-light text-charcoal mb-6">
                  {tier.name}
                </h3>

                {/* Price comparison */}
                <div className="mb-6">
                  <div className="flex items-baseline justify-center gap-3">
                    <span className="font-serif text-4xl font-light text-charcoal">
                      {tier.founding}
                    </span>
                    <span className="text-sm text-muted">/mo</span>
                  </div>
                  <div className="mt-1.5 flex items-center justify-center gap-2">
                    <span className="text-sm text-muted line-through">{tier.regular}/mo</span>
                    <span className="text-xs font-medium text-accent">
                      Save {tier.savings}/mo
                    </span>
                  </div>
                  <p className="text-xs text-muted mt-1">
                    That&apos;s {tier.yearly} saved per year
                  </p>
                </div>

                {/* What's included */}
                <ul className="space-y-2.5 mb-8 text-left max-w-[220px] mx-auto">
                  {tier.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-charcoal">
                      <svg className="w-4 h-4 text-accent shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>

                <Button href="/#waitlist">Join as Founding Member</Button>
              </div>
            ))}
          </div>

          {/* Single Class Pricing */}
          <div className="mb-12">
            <h3 className="font-serif text-xl font-light text-charcoal mb-6 text-center">
              Single Class Rates
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {singleClass.map((item) => (
                <div key={item.name} className="bg-white border border-charcoal/10 rounded-sm p-5 text-center">
                  <p className="font-serif text-2xl font-light text-charcoal mb-1">{item.price}</p>
                  <p className="font-serif text-sm text-charcoal mb-0.5">{item.name}</p>
                  <p className="text-[11px] text-muted">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Class Packs — collapsible */}
          <div className="text-center">
            <button
              onClick={() => setShowPacks(!showPacks)}
              className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors"
            >
              Class Packs &amp; Intro Offers
              <svg
                className={`w-4 h-4 transition-transform duration-300 ${showPacks ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div
              className={`overflow-hidden transition-all duration-400 ease-in-out ${
                showPacks ? "max-h-[600px] opacity-100 mt-8" : "max-h-0 opacity-0 mt-0"
              }`}
            >
              <div className="max-w-2xl mx-auto">
                {/* Class packs */}
                <div className="divide-y divide-charcoal/10 border-y border-charcoal/10 mb-8">
                  {packs.map((pack) => (
                    <div key={pack.name} className="py-4 flex items-baseline justify-between">
                      <div>
                        <p className="font-serif text-base font-light text-charcoal">{pack.name}</p>
                        <p className="text-xs text-muted">{pack.perClass}/class · Never expires</p>
                      </div>
                      <span className="font-serif text-lg font-light text-charcoal">{pack.price}</span>
                    </div>
                  ))}
                </div>

                {/* Intro offer */}
                <div className="bg-accent/5 border border-accent/15 rounded-sm p-6 text-center">
                  <p className="text-[10px] tracking-widest uppercase text-accent mb-2">New Here?</p>
                  <p className="font-serif text-xl font-light text-charcoal mb-1">
                    Your first mat class is free.
                  </p>
                  <p className="text-xs text-muted">
                    No strings. Or grab an Intro 3-Pack for $60 ($20/class).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
