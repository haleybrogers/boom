import Image from "next/image";
import Button from "@/components/Button";
import Parallax from "@/components/Parallax";
import Offerings from "@/components/Offerings";

export default function Home() {
  return (
    <>
      {/* Logo — compact */}
      <section className="pt-4 pb-2 flex items-center justify-center">
        <Image
          src="/logo-color.svg"
          alt="Boomerang Pilates"
          width={200}
          height={150}
          className="w-32 md:w-40 h-auto animate-float-slow"
          priority
        />
      </section>

      {/* Hero — text overlaid on image's gray area, bodies below */}
      <section className="relative">
        <Image
          src="/hero-image.png"
          alt="Two figures in the Boomerang Pilates pose"
          width={2000}
          height={800}
          className="w-full h-auto"
          priority
        />
        {/* Text positioned in the gray area above the bodies */}
        <div className="absolute inset-0 flex items-start justify-center pt-8 md:pt-12 lg:pt-16">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <p className="font-serif text-3xl md:text-4xl font-light leading-snug text-white mb-4 md:mb-6">
              Two sisters. One method.
            </p>
            <p className="text-white/70 text-xs md:text-sm leading-relaxed max-w-lg mx-auto">
              Emilie and Annie Young founded Boomerang Pilates on a shared love
              of the Classical method — and a belief that what you put into this
              practice comes back to you.
            </p>
            <div className="mt-5 md:mt-8">
              <Button href="/classes#book" variant="outline" className="border-white text-white hover:bg-white hover:text-charcoal">
                Book a Class
              </Button>
            </div>
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
            <Button href="/classes" variant="outline">View Classes &amp; Schedule</Button>
          </div>
        </div>
      </section>

      {/* Quote — parallax */}
      <section className="py-28 lg:py-36">
        <Parallax speed={0.1} className="max-w-2xl mx-auto px-6 text-center">
          <blockquote className="font-serif text-2xl md:text-3xl font-light leading-snug italic text-charcoal">
            &ldquo;Pilates is the complete coordination of body, mind, and spirit.&rdquo;
          </blockquote>
          <cite className="block mt-6 text-xs tracking-widest uppercase text-accent not-italic">
            Joseph Pilates
          </cite>
        </Parallax>
      </section>

      {/* First class CTA */}
      <section className="py-24 lg:py-32 bg-warm-white">
        <div className="max-w-xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal mb-4">
            Your first class is on us.
          </h2>
          <p className="text-muted text-sm mb-8">
            Whether you&apos;re brand new to Pilates or coming back after time away —
            we&apos;d love to move with you.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button href="/classes#book">Book Your Free Class</Button>
            <Button href="/contact" variant="outline">Get in Touch</Button>
          </div>
        </div>
      </section>
    </>
  );
}
