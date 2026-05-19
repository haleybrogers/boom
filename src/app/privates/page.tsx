import Image from "next/image";
import SchedulePrivate from "@/components/SchedulePrivate";

export const metadata = {
  title: "Privates & Duets",
  description:
    "One-on-one and duet classical Pilates sessions in Durham, NC. Fully customized apparatus work with Emilie and Annie Young.",
};

export default function Privates() {
  return (
    <section className="pt-28 lg:pt-36 pb-20 lg:pb-28 bg-warm-white">
      {/* Hero: portrait photo gets its own vertical space, content sits beside it */}
      <div className="max-w-6xl mx-auto px-6 mb-16 lg:mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center">
          <div className="relative w-full aspect-[3/4] overflow-hidden order-1 md:order-1">
            <Image
              src="/nav-privates.jpg"
              alt="Private Pilates session at Boomerang"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="order-2 md:order-2">
            <p className="text-[10px] tracking-[0.4em] uppercase text-accent mb-5">
              By Appointment
            </p>
            <h1 className="font-serif text-5xl md:text-6xl font-light text-charcoal leading-tight mb-6">
              Privates &amp; duets.
            </h1>
            <div className="w-12 h-px bg-accent mb-6" />
            <p className="font-serif italic text-base md:text-lg text-charcoal/70">
              The most personal way to start, the fastest way to grow.
              One-on-one, or with a partner — built around your body.
            </p>
          </div>
        </div>
      </div>

      <SchedulePrivate />
    </section>
  );
}
