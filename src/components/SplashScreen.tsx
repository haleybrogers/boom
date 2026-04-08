"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function SplashScreen({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<"splash" | "fading" | "done">("splash");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("fading"), 2400);
    const t2 = setTimeout(() => setPhase("done"), 3000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (phase === "done") return <>{children}</>;

  return (
    <>
      {/* Splash overlay */}
      <div
        className={`fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center transition-opacity duration-600 ${
          phase === "fading" ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <Image
          src="/logo-new.svg"
          alt="Boomerang Pilates"
          width={320}
          height={250}
          className="w-48 md:w-64 h-auto mb-10"
          priority
        />

        {/* Loading dots animation */}
        <div className="flex gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-charcoal/30 animate-[pulse_1.2s_ease-in-out_infinite]" />
          <span className="w-1.5 h-1.5 rounded-full bg-charcoal/30 animate-[pulse_1.2s_ease-in-out_0.2s_infinite]" />
          <span className="w-1.5 h-1.5 rounded-full bg-charcoal/30 animate-[pulse_1.2s_ease-in-out_0.4s_infinite]" />
        </div>
      </div>

      {/* Content hidden behind splash */}
      <div className={phase === "fading" ? "opacity-100" : "opacity-0"}>
        {children}
      </div>
    </>
  );
}
