"use client";

import { useState } from "react";
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

const singleClass = [
  { name: "Mat Class", price: "$25", detail: "Drop-in · 15 spots · 50 min" },
  { name: "Apparatus Class", price: "$45", detail: "Drop-in · 3 spots · 50 min" },
  { name: "Private Session", price: "$110", detail: "By appointment · 50 min" },
  { name: "Duet Session", price: "$60", detail: "Per person · By appointment" },
];

const packs = [
  { name: "5-Pack Privates", price: "$500", perSession: "$100/session" },
  { name: "10-Pack Privates", price: "$900", perSession: "$90/session" },
  { name: "5-Pack Duets", price: "$275", perSession: "$55/person" },
  { name: "10-Pack Duets", price: "$500", perSession: "$50/person" },
];

const courses = [
  { name: "Return to Life Course I", price: "$160", detail: "8-week beginner series" },
  { name: "Return to Life Course II", price: "$160", detail: "8-week intermediate series" },
];

export default function PricingComparison() {
  const [showPacks, setShowPacks] = useState(false);

  return (
    <>
      <section id="founding" className="py-24 lg:py-32 bg-warm-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-[10px] tracking-widest uppercase text-accent bg-accent/10 px-3 py-1.5 rounded-sm">
              Limited to First 50 Members · 3-Month Minimum
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal mt-5 mb-3">
              Founding Member Rates
            </h2>
            <p className="text-sm text-muted max-w-lg mx-auto">
              Locked in forever. Your price never goes up — even after we open.
              Plus exclusive invites to our soft opening and celebratory events.
            </p>
          </div>

          {/* Membership tiers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
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

          {/* CTA */}
          <div className="text-center mb-20">
            <Button href="/#waitlist">Join as Founding Member</Button>
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

          {/* Courses */}
          <div className="mb-12">
            <h3 className="font-serif text-xl font-light text-charcoal mb-6 text-center">
              Course Series
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {courses.map((course) => (
                <div key={course.name} className="bg-white border border-charcoal/10 rounded-sm p-5 text-center">
                  <p className="font-serif text-sm text-charcoal mb-1">{course.name}</p>
                  <p className="font-serif text-2xl font-light text-charcoal mb-0.5">{course.price}</p>
                  <p className="text-[11px] text-muted">{course.detail}</p>
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
              Class Packs
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
                <div className="divide-y divide-charcoal/10 border-y border-charcoal/10">
                  {packs.map((pack) => (
                    <div key={pack.name} className="py-4 flex items-baseline justify-between">
                      <div>
                        <p className="font-serif text-base font-light text-charcoal">{pack.name}</p>
                        <p className="text-xs text-muted">{pack.perSession} · Expires in 12 months</p>
                      </div>
                      <span className="font-serif text-lg font-light text-charcoal">{pack.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
