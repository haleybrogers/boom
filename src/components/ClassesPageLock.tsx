"use client";

import { useEffect } from "react";

/**
 * /classes scroll behavior:
 *   - On every load, force scroll to the very top first (overrides browser
 *     scroll-restoration and any premature hash jump).
 *   - If a hash like #founding is present in the URL, wait for the page to
 *     settle (LiveSchedule hydrates async and changes layout), then
 *     scroll smoothly to the target section.
 *   - If no hash, stay pinned at the top.
 */
export default function ClassesPageLock() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const hash = window.location.hash;

    // Hard pin to top during the first ~1500ms while async content settles.
    let cancelled = false;
    const start = performance.now();
    const LOCK_MS = 1500;
    const pin = () => {
      if (cancelled) return;
      if (window.scrollY !== 0) window.scrollTo(0, 0);
      if (performance.now() - start < LOCK_MS) {
        requestAnimationFrame(pin);
      } else if (hash) {
        // After lock ends, smooth-scroll to the requested section (if any).
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };
    requestAnimationFrame(pin);

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
