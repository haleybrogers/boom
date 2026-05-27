import Image from "next/image";
import Link from "next/link";
import ContactFormModal from "@/components/ContactFormModal";
import OfferingCards from "@/components/OfferingCards";
import NewToPilates from "@/components/NewToPilates";
import Reveal from "@/components/Reveal";
import PreOpeningPopup from "@/components/PreOpeningPopup";
import OpeningCountdown from "@/components/OpeningCountdown";
import SplashScreen from "@/components/SplashScreen";
import { SHOW_FOUNDING } from "@/lib/flags";

// Re-render hourly so SHOW_FOUNDING auto-flips off shortly after the
// July 13 deadline without needing a redeploy.
export const revalidate = 3600;

export default function Home() {
  return (
    <>
      <SplashScreen />

      {/* Hero. Source is 21:9 ultra-wide. Mobile: aspect-[3/2] container
          with object-cover. Taller crop so the sisters fill the frame —
          short of the full h-[70vh] treatment, which lost feet/hands.
          Desktop: full-bleed at 70vh. */}
      <section className="relative aspect-[3/2] md:aspect-auto md:h-[70vh] overflow-hidden">
        <Image
          src="/hero-image.jpg"
          alt="Two figures in the Boomerang Pilates pose"
          fill
          className="object-cover object-bottom"
          priority
        />
      </section>

      {/* Intro. One tight paragraph, then the two ways in */}
      <section className="py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-sm tracking-widest uppercase text-accent mb-5 animate-fade-up-lux" style={{ animationDelay: "0.5s" }}>
            Opening Soon
          </p>
          <div className="animate-fade-up-lux" style={{ animationDelay: "0.6s" }}>
            <OpeningCountdown />
          </div>
          <p className="font-serif text-2xl sm:text-3xl md:text-4xl font-light text-charcoal leading-snug mb-5 animate-fade-up-lux" style={{ animationDelay: "0.7s" }}>
            Downtown Durham&apos;s only Classical Pilates studio.
          </p>
          <p className="text-muted text-sm sm:text-base max-w-lg mx-auto leading-relaxed mb-10 animate-fade-up-lux" style={{ animationDelay: "0.9s" }}>
            Two sisters, third-generation classically trained, opening Downtown Durham&apos;s only Classical Pilates studio. The full method, in the order it was written. Our soft opening is underway now with sliding-scale mat classes at the studio, plus free pop-up classes around Durham, all leading up to opening day July 13.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center items-center animate-fade-up-lux pt-4" style={{ animationDelay: "0.95s" }}>
            <Link
              href="/schedule"
              className="btn-animated inline-block bg-charcoal text-white text-sm tracking-widest uppercase px-8 py-3.5 hover:bg-charcoal/90 transition-colors"
            >
              See Our Schedule →
            </Link>

            {SHOW_FOUNDING && (
              <div className="relative inline-block">
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-cream text-accent text-[9px] tracking-[0.2em] uppercase px-2 py-0.5 border border-accent/30 rounded-full whitespace-nowrap z-10 shadow-sm">
                  Limited Time
                </span>
                <Link
                  href="/founding"
                  className="btn-animated inline-block bg-accent text-white text-sm tracking-widest uppercase px-8 py-3.5 hover:bg-accent/90 transition-colors"
                >
                  Become a Founding Member →
                </Link>
              </div>
            )}
          </div>


        </div>
      </section>

      {/* Editorial photo moment. Emilie side plank, peach backdrop */}
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
              <p className="text-sm tracking-widest uppercase text-accent mb-4">
                Our Approach
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal leading-tight mb-5">
                The method, intact.
              </h2>
              <p className="text-muted text-base leading-relaxed mb-4">
                Classical Pilates is the original method. The full Return to
                Life sequence and the apparatus work that came with it, every
                exercise in the order it was written.
              </p>
              <p className="text-muted text-base leading-relaxed">
                What you&apos;ll feel: stronger from the inside out, more
                aware of how your body actually moves.
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
              Mat, apparatus, privates, and duets. Classical Pilates the way it was designed.
            </p>
          </Reveal>
          <OfferingCards />
        </div>
      </section>

      {/* New to Pilates? */}
      <NewToPilates />

      {/* Waitlist. Button opens a modal with the contact form */}
      <section id="waitlist" className="py-24 lg:py-32 bg-warm-white">
        <div className="max-w-xl mx-auto px-6 text-center">
          <p className="text-sm tracking-widest uppercase text-accent mb-4">Get the Scoop</p>
          <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal mb-4">
            Be the first to know.
          </h2>
          <p className="text-muted text-base mb-10">
            Grand opening details, new class drops, events, and the stuff we only share with our people.
          </p>
          <ContactFormModal
            buttonLabel="Get the Scoop"
            heading="Get the scoop."
            subhead="Grand opening details, new class drops, events, and the stuff we only share with our people."
            source="waitlist"
            sourceId={204540}
            showMessage={false}
            showPhone={true}
          />
        </div>
      </section>

      {/* Popups. Pre-opening only. FoundingPopup retired in favor of the
          inline founding callout + the sitewide sticky CTA. */}
      <PreOpeningPopup />
    </>
  );
}
