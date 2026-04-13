"use client";

import { useEffect } from "react";

/**
 * One-shot scroll reset on /classes mount.
 *
 * The intermittent "jumps to a lower section" bug was the browser restoring
 * a previously-saved scroll position from a prior visit. We disable scroll
 * restoration, strip any URL hash so the browser can't anchor-jump, and
 * scrollTo(0,0) once. After that we get out of the way — no RAF loop, no
 * fighting the user's scroll.
 */
export default function ClassesPageLock() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }
    // Two scroll-to-top calls: one synchronously now, one after the browser's
    // own scroll-restoration would have fired (next tick + after layout).
    window.scrollTo(0, 0);
    requestAnimationFrame(() => window.scrollTo(0, 0));
    const t = setTimeout(() => window.scrollTo(0, 0), 0);
    return () => clearTimeout(t);
  }, []);

  return null;
}
