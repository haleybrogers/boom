import Image from "next/image";
import Link from "next/link";
import WaitlistForm from "@/components/WaitlistForm";

export default function Home() {
  return (
    <>
      {/* Hero — full-bleed image, minimal text */}
      <section className="relative overflow-hidden">
        <Image
          src="/hero-image.png"
          alt="Two figures in the Boomerang Pilates pose"
          fill
          className="object-cover object-top"
          priority
        />
        <div className="h-[90vh]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#5c4a3a]/30 via-transparent to-[#5c4a3a]/20 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 pb-12 sm:pb-16 md:pb-20">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <p className="text-white/90 text-lg sm:text-xl md:text-2xl font-light tracking-wide">
              Put in the work. Feel it come back.
            </p>
            <p className="text-white/50 text-xs tracking-widest uppercase mt-3">
              Classical Pilates · Downtown Durham
            </p>
          </div>
        </div>
      </section>

      {/* Positioning statement */}
      <section className="py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="font-serif text-2xl sm:text-3xl md:text-4xl font-light text-charcoal leading-snug">
            Downtown Durham&apos;s only Classical Pilates studio. Mat and apparatus — taught
            the way Joseph Pilates designed it. For every body.
          </p>
        </div>
      </section>

      {/* Editorial grid — linked sections */}
      <section className="pb-20 lg:pb-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Classes */}
            <Link href="/classes" className="group relative overflow-hidden aspect-[4/3]">
              <Image
                src="/photo-chair.jpg"
                alt="Pilates apparatus"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-charcoal/30 group-hover:bg-charcoal/40 transition-colors duration-300" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                <h2 className="font-serif text-3xl md:text-4xl font-light text-white mb-2">
                  Classes
                </h2>
                <p className="text-white/70 text-sm max-w-xs">
                  Mat, apparatus, privates, and duets. See the full schedule.
                </p>
              </div>
            </Link>

            {/* About */}
            <Link href="/about" className="group relative overflow-hidden aspect-[4/3]">
              <Image
                src="/photo-reformer.jpg"
                alt="Reformer"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-charcoal/30 group-hover:bg-charcoal/40 transition-colors duration-300" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                <h2 className="font-serif text-3xl md:text-4xl font-light text-white mb-2">
                  About
                </h2>
                <p className="text-white/70 text-sm max-w-xs">
                  Two sisters. One method. Meet Emilie and Annie.
                </p>
              </div>
            </Link>

            {/* Founding Member */}
            <Link href="/classes#founding" className="group relative overflow-hidden aspect-[4/3]">
              <Image
                src="/photo-leg.jpg"
                alt="Pilates practice"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-charcoal/30 group-hover:bg-charcoal/40 transition-colors duration-300" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                <p className="text-xs tracking-widest uppercase text-accent mb-3">Limited Time</p>
                <h2 className="font-serif text-3xl md:text-4xl font-light text-white mb-2">
                  Founding Member
                </h2>
                <p className="text-white/70 text-sm max-w-xs">
                  Lock in your rate before we open. It never goes up.
                </p>
              </div>
            </Link>

            {/* Events */}
            <Link href="/events" className="group relative overflow-hidden aspect-[4/3]">
              <Image
                src="/accent-image.png"
                alt="Studio"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-charcoal/30 group-hover:bg-charcoal/40 transition-colors duration-300" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                <p className="text-xs tracking-widest uppercase text-white/50 mb-3">Coming Soon</p>
                <h2 className="font-serif text-3xl md:text-4xl font-light text-white mb-2">
                  Grand Opening
                </h2>
                <p className="text-white/70 text-sm max-w-xs">
                  Something special is coming. Get on the list.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Waitlist — clean and quiet */}
      <section id="waitlist" className="py-24 lg:py-32 bg-warm-white">
        <div className="max-w-xl mx-auto px-6 text-center">
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
