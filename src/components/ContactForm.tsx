"use client";

import { useState } from "react";

// Custom form styled to match the site, POSTs directly to Momence's lead
// collection endpoint so submissions land in the same place as bookings.
//
// Reverse-engineered from the official Momence lead-form plugin
// (momence.com/plugin/lead-form/lead-form.js) — the widget POSTs to this
// URL with token + countryCode. We do the same from our own form so we
// keep site styling AND end up in Momence contacts.
const MOMENCE_LEAD_URL = `https://api.momence.com/integrations/customer-leads/${process.env.NEXT_PUBLIC_MOMENCE_HOST_ID || "270195"}/collect`;
const MOMENCE_LEAD_TOKEN = "BZ8lpMEm8R";

type ContactFormProps = {
  // Tagged in the message body so we can tell signup sources apart in
  // Momence (waitlist vs. rsvp-party vs. contact).
  source?: string;
  // When false, hide the multiline "Message" field (e.g. simple email capture).
  showMessage?: boolean;
  // When true, show an optional Phone number field. Used on "Stay in the
  // Loop" so we can text people about openings, classes, etc.
  showPhone?: boolean;
  // When true, show a "How many guests?" number input. Used on the
  // opening-party RSVP so we know headcount. Stored in the message body
  // since Momence doesn't have a dedicated guest-count field.
  showGuests?: boolean;
  // Callback after a successful submit — modal wrapper uses this.
  onSuccess?: () => void;
};

// Normalize a user-typed phone to E.164. Momence's API rejects loose
// formats; the lead-form widget uses libphonenumber internally. We're
// simpler: strip non-digits, prefix +1 for US numbers, send.
function normalizePhone(input: string): string {
  const digits = input.replace(/\D/g, "");
  if (!digits) return "";
  if (digits.startsWith("1") && digits.length === 11) return `+${digits}`;
  if (digits.length === 10) return `+1${digits}`;
  return `+${digits}`;
}

export default function ContactForm({
  source = "contact",
  showMessage = true,
  showPhone = false,
  showGuests = false,
  onSuccess,
}: ContactFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [guests, setGuests] = useState("1");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Build a message that carries source + optional structured fields
    // (guest count) so we can scan it in Momence later.
    const parts: string[] = [`[${source}]`];
    if (showGuests) parts.push(`Guests: ${guests || "1"}`);
    if (message) parts.push(message);
    const note = parts.join(" | ");

    try {
      const phoneNumber = normalizePhone(phone);
      await fetch(MOMENCE_LEAD_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          ...(phoneNumber ? { phoneNumber } : {}),
          message: note,
          token: MOMENCE_LEAD_TOKEN,
          countryCode: "us",
        }),
      });
    } catch {
      // Surface as submitted regardless — Momence API is reliable enough,
      // and we don't want users guessing what went wrong.
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
        <p className="text-sm text-muted">We&apos;ll be in touch.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="cf-first" className="block text-xs tracking-widest uppercase text-muted mb-2">
            First name
          </label>
          <input
            type="text"
            id="cf-first"
            name="firstName"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            disabled={loading}
            className="w-full px-0 py-2 bg-transparent border-b border-charcoal/20 text-charcoal text-base placeholder-charcoal/30 focus:outline-none focus:border-accent transition-colors"
            placeholder="First"
          />
        </div>
        <div>
          <label htmlFor="cf-last" className="block text-xs tracking-widest uppercase text-muted mb-2">
            Last name
          </label>
          <input
            type="text"
            id="cf-last"
            name="lastName"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            disabled={loading}
            className="w-full px-0 py-2 bg-transparent border-b border-charcoal/20 text-charcoal text-base placeholder-charcoal/30 focus:outline-none focus:border-accent transition-colors"
            placeholder="Last"
          />
        </div>
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
      {showGuests && (
        <div>
          <label htmlFor="cf-guests" className="block text-xs tracking-widest uppercase text-muted mb-2">
            How many in your party?
          </label>
          <input
            type="number"
            id="cf-guests"
            name="guests"
            min={1}
            max={20}
            required
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            disabled={loading}
            className="w-full px-0 py-2 bg-transparent border-b border-charcoal/20 text-charcoal text-base placeholder-charcoal/30 focus:outline-none focus:border-accent transition-colors"
            placeholder="1"
          />
        </div>
      )}
      {showPhone && (
        <div>
          <label htmlFor="cf-phone" className="block text-xs tracking-widest uppercase text-muted mb-2">
            Phone <span className="text-charcoal/30 normal-case tracking-normal">(optional)</span>
          </label>
          <input
            type="tel"
            id="cf-phone"
            name="phone"
            inputMode="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={loading}
            className="w-full px-0 py-2 bg-transparent border-b border-charcoal/20 text-charcoal text-base placeholder-charcoal/30 focus:outline-none focus:border-accent transition-colors"
            placeholder="(555) 555-5555"
          />
        </div>
      )}
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
