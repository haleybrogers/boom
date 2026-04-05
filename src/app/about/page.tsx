import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";

const instructors = [
  {
    name: "Jordan Chen",
    role: "Founder & Lead Instructor",
    bio: "With over 15 years of Pilates experience and a background in physical therapy, Jordan founded Boomerang to create a space where movement meets mindfulness.",
  },
  {
    name: "Maya Torres",
    role: "Reformer Specialist",
    bio: "Maya's dynamic reformer classes blend athletic conditioning with classical Pilates principles. She believes in pushing boundaries while honoring the body.",
  },
  {
    name: "Alex Reeves",
    role: "Mat & Restore Instructor",
    bio: "Alex specializes in accessible, therapeutic movement. Their gentle classes are beloved by beginners and those recovering from injury alike.",
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
              Built on the Belief That Movement Heals
            </h1>
            <p className="text-lg text-brown leading-relaxed max-w-xl">
              Boomerang Pilates was born from a simple idea: that returning to
              your body through mindful movement can transform your entire life.
              We opened our doors to create a warm, welcoming space where
              everyone can experience the power of Pilates.
            </p>
          </div>
        </div>
      </section>

      {/* Studio Image Placeholder */}
      <section className="bg-white">
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

      {/* Instructors */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            eyebrow="Meet the Team"
            title="Your Instructors"
            description="Passionate, experienced, and dedicated to your progress."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {instructors.map((instructor) => (
              <div key={instructor.name} className="text-center">
                {/* Avatar placeholder */}
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-tan/40 to-blue/30 mx-auto mb-6 flex items-center justify-center">
                  <span className="font-serif text-3xl text-brown/40">
                    {instructor.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
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
