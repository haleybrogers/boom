import Image from "next/image";
import Link from "next/link";
import SixPrinciples from "@/components/SixPrinciples";

export const metadata = {
  title: "About",
  description: "Meet Emilie and Annie Young, co-founders of Boomerang Pilates. Classical Pilates instruction rooted in integrity, taught with intention.",
};

export default function About() {
  return (
    <>
      {/* Our Values. Combined Method + Principles (now first) */}
      <section className="pt-24 pb-24 lg:pt-32 lg:pb-32 bg-warm-white">
        <div className="max-w-2xl mx-auto px-6 text-center mb-20">
          <p className="text-[11px] tracking-[0.4em] uppercase text-accent mb-5 animate-fade-up" style={{ animationDelay: "0.05s" }}>
            Our Values
          </p>
          <h1 className="font-serif text-5xl md:text-6xl font-light text-charcoal leading-tight animate-fade-up" style={{ animationDelay: "0.15s" }}>
            Classical Pilates is for every body.
          </h1>
          <div className="w-12 h-px bg-accent mx-auto mt-8 mb-6 animate-fade-up" style={{ animationDelay: "0.3s" }} />
          <p className="font-serif italic text-base md:text-lg text-charcoal/70 max-w-lg mx-auto animate-fade-up" style={{ animationDelay: "0.4s" }}>
            Classical Pilates is the original method, kept whole. Six principles you&apos;ll feel in every class. The work has always been for every body. It just needed teachers who&apos;d keep it that way, and that&apos;s us. Whoever you are, you&apos;re welcome here.
          </p>
        </div>

        <div className="max-w-5xl mx-auto px-6">
          <SixPrinciples embedded />
        </div>
      </section>

      {/* Meet the Sisters */}
      <section className="py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm tracking-widest uppercase text-accent mb-4">Meet the Founders</p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-charcoal mb-5">
              Built by Two Sisters
            </h2>
            <p className="text-base text-muted leading-relaxed max-w-xl mx-auto">
              Emilie and Annie grew up in this method. They opened Boomerang
              to bring it home to Durham. Taught the way they were taught,
              by teachers who still believe in the original work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 max-w-3xl mx-auto items-start">
            {/* Emilie */}
            <div>
              <div className="relative aspect-[4/5] overflow-hidden mb-6 bg-warm-white">
                <Image
                  src="/emilie-young.jpg"
                  alt="Emilie Young"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-[center_22%] scale-100 sm:scale-[1.4] transition-transform duration-700 sm:hover:scale-[1.45]"
                />
              </div>
              <h3 className="font-serif text-2xl font-light text-charcoal mb-1">
                Emilie Young
              </h3>
              <p className="text-sm tracking-widest uppercase text-accent mb-4">
                Founder / Owner
              </p>
              <p className="text-base text-muted leading-relaxed mb-4">
                Emilie is the vision behind Boomerang, built on the belief
                that everyone should get to feel the benefits of classical
                Pilates when it&apos;s practiced with intention and patience.
                She found her own way into the method through chronic neck
                and back pain &mdash; and the &ldquo;ah-ha&rdquo; moment of
                feeling strong, supported, and connected for the first time.
                Wherever you are in your practice, she wants you to have
                that moment too.
              </p>
              <p className="text-base text-muted leading-relaxed mb-4">
                Emilie completed her 600-hour comprehensive classical Pilates
                certification at Appalachian State University in 2015,
                training under Marianne Adams and Rebecca Quinn in the
                direct lineage of Romana Kryzanowska. Over 10+ years of
                teaching, she&apos;s worked with everyone from professional
                athletes and polo players to post-partum mothers and clients
                in rehab.
              </p>
              <p className="text-base text-muted leading-relaxed mb-4">
                She&apos;s also an elementary art teacher in Durham Public
                Schools &mdash; an educator through and through, bringing
                patience, open-mindedness, and a little playfulness to every
                session. Building Boomerang has been a long-time dream: a
                community-oriented classical studio where everyone is
                welcome.
              </p>
              <Link
                href="/privates"
                className="inline-flex items-center gap-1 text-sm tracking-widest uppercase text-accent hover:text-accent/70 transition-colors"
              >
                Book a Session with Emilie →
              </Link>
            </div>

            {/* Annie */}
            <div>
              <div className="relative aspect-[4/5] overflow-hidden mb-6 bg-warm-white">
                <Image
                  src="/annie-young.jpg"
                  alt="Annie Young"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-[center_22%] scale-105 sm:scale-[1.55] transition-transform duration-700 sm:hover:scale-[1.6]"
                />
              </div>
              <h3 className="font-serif text-2xl font-light text-charcoal mb-1">
                Annie Young
              </h3>
              <p className="text-sm tracking-widest uppercase text-accent mb-4">
                Co-Founder / Studio Manager
              </p>
              <p className="text-base text-muted leading-relaxed mb-4">
                Annie grew up a dancer &mdash; pushing her body to limits
                she didn&apos;t know were limits, because she was silently
                navigating hypermobile Ehlers-Danlos Syndrome. Dance came
                easily to her hypermobile body, but she felt disconnected
                from it, and chronic pain became her version of normal.
                Discovering classical Pilates in her early twenties at
                Appalachian State was her &ldquo;ah-ha&rdquo; moment:
                movement is meant to feel good.
              </p>
              <p className="text-base text-muted leading-relaxed mb-4">
                Pilates has given Annie strength, stability, and a new way
                of listening to her body. It taught her that pain isn&apos;t
                an unavoidable partner of movement, but a signal something
                needs more attention. Her practice continues to be a
                supportive system for living with hEDS, day to day.
              </p>
              <p className="text-base text-muted leading-relaxed mb-4">
                Annie earned a BA in Dance Studies and her 600-hour
                comprehensive classical Pilates certification at Appalachian
                State, in the same lineage as her sister &mdash; Romana
                Kryzanowska through Marianne Adams and Rebecca Quinn.
                She&apos;s passionate about preserving the integrity of
                Joseph Pilates&apos; original work while integrating modern
                biomechanics, holding the door open for every body.
              </p>
              <Link
                href="/privates"
                className="inline-flex items-center gap-1 text-sm tracking-widest uppercase text-accent hover:text-accent/70 transition-colors"
              >
                Book a Session with Annie →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pre-opening CTA. Sits above the sisters photo */}
      <section className="pt-20 lg:pt-28 pb-12 lg:pb-16 bg-warm-white">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p className="text-sm tracking-widest uppercase text-accent mb-4">
            Before We Open
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal leading-tight mb-6">
            Come meet us in person.
          </h2>
          <p className="text-muted text-base leading-relaxed mb-8 max-w-md mx-auto">
            We&apos;re hosting free pop-up classes at favorite Durham spots
            until the doors open July 13. Bring a mat. Bring a friend.
          </p>
          <Link
            href="/events"
            className="btn-animated inline-block bg-accent text-white text-sm tracking-widest uppercase px-8 py-3.5 hover:bg-accent/90 transition-colors"
          >
            See where we&apos;re popping up →
          </Link>
        </div>
      </section>

      {/* Sisters photo. Header re-added once we have a third instructor */}
      <section className="pb-20 lg:pb-28 bg-warm-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="relative aspect-[3/4] sm:aspect-[4/5] md:aspect-[3/2] max-w-3xl mx-auto overflow-hidden">
            <Image
              src="/photo-sisters.jpg"
              alt="Emilie and Annie Young, co-founders of Boomerang Pilates"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        </div>
      </section>

    </>
  );
}
