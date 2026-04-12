"use client";

import Script from "next/script";

export default function ArketaBooking() {
  return (
    <section id="book" className="py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal mb-4 text-center">
          Book a Class
        </h2>
        <p className="text-muted text-sm text-center mb-12 max-w-md mx-auto">
          Browse the schedule and reserve your spot.
        </p>
        <iframe
          id="sutraWidgetIframe"
          src="https://app.arketa.co/iframe/boomerangpilates/schedule"
          width="100%"
          frameBorder="0"
          allow="payment;fullscreen"
          allowFullScreen
          className="min-h-[600px] border-0"
        />
        <Script src="https://app.arketa.co/scripts/embed.js" strategy="lazyOnload" />
      </div>
    </section>
  );
}
