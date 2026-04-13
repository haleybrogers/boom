"use client";

import { useEffect, useRef, useState } from "react";

const principles = [
  {
    name: "Breath",
    description: "The foundation of every movement.",
  },
  {
    name: "Flow",
    description: "One movement melts into the next.",
  },
  {
    name: "Concentration",
    description: "Mind and body, fully present.",
  },
  {
    name: "Control",
    description: "Nothing is left to chance.",
  },
  {
    name: "Center",
    description: "Every movement radiates from the core.",
  },
  {
    name: "Precision",
    description: "Every detail matters.",
  },
];

/* Icon that draws in on scroll AND replays on hover */
function AnimatedIcon({ name, animate, delay }: { name: string; animate: boolean; delay: number }) {
  const [hovered, setHovered] = useState(false);
  const [hasAnimatedIn, setHasAnimatedIn] = useState(false);

  // Track when the initial scroll animation completes
  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => setHasAnimatedIn(true), delay + 1200);
      return () => clearTimeout(timer);
    }
  }, [animate, delay]);

  // For initial scroll-in: use staggered delays
  // For hover replay: reset then re-draw with no stagger delay
  const isDrawn = hovered ? true : animate;
  const isReset = hovered === false && hasAnimatedIn ? false : !animate;

  // On hover: briefly reset to 0, then draw. We use a key trick to force re-render
  const [animKey, setAnimKey] = useState(0);

  const handleMouseEnter = () => {
    setAnimKey((k) => k + 1); // force re-mount to replay
    // Small delay so the reset frame renders before the draw
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setHovered(true);
      });
    });
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  // On re-mount (key change), start un-drawn then draw in
  const [drawState, setDrawState] = useState<"idle" | "reset" | "drawing">("idle");

  useEffect(() => {
    if (animKey === 0) return; // skip initial mount
    setDrawState("reset");
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setDrawState("drawing");
      });
    });
    return () => cancelAnimationFrame(raf);
  }, [animKey]);

  const shouldDraw = drawState === "drawing" || (drawState === "idle" && animate);
  const activeDelay = drawState === "idle" ? delay : 0;

  const style = {
    strokeDasharray: 200,
    strokeDashoffset: shouldDraw ? 0 : 200,
    transition: drawState === "reset"
      ? "none"
      : `stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${activeDelay}ms`,
  };

  const fillStyle = {
    opacity: shouldDraw ? 1 : 0,
    transition: drawState === "reset"
      ? "none"
      : `opacity 0.4s ease ${activeDelay + 400}ms`,
  };

  const stagger = (ms: number) => ({
    ...style,
    transitionDelay: drawState === "reset" ? "0ms" : `${activeDelay + ms}ms`,
    transition: drawState === "reset"
      ? "none"
      : `stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${activeDelay + ms}ms`,
  });

  const wrapper = (children: React.ReactNode) => (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="cursor-pointer"
    >
      {children}
    </div>
  );

  switch (name) {
    case "Breath":
      return wrapper(
        <svg key={animKey} className={`w-8 h-8 ${shouldDraw ? "icon-breathe" : ""}`} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round">
          <path d="M6 12h12a4 4 0 100-4" style={style} />
          <path d="M6 18h16a3.5 3.5 0 100-3.5" style={stagger(150)} />
          <path d="M6 24h10a3 3 0 100-3" style={stagger(300)} />
        </svg>
      );
    case "Flow":
      return wrapper(
        <svg key={animKey} className={`w-8 h-8 ${shouldDraw ? "icon-wave" : ""}`} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={1.2}>
          <path d="M4 16c4-8 8 8 12 0s8 8 12 0" strokeLinecap="round" style={style} />
          <path d="M4 22c4-8 8 8 12 0s8 8 12 0" strokeLinecap="round" style={{ ...stagger(200), opacity: shouldDraw ? 0.4 : 0 }} />
        </svg>
      );
    case "Concentration":
      return wrapper(
        <svg key={animKey} className={`w-8 h-8 ${shouldDraw ? "icon-pulse" : ""}`} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={1.2}>
          <circle cx="16" cy="16" r="10" style={style} />
          <circle cx="16" cy="16" r="5" style={stagger(200)} />
          <circle cx="16" cy="16" r="1.5" fill="currentColor" style={fillStyle} />
        </svg>
      );
    case "Control":
      return wrapper(
        <svg key={animKey} className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={1.2}>
          <rect x="6" y="10" width="20" height="12" rx="2" style={style} />
          <line x1="16" y1="10" x2="16" y2="22" style={stagger(200)} />
          <circle cx="16" cy="16" r="3" fill="currentColor" opacity={0.15} stroke="currentColor" style={fillStyle} className={shouldDraw ? "icon-slide" : ""} />
        </svg>
      );
    case "Center":
      return wrapper(
        <svg key={animKey} className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={1.2}>
          <circle cx="16" cy="16" r="12" strokeDasharray="3 3" className={shouldDraw ? "icon-spin" : ""} style={{ opacity: shouldDraw ? 1 : 0, transition: drawState === "reset" ? "none" : `opacity 0.6s ease ${activeDelay}ms`, transformOrigin: "center" }} />
          <circle cx="16" cy="16" r="4" fill="currentColor" opacity={0.15} stroke="currentColor" style={fillStyle} />
          <line x1="16" y1="4" x2="16" y2="12" style={stagger(150)} />
          <line x1="16" y1="20" x2="16" y2="28" style={stagger(250)} />
          <line x1="4" y1="16" x2="12" y2="16" style={stagger(350)} />
          <line x1="20" y1="16" x2="28" y2="16" style={stagger(450)} />
        </svg>
      );
    case "Precision":
      return wrapper(
        <svg key={animKey} className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={1.2}>
          <path d="M6 26L26 6" strokeLinecap="round" style={style} />
          <path d="M22 6h4v4" strokeLinecap="round" strokeLinejoin="round" style={stagger(200)} />
          <path d="M12 16l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" style={stagger(400)} className={shouldDraw ? "icon-check" : ""} />
        </svg>
      );
    default:
      return null;
  }
}

