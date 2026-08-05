"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const SESSION_KEY = "boomerang-splash-shown";

// Splash overlay. Home page only. Mounted from app/page.tsx, not from
// layout.tsx, so direct landings on /schedule etc. Skip it.
export default function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Splash plays once per session. If the user has already seen it
    // (e.g. Came back to the home page in the same tab), hide immediately.
    if (sessionStorage.getItem(SESSION_KEY)) {
      setVisible(false);
      return;
    }
    sessionStorage.setItem(SESSION_KEY, "1");

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

  if (!visible) return null;

  return (
    <div
          className="fixed inset-0 z-[100] bg-charcoal flex flex-col items-center justify-center overflow-hidden"
          style={{
            opacity: fading ? 0 : 1,
            transition: "opacity 1.2s ease-in-out",
          }}
        >
          {/* Video backdrop */}
          <video
            src="/splash-bg.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-charcoal/50" />

          {/* Logo. Soft inhale/exhale breath pulse */}
          <div className="splash-breathe relative">
            <Image
              src="/logo-word.svg"
              alt="Boomerang Pilates"
              width={500}
              height={116}
              className="w-72 md:w-[26rem] h-auto brightness-0 invert"
              priority
            />
          </div>

          <style jsx>{`
            .splash-breathe {
              animation: splashBreathe 4s ease-in-out infinite;
              transform-origin: center;
            }
            @keyframes splashBreathe {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.03); }
            }
      `}</style>
    </div>
  );
}
