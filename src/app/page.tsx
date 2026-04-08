import Image from "next/image";
import Button from "@/components/Button";
import Parallax from "@/components/Parallax";
import Offerings from "@/components/Offerings";
import WaitlistForm from "@/components/WaitlistForm";

export default function Home() {
  return (
    <>
      {/* Hero — text overlaid on image's gray area, bodies below */}
      <section className="relative overflow-hidden">
        <Image
          src="/hero-image.png"
          alt="Two figures in the Boomerang Pilates pose"
          width={2000}
          height={800}
          className="w-full h-auto scale-[1.02] origin-center"
          priority
        />
        {/* Warm brown wash over image */}
        <div className="absolute inset-0 bg-[#5c4a3a]/25 mix-blend-multiply pointer-events-none" />
        {/* Text positioned in the gray area above the bodies */}
        <div className="absolute inset-x-0 top-0 flex items-start justify-center pt-4 sm:pt-10 md:pt-16 lg:pt-20">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light leading-relaxed text-white mb-1 tracking-wider uppercase">
              Boomerang Pilates
            </h1>
            <p className="text-white/70 text-xs sm:text-sm md:text-base tracking-wide max-w-md mx-auto">
              Put in the work. Feel it come back.
            </p>
            <p className="mt-2 sm:mt-4 md:mt-5 text-white/50 text-[10px] sm:text-[11px] md:text-xs tracking-widest uppercase">
              Durham, NC
            </p>
          </div>
        </div>
      </section>

      {/* What we offer */}
      <section className="py-24 lg:py-32 bg-warm-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal mb-14 text-center">
            What We Offer
          </h2>
          <Offerings />
          <div className="text-center mt-12">
            <Button href="/classes" variant="outline">View Full Schedule</Button>
          </div>
        </div>
      </section>

      {/* Quote over parallax accent image */}
      <section
        className="relative bg-fixed bg-cover bg-center h-[60vh] lg:h-[70vh]"
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

      {/* Founding member signup */}
      <section id="waitlist" className="py-24 lg:py-32 bg-warm-white">
        <div className="max-w-xl mx-auto px-6 text-center">
          <p className="text-xs tracking-widest uppercase text-accent mb-4">Coming Soon</p>
          <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal mb-4">
            Be the first through the door.
          </h2>
          <p className="text-muted text-sm mb-10">
            Boomerang Pilates is opening in Durham. Join as a founding member
            and your first class is on us.
          </p>
          <WaitlistForm />
        </div>
      </section>
    </>
  );
}
