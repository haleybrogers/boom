"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

type NavChild = {
  href: string;
  label: string;
  description: string;
  image: string;
  /**
   * If true, navigate by hard reload (regular <a>) instead of <Link>.
   * Used for /schedule because Momence's host-schedule plugin keeps
   * internal state that doesn't reset on soft-nav — even re-injecting
   * a cache-busted script — so the only reliable fix is a full page
   * load every time you land on the schedule.
   */
  hardNav?: boolean;
};

type NavItem = {
  label: string;
  href?: string;
  hardNav?: boolean;
  children?: NavChild[];
};

const navLinks: NavItem[] = [
  { href: "/about", label: "About" },
  {
    label: "Booking",
    children: [
      {
        href: "/schedule",
        label: "Schedule",
        description: "Group mat + apparatus classes",
        image: "/nav-schedule.jpg",
        hardNav: true,
      },
      {
        href: "/privates",
        label: "Privates & Duets",
        description: "One-on-one or with a partner",
        image: "/nav-privates.jpg",
      },
      {
        href: "/packs",
        label: "Packs & Memberships",
        description: "Class packs and monthly plans",
        image: "/nav-packs.jpg",
      },
    ],
  },
  { href: "/events", label: "Workshops + Events" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQ" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoTaps, setLogoTaps] = useState(0);
  const [boomerangFlying, setBoomerangFlying] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";

  const handleLogoClick = (e: React.MouseEvent) => {
    const newCount = logoTaps + 1;
    setLogoTaps(newCount);
    if (newCount >= 3) {
      e.preventDefault();
      setBoomerangFlying(true);
      setLogoTaps(0);
      setTimeout(() => setBoomerangFlying(false), 2000);
      return;
    }
    // Always scroll to top when navigating to home via logo
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // On other pages, let Link route to "/" then snap to top
      setTimeout(() => window.scrollTo({ top: 0, behavior: "instant" }), 0);
    }
    // Reset tap count if no tap within 1s
    setTimeout(() => setLogoTaps((c) => (c === newCount ? 0 : c)), 1000);
  };

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

  // Close dropdowns whenever the route changes
  useEffect(() => {
    setOpenDropdown(null);
    setIsOpen(false);
    setMobileExpanded(null);
  }, [pathname]);

  // Small delay before closing on mouseleave so users can move to the dropdown
  const openMenu = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDropdown(label);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 120);
  };

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
        isTransparent && !isOpen
          ? "bg-transparent"
          : isTransparent && isOpen
          ? "bg-charcoal/90 backdrop-blur-md"
          : "bg-cream/95 backdrop-blur-sm border-b border-charcoal/5"
      }`}
    >
      <nav className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex items-center justify-between h-20">
          {/* Logo — left */}
          <Link href="/" className="shrink-0 group" onClick={handleLogoClick}>
            <Image
              src="/logo-pilat.svg"
              alt="Boomerang Pilates"
              width={400}
              height={85}
              className={`h-10 md:h-12 w-auto transition-all duration-500 ease-out group-hover:-translate-y-0.5 group-hover:scale-[1.02] group-hover:opacity-80 ${isTransparent ? "brightness-0 invert" : ""}`}
            />
          </Link>

          {/* Easter egg: flying boomerang (uses brand boomerang icon) */}
          {boomerangFlying && (
            <div
              aria-hidden
              className="pointer-events-none fixed top-16 left-0 z-[200] boomerang-fly"
            >
              <Image
                src="/loading-icon.svg"
                alt=""
                width={44}
                height={44}
                className="w-11 h-11"
              />
            </div>
          )}

          {/* Desktop nav links — after logo */}
          <div className="hidden md:flex items-center gap-8 ml-12">
            {navLinks.map((link) => {
              const linkClass = `text-[11px] tracking-[0.2em] uppercase transition-colors flex items-center gap-1 ${
                isTransparent
                  ? "text-white/80 hover:text-white"
                  : "text-charcoal/50 hover:text-charcoal"
              }`;

              if (link.children) {
                const open = openDropdown === link.label;
                return (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => openMenu(link.label)}
                    onMouseLeave={scheduleClose}
                  >
                    <button
                      type="button"
                      className={linkClass}
                      aria-expanded={open}
                      aria-haspopup="true"
                    >
                      {link.label}
                      <svg
                        className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Dropdown panel */}
                    <div
                      className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-opacity duration-150 ${
                        open ? "opacity-100" : "opacity-0 pointer-events-none"
                      }`}
                    >
                      <div className="w-[300px] bg-cream border border-charcoal/10 rounded-sm shadow-xl overflow-hidden">
                        {link.children.map((child) => {
                          const childClass =
                            "group flex items-center justify-between gap-3 px-5 py-3.5 border-b border-charcoal/5 last:border-b-0 hover:bg-accent/5 transition-colors";
                          const inner = (
                            <>
                              <div className="flex-1 min-w-0">
                                <p className="font-serif text-base font-light text-charcoal group-hover:text-accent transition-colors leading-tight">
                                  {child.label}
                                </p>
                                <p className="text-xs text-muted mt-0.5">
                                  {child.description}
                                </p>
                              </div>
                              <span className="text-accent/40 group-hover:text-accent transition-colors text-xs">
                                →
                              </span>
                            </>
                          );
                          // hardNav child uses plain <a> so the browser does
                          // a full page load — required for /schedule because
                          // the Momence plugin's internal state survives
                          // Next.js soft-nav and leaves an empty widget.
                          return child.hardNav ? (
                            <a
                              key={child.href}
                              href={child.href}
                              className={childClass}
                              onClick={() => setOpenDropdown(null)}
                            >
                              {inner}
                            </a>
                          ) : (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => {
                                setOpenDropdown(null);
                                window.scrollTo({ top: 0, behavior: "instant" });
                              }}
                              className={childClass}
                            >
                              {inner}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href!}
                  onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}
                  className={linkClass}
                >
                  {link.label}
                </Link>
              );
            })}
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
              {navLinks.map((link) => {
                const itemClass = `text-xs tracking-[0.2em] uppercase ${
                  isTransparent
                    ? "text-white/70 hover:text-white"
                    : "text-charcoal/50 hover:text-charcoal"
                }`;

                if (link.children) {
                  const expanded = mobileExpanded === link.label;
                  return (
                    <div key={link.label} className="flex flex-col gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          setMobileExpanded(expanded ? null : link.label)
                        }
                        className={`${itemClass} flex items-center gap-2`}
                        aria-expanded={expanded}
                      >
                        {link.label}
                        <svg
                          className={`w-3 h-3 transition-transform ${expanded ? "rotate-180" : ""}`}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={1.5}
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {expanded && (
                        <div className="flex flex-col gap-3 pl-4 border-l border-charcoal/10">
                          {link.children.map((child) => {
                            const inner = (
                              <>
                                <p className={`text-xs tracking-[0.15em] uppercase ${
                                  isTransparent ? "text-white/80" : "text-charcoal/70"
                                }`}>
                                  {child.label}
                                </p>
                                <p className={`text-[11px] mt-0.5 ${
                                  isTransparent ? "text-white/40" : "text-muted/70"
                                }`}>
                                  {child.description}
                                </p>
                              </>
                            );
                            return child.hardNav ? (
                              <a
                                key={child.href}
                                href={child.href}
                                className="flex flex-col"
                                onClick={() => {
                                  setIsOpen(false);
                                  setMobileExpanded(null);
                                }}
                              >
                                {inner}
                              </a>
                            ) : (
                              <Link
                                key={child.href}
                                href={child.href}
                                onClick={() => {
                                  setIsOpen(false);
                                  setMobileExpanded(null);
                                  window.scrollTo({ top: 0, behavior: "instant" });
                                }}
                                className="flex flex-col"
                              >
                                {inner}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.href}
                    href={link.href!}
                    onClick={() => {
                      setIsOpen(false);
                      window.scrollTo({ top: 0, behavior: "instant" });
                    }}
                    className={itemClass}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className={`flex items-center gap-5 pt-3 border-t ${isTransparent ? "border-white/20" : "border-charcoal/10"}`}>
                <a href="https://instagram.com/boomerangpilatesnc" target="_blank" rel="noopener noreferrer" className={isTransparent ? "text-white/60 hover:text-white" : "text-charcoal/40 hover:text-charcoal"} aria-label="Instagram">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                </a>
                <a href="https://facebook.com/boomerangpilates" target="_blank" rel="noopener noreferrer" className={isTransparent ? "text-white/60 hover:text-white" : "text-charcoal/40 hover:text-charcoal"} aria-label="Facebook">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
