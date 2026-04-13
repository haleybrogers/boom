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
    <section className="relative overflow-hidden bg-warm-white pt-28 lg:pt-36 pb-20 lg:pb-28">
      <div className="max-w-lg mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-[10px] tracking-[0.4em] uppercase text-accent mb-5 animate-fade-up" style={{ animationDelay: "0.05s" }}>
            Say Hi
          </p>
          <h1 className="font-serif text-5xl md:text-6xl font-light text-charcoal leading-tight animate-fade-up" style={{ animationDelay: "0.15s" }}>
            Get in touch.
          </h1>
          <div className="w-12 h-px bg-accent mx-auto mt-8 mb-6 animate-fade-up" style={{ animationDelay: "0.3s" }} />
          <p className="font-serif italic text-base md:text-lg text-charcoal/70 max-w-md mx-auto animate-fade-up" style={{ animationDelay: "0.4s" }}>
            Questions, ideas, or just want to say hi — we&apos;d love to hear from you.
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
        </div>
      </div>
    </section>
  );
}
