"use client";

import { useState } from "react";

// Logistics questions — visible at the top for existing clients who just
// want quick answers about booking, cancellation, perks, founding.
const logisticsFaqs = [
  {
    question: "How do I book a class?",
    answer:
      "Use the schedule at the top of this page — tap any class to book directly. New here? A $25 mat drop-in is the easiest place to start.",
  },
  {
    question: "Cancellation policy?",
    answer:
      "24 hours notice to cancel or reschedule any lesson or class. Late cancellations and no-shows: mat members are charged the full $25 drop-in rate; if you're on a class pack, it's a $15 fee plus a burned credit.",
  },
  {
    question: "Can I bring a friend?",
    answer:
      "Yes — and if you're a founding member, your first three months come with a bring-a-friend pass: bring a friend to any mat class, free.",
  },
  {
    question: "What's a founding membership?",
    answer:
      "Three tiers — 4x/month, 8x/month, and Unlimited — with 15 founding spots at each tier. Founding rate is 25% off the regular membership and applies to mat classes only (can't be subbed into apparatus). Lock it in before we open and your rate never goes up as long as your membership stays active. Cancel or pause and you lose it.",
  },
  {
    question: "Do you offer discounts?",
    answer:
      "Yes — 10% off memberships and packs for first responders, students, teachers, and dancers. Doesn't stack with founding rates, and drop-ins are full price. Just let us know when you sign up.",
  },
  {
    question: "How do duets and trios work?",
    answer:
      "Bring your people. When you book a duet or trio, plan on filling those spots yourself — the studio has three reformers, so we can't randomly match strangers. Want cheaper Pilates? Recruit a friend or two. If you want apparatus without rounding up friends, our group apparatus class is open to anyone — book in solo.",
  },
  {
    question: "Want to do a trio but don't have two friends?",
    answer:
      "Definitely reach out first — we keep a list of folks looking for the same, and love matching people into standing trios. We'll connect you.",
  },
];

// Beginner questions — collapsed inside the "Never done Pilates before?"
// dropdown so existing clients don't have to scroll past them.
const beginnerFaqs = [
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
      "Form-fitting clothes you can move in (loose tops flip up in inversions). Grippy socks or bare feet — your call. We sell socks if you want a pair. Bring water; we provide mats and props. No shoes inside the studio.",
  },
  {
    question: "Mat vs. apparatus — what's the difference?",
    answer:
      "Mat is the bread and butter of the Pilates method — your own body weight, your own resistance. The apparatus gives your body a frame of reference and adds the recoil and resistance of springs. Ours is all Gratz equipment, which differs from what you'll find at contemporary studios — the springs are uniform and heavy. Your instructor will cue you to change springs throughout, and contrary to what most people think, more springs is not always more challenging.",
  },
  {
    question: "How often should I come to see results?",
    answer:
      "Joseph Pilates said: \"In 10 sessions you'll feel the difference, in 20 you'll see the difference, and in 30 you'll have a whole new body.\" Twice a week is the sweet spot for most people.",
  },
];

function FaqRow({
  faq,
  isOpen,
  onToggle,
}: {
  faq: { question: string; answer: string };
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className="w-full text-left py-5 group"
    >
      <div className="flex items-center justify-between gap-4">
        <h3 className="font-serif text-base font-light text-charcoal group-hover:text-accent transition-colors">
          {faq.question}
        </h3>
        <span
          className={`shrink-0 text-accent/50 transition-transform duration-300 ${
            isOpen ? "rotate-45" : ""
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </span>
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-64 opacity-100 mt-3" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-sm text-muted leading-relaxed pr-8">
          {faq.answer}
        </p>
      </div>
    </button>
  );
}

export default function FAQ() {
  // Use composite keys so logistics and beginner rows can each be open
  // independently (and only one beginner row at a time, etc.). The
  // "Never done Pilates before?" parent is its own toggle.
  const [openLogistics, setOpenLogistics] = useState<number | null>(null);
  const [openBeginner, setOpenBeginner] = useState<number | null>(null);
  const [beginnerExpanded, setBeginnerExpanded] = useState(false);

  return (
    <div className="max-w-2xl mx-auto">
      {/* Logistics — visible at the top */}
      <div className="divide-y divide-charcoal/10">
        {logisticsFaqs.map((faq, i) => (
          <FaqRow
            key={i}
            faq={faq}
            isOpen={openLogistics === i}
            onToggle={() => setOpenLogistics(openLogistics === i ? null : i)}
          />
        ))}
      </div>

      {/* New-to-Pilates — collapsed by default, expands into a nested accordion */}
      <div className="mt-10 pt-10 border-t border-charcoal/10">
        <button
          onClick={() => setBeginnerExpanded((v) => !v)}
          className="w-full text-left group"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[11px] tracking-[0.4em] uppercase text-accent mb-1">
                New here?
              </p>
              <h3 className="font-serif text-xl font-light text-charcoal group-hover:text-accent transition-colors">
                Never done Pilates before?
              </h3>
            </div>
            <span
              className={`shrink-0 text-accent/50 transition-transform duration-300 ${
                beginnerExpanded ? "rotate-45" : ""
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </span>
          </div>
        </button>

        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            beginnerExpanded ? "max-h-[2000px] opacity-100 mt-2" : "max-h-0 opacity-0"
          }`}
        >
          <div className="divide-y divide-charcoal/10">
            {beginnerFaqs.map((faq, i) => (
              <FaqRow
                key={i}
                faq={faq}
                isOpen={openBeginner === i}
                onToggle={() => setOpenBeginner(openBeginner === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