// Classical order: Centering → Concentration → Control → Precision → Breath → Flow
const SECRET_ORDER = ["Center", "Concentration", "Control", "Precision", "Breath", "Flow"];

export default function SixPrinciples({ embedded = false }: { embedded?: boolean }) {
  const [visible, setVisible] = useState(false);
  const [sequence, setSequence] = useState<string[]>([]);
  const [unlocked, setUnlocked] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handlePrincipleClick = (name: string) => {
    if (unlocked) return;
    const next = [...sequence, name];
    // Check if still on the right path
    const expected = SECRET_ORDER[next.length - 1];
    if (name !== expected) {
      setSequence([]);
      return;
    }
    if (next.length === SECRET_ORDER.length) {
      setUnlocked(true);
    } else {
      setSequence(next);
    }
  };

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
        {principles.map((p, i) => {
          const delay = i * 150;
          const isInSequence = sequence.includes(p.name);
          return (
            <button
              key={p.name}
              onClick={() => handlePrincipleClick(p.name)}
              className="text-center transition-all duration-700 ease-out cursor-pointer"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transitionDelay: `${delay}ms`,
              }}
            >
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-full text-accent mb-4 transition-all duration-300 hover:scale-110 ${
                isInSequence ? "bg-accent/25 ring-2 ring-accent/40" : "bg-accent/8"
              }`}>
                <AnimatedIcon name={p.name} animate={visible} delay={delay} />
              </div>
              <h3 className="font-serif text-lg text-charcoal mb-1">{p.name}</h3>
              <p className="text-sm text-muted">{p.description}</p>
            </button>
          );
        })}
      </div>

      {/* Hidden 7th principle — unlocked by clicking in classical order */}
      {unlocked && (
        <div className="mt-16 text-center animate-fade-in">
          <div className="inline-block border-t border-accent/30 pt-8 px-10">
            <p className="text-[10px] tracking-widest uppercase text-accent mb-3">
              The Seventh Principle
            </p>
            <h3 className="font-serif text-4xl font-light text-charcoal mb-3">
              Show Up.
            </h3>
            <p className="text-sm text-muted mb-6 max-w-xs mx-auto">
              The one Joe didn&apos;t write down. The only one that matters.
            </p>
            <a
              href="/classes"
              className="btn-animated inline-block bg-accent text-white text-xs tracking-widest uppercase px-6 py-3"
            >
              Book a Class
            </a>
          </div>
        </div>
      )}
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
