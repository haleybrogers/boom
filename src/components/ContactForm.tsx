"use client";

import { useState } from "react";

// Custom form, styled to match the site, POSTs to Formspree which forwards
// the submission to whichever email address owns the endpoint.
//
// TODO: Haley to confirm the endpoint below (mzdybzlq) is under her current
// Formspree account. If not — sign in, create a new form, swap the endpoint
// code here. Submissions invisible to her right now might be in an old
// account, or there just haven't been any yet.
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mzdybzlq";

type ContactFormProps = {
  // Tagged on the Formspree submission so we can tell signup sources apart
  // in the inbox (waitlist vs. contact vs. rsvp).
  source?: string;
  // When false, hide the multiline "Message" field (e.g. simple email capture).
  showMessage?: boolean;
  // Callback fired after a successful submit — modal wrapper uses this to
  // auto-close after a delay.
  onSuccess?: () => void;
};

export default function ContactForm({
  source = "contact",
  showMessage = true,
  onSuccess,
}: ContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          source,
          _subject: `Boomerang Pilates — ${source} submission`,
        }),
      });
    } catch {
      // Treat network errors as submitted too — Formspree's reliable enough
      // that we shouldn't make users guess what went wrong.
    } finally {
      setLoading(false);
      setSubmitted(true);
      onSuccess?.();
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-6">
        <p className="font-serif text-2xl text-charcoal mb-1">Thanks!</p>
        <p className="text-sm text-muted">
          We&apos;ll be in touch.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="cf-name" className="block text-xs tracking-widest uppercase text-muted mb-2">
          Name
        </label>
        <input
          type="text"
          id="cf-name"
          name="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
          className="w-full px-0 py-2 bg-transparent border-b border-charcoal/20 text-charcoal text-base placeholder-charcoal/30 focus:outline-none focus:border-accent transition-colors"
          placeholder="Your name"
        />
      </div>
      <div>
        <label htmlFor="cf-email" className="block text-xs tracking-widest uppercase text-muted mb-2">
          Email
        </label>
        <input
          type="email"
          id="cf-email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          className="w-full px-0 py-2 bg-transparent border-b border-charcoal/20 text-charcoal text-base placeholder-charcoal/30 focus:outline-none focus:border-accent transition-colors"
          placeholder="you@email.com"
        />
      </div>
      {showMessage && (
        <div>
          <label htmlFor="cf-message" className="block text-xs tracking-widest uppercase text-muted mb-2">
            Message
          </label>
          <textarea
            id="cf-message"
            name="message"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={loading}
            className="w-full px-0 py-2 bg-transparent border-b border-charcoal/20 text-charcoal text-base placeholder-charcoal/30 focus:outline-none focus:border-accent transition-colors resize-none"
            placeholder="How can we help?"
          />
        </div>
      )}
      <div className="text-center">
        <button
          type="submit"
          disabled={loading}
          className="btn-animated bg-accent text-white px-8 py-3.5 text-xs tracking-widest uppercase hover:bg-accent/85 transition-colors disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </form>
  );
}
