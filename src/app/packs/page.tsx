import Image from "next/image";
import MomencePacks from "@/components/MomencePacks";

export const metadata = {
  title: "Class Packs & Memberships",
  description:
    "Class packs and memberships at Boomerang Pilates — Durham, NC. Buy direct on Momence.",
};

export default function Packs() {
  return (
    <section className="pt-28 lg:pt-36 pb-20 lg:pb-28">
      {/* Hero: portrait photo gets its own vertical space, content sits beside it */}
      <div className="max-w-6xl mx-auto px-6 mb-16 lg:mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center">
          <div className="relative w-full aspect-[3/4] overflow-hidden order-1">
            <Image
              src="/nav-packs.jpg"
              alt="Class packs at Boomerang Pilates"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="order-2">
            <p className="text-[10px] tracking-[0.4em] uppercase text-accent mb-5">
              Class Packs &amp; Memberships
            </p>
            <h1 className="font-serif text-5xl md:text-6xl font-light text-charcoal leading-tight mb-6">
              Buy a pack.
            </h1>
            <div className="w-12 h-px bg-accent mb-6" />
            <p className="font-serif italic text-base md:text-lg text-charcoal/70">
              Class packs, memberships, and drop-in credits — everything sold
              direct through Momence.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 text-center">
        <MomencePacks />
      </div>
    </section>
  );
}
