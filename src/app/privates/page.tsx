import Image from "next/image";

export const metadata = {
  title: "Privates, Duets & Trios",
  description:
    "One-on-one, duet, and trio classical Pilates sessions in Durham, NC. Fully customized apparatus work with Emilie and Annie Young.",
};

// Booking goes through Momence's per-host appointments URL —
// momence.com/appointments/{id} 302-redirects to the slug-based
// reservation page so we don't have to hard-code the slug.
const MOMENCE_APPOINTMENTS_URL = `https://momence.com/appointments/${process.env.NEXT_PUBLIC_MOMENCE_HOST_ID || "270195"}`;

// Apparatus pricing — all packs expire 6 months after purchase.
const apparatusPricing = [
  {
    label: "Privates",
    note: "1 student · Full apparatus",
    single: 110,
    five: 525,
    ten: 995,
  },
  {
    label: "Duets",
    note: "2 students · Full apparatus",
    single: 65,
    five: 300,
    ten: 585,
  },
  {
    label: "Trios",
    note: "3 students · Full apparatus",
    single: 45,
    five: 200,
    ten: 375,
  },
];

export default function Privates() {
  return (
    <>
      {/* Hero — photo left, intro + CTAs right */}
      <section className="pt-28 lg:pt-36 pb-20 lg:pb-24 bg-warm-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center">
            <div className="relative w-full aspect-[3/4] overflow-hidden">
              <Image
                src="/nav-privates.jpg"
                alt="Private Pilates session at Boomerang"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            <div>
              <p className="text-[10px] tracking-[0.4em] uppercase text-accent mb-5">
                By Appointment
              </p>
              <h1 className="font-serif text-5xl md:text-6xl font-light text-charcoal leading-tight mb-6">
                Privates, duets &amp; trios.
              </h1>
              <div className="w-12 h-px bg-accent mb-6" />
              <p className="text-muted text-base leading-relaxed mb-8">
                The most personalized Pilates experience we offer. Your
                instructor builds every session around your body, your goals,
                and where you are in your practice — using the full range of
                classical apparatus.
              </p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div>
                  <p className="text-xs text-charcoal font-medium">Private</p>
                  <p className="text-[11px] text-muted/70 mt-0.5">1 student · 50 min</p>
                </div>
                <div className="border-l border-charcoal/10 pl-4">
                  <p className="text-xs text-charcoal font-medium">Duet</p>
                  <p className="text-[11px] text-muted/70 mt-0.5">2 students · 50 min</p>
                </div>
                <div className="border-l border-charcoal/10 pl-4">
                  <p className="text-xs text-charcoal font-medium">Trio</p>
                  <p className="text-[11px] text-muted/70 mt-0.5">3 students · 50 min</p>
                </div>
              </div>

              <a
                href={MOMENCE_APPOINTMENTS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-animated inline-block bg-accent text-white text-xs tracking-widest uppercase px-8 py-3.5 hover:bg-accent/90 transition-colors"
              >
                Book a Session
              </a>
              <p className="text-[11px] text-muted/70 mt-3">
                Privates, duets, and trios all bookable here. Opens in a new tab.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Apparatus pricing — Single / 5-pack / 10-pack for all three formats */}
      <section className="py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs tracking-widest uppercase text-accent mb-4">By Session or Pack</p>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal mb-4">
              Pricing.
            </h2>
            <p className="text-muted text-base leading-relaxed max-w-xl mx-auto">
              Single sessions or packs of 5 or 10 — all packs expire 6 months after purchase.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {apparatusPricing.map((p) => (
              <div
                key={p.label}
                className="flex flex-col bg-white border border-charcoal/10 rounded-sm p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <h3 className="font-serif text-xl font-light text-charcoal mb-1">{p.label}</h3>
                <p className="text-xs text-muted mb-5">{p.note}</p>

                <div className="space-y-3 border-t border-charcoal/5 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Single</span>
                    <span className="text-charcoal font-medium">${p.single}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">5-pack</span>
                    <span className="text-charcoal font-medium">${p.five}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">10-pack</span>
                    <span className="text-charcoal font-medium">${p.ten}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-muted/80 italic mt-8">
            Founding Members: 3-pack of introductory privates available for $180.
          </p>

          <div className="text-center mt-10">
            <a
              href={`https://momence.com/host/${process.env.NEXT_PUBLIC_MOMENCE_HOST_ID || "270195"}/memberships`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-animated inline-block bg-accent text-white text-xs tracking-widest uppercase px-8 py-3.5 hover:bg-accent/90 transition-colors"
            >
              Buy a Privates Pack
            </a>
            <p className="text-[11px] text-muted/70 mt-3">
              Single sessions still book through Book a Session above. Opens in a new tab.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
