"use client";

import Button from "./Button";

type OfferCardProps = {
  title: string;
  desc: string;
  detail: string;
  cta: string;
  ctaHref: string;
  icon: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
};

export default function OfferCard({ title, desc, detail, cta, ctaHref, icon, isOpen, onToggle }: OfferCardProps) {
  return (
    <div
      onClick={onToggle}
      className="bg-cream p-8 lg:p-10 rounded-sm border border-charcoal/5 text-center cursor-pointer hover:border-accent/30 transition-all duration-300"
    >
      <div className="flex justify-center mb-5">{icon}</div>
      <h3 className="font-serif text-2xl font-light text-charcoal mb-3">
        {title}
      </h3>
      <p className="text-sm text-muted leading-relaxed">{desc}</p>

      <div
        className={`overflow-hidden transition-all duration-400 ease-in-out ${
          isOpen ? "max-h-60 opacity-100 mt-6" : "max-h-0 opacity-0 mt-0"
        }`}
      >
        <div className="border-t border-charcoal/10 pt-5">
          <p className="text-sm text-muted leading-relaxed mb-5">{detail}</p>
          <Button href={ctaHref}>{cta}</Button>
        </div>
      </div>

      <div className={`mt-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
        <svg className="w-4 h-4 mx-auto text-accent/40" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}
