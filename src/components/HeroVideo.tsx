"use client";

import { useEffect, useRef } from "react";

/**
 * Hero background video with a subtle parallax drift: the video moves
 * slower than the page scroll, so it feels like it sits a layer behind
 * the content instead of scrolling at the same rate. Scaled up 110% so
 * the translate never reveals an edge. rAF-throttled scroll listener,
 * no external deps (matches the plain useEffect pattern in Reveal.tsx).
 */
export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const tickingRef = useRef(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const update = () => {
      const rect = el.parentElement?.getBoundingClientRect();
      if (rect) {
        // Only the portion of scroll while the hero is in/near view.
        const offset = rect.top * 0.25;
        el.style.transform = `translate3d(0, ${offset}px, 0) scale(1.1)`;
      }
      tickingRef.current = false;
    };

    const onScroll = () => {
      if (!tickingRef.current) {
        tickingRef.current = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <video
        ref={videoRef}
        src="/hero-video.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-bottom scale-110 will-change-transform"
      />
      {/* Scrim so the logo/nav stays legible over any frame of the video */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/55 via-charcoal/10 to-transparent pointer-events-none" />
    </>
  );
}
