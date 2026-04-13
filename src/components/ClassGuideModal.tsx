"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";

const sections = [
  {
    category: "Mat Classes",
    subtitle: "50 min · 15 spots",
    classes: [
      {
        title: "Open Level Classical Mat",
        level: "All levels",
        description:
          "The foundation of everything we do. Modifications for newer students, advancements for those deeper in their practice. Classical Pilates the way it was designed.",
      },
      {
        title: "Return to Life Mat — Full 34",
        level: "Intermediate/Advanced",
        description:
          "All 34 exercises. No shortcuts. The complete classical mat series — strength, stamina, and fluidity in one unbroken sequence.",
      },
      {
        title: "Lunch Power Hour",
        level: "All levels · 35 min",
        description:
          "Classical matwork, compact format. A focused 35-minute session built for people with somewhere to be.",
      },
    ],
  },
  {
    category: "Apparatus Classes",
    subtitle: "50 min · 3 spots max",
    classes: [
      {
        title: "Apparatus Foundations",
        level: "Beginner",
        description:
          "Your introduction to classical apparatus. In a group of just three, learn to safely use the reformer, tower, and small barrels.",
      },
      {
        title: "Intermediate Mixed Apparatus",
        level: "Intermediate",
        description:
          "Rotates through the full range of apparatus with a strong focus on core strengthening and alignment.",
      },
      {
        title: "Athletic Classical Reformer",
        level: "Intermediate/Advanced",
        description:
          "Fast-paced, precision-driven reformer work. Efficient transitions, demanding sequences, focused intensity.",
      },
      {
        title: "Athletic Classical Tower",
        level: "Intermediate/Advanced",
        description:
          "Full tower work turned up — roll back bar, push-thru bar, leg springs, arm springs. More core burn, more flow.",
      },
      {
        title: "Lengthen & Strengthen Tower",
        level: "All levels · Restorative",
        description:
          "A gentle class combining mat work with tower springs to release tension, decompress the spine, and restore alignment.",
      },
    ],
  },
];

export default function ClassGuideModal() {
  const [open, setOpen] = useState(false);
  const [openClass, setOpenClass] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  return (
    <>
      {/* Trigger button — soft serif pill */}
      <button
        onClick={() => setOpen(true)}
        className="group inline-flex items-center gap-2.5 bg-cream border border-accent/25 pl-3 pr-4 py-2 rounded-full shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-accent/50 transition-all duration-300"
      >
        <span className="w-6 h-6 rounded-full bg-accent/10 text-accent flex items-center justify-center text-[11px] font-serif italic group-hover:bg-accent/20 transition-colors">
          i
        </span>
        <span className="font-serif italic text-sm text-charcoal group-hover:text-accent transition-colors">
          Class descriptions
        </span>
        <span className="text-accent/50 group-hover:text-accent transition-colors text-xs">→</span>
      </button>

      {/* Backdrop + Modal — portaled to body to escape any transform/filter ancestors */}
      {open && mounted && createPortal(
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          onClick={() => setOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-charcoal/50 backdrop-blur-sm" />

          {/* Centered panel */}
          <div
            className="relative w-full max-w-md max-h-[90vh] bg-warm-white shadow-xl overflow-y-auto rounded-sm animate-fade-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-warm-white/95 backdrop-blur-sm border-b-2 border-accent px-6 py-5 flex items-center justify-between z-10">
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-accent mb-1">The Studio</p>
                <h2 className="font-serif text-2xl font-light text-charcoal">Class Guide</h2>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-charcoal/40 hover:text-charcoal transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="px-6 py-6">
              {sections.map((section, sIdx) => (
                <div key={section.category} className={sIdx === 0 ? "mb-10" : "mb-10 pt-8 border-t border-charcoal/10"}>
                  <div className="bg-accent/10 -mx-6 px-6 py-4 mb-5 border-l-4 border-accent">
                    <h3 className="font-serif text-2xl font-light text-accent leading-tight">
                      {section.category}
                    </h3>
                    <p className="text-xs text-charcoal/60 mt-1 italic font-serif">{section.subtitle}</p>
                  </div>

                  <div className="space-y-1">
                    {section.classes.map((cls) => (
                      <div key={cls.title} className="border-b border-charcoal/5 last:border-0">
                        <button
                          onClick={() => setOpenClass(openClass === cls.title ? null : cls.title)}
                          className="w-full py-4 flex items-center justify-between text-left"
                        >
                          <div>
                            <span className="font-serif text-base text-charcoal">
                              {cls.title}
                            </span>
                            <span className="text-xs text-muted/60 ml-2">{cls.level}</span>
                          </div>
                          <span
                            className={`shrink-0 ml-3 w-7 h-7 rounded-full bg-accent text-white flex items-center justify-center transition-transform duration-300 ${
                              openClass === cls.title ? "rotate-180" : ""
                            }`}
                          >
                            <svg
                              className="w-3.5 h-3.5"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2.5}
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                          </span>
                        </button>
                        <div
                          className={`overflow-hidden transition-all duration-300 ease-in-out ${
                            openClass === cls.title ? "max-h-32 opacity-100 pb-3" : "max-h-0 opacity-0"
                          }`}
                        >
                          <p className="text-base text-muted leading-relaxed">
                            {cls.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* RTL Course callout */}
              <div className="border border-accent/15 bg-accent/5 rounded-sm p-5 mt-4">
                <p className="font-serif text-sm text-charcoal mb-1">
                  Looking for Return to Life Courses?
                </p>
                <p className="text-xs text-muted mb-3">
                  Our 8-week beginner and intermediate series run once per quarter.
                </p>
                <Link
                  href="/events"
                  onClick={() => setOpen(false)}
                  className="link-arrow text-xs tracking-widest uppercase text-accent hover:text-accent/80 transition-colors"
                >
                  View Course Series
                </Link>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
