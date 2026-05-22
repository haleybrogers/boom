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
                Classical Pilates rewired the way Emilie lives in her body.
                Before she found the method, chronic neck and back pain
                was the constant, and fitness wasn&apos;t really her thing.
                Classical Pilates taught her what strong actually felt
                like. Boomerang is her offer of that to anyone who walks
                in.
              </p>
              <p className="text-base text-muted leading-relaxed mb-4">
                She earned her 600-hour comprehensive classical Pilates
                certification at Appalachian State in 2015, training under
                Marianne Adams and Rebecca Quinn in the direct lineage of
                Romana Kryzanowska. In the decade since, she&apos;s worked
                with everyone from professional athletes and polo players
                to post-partum mothers and clients rehabbing injuries.
              </p>
              <p className="text-base text-muted leading-relaxed mb-4">
                When she&apos;s not in the studio, Emilie teaches elementary
                art in Durham Public Schools. She&apos;s an educator
                through and through, and she brings the same patience and
                playfulness to a Pilates session as she does to a classroom
                of kids. Boomerang has been a long time coming. She
                can&apos;t wait to welcome you in.
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
                For a long time Annie thought her body just hurt because
                of dance. She was half right. The hurting was real, but
                it wasn&apos;t dance. It was hypermobile Ehlers-Danlos
                Syndrome, the connective-tissue condition that gave her
                the flexibility dance loved and the joint instability
                that made everything else hurt.
              </p>
              <p className="text-base text-muted leading-relaxed mb-4">
                Then she found classical Pilates at Appalachian State, and
                one realization landed quickly: movement is meant to feel
                good. The method gave her a way to feel her body from the
                inside out and to actually trust her own joints. It&apos;s
                been part of her practice every day since, especially on
                hEDS days she can&apos;t predict.
              </p>
              <p className="text-base text-muted leading-relaxed mb-4">
                Annie earned a BA in Dance Studies and her 600-hour
                comprehensive classical Pilates certification at Appalachian
                State, trained in the same lineage as Emilie under Marianne
                Adams and Rebecca Quinn. She teaches the work the way it
                was written, with a modern attention to biomechanics and
                an open door for every body, anchored in the six classical
                principles: breath, control, center, concentration,
                precision, and flow.
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
