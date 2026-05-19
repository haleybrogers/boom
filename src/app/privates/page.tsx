import Image from "next/image";
import SchedulePrivate from "@/components/SchedulePrivate";

export const metadata = {
  title: "Privates & Duets",
  description:
    "One-on-one and duet classical Pilates sessions in Durham, NC. Fully customized apparatus work with Emilie and Annie Young.",
};

export default function Privates() {
  return (
    <>
      {/* Page banner */}
      <div className="relative w-full aspect-[2/1] sm:aspect-[5/2] lg:aspect-[3/1] overflow-hidden">
        <Image
          src="/nav-privates.jpg"
          alt="Private Pilates session at Boomerang"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <section className="pt-16 lg:pt-20 pb-20 lg:pb-28 bg-warm-white">
        <SchedulePrivate />
      </section>
    </>
  );
}
