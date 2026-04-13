"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function PasswordPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSubmitting, setEmailSubmitting] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const router = useRouter();

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
    <div className="fixed inset-0 z-[100] bg-cream flex flex-col items-center px-6 overflow-y-auto pt-24 md:pt-32 pb-10">
      {/* Top: Almost open + construction note */}
      <div className="text-center">
        <h1 className="font-serif text-5xl md:text-6xl font-light text-charcoal">
          <span className="italic text-accent">Almost</span> open.
        </h1>
        <p className="text-[10px] tracking-[0.3em] uppercase text-charcoal/50 mt-4">
          Site Under Construction · Coming Soon
        </p>
      </div>

      {/* Center: logo + spinner + email capture + password */}
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        <Image
          src="/logo-full.svg"
          alt="Boomerang Pilates"
          width={500}
          height={400}
          className="w-72 md:w-96 h-auto"
          priority
        />

        <div className="mt-8" />

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
            <p className="font-serif text-sm text-charcoal/60 mt-3 italic">
              Stay in the know.
            </p>
          </>
        )}
      </div>

      {/* Password — smaller, below email capture */}
      <form onSubmit={handleSubmit} className="w-full max-w-[180px] mt-24 md:mt-32">
        <input
          type="password"
          value={password}
          onChange={(e) => { setPassword(e.target.value); setError(false); }}
          placeholder="Password"
          className="w-full px-0 py-2 bg-transparent border-b border-charcoal/15 text-charcoal/70 placeholder-charcoal/25 focus:outline-none focus:border-accent transition-colors text-xs text-center"
          disabled={loading}
        />
        {error && (
          <p className="text-xs text-accent text-center mt-3">Incorrect password.</p>
        )}
      </form>
      </div>
    </div>
  );
}
