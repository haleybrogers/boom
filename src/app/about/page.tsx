import Image from "next/image";
import Button from "@/components/Button";
import Parallax from "@/components/Parallax";

export const metadata = {
  title: "About",
  description: "Meet Emilie and Annie Young, co-founders of Boomerang Pilates. Classical Pilates instruction rooted in integrity, taught with intention.",
};

export default function About() {
  return (
    <>
      {/* Hero — parallax image with text overlay */}
      <section
        className="relative bg-fixed bg-cover bg-center"
        style={{ backgroundImage: "url(/hero-image.png)" }}
      >
        <div className="bg-charcoal/50 py-16 sm:py-28 lg:py-36">
          <div className="max-w-xl mx-auto px-6 text-center">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-white mb-4 sm:mb-6">
              Two Sisters. One Method.
            </h1>
            <p className="text-white/70 text-sm sm:text-base leading-relaxed">
              Emilie and Annie Young built Boomerang on the belief that Classical
              Pilates works — when it&apos;s taught with integrity and practiced with
              intention. No shortcuts. No trends. Just the method, the way it was
              designed.
            </p>
          </div>
        </div>
      </section>

      {/* Founders */}
      <section className="py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Emilie */}
            <Parallax speed={0.08} className="text-center">
              <div className="relative w-44 h-44 rounded-full overflow-hidden mx-auto mb-6">
                <Image
                  src="/emilie-young.jpg"
                  alt="Emilie Young"
                  fill
                  className="object-cover object-top"
                  sizes="176px"
                />
              </div>
              <h3 className="font-serif text-2xl font-light text-charcoal mb-1">
                Emilie Young
              </h3>
              <p className="text-xs tracking-widest uppercase text-muted mb-4">
                Co-Founder
              </p>
              <p className="text-sm text-muted leading-relaxed">
                3rd Generation Classical Pilates instructor, certified in mat
                and apparatus. Trained at App State under Rebecca Quinn and
                Marianne Adams. Also an elementary art teacher for Durham
                Public Schools.
              </p>
            </Parallax>

            {/* Annie */}
            <Parallax speed={0.12} className="text-center">
              <div className="relative w-44 h-44 rounded-full overflow-hidden mx-auto mb-6 bg-warm-white">
                <Image
                  src="/annie-young.jpg"
                  alt="Annie Young"
                  fill
                  className="object-cover object-center"
                  sizes="176px"
                />
              </div>
              <h3 className="font-serif text-2xl font-light text-charcoal mb-1">
                Annie Young
              </h3>
              <p className="text-xs tracking-widest uppercase text-muted mb-4">
                Co-Founder
              </p>
              <p className="text-sm text-muted leading-relaxed">
                Classical Pilates certified from App State in 2023, following
                in her big sister&apos;s footsteps. Passionate about making
                Pilates accessible to every body.
              </p>
            </Parallax>
          </div>
        </div>
      </section>

      {/* The Method — overlaid on reformer photo */}
      <section
        className="relative bg-fixed bg-cover bg-center h-[50vh] lg:h-[60vh]"
        style={{ backgroundImage: "url(/photo-reformer.jpg)" }}
      >
        <div className="absolute inset-0 bg-[#5c4a3a]/40" />
        <div className="relative h-full flex items-center justify-center">
          <div className="max-w-xl mx-auto px-6 text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-light text-white mb-6">
              The Method
            </h2>
            <p className="text-white/70 leading-relaxed">
              Control, precision, breath, and flow — building a strong, balanced
              body from the core outward. We teach Classical Pilates as it was
              designed to be practiced.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32">
        <div className="max-w-xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl font-light text-charcoal mb-4">
            Come meet us.
          </h2>
          <p className="text-muted text-sm mb-8">
            We&apos;re opening soon. Get on the list and be the first to know.
          </p>
          <Button href="/#waitlist">Join the Waitlist</Button>
        </div>
      </section>
    </>
  );
}
