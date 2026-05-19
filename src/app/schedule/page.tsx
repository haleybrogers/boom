import Link from "next/link";
import Image from "next/image";
import MomenceScheduleInline from "@/components/MomenceScheduleInline";
import FoundingPricingOverlay from "@/components/FoundingPricingOverlay";
import ClassGuideModal from "@/components/ClassGuideModal";
import ClassesPageLock from "@/components/ClassesPageLock";
import { SHOW_FOUNDING } from "@/lib/flags";

export const metadata = {
  title: "Schedule",
  description:
    "Live class schedule for Boomerang Pilates in Durham, NC. Classical mat and apparatus classes — tap any class to book.",
};

export default function Schedule() {
  return (
    <>
      <ClassesPageLock />

      {/* Page banner */}
      <div className="relative w-full aspect-[2/1] sm:aspect-[5/2] lg:aspect-[3/1] overflow-hidden">
        <Image
          src="/nav-schedule.jpg"
          alt="Boomerang Pilates schedule"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* 1. Schedule — header, then widget */}
      <section className="relative overflow-hidden bg-warm-white pt-16 lg:pt-20 pb-20 lg:pb-24">
        <div className="relative max-w-5xl mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <p
              className="text-[10px] tracking-[0.4em] uppercase text-accent mb-5 animate-fade-up"
              style={{ animationDelay: "0.05s" }}
            >
              The Schedule
            </p>
            <h1
              className="font-serif text-5xl md:text-6xl font-light text-charcoal leading-tight animate-fade-up"
              style={{ animationDelay: "0.15s" }}
            >
              Book a class.
            </h1>
            <div
              className="w-12 h-px bg-accent mx-auto mt-8 mb-6 animate-fade-up"
              style={{ animationDelay: "0.3s" }}
            />
            <p
              className="font-serif italic text-base md:text-lg text-charcoal/70 max-w-md mx-auto animate-fade-up"
              style={{ animationDelay: "0.4s" }}
            >
              Tap a class to see details and book your spot.
            </p>
            <div
              className="mt-6 flex items-center justify-center animate-fade-up"
              style={{ animationDelay: "0.55s" }}
            >
              <ClassGuideModal />
            </div>

          </div>

          <MomenceScheduleInline />
        </div>
      </section>

      {/* 2. Founding Member Pricing — gated behind SHOW_FOUNDING flag */}
      {SHOW_FOUNDING && (
        <section id="founding" className="py-20 lg:py-28">
          <div className="max-w-5xl mx-auto px-6">
            <FoundingPricingOverlay />
          </div>
        </section>
      )}

      {/* 3. Questions? FAQ tab is its own page */}
      <section className="py-14 lg:py-16 bg-warm-white border-t border-charcoal/5">
        <div className="max-w-xl mx-auto px-6 text-center">
          <p className="text-sm text-charcoal mb-3">Have a question first?</p>
          <Link
            href="/faq"
            className="inline-flex items-center gap-1 text-xs tracking-widest uppercase text-accent hover:text-accent/70 transition-colors"
          >
            See FAQ →
          </Link>
        </div>
      </section>
    </>
  );
}
