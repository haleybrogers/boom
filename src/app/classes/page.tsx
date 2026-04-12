import ArketaBooking from "@/components/ArketaBooking";
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
      {/* Hero with parallax image */}
      <section
        className="relative bg-fixed bg-cover bg-center h-[40vh] lg:h-[50vh]"
        style={{ backgroundImage: "url(/photo-chair.jpg)" }}
      >
        <div className="absolute inset-0 bg-[#5c4a3a]/35" />
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center px-6">
            <h1 className="font-serif text-4xl md:text-5xl font-light text-white mb-4">
              Classes
            </h1>
            <p className="text-white/70 text-sm leading-relaxed max-w-md mx-auto">
              Classical Pilates — mat and apparatus. Find the class that meets you where you are.
            </p>
          </div>
        </div>
      </section>

      {/* Schedule & Booking — RIGHT UP TOP */}
      <ArketaBooking />

      {/* The Method */}
      <section className="py-16 lg:py-20">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="font-serif text-2xl md:text-3xl font-light text-charcoal mb-4">
            The Method Adapts to You
          </h2>
          <p className="text-sm text-muted leading-relaxed">
            Classical Pilates — mat and apparatus — was designed for every body. The exercises come
            in a set order, so you always know what&apos;s next. If something doesn&apos;t work for you
            today, skip it or repeat what does. Nothing needs to be watered down to be accessible.
          </p>
        </div>
      </section>

      {/* Class Details — Accordions */}
      <section className="pb-24 lg:pb-32">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-serif text-2xl md:text-3xl font-light text-charcoal mb-10 text-center">
            Our Classes
          </h2>
          <ClassAccordions />
        </div>
      </section>

      {/* Founding Member Pricing — the hero section */}
      <PricingComparison />

      {/* Waitlist */}
      <section id="book" className="py-24 lg:py-32">
        <div className="max-w-xl mx-auto px-6 text-center">
          <p className="text-xs tracking-widest uppercase text-accent mb-4">Coming Soon</p>
          <h2 className="font-serif text-3xl font-light text-charcoal mb-4">
            Get on the list.
          </h2>
          <p className="text-muted text-sm mb-10">
            We&apos;re opening soon. Sign up to be the first to know — and your
            first class is on us.
          </p>
          <WaitlistForm />
        </div>
      </section>
    </>
  );
}
