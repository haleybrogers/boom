import SchedulePrivate from "@/components/SchedulePrivate";

export const metadata = {
  title: "Privates & Duets",
  description:
    "One-on-one and duet classical Pilates sessions in Durham, NC. Fully customized apparatus work with Emilie and Annie Young.",
};

export default function Privates() {
  return (
    <section className="pt-28 lg:pt-36 pb-20 lg:pb-28 bg-warm-white">
      <SchedulePrivate />
    </section>
  );
}
