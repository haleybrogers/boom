import MomencePacks from "@/components/MomencePacks";

export const metadata = {
  title: "Class Packs & Memberships",
  description:
    "Class packs and memberships at Boomerang Pilates — Durham, NC. Buy direct on Momence.",
};

export default function Packs() {
  return (
    <section className="pt-28 lg:pt-36 pb-20 lg:pb-28">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-[10px] tracking-[0.4em] uppercase text-accent mb-5 animate-fade-up" style={{ animationDelay: "0.05s" }}>
            Class Packs &amp; Memberships
          </p>
          <h1 className="font-serif text-5xl md:text-6xl font-light text-charcoal leading-tight animate-fade-up" style={{ animationDelay: "0.15s" }}>
            Buy a pack.
          </h1>
          <div className="w-12 h-px bg-accent mx-auto mt-8 mb-6 animate-fade-up" style={{ animationDelay: "0.3s" }} />
          <p className="font-serif italic text-base md:text-lg text-charcoal/70 max-w-md mx-auto animate-fade-up" style={{ animationDelay: "0.4s" }}>
            Class packs, memberships, and drop-in credits. Everything sold direct through Momence.
          </p>
        </div>
        <div className="text-center">
          <MomencePacks />
        </div>
      </div>
    </section>
  );
}
