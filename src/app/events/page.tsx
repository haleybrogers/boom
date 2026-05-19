import ContactFormModal from "@/components/ContactFormModal";
import MomenceEvents from "@/components/MomenceEvents";

export const metadata = {
  title: "Workshops + Events",
  description: "Workshops, course series, pop-up classes, and community events at Boomerang Pilates in Durham, NC.",
};

export default function Events() {
  return (
    <>
      {/* Page header — playful but separate from the Grand Opening hero */}
      <section className="relative overflow-hidden bg-warm-white pt-28 lg:pt-36 pb-20 lg:pb-24">
        <div className="relative max-w-2xl mx-auto px-6 text-center">
          <p className="text-[10px] tracking-[0.4em] uppercase text-accent mb-5 animate-fade-up" style={{ animationDelay: "0.05s" }}>
            What&apos;s Coming Up
          </p>
          <h1 className="font-serif text-5xl md:text-6xl font-light text-charcoal leading-tight animate-fade-up" style={{ animationDelay: "0.15s" }}>
            Workshops <span className="text-accent">+</span> Events
          </h1>
          <div className="w-12 h-px bg-accent mx-auto mt-8 mb-6 animate-fade-up" style={{ animationDelay: "0.3s" }} />
          <p className="font-serif italic text-base md:text-lg text-charcoal/70 max-w-md mx-auto animate-fade-up" style={{ animationDelay: "0.4s" }}>
            Course series, workshops, opening-night chaos, and the things worth showing up for.
          </p>
        </div>
      </section>

      {/* Grand Opening — its own hero section with image */}
      <section className="relative overflow-hidden bg-charcoal">
        {/* Background image — desaturated studio space, brown wash */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed grayscale"
          style={{ backgroundImage: "url(/photo-events-bg.jpg)" }}
        />
        {/* Brown wash + dark fade for text contrast */}
        <div className="absolute inset-0 bg-[#5c4a3a]/55 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-charcoal/65 to-charcoal" />

        <div className="relative max-w-2xl mx-auto px-6 text-center pt-20 lg:pt-28 pb-24 lg:pb-32">
          <p className="text-xs tracking-[0.3em] uppercase text-white mb-6 animate-fade-up" style={{ animationDelay: "0.5s" }}>
            You&apos;re Invited
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-white mb-6 leading-tight animate-fade-up" style={{ animationDelay: "0.65s" }}>
            Opening Party
          </h2>
          <div className="w-12 h-px bg-accent mx-auto mb-6 animate-fade-up" style={{ animationDelay: "0.8s" }} />
          <p className="text-white/75 text-base leading-relaxed mb-10 max-w-md mx-auto animate-fade-up" style={{ animationDelay: "0.95s" }}>
            Five nights after we open, we&apos;re throwing a party. Studio tours, equipment demos,
            and a chance to meet the Boomerang community before the schedule fills up.
          </p>

          {/* Date card — centered, no float animation (was visually uneven before) */}
          <div className="flex justify-center mb-8 animate-fade-up" style={{ animationDelay: "1.1s" }}>
            <div className="border border-white/15 rounded-sm px-8 py-5 bg-white/5 backdrop-blur-sm text-center">
              <p className="font-serif text-2xl text-white mb-1">Saturday, July 18, 2026</p>
              <p className="text-xs text-white/60 tracking-widest uppercase">5–8 PM · 345 W Main St, Unit 2 (upstairs) · Durham, NC</p>
            </div>
          </div>

          {/* Event details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl mx-auto mb-10 animate-fade-up" style={{ animationDelay: "1.2s" }}>
            <div className="border border-white/10 bg-white/5 backdrop-blur-sm rounded-sm px-4 py-5 text-left">
              <p className="text-[10px] tracking-[0.25em] uppercase text-cream/90 mb-2">What to wear</p>
              <p className="text-sm text-white/80 leading-relaxed">Cocktail / party</p>
            </div>
            <div className="border border-white/10 bg-white/5 backdrop-blur-sm rounded-sm px-4 py-5 text-left">
              <p className="text-[10px] tracking-[0.25em] uppercase text-cream/90 mb-2">Food &amp; drink</p>
              <p className="text-sm text-white/80 leading-relaxed">Light bites and spritzes</p>
            </div>
            <div className="border border-white/10 bg-white/5 backdrop-blur-sm rounded-sm px-4 py-5 text-left">
              <p className="text-[10px] tracking-[0.25em] uppercase text-cream/90 mb-2">How long</p>
              <p className="text-sm text-white/80 leading-relaxed">3 hours · studio tours, demos, meet the team. Limited tote bags printed on site by Inkfinity Printing — first come, first served.</p>
            </div>
          </div>

          <div className="mb-4 animate-fade-up" style={{ animationDelay: "1.25s" }}>
            <a
              href="#rsvp"
              className="btn-animated inline-block bg-accent text-white text-xs tracking-widest uppercase px-10 py-4 hover:bg-accent/90 transition-colors"
            >
              RSVP
            </a>
          </div>

          <p className="text-xs text-white/60 max-w-sm mx-auto leading-relaxed animate-fade-up" style={{ animationDelay: "1.35s" }}>
            The studio officially opens Monday, July 13.
          </p>
        </div>
      </section>

      {/* 3-Part Soft Launch Mat Series — June series, pay-what-you-can suggestions */}
      <section className="py-24 lg:py-32 bg-warm-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12 reveal">
            <p className="text-xs tracking-widest uppercase text-accent mb-4">3-Part Mat Series · June</p>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal mb-4">
              No straps. No springs. No limits.
            </h2>
            <p className="text-muted text-base leading-relaxed max-w-lg mx-auto">
              Three Saturday mornings in June — one method, three doors in. Take
              one or take all three. Suggested $20 each, or $55 for the full series.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="reveal border border-charcoal/10 rounded-sm p-6 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <p className="text-[10px] tracking-[0.25em] uppercase text-accent mb-3">Sat · Jun 13 · 10:30 AM</p>
              <h3 className="font-serif text-lg font-light text-charcoal mb-2">Classic Mat</h3>
              <p className="text-sm text-muted leading-relaxed mb-4">The original 34-exercise mat sequence — breath, center, and flow, exactly as written.</p>
              <p className="text-xs text-muted border-t border-charcoal/5 pt-3">Suggested $20</p>
            </div>
            <div className="reveal border border-charcoal/10 rounded-sm p-6 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-md" style={{ animationDelay: "0.1s" }}>
              <p className="text-[10px] tracking-[0.25em] uppercase text-accent mb-3">Sat · Jun 20 · 10:30 AM</p>
              <h3 className="font-serif text-lg font-light text-charcoal mb-2">Magic Mat</h3>
              <p className="text-sm text-muted leading-relaxed mb-4">Classical mat with the Magic Circle — a small ring that turns every cue into a felt sensation.</p>
              <p className="text-xs text-muted border-t border-charcoal/5 pt-3">Suggested $20</p>
            </div>
            <div className="reveal border border-charcoal/10 rounded-sm p-6 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-md" style={{ animationDelay: "0.2s" }}>
              <p className="text-[10px] tracking-[0.25em] uppercase text-accent mb-3">Sat · Jun 27 · 10:30 AM</p>
              <h3 className="font-serif text-lg font-light text-charcoal mb-2">Reformer on the Mat</h3>
              <p className="text-sm text-muted leading-relaxed mb-4">Reformer exercises adapted to the mat — a preview of the apparatus work, no equipment required.</p>
              <p className="text-xs text-muted border-t border-charcoal/5 pt-3">Suggested $20</p>
            </div>
          </div>

          <div className="text-center reveal">
            <div className="inline-block border border-accent/20 bg-accent/5 rounded-sm px-6 py-4">
              <p className="text-sm text-charcoal">All three · suggested <span className="font-medium">$55</span></p>
            </div>
          </div>
        </div>
      </section>

      {/* Pop-Up Classes — dynamic Momence event grid */}
      <section className="py-24 lg:py-32">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14 reveal">
            <p className="text-xs tracking-widest uppercase text-accent mb-4">Pop-Up Classes · Around Town</p>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal mb-4">
              Come move with us before the doors open.
            </h2>
            <p className="text-muted text-base leading-relaxed max-w-xl mx-auto">
              Free and low-cost mat classes at favorite Durham spots leading up
              to opening day. All levels welcome. Tap any class to RSVP.
            </p>
            <p className="text-xs text-muted/80 italic mt-4 max-w-md mx-auto">
              Note: Pilates in the Courtyard (at Cortland) and Pilates by the Pool
              are open to residents of those apartment complexes only.
            </p>
          </div>

          <MomenceEvents />
        </div>
      </section>

      {/* Return to Life Course Series */}
      <section className="py-24 lg:py-32">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-14 reveal">
            <p className="text-xs tracking-widest uppercase text-accent mb-4">8-Week Course Series</p>
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
            <div className="reveal border border-charcoal/10 rounded-sm p-7 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-md" style={{ animationDelay: "0.15s" }}>
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
            <p className="text-xs text-muted mb-6">Tell us which series you&apos;re eyeing — we&apos;ll be in touch when dates land.</p>
            <ContactFormModal
              buttonLabel="Interest Form"
              heading="Return to Life Interest Form"
              subhead="Which series are you interested in (Course I or Course II)? Where are you in your Pilates practice? Drop a quick note and we'll be in touch when enrollment opens."
              source="rtl-interest"
              sourceId={204672}
              showMessage={true}
            />
          </div>
        </div>
      </section>

      {/* RSVP — styled to mirror the home "Stay in the Loop" section. */}
      <section id="rsvp" className="py-24 lg:py-32 bg-warm-white scroll-mt-24">
        <div className="max-w-xl mx-auto px-6 text-center">
          <p className="text-xs tracking-widest uppercase text-accent mb-4">
            Opening Party
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal mb-4">
            Save your spot.
          </h2>
          <p className="text-muted text-base mb-10">
            We&apos;re opening the doors with a party on Friday, July 17.
            Drop your info so we know to expect you — we&apos;ll send a
            reminder + the address as it gets closer.
          </p>
          <ContactFormModal
            buttonLabel="RSVP to the Opening Party"
            heading="See you July 17."
            subhead="Drop your info so we know to expect you. We'll send a reminder + the address as the party gets closer."
            source="rsvp-party"
            sourceId={204606}
            showMessage={false}
            showGuests={true}
          />
        </div>
      </section>
    </>
  );
}
