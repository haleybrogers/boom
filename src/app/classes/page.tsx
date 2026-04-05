import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";

const classes = [
  {
    title: "Mat Pilates",
    level: "All Levels",
    duration: "55 min",
    description:
      "A full-body mat class that builds core strength, improves posture, and increases flexibility. Using only your body weight, you'll flow through exercises that challenge and strengthen from the inside out.",
    benefits: ["Core strength", "Flexibility", "Posture improvement"],
  },
  {
    title: "Reformer Flow",
    level: "Intermediate",
    duration: "50 min",
    description:
      "Experience the magic of the reformer — spring-loaded resistance that supports and challenges your body simultaneously. A dynamic class that sculpts lean muscle and improves full-body coordination.",
    benefits: ["Full-body toning", "Balance", "Coordination"],
  },
  {
    title: "Gentle Restore",
    level: "Beginner Friendly",
    duration: "45 min",
    description:
      "A slow, mindful class focused on mobility, breath, and gentle strengthening. Perfect for beginners, those recovering from injury, or anyone who needs a mindful reset.",
    benefits: ["Mobility", "Stress relief", "Recovery"],
  },
  {
    title: "Power Reformer",
    level: "Advanced",
    duration: "55 min",
    description:
      "Turn up the intensity. This high-energy reformer class pushes your strength and endurance to new heights. Expect to sweat, shake, and leave feeling empowered.",
    benefits: ["Strength", "Endurance", "Athletic performance"],
  },
  {
    title: "Prenatal Pilates",
    level: "All Levels",
    duration: "45 min",
    description:
      "Specially designed for expectant mothers. Safe, supportive exercises that maintain strength, ease discomfort, and prepare your body for birth.",
    benefits: ["Pelvic floor", "Back support", "Breath work"],
  },
  {
    title: "Pilates Barre",
    level: "All Levels",
    duration: "50 min",
    description:
      "The best of both worlds — Pilates principles meet barre technique. Small, precise movements that sculpt and strengthen while improving balance and grace.",
    benefits: ["Sculpting", "Balance", "Endurance"],
  },
];

const schedule = [
  { time: "6:00 AM", mon: "Mat Pilates", tue: "Reformer Flow", wed: "Mat Pilates", thu: "Power Reformer", fri: "Mat Pilates", sat: "Reformer Flow" },
  { time: "8:00 AM", mon: "Gentle Restore", tue: "Mat Pilates", wed: "Reformer Flow", thu: "Mat Pilates", fri: "Gentle Restore", sat: "Pilates Barre" },
  { time: "10:00 AM", mon: "Reformer Flow", tue: "Prenatal", wed: "Pilates Barre", thu: "Reformer Flow", fri: "Prenatal", sat: "Gentle Restore" },
  { time: "12:00 PM", mon: "Power Reformer", tue: "—", wed: "Mat Pilates", thu: "—", fri: "Power Reformer", sat: "—" },
  { time: "5:30 PM", mon: "Reformer Flow", tue: "Power Reformer", wed: "Reformer Flow", thu: "Pilates Barre", fri: "—", sat: "—" },
  { time: "7:00 PM", mon: "Mat Pilates", tue: "Gentle Restore", wed: "Mat Pilates", thu: "Mat Pilates", fri: "—", sat: "—" },
];

