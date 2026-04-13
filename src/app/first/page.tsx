"use client";

import { useState } from "react";
import Link from "next/link";

export const dynamic = "force-static";

export default function First() {
  const [copied, setCopied] = useState(false);
  const code = "FIRST10";

  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-32 lg:py-40 min-h-[70vh]">
      <div className="max-w-lg mx-auto px-6 text-center">
        <p className="text-xs tracking-widest uppercase text-accent mb-4">
          You found us.
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl font-light text-charcoal mb-5">
          Well, hello.
        </h1>
        <p className="text-muted text-base leading-relaxed mb-10">
          Only a few people know this page exists. Use this code at checkout for
          <span className="text-charcoal font-medium"> 10% off</span> any class pack
          or your first month of membership.
        </p>

        <button
          onClick={copy}
          className="group inline-flex items-center gap-3 border-2 border-dashed border-accent/40 bg-accent/5 hover:bg-accent/10 hover:border-accent/60 transition-all px-8 py-5 rounded-sm mb-8"
        >
          <span className="font-serif text-3xl font-light text-charcoal tracking-[0.3em]">
            {code}
          </span>
          <span className="text-[10px] tracking-widest uppercase text-accent">
            {copied ? "Copied ✓" : "Click to copy"}
          </span>
        </button>

        <p className="text-xs text-muted/60 mb-8">
          Tell a friend. Or don&apos;t. That&apos;s the whole point of a secret.
        </p>

        <Link
          href="/classes"
          className="link-arrow text-xs tracking-widest uppercase text-accent hover:text-accent/80 transition-colors"
        >
          Book a class
        </Link>
      </div>
    </section>
  );
}
