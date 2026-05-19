import Image from "next/image";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact",
  description: "Get in touch with Boomerang Pilates — Durham, NC. Questions, ideas, or just want to say hi.",
};

const MOMENCE_APPOINTMENTS_URL = `https://momence.com/appointments/${process.env.NEXT_PUBLIC_MOMENCE_HOST_ID || "270195"}`;

export default function Contact() {
  return (
    <section className="relative overflow-hidden bg-warm-white pt-28 lg:pt-36 pb-20 lg:pb-28">
      <div className="max-w-5xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-10">
          <p className="text-[10px] tracking-[0.4em] uppercase text-accent mb-5 animate-fade-up" style={{ animationDelay: "0.05s" }}>
            Say Hi
          </p>
          <h1 className="font-serif text-5xl md:text-6xl font-light text-charcoal leading-tight animate-fade-up" style={{ animationDelay: "0.15s" }}>
            Get in touch.
          </h1>
          <div className="w-12 h-px bg-accent mx-auto mt-8 mb-6 animate-fade-up" style={{ animationDelay: "0.3s" }} />
          <p className="font-serif italic text-base md:text-lg text-charcoal/70 max-w-md mx-auto text-balance animate-fade-up" style={{ animationDelay: "0.4s" }}>
            Questions, ideas, or just want to say hi — we&apos;d love to hear from{" "}you.
          </p>
        </div>

        {/* Tiny redirect for people who really just want to book a private */}
        <div className="text-center mb-14">
          <p className="text-xs text-muted">
            Looking to book a private?{" "}
            <a
              href={MOMENCE_APPOINTMENTS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent/70 transition-colors underline underline-offset-4 decoration-accent/40 hover:decoration-accent"
            >
              Skip the form and book directly →
            </a>
          </p>
        </div>

        {/* Lead form + photo */}
        <div className="grid md:grid-cols-[1fr_auto] gap-10 md:gap-14 items-start mb-20">
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

        {/* Info */}
        <div className="border-t border-charcoal/10 pt-10 space-y-6 text-center max-w-lg mx-auto">
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
              href="https://maps.google.com/?q=345+W+Main+St+Durham+NC"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base text-charcoal hover:text-accent transition-colors leading-relaxed"
            >
              345 W Main St, Unit 2 (upstairs)
              <br />
              Durham, NC 27701
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
