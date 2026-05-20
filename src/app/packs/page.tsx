import Image from "next/image";
import Link from "next/link";
import MomencePacks from "@/components/MomencePacks";

export const metadata = {
  title: "Memberships, Packs & Pricing",
  description:
    "Mat memberships, apparatus packs, and founding member pricing at Boomerang Pilates — Durham, NC.",
};

export default function Packs() {
  return (
    <section className="pt-28 lg:pt-36 pb-20 lg:pb-28">
      {/* Hero */}
      <div className="max-w-6xl mx-auto px-6 mb-20 lg:mb-28">
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
              Memberships &amp; Pricing
            </p>
            <h1 className="font-serif text-5xl md:text-6xl font-light text-charcoal leading-tight mb-6">
              Make it a habit.
            </h1>
            <div className="w-12 h-px bg-accent mb-6" />
            <p className="text-base text-muted leading-relaxed mb-4">
              The people who get the most out of Pilates are the ones who keep
              showing up. Memberships are how the regulars do it — lock in a
              rhythm, save per class, and skip the checkout dance every time
              you come back.
            </p>
            <p className="text-base text-muted leading-relaxed">
              Mat by drop-in or membership. Founding rates lock in for life if
              you join before we open. (Looking for privates, duets, or trios?
              Pricing lives on the <a href="/privates" className="text-accent hover:text-accent/70 underline underline-offset-4 decoration-accent/40 hover:decoration-accent transition-colors">Privates page</a>.)
            </p>
          </div>
        </div>
      </div>

      {/* Mat pricing + founding perks live on /founding — this page is the buy path. */}
      <div className="bg-warm-white py-14 lg:py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-[10px] tracking-[0.4em] uppercase text-accent mb-3">
            Founding Member Pricing
          </p>
          <p className="text-muted text-sm leading-relaxed mb-5 max-w-xl mx-auto">
            25% off mat for life. 15 spots per tier. The full breakdown,
            perks, and fine print live on the founding member page.
          </p>
          <Link
            href="/founding"
            className="text-xs tracking-widest uppercase text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent transition-colors"
          >
            See Founding Details →
          </Link>
        </div>
      </div>

      {/* Live buy links — pulled from Momence so they always match what
          Emilie has published. Sits at the bottom as the actual buy path. */}
      <div className="bg-warm-white py-20 lg:py-24">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-xs tracking-widest uppercase text-accent mb-4">Ready when you are</p>
          <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal mb-3">
            Pick yours.
          </h2>
          <p className="text-muted text-sm mb-10 max-w-md mx-auto">
            Live pricing pulled from our booking system — tap any option to buy.
          </p>
          <MomencePacks />
        </div>
      </div>
    </section>
  );
}
