import { isOpeningWeekPromoActive } from "@/lib/flags";

// Site-wide scrolling ticker for the opening-week apparatus discount.
// Fixed above the nav on every page; auto-hides once
// OPENING_WEEK_PROMO_DEADLINE passes (see flags.ts). Navigation.tsx and
// the spacer in layout.tsx both check the same flag so everything
// collapses back to normal together when the promo ends.

const MESSAGE =
  "Use code OPENINGWEEK for 10% off all Privates, Duets, Trios & Group Apparatus class packs";

export default function PromoBanner() {
  if (!isOpeningWeekPromoActive()) return null;

  // Repeated copies of the identical message so a -50% translate loops
  // seamlessly regardless of viewport width.
  const items = Array.from({ length: 8 });

  return (
    <div className="fixed top-0 inset-x-0 z-[60] h-9 bg-charcoal overflow-hidden flex items-center">
      <div className="promo-marquee-track flex whitespace-nowrap">
        {items.map((_, i) => (
          <span
            key={i}
            className="text-[11px] tracking-[0.15em] uppercase text-cream px-8 shrink-0"
          >
            {MESSAGE}
          </span>
        ))}
      </div>
      <style>{`
        .promo-marquee-track {
          animation: promo-marquee-scroll 32s linear infinite;
        }
        @keyframes promo-marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .promo-marquee-track {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
