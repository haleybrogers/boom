import Image from "next/image";
import Button from "@/components/Button";
import Parallax from "@/components/Parallax";

export default function About() {
  return (
    <>
      {/* Hero — parallax image with text overlay */}
      <section
        className="relative bg-fixed bg-cover bg-center"
        style={{ backgroundImage: "url(/hero-image.png)" }}
      >
        <div className="bg-charcoal/50 py-28 lg:py-36">
          <div className="max-w-xl mx-auto px-6 text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-light text-white mb-6">
              Two Sisters. One Method.
            </h1>
            <p className="text-white/70 leading-relaxed">
              Raised in Greensboro, NC, both trained at Appalachian State.
              Boomerang is the studio Emilie and Annie Young always talked about
              building together — rooted in the Classical method, taught with
              care, and open to everyone.
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

      {/* Method */}
      <Parallax speed={0.1} className="py-24 lg:py-32 bg-warm-white">
        <div className="max-w-xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal mb-6">
            The Method
          </h2>
          <p className="text-muted leading-relaxed">
            Control, precision, breath, and flow — building a strong, balanced
            body from the core outward. We teach Classical Pilates as it was
            designed to be practiced.
          </p>
        </div>
      </Parallax>

      {/* CTA */}
      <section className="py-24 lg:py-32">
        <div className="max-w-xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl font-light text-charcoal mb-4">
            Come meet us.
          </h2>
          <p className="text-muted text-sm mb-8">
            Book a class or just stop by and say hello.
          </p>
          <Button href="/contact">Get in Touch</Button>
        </div>
      </section>
    </>
  );
}
