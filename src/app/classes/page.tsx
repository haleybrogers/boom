import Button from "@/components/Button";

const classes = [
  {
    title: "Mat Pilates",
    level: "All Levels",
    duration: "55 min",
    description: "A full-body mat class building core strength, posture, and flexibility using your own body weight.",
  },
  {
    title: "Reformer Flow",
    level: "Intermediate",
    duration: "50 min",
    description: "Spring-loaded resistance training on the reformer. Sculpts lean muscle and improves coordination.",
  },
  {
    title: "Gentle Restore",
    level: "Beginner",
    duration: "45 min",
    description: "Slow, mindful movement focused on mobility, breath, and gentle strengthening.",
  },
  {
    title: "Power Reformer",
    level: "Advanced",
    duration: "55 min",
    description: "High-intensity reformer work pushing strength and endurance to new levels.",
  },
  {
    title: "Prenatal Pilates",
    level: "All Levels",
    duration: "45 min",
    description: "Safe, supportive exercises for expectant mothers. Maintain strength and ease discomfort.",
  },
  {
    title: "Private Session",
    level: "All Levels",
    duration: "55 min",
    description: "One-on-one instruction on any apparatus, tailored entirely to you.",
  },
];

const schedule = [
  { time: "6:00 AM", mon: "Mat", tue: "Reformer", wed: "Mat", thu: "Power", fri: "Mat", sat: "Reformer" },
  { time: "8:00 AM", mon: "Gentle", tue: "Mat", wed: "Reformer", thu: "Mat", fri: "Gentle", sat: "Mat" },
  { time: "10:00 AM", mon: "Reformer", tue: "Prenatal", wed: "Mat", thu: "Reformer", fri: "Prenatal", sat: "Gentle" },
  { time: "12:00 PM", mon: "Power", tue: "\u2014", wed: "Mat", thu: "\u2014", fri: "Power", sat: "\u2014" },
  { time: "5:30 PM", mon: "Reformer", tue: "Power", wed: "Reformer", thu: "Mat", fri: "\u2014", sat: "\u2014" },
  { time: "7:00 PM", mon: "Mat", tue: "Gentle", wed: "Mat", thu: "Mat", fri: "\u2014", sat: "\u2014" },
];

export default function Classes() {
  return (
    <>
      {/* Hero */}
      <section className="py-24 lg:py-32">
        <div className="max-w-xl mx-auto px-6 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-light text-charcoal mb-6">
            Classes
          </h1>
          <p className="text-muted leading-relaxed">
            From gentle mat work to advanced reformer sessions. Find the class
            that meets you where you are.
          </p>
        </div>
      </section>

      {/* Class list */}
      <section className="pb-24 lg:pb-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="divide-y divide-charcoal/10 border-y border-charcoal/10">
            {classes.map((cls) => (
              <div key={cls.title} className="py-8 md:py-10 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-start">
                <div>
                  <div className="flex items-baseline gap-3 mb-2">
                    <h3 className="font-serif text-2xl font-light text-charcoal">
                      {cls.title}
                    </h3>
                    <span className="text-xs tracking-widest uppercase text-muted">
                      {cls.level}
                    </span>
                  </div>
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
      <section id="schedule" className="py-24 lg:py-32 bg-warm-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-serif text-3xl font-light text-charcoal mb-12 text-center">
            Weekly Schedule
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-charcoal/10">
                  <th className="pb-3 text-left text-xs tracking-widest uppercase text-muted font-medium">Time</th>
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <th key={day} className="pb-3 text-left text-xs tracking-widest uppercase text-muted font-medium">{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {schedule.map((row) => (
                  <tr key={row.time} className="border-b border-charcoal/5">
                    <td className="py-3 text-sm font-medium text-charcoal">{row.time}</td>
                    <td className="py-3 text-sm text-muted">{row.mon}</td>
                    <td className="py-3 text-sm text-muted">{row.tue}</td>
                    <td className="py-3 text-sm text-muted">{row.wed}</td>
                    <td className="py-3 text-sm text-muted">{row.thu}</td>
                    <td className="py-3 text-sm text-muted">{row.fri}</td>
                    <td className="py-3 text-sm text-muted">{row.sat}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-3xl font-light text-charcoal mb-12 text-center">
            Pricing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-charcoal/10 border border-charcoal/10">
            {[
              { name: "Drop-In", price: "$30", per: "per class", features: ["Any single class", "No commitment"] },
              { name: "10-Pack", price: "$250", per: "10 classes", features: ["Save $50", "Use anytime"], featured: true },
              { name: "Unlimited", price: "$175", per: "per month", features: ["Unlimited classes", "Priority booking"] },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`p-10 text-center rounded-sm ${plan.featured ? "bg-accent text-white" : "bg-warm-white"}`}
              >
                <p className={`text-xs tracking-widest uppercase mb-4 ${plan.featured ? "text-white/60" : "text-muted"}`}>
                  {plan.name}
                </p>
                <p className="font-serif text-4xl font-light mb-1">{plan.price}</p>
                <p className={`text-sm mb-6 ${plan.featured ? "text-white/60" : "text-muted"}`}>{plan.per}</p>
                <ul className="space-y-2 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className={`text-sm ${plan.featured ? "text-white/80" : "text-muted"}`}>{f}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Book */}
      <section id="book" className="py-24 lg:py-32 bg-warm-white">
        <div className="max-w-xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl font-light text-charcoal mb-4">
            Book a Class
          </h2>
          <p className="text-muted text-sm mb-8">
            Online booking coming soon. In the meantime, reach out to reserve
            your spot.
          </p>
          <Button href="/contact">Contact Us</Button>
        </div>
      </section>
    </>
  );
}
