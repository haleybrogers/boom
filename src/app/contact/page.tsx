"use client";

import { useState } from "react";
import SectionHeading from "@/components/SectionHeading";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, connect to Formspree, Netlify Forms, or your own API
    setSubmitted(true);
  };

  return (
    <>
      {/* Hero */}
      <section className="py-24 lg:py-32 bg-gradient-to-b from-tan/20 to-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-brown mb-4">
              Get in Touch
            </p>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-light leading-[1] text-charcoal mb-8">
              We&apos;d Love to Hear From You
            </h1>
            <p className="text-lg text-brown leading-relaxed max-w-xl">
              Have a question about our classes? Want to schedule a tour?
              Just want to say hello? Reach out — we&apos;re here for you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="font-serif text-3xl font-light text-charcoal mb-8">
                Send Us a Message
              </h2>
              {submitted ? (
                <div className="bg-cream p-10 border border-tan/30 text-center">
                  <p className="font-serif text-2xl text-charcoal mb-2">
                    Thank you!
                  </p>
                  <p className="text-brown">
                    We&apos;ll be in touch within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-semibold tracking-[0.15em] uppercase text-brown mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 bg-cream border border-tan/30 text-charcoal placeholder-brown/40 focus:outline-none focus:border-brown transition-colors text-sm"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-semibold tracking-[0.15em] uppercase text-brown mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 bg-cream border border-tan/30 text-charcoal placeholder-brown/40 focus:outline-none focus:border-brown transition-colors text-sm"
                      placeholder="you@email.com"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-xs font-semibold tracking-[0.15em] uppercase text-brown mb-2"
                    >
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      className="w-full px-4 py-3 bg-cream border border-tan/30 text-charcoal focus:outline-none focus:border-brown transition-colors text-sm"
                    >
                      <option>General Inquiry</option>
                      <option>Class Information</option>
                      <option>Pricing & Memberships</option>
                      <option>Private Sessions</option>
                      <option>Studio Tour</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs font-semibold tracking-[0.15em] uppercase text-brown mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      className="w-full px-4 py-3 bg-cream border border-tan/30 text-charcoal placeholder-brown/40 focus:outline-none focus:border-brown transition-colors text-sm resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-charcoal text-cream px-8 py-3.5 text-sm font-medium tracking-wide uppercase hover:bg-brown transition-colors duration-200 w-full sm:w-auto"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="font-serif text-3xl font-light text-charcoal mb-8">
                Visit the Studio
              </h2>
              <div className="space-y-8">
                {/* Address */}
                <div>
                  <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-brown mb-3">
                    Location
                  </h3>
                  <p className="text-charcoal">123 Wellness Ave, Suite 100</p>
                  <p className="text-charcoal">Austin, TX 78701</p>
                </div>

                {/* Hours */}
                <div>
                  <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-brown mb-3">
                    Studio Hours
                  </h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between max-w-xs">
                      <span className="text-brown">Monday — Friday</span>
                      <span className="text-charcoal">5:30 AM — 8:30 PM</span>
                    </div>
                    <div className="flex justify-between max-w-xs">
                      <span className="text-brown">Saturday</span>
                      <span className="text-charcoal">6:00 AM — 12:00 PM</span>
                    </div>
                    <div className="flex justify-between max-w-xs">
                      <span className="text-brown">Sunday</span>
                      <span className="text-charcoal">Closed</span>
                    </div>
                  </div>
                </div>

                {/* Contact Details */}
                <div>
                  <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-brown mb-3">
                    Contact
                  </h3>
                  <p className="text-sm">
                    <a
                      href="mailto:hello@boomerangpilates.com"
                      className="text-charcoal hover:text-brown transition-colors"
                    >
                      hello@boomerangpilates.com
                    </a>
                  </p>
                  <p className="text-sm mt-1">
                    <a
                      href="tel:+15125551234"
                      className="text-charcoal hover:text-brown transition-colors"
                    >
                      (512) 555-1234
                    </a>
                  </p>
                </div>

                {/* Map Placeholder */}
                <div className="aspect-[4/3] bg-gradient-to-br from-tan/20 to-blue/15 border border-tan/30 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-brown/50 text-sm tracking-wide uppercase">
                      Map
                    </p>
                    <p className="text-brown/30 text-xs mt-1">
                      Embed Google Maps here
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 lg:py-32 bg-cream">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <SectionHeading
            eyebrow="Common Questions"
            title="FAQ"
          />
          <div className="space-y-6">
            {[
              {
                q: "Do I need experience to take a class?",
                a: "Not at all! We welcome all levels. Our Gentle Restore and Mat Pilates classes are perfect starting points for beginners.",
              },
              {
                q: "What should I wear?",
                a: "Comfortable, form-fitting workout clothes are best. We practice in grip socks, which are available for purchase at the studio.",
              },
              {
                q: "How do I cancel or reschedule?",
                a: "We ask for at least 12 hours notice for cancellations. You can manage your bookings online or give us a call.",
              },
              {
                q: "Do you offer private sessions?",
                a: "Yes! Private and semi-private sessions are available with all of our instructors. Contact us for pricing and availability.",
              },
              {
                q: "Is there parking?",
                a: "Yes, we have a dedicated parking lot behind the building with free parking for all studio guests.",
              },
            ].map((faq) => (
              <div
                key={faq.q}
                className="bg-white p-6 lg:p-8 border border-tan/30"
              >
                <h3 className="font-serif text-xl font-medium text-charcoal mb-2">
                  {faq.q}
                </h3>
                <p className="text-sm leading-relaxed text-brown">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
