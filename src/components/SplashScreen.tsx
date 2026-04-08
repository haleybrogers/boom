"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function SplashScreen({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<"splash" | "moving" | "done">("splash");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("moving"), 2200);
    const t2 = setTimeout(() => setPhase("done"), 3000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <>
      {/* Splash overlay — logo starts centered, then moves to its homepage position */}
      {phase !== "done" && (
        <div
          className={`fixed inset-0 z-[100] bg-cream transition-opacity duration-500 ${
            phase === "moving" ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <div className="flex flex-col items-center justify-center h-full">
            <Image
              src="/logo-color.svg"
              alt="Boomerang Pilates"
              width={320}
              height={250}
              className={`transition-all duration-700 ease-in-out ${
                phase === "splash"
                  ? "w-48 md:w-64 h-auto"
                  : "w-48 md:w-60 h-auto -translate-y-20"
              }`}
              priority
            />
            {phase === "splash" && (
              <Image
                src="/loading-icon.svg"
                alt=""
                width={32}
                height={32}
                className="w-8 h-8 animate-spin mt-10"
                style={{ animationDuration: "2s" }}
                aria-hidden="true"
              />
            )}
          </div>
        </div>
      )}

      {/* Main content — visible behind splash, fully visible once done */}
      <div className={phase === "done" ? "opacity-100" : "opacity-0"}>
        {children}
      </div>
    </>
  );
}
