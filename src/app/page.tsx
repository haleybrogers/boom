import Image from "next/image";
import Button from "@/components/Button";
import Offerings from "@/components/Offerings";
import WaitlistForm from "@/components/WaitlistForm";

export default function Home() {
  return (
    <>
      {/* Hero — warm, simple, the image does the talking */}
      <section className="relative overflow-hidden">
        <Image
          src="/hero-image.png"
          alt="Two figures in the Boomerang Pilates pose"
          fill
          className="object-cover object-top sm:hidden"
          priority
        />
        <Image
          src="/hero-image.png"
          alt="Two figures in the Boomerang Pilates pose"
          fill
          className="hidden sm:block object-cover object-top"
        />
        <div className="h-[85vh] sm:h-[75vh] lg:h-[80vh]" />
        <div className="absolute inset-0 bg-[#5c4a3a]/20 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-x-0 top-0 flex items-start justify-center pt-6 sm:pt-12 md:pt-20">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <h1 className="font-serif text-[18vw] sm:text-4xl md:text-5xl lg:text-6xl font-light leading-[0.85] sm:leading-tight text-white mb-3 sm:mb-4 uppercase">
              <span className="sm:hidden">Boom<br />erang<br />Pilates</span>
              <span className="hidden sm:inline">Boomerang Pilates</span>
            </h1>
            <p className="text-white/80 text-sm sm:text-base md:text-lg tracking-wide">
              Put in the work. Feel it come back.
            </p>
            <p className="text-white/50 text-[10px] sm:text-xs tracking-widest uppercase mt-3 sm:mt-5">
              Classical Pilates · Durham, NC
            </p>
          </div>
        </div>
      </section>

      {/* One-liner positioning */}
      <section className="py-16 lg:py-20">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p className="font-serif text-2xl md:text-3xl font-light text-charcoal leading-relaxed">
            Downtown Durham&apos;s only Classical Pilates studio — mat and apparatus,
            taught the way it was designed.
          </p>
        </div>
      </section>

      {/* What we offer */}
      <section className="py-16 lg:py-20 bg-warm-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal mb-14 text-center">
            What We Offer
          </h2>
          <Offerings />
          <div className="text-center mt-12">
            <Button href="/classes" variant="outline">View Classes &amp; Schedule</Button>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section
        className="relative bg-fixed bg-cover bg-center h-[50vh] lg:h-[60vh]"
        style={{ backgroundImage: "url(/accent-image.png)" }}
      >
        <div className="absolute inset-0 bg-[#5c4a3a]/35" />
        <div className="relative h-full flex items-center justify-center">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl font-light leading-snug italic text-white">
              &ldquo;Pilates is the complete coordination of body, mind, and spirit.&rdquo;
            </blockquote>
            <cite className="block mt-6 text-xs tracking-widest uppercase text-white/60 not-italic">
              Joseph Pilates
            </cite>
          </div>
        </div>
      </section>

      {/* Founding member signup — simple, not pushy */}
      <section id="waitlist" className="py-24 lg:py-32">
        <div className="max-w-xl mx-auto px-6 text-center">
          <p className="text-xs tracking-widest uppercase text-accent mb-4">Opening Soon</p>
          <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal mb-4">
            Be the first through the door.
          </h2>
          <p className="text-muted text-base mb-10">
            Join as a founding member and your first class is on us.
          </p>
          <WaitlistForm />
        </div>
      </section>
    </>
  );
}
