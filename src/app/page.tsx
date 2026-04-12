import Image from "next/image";
import Link from "next/link";
import WaitlistForm from "@/components/WaitlistForm";
import FoundingPopup from "@/components/FoundingPopup";
import OfferingCards from "@/components/OfferingCards";
import NewToPilates from "@/components/NewToPilates";
import StickyCTA from "@/components/StickyCTA";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] sm:h-[70vh] overflow-hidden">
        <Image
          src="/hero-image.png"
          alt="Two figures in the Boomerang Pilates pose"
          fill
          className="object-cover object-bottom"
          priority
        />
      </section>

      {/* Positioning statement + CTA */}
      <section className="py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-xs tracking-widest uppercase text-accent mb-4">
            Opening Soon
          </p>
          <p className="font-serif text-2xl sm:text-3xl md:text-4xl font-light text-charcoal leading-snug">
            Downtown Durham&apos;s only Classical Pilates studio.
          </p>
          <div className="mt-6">
            <Link
              href="#waitlist"
              className="btn-animated inline-block bg-accent text-white text-xs tracking-widest uppercase px-8 py-3.5 hover:bg-accent/90 transition-colors"
            >
              Become a Founding Member
            </Link>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-20 lg:py-28 bg-warm-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal mb-3">
              What We Offer
            </h2>
            <p className="text-muted text-base max-w-md mx-auto">
              Mat, apparatus, privates, and duets — classical Pilates the way it was designed.
            </p>
          </div>
          <OfferingCards />
        </div>
      </section>

      {/* New to Pilates? */}
      <NewToPilates />

      {/* Waitlist */}
      <section id="waitlist" className="py-24 lg:py-32 bg-warm-white">
        <div className="max-w-xl mx-auto px-6 text-center">
          <p className="text-xs tracking-widest uppercase text-accent mb-4">Founding Members</p>
          <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal mb-4">
            Be the first through the door.
          </h2>
          <p className="text-muted text-base mb-10">
            Lock in your rate forever. Get exclusive invites to our soft opening and celebratory events.
          </p>
          <WaitlistForm />
        </div>
      </section>

      {/* Sticky CTA + Founding popup */}
      <StickyCTA />
      <FoundingPopup />
    </>
  );
}
