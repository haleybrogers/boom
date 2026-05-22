import Image from "next/image";
import PackPickerModal from "@/components/PackPickerModal";
import {
  fetchMemberships,
  groupApparatus,
  MOMENCE_APPOINTMENTS_URL,
} from "@/lib/momence";
import { PRIVATES_BOOKABLE } from "@/lib/flags";

export const metadata = {
  title: "Privates, Duets & Trios",
  description:
    "One-on-one, duet, and trio classical Pilates sessions in Durham, NC. Fully customized apparatus work with Emilie and Annie Young.",
};

export default async function Privates() {
  const memberships = await fetchMemberships();
  const apparatus = groupApparatus(memberships);

  return (
    <>
      {/* Hero. Photo left, intro + CTAs right */}
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
              <p className="text-[11px] tracking-[0.4em] uppercase text-accent mb-5">
                By Appointment
              </p>
              <h1 className="font-serif text-5xl md:text-6xl font-light text-charcoal leading-tight mb-6">
                Privates, duets &amp; trios.
              </h1>
              <div className="w-12 h-px bg-accent mb-6" />
              <p className="text-muted text-base leading-relaxed mb-5">
                The most personalized Pilates experience we offer. Your
                instructor builds every session around your body, your goals,
                and where you are in your practice, using the full range of
                classical apparatus.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8">
                <div>
                  <p className="text-sm text-charcoal font-medium">Private</p>
                  <p className="text-sm text-muted mt-0.5">1 student · 50 min</p>
                </div>
                <div className="sm:border-l sm:border-charcoal/10 sm:pl-4">
                  <p className="text-sm text-charcoal font-medium">Duet</p>
                  <p className="text-sm text-muted mt-0.5">2 students · 50 min</p>
                </div>
                <div className="sm:border-l sm:border-charcoal/10 sm:pl-4">
                  <p className="text-sm text-charcoal font-medium">Trio</p>
                  <p className="text-sm text-muted mt-0.5">3 students · 50 min</p>
                </div>
              </div>

              {PRIVATES_BOOKABLE ? (
                <>
                  <a
                    href={MOMENCE_APPOINTMENTS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-animated inline-block bg-accent text-white text-sm tracking-widest uppercase px-8 py-3.5 hover:bg-accent/90 transition-colors"
                  >
                    Book a Session
                  </a>
                  <p className="text-sm text-muted mt-3">
                    Privates, duets, and trios all bookable here. Opens in a new tab.
                  </p>
                </>
              ) : (
                <>
                  <span
                    className="inline-block bg-cream border border-accent/30 text-accent text-sm tracking-widest uppercase px-8 py-3.5 cursor-default select-none"
                    aria-disabled="true"
                  >
                    Booking Opens Soon
                  </span>
                  <p className="text-sm text-muted mt-3">
                    Privates, duets, and trios open for booking when the
                    studio doors do. Email{" "}
                    <a
                      href="mailto:hello@boomerangpilatesnc.com"
                      className="text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent transition-colors"
                    >
                      hello@boomerangpilatesnc.com
                    </a>{" "}
                    if you want first dibs.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Apparatus pricing. Single / 5-pack / 10-pack, pulled live from Momence */}
      <section className="py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-sm tracking-widest uppercase text-accent mb-4">By Session or Pack</p>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal mb-4">
              Pricing.
            </h2>
            <p className="text-muted text-base leading-relaxed max-w-xl mx-auto">
              Single sessions or packs of 5 or 10. All packs expire 6 months after purchase.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {apparatus.map((g) => {
              const hasAny = g.single || g.five || g.ten;
              if (!hasAny) return null;
              return (
                <div
                  key={g.category}
                  className="flex flex-col bg-white border border-charcoal/10 rounded-sm p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <h3 className="font-serif text-xl font-light text-charcoal mb-1">{g.label}</h3>
                  <p className="text-sm text-muted mb-5">{g.note}</p>

                  <div className="space-y-3 border-t border-charcoal/5 pt-4">
                    {g.single?.price !== undefined && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted">Single</span>
                        <span className="text-charcoal font-medium">${g.single.price}</span>
                      </div>
                    )}
                    {g.five?.price !== undefined && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted">5-pack</span>
                        <span className="text-charcoal font-medium">${g.five.price}</span>
                      </div>
                    )}
                    {g.ten?.price !== undefined && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted">10-pack</span>
                        <span className="text-charcoal font-medium">${g.ten.price}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <PackPickerModal buttonLabel="Buy a Pack" groups={apparatus} />
          </div>
        </div>
      </section>
    </>
  );
}
