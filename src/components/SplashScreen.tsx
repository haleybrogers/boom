"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function SplashScreen({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<"splash" | "fading" | "done">("splash");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("fading"), 2000);
    const t2 = setTimeout(() => setPhase("done"), 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (phase === "done") return <>{children}</>;

  return (
    <>
      {/* Splash — centered logo fades out to reveal page */}
      <div
        className={`fixed inset-0 z-[100] bg-cream flex flex-col items-center justify-center transition-opacity duration-700 ease-out ${
          phase === "fading" ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <Image
          src="/logo-color.svg"
          alt="Boomerang Pilates"
          width={280}
          height={220}
          className="w-40 md:w-52 h-auto"
          priority
        />
        <div className="mt-8">
          <Image
            src="/loading-icon.svg"
            alt=""
            width={28}
            height={28}
            className="w-7 h-7 animate-spin"
            style={{ animationDuration: "2s" }}
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Page content underneath */}
      {children}
    </>
  );
}
