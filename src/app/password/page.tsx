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
      {/* Red accent — top-left corner arc */}
      <div
        className="absolute -top-32 -left-32 w-80 h-80 rounded-full border border-accent/30"
        aria-hidden="true"
      />
      {/* Red accent — bottom-right corner arc */}
      <div
        className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full border border-accent/25"
        aria-hidden="true"
      />
      {/* Red accent — small dot top-right */}
      <div
        className="absolute top-12 right-12 w-1.5 h-1.5 rounded-full bg-accent"
        aria-hidden="true"
      />

      <div className="relative max-w-xs w-full text-center">
        {/* Red eyebrow */}
        <p className="text-[10px] tracking-[0.3em] uppercase text-accent mb-4">
          Boomerang Pilates
        </p>
        <h1 className="font-serif text-3xl font-light text-charcoal mb-2">
          Almost <span className="text-accent italic">open</span>.
        </h1>
        {/* Red hairline divider */}
        <div className="w-8 h-px bg-accent mx-auto my-5" />
        <p className="text-sm text-muted mb-8">
          This site is under construction.
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
