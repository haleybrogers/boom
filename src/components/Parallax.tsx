"use client";

import { useEffect, useRef, ReactNode } from "react";

type ParallaxProps = {
  children: ReactNode;
  speed?: number;
  className?: string;
};

export default function Parallax({ children, speed = 0.3, className = "" }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const offset = rect.top * speed * -1;
      ref.current.style.transform = `translateY(${offset}px)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
