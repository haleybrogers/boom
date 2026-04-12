import Image from "next/image";
import WaitlistForm from "@/components/WaitlistForm";
import FoundingPopup from "@/components/FoundingPopup";
import OfferingCards from "@/components/OfferingCards";

export default function Home() {
  return (
    <>
      {/* Hero — top third of image */}
      <section className="relative h-[60vh] sm:h-[70vh] overflow-hidden">
        <Image
          src="/hero-image.png"
          alt="Two figures in the Boomerang Pilates pose"
          fill
          className="object-cover object-bottom"
          priority
        />
      </section>

      {/* Positioning statement */}
      <section className="py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="font-serif text-2xl sm:text-3xl md:text-4xl font-light text-charcoal leading-snug">
            Downtown Durham&apos;s only Classical Pilates studio.
          </p>
        </div>
      </section>

      {/* What We Offer — expandable cards with photos */}
      <section className="pb-20 lg:pb-28">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-serif text-2xl md:text-3xl font-light text-charcoal mb-8 text-center">
            What We Offer
          </h2>
          <OfferingCards />
        </div>
      </section>

      {/* Waitlist — clean and quiet */}
      <section id="waitlist" className="py-24 lg:py-32 bg-warm-white">
        <div className="max-w-xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal mb-4">
            Be the first through the door.
          </h2>
          <p className="text-muted text-base mb-10">
            Founding members get exclusive invites to our soft opening and celebratory events.
          </p>
          <WaitlistForm />
        </div>
      </section>

      {/* Founding member popup */}
      <FoundingPopup />
    </>
  );
}
