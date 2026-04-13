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
    <section className="py-16 sm:py-24 lg:py-32">
      <div className="max-w-lg mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-charcoal mb-4">
            Get in Touch
          </h1>
          <p className="text-muted text-base">
            Questions, ideas, or just want to say hi? We&apos;d love to hear from you.
          </p>
        </div>

        {/* Book a private bar */}
        <Link
          href="/classes#privates"
          className="group flex items-center gap-3 border border-accent/15 bg-accent/5 rounded-sm px-4 py-3 mb-10 transition-colors hover:border-accent/30"
        >
          <span className="text-sm text-charcoal">
            Want to book a private?{" "}
            <span className="text-accent group-hover:text-accent/80 transition-colors">Book directly here →</span>
          </span>
        </Link>

        {/* Form */}
        {submitted ? (
          <div className="py-12 text-center">
            <p className="font-serif text-2xl text-charcoal mb-2">Sent!</p>
            <p className="text-sm text-muted">We&apos;ll be in touch soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 mb-16">
            <div>
              <label htmlFor="name" className="block text-xs tracking-widest uppercase text-muted mb-2">Name</label>
              <input
                type="text" id="name" name="name" required
                className="w-full px-0 py-3 bg-transparent border-b border-charcoal/20 text-charcoal text-base placeholder-charcoal/30 focus:outline-none focus:border-accent transition-colors"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-xs tracking-widest uppercase text-muted mb-2">Email</label>
              <input
                type="email" id="email" name="email" required
                className="w-full px-0 py-3 bg-transparent border-b border-charcoal/20 text-charcoal text-base placeholder-charcoal/30 focus:outline-none focus:border-accent transition-colors"
                placeholder="you@email.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-xs tracking-widest uppercase text-muted mb-2">Message</label>
              <textarea
                id="message" name="message" rows={5} required
                className="w-full px-0 py-3 bg-transparent border-b border-charcoal/20 text-charcoal text-base placeholder-charcoal/30 focus:outline-none focus:border-accent transition-colors resize-none"
                placeholder="How can we help?"
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="btn-animated bg-accent text-white px-8 py-3.5 text-xs tracking-widest uppercase hover:bg-accent/85 transition-colors"
              >
                Send Message
              </button>
            </div>
          </form>
        )}

        {/* Info below */}
        <div className="border-t border-charcoal/10 pt-10 space-y-6 text-center">
          <div>
            <a href="mailto:info@boomerangpilatesnc.com" className="text-base text-charcoal hover:text-accent transition-colors">
              info@boomerangpilatesnc.com
            </a>
          </div>
          <div>
            <a
              href="https://instagram.com/boomerangpilatesnc"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base text-charcoal hover:text-accent transition-colors"
            >
              @boomerangpilatesnc
            </a>
          </div>
          <div>
            <a
              href="https://maps.google.com/?q=343+W+Main+St+Durham+NC"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base text-charcoal hover:text-accent transition-colors leading-relaxed"
            >
              343 W Main St
              <br />
              Durham, NC
            </a>
          </div>
          <div className="pt-2">
            <a
              href="https://g.page/r/boomerangpilates/review"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-accent border border-accent/20 px-5 py-2.5 rounded-sm hover:bg-accent/5 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              Leave a Review
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
