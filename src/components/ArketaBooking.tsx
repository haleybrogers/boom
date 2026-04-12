"use client";

import Script from "next/script";
import { useEffect } from "react";

export default function ArketaBooking() {
  useEffect(() => {
    // Listen for Arketa's postMessage resize events
    const handleMessage = (e: MessageEvent) => {
      if (e.data?.type === "frameHeight" || typeof e.data?.frameHeight === "number") {
        const iframe = document.getElementById("sutraWidgetIframe") as HTMLIFrameElement;
        if (iframe) {
          const height = e.data.frameHeight || e.data.height;
          if (height && height > 100) {
            iframe.style.height = height + "px";
          }
        }
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <section id="book" className="py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-serif text-2xl md:text-3xl font-light text-charcoal mb-3 text-center">
          Schedule &amp; Booking
        </h2>
        <p className="text-muted text-sm text-center mb-8 max-w-md mx-auto">
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
            style={{ height: "700px" }}
          />
        </div>
        <Script src="https://app.arketa.co/scripts/embed.js" strategy="lazyOnload" />
      </div>
    </section>
  );
}
