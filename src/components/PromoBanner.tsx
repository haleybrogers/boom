import { isOpeningWeekPromoActive, isBackToSchoolPromoActive, BACK_TO_SCHOOL_BOGO_DUET_URL } from "@/lib/flags";

// Site-wide scrolling ticker for whichever seasonal promo is currently
// active. Fixed above the nav on every page; auto-hides once the active
// promo's deadline passes (see flags.ts). Navigation.tsx and the spacer
// in layout.tsx both check the same flags so everything collapses back
// to normal together when the promo ends.

export default function PromoBanner() {
  const openingWeek = isOpeningWeekPromoActive();
  const backToSchool = isBackToSchoolPromoActive();
  if (!openingWeek && !backToSchool) return null;

  // Repeated copies of the identical message so a -50% translate loops
  // seamlessly regardless of viewport width. Each repeat is two flat
  // chunks (not nested spans), so the single `gap-10` on the flex row
  // is the *only* thing controlling spacing — that's what keeps the gap
  // before and after the emoji tagline equal instead of stacking a
  // wrapper's padding on one side and a span's margin on the other.
  const repeats = Array.from({ length: 8 });

  return (
    <div className="fixed top-0 inset-x-0 z-[60] h-9 bg-[#7a1f34] overflow-hidden flex items-center">
      <div className="promo-marquee-track flex items-center gap-10 whitespace-nowrap px-10">
        {repeats.map((_, i) => (
          <span key={i} className="flex items-center gap-10 shrink-0 text-[11px] tracking-[0.15em] uppercase text-cream">
            {backToSchool ? (
              <>
                <span>🎒 Back to School 🎒</span>
                <span>
                  Use code <span className="font-bold tracking-[0.2em] mx-1.5">APPARATUS15</span>{" "}
                  for 15% off Private &amp; Duet 5- and 10-packs
                </span>
                <a
                  href={BACK_TO_SCHOOL_BOGO_DUET_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 decoration-cream/50 hover:decoration-cream transition-colors"
                >
                  Buy One, Get One Duet Session →
                </a>
              </>
            ) : (
              <>
                <span>🎉 Grand Opening Week 🎉</span>
                <span>
                  Use code <span className="font-bold tracking-[0.2em] mx-1.5">OPENINGWEEK</span>{" "}
                  for 10% off all Privates, Duets, Trios &amp; Group Apparatus
                  class packs
                </span>
              </>
            )}
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
