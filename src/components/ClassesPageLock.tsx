"use client";

import { useLayoutEffect } from "react";

/**
 * Forces /classes to start at the top on EVERY mount — including soft
 * client-side navigations from <Link>, where the inline <script> tag in
 * page.tsx doesn't re-execute. useLayoutEffect runs synchronously before
 * paint, so the user never sees the jumped-to position. We also pin the
 * scroll for ~500ms to defeat any late layout shifts (LiveSchedule data
 * hydrating, font swap, etc.) that scroll-anchoring could ride.
 */
export default function ClassesPageLock() {
  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }
    window.scrollTo(0, 0);

    const start = performance.now();
    let raf = 0;
    const pin = () => {
      if (window.scrollY !== 0) window.scrollTo(0, 0);
      if (performance.now() - start < 500) {
        raf = requestAnimationFrame(pin);
      }
    };
    raf = requestAnimationFrame(pin);

    // Stop pinning the moment the user actually tries to scroll.
    const release = () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("wheel", release);
      window.removeEventListener("touchstart", release);
      window.removeEventListener("keydown", release);
    };
    window.addEventListener("wheel", release, { passive: true });
    window.addEventListener("touchstart", release, { passive: true });
    window.addEventListener("keydown", release);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("wheel", release);
      window.removeEventListener("touchstart", release);
      window.removeEventListener("keydown", release);
    };
  }, []);

  return null;
}
