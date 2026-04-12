import Image from "next/image";
import Link from "next/link";

const offerings = [
  {
    title: "Mat Classes",
    image: "/photo-chair.jpg",
    tagline: "The class that started it all.",
    description:
      "Full-body workouts rooted in the original Return to Life matwork — layered, progressive, and built around all six principles of the method. Modifications for newer students, advancements for those deeper in their practice. 50 minutes, 15 spots.",
    classes: ["Open Level Classical Mat", "Return to Life Full 34", "RTL Course I & II", "Lunch Power Hour"],
    price: "$25 drop-in",
  },
  {
    title: "Apparatus",
    image: "/photo-reformer.jpg",
    tagline: "Real equipment. Real instruction. Three students max.",
    description:
      "Reformer, tower, barrels, chair — the classical equipment that builds your practice and transforms how your body moves. Every class is capped at three so you get hands-on corrections, not just cues from across the room.",
    classes: ["Apparatus Foundations", "Intermediate Mixed Apparatus", "Athletic Reformer", "Athletic Tower", "Lengthen & Strengthen Tower"],
    price: "$45 per class",
  },
  {
    title: "Privates & Duets",
    image: "/photo-leg.jpg",
    tagline: "Fully customized. Your body, your goals, your pace.",
    description:
      "One-on-one or with a partner — full apparatus access tailored entirely to you. Whether you're rehabbing, training for something specific, or just prefer individual attention, this is the fastest path to results.",
    classes: ["Private Sessions", "Duet Sessions"],
    price: "Privates $110 · Duets $60/person",
  },
];

export default function OfferingCards() {
  return (
    <div className="space-y-20 md:space-y-28">
      {offerings.map((offering, i) => {
        const reversed = i % 2 !== 0;

        return (
          <div
            key={offering.title}
            className={`flex flex-col ${reversed ? "md:flex-row-reverse" : "md:flex-row"} gap-8 md:gap-12 items-center`}
          >
            {/* Photo */}
            <div className="relative w-full md:w-1/2 aspect-[4/3] overflow-hidden">
              <Image
                src={offering.image}
                alt={offering.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Text */}
            <div className="w-full md:w-1/2">
              <h3 className="font-serif text-3xl md:text-4xl font-light text-charcoal mb-2">
                {offering.title}
              </h3>
              <p className="text-accent text-sm tracking-wide mb-4">
                {offering.tagline}
              </p>
              <p className="text-muted text-base leading-relaxed mb-6">
                {offering.description}
              </p>

              {/* Class tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {offering.classes.map((cls) => (
                  <span
                    key={cls}
                    className="text-xs tracking-wide text-charcoal/70 bg-cream px-3 py-1.5"
                  >
                    {cls}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-6">
                <span className="text-sm text-muted">{offering.price}</span>
                <Link
                  href="/classes"
                  className="text-xs tracking-widest uppercase text-accent hover:text-accent/80 transition-colors"
                >
                  View Schedule &rarr;
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
