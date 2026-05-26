"use client";

// Custom schedule view — replaces the embedded Momence host-schedule
// plugin on /schedule. Two layouts:
//   - md and up: a Google-Calendar-style week grid with time blocks
//     positioned by their start/end time. Hour labels down the left.
//   - below md: a day-tabbed list (one row of weekday tabs, then a
//     simple vertical list of classes for the selected day).
// Both share the same week-navigation header (prev / next / today) and
// the same ScheduleClassModal. Booking happens by tapping a class block
// → modal → "Book →" anchor that opens that session's Momence page.

import { useMemo, useRef, useState } from "react";
import type { ScheduleClass } from "@/lib/scheduleData";
import { displayLocation } from "@/lib/scheduleData";
import { CLASS_TYPE_STYLES } from "@/lib/classStyles";
import ScheduleClassModal from "./ScheduleClassModal";

const TZ = "America/New_York";

// Desktop Calendar view is a Google-Calendar-style time grid: hour
// labels down the left, classes positioned vertically by their start
// time and sized by duration. HOUR_HEIGHT is the pixel height of one
// hour row. The visible hour range auto-tightens to just the hours that
// actually have classes (plus a touch of padding) so the grid never
// shows an empty 6am-to-9pm marathon when classes only run 9-12.
const HOUR_HEIGHT = 56;

// ----------------------- date helpers -----------------------

// Start-of-week = Monday. We anchor everything off this since most
// fitness schedules read Mon-first. Returns a Date at 00:00 local TZ.
function startOfWeek(d: Date): Date {
  const local = new Date(d);
  // JS getDay: 0=Sun..6=Sat. Map so Monday=0.
  const dow = (local.getDay() + 6) % 7;
  local.setDate(local.getDate() - dow);
  local.setHours(0, 0, 0, 0);
  return local;
}

function addDays(d: Date, n: number): Date {
  const next = new Date(d);
  next.setDate(next.getDate() + n);
  return next;
}

function sameYMD(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function fmtWeekday(d: Date, opts: "short" | "long" = "short") {
  return d.toLocaleDateString("en-US", { weekday: opts, timeZone: TZ });
}

function fmtMonthDay(d: Date) {
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: TZ });
}

function fmtTime(d: Date) {
  return d
    .toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: TZ,
    })
    .toLowerCase()
    .replace(" ", "");
}

// Decimal hour-of-day for an ISO timestamp, in the studio's timezone.
// e.g. 10:30 AM → 10.5. Used to position time blocks on the grid.
function hourInTZ(iso: string): number {
  const parts = new Date(iso).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: TZ,
  });
  const [h, m] = parts.split(":").map((n) => parseInt(n, 10));
  return h + m / 60;
}

// Hour-gutter label. 13 → "1 PM", 0 → "12 AM", etc.
function fmtHourLabel(hour: number): string {
  const h = ((hour % 24) + 24) % 24;
  if (h === 0) return "12 AM";
  if (h === 12) return "12 PM";
  if (h < 12) return `${h} AM`;
  return `${h - 12} PM`;
}

// ----------------------- main view -----------------------

type ViewMode = "week" | "list";

