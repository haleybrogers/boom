import Image from "next/image";
import Button from "@/components/Button";

export default function About() {
  return (
    <>
      {/* Hero */}
      <section className="py-24 lg:py-32">
        <div className="max-w-xl mx-auto px-6 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-light text-charcoal mb-6">
            Two Sisters. One Method.
          </h1>
          <p className="text-muted leading-relaxed">
            Boomerang Pilates is a Classical Pilates studio in Durham, NC,
            founded by sisters Emilie and Annie Young. Raised in Greensboro and
            both trained at Appalachian State, they built Boomerang to share
            the method that brought them together — and the one they believe can
            change the way you move through life.
          </p>
        </div>
      </section>

      {/* Founders */}
      <section className="pb-24 lg:pb-32">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Emilie */}
            <div className="text-center">
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
              <p className="text-xs tracking-widest uppercase text-muted mb-5">
                Co-Founder
              </p>
              <p className="text-sm text-muted leading-relaxed">
                Emilie is a 3rd Generation Classical Pilates instructor,
                comprehensively certified in mat and apparatus. She completed
                her training in 2015 at Appalachian State under 2nd Generation
                instructors Rebecca Quinn and Marianne Adams. When she&apos;s
                not in the studio, she&apos;s teaching elementary art for
                Durham Public Schools — bringing the same warmth and creativity
                to both classrooms.
              </p>
            </div>

            {/* Annie */}
            <div className="text-center">
              <div className="relative w-44 h-44 rounded-full overflow-hidden mx-auto mb-6 bg-warm-white flex items-center justify-center">
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
              <p className="text-xs tracking-widest uppercase text-muted mb-5">
                Co-Founder
              </p>
              <p className="text-sm text-muted leading-relaxed">
                Annie earned her comprehensive Classical Pilates certification
                from Appalachian State in 2023 — following in her big
                sister&apos;s footsteps. She&apos;s passionate about making
                Pilates accessible to every body, and when she&apos;s not in
                the studio you can find her dancing or hanging out with her
                dogs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Their story */}
      <section className="py-24 lg:py-32 bg-warm-white">
        <div className="max-w-xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal mb-6">
            The Boomerang Story
          </h2>
          <div className="space-y-4 text-muted leading-relaxed">
            <p>
              Growing up in Greensboro, Emilie and Annie didn&apos;t know that
              Pilates would become the thing that brought them even closer.
              Emilie discovered the method first — walking into a mat class at
              App State in 2012 and feeling something click. Years later, Annie
              followed her to the same university, the same training program,
              and the same love for the work.
            </p>
            <p>
              Boomerang is the studio they always talked about building
              together. A place rooted in the Classical method, taught with
              care, and open to everyone. The name says it all — what you put
              into this practice comes back to you.
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
            Book a class or just stop by and say hello.
          </p>
          <Button href="/contact">Get in Touch</Button>
        </div>
      </section>
    </>
  );
}