export default function Classes() {
  return (
    <>
      {/* Hero */}
      <section className="py-24 lg:py-32 bg-gradient-to-b from-blue/15 to-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-brown mb-4">
              Our Classes
            </p>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-light leading-[1] text-charcoal mb-8">
              Move With Us
            </h1>
            <p className="text-lg text-brown leading-relaxed max-w-xl">
              From restorative mat work to high-intensity reformer sessions,
              we offer classes for every level and every goal. Find the one
              that speaks to you.
            </p>
          </div>
        </div>
      </section>

      {/* Class Cards */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.map((cls) => (
              <div
                key={cls.title}
                className="bg-cream p-8 border border-tan/30 hover:border-tan transition-all duration-300 flex flex-col"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold tracking-[0.15em] uppercase text-blue">
                    {cls.level}
                  </span>
                  <span className="text-xs text-brown/50">{cls.duration}</span>
                </div>
                <h3 className="font-serif text-3xl font-light text-charcoal mb-3">
                  {cls.title}
                </h3>
                <p className="text-sm leading-relaxed text-brown mb-6 flex-1">
                  {cls.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {cls.benefits.map((benefit) => (
                    <span
                      key={benefit}
                      className="text-xs px-3 py-1 bg-tan/20 text-brown/70 tracking-wide"
                    >
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section id="schedule" className="py-24 lg:py-32 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            eyebrow="Weekly Schedule"
            title="Find Your Time"
            description="Classes run Monday through Saturday. All times are local."
          />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] bg-white border border-tan/30">
              <thead>
                <tr className="border-b border-tan/30">
                  <th className="px-4 py-4 text-left text-xs font-semibold tracking-[0.15em] uppercase text-brown">
                    Time
                  </th>
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <th
                      key={day}
                      className="px-4 py-4 text-left text-xs font-semibold tracking-[0.15em] uppercase text-brown"
                    >
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {schedule.map((row, i) => (
                  <tr
                    key={row.time}
                    className={
                      i < schedule.length - 1 ? "border-b border-tan/20" : ""
                    }
                  >
                    <td className="px-4 py-4 text-sm font-medium text-charcoal whitespace-nowrap">
                      {row.time}
                    </td>
                    <td className="px-4 py-4 text-sm text-brown">{row.mon}</td>
                    <td className="px-4 py-4 text-sm text-brown">{row.tue}</td>
                    <td className="px-4 py-4 text-sm text-brown">{row.wed}</td>
                    <td className="px-4 py-4 text-sm text-brown">{row.thu}</td>
                    <td className="px-4 py-4 text-sm text-brown">{row.fri}</td>
                    <td className="px-4 py-4 text-sm text-brown">{row.sat}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            eyebrow="Pricing"
            title="Simple, Transparent Pricing"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                name: "Drop-In",
                price: "$30",
                per: "per class",
                features: ["Any single class", "No commitment", "Great for visitors"],
              },
              {
                name: "10-Pack",
                price: "$250",
                per: "10 classes",
                features: ["Save $50", "Use anytime", "Shareable with a friend"],
                featured: true,
              },
              {
                name: "Unlimited",
                price: "$175",
                per: "per month",
                features: ["Unlimited classes", "Priority booking", "Guest passes"],
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`p-8 lg:p-10 border text-center flex flex-col ${
                  plan.featured
                    ? "border-charcoal bg-charcoal text-cream"
                    : "border-tan/30 bg-cream"
                }`}
              >
                <h3
                  className={`text-xs font-semibold tracking-[0.2em] uppercase mb-4 ${
                    plan.featured ? "text-cream/60" : "text-brown"
                  }`}
                >
                  {plan.name}
                </h3>
                <p className="font-serif text-5xl font-light mb-1">
                  {plan.price}
                </p>
                <p
                  className={`text-sm mb-8 ${
                    plan.featured ? "text-cream/60" : "text-brown/60"
                  }`}
                >
                  {plan.per}
                </p>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className={`text-sm ${
                        plan.featured ? "text-cream/80" : "text-brown"
                      }`}
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  href="#book"
                  variant={plan.featured ? "secondary" : "primary"}
                  className="w-full text-center"
                >
                  Get Started
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Book CTA */}
      <section id="book" className="py-24 lg:py-32 bg-tan/30">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <SectionHeading
            eyebrow="Ready to Move"
            title="Book Your Class"
            description="Online booking coming soon! In the meantime, give us a call or send us a message to reserve your spot."
          />
          <div className="bg-white p-10 lg:p-14 border border-tan/30 mt-8">
            <p className="text-brown mb-6">
              Booking widget will go here once you&apos;ve chosen a platform
              (Mindbody, Vagaro, Acuity, etc.)
            </p>
            <Button href="/contact">Contact Us to Book</Button>
          </div>
        </div>
      </section>
    </>
  );
}
