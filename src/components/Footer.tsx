"use client";

import { useState } from "react";
import Link from "next/link";
import PilatesWisdom from "./PilatesWisdom";

export default function Footer() {
  const [eggHover, setEggHover] = useState(false);
  return (
    <footer className="border-t border-charcoal/10">
      {/* Founding member CTA — small version of the about-page block */}
      <div className="border-b border-charcoal/5 bg-cream/60">
        <div className="max-w-xl mx-auto px-6 py-14 text-center">
          <p className="text-[10px] tracking-[0.4em] uppercase text-accent mb-3">Limited Time</p>
          <h2 className="font-serif text-2xl md:text-3xl font-light text-charcoal mb-3">
            Be a founding member.
          </h2>
          <p className="text-sm text-muted leading-relaxed mb-6 max-w-md mx-auto">
            Lock in your rate before we open — it never goes up. Plus invites to the soft opening and celebratory events.
          </p>
          <Link
            href="/classes#founding"
            className="btn-animated inline-block bg-accent text-white text-xs tracking-widest uppercase px-8 py-3 hover:bg-accent/90 transition-colors"
          >
            See Founding Pricing
          </Link>
        </div>
      </div>

      {/* Weird Pilates fact of the day — small & playful */}
      <div className="border-b border-charcoal/5 py-6">
        <PilatesWisdom />
      </div>
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col items-center gap-6">
          {/* Social icons */}
          <div className="flex items-center gap-5">
            {/* Instagram */}
            <a
              href="https://instagram.com/boomerangpilatesnc"
              target="_blank"
              rel="noopener noreferrer"
              className="text-charcoal/40 hover:text-accent transition-colors"
              aria-label="Instagram"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            {/* Facebook */}
            <a
              href="https://facebook.com/boomerangpilates"
              target="_blank"
              rel="noopener noreferrer"
              className="text-charcoal/40 hover:text-accent transition-colors"
              aria-label="Facebook"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-xs text-muted">
            <a href="mailto:info@boomerangpilatesnc.com" className="hover:text-accent transition-colors">
              info@boomerangpilatesnc.com
            </a>
          </div>

          {/* Review CTA — soft serif pill to match Class Guide */}
          <a
            href="https://g.page/r/boomerangpilates/review"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 bg-cream border border-accent/20 pl-3 pr-4 py-2 rounded-full shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-accent/40 transition-all duration-300"
          >
            <span className="flex items-center gap-0.5 text-accent/70 group-hover:text-accent transition-colors">
              {[0, 1, 2, 3, 4].map((i) => (
                <svg key={i} className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </span>
            <span className="font-serif italic text-sm text-charcoal group-hover:text-accent transition-colors">
              Leave us a little love
            </span>
            <span className="text-accent/50 group-hover:text-accent transition-colors text-xs">→</span>
          </a>

          {/* Copyright */}
          <p
            className="text-xs text-muted/60 cursor-default transition-all duration-300"
            onMouseEnter={() => setEggHover(true)}
            onMouseLeave={() => setEggHover(false)}
          >
            {eggHover ? (
              <span className="text-accent/80">Est. 2026. But the method? 1920.</span>
            ) : (
              <>&copy; {new Date().getFullYear()} Boomerang Pilates · 343 W Main St, Durham, NC</>
            )}
          </p>
        </div>
      </div>
    </footer>
  );
}
