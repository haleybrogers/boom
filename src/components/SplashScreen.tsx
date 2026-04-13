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
    const t1 = setTimeout(() => setFading(true), 2000);
    const t2 = setTimeout(() => setVisible(false), 3200);
    const t3 = setTimeout(() => window.scrollTo({ top: 0, behavior: "instant" }), 3250);
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
          <Image
            src="/logo-full.svg"
            alt="Boomerang Pilates"
            width={500}
            height={400}
            className="w-80 md:w-[28rem] h-auto"
            priority
          />
          <div className="mt-8">
            <Image
              src="/loading-icon.svg"
              alt=""
              width={44}
              height={44}
              className="w-11 h-11 animate-spin"
              style={{ animationDuration: "2s" }}
              aria-hidden="true"
            />
          </div>
        </div>
      )}
      {children}
    </>
  );
}
