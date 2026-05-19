import Image from "next/image";
import MomenceScheduleInline from "@/components/MomenceScheduleInline";
import ClassGuideModal from "@/components/ClassGuideModal";

export const metadata = {
  title: "Schedule",
  description:
    "Live class schedule for Boomerang Pilates in Durham, NC. Classical mat and apparatus classes — tap any class to book.",
};

// Intentionally simple. /schedule is the single most important page on the
// site — it needs to render the Momence widget reliably and not be tied up
// in scroll-pinning, modal logic, or stale gating. Rebuilt from scratch so
// the only moving parts are: banner image + heading + ClassGuideModal pill
// + the Momence widget (which forces hard-nav on entry to dodge the
// plugin's sticky internal state — see MomenceScheduleInline).

export default function Schedule() {
  return (
    <>
      {/* Hero banner — DSC_4087 is landscape so this aspect works */}
      <div className="relative w-full aspect-[3/2] sm:aspect-[5/2] lg:aspect-[3/1] overflow-hidden">
        <Image
          src="/nav-schedule.jpg"
          alt="Boomerang Pilates schedule"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* Header */}
      <section className="bg-warm-white pt-16 lg:pt-20 pb-10 lg:pb-14">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p className="text-[10px] tracking-[0.4em] uppercase text-accent mb-5">
            The Schedule
          </p>
          <h1 className="font-serif text-5xl md:text-6xl font-light text-charcoal leading-tight">
            Book a class.
          </h1>
          <div className="w-12 h-px bg-accent mx-auto mt-8 mb-6" />
          <p className="font-serif italic text-base md:text-lg text-charcoal/70 max-w-md mx-auto">
            Tap a class to see details and book your spot.
          </p>
          <div className="mt-6 flex items-center justify-center">
            <ClassGuideModal />
          </div>
        </div>
      </section>

      {/* Widget */}
      <section className="bg-warm-white pb-20 lg:pb-28">
        <div className="max-w-5xl mx-auto px-6">
          <MomenceScheduleInline />
        </div>
      </section>
    </>
  );
}