export default function ScheduleView({
  classes,
}: {
  classes: ScheduleClass[];
}) {
  const today = useMemo(() => new Date(), []);
  // Single anchor date. Week view shows the week containing it; Day view
  // shows just this one day. Prev/Next arrows step by 7 in week mode and
  // by 1 in day mode (and on mobile, which always renders day view).
  const [selectedDay, setSelectedDay] = useState(today);
  const [activeClass, setActiveClass] = useState<ScheduleClass | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("week");

  const weekStart = useMemo(() => startOfWeek(selectedDay), [selectedDay]);
  const days = useMemo(
    () => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)),
    [weekStart]
  );
  // Date labels for the swipe-hint chip. Pre-computed here so the chip
  // can read either depending on swipe direction without recomputing
  // every touchmove frame.
  const nextWeekStart = useMemo(() => addDays(weekStart, 7), [weekStart]);
  const prevWeekStart = useMemo(() => addDays(weekStart, -7), [weekStart]);
  const nextWeekLabel = `${fmtMonthDay(nextWeekStart)} – ${fmtMonthDay(addDays(nextWeekStart, 6))}`;
  const prevWeekLabel = `${fmtMonthDay(prevWeekStart)} – ${fmtMonthDay(addDays(prevWeekStart, 6))}`;

  // Index classes by yyyy-mm-dd (in the studio's local timezone) so each
  // day column / day list can grab its own.
  const classesByDay = useMemo(() => {
    const map = new Map<string, ScheduleClass[]>();
    for (const c of classes) {
      const d = new Date(c.startISO);
      const key = d.toLocaleDateString("en-CA", { timeZone: TZ }); // YYYY-MM-DD
      const arr = map.get(key) || [];
      arr.push(c);
      map.set(key, arr);
    }
    // Each day's classes sorted by start time
    for (const arr of map.values()) {
      arr.sort((a, b) => a.startISO.localeCompare(b.startISO));
    }
    return map;
  }, [classes]);

  const dayKey = (d: Date) =>
    d.toLocaleDateString("en-CA", { timeZone: TZ });

  // Tracks the direction of the last week change so the mobile list can
  // animate the new week sliding in from the correct side. null means
  // no animation (first render, desktop button presses we don't want to
  // animate, etc.).
  const [slideDir, setSlideDir] = useState<"next" | "prev" | null>(null);

  // Both views are week-scoped, so prev/next always shifts a full week.
  // For mobile swipe + Prev/Next buttons we also stamp slideDir so the
  // mobile list re-animates in from the side that matches the gesture.
  const shiftBy = (n: number) => {
    setSlideDir(n > 0 ? "next" : "prev");
    setSelectedDay(addDays(selectedDay, n * 7));
  };

  // Mobile swipe handling. Track the first touch's x/y so we can decide
  // (on touchend) whether the gesture was a horizontal swipe and which
  // way it went. We require horizontal travel to dominate vertical
  // travel so we don't hijack ordinary vertical scrolling.
  //
  // During the drag itself we mirror the finger with a translateX on the
  // mobile list, then on release either snap back (not far enough) or
  // let the week change + slide-in animation play.
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const SWIPE_MIN = 50; // px — minimum horizontal distance to count as a swipe
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
    setDragging(true);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    const start = touchStart.current;
    if (!start) return;
    const t = e.touches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    // Only follow the finger if horizontal travel is dominant — otherwise
    // we'd hijack a vertical scroll. Damp the offset slightly so it feels
    // more rubbery than a 1:1 drag.
    if (Math.abs(dx) > Math.abs(dy)) {
      setDragX(dx * 0.7);
    }
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    setDragging(false);
    setDragX(0);
    if (!start) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (Math.abs(dx) < SWIPE_MIN) return;
    if (Math.abs(dx) <= Math.abs(dy)) return; // vertical scroll wins
    // Swipe left (negative dx) → next week. Swipe right → previous week.
    shiftBy(dx < 0 ? 1 : -1);
  };

  const weekLabel = `${fmtMonthDay(days[0])} – ${fmtMonthDay(days[6])}`;
  const isThisWeek = sameYMD(weekStart, startOfWeek(today));
  const totalClassesThisWeek = days.reduce(
    (acc, d) => acc + (classesByDay.get(dayKey(d))?.length || 0),
    0
  );

  return (
    <div>
      {/* Navigation. Prev / label / Next, with a Today shortcut on the
          right when we've drifted off today's date. */}
      <div className="flex items-center justify-between mb-6 gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => shiftBy(-1)}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-charcoal/15 text-charcoal/70 hover:bg-cream hover:border-accent/40 hover:text-accent transition-colors"
            aria-label="Previous"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => shiftBy(1)}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-charcoal/15 text-charcoal/70 hover:bg-cream hover:border-accent/40 hover:text-accent transition-colors"
            aria-label="Next"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <div className="ml-3">
            <p className="font-serif text-2xl md:text-3xl font-light text-charcoal leading-tight">
              {weekLabel}
            </p>
            <p className="text-xs tracking-[0.25em] uppercase text-muted mt-1">
              {isThisWeek ? "This week" : "Week of " + fmtMonthDay(days[0])}
              {" · "}
              {totalClassesThisWeek}{" "}
              {totalClassesThisWeek === 1 ? "class" : "classes"}
            </p>
          </div>
        </div>
        {!isThisWeek && (
          <button
            type="button"
            onClick={() => setSelectedDay(today)}
            className="text-[11px] tracking-[0.25em] uppercase text-accent border border-accent/30 px-4 py-2 rounded-full hover:bg-accent hover:text-white transition-colors"
          >
            Today
          </button>
        )}
      </div>

      {/* View toggle + legend. Toggle is desktop-only — mobile is always
          a single-day-at-a-time view since the 7-column week grid is
          too cramped for a phone. On desktop: Week = overview grid,
          Day = one day at a time with a day picker. */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="hidden md:inline-flex bg-cream border border-charcoal/10 rounded-full p-0.5">
          {(["week", "list"] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setViewMode(mode)}
              className={`px-4 py-1.5 text-[11px] tracking-[0.25em] uppercase rounded-full transition-colors ${
                viewMode === mode
                  ? "bg-charcoal text-white"
                  : "text-charcoal/60 hover:text-charcoal"
              }`}
              aria-pressed={viewMode === mode}
            >
              {mode === "week" ? "Calendar" : "List"}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] tracking-[0.2em] uppercase text-muted">
          {(Object.keys(CLASS_TYPE_STYLES) as Array<keyof typeof CLASS_TYPE_STYLES>).map(
            (key) => {
              const s = CLASS_TYPE_STYLES[key];
              return (
                <span key={key} className="inline-flex items-center gap-2">
                  <span
                    className="inline-block w-3 h-3 rounded-sm"
                    style={{ background: s.bgSoft, border: `1px solid ${s.border}` }}
                  />
                  {s.label}
                </span>
              );
            }
          )}
        </div>
      </div>

      {/* How-to-book hint. Cards are tappable but not everyone reads
          that as a signup affordance; explicit nudge above the grid. */}
      <p className="text-sm text-muted text-center italic mb-5">
        Tap any class to see details and book.
      </p>

      {/* Desktop: respects the toggle. Week = 7-column grid, List =
          chronological list of the same week grouped by day header. */}
      <div className="hidden md:block">
        {viewMode === "week" ? (
          <WeekGrid
            days={days}
            classesByDay={classesByDay}
            today={today}
            onSelect={setActiveClass}
          />
        ) : (
          <WeekList
            days={days}
            classesByDay={classesByDay}
            today={today}
            onSelect={setActiveClass}
          />
        )}
      </div>

      {/* Mobile: always the list view. 7-column week grid doesn't fit
          a phone, so we collapse to the chronological week list. The
          outer wrapper handles left/right swipe to flip between weeks
          (mirrors the Prev/Next buttons above). touch-pan-y keeps native
          vertical scrolling intact — we only react to horizontal
          gestures.
          The inner wrapper does two things:
            1. Translates with the finger during the drag (rubber-band
               feel — `dragX`).
            2. Re-keys on each weekStart change so the slide-in
               keyframe fires from the correct side, giving each week
               flip a real "carousel" feel rather than an abrupt swap. */}
      <div
        className="md:hidden touch-pan-y overflow-x-hidden relative"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Swipe hint chip. Fades in as you drag past ~20px, lights up
            in accent when you cross the swipe threshold so it's obvious
            the release will commit. Sits absolutely at the top of the
            swipe container so it doesn't get translated with the list. */}
        {dragging && Math.abs(dragX) > 18 && (
          <div className="absolute top-0 left-0 right-0 flex justify-center pointer-events-none z-10">
            <div
              className={`mt-1 inline-flex items-center gap-3 px-5 py-3 rounded-full border shadow-sm transition-colors ${
                Math.abs(dragX) >= SWIPE_MIN * 0.7
                  ? "bg-accent text-white border-accent"
                  : "bg-cream text-charcoal border-charcoal/15"
              }`}
              style={{
                opacity: Math.min(1, Math.abs(dragX) / 50),
              }}
            >
              {dragX < 0 ? (
                <>
                  <div className="flex flex-col items-end leading-tight">
                    <span className="text-[10px] tracking-[0.25em] uppercase opacity-80">
                      Next week
                    </span>
                    <span className="font-serif text-base">
                      {nextWeekLabel}
                    </span>
                  </div>
                  <span className="text-lg">→</span>
                </>
              ) : (
                <>
                  <span className="text-lg">←</span>
                  <div className="flex flex-col items-start leading-tight">
                    <span className="text-[10px] tracking-[0.25em] uppercase opacity-80">
                      Previous week
                    </span>
                    <span className="font-serif text-base">
                      {prevWeekLabel}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        <div
          key={weekStart.toISOString()}
          className={
            slideDir === "next"
              ? "animate-week-in-right"
              : slideDir === "prev"
              ? "animate-week-in-left"
              : ""
          }
          style={{
            transform: dragX ? `translateX(${dragX}px)` : undefined,
            transition: dragging ? "none" : "transform 200ms ease-out",
          }}
        >
          <WeekList
            days={days}
            classesByDay={classesByDay}
            today={today}
            onSelect={setActiveClass}
          />
        </div>
      </div>

      {activeClass && (
        <ScheduleClassModal
          cls={activeClass}
          onClose={() => setActiveClass(null)}
        />
      )}
    </div>
  );
}

// ----------------------- week grid (desktop) -----------------------

// 7-column week layout. Each column is its own day — header on top
// (weekday + date), then a vertical stack of cards for that day's
// classes. No time gutter on the left, no hour gridlines — cards
// just sort themselves chronologically inside each column. Each
// card grows to fit its full title (no truncation) so reading what's
// on never requires opening the modal.
function WeekGrid({
  days,
  classesByDay,
  today,
  onSelect,
}: {
  days: Date[];
  classesByDay: Map<string, ScheduleClass[]>;
  today: Date;
  onSelect: (c: ScheduleClass) => void;
}) {
  const dayKey = (d: Date) =>
    d.toLocaleDateString("en-CA", { timeZone: TZ });

  // Visible hour range, tightened to the week's actual classes. 1-hour
  // pad above the earliest start + below the latest end so blocks aren't
  // flush against the grid edges. Empty week falls back to 8am–6pm.
  let minH = 24;
  let maxH = 0;
  for (const d of days) {
    for (const c of classesByDay.get(dayKey(d)) || []) {
      minH = Math.min(minH, hourInTZ(c.startISO));
      maxH = Math.max(maxH, hourInTZ(c.endISO));
    }
  }
  const rangeStart = minH === 24 ? 8 : Math.max(0, Math.floor(minH) - 1);
  const rangeEnd = maxH === 0 ? 18 : Math.min(24, Math.ceil(maxH) + 1);
  const totalHours = Math.max(1, rangeEnd - rangeStart);
  const gridHeight = totalHours * HOUR_HEIGHT;
  const hourLabels = Array.from(
    { length: totalHours },
    (_, i) => rangeStart + i
  );

  return (
    <div className="border border-charcoal/10 rounded-sm overflow-hidden bg-warm-white">
      {/* Header row: empty gutter corner + 7 day headers */}
      <div className="grid grid-cols-[56px_repeat(7,1fr)] border-b border-charcoal/10">
        <div className="bg-cream/40 border-r border-charcoal/10" />
        {days.map((d) => {
          const isToday = sameYMD(d, today);
          return (
            <div
              key={d.toISOString()}
              className={`text-center py-3 border-r last:border-r-0 border-charcoal/10 ${
                isToday ? "bg-accent/5" : "bg-cream/40"
              }`}
            >
              <p
                className={`text-[11px] tracking-[0.25em] uppercase font-medium ${
                  isToday ? "text-accent" : "text-charcoal/70"
                }`}
              >
                {fmtWeekday(d)}
              </p>
              <p
                className={`font-serif text-xl font-light leading-tight mt-0.5 ${
                  isToday ? "text-accent" : "text-charcoal"
                }`}
              >
                {d.getDate()}
              </p>
            </div>
          );
        })}
      </div>

      {/* Body: hour gutter + 7 day columns, all the same pixel height */}
      <div className="grid grid-cols-[56px_repeat(7,1fr)]">
        {/* Hour labels gutter */}
        <div
          className="relative bg-cream/40 border-r border-charcoal/10"
          style={{ height: gridHeight }}
        >
          {hourLabels.map((h) => (
            <div
              key={h}
              className="absolute right-2 -translate-y-1/2 text-[10px] tracking-[0.1em] uppercase text-muted whitespace-nowrap"
              style={{ top: (h - rangeStart) * HOUR_HEIGHT }}
            >
              {fmtHourLabel(h)}
            </div>
          ))}
        </div>

        {/* Day columns */}
        {days.map((d) => {
          const dayClasses = classesByDay.get(dayKey(d)) || [];
          const isToday = sameYMD(d, today);
          return (
            <div
              key={d.toISOString()}
              className={`relative border-r last:border-r-0 border-charcoal/10 ${
                isToday ? "bg-accent/[0.03]" : ""
              }`}
              style={{ height: gridHeight }}
            >
              {/* Hour gridlines */}
              {hourLabels.map((h) => (
                <div
                  key={h}
                  className="absolute inset-x-0 border-t border-charcoal/5"
                  style={{ top: (h - rangeStart) * HOUR_HEIGHT }}
                />
              ))}
              {/* Class blocks, positioned by start time */}
              {dayClasses.map((c) => (
                <TimeBlock
                  key={c.id}
                  cls={c}
                  rangeStart={rangeStart}
                  onClick={() => onSelect(c)}
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// A single class rendered as an absolutely-positioned block on the time
// grid. Top = offset from the grid's start hour; height = duration. The
// type color is a soft fill + a heavier left bar.
function TimeBlock({
  cls,
  rangeStart,
  onClick,
}: {
  cls: ScheduleClass;
  rangeStart: number;
  onClick: () => void;
}) {
  const startH = hourInTZ(cls.startISO);
  const top = (startH - rangeStart) * HOUR_HEIGHT;
  // Floor the height so very short / zero-duration blocks stay tappable
  // and legible.
  const height = Math.max(30, (cls.durationMin / 60) * HOUR_HEIGHT);
  const style = CLASS_TYPE_STYLES[cls.type];

  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute left-0.5 right-0.5 rounded-sm overflow-hidden text-left px-2 py-1 transition-shadow hover:shadow-md hover:z-10"
      style={{
        top,
        height,
        background: style.bgSoft,
        borderLeft: `3px solid ${style.border}`,
      }}
    >
      <p
        className="text-[10px] tracking-[0.1em] uppercase font-semibold leading-tight"
        style={{ color: style.text }}
      >
        {fmtTime(new Date(cls.startISO))}
      </p>
      <p className="font-serif text-[12px] text-charcoal leading-tight line-clamp-2 mt-0.5">
        {cls.title}
      </p>
      {cls.isFull && (
        <span
          className="text-[8px] tracking-[0.2em] uppercase font-semibold leading-none"
          style={{ color: style.text }}
        >
          {cls.allowsWaitlist ? "Waitlist" : "Sold Out"}
        </span>
      )}
    </button>
  );
}

// ----------------------- week list -----------------------

// Chronological list of the visible WEEK's classes, grouped by day
// header. Empty days skipped so the list stays focused on actually-
// scheduled stuff. Used on desktop when List is selected and as the
// default mobile rendering (since the 7-column week grid doesn't fit
// a phone).
function WeekList({
  days,
  classesByDay,
  today,
  onSelect,
}: {
  days: Date[];
  classesByDay: Map<string, ScheduleClass[]>;
  today: Date;
  onSelect: (c: ScheduleClass) => void;
}) {
  const dayKey = (d: Date) =>
    d.toLocaleDateString("en-CA", { timeZone: TZ });
  const daysWithClasses = days.filter(
    (d) => (classesByDay.get(dayKey(d)) || []).length > 0
  );

  if (daysWithClasses.length === 0) {
    return (
      <div className="text-center py-16 text-muted border border-dashed border-charcoal/15 rounded-sm max-w-2xl mx-auto">
        <p className="font-serif text-lg text-charcoal mb-2">
          No classes this week.
        </p>
        <p className="text-sm">
          Try the arrows above to peek into next week.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {daysWithClasses.map((d) => {
        const dayClasses = classesByDay.get(dayKey(d)) || [];
        const isToday = sameYMD(d, today);
        return (
          <div key={d.toISOString()}>
            <div className="flex items-baseline justify-between mb-3 pb-2 border-b border-charcoal/10">
              <h3
                className={`font-serif text-xl font-light ${
                  isToday ? "text-accent" : "text-charcoal"
                }`}
              >
                {fmtWeekday(d, "long")}
              </h3>
              <p
                className={`text-[11px] tracking-[0.25em] uppercase ${
                  isToday ? "text-accent" : "text-muted"
                }`}
              >
                {fmtMonthDay(d)}
                {isToday ? " · Today" : ""}
              </p>
            </div>
            <ul className="space-y-2.5">
              {dayClasses.map((c) => {
                const start = new Date(c.startISO);
                const end = new Date(c.endISO);
                const style = CLASS_TYPE_STYLES[c.type];
                return (
                  <li key={c.id}>
                    <button
                      type="button"
                      onClick={() => onSelect(c)}
                      className="w-full text-left flex gap-4 p-4 rounded-sm transition-shadow hover:shadow-md"
                      style={{
                        background: style.bgSoft,
                        borderLeft: `4px solid ${style.border}`,
                      }}
                    >
                      <div className="shrink-0 w-24">
                        <p
                          className="text-sm tracking-widest uppercase font-semibold leading-tight"
                          style={{ color: style.text }}
                        >
                          {fmtTime(start)}
                        </p>
                        <p className="text-[11px] tracking-widest uppercase text-muted mt-1">
                          to {fmtTime(end)}
                        </p>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className="text-[10px] tracking-[0.25em] uppercase mb-1"
                          style={{ color: style.text }}
                        >
                          {style.label}
                        </p>
                        <p className="font-serif text-base text-charcoal leading-tight">
                          {c.title}
                        </p>
                        {displayLocation(c.location) !== "Studio" && (
                          <p className="text-[11px] text-charcoal/55 leading-snug mt-1 italic">
                            {displayLocation(c.location)}
                          </p>
                        )}
                        {c.residentsOnly && (
                          <span className="inline-block mt-2 text-[10px] tracking-[0.1em] uppercase border border-accent/40 text-accent bg-accent/5 rounded-full px-2.5 py-1 leading-none">
                            Residents Only
                          </span>
                        )}
                      </div>
                      <div className="self-center shrink-0 flex flex-col items-end leading-tight">
                        {c.isFull && (
                          <span className="text-[9px] tracking-[0.25em] uppercase text-charcoal/50 mb-0.5">
                            Class Full
                          </span>
                        )}
                        <span
                          className="text-[11px] tracking-[0.25em] uppercase font-semibold"
                          style={{ color: style.text }}
                        >
                          {c.isFull
                            ? c.allowsWaitlist
                              ? "Waitlist →"
                              : "Sold Out"
                            : c.action.type === "rsvp"
                              ? "RSVP →"
                              : "Book →"}
                        </span>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

