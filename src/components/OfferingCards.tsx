import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import {
  MOMENCE_APPOINTMENTS_URL,
  fetchMemberships,
  pairMatTiers,
  groupApparatus,
  findDropIn,
} from "@/lib/momence";

type Offering = {
  title: string;
  image: string;
  tagline: string;
  description: string;
  classes: Array<{ name: string; section: number }>;
  startingPrice: string;
  priceNote: string;
  link: string;
  linkLabel: string;
  external?: boolean;
  photoScale?: string;
};

// Offering definitions. `startingPrice` + `priceNote` are placeholders ,
// they get overridden at runtime with live Momence pricing so the home
// page reflects whatever Emilie has set in the booking system.
const offerings: Offering[] = [
  {
    title: "Mat Classes",
    image: "/photo-mat-2.jpg",
    tagline: "The foundation of everything we do.",
    description:
      "Full-body workouts rooted in the original Return to Life matwork. Layered, progressive, and built around all six principles of the method. Modifications for newer students, advancements for those deeper in their practice.",
    classes: [],
    startingPrice: "$25",
    priceNote: "drop-in · memberships from $150/mo",
    link: "/schedule",
    linkLabel: "View Schedule",
  },
  {
    title: "Apparatus",
    image: "/photo-apparatus.jpg",
    tagline: "Real equipment. Real instruction. Three students max.",
    description:
      "Reformer, tower, barrels, Wunda chair, and Ped-O-Pul. The classical equipment that builds your practice and transforms how your body moves. Every class is capped at three so you get hands-on corrections, not just cues from across the room.",
    classes: [],
    startingPrice: "",
    priceNote: "",
    link: "/privates",
    linkLabel: "Book a Session",
    photoScale: "scale-[1.35]",
  },
  {
    title: "Privates, Duets & Trios",
    image: "/photo-private.jpg",
    tagline: "Fully customized. Your body, your goals, your pace.",
    description:
      "One-on-one, with a partner, or as a trio. Full apparatus access tailored entirely to you. Whether you're rehabbing, training for something specific, or just prefer individual attention, this is the fastest path to results.",
    classes: [],
    startingPrice: "$60",
    priceNote: "duets per person · privates $110",
    link: MOMENCE_APPOINTMENTS_URL,
    linkLabel: "Book a Session",
    external: true,
  },
];

export default async function OfferingCards() {
  // Pull live pricing once for the whole grid. Falls back to the hardcoded
  // startingPrice/priceNote above if Momence is unreachable.
  const memberships = await fetchMemberships();
  const dropIn = findDropIn(memberships);
  const tiers = pairMatTiers(memberships);
  const apparatus = groupApparatus(memberships);

  const lowestMatTier = tiers
    .map((t) => t.regular?.price)
    .filter((p): p is number => p !== undefined)
    .sort((a, b) => a - b)[0];

  const duetSingle = apparatus.find((g) => g.category === "duet")?.single?.price;
  const privateSingle = apparatus.find((g) => g.category === "private")?.single?.price;

  // Build the live-priced offerings array. Apparatus card intentionally
  // hides pricing. Its CTA is generic "Book a Session" → /privates.
  const live = offerings.map((o) => {
    if (o.title === "Mat Classes" && dropIn?.price !== undefined) {
      return {
        ...o,
        startingPrice: `$${dropIn.price}`,
        priceNote: lowestMatTier
          ? `drop-in · memberships from $${lowestMatTier}/mo`
          : o.priceNote,
      };
    }
    if (o.title === "Privates, Duets & Trios") {
      const sp = duetSingle !== undefined ? `$${duetSingle}` : o.startingPrice;
      const note =
        duetSingle !== undefined && privateSingle !== undefined
          ? `duets per person · privates $${privateSingle}`
          : o.priceNote;
      return { ...o, startingPrice: sp, priceNote: note };
    }
    return o;
  });

  return (
    <div className="space-y-20 md:space-y-28">
      {live.map((offering, i) => {
        const reversed = i % 2 !== 0;

        return (
          <div
            key={offering.title}
            className={`flex flex-col ${reversed ? "md:flex-row-reverse" : "md:flex-row"} gap-8 md:gap-12 items-center`}
          >
            {/* Photo */}
            <Reveal className="relative w-full md:w-1/2 aspect-[4/3] overflow-hidden">
              <Image
                src={offering.image}
                alt={offering.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={`object-cover grayscale hover:grayscale-0 ${offering.photoScale || "scale-[1.15]"} transition-all duration-700 ease-in-out`}
              />
            </Reveal>

            {/* Text */}
            <Reveal delay={150} className="w-full md:w-1/2">
              <h3 className="font-serif text-3xl md:text-4xl font-light text-charcoal mb-2">
                {offering.title}
              </h3>
              <p className="text-accent text-sm tracking-wide mb-4">
                {offering.tagline}
              </p>
              <p className="text-muted text-base leading-relaxed mb-6">
                {offering.description}
              </p>

              {/* Clickable class tags. /schedule hard-navs (Momence plugin
                  state survives soft nav); offerings marked `external` open
                  Momence in a new tab; everything else is a Next Link. */}
              {offering.classes.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {offering.classes.map((cls) => (
                    offering.external ? (
                      <a
                        key={cls.name}
                        href={offering.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm tracking-wide text-charcoal/70 bg-cream px-3 py-1.5 hover:bg-accent/10 hover:text-accent transition-all duration-200 cursor-pointer"
                      >
                        {cls.name}
                      </a>
                    ) : offering.link === "/schedule" ? (
                      <a
                        key={cls.name}
                        href={offering.link}
                        className="text-sm tracking-wide text-charcoal/70 bg-cream px-3 py-1.5 hover:bg-accent/10 hover:text-accent transition-all duration-200 cursor-pointer"
                      >
                        {cls.name}
                      </a>
                    ) : (
                      <Link
                        key={cls.name}
                        href={offering.link}
                        className="text-sm tracking-wide text-charcoal/70 bg-cream px-3 py-1.5 hover:bg-accent/10 hover:text-accent transition-all duration-200 cursor-pointer"
                      >
                        {cls.name}
                      </Link>
                    )
                  ))}
                </div>
              )}

              {/* Price + CTA. Skip price block when blank (Apparatus card) */}
              {offering.startingPrice && (
                <div className="flex items-center gap-6">
                  <div>
                    <span className="font-serif text-2xl font-light text-charcoal">
                      {offering.startingPrice}
                    </span>
                    <span className="text-sm text-muted ml-2">{offering.priceNote}</span>
                  </div>
                </div>
              )}
              {offering.external ? (
                <a
                  href={offering.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-arrow inline-block mt-4 text-sm tracking-widest uppercase text-accent hover:text-accent/80 transition-colors"
                >
                  {offering.linkLabel}
                </a>
              ) : offering.link === "/schedule" ? (
                <a
                  href={offering.link}
                  className="link-arrow inline-block mt-4 text-sm tracking-widest uppercase text-accent hover:text-accent/80 transition-colors"
                >
                  {offering.linkLabel}
                </a>
              ) : (
                <Link
                  href={offering.link}
                  className="link-arrow inline-block mt-4 text-sm tracking-widest uppercase text-accent hover:text-accent/80 transition-colors"
                >
                  {offering.linkLabel}
                </Link>
              )}
            </Reveal>
          </div>
        );
      })}
    </div>
  );
}
