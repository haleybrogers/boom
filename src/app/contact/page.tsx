import Image from "next/image";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import { PRIVATES_BOOKABLE } from "@/lib/flags";
import { MOMENCE_APPOINTMENTS_URL } from "@/lib/momence";

export const metadata = {
  title: "Contact",
  description: "Get in touch with Boomerang Pilates. Durham, NC. Questions, ideas, or just want to say hi.",
};

export default function Contact() {
  return (
    <section className="relative overflow-hidden bg-warm-white pt-28 lg:pt-36 pb-20 lg:pb-28">
      <div className="max-w-5xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-10">
          <p className="text-[11px] tracking-[0.4em] uppercase text-accent mb-5 animate-fade-up" style={{ animationDelay: "0.05s" }}>
            Say Hi
          </p>
          <h1 className="font-serif text-5xl md:text-6xl font-light text-charcoal leading-tight animate-fade-up" style={{ animationDelay: "0.15s" }}>
            Get in touch.
          </h1>
          <div className="w-12 h-px bg-accent mx-auto mt-8 mb-6 animate-fade-up" style={{ animationDelay: "0.3s" }} />
          <p className="font-serif italic text-base md:text-lg text-charcoal/70 max-w-md mx-auto text-balance animate-fade-up" style={{ animationDelay: "0.4s" }}>
            Questions, ideas, or just want to say hi. We&apos;d love to hear from{" "}you.
          </p>
        </div>

        {/* Tiny redirect for people who really just want a session */}
        <div className="text-center mb-14">
          {PRIVATES_BOOKABLE ? (
            <p className="text-sm text-muted">
              <a
                href={MOMENCE_APPOINTMENTS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent/70 transition-colors underline underline-offset-4 decoration-accent/40 hover:decoration-accent"
              >
                Request a session →
              </a>
            </p>
          ) : (
            <p className="text-sm text-muted">
              Private bookings open when the studio doors do.{" "}
              <Link
                href="/privates"
                className="text-accent hover:text-accent/70 transition-colors underline underline-offset-4 decoration-accent/40 hover:decoration-accent"
              >
                See what&apos;s coming →
              </Link>
            </p>
          )}
        </div>

        {/* Lead form + photo. IG + address live in the footer. No need to repeat here. */}
        <div className="grid md:grid-cols-[1fr_auto] gap-10 md:gap-14 items-start">
          <div className="max-w-lg w-full mx-auto md:mx-0 md:w-[420px]">
            <ContactForm source="contact" sourceId={204573} showMessage={true} />
          </div>

          <div className="relative w-full max-w-sm md:w-80 lg:w-96 aspect-[3/4] mx-auto md:mx-0 overflow-hidden order-first md:order-last">
            <Image
              src="/photo-contact.jpg"
              alt="Emilie and Annie Young"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 384px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
