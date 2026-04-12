"use client";

import Script from "next/script";

export default function ArketaBooking() {
  return (
    <section id="book" className="py-24 lg:py-32 bg-warm-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal mb-3 text-center">
          Schedule &amp; Booking
        </h2>
        <p className="text-muted text-sm text-center mb-10 max-w-md mx-auto">
          Browse the week and reserve your spot.
        </p>
        <div className="bg-white rounded-sm border border-charcoal/10 overflow-hidden" style={{ height: "500px" }}>
          <iframe
            id="sutraWidgetIframe"
            src="https://app.arketa.co/iframe/boomerangpilates/schedule"
            width="100%"
            height="100%"
            frameBorder="0"
            allow="payment;fullscreen"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>
        <Script src="https://app.arketa.co/scripts/embed.js" strategy="lazyOnload" />
      </div>
    </section>
  );
}
