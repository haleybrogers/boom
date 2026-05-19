"use client";

import { useLayoutEffect } from "react";

/**
 * Two-mode mount behavior for /classes:
 *
 *  1. NO hash in the URL  → force scroll to top and pin there for ~500ms so
 *     late-hydrating UI (Momence schedule widget, font swap, etc.) can't
 *     ride scroll-anchoring and drift the page partway into the founding /
 *     privates / faq sections. Original purpose of this component.
 *
 *  2. Hash IS present  → DO NOT pin. Scroll to the anchored section
 *     instead. The previous version stripped the hash and forced top,
 *     which silently broke every "/classes#privates" deep-link coming
 *     from /about and /contact.
 *
 * useLayoutEffect runs synchronously before paint so the user never sees
 * the jumped-to position.
 */
export default function ClassesPageLock() {
  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const hash = window.location.hash;

    // Mode 2: anchor navigation — let it land at the right section
    if (hash) {
      const tryScroll = () => {
        const target = document.querySelector(hash);
        if (target) {
          target.scrollIntoView({ behavior: "auto", block: "start" });
          return true;
        }
        return false;
      };
      // Try immediately, then once more after a frame in case the target
      // hasn't rendered yet.
      if (!tryScroll()) requestAnimationFrame(tryScroll);
      return;
    }

    // Mode 1: no hash — original pin-at-top defense
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
