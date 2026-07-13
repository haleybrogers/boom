import { isOpeningWeekPromoActive } from "@/lib/flags";

// Site-wide scrolling ticker for the opening-week apparatus discount.
// Fixed above the nav on every page; auto-hides once
// OPENING_WEEK_PROMO_DEADLINE passes (see flags.ts). Navigation.tsx and
// the spacer in layout.tsx both check the same flag so everything
// collapses back to normal together when the promo ends.

export default function PromoBanner() {
  if (!isOpeningWeekPromoActive()) return null;

  // Repeated copies of the identical message so a -50% translate loops
  // seamlessly regardless of viewport width.
  const items = Array.from({ length: 8 });

  return (
    <div className="fixed top-0 inset-x-0 z-[60] h-9 bg-[#7a1f34] overflow-hidden flex items-center">
      <div className="promo-marquee-track flex whitespace-nowrap">
        {items.map((_, i) => (
          <span
            key={i}
            className="flex items-center text-[11px] tracking-[0.15em] uppercase text-cream px-8 shrink-0"
          >
            <span className="mr-8">• Grand Opening Week •</span>
            <span>
              Use code <span className="font-bold tracking-[0.2em] mx-1.5">OPENINGWEEK</span>{" "}
              for 10% off all Privates, Duets, Trios &amp; Group Apparatus
              class packs
            </span>
          </span>
        ))}
      </div>
      <style>{`
        .promo-marquee-track {
          animation: promo-marquee-scroll 90s linear infinite;
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
