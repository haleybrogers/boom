"use client";

import { Children, useState, type ReactNode } from "react";

// Collapsible bio block. Renders the first child by default and hides
// the rest behind a "Read more" toggle. Used on /about so the
// founders' full bios are available without bloating the first read.
//
// Usage:
//   <ExpandableBio>
//     <p>...first paragraph (always visible)...</p>
//     <p>...second paragraph (hidden until expanded)...</p>
//     <p>...third paragraph...</p>
//   </ExpandableBio>
//
// All children are passed in by the parent as plain JSX so styling
// (mb, text color, etc.) stays with the bio content itself — this
// component just controls visibility + the toggle.

export default function ExpandableBio({
  children,
  initialCount = 1,
}: {
  children: ReactNode;
  /** How many top children to show before "Read more". Default 1. */
  initialCount?: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const all = Children.toArray(children);
  const visible = expanded ? all : all.slice(0, initialCount);
  const hasMore = all.length > initialCount;

  return (
    <>
      {visible}
      {hasMore && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="inline-flex items-center gap-1.5 text-xs tracking-[0.25em] uppercase text-accent hover:text-accent/70 transition-colors mb-5 cursor-pointer"
        >
          {expanded ? (
            <>
              <span>Read less</span>
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.75}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </>
          ) : (
            <>
              <span>Read more</span>
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.75}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </>
          )}
        </button>
      )}
    </>
  );
}
