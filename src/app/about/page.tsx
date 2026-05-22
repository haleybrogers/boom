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
                Emilie came to Pilates through chronic neck and back pain.
                Never into fitness before &mdash; and then the method
                rewired her relationship with her own body. The
                &ldquo;ah-ha&rdquo; was being able to actually feel strong,
                supported, and connected, for the first time. She founded
                Boomerang to bring that feeling to as many people as she
                can.
              </p>
              <p className="text-base text-muted leading-relaxed mb-4">
                She completed her 600-hour comprehensive classical Pilates
                certification at Appalachian State University in 2015,
                training under Marianne Adams and Rebecca Quinn in the
                direct lineage of Romana Kryzanowska. In the decade since,
                she&apos;s taught everyone from professional athletes and
                polo players to post-partum mothers and clients rehabbing
                injuries.
              </p>
              <p className="text-base text-muted leading-relaxed mb-4">
                By day, Emilie teaches elementary art in Durham Public
                Schools &mdash; an educator through and through. She brings
                patience, openness, and a little playfulness to every
                session, in the classroom or the studio. Boomerang has been
                a long time coming. She can&apos;t wait to welcome you in.
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
                Annie grew up a dancer. The flexibility came easy &mdash;
                what she didn&apos;t know was that it came from hypermobile
                Ehlers-Danlos Syndrome. Living with hEDS meant a body she
                could push past its limits without realizing she&apos;d
                pushed too far, and she came up believing chronic pain was
                the cost of doing the thing she loved.
              </p>
              <p className="text-base text-muted leading-relaxed mb-4">
                Discovering classical Pilates in her early twenties at
                Appalachian State changed that. The method gave her a way
                to feel her body from the inside out, and the
                &ldquo;ah-ha&rdquo; was simple: movement is meant to feel
                good. Pilates has stayed with her since &mdash; through
                hEDS days she can&apos;t predict, as a system that lets
                her listen, trust, and rebuild.
              </p>
              <p className="text-base text-muted leading-relaxed mb-4">
                Annie earned a BA in Dance Studies and her 600-hour
                comprehensive classical Pilates certification at Appalachian
                State, trained in the same lineage as Emilie under Marianne
                Adams and Rebecca Quinn. She&apos;s passionate about
                keeping Joseph Pilates&apos; work intact while teaching it
                through a modern lens &mdash; biomechanics, inclusivity,
                and the six principles at its core: breath, control, center,
                concentration, precision, and flow.
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
