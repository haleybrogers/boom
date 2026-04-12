"use client";

import { useState } from "react";

const sections = [
  {
    category: "Mat Classes",
    subtitle: "50 min · 15 spots · $25 drop-in",
    description: "No equipment — just you and the mat.",
    classes: [
      {
        title: "All Levels Mat",
        description: "Just you and the mat. The classical sequence adapted so anyone can show up — skip what doesn't work for your body, repeat what does. No props, no guessing.",
      },
      {
        title: "Return to Life Mat",
        description: "Joseph Pilates' original 34-exercise mat sequence, performed in full. You know the order — now let it flow.",
      },
      {
        title: "Return to Life Course I",
        description: "Learn the first half of Joseph Pilates' original mat sequence one exercise at a time. Breath, control, precision — at your own pace.",
      },
      {
        title: "Return to Life Course II",
        description: "Continue through the second half of the sequence. More advanced exercises and transitions — as your body is ready for them.",
      },
    ],
  },
  {
    category: "Apparatus Classes",
    subtitle: "50 min · 3 spots · $45 drop-in",
    description: "Spring-loaded resistance on reformer, tower, and barrels — small groups so you get real attention.",
    classes: [
      {
        title: "Apparatus Foundations",
        description: "An introduction to tower and small barrel work. Learn the basics of spring-loaded resistance in a small group setting.",
      },
      {
        title: "Intermediate Mixed Apparatus",
        description: "Rotate through reformer, tower, and barrels in a single session. For students with apparatus experience.",
      },
    ],
  },
  {
    category: "Privates & Duets",
    subtitle: "Privates $110 · Duets $60/person",
    description: "Fully customized apparatus work — Reformer, Tower, Barrel, Chair.",
    classes: [
      {
        title: "Private Sessions",
        description: "One-on-one, fully tailored to you. Whether you're rehabbing an injury, training for something specific, or just prefer individual attention — we'll meet you where you are.",
      },
      {
        title: "Duets",
        description: "Bring a friend or partner. Same customized attention, split between two. A great way to get apparatus work at a lower price point.",
      },
    ],
  },
];

export default function ClassAccordions() {
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
      <div className="space-y-3">
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Section body */}
          <div
            className={`overflow-hidden transition-all duration-400 ease-in-out ${
              openSection === i ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="px-6 pb-5">
              <p className="text-sm text-muted leading-relaxed mb-5">{section.description}</p>

              {/* Individual class accordions */}
              <div className="space-y-2">
                {section.classes.map((cls) => (
                  <div key={cls.title} className="border-t border-charcoal/5">
                    <button
                      onClick={() => toggleClass(cls.title)}
                      className="w-full py-3 flex items-center justify-between text-left"
                    >
                      <span className="font-serif text-base font-light text-charcoal">
                        {cls.title}
                      </span>
                      <svg
                        className={`w-3.5 h-3.5 text-accent/40 shrink-0 ml-3 transition-transform duration-300 ${
                          openClass === cls.title ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        openClass === cls.title ? "max-h-40 opacity-100 pb-3" : "max-h-0 opacity-0"
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

      {/* Founding member CTA */}
      <div className="mt-10 text-center">
        <p className="text-base text-muted mb-4">
          Ready to commit? Founding members save every month — forever.
        </p>
        <a
          href="#founding"
          className="inline-block bg-accent text-white px-7 py-3 text-sm tracking-wide rounded-sm hover:bg-accent/85 transition-colors"
        >
          See Founding Pricing
        </a>
      </div>
    </div>
  );
}
