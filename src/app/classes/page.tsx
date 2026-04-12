import LiveSchedule from "@/components/LiveSchedule";
import WaitlistForm from "@/components/WaitlistForm";
import ClassesTabs from "@/components/ClassesTabs";

export const metadata = {
  title: "Classes",
  description: "Classical Mat, Group Tower, Privates, and Duets. View offerings and pricing at Boomerang Pilates in Durham, NC.",
};

export default function Classes() {
  return (
    <>
      {/* Intro */}
      <section className="py-16 lg:py-24 bg-warm-white">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p className="text-xs tracking-widest uppercase text-accent mb-4">Classes &amp; Pricing</p>
          <h1 className="font-serif text-3xl md:text-4xl font-light text-charcoal mb-5">
            The Method Adapts to You
          </h1>
          <p className="text-base text-muted leading-relaxed">
            Classical Pilates — mat and apparatus — was designed for every body. The exercises come
            in a set order, so you always know what&apos;s next. If something doesn&apos;t work for you
            today, skip it or repeat what does.
          </p>
        </div>
      </section>

      {/* Classes / Pricing tabs */}
      <section className="py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <ClassesTabs />
        </div>
      </section>

      {/* Schedule */}
      <section className="py-20 lg:py-28 bg-warm-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal mb-3 text-center">
            Schedule
          </h2>
          <p className="text-muted text-base text-center mb-10 max-w-md mx-auto">
            Tap a class to see details and book your spot.
          </p>
          <LiveSchedule />
        </div>
      </section>

      {/* Waitlist */}
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
