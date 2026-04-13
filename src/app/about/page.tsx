import Image from "next/image";
import Link from "next/link";
import SixPrinciples from "@/components/SixPrinciples";
import Parallax from "@/components/Parallax";

export const metadata = {
  title: "About",
  description: "Meet Emilie and Annie Young, co-founders of Boomerang Pilates. Classical Pilates instruction rooted in integrity, taught with intention.",
};

export default function About() {
  return (
    <>
      {/* Our Values — combined Method + Principles (now first) */}
      <section className="pt-24 pb-24 lg:pt-32 lg:pb-32 bg-warm-white">
        <div className="max-w-2xl mx-auto px-6 text-center mb-20">
          <p className="text-[10px] tracking-[0.4em] uppercase text-accent mb-5 animate-fade-up" style={{ animationDelay: "0.05s" }}>
            Our Values
          </p>
          <h1 className="font-serif text-5xl md:text-6xl font-light text-charcoal leading-tight animate-fade-up" style={{ animationDelay: "0.15s" }}>
            Classical Pilates is for every body.
          </h1>
          <div className="w-12 h-px bg-accent mx-auto mt-8 mb-6 animate-fade-up" style={{ animationDelay: "0.3s" }} />
          <p className="font-serif italic text-base md:text-lg text-charcoal/70 max-w-lg mx-auto animate-fade-up" style={{ animationDelay: "0.4s" }}>
            Classical Pilates is the original method, kept whole. The only thing that&apos;s ever stood between people and this work is the right teachers — so that&apos;s what we are. Whoever you are, however you arrived, the door is open.
          </p>
        </div>
        <SixPrinciples embedded />
      </section>

      {/* Meet the Sisters */}
      <section className="py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs tracking-widest uppercase text-accent mb-4">Meet the Founders</p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-charcoal mb-5">
              Built by Two Sisters
            </h2>
            <p className="text-base text-muted leading-relaxed max-w-xl mx-auto">
              Emilie and Annie grew up in this method. They opened Boomerang
              to bring it home to Durham — taught the way they were taught,
              by teachers who still believe in the original work.
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
              <p className="text-base text-muted leading-relaxed mb-4">
                3rd Generation Classical Pilates instructor, comprehensively
                certified in mat and full apparatus. Trained at Appalachian
                State University under Rebecca Quinn and Marianne Adams in
                the direct lineage of Joseph and Clara Pilates. Emilie brings
                a deep understanding of the original method and a commitment
                to teaching it with precision, care, and without compromise.
              </p>
              <Link
                href="/classes#privates"
                className="inline-flex items-center gap-1 text-xs tracking-widest uppercase text-accent hover:text-accent/70 transition-colors"
              >
                Book a Private with Emilie →
              </Link>
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
              <p className="text-base text-muted leading-relaxed mb-4">
                Classical Pilates certified through Appalachian State
                University&apos;s comprehensive program, trained in mat and
                apparatus under the same lineage. Annie believes deeply that
                Classical Pilates was designed for every body — and that
                inclusivity isn&apos;t something you add to the method, it&apos;s
                already built in. She is committed to holding the door open
                for everyone while never compromising the integrity of the
                original work.
              </p>
              <Link
                href="/classes#privates"
                className="inline-flex items-center gap-1 text-xs tracking-widest uppercase text-accent hover:text-accent/70 transition-colors"
              >
                Book a Private with Annie →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Instructors */}
      <section className="py-20 lg:py-28 bg-warm-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs tracking-widest uppercase text-accent mb-3">
              Our Team
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal mb-4">
              Instructors
            </h2>
            <p className="text-base text-muted leading-relaxed max-w-xl mx-auto">
              Classically trained, rooted in the original work and the direct
              lineage of Joseph Pilates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 max-w-4xl mx-auto">
            {[
              {
                name: "Instructor Name",
                role: "Classical Mat & Apparatus",
                bio: "A short bio goes here — lineage, training, and what she brings to the room. Two or three sentences is perfect.",
              },
              {
                name: "Instructor Name",
                role: "Mat & Reformer",
                bio: "A short bio goes here — lineage, training, and what she brings to the room. Two or three sentences is perfect.",
              },
              {
                name: "Instructor Name",
                role: "Classical Mat",
                bio: "A short bio goes here — lineage, training, and what she brings to the room. Two or three sentences is perfect.",
              },
            ].map((inst, i) => (
              <div key={i} className="text-center md:text-left">
                {/* Image placeholder */}
                <div className="relative aspect-[4/5] overflow-hidden mb-5 bg-charcoal/5 border border-charcoal/10 flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-charcoal/20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1}
                    viewBox="0 0 24 24"
                    aria-hidden
                  >
                    <circle cx="12" cy="8" r="4" />
                    <path strokeLinecap="round" d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" />
                  </svg>
                </div>
                <h3 className="font-serif text-xl font-light text-charcoal mb-1">
                  {inst.name}
                </h3>
                <p className="text-xs tracking-widest uppercase text-accent mb-3">
                  {inst.role}
                </p>
                <p className="text-sm text-muted leading-relaxed">
                  {inst.bio}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-14">
            <Link
              href="/classes#privates"
              className="inline-flex items-center gap-1 text-xs tracking-widest uppercase text-accent hover:text-accent/70 transition-colors"
            >
              See Availability →
            </Link>
          </div>
        </div>
      </section>

      {/* Reformer photo break — parallax reveals more of the image as you scroll */}
      <section className="relative h-[50vh] lg:h-[65vh] overflow-hidden">
        <Parallax speed={0.25} className="absolute inset-x-0 -top-[25%] h-[150%]">
          <div className="relative w-full h-full">
            <Image
              src="/photo-about-bottom.jpg"
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
        </Parallax>
        <div className="absolute inset-0 bg-[#5c4a3a]/20" />
      </section>

    </>
  );
}
