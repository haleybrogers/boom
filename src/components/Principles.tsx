"use client";

import { useEffect, useRef, useState } from "react";

const principles = [
  { name: "Concentration", desc: "The mind leads the body. Every movement starts with intention and attention." },
  { name: "Control", desc: "Nothing is accidental. You own every inch of every movement." },
  { name: "Center", desc: "All energy radiates from the core — the powerhouse that supports everything." },
  { name: "Precision", desc: "Quality over quantity. One precise movement is worth more than ten sloppy ones." },
  { name: "Breath", desc: "Breath fuels the work. It cleanses, energizes, and connects mind to body." },
  { name: "Flow", desc: "Movements connect seamlessly — building rhythm, grace, and efficiency." },
];

function PrincipleCard({ name, desc, delay }: { name: string; desc: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="text-center transition-all duration-700 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      <div className="w-8 h-px bg-accent/40 mx-auto mb-5" />
      <h3 className="font-serif text-xl font-light text-charcoal mb-3 tracking-wide">
        {name}
      </h3>
      <p className="text-sm text-muted leading-relaxed max-w-[220px] mx-auto">
        {desc}
      </p>
    </div>
  );
}

export default function Principles() {
  return (
    <div className="max-w-4xl mx-auto px-6">
      <p className="text-xs tracking-widest uppercase text-accent text-center mb-3">
        The Six Principles
      </p>
      <p className="text-muted text-sm text-center mb-16 max-w-lg mx-auto">
        Six principles guide every class we teach — how the work feels when it&apos;s done right.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-16">
        {principles.map((p, i) => (
          <PrincipleCard key={p.name} name={p.name} desc={p.desc} delay={i * 100} />
        ))}
      </div>
    </div>
  );
}
