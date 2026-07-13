"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function StickyCTA() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      // Show after scrolling past the hero (~50vh)
      setVisible(window.scrollY > window.innerHeight * 0.5);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Hide the sticky CTA on /founding itself — the page already has the
  // slim early-access strip + the tier cards, so a "Lock in Founding
  // Rate" overlay was just clutter.
  const onFoundingPage = pathname === "/founding";
  if (onFoundingPage) return null;

  return (
    <div
      className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 transition-all duration-500 ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <a
        href="/schedule"
        className="btn-animated flex items-center gap-2.5 bg-accent text-white text-sm tracking-widest uppercase px-5 py-3.5 shadow-lg hover:bg-accent/90 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        Book a Class
      </a>
    </div>
  );
}
