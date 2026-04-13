"use client";

import { useState } from "react";
import Link from "next/link";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* Hero */}
      <section className="py-12 sm:py-24 lg:py-32">
        <div className="max-w-xl mx-auto px-6 text-center">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-charcoal mb-4 sm:mb-6">
            Contact
          </h1>
          <p className="text-muted leading-relaxed">
            Questions about classes, pricing, or private sessions? We&apos;d
            love to hear from you.
          </p>
        </div>
      </section>

      {/* Private instruction callout */}
      <section className="pb-12 sm:pb-16">
        <div className="max-w-xl mx-auto px-6">
          <div className="border border-accent/20 bg-accent/5 rounded-sm p-6 text-center">
            <p className="font-serif text-lg font-light text-charcoal mb-2">
              Looking to schedule private instruction?
            </p>
            <p className="text-sm text-muted mb-4">
              Book directly with one of our instructors — see availability and pay online.
            </p>
            <Link
              href="/classes#privates"
              className="btn-animated inline-block bg-accent text-white text-xs tracking-widest uppercase px-7 py-3 hover:bg-accent/90 transition-colors"
            >
              Book a Private
            </Link>
          </div>
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
                    className="btn-animated bg-accent text-white px-7 py-3 text-sm tracking-wide rounded-sm hover:bg-accent/85 transition-colors"
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
                <h3 className="text-xs tracking-widest uppercase text-muted mb-3">Email</h3>
                <a href="mailto:info@boomerangpilatesnc.com" className="text-sm text-charcoal hover:text-muted transition-colors">
                  info@boomerangpilatesnc.com
                </a>
              </div>
              <div>
                <h3 className="text-xs tracking-widest uppercase text-muted mb-3">Follow Us</h3>
                <a
                  href="https://instagram.com/boomerangpilatesnc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-charcoal hover:text-accent transition-colors"
                >
                  @boomerangpilatesnc
                </a>
              </div>

              {/* Review CTA */}
              <div className="border-t border-charcoal/10 pt-8">
                <h3 className="text-xs tracking-widest uppercase text-muted mb-3">Love Boomerang?</h3>
                <a
                  href="https://g.page/r/boomerangpilates/review"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-animated inline-flex items-center gap-2 bg-charcoal text-white text-xs tracking-widest uppercase px-6 py-3 hover:bg-charcoal/85 transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  Leave a Review
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
