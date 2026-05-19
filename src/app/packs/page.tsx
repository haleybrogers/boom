import Image from "next/image";
import MomencePacks from "@/components/MomencePacks";

export const metadata = {
  title: "Class Packs & Memberships",
  description:
    "Class packs, memberships, and drop-in credits at Boomerang Pilates — Durham, NC. Make the practice a habit.",
};

export default function Packs() {
  return (
    <section className="pt-28 lg:pt-36 pb-20 lg:pb-28">
      {/* Hero: portrait photo on the left, intro on the right */}
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
              Make it a habit.
            </h1>
            <div className="w-12 h-px bg-accent mb-6" />
            <p className="text-base text-muted leading-relaxed mb-4">
              The people who get the most out of Pilates are the ones who keep
              showing up. Packs and memberships are how the regulars do it —
              lock in a rhythm, save per class, and skip the checkout dance
              every time you come back.
            </p>
            <p className="text-base text-muted leading-relaxed">
              The more you commit, the less each class costs. The more often
              you come, the more the method gives back. This is the room we&apos;re
              building — see you in it.
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
