"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Do I need Pilates experience?",
    answer:
      "Not at all. Our Open Level Classical Mat class is designed for all levels — your instructor builds in modifications so the work meets you where you are. If you'd prefer one-on-one guidance first, a private session is a great place to start.",
  },
  {
    question: "What should I wear?",
    answer:
      "Comfortable, form-fitting clothes that let you move freely. Grippy socks are required for apparatus classes (we sell them if you forget). No shoes needed — you'll be barefoot or in socks for everything.",
  },
  {
    question: "What's the difference between mat and apparatus?",
    answer:
      "Mat classes use your body weight and small props on a mat — they're group classes with up to 15 students. Apparatus classes use equipment like the reformer, tower, barrel, and chair — small groups of 3 with hands-on instruction.",
  },
  {
    question: "How do I book a class?",
    answer:
      "Use the schedule at the top of this page — tap a class to see details and book your spot. You can pay with a drop-in, class pack, or membership. First time? Just grab a mat drop-in for $25.",
  },
  {
    question: "What's your cancellation policy?",
    answer:
      "We ask for at least 12 hours notice to cancel or reschedule. Late cancellations and no-shows will be charged for the class. We know things come up — just try to let us know when you can.",
  },
  {
    question: "Where are you located?",
    answer:
      "343 W Main St in Downtown Durham, NC. Parking details coming soon — we'll send everything before opening day.",
  },
  {
    question: "What's a founding membership?",
    answer:
      "The first 50 members lock in a discounted rate that never goes up — no matter how long you stay. It's our way of rewarding the people who believe in this from the beginning. Once the 50 spots are filled, rates go to standard pricing.",
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
