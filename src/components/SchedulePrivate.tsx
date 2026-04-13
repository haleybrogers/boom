"use client";

import Script from "next/script";
import { useState } from "react";

// Default booking URL shows availability across all instructors.
// If/when Arketa gives us per-instructor booking links, swap them into `bookingUrl`.
const ALL_INSTRUCTORS_URL =
  "https://app.arketa.co/iframe/boomerangpilates/privates/by-service/FwfO18S2CiqgdBkFHHCW";

type Instructor = {
  name: string;
  short: string;
  role: string;
  bio: string;
  bookingUrl?: string;
};

const instructors: Instructor[] = [
  {
    name: "Emilie Young",
    short: "Emilie",
    role: "Co-Founder",
    bio: "3rd Generation Classical Pilates. Comprehensively certified in mat and full apparatus.",
  },
  {
    name: "Annie Young",
    short: "Annie",
    role: "Co-Founder",
    bio: "Classical Pilates certified in mat and apparatus. Trained in the direct lineage of Joseph Pilates. Passionate about making the method accessible to every body.",
  },
  {
    name: "Instructor TBD",
    short: "Third Instructor",
    role: "Instructor",
    bio: "More details coming soon.",
  },
];

// -1 = "All instructors" view
type Selection = -1 | 0 | 1 | 2;

export default function SchedulePrivate() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Selection>(-1);
  const [showBio, setShowBio] = useState(false);

  const current = selected === -1 ? null : instructors[selected];
  const iframeSrc = current?.bookingUrl ?? ALL_INSTRUCTORS_URL;

  return (
    <div className="max-w-5xl mx-auto px-6">
      <div className="text-center mb-12">
        <p className="text-xs tracking-widest uppercase text-accent mb-3">
          By Appointment
        </p>
        <h2 className="font-serif text-2xl md:text-3xl font-light text-charcoal mb-3">
          Schedule a Private or Duet
        </h2>
        <p className="text-muted text-sm max-w-lg mx-auto mb-6">
          The most personalized Pilates experience we offer. Your instructor
          builds every session around your body, your goals, and where you are
          in your practice — using the full range of classical apparatus.
        </p>
        <div className="flex justify-center gap-8">
          <div className="text-center">
            <p className="text-xs text-muted">Private · 50 min</p>
            <p className="text-[11px] text-muted/60 mt-0.5">1 student · Full apparatus</p>
          </div>
          <div className="w-px bg-charcoal/10" />
          <div className="text-center">
            <p className="text-xs text-muted">Duet · 50 min</p>
            <p className="text-[11px] text-muted/60 mt-0.5">2 students · Full apparatus</p>
          </div>
        </div>
      </div>

      {/* CTA — collapses once calendar is open */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          open ? "max-h-0 opacity-0" : "max-h-20 opacity-100"
        }`}
      >
        <div className="text-center">
          <button
            onClick={() => setOpen(true)}
            className="btn-animated inline-block bg-accent text-white text-xs tracking-widest uppercase px-8 py-3.5 hover:bg-accent/90 transition-colors"
          >
            Schedule a Private
          </button>
        </div>
      </div>

      {/* Calendar + instructor filter — revealed after clicking Schedule */}
      <div
        className={`overflow-hidden transition-all duration-600 ease-in-out ${
          open ? "max-h-[2400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {/* Instructor filter tabs */}
        <div className="mb-6">
          <p className="text-center text-xs tracking-widest uppercase text-muted mb-3">
            Filter by Instructor
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => {
                setSelected(-1);
                setShowBio(false);
              }}
              className={`text-xs tracking-widest uppercase px-4 py-2.5 rounded-sm border transition-colors ${
                selected === -1
                  ? "bg-accent text-white border-accent"
                  : "bg-white text-charcoal border-charcoal/15 hover:border-accent/40"
              }`}
            >
              All Instructors
            </button>
            {instructors.map((inst, i) => (
              <button
                key={inst.name}
                onClick={() => {
                  setSelected(i as Selection);
                  setShowBio(false);
                }}
                className={`text-xs tracking-widest uppercase px-4 py-2.5 rounded-sm border transition-colors ${
                  selected === i
                    ? "bg-accent text-white border-accent"
                    : "bg-white text-charcoal border-charcoal/15 hover:border-accent/40"
                }`}
              >
                {inst.short}
              </button>
            ))}
          </div>
        </div>

        {/* Selected instructor bio — expandable */}
        {current && (
          <div className="max-w-2xl mx-auto mb-6 bg-white border border-charcoal/10 rounded-sm overflow-hidden">
            <button
              onClick={() => setShowBio((v) => !v)}
              className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-cream/40 transition-colors"
            >
              <div className="w-11 h-11 rounded-full bg-accent/10 text-accent flex items-center justify-center font-serif">
                {current.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div className="flex-1">
                <p className="font-serif text-base font-light text-charcoal leading-tight">
                  {current.name}
                </p>
                <p className="text-[11px] tracking-widest uppercase text-accent mt-0.5">
                  {current.role}
                </p>
              </div>
              <span
                className={`shrink-0 text-accent/60 transition-transform duration-300 ${
                  showBio ? "rotate-45" : ""
                }`}
                aria-label={showBio ? "Hide bio" : "Show bio"}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                showBio ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-sm text-muted leading-relaxed px-5 pb-5">
                {current.bio}
              </p>
            </div>
          </div>
        )}

        {/* Availability iframe */}
        <div className="bg-white rounded-sm border border-charcoal/10 overflow-hidden">
          <div className="bg-cream/50 px-6 py-3 border-b border-charcoal/5 flex items-center justify-between">
            <p className="text-sm text-charcoal">
              <span className="text-muted">Viewing availability:</span>{" "}
              <span className="font-medium">
                {current ? current.name : "All instructors"}
              </span>
            </p>
            {current && (
              <button
                onClick={() => {
                  setSelected(-1);
                  setShowBio(false);
                }}
                className="text-xs text-muted hover:text-charcoal transition-colors"
              >
                See all
              </button>
            )}
          </div>
          <iframe
            key={selected}
            id="sutraWidgetIframe"
            src={iframeSrc}
            width="100%"
            frameBorder="0"
            allow="payment;fullscreen"
            allowFullScreen
            className="w-full border-0"
            style={{ height: "700px" }}
          />
        </div>
      </div>

      <Script src="https://app.arketa.co/scripts/embed.js" strategy="lazyOnload" />
    </div>
  );
}
