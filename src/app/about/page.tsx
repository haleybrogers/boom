import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";

const instructors = [
  {
    name: "Instructor Name",
    role: "Reformer Specialist",
    bio: "Placeholder bio — replace with your instructor's background and teaching philosophy.",
  },
  {
    name: "Instructor Name",
    role: "Mat & Restore Instructor",
    bio: "Placeholder bio — replace with your instructor's background and teaching philosophy.",
  },
];

const values = [
  {
    title: "Accessibility",
    description:
      "Every body is welcome here. We offer modifications for every exercise and create an environment free of judgment.",
  },
  {
    title: "Intentionality",
    description:
      "We believe in quality over quantity. Every movement is purposeful, every class is thoughtfully crafted.",
  },
  {
    title: "Community",
    description:
      "We're building more than a studio. We're nurturing a supportive community that lifts each other up.",
  },
  {
    title: "Growth",
    description:
      "Whether it's your first class or your thousandth, there's always room to grow, learn, and discover something new.",
  },
];

export default function About() {
  return (
    <>
      {/* Hero */}
      <section className="py-24 lg:py-32 bg-gradient-to-b from-tan/20 to-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-brown mb-4">
              Our Story
            </p>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-light leading-[1] text-charcoal mb-8">
              Born From a Love of Classical Pilates
            </h1>
            <p className="text-lg text-brown leading-relaxed max-w-xl">
              Boomerang Pilates grew out of a deep, personal connection to the
              Classical Pilates method — and a belief that this work has the
              power to change how you move, feel, and live. What started as one
              transformative mat class became a lifelong journey, and now a
              studio built to share that feeling with you.
            </p>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Emilie's headshot — drop emilie-young.jpg into /public to display */}
            <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-tan/30 via-blue/15 to-tan/20">
              <Image
                src="/emilie-young.jpg"
                alt="Emilie Young, founder of Boomerang Pilates"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>

            {/* Bio */}
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-brown mb-4">
                Meet the Founder
              </p>
              <h2 className="font-serif text-4xl md:text-5xl font-light text-charcoal mb-6 leading-[1.1]">
                Emilie Young
              </h2>
              <div className="space-y-4 text-brown leading-relaxed">
                <p>
                  Emilie is a 3rd Generation Classical Pilates instructor,
                  comprehensively certified in both mat and apparatus. Her
                  journey with Pilates began at Appalachian State University,
                  where she trained under 2nd Generation instructors Rebecca
                  Quinn and Marianne Adams and completed their Classical Pilates
                  training program in 2015.
                </p>
                <p>
                  In addition to her Pilates career, Emilie is also an
                  elementary art teacher for Durham Public Schools. Her
                  perspective as a classroom teacher helps her understand how
                  daily movement patterns affect our bodies — and she is
                  passionate about the Classical Pilates Method as a tool to
                  combat daily stressors and chronic pain.
                </p>
                <p>
                  At Boomerang, Emilie&apos;s mission is simple: to help her
                  clients feel strong, confident, and connected in their bodies.
                </p>
                <p className="font-serif text-xl italic text-charcoal pt-2">
                  &ldquo;Pilates gave me my body back. Boomerang is my way of
                  sharing that gift with others.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Studio Image Placeholder */}
      <section className="bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="aspect-[21/9] bg-gradient-to-r from-tan/30 via-blue/20 to-tan/30 flex items-center justify-center border border-tan/20">
            <div className="text-center">
              <p className="text-brown/50 text-sm tracking-wide uppercase">
                Studio Photo
              </p>
              <p className="text-brown/30 text-xs mt-1">
                Replace with your studio image
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 lg:py-32 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            eyebrow="What We Stand For"
            title="Our Values"
            description="These principles guide everything we do, from how we design our classes to how we welcome you through the door."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-white p-8 lg:p-10 border border-tan/30"
              >
                <h3 className="font-serif text-2xl lg:text-3xl font-light text-charcoal mb-3">
                  {value.title}
                </h3>
                <p className="text-sm leading-relaxed text-brown">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Instructors */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            eyebrow="The Team"
            title="Our Instructors"
            description="Led by Emilie and supported by a growing team of dedicated Classical Pilates practitioners."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {instructors.map((instructor, i) => (
              <div key={i} className="text-center">
                {/* Avatar placeholder */}
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-tan/40 to-blue/30 mx-auto mb-6 flex items-center justify-center">
                  <span className="font-serif text-2xl text-brown/30">?</span>
                </div>
                <h3 className="font-serif text-2xl font-light text-charcoal mb-1">
                  {instructor.name}
                </h3>
                <p className="text-xs font-semibold tracking-[0.15em] uppercase text-brown/60 mb-4">
                  {instructor.role}
                </p>
                <p className="text-sm leading-relaxed text-brown">
                  {instructor.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-charcoal">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-light text-cream mb-6">
            Come Say Hello
          </h2>
          <p className="text-cream/60 mb-10 text-lg">
            We&apos;d love to meet you. Stop by the studio or book your first
            class online.
          </p>
          <Button href="/contact" variant="secondary">
            Get in Touch
          </Button>
        </div>
      </section>
    </>
  );
}
