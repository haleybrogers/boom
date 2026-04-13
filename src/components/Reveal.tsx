"use client";

import { useEffect, useRef, useState, ReactNode, CSSProperties } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number; // ms
  className?: string;
  as?: "div" | "section" | "article" | "li" | "ul";
  /** Tailwind or CSS class applied *before* the element enters view. */
  from?: string;
  /** Tailwind or CSS class applied *after* the element enters view. */
  to?: string;
  /** Trigger threshold (0–1). Default 0.15. */
  threshold?: number;
  style?: CSSProperties;
};

/**
 * Reveal: fades + translates its children in the first time they enter the
 * viewport. Uses IntersectionObserver (fires once). Respects
 * prefers-reduced-motion via the existing .reveal class in globals.css.
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
  from = "opacity-0 translate-y-5",
  to = "opacity-100 translate-y-0",
  threshold = 0,
  style,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    // If the element is already in or above the viewport on mount, reveal it
    // immediately (no animation). Prevents content from staying invisible if
    // the user scrolls past it before the IntersectionObserver fires.
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight) {
      setVisible(true);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            obs.unobserve(el);
          }
        });
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  const Tag = as as "div";
  return (
    <Tag
      ref={ref}
      className={`transition-all duration-[900ms] ease-out ${
        visible ? to : from
      } ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </Tag>
  );
}
