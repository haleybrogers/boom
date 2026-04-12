import LiveSchedule from "@/components/LiveSchedule";
import WaitlistForm from "@/components/WaitlistForm";
import ClassAccordions from "@/components/ClassAccordions";
import PricingComparison from "@/components/PricingComparison";

export const metadata = {
  title: "Classes",
  description: "Classical Mat, Group Tower, Privates, and Duets. View offerings and pricing at Boomerang Pilates in Durham, NC.",
};

export default function Classes() {
  return (
    <>
      {/* The Method — FIRST THING */}
      <section className="py-16 lg:py-24 bg-warm-white">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h1 className="font-serif text-3xl md:text-4xl font-light text-charcoal mb-5">
            The Method Adapts to You
          </h1>
          <p className="text-base text-muted leading-relaxed">
            Classical Pilates — mat and apparatus — was designed for every body. The exercises come
            in a set order, so you always know what&apos;s next. If something doesn&apos;t work for you
            today, skip it or repeat what does. Nothing needs to be watered down to be accessible.
          </p>
        </div>
      </section>

      {/* Live Schedule */}
      <section className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-2xl md:text-3xl font-light text-charcoal mb-3 text-center">
            This Week
          </h2>
          <p className="text-muted text-sm text-center mb-8 max-w-md mx-auto">
            Tap a class for details. Book directly through Arketa.
          </p>
          <LiveSchedule />
        </div>
      </section>

      {/* Class Details — Accordions */}
      <section className="py-24 lg:py-32">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-serif text-2xl md:text-3xl font-light text-charcoal mb-10 text-center">
            Our Classes
          </h2>
          <ClassAccordions />
        </div>
      </section>

      {/* Founding Member Pricing */}
      <PricingComparison />

      {/* Waitlist */}
      <section id="book" className="py-24 lg:py-32">
        <div className="max-w-xl mx-auto px-6 text-center">
          <p className="text-xs tracking-widest uppercase text-accent mb-4">Coming Soon</p>
          <h2 className="font-serif text-3xl font-light text-charcoal mb-4">
            Get on the list.
          </h2>
          <p className="text-muted text-base mb-10">
            We&apos;re opening soon. Sign up to be the first to know — and your
            first class is on us.
          </p>
          <WaitlistForm />
        </div>
      </section>
    </>
  );
}
