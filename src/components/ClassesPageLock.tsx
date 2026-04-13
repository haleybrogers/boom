"use client";

import { useEffect } from "react";

/**
 * /classes never auto-scrolls. Whether the URL has a hash or not, the page
 * loads at the top and stays there. The user can scroll wherever they want.
 *
 *   - Disable browser scroll restoration so it never lands on a previous y.
 *   - Strip any #hash from the URL on mount so the browser can't anchor-jump.
 *   - Pin scrollY at 0 across the first ~2s while LiveSchedule and other
 *     async content hydrate (otherwise late layout shifts can drift the page).
 */
export default function ClassesPageLock() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }

    // Hard-pin to the top during the first ~2s of hydration.
    let cancelled = false;
    const start = performance.now();
    const LOCK_MS = 2000;
    const pin = () => {
      if (cancelled) return;
      if (window.scrollY !== 0) window.scrollTo(0, 0);
      if (performance.now() - start < LOCK_MS) {
        requestAnimationFrame(pin);
      }
    };
    window.scrollTo(0, 0);
    requestAnimationFrame(pin);

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
