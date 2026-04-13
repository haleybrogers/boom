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
    <div className="fixed inset-0 z-[100] bg-cream flex items-center justify-center px-6">
      <div className="max-w-xs w-full text-center">
        <h1 className="font-serif text-3xl font-light text-charcoal mb-2">
          Boomerang Pilates
        </h1>
        <p className="text-sm text-muted mb-8">
          This site is under construction.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(false); }}
            placeholder="Enter password"
            className="w-full px-0 py-2 bg-transparent border-b border-charcoal/20 text-charcoal placeholder-charcoal/30 focus:outline-none focus:border-accent transition-colors text-sm text-center"
            autoFocus
            disabled={loading}
          />
          {error && (
            <p className="text-xs text-red-500">Incorrect password.</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="bg-accent text-white px-7 py-2.5 text-xs tracking-wide rounded-sm hover:bg-accent/85 transition-colors disabled:opacity-50"
          >
            {loading ? "..." : "Enter"}
          </button>
        </form>
      </div>
    </div>
  );
}
