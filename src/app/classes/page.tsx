import ClassSchedule from "@/components/ClassSchedule";
import ArketaBooking from "@/components/ArketaBooking";
import WaitlistForm from "@/components/WaitlistForm";

export const metadata = {
  title: "Classes",
  description: "Classical Mat, Group Tower, Privates, and Duets. View offerings and pricing at Boomerang Pilates in Durham, NC.",
};

const matClasses = [
  {
    title: "All Levels Mat",
    capacity: "15 spots",
    duration: "50 min",
    description: "The classical mat sequence adapted for every body. Core strength, flow, and control — no equipment needed.",
  },
  {
    title: "Return to Life Mat",
    capacity: "15 spots",
    duration: "50 min",
    description: "The full 34-exercise sequence as Joseph Pilates designed it. A complete workout for experienced practitioners.",
  },
  {
    title: "Return to Life Course I",
    capacity: "15 spots",
    duration: "50 min",
    description: "Learn the first half of the classical mat order. Build the foundation — breath, control, and precision — one exercise at a time.",
  },
  {
    title: "Return to Life Course II",
    capacity: "15 spots",
    duration: "50 min",
    description: "Continue through the full classical order. Deepen your practice with more advanced exercises and transitions.",
  },
];

const apparatusClasses = [
  {
    title: "Apparatus Foundations",
    capacity: "3 spots",
    duration: "50 min",
    description: "An introduction to tower and small barrel work. Learn the basics of spring-loaded resistance in a small group setting.",
  },
  {
    title: "Intermediate Mixed Apparatus",
    capacity: "3 spots",
    duration: "50 min",
    description: "Rotate through reformer, tower, and barrels in a single session. For students with apparatus experience.",
  },
];

const pricing = [
  { name: "Classical Mat", capacity: "15 spots", price: "$25", focus: "Core strength, flow, and affordability." },
  { name: "Group Tower", capacity: "3 spots", price: "$45", focus: "Resistance training using reformer, tower, and barrels." },
  { name: "Privates", capacity: "1 person", price: "$110", focus: "Customized apparatus work — Reformer, Tower, Barrel, Chair." },
  { name: "Duets", capacity: "2 people", price: "$60", focus: "Customized apparatus work with a partner." },
];


export default function Classes() {
  return (
    <>
      {/* Hero with parallax image */}
      <section
        className="relative bg-fixed bg-cover bg-center h-[40vh] lg:h-[50vh]"
        style={{ backgroundImage: "url(/photo-chair.jpg)" }}
      >
        <div className="absolute inset-0 bg-[#5c4a3a]/35" />
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center px-6">
            <h1 className="font-serif text-4xl md:text-5xl font-light text-white mb-4">
              Classes
            </h1>
            <p className="text-white/70 text-sm leading-relaxed max-w-md mx-auto">
              Classical Pilates — mat and apparatus. Find the class that meets you where you are.
            </p>
          </div>
        </div>
      </section>

      {/* What is Return to Life? */}
      <section className="py-16 lg:py-20 bg-warm-white">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="font-serif text-2xl md:text-3xl font-light text-charcoal mb-4">
            What is &ldquo;Return to Life&rdquo;?
          </h2>
          <p className="text-sm text-muted leading-relaxed">
            <em>Return to Life Through Contrology</em> is Joseph Pilates&apos; original work — 34 mat exercises
            performed in a specific order, each one building on the last. Our Return to Life courses teach this
            sequence progressively, so you learn the method the way it was designed.
          </p>
        </div>
      </section>

      {/* Mat Classes */}
      <section className="pb-16 lg:pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-serif text-2xl md:text-3xl font-light text-charcoal mb-2">
            Mat Classes
          </h2>
          <p className="text-xs tracking-widest uppercase text-muted mb-8">50 Minutes &middot; 15 Spots</p>
          <div className="divide-y divide-charcoal/10 border-y border-charcoal/10">
            {matClasses.map((cls) => (
              <div key={cls.title} className="py-8 md:py-10 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-start">
                <div>
                  <h3 className="font-serif text-xl md:text-2xl font-light text-charcoal mb-2">
                    {cls.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed max-w-lg">
                    {cls.description}
                  </p>
                </div>
                <span className="text-sm text-muted">{cls.duration}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apparatus Classes */}
      <section className="pb-24 lg:pb-32">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-serif text-2xl md:text-3xl font-light text-charcoal mb-2">
            Apparatus Classes
          </h2>
          <p className="text-xs tracking-widest uppercase text-muted mb-8">50 Minutes &middot; 3 Spots</p>
          <div className="divide-y divide-charcoal/10 border-y border-charcoal/10">
            {apparatusClasses.map((cls) => (
              <div key={cls.title} className="py-8 md:py-10 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-start">
                <div>
                  <h3 className="font-serif text-xl md:text-2xl font-light text-charcoal mb-2">
                    {cls.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed max-w-lg">
                    {cls.description}
                  </p>
                </div>
                <span className="text-sm text-muted">{cls.duration}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule */}
      <ClassSchedule />

      {/* Arketa Booking */}
      <ArketaBooking />

      {/* Pricing */}
      <section className="py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-3xl font-light text-charcoal mb-12 text-center">
            Pricing
          </h2>
          <div className="divide-y divide-charcoal/10 border-y border-charcoal/10">
            {pricing.map((plan) => (
              <div key={plan.name} className="py-8 grid grid-cols-[1fr_auto_auto] sm:grid-cols-[1fr_auto_auto_1fr] gap-x-6 gap-y-1 items-baseline">
                <h3 className="font-serif text-xl font-light text-charcoal">{plan.name}</h3>
                <span className="text-sm text-muted">{plan.capacity}</span>
                <span className="font-serif text-2xl font-light text-charcoal">{plan.price}</span>
                <p className="text-sm text-muted col-span-3 sm:col-span-1">{plan.focus}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist */}
      <section id="book" className="py-24 lg:py-32 bg-warm-white">
        <div className="max-w-xl mx-auto px-6 text-center">
          <p className="text-xs tracking-widest uppercase text-accent mb-4">Coming Soon</p>
          <h2 className="font-serif text-3xl font-light text-charcoal mb-4">
            Get on the list.
          </h2>
          <p className="text-muted text-sm mb-10">
            We&apos;re opening soon. Sign up to be the first to know — and your
            first class is on us.
          </p>
          <WaitlistForm />
        </div>
      </section>
    </>
  );
}
