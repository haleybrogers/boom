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
    description: "Just you and the mat. The classical sequence adapted so anyone can show up — skip what doesn't work for your body, repeat what does. No props, no guessing.",
  },
  {
    title: "Return to Life Mat",
    capacity: "15 spots",
    duration: "50 min",
    description: "Joseph Pilates' original 34-exercise mat sequence, performed in full. You know the order — now let it flow.",
  },
  {
    title: "Return to Life Course I",
    capacity: "15 spots",
    duration: "50 min",
    description: "Learn the first half of Joseph Pilates' original mat sequence one exercise at a time. Breath, control, precision — at your own pace.",
  },
  {
    title: "Return to Life Course II",
    capacity: "15 spots",
    duration: "50 min",
    description: "Continue through the second half of the sequence. More advanced exercises and transitions — as your body is ready for them.",
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

const packages = [
  {
    category: "Founding Member",
    tag: "Limited Time",
    items: [
      { name: "Founding Unlimited Mat", price: "$149/mo", note: "Unlimited mat classes. Locked in for life.", highlight: true },
      { name: "Founding Unlimited All-Access", price: "$249/mo", note: "Unlimited mat + apparatus. Locked in for life.", highlight: true },
    ],
  },
  {
    category: "Class Packs",
    tag: null,
    items: [
      { name: "5-Class Mat Pack", price: "$110", note: "$22/class · Never expires.", highlight: false },
      { name: "10-Class Mat Pack", price: "$200", note: "$20/class · Never expires.", highlight: false },
      { name: "5-Class Apparatus Pack", price: "$200", note: "$40/class · Never expires.", highlight: false },
      { name: "10-Class Apparatus Pack", price: "$375", note: "$37.50/class · Never expires.", highlight: false },
    ],
  },
  {
    category: "Monthly Memberships",
    tag: null,
    items: [
      { name: "Unlimited Mat", price: "$179/mo", note: "Unlimited mat classes each month.", highlight: false },
      { name: "Unlimited All-Access", price: "$299/mo", note: "Unlimited mat + apparatus classes each month.", highlight: false },
    ],
  },
  {
    category: "New Here?",
    tag: "Intro Offer",
    items: [
      { name: "First Class Free", price: "Free", note: "Your first mat class is on us. No strings.", highlight: true },
      { name: "Intro 3-Pack", price: "$60", note: "$20/class · Try 3 mat classes in your first month.", highlight: false },
    ],
  },
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

      {/* Why Classical Works */}
      <section className="py-16 lg:py-20 bg-warm-white">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="font-serif text-2xl md:text-3xl font-light text-charcoal mb-4">
            The Method Adapts to You
          </h2>
          <p className="text-sm text-muted leading-relaxed">
            Classical Pilates — mat and apparatus — was designed for every body. The exercises come
            in a set order, so you always know what&apos;s next. If something doesn&apos;t work for you
            today, skip it or repeat what does. Nothing needs to be watered down to be accessible.
            The work meets you where you are.
          </p>
        </div>
      </section>

      {/* Mat Classes */}
      <section className="pb-16 lg:pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-serif text-2xl md:text-3xl font-light text-charcoal mb-2">
            Mat Classes
          </h2>
          <p className="text-xs tracking-widest uppercase text-muted mb-1">50 Minutes &middot; 15 Spots</p>
          <p className="text-sm text-muted mb-8">No equipment — just you and the mat.</p>
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
          <p className="text-xs tracking-widest uppercase text-muted mb-1">50 Minutes &middot; 3 Spots</p>
          <p className="text-sm text-muted mb-8">Spring-loaded resistance on reformer, tower, and barrels — small groups so you get real attention.</p>
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

      {/* Schedule & Booking (synced from Arketa) */}
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

      {/* Packages */}
      <section className="py-24 lg:py-32 bg-warm-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-3xl font-light text-charcoal mb-3 text-center">
            Packages &amp; Memberships
          </h2>
          <p className="text-sm text-muted text-center mb-14 max-w-md mx-auto">
            Drop in, commit to a pack, or lock in a founding rate before we open.
          </p>

          <div className="space-y-14">
            {packages.map((group) => (
              <div key={group.category}>
                <div className="flex items-center gap-3 mb-6">
                  <h3 className="font-serif text-xl font-light text-charcoal">
                    {group.category}
                  </h3>
                  {group.tag && (
                    <span className="text-[10px] tracking-widest uppercase text-accent bg-accent/10 px-2.5 py-1 rounded-sm">
                      {group.tag}
                    </span>
                  )}
                </div>
                <div className="divide-y divide-charcoal/10 border-y border-charcoal/10">
                  {group.items.map((item) => (
                    <div
                      key={item.name}
                      className={`py-5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-6 ${
                        item.highlight ? "bg-accent/[0.03] -mx-4 px-4 rounded-sm" : ""
                      }`}
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-serif text-lg font-light text-charcoal">{item.name}</p>
                        <p className="text-xs text-muted mt-0.5">{item.note}</p>
                      </div>
                      <span className="font-serif text-xl font-light text-charcoal shrink-0">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist */}
      <section id="book" className="py-24 lg:py-32">
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
