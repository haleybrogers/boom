import Image from "next/image";
import Link from "next/link";

const offerings = [
  {
    title: "Mat Classes",
    image: "/photo-mat-2.jpg",
    tagline: "The foundation of everything we do.",
    description:
      "Full-body workouts rooted in the original Return to Life matwork — layered, progressive, and built around all six principles of the method. Modifications for newer students, advancements for those deeper in their practice.",
    classes: [
      { name: "Open Level Classical Mat", section: 0 },
      { name: "Return to Life Full 34", section: 0 },
      { name: "RTL Course I & II", section: 0 },
      { name: "Lunch Power Hour", section: 0 },
    ],
    startingPrice: "$25",
    priceNote: "drop-in · memberships from $150/mo",
    link: "/classes",
    linkLabel: "View Schedule",
  },
  {
    title: "Apparatus",
    image: "/photo-apparatus.jpg",
    tagline: "Real equipment. Real instruction. Three students max.",
    description:
      "Reformer, tower, barrels, chair — the classical equipment that builds your practice and transforms how your body moves. Every class is capped at three so you get hands-on corrections, not just cues from across the room.",
    classes: [
      { name: "Apparatus Foundations", section: 1 },
      { name: "Intermediate Mixed Apparatus", section: 1 },
      { name: "Athletic Reformer", section: 1 },
      { name: "Athletic Tower", section: 1 },
      { name: "Lengthen & Strengthen Tower", section: 1 },
    ],
    startingPrice: "$45",
    priceNote: "per class · memberships from $120/mo",
    link: "/classes",
    linkLabel: "View Schedule",
  },
  {
    title: "Privates & Duets",
    image: "/photo-private.jpg",
    tagline: "Fully customized. Your body, your goals, your pace.",
    description:
      "One-on-one or with a partner — full apparatus access tailored entirely to you. Whether you're rehabbing, training for something specific, or just prefer individual attention, this is the fastest path to results.",
    classes: [
      { name: "Private Sessions", section: 2 },
      { name: "Duet Sessions", section: 2 },
    ],
    startingPrice: "$60",
    priceNote: "duets per person · privates $110",
    link: "/classes#privates",
    linkLabel: "Book a Private",
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
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-in-out"
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

              {/* Clickable class tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {offering.classes.map((cls) => (
                  <Link
                    key={cls.name}
                    href="/classes"
                    className="text-xs tracking-wide text-charcoal/70 bg-cream px-3 py-1.5 hover:bg-accent/10 hover:text-accent transition-all duration-200 cursor-pointer"
                  >
                    {cls.name}
                  </Link>
                ))}
              </div>

              {/* Price + CTA */}
              <div className="flex items-center gap-6">
                <div>
                  <span className="font-serif text-2xl font-light text-charcoal">
                    {offering.startingPrice}
                  </span>
                  <span className="text-xs text-muted ml-2">{offering.priceNote}</span>
                </div>
              </div>
              <Link
                href={offering.link}
                className="link-arrow inline-block mt-4 text-xs tracking-widest uppercase text-accent hover:text-accent/80 transition-colors"
              >
                {offering.linkLabel}
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
