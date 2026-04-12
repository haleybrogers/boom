import Image from "next/image";
import Button from "@/components/Button";
import Parallax from "@/components/Parallax";
import SixPrinciples from "@/components/SixPrinciples";

export const metadata = {
  title: "About",
  description: "Meet Emilie and Annie Young, co-founders of Boomerang Pilates. Classical Pilates instruction rooted in integrity, taught with intention.",
};

export default function About() {
  return (
    <>
      {/* Meet the Sisters — clean, no image overlay */}
      <section className="py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs tracking-widest uppercase text-accent mb-4">Meet the Founders</p>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-charcoal mb-5">
              Sister Act
            </h1>
            <p className="text-base text-muted leading-relaxed max-w-xl mx-auto">
              Emilie and Annie Young built Boomerang on the belief that Classical
              Pilates works — when it&apos;s taught with integrity and practiced with
              intention. No shortcuts. No trends. Just the method.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {/* Emilie */}
            <Parallax speed={0.08}>
              <div className="relative aspect-[3/4] overflow-hidden mb-6">
                <Image
                  src="/emilie-young.jpg"
                  alt="Emilie Young"
                  fill
                  className="object-cover object-top"
                />
              </div>
              <h3 className="font-serif text-2xl font-light text-charcoal mb-1">
                Emilie Young
              </h3>
              <p className="text-xs tracking-widest uppercase text-accent mb-4">
                Co-Founder · Big Sister
              </p>
              <p className="text-base text-muted leading-relaxed">
                3rd Generation Classical Pilates instructor, certified in mat
                and apparatus. Trained at App State under Rebecca Quinn and
                Marianne Adams. Also an elementary art teacher for Durham
                Public Schools — so yes, she&apos;s used to keeping a room in line.
              </p>
            </Parallax>

            {/* Annie */}
            <Parallax speed={0.12}>
              <div className="relative aspect-[3/4] overflow-hidden mb-6 bg-warm-white">
                <Image
                  src="/annie-young.jpg"
                  alt="Annie Young"
                  fill
                  className="object-cover object-center"
                />
              </div>
              <h3 className="font-serif text-2xl font-light text-charcoal mb-1">
                Annie Young
              </h3>
              <p className="text-xs tracking-widest uppercase text-accent mb-4">
                Co-Founder · Little Sister
              </p>
              <p className="text-base text-muted leading-relaxed">
                Classical Pilates certified from App State in 2023, following
                in her big sister&apos;s footsteps. Passionate about making
                Pilates accessible to every body — and proving little sisters
                can keep up.
              </p>
            </Parallax>
          </div>
        </div>
      </section>

      {/* Our Values — combined Method + Principles */}
      <section className="py-24 lg:py-32 bg-warm-white">
        <div className="max-w-3xl mx-auto px-6 text-center mb-20">
          <p className="text-xs tracking-widest uppercase text-accent mb-3">
            Our Values
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal mb-6">
            Classical Pilates Is for Every Body
          </h2>
          <p className="text-base text-muted leading-relaxed mb-4">
            Joseph Pilates designed this method for everyone — not just athletes, not just dancers,
            not just one kind of person. The original work doesn&apos;t need to be softened or
            reimagined to be inclusive. It already is.
          </p>
          <p className="text-base text-muted leading-relaxed">
            We teach the method the way it was designed because we believe in it — and we welcome
            every body through our door. No gatekeeping. Just the work.
          </p>
        </div>
        <SixPrinciples embedded />
      </section>

      {/* Reformer photo break */}
      <section
        className="relative bg-fixed bg-cover bg-center h-[40vh] lg:h-[50vh]"
        style={{ backgroundImage: "url(/photo-reformer.jpg)" }}
      >
        <div className="absolute inset-0 bg-[#5c4a3a]/30" />
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32">
        <div className="max-w-xl mx-auto px-6 text-center">
          <p className="text-xs tracking-widest uppercase text-accent mb-4">Limited Time</p>
          <h2 className="font-serif text-3xl font-light text-charcoal mb-4">
            Be a founding member.
          </h2>
          <p className="text-muted text-base mb-8">
            Lock in your rate before we open — it never goes up. Plus exclusive invites to our soft opening and celebratory events.
          </p>
          <Button href="/classes#founding">See Founding Pricing</Button>
        </div>
      </section>
    </>
  );
}
