import { isOpeningWeekPromoActive } from "@/lib/flags";

// Site-wide scrolling ticker for the opening-week apparatus discount.
// Fixed above the nav on every page; auto-hides once
// OPENING_WEEK_PROMO_DEADLINE passes (see flags.ts). Navigation.tsx and
// the spacer in layout.tsx both check the same flag so everything
// collapses back to normal together when the promo ends.

export default function PromoBanner() {
  if (!isOpeningWeekPromoActive()) return null;

  // Repeated copies of the identical message so a -50% translate loops
  // seamlessly regardless of viewport width. Each repeat is two flat
  // chunks (not nested spans), so the single `gap-10` on the flex row
  // is the *only* thing controlling spacing — that's what keeps the gap
  // before and after "Grand Opening Week" equal instead of stacking a
  // wrapper's padding on one side and a span's margin on the other.
  const repeats = Array.from({ length: 8 });

  return (
    <div className="fixed top-0 inset-x-0 z-[60] h-9 bg-[#7a1f34] overflow-hidden flex items-center">
      <div className="promo-marquee-track flex items-center gap-10 whitespace-nowrap px-10">
        {repeats.map((_, i) => (
          <span key={i} className="flex items-center gap-10 shrink-0 text-[11px] tracking-[0.15em] uppercase text-cream">
            <span>🎉 Grand Opening Week 🎉</span>
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
