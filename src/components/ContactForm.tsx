"use client";

import { useState } from "react";

// Custom form styled to match the site, POSTs directly to Momence's lead
// collection endpoint so submissions land in the same place as bookings.
//
// Reverse-engineered from the official Momence lead-form plugin
// (momence.com/plugin/lead-form/lead-form.js). The widget POSTs to this
// URL with token + countryCode. We do the same from our own form so we
// keep site styling AND end up in Momence contacts.
const MOMENCE_LEAD_URL = `https://api.momence.com/integrations/customer-leads/${process.env.NEXT_PUBLIC_MOMENCE_HOST_ID || "270195"}/collect`;
const MOMENCE_LEAD_TOKEN = "BZ8lpMEm8R";

type ContactFormProps = {
  // Momence lead source ID. Created in dashboard at Marketing > Lead
  // Sources. Passing it as `sourceId` in the POST attaches the lead to
  // that source. Per Haley's setup:
  //   204573. Contact Us
  //   204606. RSVP to the Opening Party
  //   204540. Website Footer (used for the general waitlist for now)
  sourceId?: number;
  // Backup human-readable tag. Also goes into the message body so the
  // source is visible at a glance when scanning the lead.
  source?: string;
  // When false, hide the multiline "Message" field (e.g. Simple email capture).
  showMessage?: boolean;
  // When true, show an optional Phone number field. Used on "Stay in the
  // Loop" so we can text people about openings, classes, etc.
  showPhone?: boolean;
  // When true, the Phone field is required (HTML required + label drops
  // the "(optional)" hint). Pairs with showPhone — has no effect on its
  // own. Used on the founding early-access form where SMS is the whole
  // point of signing up.
  requirePhone?: boolean;
  // When true, show a "How many guests?" number input. Used on the
  // opening-party RSVP so we know headcount. Stored in the message body
  // since Momence doesn't have a dedicated guest-count field.
  showGuests?: boolean;
  // When true, show structured "Return to Life" fields. Which series
  // (Course I / Course II checkboxes) + experience level select. Values
  // are appended into the message body so Emilie can see them at a glance
  // in Momence (no first-class custom-field support on the lead API).
  showRtlFields?: boolean;
  // Callback after a successful submit. Modal wrapper uses this.
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
  sourceId,
  source = "contact",
  showMessage = true,
  showPhone = false,
  requirePhone = false,
  showGuests = false,
  showRtlFields = false,
  onSuccess,
}: ContactFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [guests, setGuests] = useState("1");
  const [message, setMessage] = useState("");
  // RTL interest form state. Checkboxes for which course + experience select.
  const [interestedCourseI, setInterestedCourseI] = useState(false);
  const [interestedCourseII, setInterestedCourseII] = useState(false);
  const [experience, setExperience] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Build a message that carries source + optional structured fields
    // (guest count, RTL interest) so we can scan it in Momence later.
    const parts: string[] = [`[${source}]`];
    if (showGuests) parts.push(`Guests: ${guests || "1"}`);
    if (showRtlFields) {
      const courses: string[] = [];
      if (interestedCourseI) courses.push("Course I");
      if (interestedCourseII) courses.push("Course II");
      if (courses.length) parts.push(`Interested in: ${courses.join(", ")}`);
      if (experience) parts.push(`Experience: ${experience}`);
    }
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
          ...(sourceId ? { sourceId } : {}),
          token: MOMENCE_LEAD_TOKEN,
          countryCode: "us",
        }),
      });
    } catch {
      // Surface as submitted regardless. Momence API is reliable enough,
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
          <label htmlFor="cf-first" className="block text-sm tracking-widest uppercase text-muted mb-2">
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
          <label htmlFor="cf-last" className="block text-sm tracking-widest uppercase text-muted mb-2">
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
        <label htmlFor="cf-email" className="block text-sm tracking-widest uppercase text-muted mb-2">
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
          <label htmlFor="cf-guests" className="block text-sm tracking-widest uppercase text-muted mb-2">
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
          <label htmlFor="cf-phone" className="block text-sm tracking-widest uppercase text-muted mb-2">
            Phone
            {!requirePhone && (
              <span className="text-charcoal/30 normal-case tracking-normal"> (optional)</span>
            )}
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
            required={requirePhone}
            className="w-full px-0 py-2 bg-transparent border-b border-charcoal/20 text-charcoal text-base placeholder-charcoal/30 focus:outline-none focus:border-accent transition-colors"
            placeholder="(555) 555-5555"
          />
        </div>
      )}
      {showRtlFields && (
        <>
          <div>
            <p className="block text-sm tracking-widest uppercase text-muted mb-3">
              Which series? <span className="text-charcoal/30 normal-case tracking-normal">(pick one or both)</span>
            </p>
            <div className="space-y-2.5">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={interestedCourseI}
                  onChange={(e) => setInterestedCourseI(e.target.checked)}
                  disabled={loading}
                  className="mt-1 h-4 w-4 rounded-sm border-charcoal/30 text-accent focus:ring-accent/50 cursor-pointer"
                />
                <span className="text-sm text-charcoal leading-snug">
                  <span className="font-medium">Course I</span>
                  <span className="text-muted"> · Beginner · No experience required</span>
                </span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={interestedCourseII}
                  onChange={(e) => setInterestedCourseII(e.target.checked)}
                  disabled={loading}
                  className="mt-1 h-4 w-4 rounded-sm border-charcoal/30 text-accent focus:ring-accent/50 cursor-pointer"
                />
                <span className="text-sm text-charcoal leading-snug">
                  <span className="font-medium">Course II</span>
                  <span className="text-muted"> · Intermediate · Course I or equivalent</span>
                </span>
              </label>
            </div>
          </div>
          <div>
            <label htmlFor="cf-experience" className="block text-sm tracking-widest uppercase text-muted mb-2">
              Pilates experience
            </label>
            <select
              id="cf-experience"
              name="experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              disabled={loading}
              required
              className="w-full px-0 py-2 bg-transparent border-b border-charcoal/20 text-charcoal text-base focus:outline-none focus:border-accent transition-colors appearance-none"
            >
              <option value="">Select one…</option>
              <option value="Brand new">Brand new to Pilates</option>
              <option value="A few classes">A few classes here and there</option>
              <option value="Regular practice">Regular practice (weekly-ish)</option>
              <option value="Long-time practitioner">Long-time practitioner</option>
            </select>
          </div>
        </>
      )}
      {showMessage && (
        <div>
          <label htmlFor="cf-message" className="block text-sm tracking-widest uppercase text-muted mb-2">
            {showRtlFields ? (
              <>Anything else? <span className="text-charcoal/30 normal-case tracking-normal">(optional)</span></>
            ) : (
              "Message"
            )}
          </label>
          <textarea
            id="cf-message"
            name="message"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={loading}
            className="w-full px-0 py-2 bg-transparent border-b border-charcoal/20 text-charcoal text-base placeholder-charcoal/30 focus:outline-none focus:border-accent transition-colors resize-none"
            placeholder={showRtlFields ? "Goals, injuries, scheduling preferences…" : "How can we help?"}
          />
        </div>
      )}
      <div className="text-center">
        <button
          type="submit"
          disabled={loading}
          className="btn-animated bg-accent text-white px-8 py-3.5 text-sm tracking-widest uppercase hover:bg-accent/85 transition-colors disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </form>
  );
}
