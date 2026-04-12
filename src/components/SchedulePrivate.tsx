"use client";

import Script from "next/script";
import { useState } from "react";

const instructors = [
  {
    name: "Emilie Young",
    role: "Co-Founder",
    bio: "3rd Generation Classical Pilates instructor. Certified in mat and apparatus.",
  },
  {
    name: "Annie Young",
    role: "Co-Founder",
    bio: "Classical Pilates certified. Passionate about making Pilates accessible to every body.",
  },
  {
    name: "Instructor TBD",
    role: "Instructor",
    bio: "More details coming soon.",
  },
];

export default function SchedulePrivate() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="max-w-5xl mx-auto px-6">
      <div className="text-center mb-12">
        <p className="text-xs tracking-widest uppercase text-accent mb-3">
          By Appointment
        </p>
        <h2 className="font-serif text-2xl md:text-3xl font-light text-charcoal mb-3">
          Schedule a Private
        </h2>
        <p className="text-muted text-sm max-w-lg mx-auto">
          One-on-one or duet sessions on the full apparatus — Reformer, Cadillac,
          Chair, Barrels. Select an instructor to see availability and book.
        </p>
      </div>

      {/* Pricing row */}
      <div className="flex justify-center gap-6 mb-10">
        <div className="text-center">
          <span className="font-serif text-2xl font-light text-charcoal">$110</span>
          <p className="text-xs text-muted mt-0.5">Private · 50 min</p>
        </div>
        <div className="w-px bg-charcoal/10" />
        <div className="text-center">
          <span className="font-serif text-2xl font-light text-charcoal">$60</span>
          <p className="text-xs text-muted mt-0.5">Duet · per person</p>
        </div>
      </div>

      {/* Instructor cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {instructors.map((inst, i) => (
          <button
            key={inst.name}
            onClick={() => setSelected(selected === i ? null : i)}
            className={`group relative text-left p-6 rounded-sm border transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
              selected === i
                ? "border-accent bg-white shadow-md"
                : "border-charcoal/10 bg-white hover:border-accent/30"
            }`}
          >
            {/* Avatar placeholder */}
            <div className={`w-12 h-12 rounded-full mb-4 flex items-center justify-center text-lg font-serif transition-colors duration-300 ${
              selected === i
                ? "bg-accent text-white"
                : "bg-accent/8 text-accent group-hover:bg-accent/15"
            }`}>
              {inst.name.split(" ").map(n => n[0]).join("")}
            </div>
            <h3 className="font-serif text-lg font-light text-charcoal mb-0.5">
              {inst.name}
            </h3>
            <p className="text-xs text-accent mb-2">{inst.role}</p>
            <p className="text-sm text-muted leading-relaxed">{inst.bio}</p>
            <div className={`mt-4 text-xs tracking-widest uppercase transition-colors duration-200 ${
              selected === i ? "text-accent" : "text-charcoal/40 group-hover:text-accent"
            }`}>
              {selected === i ? "Viewing Availability ↓" : "See Availability →"}
            </div>
          </button>
        ))}
      </div>

      {/* Arketa schedule embed — shows when instructor is selected */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          selected !== null ? "max-h-[900px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {selected !== null && (
          <div className="bg-white rounded-sm border border-charcoal/10 overflow-hidden">
            <div className="bg-cream/50 px-6 py-3 border-b border-charcoal/5 flex items-center justify-between">
              <p className="text-sm text-charcoal">
                <span className="text-muted">Booking with</span>{" "}
                <span className="font-medium">{instructors[selected].name}</span>
              </p>
              <button
                onClick={() => setSelected(null)}
                className="text-xs text-muted hover:text-charcoal transition-colors"
              >
                Close
              </button>
            </div>
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
        )}
      </div>

      <Script src="https://app.arketa.co/scripts/embed.js" strategy="lazyOnload" />
    </div>
  );
}
