import WaitlistForm from "@/components/WaitlistForm";

export const metadata = {
  title: "Events",
  description: "Grand opening, course series, workshops, and community events at Boomerang Pilates in Durham, NC.",
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
            Events <span className="text-accent">&amp;</span> gatherings
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
            Grand Opening
          </h2>
          <div className="w-12 h-px bg-accent mx-auto mb-6 animate-fade-up" style={{ animationDelay: "0.8s" }} />
          <p className="text-white/75 text-base leading-relaxed mb-10 max-w-md mx-auto animate-fade-up" style={{ animationDelay: "0.95s" }}>
            We&apos;re opening the doors on June 15. Food, drinks, mingle, and a peek at the
            finished space. Suggested $10 donation at the door — the last bit of fundraising
            before we open.
          </p>

          {/* Date card */}
          <div className="relative inline-block mb-8 animate-fade-up" style={{ animationDelay: "1.1s" }}>
            <div className="inline-flex items-center gap-3 border border-white/15 rounded-sm px-8 py-5 bg-white/5 backdrop-blur-sm animate-float-slow">
              <div className="text-center">
                <p className="font-serif text-2xl text-white mb-1">Monday, June 15, 2026</p>
                <p className="text-xs text-white/60 tracking-widest uppercase">[TIME TBD] · 343 W Main St · Durham, NC</p>
              </div>
            </div>
          </div>

          {/* Event details — placeholders, replace with real copy */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl mx-auto mb-10 animate-fade-up" style={{ animationDelay: "1.2s" }}>
            <div className="border border-white/10 bg-white/5 backdrop-blur-sm rounded-sm px-4 py-5 text-left">
              <p className="text-[10px] tracking-[0.25em] uppercase text-cream/90 mb-2">What to wear</p>
              <p className="text-sm text-white/80 leading-relaxed">[Dress code TBD — cute casual? Class-ready? Both?]</p>
            </div>
            <div className="border border-white/10 bg-white/5 backdrop-blur-sm rounded-sm px-4 py-5 text-left">
              <p className="text-[10px] tracking-[0.25em] uppercase text-cream/90 mb-2">Food &amp; drink</p>
              <p className="text-sm text-white/80 leading-relaxed">[Caterer + drinks TBD — light bites? Coffee? Champagne?]</p>
            </div>
            <div className="border border-white/10 bg-white/5 backdrop-blur-sm rounded-sm px-4 py-5 text-left">
              <p className="text-[10px] tracking-[0.25em] uppercase text-cream/90 mb-2">How long</p>
              <p className="text-sm text-white/80 leading-relaxed">[Duration + format TBD — demo class? Studio tours? Mingle?]</p>
            </div>
          </div>

          <div className="mb-4 animate-fade-up" style={{ animationDelay: "1.25s" }}>
            <a
              href="/#waitlist"
              className="btn-animated inline-block bg-accent text-white text-xs tracking-widest uppercase px-10 py-4 hover:bg-accent/90 transition-colors"
            >
              RSVP
            </a>
          </div>

          <p className="text-xs text-white/50 max-w-sm mx-auto leading-relaxed animate-fade-up" style={{ animationDelay: "1.35s" }}>
            [RSVP details TBD — capacity, ticketed vs. free, bring a friend?]
          </p>

          <p className="text-sm text-white/40 mt-6 animate-fade-up" style={{ animationDelay: "1.4s" }}>
            Founding member rates end when the doors open.
          </p>
        </div>
      </section>

      {/* Founders' Series — 3-part pay-what-you-can fundraiser */}
      <section className="py-24 lg:py-32 bg-warm-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14 reveal">
            <p className="text-xs tracking-widest uppercase text-accent mb-4">Pay-What-You-Can · 3-Part Series</p>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal mb-4">
              Help us bring classical Pilates to downtown Durham.
            </h2>
            <p className="text-muted text-base leading-relaxed max-w-xl mx-auto">
              Three soft-opening events leading up to the grand opening. Every dollar goes
              straight into finishing the studio — the apparatus, the floors, the little
              details that make a classical Pilates room feel like home. Come to one. Come
              to all three.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {/* Part 1 */}
            <div className="reveal relative border border-accent/20 bg-white rounded-sm p-6 shadow-sm flex flex-col">
              <span className="absolute -top-3 left-5 bg-accent text-white text-[10px] tracking-[0.25em] uppercase px-2.5 py-1 rounded-sm">
                Part One
              </span>
              <h3 className="font-serif text-xl font-light text-charcoal mt-2 mb-1">Founders&apos; Mat Class</h3>
              <p className="text-xs text-accent mb-3">All levels · Suggested $20+</p>
              <p className="text-sm text-muted leading-relaxed mb-4 flex-1">
                A 50-minute classical mat class taught by Emilie and Annie in the
                not-quite-finished studio. Stick around for [coffee / mimosas].
              </p>
              <div className="border-t border-charcoal/5 pt-3 flex items-center justify-between">
                <p className="text-xs text-muted">[Date TBD] · 50 min</p>
                <a
                  href="/#waitlist"
                  className="text-xs tracking-widest uppercase text-accent hover:text-accent/70 transition-colors"
                >
                  RSVP →
                </a>
              </div>
            </div>

            {/* Part 2 */}
            <div className="reveal relative border border-accent/20 bg-white rounded-sm p-6 shadow-sm flex flex-col">
              <span className="absolute -top-3 left-5 bg-accent text-white text-[10px] tracking-[0.25em] uppercase px-2.5 py-1 rounded-sm">
                Part Two
              </span>
              <h3 className="font-serif text-xl font-light text-charcoal mt-2 mb-1">[Workshop / Tower Preview]</h3>
              <p className="text-xs text-accent mb-3">All levels · Suggested $30+</p>
              <p className="text-sm text-muted leading-relaxed mb-4 flex-1">
                [Placeholder — a small-group apparatus preview, breath workshop, or
                themed class. Three of these in a row builds momentum.]
              </p>
              <div className="border-t border-charcoal/5 pt-3 flex items-center justify-between">
                <p className="text-xs text-muted">[Date TBD] · [Format TBD]</p>
                <a
                  href="/#waitlist"
                  className="text-xs tracking-widest uppercase text-accent hover:text-accent/70 transition-colors"
                >
                  RSVP →
                </a>
              </div>
            </div>

            {/* Part 3 */}
            <div className="reveal relative border border-accent/20 bg-white rounded-sm p-6 shadow-sm flex flex-col">
              <span className="absolute -top-3 left-5 bg-accent text-white text-[10px] tracking-[0.25em] uppercase px-2.5 py-1 rounded-sm">
                Part Three
              </span>
              <h3 className="font-serif text-xl font-light text-charcoal mt-2 mb-1">[Studio Warming]</h3>
              <p className="text-xs text-accent mb-3">Open house · Suggested $20+</p>
              <p className="text-sm text-muted leading-relaxed mb-4 flex-1">
                [Placeholder — final fundraiser. A community gathering, light bites,
                tour the finished space, meet the instructors before opening day.]
              </p>
              <div className="border-t border-charcoal/5 pt-3 flex items-center justify-between">
                <p className="text-xs text-muted">[Date TBD] · 2 hr</p>
                <a
                  href="/#waitlist"
                  className="text-xs tracking-widest uppercase text-accent hover:text-accent/70 transition-colors"
                >
                  RSVP →
                </a>
              </div>
            </div>
          </div>

          {/* All-three pass + altruism line */}
          <div className="mt-10 text-center reveal">
            <div className="inline-flex items-center gap-3 border border-accent/30 bg-accent/5 rounded-sm px-6 py-3">
              <span className="text-[10px] tracking-[0.3em] uppercase text-accent">All Three</span>
              <span className="text-charcoal/30">·</span>
              <span className="font-serif italic text-sm text-charcoal">Founders&apos; Series Pass — Suggested $60+</span>
            </div>
            <p className="text-xs italic font-serif text-muted/60 mt-5 max-w-md mx-auto">
              Not able to come but still want to help? Donations welcome — just reach out.
            </p>
          </div>
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
            <div className="inline-block border border-accent/20 bg-accent/5 rounded-sm px-6 py-4 mb-6">
              <p className="text-sm text-charcoal mb-1">Next session dates coming soon.</p>
              <p className="text-xs text-muted">Join the waitlist to be notified when enrollment opens.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stay in the loop */}
      <section className="py-24 lg:py-32 bg-warm-white">
        <div className="max-w-xl mx-auto px-6 text-center reveal">
          <h2 className="font-serif text-3xl font-light text-charcoal mb-4">
            Don&apos;t miss it.
          </h2>
          <p className="text-muted text-base mb-10">
            Sign up and we&apos;ll let you know the moment we have dates.
          </p>
          <WaitlistForm />
        </div>
      </section>
    </>
  );
}
