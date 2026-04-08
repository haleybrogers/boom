"use client";

import OfferCard from "./OfferCard";

const offerings = [
  {
    title: "Mat Classes",
    desc: "Build core strength and flexibility through classical mat exercises. Perfect for every level.",
    detail: "Our mat classes follow the classical order of exercises, progressively building strength and control. Small class sizes ensure personal attention. All levels welcome — modifications provided.",
    icon: (
      <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 40 40">
        <ellipse cx="8" cy="20" rx="4" ry="8" />
        <line x1="8" y1="12" x2="36" y2="12" />
        <line x1="8" y1="28" x2="36" y2="28" />
        <path d="M36 12 C38 12, 38 28, 36 28" />
      </svg>
    ),
  },
  {
    title: "Apparatus",
    desc: "Reformer, Cadillac, Chair, and Barrels. Spring-loaded resistance for full-body conditioning.",
    detail: "Work on the full suite of Classical Pilates apparatus. Springs provide resistance that supports and challenges you simultaneously. Sessions available in small groups or one-on-one.",
    icon: (
      <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 40 40">
        <rect x="2" y="22" width="36" height="4" rx="1" />
        <line x1="6" y1="26" x2="6" y2="32" />
        <line x1="34" y1="26" x2="34" y2="32" />
        <rect x="10" y="16" width="10" height="6" rx="1" />
        <line x1="30" y1="10" x2="30" y2="22" />
        <line x1="28" y1="10" x2="32" y2="10" />
        <circle cx="6" cy="24" r="1.5" fill="currentColor" />
        <circle cx="34" cy="24" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Private Sessions",
    desc: "One-on-one instruction tailored to your body, your goals, and your pace.",
    detail: "Private sessions are fully customized to you. Whether you're rehabbing an injury, training for something specific, or just prefer individual attention — we'll meet you where you are.",
    icon: (
      <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
];

export default function Offerings() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {offerings.map((item) => (
        <OfferCard key={item.title} {...item} />
      ))}
    </div>
  );
}
