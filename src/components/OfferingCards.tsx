"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const offerings = [
  {
    title: "Mat Classes",
    image: "/photo-chair.jpg",
    tagline: "Just you and the mat.",
    details: [
      "Classical mat sequence — the exercises come in a set order, so you always know what's next.",
      "All levels welcome. Skip what doesn't work for your body, repeat what does.",
      "50 minutes · Up to 15 students",
    ],
    classes: ["All Levels Mat", "Return to Life Mat", "Return to Life Course I & II"],
    price: "$25 drop-in · $149/mo founding rate",
    link: "/classes",
  },
  {
    title: "Apparatus",
    image: "/photo-reformer.jpg",
    tagline: "Reformer, tower, and barrels — real spring resistance in small groups.",
    details: [
      "Spring-loaded equipment designed to challenge and support you at the same time.",
      "3 students max per class — you get real attention, real corrections.",
      "50 minutes · Foundations and intermediate levels",
    ],
    classes: ["Apparatus Foundations", "Intermediate Mixed Apparatus"],
    price: "$45 drop-in · $249/mo founding rate (unlimited)",
    link: "/classes",
  },
  {
    title: "Privates & Duets",
    image: "/photo-leg.jpg",
    tagline: "Fully customized, one-on-one or with a partner.",
    details: [
      "Tailored to your body — rehabbing an injury, training for something specific, or just prefer individual attention.",
      "Full apparatus: Reformer, Tower, Barrel, Chair.",
      "By appointment · Duets are a great way to split the cost.",
    ],
    classes: ["Private Sessions", "Duets"],
    price: "Privates $110 · Duets $60/person",
    link: "/classes",
  },
];

export default function OfferingCards() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {offerings.map((offering, i) => {
        const isOpen = open === i;

        return (
          <div
            key={offering.title}
            className="border border-charcoal/10 overflow-hidden"
          >
            {/* Clickable header with photo */}
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full text-left group"
            >
              <div className="flex flex-col md:flex-row">
                {/* Photo */}
                <div className="relative w-full md:w-72 h-48 md:h-auto shrink-0 overflow-hidden">
                  <Image
                    src={offering.image}
                    alt={offering.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Text */}
                <div className="flex-1 px-6 md:px-8 py-6 flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-2xl md:text-3xl font-light text-charcoal mb-1.5">
                      {offering.title}
                    </h3>
                    <p className="text-muted text-base">
                      {offering.tagline}
                    </p>
                  </div>
                  <svg
                    className={`w-5 h-5 text-charcoal/30 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </button>

            {/* Expandable detail */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="px-6 md:px-8 md:pl-80 pb-8 pt-2">
                {/* Details */}
                <ul className="space-y-2.5 mb-6">
                  {offering.details.map((d, j) => (
                    <li key={j} className="text-base text-muted leading-relaxed flex gap-3">
                      <span className="text-accent mt-1 shrink-0">·</span>
                      {d}
                    </li>
                  ))}
                </ul>

                {/* Class list */}
                <div className="mb-6">
                  <p className="text-xs tracking-widest uppercase text-charcoal/40 mb-2">Classes</p>
                  <div className="flex flex-wrap gap-2">
                    {offering.classes.map((cls) => (
                      <span
                        key={cls}
                        className="text-sm text-charcoal bg-cream px-3 py-1.5 rounded-sm"
                      >
                        {cls}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Pricing + CTA */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <p className="text-sm text-muted">{offering.price}</p>
                  <Link
                    href={offering.link}
                    className="inline-block text-xs tracking-widest uppercase text-accent hover:text-accent/80 transition-colors"
                  >
                    View Schedule &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
