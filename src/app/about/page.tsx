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
              Built by Two Sisters
            </h1>
            <p className="text-base text-muted leading-relaxed max-w-xl mx-auto">
              Emilie and Annie Young started Boomerang to bring Classical Pilates
              to Durham the way it was meant to be — challenging, precise, and open
              to everyone. The method doesn&apos;t need to be softened to be inclusive.
              It already is. You just need the right teachers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 max-w-3xl mx-auto items-start">
            {/* Emilie */}
            <div>
              <div className="relative aspect-[4/5] overflow-hidden mb-6">
                <Image
                  src="/emilie-young.jpg"
                  alt="Emilie Young"
                  fill
                  className="object-cover object-[center_20%] grayscale hover:grayscale-0 transition-all duration-700 ease-in-out"
                />
              </div>
              <h3 className="font-serif text-2xl font-light text-charcoal mb-1">
                Emilie Young
              </h3>
              <p className="text-xs tracking-widest uppercase text-accent mb-4">
                Co-Founder
              </p>
              <p className="text-base text-muted leading-relaxed">
                3rd Generation Classical Pilates instructor, comprehensively
                certified in mat and full apparatus. Trained at Appalachian
                State University under Rebecca Quinn and Marianne Adams in
                the direct lineage of Joseph and Clara Pilates. Emilie brings
                a deep understanding of the original method and a commitment
                to teaching it with precision, care, and without compromise.
              </p>
            </div>

            {/* Annie */}
            <div>
              <div className="relative aspect-[4/5] overflow-hidden mb-6 bg-warm-white">
                <Image
                  src="/annie-young.jpg"
                  alt="Annie Young"
                  fill
                  className="object-cover object-[center_20%] grayscale hover:grayscale-0 transition-all duration-700 ease-in-out"
                />
              </div>
              <h3 className="font-serif text-2xl font-light text-charcoal mb-1">
                Annie Young
              </h3>
              <p className="text-xs tracking-widest uppercase text-accent mb-4">
                Co-Founder
              </p>
              <p className="text-base text-muted leading-relaxed">
                Classical Pilates certified through Appalachian State
                University&apos;s comprehensive program, trained in mat and
                apparatus under the same lineage. Annie believes deeply that
                Classical Pilates was designed for every body — and that
                inclusivity isn&apos;t something you add to the method, it&apos;s
                already built in. She is committed to holding the door open
                for everyone while never compromising the integrity of the
                original work.
              </p>
            </div>
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
