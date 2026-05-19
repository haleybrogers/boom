import FAQ from "@/components/FAQ";

export const metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about Boomerang Pilates in Durham, NC — what to wear, how to book, mat vs. apparatus, cancellation policy, and more.",
};

export default function FaqPage() {
  return (
    <section className="pt-28 lg:pt-36 pb-20 lg:pb-28 bg-warm-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-[10px] tracking-[0.4em] uppercase text-accent mb-5 animate-fade-up" style={{ animationDelay: "0.05s" }}>
            Common Questions
          </p>
          <h1 className="font-serif text-5xl md:text-6xl font-light text-charcoal leading-tight animate-fade-up" style={{ animationDelay: "0.15s" }}>
            FAQ
          </h1>
          <div className="w-12 h-px bg-accent mx-auto mt-8 mb-6 animate-fade-up" style={{ animationDelay: "0.3s" }} />
          <p className="font-serif italic text-base md:text-lg text-charcoal/70 max-w-md mx-auto animate-fade-up" style={{ animationDelay: "0.4s" }}>
            Everything we get asked most. Still curious? Drop us a note.
          </p>
        </div>

        <FAQ />
      </div>
    </section>
  );
}
