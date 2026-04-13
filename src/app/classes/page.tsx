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

      {/* 4. Waitlist */}
      <section id="book" className="py-24 lg:py-32">
        <div className="max-w-xl mx-auto px-6 text-center">
          <p className="text-xs tracking-widest uppercase text-accent mb-4">Opening Soon</p>
          <h2 className="font-serif text-3xl font-light text-charcoal mb-4">
            Get on the list.
          </h2>
          <p className="text-muted text-base mb-10">
            Founding members get exclusive invites to our soft opening and celebratory events.
          </p>
          <WaitlistForm />
        </div>
      </section>
    </>
  );
}
