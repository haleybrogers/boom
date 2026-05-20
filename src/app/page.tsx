import Image from "next/image";
import Link from "next/link";
import ContactFormModal from "@/components/ContactFormModal";
import FoundingPopup from "@/components/FoundingPopup";
import OfferingCards from "@/components/OfferingCards";
import NewToPilates from "@/components/NewToPilates";
import Reveal from "@/components/Reveal";
import FoundingCountdown from "@/components/FoundingCountdown";
import PreOpeningPopup from "@/components/PreOpeningPopup";
import SplashScreen from "@/components/SplashScreen";
import { SHOW_FOUNDING } from "@/lib/flags";

export default function Home() {
  return (
    <>
      <SplashScreen />

      {/* Hero */}
      <section className="relative h-[60vh] sm:h-[70vh] overflow-hidden">
        <Image
          src="/hero-image.jpg"
          alt="Two figures in the Boomerang Pilates pose"
          fill
          className="object-cover object-bottom"
          priority
        />
      </section>

      {/* Positioning statement + class CTA + founding-member box */}
      <section className="py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-xs tracking-widest uppercase text-accent mb-4 animate-fade-up-lux" style={{ animationDelay: "0.5s" }}>
            Opening Soon
          </p>
          <p className="font-serif text-2xl sm:text-3xl md:text-4xl font-light text-charcoal leading-snug mb-4 animate-fade-up-lux" style={{ animationDelay: "0.7s" }}>
            Downtown Durham&apos;s only Classical Pilates studio.
          </p>
          <p className="text-muted text-sm max-w-lg mx-auto leading-relaxed mb-10 animate-fade-up-lux" style={{ animationDelay: "0.9s" }}>
            Two sisters. Third-generation classically trained, fully certified across the method. We think classical Pilates was made for every body — not just the front row.
          </p>

          <div className="animate-fade-up-lux mb-14" style={{ animationDelay: "1.1s" }}>
            <Link
              href="/events"
              className="btn-animated inline-block bg-accent text-white text-xs tracking-widest uppercase px-8 py-3.5 hover:bg-accent/90 transition-colors"
            >
              Come move with us →
            </Link>
          </div>

          {SHOW_FOUNDING && (
            <div
              className="animate-fade-up-lux bg-accent/5 border border-accent/15 rounded-sm px-8 md:px-14 py-10 md:py-12"
              style={{ animationDelay: "1.3s" }}
            >
              <p className="text-[10px] tracking-[0.4em] uppercase text-accent mb-3">
                Founding Member · Ends July 13
              </p>
              <FoundingCountdown showLabel={false} />
              <p className="font-serif text-2xl sm:text-3xl font-light text-charcoal mb-5 mt-1">
                Become a founding member.
              </p>
              <Link
                href="/founding"
                className="btn-animated inline-block bg-accent text-white text-xs tracking-widest uppercase px-8 py-3.5 hover:bg-accent/90 transition-colors"
              >
                See Founding Details
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Editorial photo moment — Emilie side plank, peach backdrop */}
      <section className="pb-16 lg:pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="flex flex-col md:flex-row gap-8 md:gap-14 items-center">
            <div className="relative w-full md:w-1/2 aspect-[2/3] overflow-hidden">
              <Image
                src="/photo-emilie-solo.jpg"
                alt="Emilie Young in side plank with reaching arm"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="w-full md:w-1/2 md:pl-4">
              <p className="text-xs tracking-widest uppercase text-accent mb-4">
                Our Approach
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal leading-tight mb-5">
                The method, intact.
              </h2>
              <p className="text-muted text-base leading-relaxed mb-4">
                Classical Pilates is the original method — the full Return to
                Life sequence and the apparatus work that came with it, every
                exercise in the order it was written. Not a remix. Not a
                workout class with a reformer in the corner.
              </p>
              <p className="text-muted text-base leading-relaxed mb-4">
                What you&apos;ll feel: stronger from the inside out, more
                aware of how your body actually moves, surprised by what your
                spine can do.
              </p>
              <p className="text-muted text-base leading-relaxed">
                The work is precise but the room is warm. Show up however you
                arrived. We&apos;ll meet you there.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-20 lg:py-28 bg-warm-white">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal mb-3">
              What We Offer
            </h2>
            <div className="w-12 h-px bg-accent mx-auto mt-5 mb-5" />
            <p className="text-muted text-base max-w-md mx-auto">
              Mat, apparatus, privates, and duets — classical Pilates the way it was designed.
            </p>
          </Reveal>
          <OfferingCards />
        </div>
      </section>

      {/* New to Pilates? */}
      <NewToPilates />

      {/* Waitlist — button opens a modal with the contact form */}
      <section id="waitlist" className="py-24 lg:py-32 bg-warm-white">
        <div className="max-w-xl mx-auto px-6 text-center">
          <p className="text-xs tracking-widest uppercase text-accent mb-4">Stay in the Loop</p>
          <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal mb-4">
            Be the first to know.
          </h2>
          <p className="text-muted text-base mb-10">
            Grand opening details, new class drops, events, and the stuff we only share with our people.
          </p>
          <ContactFormModal
            buttonLabel="Stay in the Loop"
            heading="Stay in the loop."
            subhead="Grand opening details, new class drops, events, and the stuff we only share with our people."
            source="waitlist"
            sourceId={204540}
            showMessage={false}
            showPhone={true}
          />
        </div>
      </section>

      {/* Popups (founding gated behind flag). StickyCTA lives in the root layout. */}
      {SHOW_FOUNDING && <FoundingPopup />}
      <PreOpeningPopup />
    </>
  );
}
