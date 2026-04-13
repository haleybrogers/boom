"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const CHEEKY_MESSAGES = [
  "Site Under Construction · Coming Soon",
  "No, really. Almost.",
  "The reformers are in the truck.",
  "The tower is taller in person.",
  "Hundred, rollup, rollover, repeat.",
  "Currently: finding a home for the cadillac.",
];

export default function PasswordPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSubmitting, setEmailSubmitting] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [cheekyIdx, setCheekyIdx] = useState(0);
  const [cheekyFading, setCheekyFading] = useState(false);
  const router = useRouter();

  // Linger on "Site Under Construction" for a beat, THEN start cycling
  // through the funny ones for users who stay on the page.
  useEffect(() => {
    const advance = (nextIdx: number) => {
      setCheekyFading(true);
      setTimeout(() => {
        setCheekyIdx(nextIdx);
        setCheekyFading(false);
      }, 400);
    };

    // Hold the construction message for ~10 seconds before rotating.
    const initialHold = setTimeout(() => {
      const interval = setInterval(() => {
        setCheekyIdx((i) => {
          const next = (i + 1) % CHEEKY_MESSAGES.length;
          advance(next);
          return i;
        });
      }, 5000);
      // Stash interval for cleanup
      (initialHold as unknown as { _i?: ReturnType<typeof setInterval> })._i = interval;
    }, 10000);

    return () => {
      clearTimeout(initialHold);
      const stash = (initialHold as unknown as { _i?: ReturnType<typeof setInterval> })._i;
      if (stash) clearInterval(stash);
    };
  }, []);

  const handleCheekyClick = () => {
    const next = (cheekyIdx + 1) % CHEEKY_MESSAGES.length;
    setCheekyFading(true);
    setTimeout(() => {
      setCheekyIdx(next);
      setCheekyFading(false);
    }, 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/");
      router.refresh();
    } else {
      setError(true);
      setLoading(false);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailSubmitting(true);
    try {
      await fetch("https://formspree.io/f/mzdybzlq", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, source: "splash", _subject: "New Splash Signup — Boomerang Pilates" }),
      });
      setEmailSubmitted(true);
    } catch {
      setEmailSubmitted(true);
    } finally {
      setEmailSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-cream flex flex-col items-center px-6 overflow-y-auto pt-28 md:pt-40 pb-16 md:pb-24">
      {/* Top: Almost open + construction note */}
      <div className="text-center">
        <h1 className="font-serif text-5xl md:text-6xl font-light">
          <span className="italic text-accent">Almost</span> <span style={{ color: "#716055" }}>open.</span>
        </h1>
        <button
          type="button"
          onClick={handleCheekyClick}
          className={`block mx-auto text-[10px] tracking-[0.3em] uppercase text-accent mt-8 cursor-pointer hover:text-accent/70 transition-all duration-400 ${
            cheekyFading ? "opacity-0 translate-y-1" : "opacity-100 translate-y-0"
          }`}
          aria-label="Tap to shuffle"
        >
          {CHEEKY_MESSAGES[cheekyIdx]}
        </button>
      </div>

      {/* Center: logo + spinner + email capture + password */}
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        <div className="logo-toss-wrap">
          <Image
            src="/logo-full.svg"
            alt="Boomerang Pilates"
            width={500}
            height={400}
            className="w-52 md:w-64 h-auto"
            priority
          />
        </div>

        <div className="mt-16 md:mt-20" />

      {/* Email capture */}
      <div className="w-full max-w-xs text-center">
        {emailSubmitted ? (
          <div className="py-2">
            <p className="font-serif text-2xl md:text-3xl font-light text-charcoal mb-2">
              You&apos;re <span className="italic text-accent">in</span>.
            </p>
            <p className="text-sm text-charcoal/60 italic font-serif">
              Good things are coming. We&apos;ll see you soon.
            </p>
          </div>
        ) : (
          <>
            <form onSubmit={handleEmailSubmit} className="flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                disabled={emailSubmitting}
                className="flex-1 px-3 py-2 bg-transparent border border-charcoal/20 rounded-sm text-sm text-charcoal placeholder-charcoal/30 focus:outline-none focus:border-accent transition-colors"
              />
              <button
                type="submit"
                disabled={emailSubmitting}
                className="bg-accent text-white px-4 py-2 text-xs tracking-widest uppercase rounded-sm hover:bg-accent/85 transition-colors disabled:opacity-50"
              >
                {emailSubmitting ? "..." : "Join"}
              </button>
            </form>
            <p className="font-serif text-sm text-charcoal/60 mt-5 italic">
              Stay in the know.
            </p>
          </>
        )}
      </div>

      {/* Password — smaller, below email capture */}
      <form onSubmit={handleSubmit} className="w-full max-w-[200px] mt-24 md:mt-32">
        <div className="flex items-center border-b border-charcoal/15 focus-within:border-accent transition-colors">
          <input
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(false); }}
            placeholder="Password"
            className="flex-1 min-w-0 px-0 py-2 bg-transparent text-charcoal/70 placeholder-charcoal/25 focus:outline-none text-xs text-center"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !password}
            aria-label="Enter site"
            className="shrink-0 ml-2 text-charcoal/40 hover:text-accent transition-colors disabled:opacity-30 disabled:hover:text-charcoal/40"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        {error && (
          <p className="text-xs text-accent text-center mt-3">Incorrect password.</p>
        )}
      </form>
      </div>
    </div>
  );
}
