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
      <div
        className={`fixed inset-0 z-[100] bg-cream flex flex-col items-center justify-center transition-opacity duration-600 ${
          phase === "fading" ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <Image
          src="/logo-color.svg"
          alt="Boomerang Pilates"
          width={320}
          height={250}
          className="w-48 md:w-64 h-auto mb-12"
          priority
        />
        <Image
          src="/loading-icon.svg"
          alt=""
          width={32}
          height={32}
          className="w-8 h-8 animate-spin"
          style={{ animationDuration: "2s" }}
          aria-hidden="true"
        />
      </div>
      <div className={phase === "fading" ? "opacity-100" : "opacity-0"}>
        {children}
      </div>
    </>
  );
}
