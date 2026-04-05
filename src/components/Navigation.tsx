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
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-tan/30">
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="block">
            <Image
              src="/logo.svg"
              alt="Boomerang Pilates"
              width={220}
              height={34}
              className="h-7 lg:h-8 w-auto"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium tracking-wide uppercase text-brown hover:text-charcoal transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/classes#book"
              className="bg-charcoal text-cream px-6 py-2.5 text-sm font-medium tracking-wide uppercase hover:bg-brown transition-colors duration-200"
            >
              Book a Class
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-charcoal"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden pb-6 border-t border-tan/30 pt-4">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-medium tracking-wide uppercase text-brown hover:text-charcoal transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/classes#book"
                onClick={() => setIsOpen(false)}
                className="bg-charcoal text-cream px-6 py-3 text-sm font-medium tracking-wide uppercase text-center hover:bg-brown transition-colors"
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
