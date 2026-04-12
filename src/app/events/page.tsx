import WaitlistForm from "@/components/WaitlistForm";

export const metadata = {
  title: "Events",
  description: "Grand opening, workshops, and community events at Boomerang Pilates in Durham, NC.",
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
              Workshops, community gatherings, and things worth showing up for.
            </p>
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
          <p className="text-muted text-sm leading-relaxed mb-6 max-w-lg mx-auto">
            We&apos;re planning something special to kick things off. Details are coming —
            but if you want to be in the room when it happens, get on the list.
          </p>
          <div className="inline-block border border-charcoal/10 rounded-sm px-8 py-6 bg-cream mb-10">
            <p className="font-serif text-xl font-light text-charcoal mb-1">Date &amp; Details TBA</p>
            <p className="text-xs text-muted tracking-wide">Durham, NC</p>
          </div>
        </div>
      </section>

      {/* Stay in the loop */}
      <section className="py-24 lg:py-32">
        <div className="max-w-xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl font-light text-charcoal mb-4">
            Don&apos;t miss it.
          </h2>
          <p className="text-muted text-sm mb-10">
            Sign up and we&apos;ll let you know the moment we have a date.
          </p>
          <WaitlistForm />
        </div>
      </section>
    </>
  );
}
