"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function StickyCTA() {
  const [visible, setVisible] = useState(false);
  const [isFridayEvening, setIsFridayEvening] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Show after scrolling past the hero (~50vh)
      setVisible(window.scrollY > window.innerHeight * 0.5);
    };

    // Friday after 5pm easter egg
    const now = new Date();
    setIsFridayEvening(now.getDay() === 5 && now.getHours() >= 17);

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <Link
        href="/classes#founding"
        className="btn-animated flex items-center gap-2.5 bg-accent text-white text-xs tracking-widest uppercase px-5 py-3.5 shadow-lg hover:bg-accent/90 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        {isFridayEvening ? "You survived. Come move." : "Founding Pricing"}
      </Link>
    </div>
  );
}
