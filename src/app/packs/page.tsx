import Image from "next/image";
import MomencePacks from "@/components/MomencePacks";

export const metadata = {
  title: "Memberships, Packs & Pricing",
  description:
    "Mat memberships, apparatus packs, and founding member pricing at Boomerang Pilates — Durham, NC.",
};

// All mat memberships are 3-month commitment with max 4 classes rolling over
// monthly. Founding rate is 25% off and applies to mat classes only.
const matMemberships = [
  {
    name: "4× Month Mat",
    tagline: "Twice a week-ish",
    founding: 60,
    regular: 80,
  },
  {
    name: "8× Month Mat",
    tagline: "The sweet spot",
    founding: 110,
    regular: 150,
    featured: true,
  },
  {
    name: "Unlimited Mat",
    tagline: "All the mat, all the time",
    founding: 149,
    regular: 199,
  },
];

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

      {/* Mat Memberships */}
      <div className="bg-warm-white py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs tracking-widest uppercase text-accent mb-4">Mat · By Membership or Drop-in</p>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal mb-4">
              Mat memberships.
            </h2>
            <p className="text-muted text-base leading-relaxed max-w-xl mx-auto">
              Three-month commitment. Max four unused classes roll over each month.
              Founding rate is 25% off the regular membership — and it&apos;s yours for
              life as long as your membership stays active.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {matMemberships.map((m) => (
              <div
                key={m.name}
                className={`flex flex-col bg-white rounded-sm p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
                  m.featured
                    ? "border-2 border-accent/50 shadow-sm"
                    : "border border-charcoal/10"
                }`}
              >
                {m.featured && (
                  <p className="text-[10px] tracking-[0.25em] uppercase text-accent mb-3">
                    Most popular
                  </p>
                )}
                <h3 className="font-serif text-xl font-light text-charcoal mb-1">{m.name}</h3>
                <p className="text-xs text-muted mb-5">{m.tagline}</p>

                <div className="border-t border-charcoal/5 pt-4 mb-3">
                  <p className="text-[10px] tracking-widest uppercase text-accent mb-1">Founding</p>
                  <p className="font-serif text-3xl font-light text-charcoal">
                    ${m.founding}
                    <span className="text-sm text-muted font-sans">/mo</span>
                  </p>
                </div>

                <div className="pt-2">
                  <p className="text-[10px] tracking-widest uppercase text-muted mb-1">Regular</p>
                  <p className="font-serif text-lg font-light text-muted">
                    ${m.regular}
                    <span className="text-xs text-muted/70 font-sans">/mo</span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-muted">
            Prefer to drop in? Single mat class · <span className="text-charcoal font-medium">$25</span>
          </p>
        </div>
      </div>

      {/* Founding Member Perks */}
      <div className="py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-6">
          <div className="border border-accent/20 bg-accent/5 rounded-sm px-8 md:px-12 py-10 md:py-12">
            <div className="text-center mb-8">
              <p className="text-[10px] tracking-[0.4em] uppercase text-accent mb-4">Founding Members</p>
              <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal mb-3">
                A few things just for the first ones in.
              </h2>
              <p className="text-sm text-muted max-w-md mx-auto">
                15 founding spots at each tier. Once they&apos;re gone, they&apos;re gone.
              </p>
            </div>

            <ul className="space-y-4 max-w-md mx-auto text-sm text-charcoal">
              <li className="flex gap-3">
                <span className="text-accent">·</span>
                <span>Invite to the Opening Night Party</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent">·</span>
                <span>Welcome Kit — cute tee, grip socks, and a sticker</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent">·</span>
                <span>Private apparatus intro bundle — 3 introductory privates for $180</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent">·</span>
                <span>Bring-a-friend pass — bring a friend to mat 1×/month for your first 3 months</span>
              </li>
            </ul>
          </div>
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
