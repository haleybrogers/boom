"use client";

import { useState } from "react";

const faqs = [
  {
    question: "I've never done Pilates. Will I be lost?",
    answer:
      "No. Our Open Level Classical Mat is built for first-timers — your instructor cues every exercise from scratch and offers modifications throughout. If walking in cold still feels like a lot, book a single private first and we'll get you fluent before you join a group.",
  },
  {
    question: "I'm not flexible or in great shape. Is this for me?",
    answer:
      "Yes, and especially yes. Pilates was designed to build flexibility and strength, not to require them. Every exercise has an entry point — we meet you where your body is today.",
  },
  {
    question: "I have a back / knee / shoulder issue. Can I still do Pilates?",
    answer:
      "Most likely yes — Pilates was originally developed in part as a rehab method, and our instructors are trained to modify around common issues. For anything significant or post-surgical, start with a private so we can build a plan with you (and loop in your PT or doctor).",
  },
  {
    question: "What should I wear and bring?",
    answer:
      "Form-fitting clothes you can move in (loose tops flip up in inversions). Grippy socks required for apparatus — we sell them if you forget. Bring water; we provide mats and props. No shoes inside the studio.",
  },
  {
    question: "Mat vs. apparatus — what's the difference?",
    answer:
      "Mat uses your body weight and small props — group classes up to 15. Apparatus uses the reformer, tower, barrels, and chair — small groups of 3 with hands-on instruction. Most people who fall in love with Pilates do both.",
  },
  {
    question: "How often should I come to see results?",
    answer:
      "Joseph Pilates said: \"In 10 sessions you'll feel the difference, in 20 you'll see the difference, and in 30 you'll have a whole new body.\" Twice a week is the sweet spot for most people.",
  },
  {
    question: "How do I book a class?",
    answer:
      "Use the schedule at the top of this page — tap any class to book directly. New here? A $25 mat drop-in is the easiest place to start.",
  },
  {
    question: "Cancellation policy?",
    answer:
      "12 hours notice to cancel or reschedule without charge. Late cancellations and no-shows are charged the full rate (and burn a credit if you're on a pack).",
  },
  {
    question: "Where are you located? Where do I park?",
    answer:
      "343 W Main St in Downtown Durham, NC. Parking details coming soon — we'll send a full welcome guide before opening day.",
  },
  {
    question: "What's a founding membership?",
    answer:
      "Only 15 people lock in our $199/mo unlimited mat rate — and that rate never goes up as long as your membership stays active. Cancel or pause and you lose it. Founding-rate packs (privates and duets) are available to anyone who buys before June 15.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div>
      <div className="text-center mb-10">
        <p className="text-xs tracking-widest uppercase text-accent mb-3">
          Common Questions
        </p>
        <h2 className="font-serif text-2xl md:text-3xl font-light text-charcoal">
          FAQ
        </h2>
      </div>

      <div className="max-w-2xl mx-auto divide-y divide-charcoal/10">
        {faqs.map((faq, i) => (
          <button
            key={i}
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full text-left py-5 group"
          >
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-serif text-base font-light text-charcoal group-hover:text-accent transition-colors">
                {faq.question}
              </h3>
              <span
                className={`shrink-0 text-accent/50 transition-transform duration-300 ${
                  open === i ? "rotate-45" : ""
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </span>
            </div>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                open === i
                  ? "max-h-48 opacity-100 mt-3"
                  : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-sm text-muted leading-relaxed pr-8">
                {faq.answer}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
