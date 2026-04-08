import Image from "next/image";
import Button from "@/components/Button";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="flex items-center justify-center min-h-[70vh]">
        <div className="text-center px-6">
          <Image
            src="/logo-color.svg"
            alt="Boomerang Pilates"
            width={360}
            height={280}
            className="mx-auto mb-8 w-56 md:w-72 h-auto"
            priority
          />
          <Button href="/classes#book">Book a Class</Button>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-28 lg:py-36">
        <div className="max-w-xl mx-auto px-6 text-center">
          <p className="font-serif text-3xl md:text-4xl font-light leading-snug text-charcoal">
            The Classical Pilates method, taught the way it was meant to be.
          </p>
        </div>
      </section>

      {/* What we offer */}
      <section className="pb-28 lg:pb-36">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-charcoal/10 border border-charcoal/10 rounded-sm overflow-hidden">
            {[
              { title: "Mat Classes", desc: "Build core strength and flexibility through classical mat exercises. Perfect for every level." },
              { title: "Apparatus", desc: "Reformer, Cadillac, Chair, and Barrels. Spring-loaded resistance for full-body conditioning." },
              { title: "Private Sessions", desc: "One-on-one instruction tailored to your body, your goals, and your pace." },
            ].map((item) => (
              <div key={item.title} className="bg-warm-white p-10 lg:p-14">
                <h3 className="font-serif text-2xl font-light text-charcoal mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Illustration accent + quote */}
      <section className="py-28 lg:py-36 bg-warm-white relative overflow-hidden">
        <div className="absolute right-6 lg:right-16 top-1/2 -translate-y-1/2 opacity-[0.08] pointer-events-none hidden md:block">
          <Image
            src="/illustration-2.svg"
            alt=""
            width={300}
            height={300}
            aria-hidden="true"
          />
        </div>
        <div className="max-w-2xl mx-auto px-6 text-center relative">
          <blockquote className="font-serif text-2xl md:text-3xl font-light leading-snug italic text-charcoal">
            &ldquo;Pilates is the complete coordination of body, mind, and spirit.&rdquo;
          </blockquote>
          <cite className="block mt-6 text-xs tracking-widest uppercase text-accent not-italic">
            Joseph Pilates
          </cite>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32">
        <div className="max-w-xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal mb-4">
            New to Boomerang?
          </h2>
          <p className="text-muted text-sm mb-8">
            Your first class is on us. Come move with us.
          </p>
          <Button href="/classes#book">Book Your Free Class</Button>
        </div>
      </section>
    </>
  );
}
