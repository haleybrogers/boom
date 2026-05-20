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
      {/* Header — no banner photo; heading does the work */}
      <section className="bg-warm-white pt-28 lg:pt-36 pb-10 lg:pb-14">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p className="text-[11px] tracking-[0.4em] uppercase text-accent mb-5">
            The Schedule
          </p>
          <h1 className="font-serif text-5xl md:text-6xl font-light text-charcoal leading-tight">
            Book a class.
          </h1>
          <div className="w-12 h-px bg-accent mx-auto mt-8 mb-8" />
          <div className="flex items-center justify-center">
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
