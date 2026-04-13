"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function SplashScreen({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Disable browser scroll restoration + force top on first load
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo({ top: 0, behavior: "instant" });
    const t1 = setTimeout(() => setFading(true), 2400);
    const t2 = setTimeout(() => setVisible(false), 3600);
    const t3 = setTimeout(() => window.scrollTo({ top: 0, behavior: "instant" }), 3650);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <>
      {visible && (
        <div
          className="fixed inset-0 z-[100] bg-cream flex flex-col items-center justify-center"
          style={{
            opacity: fading ? 0 : 1,
            transition: "opacity 1.2s ease-in-out",
          }}
        >
          {/* Logo — soft inhale/exhale breath pulse */}
          <div className="splash-breathe">
            <Image
              src="/logo-full.svg"
              alt="Boomerang Pilates"
              width={500}
              height={400}
              className="w-80 md:w-[28rem] h-auto"
              priority
            />
          </div>

          {/* Larger, softer spinning boomerang ring */}
          <div className="mt-10">
            <Image
              src="/loading-icon.svg"
              alt=""
              width={72}
              height={72}
              className="w-16 h-16 md:w-20 md:h-20 animate-spin opacity-25"
              style={{ animationDuration: "2.4s" }}
              aria-hidden="true"
            />
          </div>

          {/* Breath-paced tagline */}
          <p className="mt-8 font-serif italic text-sm md:text-base text-charcoal/50 splash-breath-text">
            breathe in…
          </p>

          <style jsx>{`
            .splash-breathe {
              animation: splashBreathe 4s ease-in-out infinite;
              transform-origin: center;
            }
            @keyframes splashBreathe {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.03); }
            }
            .splash-breath-text {
              animation: splashBreathText 4s ease-in-out infinite;
            }
            @keyframes splashBreathText {
              0%, 100% { opacity: 0.3; }
              50% { opacity: 0.7; }
            }
          `}</style>
        </div>
      )}
      {children}
    </>
  );
}
