"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function SplashScreen({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setFading(true), 2000);
    const t2 = setTimeout(() => setVisible(false), 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
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
      )}
      {children}
    </>
  );
}
