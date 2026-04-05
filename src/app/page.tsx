import Button from "@/components/Button";
import SectionHeading from "@/components/SectionHeading";
import Card from "@/components/Card";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-cream via-tan/20 to-blue/20" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-brown mb-6">
              Boomerang Pilates
            </p>
            <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl font-light leading-[0.95] text-charcoal mb-8">
              Find Your
              <br />
              Way Back
              <br />
              <span className="italic">to You</span>
            </h1>
            <p className="text-lg text-brown max-w-lg mb-10 leading-relaxed">
              Classical Pilates in the Raleigh-Durham area. Strengthen your
              body, calm your mind, and restore your balance with classes
              designed to meet you exactly where you are.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="/classes#book">Book Your First Class</Button>
              <Button href="/classes" variant="outline">
                View Schedule
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Boomerang */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            eyebrow="Why Boomerang"
            title="Movement That Comes Back to You"
            description="Our approach is rooted in the belief that Pilates is for every body. Whether you're a beginner or a seasoned practitioner, we create space for you to grow."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card
              icon="&#10022;"
              title="Expert Instruction"
              description="Our certified instructors bring years of experience and a deep understanding of anatomy to every class, ensuring safe and effective movement."
            />
            <Card
              icon="&#9672;"
              title="Warm Community"
              description="More than a studio, we're a community. A welcoming space where you can show up as you are and leave feeling like yourself again."
            />
            <Card
              icon="&#9702;"
              title="Thoughtful Classes"
              description="From gentle mat work to challenging reformer sessions, every class is thoughtfully designed to meet you where you are today."
            />
          </div>
        </div>
      </section>

      {/* Classes Preview */}
      <section className="py-24 lg:py-32 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Classes"
            title="Something for Every Body"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Mat Pilates",
                description:
                  "Build core strength and flexibility using your own body weight. Perfect for all levels.",
                level: "All Levels",
              },
              {
                title: "Reformer Flow",
                description:
                  "Dynamic, spring-loaded resistance training that sculpts and strengthens. An amazing full-body workout.",
                level: "Intermediate",
              },
              {
                title: "Gentle Restore",
                description:
                  "A slower, restorative class focusing on mobility, breathwork, and mindful movement.",
                level: "Beginner Friendly",
              },
              {
                title: "Power Reformer",
                description:
                  "High-intensity reformer work for those looking to challenge themselves and build serious strength.",
                level: "Advanced",
              },
            ].map((cls) => (
              <div
                key={cls.title}
                className="bg-white p-8 lg:p-10 border border-tan/30 hover:border-tan transition-colors duration-300 group"
              >
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-blue mb-3 block">
                  {cls.level}
                </span>
                <h3 className="font-serif text-3xl lg:text-4xl font-light text-charcoal mb-3 group-hover:text-brown transition-colors">
                  {cls.title}
                </h3>
                <p className="text-sm leading-relaxed text-brown">
                  {cls.description}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button href="/classes">View All Classes &amp; Schedule</Button>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-24 lg:py-32 bg-charcoal text-cream">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <svg
            className="w-10 h-10 mx-auto mb-8 text-tan/50"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H0z" />
          </svg>
          <blockquote className="font-serif text-3xl md:text-4xl lg:text-5xl font-light leading-snug italic mb-8">
            Boomerang isn&apos;t just a studio &mdash; it&apos;s the place
            where I found my strength again.
          </blockquote>
          <cite className="text-sm font-medium tracking-wide uppercase text-cream/60 not-italic">
            &mdash; Sarah M., Member Since 2024
          </cite>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 lg:py-28 bg-tan/30">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-charcoal mb-6">
            Ready to Begin?
          </h2>
          <p className="text-brown mb-10 text-lg">
            Your first class is on us. Come see what the Boomerang community is
            all about.
          </p>
          <Button href="/classes#book">Book Your Free Class</Button>
        </div>
      </section>
    </>
  );
}
