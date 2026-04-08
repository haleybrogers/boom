"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/classes", label: "Classes" },
  { href: "/contact", label: "Contact" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-charcoal/5">
      <nav className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-14">
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs tracking-widest uppercase text-charcoal/50 hover:text-charcoal transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <Link
            href="/classes#book"
            className="hidden md:block bg-charcoal text-white px-5 py-2 text-xs tracking-widest uppercase hover:bg-charcoal/80 transition-colors"
          >
            Book Now
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-charcoal"
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-6 pt-2">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-xs tracking-widest uppercase text-charcoal/50 hover:text-charcoal"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/classes#book"
                onClick={() => setIsOpen(false)}
                className="bg-charcoal text-white px-5 py-2.5 text-xs tracking-widest uppercase text-center"
              >
                Book Now
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
