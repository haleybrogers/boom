import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-charcoal/10">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <Image
              src="/logo-new.svg"
              alt="Boomerang Pilates"
              width={140}
              height={44}
              className="h-10 w-auto mb-4"
            />
            <p className="text-sm text-muted leading-relaxed max-w-xs">
              Classical Pilates in Durham, NC.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-medium tracking-widest uppercase text-charcoal mb-4">
              Links
            </h4>
            <ul className="space-y-2">
              {[
                { href: "/about", label: "About" },
                { href: "/classes", label: "Classes" },
                { href: "/classes#schedule", label: "Schedule" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted hover:text-charcoal transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-medium tracking-widest uppercase text-charcoal mb-4">
              Studio
            </h4>
            <div className="space-y-2 text-sm text-muted">
              <p>Durham, NC</p>
              <p>
                <a href="mailto:hello@boomerangpilates.com" className="hover:text-charcoal transition-colors">
                  hello@boomerangpilates.com
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-charcoal/5 mt-12 pt-8">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} Boomerang Pilates
          </p>
        </div>
      </div>
    </footer>
  );
}
