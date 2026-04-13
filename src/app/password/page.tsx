"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PasswordPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
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

  return (
    <div className="fixed inset-0 z-[100] bg-cream flex items-center justify-center px-6 overflow-hidden">
      {/* Top red band */}
      <div className="absolute top-0 inset-x-0 h-1 bg-accent" aria-hidden="true" />
      {/* Bottom red band */}
      <div className="absolute bottom-0 inset-x-0 h-1 bg-accent" aria-hidden="true" />

      {/* Concentric circles — top-left */}
      <div
        className="absolute -top-40 -left-40 w-[28rem] h-[28rem] rounded-full border-2 border-accent/40"
        aria-hidden="true"
      />
      <div
        className="absolute -top-32 -left-32 w-80 h-80 rounded-full border border-accent/50"
        aria-hidden="true"
      />

      {/* Concentric circles — bottom-right */}
      <div
        className="absolute -bottom-52 -right-52 w-[32rem] h-[32rem] rounded-full border-2 border-accent/35"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-36 -right-36 w-80 h-80 rounded-full border border-accent/50"
        aria-hidden="true"
      />

      {/* Floating dots */}
      <div className="absolute top-12 right-14 w-2 h-2 rounded-full bg-accent" aria-hidden="true" />
      <div className="absolute top-20 right-24 w-1 h-1 rounded-full bg-accent/60" aria-hidden="true" />
      <div className="absolute bottom-16 left-16 w-1.5 h-1.5 rounded-full bg-accent/70" aria-hidden="true" />

      {/* Diagonal red tick top-left */}
      <div className="absolute top-20 left-16 w-10 h-px bg-accent rotate-45" aria-hidden="true" />
      {/* Diagonal red tick bottom-right */}
      <div className="absolute bottom-20 right-20 w-10 h-px bg-accent rotate-45" aria-hidden="true" />

      <div className="relative max-w-xs w-full text-center">
        {/* Red eyebrow */}
        <p className="text-[10px] tracking-[0.3em] uppercase text-accent mb-4">
          Boomerang Pilates
        </p>
        <h1 className="font-serif text-3xl font-light text-charcoal mb-3">
          Almost <span className="text-accent italic">open</span>.
        </h1>
        <p className="font-serif text-base italic text-accent mb-2">
          Classical Pilates. For every body.
        </p>
        {/* Red hairline divider */}
        <div className="w-8 h-px bg-accent mx-auto my-5" />
        <p className="text-xs text-muted mb-8">
          Durham, NC · Opening June 15
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(false); }}
            placeholder="Enter password"
            className="w-full px-0 py-2 bg-transparent border-b border-accent/30 text-charcoal placeholder-charcoal/30 focus:outline-none focus:border-accent transition-colors text-sm text-center"
            autoFocus
            disabled={loading}
          />
          {error && (
            <p className="text-xs text-accent">Incorrect password.</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="bg-accent text-white px-7 py-2.5 text-xs tracking-widest uppercase rounded-sm hover:bg-accent/85 transition-colors disabled:opacity-50"
          >
            {loading ? "..." : "Become a Founding Member"}
          </button>
        </form>
      </div>
    </div>
  );
}
