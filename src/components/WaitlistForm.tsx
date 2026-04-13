"use client";

import { useState } from "react";

export default function WaitlistForm({ variant = "default" }: { variant?: "default" | "inline" }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch("https://formspree.io/f/xpwrqkba", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, _subject: "New Email Signup — Boomerang Pilates" }),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-4">
        <p className="font-serif text-xl text-charcoal mb-1">You&apos;re in.</p>
        <p className="text-sm text-muted">We&apos;ll keep you posted on everything.</p>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          className="flex-1 px-4 py-2.5 bg-transparent border border-charcoal/20 rounded-sm text-sm text-charcoal placeholder-charcoal/30 focus:outline-none focus:border-accent transition-colors"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-accent text-white px-5 py-2.5 text-xs sm:text-sm tracking-wide rounded-sm hover:bg-accent/85 transition-colors disabled:opacity-50"
        >
          {loading ? "..." : "Join"}
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto">
      <div>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="w-full px-0 py-2 bg-transparent border-b border-charcoal/20 text-charcoal placeholder-charcoal/30 focus:outline-none focus:border-charcoal transition-colors text-sm"
        />
      </div>
      <div>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          className="w-full px-0 py-2 bg-transparent border-b border-charcoal/20 text-charcoal placeholder-charcoal/30 focus:outline-none focus:border-charcoal transition-colors text-sm"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-accent text-white px-5 py-2.5 sm:px-7 sm:py-3 text-xs sm:text-sm tracking-wide rounded-sm hover:bg-accent/85 transition-colors disabled:opacity-50"
      >
        {loading ? "Signing up..." : "Keep Me Posted"}
      </button>
    </form>
  );
}
