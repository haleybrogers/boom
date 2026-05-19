import Image from "next/image";

export const metadata = {
  title: "Privates & Duets",
  description:
    "One-on-one and duet classical Pilates sessions in Durham, NC. Fully customized apparatus work with Emilie and Annie Young.",
};

// Booking goes through Momence's per-host appointments URL —
// momence.com/appointments/{id} 302-redirects to the slug-based
// reservation page so we don't have to hard-code the slug.
const MOMENCE_APPOINTMENTS_URL = `https://momence.com/appointments/${process.env.NEXT_PUBLIC_MOMENCE_HOST_ID || "270195"}`;

export default function Privates() {
  return (
    <section className="pt-28 lg:pt-36 pb-20 lg:pb-28 bg-warm-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center">
          {/* Photo on the left */}
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

          {/* Everything else on the right — heading, intro, duration, CTA */}
          <div>
            <p className="text-[10px] tracking-[0.4em] uppercase text-accent mb-5">
              By Appointment
            </p>
            <h1 className="font-serif text-5xl md:text-6xl font-light text-charcoal leading-tight mb-6">
              Privates &amp; duets.
            </h1>
            <div className="w-12 h-px bg-accent mb-6" />
            <p className="text-muted text-base leading-relaxed mb-6">
              The most personalized Pilates experience we offer. Your
              instructor builds every session around your body, your goals,
              and where you are in your practice — using the full range of
              classical apparatus.
            </p>

            <div className="flex gap-8 mb-8">
              <div>
                <p className="text-xs text-muted">Private · 50 min</p>
                <p className="text-[11px] text-muted/60 mt-0.5">1 student · Full apparatus</p>
              </div>
              <div className="w-px bg-charcoal/10" />
              <div>
                <p className="text-xs text-muted">Duet · 50 min</p>
                <p className="text-[11px] text-muted/60 mt-0.5">2 students · Full apparatus</p>
              </div>
            </div>

            <a
              href={MOMENCE_APPOINTMENTS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-animated inline-block bg-accent text-white text-xs tracking-widest uppercase px-8 py-3.5 hover:bg-accent/90 transition-colors"
            >
              Book a Private
            </a>
            <p className="text-[11px] text-muted/70 mt-3">
              Opens in a new tab.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
