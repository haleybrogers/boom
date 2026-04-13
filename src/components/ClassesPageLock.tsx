"use client";

import { useEffect } from "react";

/**
 * Prevents the /classes page from auto-jumping to a section after load.
 *
 * Root causes we're defending against:
 *  1. Browser scroll-anchoring / hash resolution firing while async content
 *     (LiveSchedule) is still hydrating.
 *  2. History scroll-restoration restoring a previous scroll position.
 *  3. Late layout shifts pushing the scroll position down.
 *
 * On mount we disable scroll restoration, strip any hash, and pin scrollY at
 * 0 across the first ~1.5s — long enough to outlast LiveSchedule's async
 * render and any other late layout shifts.
 */
export default function ClassesPageLock() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }

    let cancelled = false;
    const start = performance.now();
    const LOCK_MS = 1500;

    const pin = () => {
      if (cancelled) return;
      if (window.scrollY !== 0) window.scrollTo(0, 0);
      if (performance.now() - start < LOCK_MS) {
        requestAnimationFrame(pin);
      }
    };
    requestAnimationFrame(pin);

    return () => { cancelled = true; };
  }, []);

  return null;
}
