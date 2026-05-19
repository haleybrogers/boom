import MomenceScheduleInline from "@/components/MomenceScheduleInline";
import FoundingPricingOverlay from "@/components/FoundingPricingOverlay";
import SchedulePrivate from "@/components/SchedulePrivate";
import ClassGuideModal from "@/components/ClassGuideModal";
import FAQ from "@/components/FAQ";
import ClassesPageLock from "@/components/ClassesPageLock";
import { SHOW_FOUNDING } from "@/lib/flags";

const MOMENCE_PACKS_URL = `https://momence.com/host/${process.env.NEXT_PUBLIC_MOMENCE_HOST_ID || "270195"}/memberships`;

export const metadata = {
  title: "Classes",
  description:
    "Classical Mat, Group Tower, Privates, and Duets. View offerings and pricing at Boomerang Pilates in Durham, NC.",
};

export default function Classes() {
  return (
    <>
      <ClassesPageLock />

      {/* 1. Schedule — header on top, then widget. */}
      <section className="relative overflow-hidden bg-warm-white pt-28 lg:pt-36 pb-20 lg:pb-24">
        <div className="relative max-w-5xl mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <p
              className="text-[10px] tracking-[0.4em] uppercase text-accent mb-5 animate-fade-up"
              style={{ animationDelay: "0.05s" }}
            >
              The Schedule
            </p>
            <h1
              className="font-serif text-5xl md:text-6xl font-light text-charcoal leading-tight animate-fade-up"
              style={{ animationDelay: "0.15s" }}
            >
              Book a class.
            </h1>
            <div
              className="w-12 h-px bg-accent mx-auto mt-8 mb-6 animate-fade-up"
              style={{ animationDelay: "0.3s" }}
            />
            <p
              className="font-serif italic text-base md:text-lg text-charcoal/70 max-w-md mx-auto animate-fade-up"
              style={{ animationDelay: "0.4s" }}
            >
              Tap a class to see details and book your spot.
            </p>
            <div
              className="mt-6 flex items-center justify-center animate-fade-up"
              style={{ animationDelay: "0.55s" }}
            >
              <ClassGuideModal />
            </div>
          </div>

          <MomenceScheduleInline />
        </div>
      </section>

      {/* 2. Founding Member Pricing — gated behind SHOW_FOUNDING flag */}
      {SHOW_FOUNDING && (
        <section id="founding" className="py-20 lg:py-28">
          <div className="max-w-5xl mx-auto px-6">
            <FoundingPricingOverlay />
          </div>
        </section>
      )}

      {/* 3. Schedule a Private */}
      <section id="privates" className="py-20 lg:py-28 bg-warm-white">
        <SchedulePrivate />
      </section>

      {/* 4. Class Packs — link out to Momence (full grid retired until
          Emilie configures packs there; ClassPacks.tsx kept for later) */}
      <section id="packs" className="py-16 lg:py-20">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p className="text-xs tracking-widest uppercase text-accent mb-3">
            Class Packs &amp; Memberships
          </p>
          <h2 className="font-serif text-2xl md:text-3xl font-light text-charcoal mb-5">
            Buy a pack or membership.
          </h2>
          <a
            href={MOMENCE_PACKS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-animated inline-block bg-accent text-white text-xs tracking-widest uppercase px-8 py-3.5 hover:bg-accent/90 transition-colors"
          >
            View on Momence
          </a>
        </div>
      </section>

      {/* 5. FAQ */}
      <section id="faq" className="py-20 lg:py-28 bg-warm-white">
        <div className="max-w-5xl mx-auto px-6">
          <FAQ />
        </div>
      </section>

    </>
  );
}
