"use client";

import { useState } from "react";

const sections = [
  {
    category: "Mat Classes",
    subtitle: "50 min · 15 spots",
    description:
      "Full-body workouts rooted in the original Return to Life matwork created by Joseph Pilates — layered, progressive, and built around all six principles of the method.",
    classes: [
      {
        title: "Open Level Classical Mat",
        level: "All levels",
        description:
          "The foundation of everything we do. Every session offers modifications for newer students and advancements for those deeper in their practice. This is classical Pilates the way it was designed: challenging, precise, and accessible to every body in the room.",
      },
      {
        title: "Return to Life Mat — Full 34",
        level: "Intermediate/Advanced",
        description:
          "All 34 exercises. No shortcuts. A fast-paced, athletic class that takes you through the complete classical mat series as Joseph Pilates intended it. Strength, stamina, and fluidity in one unbroken sequence. Prior RTL Course or mat experience recommended.",
      },
      {
        title: "Lunch Power Hour",
        level: "All levels · 35 min",
        description:
          "Classical matwork, compact format. Everything you love about the method in a focused 35-minute session built for people with somewhere to be. No filler, no fluff — just the work. Perfect for downtown professionals and mid-day movers.",
      },
    ],
  },
  {
    category: "Apparatus Classes",
    subtitle: "50 min · 3 spots max",
    description:
      "Real classical equipment. Real hands-on instruction. Three students per class — reformer, tower, barrels, and chair.",
    classes: [
      {
        title: "Apparatus Foundations",
        level: "Beginner · No experience required",
        description:
          "Your introduction to classical Pilates apparatus. In a group of just three, you'll learn to safely and effectively use the reformer, tower, and small barrels — the equipment that transforms how you feel and move in your body.",
      },
      {
        title: "Intermediate Mixed Apparatus",
        level: "Intermediate · Apparatus experience required",
        description:
          "You know the equipment. Now let it challenge you. Rotates through the full range of apparatus — tower, reformer, barrels — with a strong focus on core strengthening and alignment. Each session uses a different combination so your practice never plateaus.",
      },
      {
        title: "Athletic Classical Reformer",
        level: "Intermediate/Advanced",
        description:
          "Fast-paced. Precision-driven. A reformer class built for students who want to push — efficient transitions, demanding sequences, and the kind of focused intensity that only comes from working on real classical equipment with real instruction.",
      },
      {
        title: "Athletic Classical Tower",
        level: "Intermediate/Advanced",
        description:
          "Everything you love about the tower, turned up. A fast-paced sequence incorporating classical mat exercises alongside full tower work — roll back bar, push-thru bar, leg springs, arm springs. More core burn, more flow, more demand.",
      },
      {
        title: "Lengthen & Strengthen Tower",
        level: "All levels · Restorative focus",
        description:
          "The slowdown you didn't know you needed. A gentle, restorative class combining classical mat work with tower springs and bars to release tension, decompress the spine, and restore alignment. Slow, precise movement that leaves you feeling longer, stronger, and more energized.",
      },
    ],
  },
];

export default function GroupClassesAndPricing() {
  const [openSection, setOpenSection] = useState<number | null>(null);
  const [openClass, setOpenClass] = useState<string | null>(null);

  const toggleSection = (i: number) => {
    if (openSection === i) {
      setOpenSection(null);
      setOpenClass(null);
    } else {
      setOpenSection(i);
      setOpenClass(null);
    }
  };

  const toggleClass = (title: string) => {
    setOpenClass(openClass === title ? null : title);
  };

  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="font-serif text-2xl md:text-3xl font-light text-charcoal mb-3">
          Group Classes
        </h2>
        <p className="text-muted text-sm max-w-md mx-auto">
          Everything you can book from the schedule above. Tap a category to explore.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-3">
        {sections.map((section, i) => (
          <div
            key={section.category}
            className="border border-charcoal/10 rounded-sm overflow-hidden"
          >
            {/* Section header */}
            <button
              onClick={() => toggleSection(i)}
              className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-cream/50 transition-colors"
            >
              <div>
                <h3 className="font-serif text-xl font-light text-charcoal">
                  {section.category}
                </h3>
                <p className="text-xs text-muted mt-0.5">{section.subtitle}</p>
              </div>
              <svg
                className={`w-5 h-5 text-accent/50 shrink-0 ml-4 transition-transform duration-300 ${
                  openSection === i ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Section body */}
            <div
              className={`overflow-hidden transition-all duration-400 ease-in-out ${
                openSection === i
                  ? "max-h-[2000px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="px-6 pb-5">
                <p className="text-sm text-muted leading-relaxed mb-5">
                  {section.description}
                </p>

                {/* Individual class accordions */}
                <div className="space-y-2">
                  {section.classes.map((cls) => (
                    <div key={cls.title} className="border-t border-charcoal/5">
                      <button
                        onClick={() => toggleClass(cls.title)}
                        className="w-full py-3 flex items-center justify-between text-left"
                      >
                        <div className="flex-1 min-w-0">
                          <span className="font-serif text-base font-light text-charcoal">
                            {cls.title}
                          </span>
                          <span className="text-xs text-muted/70 ml-3">
                            {cls.level}
                          </span>
                        </div>
                        <svg
                          className={`w-3.5 h-3.5 text-accent/40 shrink-0 ml-3 transition-transform duration-300 ${
                            openClass === cls.title ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          openClass === cls.title
                            ? "max-h-40 opacity-100 pb-3"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <p className="text-sm text-muted leading-relaxed">
                          {cls.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
