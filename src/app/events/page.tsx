import WaitlistForm from "@/components/WaitlistForm";

export const metadata = {
  title: "Events",
  description: "Grand opening, course series, workshops, and community events at Boomerang Pilates in Durham, NC.",
};

export default function Events() {
  return (
    <>
      {/* Hero + Grand Opening — one continuous section */}
      <section className="relative overflow-hidden bg-charcoal">
        {/* Background image — top portion */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: "url(/accent-image.png)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/20 via-charcoal/50 to-charcoal" />

        {/* Decorative circles — slow drift */}
        <div className="absolute inset-0 opacity-[0.05]">
          <div className="absolute top-12 left-[10%] w-64 h-64 border border-white rounded-full animate-drift-slow" />
          <div className="absolute bottom-8 right-[8%] w-96 h-96 border border-white rounded-full animate-drift-slower" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white rounded-full animate-spin-slow-60" />
        </div>

        <div className="relative max-w-2xl mx-auto px-6 text-center pt-28 lg:pt-36 pb-24 lg:pb-32">
          {/* Page title */}
          <h1 className="font-serif text-4xl md:text-5xl font-light text-white mb-3 animate-fade-up" style={{ animationDelay: "0.05s" }}>
            Events
          </h1>
          <p className="text-white/60 text-sm leading-relaxed max-w-md mx-auto mb-20 lg:mb-28 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Course series, workshops, and things worth showing up for.
          </p>

          {/* Sparkle illustration — animates in, then perpetual slow spin + pulse */}
          <div className="mb-10 animate-sparkle-in" style={{ animationDelay: "0.3s" }}>
            <div className="animate-sparkle-pulse">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className="mx-auto animate-spin-slow-60">
                <path className="draw-path" d="M40 10 L43 34 L60 20 L46 37 L70 40 L46 43 L60 60 L43 46 L40 70 L37 46 L20 60 L34 43 L10 40 L34 37 L20 20 L37 34 Z" fill="none" stroke="white" strokeWidth="0.8" opacity="0.6" />
                <path d="M40 25 L45 40 L40 55 L35 40 Z" fill="none" stroke="white" strokeWidth="0.5" opacity="0.4" />
                <circle cx="15" cy="15" r="1" fill="white" opacity="0.3" />
                <circle cx="65" cy="12" r="1.5" fill="white" opacity="0.25" />
                <circle cx="70" cy="65" r="1" fill="white" opacity="0.3" />
                <circle cx="10" cy="60" r="1.5" fill="white" opacity="0.2" />
              </svg>
            </div>
          </div>

          <p className="text-xs tracking-[0.3em] uppercase text-white mb-6 animate-fade-up" style={{ animationDelay: "0.5s" }}>
            You&apos;re Invited
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-white mb-6 leading-tight animate-fade-up" style={{ animationDelay: "0.65s" }}>
            Grand Opening
          </h2>
          <div className="w-12 h-px bg-accent mx-auto mb-6 animate-fade-up" style={{ animationDelay: "0.8s" }} />
          <p className="text-white/75 text-base leading-relaxed mb-10 max-w-md mx-auto animate-fade-up" style={{ animationDelay: "0.95s" }}>
            We&apos;re opening the doors on June 15. Come throw the first class with us.
          </p>

          {/* Date card + floating twinkles */}
          <div className="relative inline-block mb-8 animate-fade-up" style={{ animationDelay: "1.1s" }}>
            {/* Twinkling sparkles around the card */}
            <span className="absolute -top-3 -left-3 w-1.5 h-1.5 rounded-full bg-accent animate-twinkle" aria-hidden />
            <span className="absolute -top-5 right-6 w-1 h-1 rounded-full bg-white animate-twinkle" style={{ animationDelay: "0.6s" }} aria-hidden />
            <span className="absolute -bottom-4 -right-3 w-2 h-2 rounded-full bg-accent animate-twinkle" style={{ animationDelay: "1.2s" }} aria-hidden />
            <span className="absolute top-1/2 -left-6 w-1 h-1 rounded-full bg-white/70 animate-twinkle" style={{ animationDelay: "0.3s" }} aria-hidden />
            <span className="absolute bottom-2 -right-7 w-1 h-1 rounded-full bg-white/60 animate-twinkle" style={{ animationDelay: "1.5s" }} aria-hidden />

            <div className="inline-flex items-center gap-3 border border-white/15 rounded-sm px-8 py-5 bg-white/5 backdrop-blur-sm animate-float-slow">
              <div className="text-center">
                <p className="font-serif text-2xl text-white mb-1">Monday, June 15, 2026</p>
                <p className="text-xs text-white/60 tracking-widest uppercase">343 W Main St · Durham, NC</p>
              </div>
            </div>
          </div>

          <div className="mb-6 animate-fade-up" style={{ animationDelay: "1.25s" }}>
            <a
              href="/#waitlist"
              className="btn-animated inline-block bg-accent text-white text-xs tracking-widest uppercase px-10 py-4 hover:bg-accent/90 transition-colors"
            >
              RSVP
            </a>
          </div>

          <p className="text-sm text-white/40 animate-fade-up" style={{ animationDelay: "1.4s" }}>
            Founding member rates end when the doors open.
          </p>
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
