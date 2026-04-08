"use client";

import { useState } from "react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* Hero */}
      <section className="py-24 lg:py-32">
        <div className="max-w-xl mx-auto px-6 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-light text-charcoal mb-6">
            Contact
          </h1>
          <p className="text-muted leading-relaxed">
            Questions about classes, pricing, or private sessions? We&apos;d
            love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact grid */}
      <section className="pb-24 lg:pb-32">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Form */}
            <div>
              {submitted ? (
                <div className="py-12 text-center">
                  <p className="font-serif text-2xl text-charcoal mb-2">Thank you.</p>
                  <p className="text-sm text-muted">We&apos;ll be in touch soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-xs tracking-widest uppercase text-muted mb-2">Name</label>
                    <input
                      type="text" id="name" name="name" required
                      className="w-full px-0 py-2 bg-transparent border-b border-charcoal/20 text-charcoal placeholder-charcoal/30 focus:outline-none focus:border-charcoal transition-colors text-sm"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs tracking-widest uppercase text-muted mb-2">Email</label>
                    <input
                      type="email" id="email" name="email" required
                      className="w-full px-0 py-2 bg-transparent border-b border-charcoal/20 text-charcoal placeholder-charcoal/30 focus:outline-none focus:border-charcoal transition-colors text-sm"
                      placeholder="you@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-xs tracking-widest uppercase text-muted mb-2">Message</label>
                    <textarea
                      id="message" name="message" rows={4} required
                      className="w-full px-0 py-2 bg-transparent border-b border-charcoal/20 text-charcoal placeholder-charcoal/30 focus:outline-none focus:border-charcoal transition-colors text-sm resize-none"
                      placeholder="How can we help?"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-accent text-white px-7 py-3 text-sm tracking-wide rounded-sm hover:bg-accent/85 transition-colors"
                  >
                    Send
                  </button>
                </form>
              )}
            </div>

            {/* Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-xs tracking-widest uppercase text-muted mb-3">Location</h3>
                <p className="text-sm text-charcoal">Durham, NC</p>
              </div>
              <div>
                <h3 className="text-xs tracking-widest uppercase text-muted mb-3">Hours</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between max-w-xs">
                    <span className="text-muted">Monday &mdash; Friday</span>
                    <span className="text-charcoal">6:00 AM &mdash; 8:00 PM</span>
                  </div>
                  <div className="flex justify-between max-w-xs">
                    <span className="text-muted">Saturday</span>
                    <span className="text-charcoal">6:00 AM &mdash; 12:00 PM</span>
                  </div>
                  <div className="flex justify-between max-w-xs">
                    <span className="text-muted">Sunday</span>
                    <span className="text-charcoal">Closed</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xs tracking-widest uppercase text-muted mb-3">Email</h3>
                <a href="mailto:hello@boomerangpilates.com" className="text-sm text-charcoal hover:text-muted transition-colors">
                  hello@boomerangpilates.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
