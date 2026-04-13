import WaitlistForm from "@/components/WaitlistForm";

export const metadata = {
  title: "Events",
  description: "Grand opening, course series, workshops, and community events at Boomerang Pilates in Durham, NC.",
};

export default function Events() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative bg-fixed bg-cover bg-center h-[40vh] lg:h-[50vh]"
        style={{ backgroundImage: "url(/accent-image.png)" }}
      >
        <div className="absolute inset-0 bg-[#5c4a3a]/35" />
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center px-6">
            <h1 className="font-serif text-4xl md:text-5xl font-light text-white mb-4">
              Events
            </h1>
            <p className="text-white/70 text-sm leading-relaxed max-w-md mx-auto">
              Course series, workshops, and things worth showing up for.
            </p>
          </div>
        </div>
      </section>

      {/* Return to Life Course Series */}
      <section className="py-24 lg:py-32">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-14">
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
            <div className="border border-charcoal/10 rounded-sm p-7 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
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
            <div className="border border-charcoal/10 rounded-sm p-7 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
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

          <div className="text-center">
            <div className="inline-block border border-accent/20 bg-accent/5 rounded-sm px-6 py-4 mb-6">
              <p className="text-sm text-charcoal mb-1">Next session dates coming soon.</p>
              <p className="text-xs text-muted">Join the waitlist to be notified when enrollment opens.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Grand Opening */}
      <section className="py-24 lg:py-32 bg-warm-white">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p className="text-xs tracking-widest uppercase text-accent mb-4">Coming Soon</p>
          <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal mb-4">
            Grand Opening
          </h2>
          <p className="text-muted text-base leading-relaxed mb-6 max-w-lg mx-auto">
            We&apos;re planning something special to kick things off. Details are coming —
            but if you want to be in the room when it happens, get on the list.
          </p>
          <div className="inline-block border border-charcoal/10 rounded-sm px-8 py-6 bg-cream mb-4">
            <p className="font-serif text-xl font-light text-charcoal mb-1">Date &amp; Details TBA</p>
            <p className="text-xs text-muted tracking-wide">Durham, NC</p>
          </div>
          <p className="text-sm text-accent">
            Founding member rates end when the doors open.
          </p>
        </div>
      </section>

      {/* Stay in the loop */}
      <section className="py-24 lg:py-32">
        <div className="max-w-xl mx-auto px-6 text-center">
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
