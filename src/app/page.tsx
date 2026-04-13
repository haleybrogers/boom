import Image from "next/image";
import Link from "next/link";
import WaitlistForm from "@/components/WaitlistForm";
import FoundingPopup from "@/components/FoundingPopup";
import OfferingCards from "@/components/OfferingCards";
import NewToPilates from "@/components/NewToPilates";
import StickyCTA from "@/components/StickyCTA";
import FoundingCountdown from "@/components/FoundingCountdown";

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

      {/* Positioning statement */}
      <section className="py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-xs tracking-widest uppercase text-accent mb-4">
            Opening Soon
          </p>
          <p className="font-serif text-2xl sm:text-3xl md:text-4xl font-light text-charcoal leading-snug mb-4">
            Downtown Durham&apos;s only Classical Pilates studio.
          </p>
          <p className="text-muted text-sm max-w-lg mx-auto leading-relaxed">
            Two sisters. Third-generation classically trained, fully certified across the method. One belief: classical Pilates was made for every body — not just the front row. We built this studio to prove it.
          </p>
        </div>
      </section>

      {/* Founding Member Tease */}
      <section className="pb-16 lg:pb-24">
        <div className="max-w-lg mx-auto px-6">
          <div className="bg-accent/5 border border-accent/15 rounded-sm px-8 py-10 text-center">
            <p className="text-[10px] tracking-[0.25em] uppercase text-accent mb-5">
              Founding Member · Ends June 15
            </p>
            <FoundingCountdown showLabel={false} />
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-charcoal mb-3 mt-2 leading-tight">
              Become a Founding Member.
            </h2>
            <p className="text-sm text-muted mb-6 max-w-sm mx-auto leading-relaxed">
              Get access to pre-opening pricing, soft-opening classes, and a few perks no one else can buy.
            </p>
            <Link
              href="/classes#founding"
              className="link-arrow inline-block text-xs tracking-widest uppercase text-accent hover:text-accent/80 transition-colors"
            >
              Learn More
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

      {/* Sticky CTA + Founding popup */}
      <StickyCTA />
      <FoundingPopup />
    </>
  );
}
