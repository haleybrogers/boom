"use client";

import { useEffect, useRef, useState } from "react";

const principles = [
  {
    name: "Breath",
    description: "The foundation of every movement.",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round">
        <path d="M6 12h12a4 4 0 100-4" />
        <path d="M6 18h16a3.5 3.5 0 100-3.5" />
        <path d="M6 24h10a3 3 0 100-3" />
      </svg>
    ),
  },
  {
    name: "Flow",
    description: "One movement melts into the next.",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={1.2}>
        <path d="M4 16c4-8 8 8 12 0s8 8 12 0" strokeLinecap="round" />
        <path d="M4 22c4-8 8 8 12 0s8 8 12 0" strokeLinecap="round" opacity={0.4} />
      </svg>
    ),
  },
  {
    name: "Concentration",
    description: "Mind and body, fully present.",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={1.2}>
        <circle cx="16" cy="16" r="10" />
        <circle cx="16" cy="16" r="5" />
        <circle cx="16" cy="16" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Control",
    description: "Nothing is left to chance.",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={1.2}>
        <rect x="6" y="10" width="20" height="12" rx="2" />
        <line x1="16" y1="10" x2="16" y2="22" />
        <circle cx="16" cy="16" r="3" fill="currentColor" opacity={0.15} stroke="currentColor" />
      </svg>
    ),
  },
  {
    name: "Center",
    description: "Every movement radiates from the core.",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={1.2}>
        <circle cx="16" cy="16" r="12" strokeDasharray="3 3" />
        <circle cx="16" cy="16" r="4" fill="currentColor" opacity={0.15} stroke="currentColor" />
        <line x1="16" y1="4" x2="16" y2="12" />
        <line x1="16" y1="20" x2="16" y2="28" />
        <line x1="4" y1="16" x2="12" y2="16" />
        <line x1="20" y1="16" x2="28" y2="16" />
      </svg>
    ),
  },
  {
    name: "Precision",
    description: "Every detail matters.",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={1.2}>
        <path d="M6 26L26 6" strokeLinecap="round" />
        <path d="M22 6h4v4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 16l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function SixPrinciples({ embedded = false }: { embedded?: boolean }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const content = (
    <div ref={ref}>
      {!embedded && (
        <div className="text-center mb-14">
          <p className="text-xs tracking-widest uppercase text-accent mb-4">The Method</p>
          <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal mb-3">
            Six Principles. Every Class.
          </h2>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12">
        {principles.map((p, i) => (
          <div
            key={p.name}
            className="text-center transition-all duration-700 ease-out"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(24px)",
              transitionDelay: `${i * 120}ms`,
            }}
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent/8 text-accent mb-4">
              {p.icon}
            </div>
            <h3 className="font-serif text-lg text-charcoal mb-1">{p.name}</h3>
            <p className="text-sm text-muted">{p.description}</p>
          </div>
        ))}
      </div>
    </div>
  );

  if (embedded) return content;

  return (
    <section className="py-20 lg:py-28 bg-warm-white">
      <div className="max-w-5xl mx-auto px-6">
        {content}
      </div>
    </section>
  );
}
