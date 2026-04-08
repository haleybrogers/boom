"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/classes", label: "Classes" },
  { href: "/contact", label: "Contact" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-sm transition-all duration-300 ${
        scrolled ? "bg-cream/95 border-b border-charcoal/5" : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-14 relative">
          {/* Logo — only visible on scroll */}
          <div
            className={`transition-opacity duration-300 ${
              scrolled ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <Link href="/">
              <Image
                src="/logo-color.svg"
                alt="Boomerang Pilates"
                width={120}
                height={90}
                className="h-10 w-auto"
              />
            </Link>
          </div>

          {/* Desktop nav links — centered */}
          <div className={`hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2 transition-opacity duration-300 ${scrolled ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs tracking-widest uppercase text-charcoal/50 hover:text-accent transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Spacer to balance the layout */}
          <div className="hidden md:block w-10" />

          {/* Mobile menu button */}
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
                  className="text-xs tracking-widest uppercase text-charcoal/50 hover:text-accent"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/classes#book"
                onClick={() => setIsOpen(false)}
                className="bg-accent text-white px-5 py-2.5 text-xs tracking-widest uppercase text-center rounded-sm"
              >
                Book a Class
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
