import Image from "next/image";
import Button from "@/components/Button";
import Offerings from "@/components/Offerings";
import WaitlistForm from "@/components/WaitlistForm";

export default function Home() {
  return (
    <>
      {/* Hero — bold, confident, Durham's only */}
      <section className="relative overflow-hidden bg-charcoal">
        {/* Background image */}
        <Image
          src="/hero-image.png"
          alt="Two figures in the Boomerang Pilates pose"
          fill
          className="object-cover object-top opacity-40"
          priority
        />
        <div className="relative z-10 min-h-[90vh] sm:min-h-[85vh] flex flex-col items-center justify-center px-6 py-20">
          {/* Girls logo */}
          <Image
            src="/logo-full.svg"
            alt="Boomerang Pilates"
            width={400}
            height={300}
            className="w-48 sm:w-56 md:w-64 h-auto mb-8 opacity-90 invert brightness-200"
          />

          {/* Tagline */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white text-center leading-[1.1] mb-6">
            Put in the work.<br />
            <span className="text-accent">Feel it come back.</span>
          </h1>

          {/* Positioning statement */}
          <p className="text-white/70 text-base sm:text-lg text-center max-w-xl mb-3 leading-relaxed">
            Durham&apos;s only Classical Pilates studio. Mat and apparatus — taught
            the way Joseph Pilates designed it.
          </p>
          <p className="text-xs tracking-widest uppercase text-white/40 mb-10">
            Opening Soon · Downtown Durham, NC
          </p>

          {/* Dual CTA */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <a
              href="/classes#founding"
              className="bg-accent text-white px-8 py-3.5 text-sm tracking-wide rounded-sm hover:bg-accent/85 transition-colors text-center"
            >
              Become a Founding Member
            </a>
            <a
              href="/classes"
              className="border border-white/30 text-white px-8 py-3.5 text-sm tracking-wide rounded-sm hover:border-white/60 hover:text-white transition-colors text-center"
            >
              View Classes
            </a>
          </div>
        </div>
      </section>

      {/* The pitch — why Boomerang */}
      <section className="py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-xs tracking-widest uppercase text-accent mb-4">Why Boomerang</p>
          <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal mb-6 leading-snug">
            Classical Pilates is for every body.<br className="hidden sm:block" />
            We&apos;re here to prove it.
          </h2>
          <p className="text-base text-muted leading-relaxed max-w-2xl mx-auto">
            No trends. No gimmicks. Just the original method — mat and apparatus — taught with
            precision and adapted to you. Whether you&apos;re brand new or deep in your practice,
            the work meets you where you are.
          </p>
        </div>
      </section>

      {/* What we offer */}
      <section className="py-20 lg:py-28 bg-warm-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal mb-14 text-center">
            What We Offer
          </h2>
          <Offerings />
          <div className="text-center mt-12 space-y-3">
            <div>
              <Button href="/classes#founding">Become a Founding Member</Button>
            </div>
            <div>
              <Button href="/classes" variant="outline">View Classes &amp; Schedule</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Social proof / quote */}
      <section
        className="relative bg-fixed bg-cover bg-center h-[50vh] lg:h-[60vh]"
        style={{ backgroundImage: "url(/accent-image.png)" }}
      >
        <div className="absolute inset-0 bg-[#5c4a3a]/40" />
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

      {/* Founding member urgency */}
      <section className="py-20 lg:py-28 bg-warm-white">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <span className="text-[10px] tracking-widest uppercase text-accent bg-accent/10 px-3 py-1.5 rounded-sm">
            Limited Time
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal mt-5 mb-4">
            Founding member rates won&apos;t last.
          </h2>
          <p className="text-base text-muted leading-relaxed mb-4">
            Lock in unlimited classes at a rate that never goes up. Your first class is free.
            Once we open, these prices are gone.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center my-8">
            <div className="text-center">
              <p className="font-serif text-3xl font-light text-charcoal">$149<span className="text-lg text-muted">/mo</span></p>
              <p className="text-sm text-muted">Unlimited Mat</p>
              <p className="text-xs text-accent mt-0.5">Save $30/mo vs regular</p>
            </div>
            <div className="hidden sm:block w-px h-16 bg-charcoal/10" />
            <div className="text-center">
              <p className="font-serif text-3xl font-light text-charcoal">$249<span className="text-lg text-muted">/mo</span></p>
              <p className="text-sm text-muted">Unlimited All-Access</p>
              <p className="text-xs text-accent mt-0.5">Save $50/mo vs regular</p>
            </div>
          </div>
          <Button href="/classes#founding">See All Founding Pricing</Button>
        </div>
      </section>

      {/* Waitlist signup */}
      <section id="waitlist" className="py-24 lg:py-32">
        <div className="max-w-xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal mb-4">
            Be the first through the door.
          </h2>
          <p className="text-muted text-base mb-10">
            Sign up and your first class is on us.
          </p>
          <WaitlistForm />
        </div>
      </section>
    </>
  );
}
