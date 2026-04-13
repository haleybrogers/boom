import LiveSchedule from "@/components/LiveSchedule";
import WaitlistForm from "@/components/WaitlistForm";
import FoundingPricingOverlay from "@/components/FoundingPricingOverlay";
import SchedulePrivate from "@/components/SchedulePrivate";
import ClassPacks from "@/components/ClassPacks";
import ClassGuideModal from "@/components/ClassGuideModal";

export const metadata = {
  title: "Classes",
  description: "Classical Mat, Group Tower, Privates, and Duets. View offerings and pricing at Boomerang Pilates in Durham, NC.",
};

export default function Classes() {
  return (
    <>
      {/* 1. Schedule at top — with Founding Pricing overlay */}
      <section id="founding" className="relative py-20 lg:py-28 bg-warm-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center justify-center gap-4 mb-3">
            <h1 className="font-serif text-3xl md:text-4xl font-light text-charcoal text-center">
              Book a Class
            </h1>
          </div>
          <div className="flex items-center justify-center gap-4 mb-10">
            <p className="text-muted text-base text-center max-w-md">
              Tap a class to see details and book your spot.
            </p>
            <ClassGuideModal />
          </div>

          {/* Schedule with founding pricing overlay */}
          <div className="relative">
            <div className="opacity-30 pointer-events-none select-none">
              <LiveSchedule />
            </div>
            <FoundingPricingOverlay />
          </div>
        </div>
      </section>

      {/* 2. Class Packs & Drop-Ins */}
      <section className="py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <ClassPacks />
        </div>
      </section>

      {/* 3. Schedule a Private */}
      <section id="privates" className="py-20 lg:py-28 bg-warm-white">
        <SchedulePrivate />
      </section>

      {/* 4. Grand Opening Email Capture */}
      <section id="book" className="py-24 lg:py-32">
        <div className="max-w-2xl mx-auto px-6 text-center">
          {/* Illustration — boomerang with sparkles */}
          <div className="mb-8">
            <svg
              width="120"
              height="120"
              viewBox="0 0 120 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto"
            >
              {/* Boomerang shape */}
              <path
                d="M30 80 C20 70 18 50 35 35 C50 22 65 25 72 30 C65 28 52 30 42 40 C32 50 35 65 40 72 C45 55 55 42 72 30 C80 25 90 28 95 35 C85 30 75 35 65 45 C55 55 50 70 50 80 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-accent"
              />
              {/* Sparkle 1 — top right */}
              <g className="text-accent/60">
                <line x1="88" y1="18" x2="88" y2="28" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                <line x1="83" y1="23" x2="93" y2="23" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
              </g>
              {/* Sparkle 2 — right */}
              <g className="text-accent/40">
                <line x1="100" y1="42" x2="100" y2="48" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                <line x1="97" y1="45" x2="103" y2="45" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
              </g>
              {/* Sparkle 3 — top */}
              <g className="text-accent/50">
                <line x1="60" y1="12" x2="60" y2="20" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                <line x1="56" y1="16" x2="64" y2="16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
              </g>
              {/* Small dots */}
              <circle cx="78" cy="15" r="1.5" fill="currentColor" className="text-accent/30" />
              <circle cx="105" cy="35" r="1" fill="currentColor" className="text-accent/25" />
              <circle cx="95" cy="55" r="1.5" fill="currentColor" className="text-accent/20" />
              {/* Motion lines */}
              <path d="M25 85 C22 88 18 88 15 86" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" className="text-charcoal/20" />
              <path d="M20 78 C17 80 13 79 11 77" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" className="text-charcoal/15" />
            </svg>
          </div>

          <p className="text-xs tracking-widest uppercase text-accent mb-4">
            Grand Opening · Durham, NC
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-charcoal mb-4">
            We&apos;re Almost Here
          </h2>
          <p className="text-muted text-base leading-relaxed max-w-md mx-auto mb-10">
            Be the first to know about our grand opening, events, class drops, and studio news. No spam — just the good stuff.
          </p>
          <WaitlistForm />
        </div>
      </section>
    </>
  );
}
