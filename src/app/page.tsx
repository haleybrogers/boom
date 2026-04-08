import Image from "next/image";
import Button from "@/components/Button";
import Parallax from "@/components/Parallax";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="pt-6 pb-4 lg:pt-8 lg:pb-6 flex items-center justify-center">
        <div className="text-center px-6">
          <Image
            src="/logo-color.svg"
            alt="Boomerang Pilates"
            width={360}
            height={280}
            className="mx-auto mb-6 w-48 md:w-60 h-auto animate-float-slow"
            priority
          />
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
              Two sisters. One method. A studio built to share with you.
            </p>
            <p className="text-white/70 text-sm leading-relaxed max-w-lg mx-auto">
              Emilie and Annie Young founded Boomerang Pilates on a shared love
              of the Classical method — and a belief that what you put into this
              practice comes back to you.
            </p>
            <div className="mt-8">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Mat Classes",
                desc: "Build core strength and flexibility through classical mat exercises. Perfect for every level.",
                icon: (
                  <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 40 40">
                    {/* Rolled up mat */}
                    <ellipse cx="8" cy="20" rx="4" ry="8" />
                    <line x1="8" y1="12" x2="36" y2="12" />
                    <line x1="8" y1="28" x2="36" y2="28" />
                    <path d="M36 12 C38 12, 38 28, 36 28" />
                  </svg>
                ),
              },
              {
                title: "Apparatus",
                desc: "Reformer, Cadillac, Chair, and Barrels. Spring-loaded resistance for full-body conditioning.",
                icon: (
                  <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 40 40">
                    {/* Reformer side view */}
                    <rect x="2" y="22" width="36" height="4" rx="1" />
                    <line x1="6" y1="26" x2="6" y2="32" />
                    <line x1="34" y1="26" x2="34" y2="32" />
                    <rect x="10" y="16" width="10" height="6" rx="1" />
                    <line x1="30" y1="10" x2="30" y2="22" />
                    <line x1="28" y1="10" x2="32" y2="10" />
                    <circle cx="6" cy="24" r="1.5" fill="currentColor" />
                    <circle cx="34" cy="24" r="1.5" fill="currentColor" />
                  </svg>
                ),
              },
              {
                title: "Private Sessions",
                desc: "One-on-one instruction tailored to your body, your goals, and your pace.",
                icon: (
                  <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
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
