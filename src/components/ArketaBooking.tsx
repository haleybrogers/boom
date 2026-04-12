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
        <div className="bg-white rounded-sm border border-charcoal/10 overflow-hidden">
          <iframe
            id="sutraWidgetIframe"
            src="https://app.arketa.co/iframe/boomerangpilates/schedule"
            width="100%"
            frameBorder="0"
            allow="payment;fullscreen"
            allowFullScreen
            className="w-full border-0"
            style={{ minHeight: "800px", height: "100vh", maxHeight: "1200px" }}
          />
        </div>
        <Script
          src="https://app.arketa.co/scripts/embed.js"
          strategy="lazyOnload"
          onLoad={() => {
            // Arketa's embed script may auto-resize the iframe
            const iframe = document.getElementById("sutraWidgetIframe") as HTMLIFrameElement;
            if (iframe) {
              const resizeObserver = new ResizeObserver(() => {
                try {
                  const body = iframe.contentDocument?.body;
                  if (body) {
                    iframe.style.height = body.scrollHeight + "px";
                  }
                } catch {
                  // Cross-origin — can't read, keep the CSS height
                }
              });
              resizeObserver.observe(iframe);
            }
          }}
        />
      </div>
    </section>
  );
}
