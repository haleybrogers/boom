import ScheduleView from "@/components/ScheduleView";
import ClassGuideModal from "@/components/ClassGuideModal";
import { fetchSchedule } from "@/lib/scheduleData";

export const metadata = {
  title: "Schedule",
  description:
    "Weekly class schedule for Boomerang Pilates in Durham, NC. Classical mat and apparatus classes, color-coded so you can see your week at a glance. Tap any class to book.",
};

// Refresh hourly. Class schedule changes are infrequent and one-class-at-
// a-time, so we don't need 60s revalidate — but ScheduleData itself
// caches the API call with revalidate: 60, so the actual data freshness
// matches /events. The page render is the cheap part.
export const revalidate = 3600;

// Server component. Pulls schedule data from Momence and hands it to the
// client ScheduleView for rendering + interactivity. Replaces the
// previous Momence embedded widget (MomenceScheduleInline) — that was
// hard to read, didn't show time blocks, and didn't color-code.

export default async function Schedule() {
  const classes = await fetchSchedule();

  return (
    <>
      {/* Header */}
      <section className="bg-warm-white pt-28 lg:pt-36 pb-10 lg:pb-14">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p className="text-[11px] tracking-[0.4em] uppercase text-accent mb-5">
            The Schedule
          </p>
          <h1 className="font-serif text-5xl md:text-6xl font-light text-charcoal leading-tight">
            Book a class.
          </h1>
          <div className="w-12 h-px bg-accent mx-auto mt-8 mb-8" />
          <div className="flex items-center justify-center">
            <ClassGuideModal />
          </div>
        </div>
      </section>

      {/* Schedule grid + day list. Wider container than the rest of the
          site so the week grid has room to breathe (otherwise class
          titles like "Intermediate Advanced Classical Reformer" truncate
          inside a 7-column split). */}
      <section className="bg-warm-white pb-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-6">
          {classes.length === 0 ? (
            <div className="text-center py-16 text-muted border border-dashed border-charcoal/15 rounded-sm max-w-lg mx-auto">
              <p className="font-serif text-lg text-charcoal mb-2">
                Schedule loading.
              </p>
              <p className="text-sm">
                The classes are coming. Check back in a moment, or{" "}
                <a
                  href="https://momence.com/Boomerang-Pilates/270195"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline underline-offset-4"
                >
                  view on Momence
                </a>
                .
              </p>
            </div>
          ) : (
            <ScheduleView classes={classes} />
          )}
        </div>
      </section>
    </>
  );
}
