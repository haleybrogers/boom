"use client";

import Link from "next/link";
import Image from "next/image";
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
    <header className="sticky top-0 z-50 backdrop-blur-sm bg-cream/95 border-b border-charcoal/5">
      <nav className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-14 relative">
          {/* Logo */}
          <div>
            <Link href="/">
              <Image
                src="/logo-wordmark.svg"
                alt="Boomerang Pilates"
                width={200}
                height={40}
                className="h-8 w-auto"
              />
            </Link>
          </div>

          {/* Desktop nav links — centered */}
          <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
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

          {/* Book button */}
          <Link
            href="#waitlist"
            className="hidden md:block bg-accent text-white px-5 py-2 text-xs tracking-widest uppercase rounded-sm hover:bg-accent/85 transition-all duration-300"
          >
            Join Waitlist
          </Link>

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
                href="#waitlist"
                onClick={() => setIsOpen(false)}
                className="bg-accent text-white px-5 py-2.5 text-xs tracking-widest uppercase text-center rounded-sm"
              >
                Join Waitlist
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
