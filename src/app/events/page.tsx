import EventsCalendar from "@/components/EventsCalendar";
import ContactFormModal from "@/components/ContactFormModal";

export const metadata = {
  title: "Workshops + Events",
  description:
    "Workshops, course series, pop-up classes, and community events at Boomerang Pilates in Durham, NC.",
};

export default function Events() {
  return (
    <>
      {/* Page header */}
      <section className="relative overflow-hidden bg-warm-white pt-28 lg:pt-36 pb-16 lg:pb-20">
        <div className="relative max-w-2xl mx-auto px-6 text-center">
          <p
            className="text-[10px] tracking-[0.4em] uppercase text-accent mb-5 animate-fade-up"
            style={{ animationDelay: "0.05s" }}
          >
            What&apos;s Coming Up
          </p>
          <h1
            className="font-serif text-5xl md:text-6xl font-light text-charcoal leading-tight animate-fade-up"
            style={{ animationDelay: "0.15s" }}
          >
            Workshops <span className="text-accent">+</span> Events
          </h1>
          <div
            className="w-12 h-px bg-accent mx-auto mt-8 mb-6 animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          />
          <p
            className="font-serif italic text-base md:text-lg text-charcoal/70 max-w-md mx-auto animate-fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            Pop-ups around town, opening-night plans, and the things worth showing up for.
          </p>
          <p
            className="text-sm text-muted/80 mt-6 max-w-md mx-auto animate-fade-up"
            style={{ animationDelay: "0.55s" }}
          >
            Tap any event for full details and to RSVP or book.
          </p>
        </div>
      </section>

      {/* Unified calendar — featured row + agenda + modal */}
      <section className="pt-14 lg:pt-20 pb-24 lg:pb-32">
        <div className="max-w-6xl mx-auto px-6">
          <EventsCalendar />
        </div>
      </section>

      {/* Return to Life Course Series — keeps its own dedicated section at the bottom */}
      <section className="py-24 lg:py-32 bg-warm-white border-t border-charcoal/10">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-14 reveal">
            <p className="text-xs tracking-widest uppercase text-accent mb-4">
              8-Week Course Series
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal mb-4">
              Return to Life
            </h2>
            <p className="text-muted text-base leading-relaxed max-w-lg mx-auto">
              A structured, progressive series that builds your classical mat practice
              from the ground up. Runs once per quarter. You commit to the full eight weeks —
              this is how the method was designed to be learned.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {/* Course I */}
            <div className="reveal border border-charcoal/10 rounded-sm p-7 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="flex items-baseline justify-between mb-3">
                <h3 className="font-serif text-xl font-light text-charcoal">Course I</h3>
                <span className="font-serif text-2xl font-light text-charcoal">$160</span>
              </div>
              <p className="text-xs text-accent mb-3">Beginner · No experience required</p>
              <p className="text-sm text-muted leading-relaxed mb-4">
                Your foundation. An 8-week progressive series that builds your classical
                mat practice from the ground up — beginner and intermediate exercises with
                a focus on breath, center, and flow. This is where habits are built and the
                method starts to click.
              </p>
              <div className="border-t border-charcoal/5 pt-3">
                <p className="text-xs text-muted">8 weeks · 1x/week · 50 min per session</p>
              </div>
            </div>

            {/* Course II */}
            <div
              className="reveal border border-charcoal/10 rounded-sm p-7 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              style={{ animationDelay: "0.15s" }}
            >
              <div className="flex items-baseline justify-between mb-3">
                <h3 className="font-serif text-xl font-light text-charcoal">Course II</h3>
                <span className="font-serif text-2xl font-light text-charcoal">$160</span>
              </div>
              <p className="text-xs text-accent mb-3">Intermediate · Course I or equivalent required</p>
              <p className="text-sm text-muted leading-relaxed mb-4">
                The next chapter. Picks up where Course I left off and takes you through
                the remainder of the 34-exercise classical mat. Focus shifts to concentration,
                fluidity, and precision — the principles that turn good movement into great movement.
              </p>
              <div className="border-t border-charcoal/5 pt-3">
                <p className="text-xs text-muted">8 weeks · 1x/week · 50 min per session</p>
              </div>
            </div>
          </div>

          <div className="text-center reveal">
            <p className="text-sm text-charcoal mb-2">Next session dates coming soon.</p>
            <p className="text-xs text-muted mb-6">
              Tell us what you&apos;re eyeing — we&apos;ll be in touch when dates land.
            </p>
            <ContactFormModal
              buttonLabel="Interest Form"
              heading="Return to Life Interest Form"
              subhead="Tell us what you're eyeing — we'll be in touch when enrollment opens."
              source="rtl-interest"
              sourceId={204672}
              showRtlFields={true}
              showMessage={true}
            />
          </div>
        </div>
      </section>
    </>
  );
}
