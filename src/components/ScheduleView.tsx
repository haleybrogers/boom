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

import { useMemo, useState } from "react";
import type { ScheduleClass } from "@/lib/scheduleData";
import { displayLocation } from "@/lib/scheduleData";
import { CLASS_TYPE_STYLES } from "@/lib/classStyles";
import ScheduleClassModal from "./ScheduleClassModal";

const TZ = "America/New_York";

// (No time-axis constants — desktop week view is now a stacked-card
// layout per day column, not a Google-Calendar-style time grid. Time
// information lives on each card directly.)

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

// ----------------------- main view -----------------------

type ViewMode = "week" | "list";

export default function ScheduleView({
  classes,
}: {
  classes: ScheduleClass[];
}) {
  const today = useMemo(() => new Date(), []);
  const [weekStart, setWeekStart] = useState(() => startOfWeek(today));
  const [activeClass, setActiveClass] = useState<ScheduleClass | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("week");

  // Mobile-only state. Defaults to today if today is inside the current
  // week; otherwise the first day of the visible week.
  const [activeDayIdx, setActiveDayIdx] = useState(() => {
    const idx = (today.getDay() + 6) % 7;
    return idx; // Mon=0..Sun=6
  });

  const days = useMemo(
    () => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)),
    [weekStart]
  );

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

  const weekLabel = `${fmtMonthDay(days[0])} – ${fmtMonthDay(days[6])}`;
  const isThisWeek = sameYMD(weekStart, startOfWeek(today));
  const totalClassesThisWeek = days.reduce(
    (acc, d) => acc + (classesByDay.get(dayKey(d))?.length || 0),
    0
  );

  return (
    <div>
      {/* Week navigation. Prev / This week label / Next, with a Today
          shortcut on the right when off the current week. */}
      <div className="flex items-center justify-between mb-6 gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setWeekStart(addDays(weekStart, -7))}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-charcoal/15 text-charcoal/70 hover:bg-cream hover:border-accent/40 hover:text-accent transition-colors"
            aria-label="Previous week"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => setWeekStart(addDays(weekStart, 7))}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-charcoal/15 text-charcoal/70 hover:bg-cream hover:border-accent/40 hover:text-accent transition-colors"
            aria-label="Next week"
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
              {totalClassesThisWeek} {totalClassesThisWeek === 1 ? "class" : "classes"}
            </p>
          </div>
        </div>
        {!isThisWeek && (
          <button
            type="button"
            onClick={() => {
              setWeekStart(startOfWeek(today));
              setActiveDayIdx((today.getDay() + 6) % 7);
            }}
            className="text-[11px] tracking-[0.25em] uppercase text-accent border border-accent/30 px-4 py-2 rounded-full hover:bg-accent hover:text-white transition-colors"
          >
            Today
          </button>
        )}
      </div>

      {/* View toggle + legend. Toggle determines whether we render the
          time-block week (current week, hour grid) or a flat list view
          (same week, sorted chronologically, no grid). */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="inline-flex bg-cream border border-charcoal/10 rounded-full p-0.5">
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
              {mode}
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

      {viewMode === "week" ? (
        <>
          {/* Desktop: 7-column week, each column stacks its day's cards */}
          <div className="hidden md:block">
            <WeekGrid
              days={days}
              classesByDay={classesByDay}
              today={today}
              onSelect={setActiveClass}
            />
          </div>

          {/* Mobile: day tabs + per-day list */}
          <div className="md:hidden">
            <DayList
              days={days}
              activeDayIdx={activeDayIdx}
              setActiveDayIdx={setActiveDayIdx}
              classesByDay={classesByDay}
              today={today}
              onSelect={setActiveClass}
            />
          </div>
        </>
      ) : (
        // List view. Same week scope, but flat: all classes for the
        // visible week as a clean chronological list, grouped by day
        // header. Works the same on mobile and desktop — simpler scan.
        <ListView
          days={days}
          classesByDay={classesByDay}
          today={today}
          onSelect={setActiveClass}
        />
      )}

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

  return (
    <div className="grid grid-cols-7 gap-3">
      {days.map((d) => {
        const dayClasses = classesByDay.get(dayKey(d)) || [];
        const isToday = sameYMD(d, today);
        return (
          <div key={d.toISOString()} className="flex flex-col">
            <div
              className={`text-center pb-3 mb-3 border-b ${
                isToday ? "border-accent" : "border-charcoal/10"
              }`}
            >
              <p
                className={`text-xs tracking-[0.3em] uppercase font-medium ${
                  isToday ? "text-accent" : "text-charcoal/70"
                }`}
              >
                {fmtWeekday(d)}
              </p>
              <p
                className={`font-serif text-3xl font-light leading-tight mt-1 ${
                  isToday ? "text-accent" : "text-charcoal"
                }`}
              >
                {d.getDate()}
              </p>
            </div>
            {dayClasses.length === 0 ? (
              <div className="text-center text-xs text-muted/60 italic mt-2">—</div>
            ) : (
              <div className="space-y-2.5">
                {dayClasses.map((c) => (
                  <ClassCard
                    key={c.id}
                    cls={c}
                    onClick={() => onSelect(c)}
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// Stacked card used inside each day column. Heavy left bar in the type
// color is the at-a-glance category cue.
//
// Card height scales with class duration so a 3-hour event reads as
// visually heavier than a 50-minute class — even without the time grid,
// you can see at a glance that an evening is committed vs. a quick
// drop-in. min-height floor keeps short classes substantial; multiplier
// keeps long events visually weighted. Current: 110px floor, 1.5×
// multiplier → 50 min → 110px, 90 min → 135px, 180 min → 270px.
function ClassCard({
  cls,
  onClick,
}: {
  cls: ScheduleClass;
  onClick: () => void;
}) {
  const start = new Date(cls.startISO);
  const end = new Date(cls.endISO);
  const style = CLASS_TYPE_STYLES[cls.type];
  const minHeight = Math.max(110, Math.round(cls.durationMin * 1.5));

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left rounded-sm px-4 py-4 transition-shadow hover:shadow-md flex flex-col"
      style={{
        background: style.bgSoft,
        borderLeft: `4px solid ${style.border}`,
        minHeight,
      }}
    >
      <p
        className="text-xs tracking-[0.2em] uppercase font-semibold leading-tight"
        style={{ color: style.text }}
      >
        {fmtTime(start)}
      </p>
      <p className="text-[10px] tracking-[0.2em] uppercase text-charcoal/55 mt-0.5 leading-tight">
        to {fmtTime(end)}
      </p>
      <p className="font-serif text-[15px] text-charcoal leading-snug mt-2">
        {cls.title}
      </p>
      <p className="text-[11px] text-charcoal/55 leading-snug mt-1.5 italic">
        {displayLocation(cls.location)}
      </p>
    </button>
  );
}

// ----------------------- day list (mobile) -----------------------

function DayList({
  days,
  activeDayIdx,
  setActiveDayIdx,
  classesByDay,
  today,
  onSelect,
}: {
  days: Date[];
  activeDayIdx: number;
  setActiveDayIdx: (n: number) => void;
  classesByDay: Map<string, ScheduleClass[]>;
  today: Date;
  onSelect: (c: ScheduleClass) => void;
}) {
  const dayKey = (d: Date) =>
    d.toLocaleDateString("en-CA", { timeZone: TZ });
  const activeDay = days[activeDayIdx];
  const dayClasses = classesByDay.get(dayKey(activeDay)) || [];

  return (
    <div>
      {/* Day tabs */}
      <div className="grid grid-cols-7 border border-charcoal/10 rounded-sm overflow-hidden mb-5">
        {days.map((d, i) => {
          const isActive = i === activeDayIdx;
          const isToday = sameYMD(d, today);
          const count = classesByDay.get(dayKey(d))?.length || 0;
          return (
            <button
              key={d.toISOString()}
              type="button"
              onClick={() => setActiveDayIdx(i)}
              className={`flex flex-col items-center py-3 border-r last:border-r-0 border-charcoal/10 transition-colors ${
                isActive
                  ? "bg-accent text-white"
                  : isToday
                    ? "bg-accent/5 text-accent"
                    : "bg-warm-white text-charcoal hover:bg-cream/50"
              }`}
            >
              <span className="text-[11px] tracking-[0.25em] uppercase font-medium opacity-90">
                {fmtWeekday(d).slice(0, 3)}
              </span>
              <span className="font-serif text-xl font-light leading-tight mt-1">
                {d.getDate()}
              </span>
              <span
                className={`text-[10px] tracking-widest uppercase mt-1 ${
                  isActive ? "text-white/70" : "text-muted"
                }`}
              >
                {count > 0 ? `${count}` : "—"}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected day's class list */}
      {dayClasses.length === 0 ? (
        <div className="text-center py-12 text-sm text-muted border border-dashed border-charcoal/15 rounded-sm">
          No classes {sameYMD(activeDay, today) ? "today" : `on ${fmtWeekday(activeDay, "long")}`}.
        </div>
      ) : (
        <ul className="space-y-3">
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
                  <div className="shrink-0 w-20">
                    <p
                      className="text-xs tracking-widest uppercase font-medium"
                      style={{ color: style.text }}
                    >
                      {fmtTime(start)}
                    </p>
                    <p className="text-[10px] tracking-widest uppercase text-muted mt-0.5">
                      {fmtTime(end)}
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
                    <p className="text-[11px] text-charcoal/55 leading-snug mt-1 italic">
                      {displayLocation(c.location)}
                    </p>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

// ----------------------- list view (both viewports) -----------------------

// Flat chronological list of the week's classes, grouped by day header.
// Renders the same on mobile and desktop — no time-block positioning,
// no day columns, no hour grid. The simplest possible "what's on this
// week" surface for people who don't want to interpret a grid.
function ListView({
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
      <div className="text-center py-16 text-muted border border-dashed border-charcoal/15 rounded-sm max-w-lg mx-auto">
        <p className="font-serif text-lg text-charcoal mb-2">No classes this week.</p>
        <p className="text-sm">
          Try the arrow keys above to peek ahead.
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
                      className="w-full text-left flex items-center gap-4 px-4 py-3.5 rounded-sm transition-shadow hover:shadow-md"
                      style={{
                        background: style.bgSoft,
                        borderLeft: `4px solid ${style.border}`,
                      }}
                    >
                      <div className="shrink-0 w-24">
                        <p
                          className="text-xs tracking-widest uppercase font-semibold"
                          style={{ color: style.text }}
                        >
                          {fmtTime(start)}
                        </p>
                        <p className="text-[10px] tracking-widest uppercase text-muted">
                          to {fmtTime(end)}
                        </p>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-serif text-base text-charcoal leading-tight">
                          {c.title}
                        </p>
                        <p className="text-[11px] text-charcoal/55 leading-snug mt-1 italic">
                          {displayLocation(c.location)}
                        </p>
                      </div>
                      <span
                        className="hidden sm:inline-block text-[10px] tracking-[0.25em] uppercase px-2 py-0.5 rounded-full shrink-0"
                        style={{
                          background: style.bgChip,
                          color: style.text,
                        }}
                      >
                        {style.label}
                      </span>
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
