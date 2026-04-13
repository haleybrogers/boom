import LiveSchedule from "@/components/LiveSchedule";
import WaitlistForm from "@/components/WaitlistForm";
import FoundingPricingOverlay from "@/components/FoundingPricingOverlay";
import SchedulePrivate from "@/components/SchedulePrivate";
import ClassPacks from "@/components/ClassPacks";
import ClassGuideModal from "@/components/ClassGuideModal";
import ClassesPageLock from "@/components/ClassesPageLock";
import FAQ from "@/components/FAQ";

export const metadata = {
  title: "Classes",
  description:
    "Classical Mat, Group Tower, Privates, and Duets. View offerings and pricing at Boomerang Pilates in Durham, NC.",
};

export default function Classes() {
  return (
    <>
      {/* Hash-aware scroll lock: pins at top during async hydration, then
          smooth-scrolls to the requested #section if the URL has a hash. */}
      <ClassesPageLock />

      {/* 1. Schedule */}
      <section className="relative overflow-hidden bg-warm-white pt-28 lg:pt-36 pb-20 lg:pb-24">
        <div className="relative max-w-6xl mx-auto px-6">
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

          <LiveSchedule />
        </div>
      </section>

      {/* 2. Founding Member Pricing */}
      <section id="founding" className="py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <FoundingPricingOverlay />
        </div>
      </section>

      {/* 3. Schedule a Private */}
      <section id="privates" className="py-20 lg:py-28 bg-warm-white">
        <SchedulePrivate />
      </section>

      {/* 4. Class Packs & Drop-Ins */}
      <section id="packs" className="py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <ClassPacks />
        </div>
      </section>

      {/* 5. FAQ */}
      <section id="faq" className="py-20 lg:py-28 bg-warm-white">
        <div className="max-w-5xl mx-auto px-6">
          <FAQ />
        </div>
      </section>

      {/* 6. Generic email capture */}
      <section id="book" className="py-24 lg:py-32">
        <div className="max-w-xl mx-auto px-6 text-center">
          <p className="text-xs tracking-widest uppercase text-accent mb-4">
            Stay in the Loop
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal mb-4">
            Be the first to know.
          </h2>
          <p className="text-muted text-base mb-10">
            Grand opening details, new class drops, events, and the stuff we
            only share with our people.
          </p>
          <WaitlistForm />
        </div>
      </section>
    </>
  );
}
