import LiveSchedule from "@/components/LiveSchedule";
import WaitlistForm from "@/components/WaitlistForm";
import FoundingPricingOverlay from "@/components/FoundingPricingOverlay";
import SchedulePrivate from "@/components/SchedulePrivate";
import ClassPacks from "@/components/ClassPacks";
import ClassGuideModal from "@/components/ClassGuideModal";
import FAQ from "@/components/FAQ";

export const metadata = {
  title: "Classes",
  description: "Classical Mat, Group Tower, Privates, and Duets. View offerings and pricing at Boomerang Pilates in Durham, NC.",
};

export default function Classes() {
  return (
    <>
      {/* 1. Schedule */}
      <section className="relative py-20 lg:py-28 bg-warm-white">
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

          <LiveSchedule />
        </div>
      </section>

      {/* 2. Founding Member Pricing — own section */}
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
      <section className="py-20 lg:py-28">
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
          <p className="text-xs tracking-widest uppercase text-accent mb-4">Stay in the Loop</p>
          <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal mb-4">
            Be the first to know.
          </h2>
          <p className="text-muted text-base mb-10">
            Grand opening details, new class drops, events, and the stuff we only share with our people.
          </p>
          <WaitlistForm />
        </div>
      </section>
    </>
  );
}
