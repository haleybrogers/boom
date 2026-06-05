import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import {
  MOMENCE_APPOINTMENTS_URL,
  MOMENCE_DEMO_URL,
  fetchMemberships,
  pairMatTiers,
  groupApparatus,
  findDropIn,
} from "@/lib/momence";
import { PRIVATES_BOOKABLE } from "@/lib/flags";

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
  // Tailwind object-position class — used to shift the visible crop
  // window inside the photo. E.g. "object-right" pushes the visible
  // portion to the right side of the image, cropping content from the
  // left. The apparatus photo uses this to drop the tower frame on the
  // left edge out of view.
  photoPosition?: string;
  // When set, renders a multi-price block (e.g. Trio $45 · Duet $65 ·
  // Private $110) with all dollar figures at the same serif size, instead
  // of the default "big startingPrice + small priceNote" pattern. Used on
  // the Privates / Duets / Trios card where there are three distinct
  // session formats that each have their own price.
  priceUnits?: Array<{ label: string; price: string }>;
  // Optional small clarifier line under a priceUnits block — e.g. "per
  // person · single sessions". Falls back to nothing when omitted.
  priceUnitsNote?: string;
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
    // Apparatus has scheduled group classes (Apparatus Foundations,
    // Intermediate Mixed, Reformer, Tower, Lengthen & Strengthen). Send
    // people to the live schedule to see what's on, not to /privates
    // which is gated on PRIVATES_BOOKABLE.
    link: "/schedule",
    linkLabel: "View Schedule",
    photoScale: "scale-[2.4]",
    photoPosition: "object-right",
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
    // Pre-launch: link out to /privates so the user sees the "Booking
    // opens soon" treatment in context with the pricing + duet/trio
    // explanation. Post-launch: switch to direct Momence link.
    link: PRIVATES_BOOKABLE ? MOMENCE_APPOINTMENTS_URL : "/privates",
    linkLabel: PRIVATES_BOOKABLE ? "Book a Session" : "Booking Opens Soon",
    external: PRIVATES_BOOKABLE,
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
  const trioSingle = apparatus.find((g) => g.category === "trio")?.single?.price;

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
      // Three drop-in prices in one block, all at the same serif size.
      // If any are missing from Momence, just skip that unit rather than
      // showing a placeholder; we still fall back to old startingPrice /
      // priceNote if NOTHING came through.
      const units: Array<{ label: string; price: string }> = [];
      if (trioSingle !== undefined) units.push({ label: "Trio", price: `$${trioSingle}` });
      if (duetSingle !== undefined) units.push({ label: "Duet", price: `$${duetSingle}` });
      if (privateSingle !== undefined) units.push({ label: "Private", price: `$${privateSingle}` });
      if (units.length > 0) {
        return {
          ...o,
          priceUnits: units,
          priceUnitsNote: "per person · single sessions",
          // Clear the legacy fields so the old render branch doesn't fire.
          startingPrice: "",
          priceNote: "",
        };
      }
      return o;
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
                className={`object-cover grayscale hover:grayscale-0 ${offering.photoScale || "scale-[1.15]"} ${offering.photoPosition || ""} transition-all duration-700 ease-in-out`}
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

              {/* Price block. Three modes:
                  1. priceUnits set → render every dollar amount at the
                     same serif size with its label inline (Privates card)
                  2. startingPrice set → big startingPrice + small note
                  3. neither → skip (Apparatus card) */}
              {offering.priceUnits && offering.priceUnits.length > 0 ? (
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
                    {offering.priceUnits.map((u) => (
                      <div key={u.label}>
                        <span className="font-serif text-2xl font-light text-charcoal">
                          {u.price}
                        </span>
                        <span className="text-sm text-muted ml-1.5">{u.label}</span>
                      </div>
                    ))}
                  </div>
                  {offering.priceUnitsNote && (
                    <p className="text-xs text-muted mt-1.5">
                      {offering.priceUnitsNote}
                    </p>
                  )}
                </div>
              ) : offering.startingPrice ? (
                <div className="flex items-center gap-6">
                  <div>
                    <span className="font-serif text-2xl font-light text-charcoal">
                      {offering.startingPrice}
                    </span>
                    <span className="text-sm text-muted ml-2">{offering.priceNote}</span>
                  </div>
                </div>
              ) : null}
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

              {/* Free apparatus demo — tucked under the Apparatus
                  card's primary CTA so it lives inside the text column
                  (preserving the alternating photo/text zigzag) rather
                  than as a full-width band that breaks the rhythm. */}
              {offering.title === "Apparatus" && (
                <a
                  href={MOMENCE_DEMO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-3 text-sm text-muted hover:text-accent transition-colors"
                >
                  Or book a free apparatus demo{" "}
                  <span className="text-accent">→</span>
                </a>
              )}
            </Reveal>
          </div>
        );
      })}
    </div>
  );
}
