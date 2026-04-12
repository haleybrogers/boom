import LiveSchedule from "@/components/LiveSchedule";
import WaitlistForm from "@/components/WaitlistForm";
import ClassesTabs from "@/components/ClassesTabs";
import FoundingPricing from "@/components/FoundingPricing";
import SchedulePrivate from "@/components/SchedulePrivate";

export const metadata = {
  title: "Classes",
  description: "Classical Mat, Group Tower, Privates, and Duets. View offerings and pricing at Boomerang Pilates in Durham, NC.",
};

export default function Classes() {
  return (
    <>
      {/* 1. Schedule at top — with Opening Soon overlay */}
      <section className="relative py-20 lg:py-28 bg-warm-white">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="font-serif text-3xl md:text-4xl font-light text-charcoal mb-3 text-center">
            Book a Class
          </h1>
          <p className="text-muted text-base text-center mb-10 max-w-md mx-auto">
            Tap a class to see details and book your spot.
          </p>

          {/* Schedule with overlay */}
          <div className="relative">
            <div className="opacity-30 pointer-events-none select-none">
              <LiveSchedule />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/95 backdrop-blur-sm border border-charcoal/10 px-10 py-10 text-center shadow-sm max-w-md">
                <p className="text-xs tracking-widest uppercase text-accent mb-3">Opening Soon</p>
                <h2 className="font-serif text-2xl md:text-3xl font-light text-charcoal mb-3">
                  We&apos;re almost ready.
                </h2>
                <p className="text-muted text-sm mb-6">
                  Join the waitlist to be the first to book when our schedule goes live.
                </p>
                <a
                  href="#book"
                  className="btn-animated inline-block bg-accent text-white text-xs tracking-widest uppercase px-8 py-3.5 hover:bg-accent/90 transition-colors"
                >
                  Join the Waitlist
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Founding Member Pricing — right below schedule */}
      <section className="py-24 lg:py-32">
        <FoundingPricing />
      </section>

      {/* 3. Schedule a Private */}
      <section className="py-20 lg:py-28 bg-warm-white">
        <SchedulePrivate />
      </section>

      {/* 4. Classes / Pricing tabs */}
      <section className="py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <ClassesTabs />
        </div>
      </section>

      {/* 5. Waitlist */}
      <section id="book" className="py-24 lg:py-32 bg-warm-white">
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
