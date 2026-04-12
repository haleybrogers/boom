"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/classes", label: "Classes" },
  { href: "/events", label: "Events" },
  { href: "/contact", label: "Contact" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => {
      // Switch to solid nav once scrolled past ~60% of viewport (past the hero)
      setScrolled(window.scrollY > window.innerHeight * 0.55);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  // On homepage: transparent when at top, solid when scrolled
  // On other pages: always solid
  const isTransparent = isHome && !scrolled;

  return (
    <header
      className={`z-50 transition-all duration-300 ${
        isHome
          ? "fixed top-0 left-0 right-0"
          : "sticky top-0"
      } ${
        isTransparent
          ? "bg-transparent"
          : "bg-cream/95 backdrop-blur-sm border-b border-charcoal/5"
      }`}
    >
      <nav className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex items-center justify-between h-20">
          {/* Logo — left */}
          <Link href="/" className="shrink-0">
            <Image
              src="/logo-pilat.svg"
              alt="Boomerang Pilates"
              width={400}
              height={85}
              className={`h-10 md:h-12 w-auto ${isTransparent ? "brightness-0 invert" : ""}`}
            />
          </Link>

          {/* Desktop nav links — after logo */}
          <div className="hidden md:flex items-center gap-8 ml-12">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[11px] tracking-[0.2em] uppercase transition-colors ${
                  isTransparent
                    ? "text-white/80 hover:text-white"
                    : "text-charcoal/50 hover:text-charcoal"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Social icons — far right */}
          <div className="hidden md:flex items-center gap-5">
            <a
              href="https://instagram.com/boomerangpilatesnc"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors ${
                isTransparent
                  ? "text-white/70 hover:text-white"
                  : "text-charcoal/40 hover:text-charcoal"
              }`}
              aria-label="Instagram"
            >
              <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            <a
              href="https://facebook.com/boomerangpilates"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors ${
                isTransparent
                  ? "text-white/70 hover:text-white"
                  : "text-charcoal/40 hover:text-charcoal"
              }`}
              aria-label="Facebook"
            >
              <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href="mailto:hello@boomerangpilates.com"
              className={`transition-colors ${
                isTransparent
                  ? "text-white/70 hover:text-white"
                  : "text-charcoal/40 hover:text-charcoal"
              }`}
              aria-label="Email"
            >
              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 ${isTransparent ? "text-white" : "text-charcoal"}`}
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
          <div className="md:hidden pb-8 pt-2">
            <div className="flex flex-col gap-5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-xs tracking-[0.2em] uppercase ${
                    isTransparent
                      ? "text-white/70 hover:text-white"
                      : "text-charcoal/50 hover:text-charcoal"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className={`flex items-center gap-5 pt-3 border-t ${isTransparent ? "border-white/20" : "border-charcoal/10"}`}>
                <a href="https://instagram.com/boomerangpilatesnc" target="_blank" rel="noopener noreferrer" className={isTransparent ? "text-white/60 hover:text-white" : "text-charcoal/40 hover:text-charcoal"} aria-label="Instagram">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                </a>
                <a href="https://facebook.com/boomerangpilates" target="_blank" rel="noopener noreferrer" className={isTransparent ? "text-white/60 hover:text-white" : "text-charcoal/40 hover:text-charcoal"} aria-label="Facebook">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                </a>
                <a href="mailto:hello@boomerangpilates.com" className={isTransparent ? "text-white/60 hover:text-white" : "text-charcoal/40 hover:text-charcoal"} aria-label="Email">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
