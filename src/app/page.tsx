import Image from "next/image";
import Button from "@/components/Button";
import Parallax from "@/components/Parallax";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 lg:py-28 flex items-center justify-center">
        <div className="text-center px-6">
          <Image
            src="/logo-color.svg"
            alt="Boomerang Pilates"
            width={360}
            height={280}
            className="mx-auto mb-10 w-56 md:w-72 h-auto animate-float-slow"
            priority
          />
          <Button href="/classes#book">Book a Class</Button>
        </div>
      </section>

      {/* Story intro — text over parallax image */}
      <section
        className="relative bg-fixed bg-cover bg-center"
        style={{ backgroundImage: "url(/hero-image.png)" }}
      >
        <div className="bg-charcoal/50 py-28 lg:py-36">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <p className="font-serif text-3xl md:text-4xl font-light leading-snug text-white mb-6">
              Two sisters. One method. A studio built to share it with you.
            </p>
            <p className="text-white/70 text-sm leading-relaxed max-w-lg mx-auto">
              Emilie and Annie Young founded Boomerang Pilates on a shared love
              of the Classical method — and a belief that what you put into this
              practice comes back to you.
            </p>
            <div className="mt-8">
              <Button href="/about" variant="outline" className="border-white text-white hover:bg-white hover:text-charcoal">
                Our Story
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Mat Classes",
                desc: "Build core strength and flexibility through classical mat exercises. Perfect for every level.",
                icon: (
                  <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 20h16M4 20V10m16 10V10M4 10l8-6 8 6" />
                  </svg>
                ),
              },
              {
                title: "Apparatus",
                desc: "Reformer, Cadillac, Chair, and Barrels. Spring-loaded resistance for full-body conditioning.",
                icon: (
                  <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3v6.75m0 0H3m6.75 0L3 16.5M14.25 3v6.75m0 0H21m-6.75 0L21 16.5M9.75 21v-6.75m0 0H3m6.75 0L3 7.5M14.25 21v-6.75m0 0H21m-6.75 0L21 7.5" />
                  </svg>
                ),
              },
              {
                title: "Private Sessions",
                desc: "One-on-one instruction tailored to your body, your goals, and your pace.",
                icon: (
                  <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0" />
                  </svg>
                ),
              },
            ].map((item) => (
              <div key={item.title} className="bg-cream p-8 lg:p-10 rounded-sm border border-charcoal/5 text-center">
                <div className="flex justify-center mb-5">{item.icon}</div>
                <h3 className="font-serif text-2xl font-light text-charcoal mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
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
