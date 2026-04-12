"use client";

import { useState, useEffect, useCallback } from "react";

type ClassItem = {
  id: string;
  name: string;
  description: string;
  start_time: string;
  duration: number;
  max_capacity: number;
  total_booked: number;
  instructor_name: string;
};

function getWeekStart(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay(); // 0=Sun
  d.setDate(d.getDate() - day);
  d.setHours(0, 0, 0, 0);
  return d;
}

function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

function formatTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
}

function formatDayShort(date: Date): string {
  return date.toLocaleDateString("en-US", { weekday: "short" });
}

function formatDayNum(date: Date): string {
  return date.getDate().toString();
}

function formatMonthRange(start: Date, end: Date): string {
  const opts: Intl.DateTimeFormatOptions = { month: "long", year: "numeric" };
  if (start.getMonth() === end.getMonth()) {
    return start.toLocaleDateString("en-US", opts);
  }
  return `${start.toLocaleDateString("en-US", { month: "short" })} – ${end.toLocaleDateString("en-US", opts)}`;
}

export default function LiveSchedule() {
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [weekStart, setWeekStart] = useState(() => getWeekStart(new Date()));
  const [selectedClass, setSelectedClass] = useState<ClassItem | null>(null);

  const fetchClasses = useCallback(async () => {
    setLoading(true);
    setSelectedClass(null);
    const end = new Date(weekStart);
    end.setDate(end.getDate() + 7);
    try {
      const res = await fetch(`/api/classes?start=${formatDate(weekStart)}&end=${formatDate(end)}`);
      const data = await res.json();
      setClasses(data.classes || []);
    } catch {
      setClasses([]);
    }
    setLoading(false);
  }, [weekStart]);

  useEffect(() => {
    fetchClasses();
  }, [fetchClasses]);

  const prevWeek = () => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() - 7);
    setWeekStart(d);
  };

  const nextWeek = () => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + 7);
    setWeekStart(d);
  };

  // Group classes by day
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + i);
    return d;
  });

  const classesByDay = days.map((day) => {
    const dayStr = formatDate(day);
    return classes
      .filter((c) => c.start_time.startsWith(dayStr))
      .sort((a, b) => a.start_time.localeCompare(b.start_time));
  });

  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 6);

  return (
    <div>
      {/* Week navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={prevWeek}
          className="p-2 text-charcoal/50 hover:text-accent transition-colors"
          aria-label="Previous week"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h3 className="font-serif text-lg font-light text-charcoal">
          {formatMonthRange(weekStart, weekEnd)}
        </h3>
        <button
          onClick={nextWeek}
          className="p-2 text-charcoal/50 hover:text-accent transition-colors"
          aria-label="Next week"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block w-6 h-6 border-2 border-charcoal/20 border-t-accent rounded-full animate-spin" />
        </div>
      ) : (
        <>
          {/* Day columns */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {days.map((day, i) => {
              const isToday = formatDate(day) === formatDate(new Date());
              const hasClasses = classesByDay[i].length > 0;
              return (
                <div
                  key={i}
                  className={`text-center py-2 rounded-sm ${
                    isToday ? "bg-accent/10" : ""
                  }`}
                >
                  <p className="text-xs tracking-widest uppercase text-muted">
                    {formatDayShort(day)}
                  </p>
                  <p className={`font-serif text-xl font-light ${
                    isToday ? "text-accent" : hasClasses ? "text-charcoal" : "text-charcoal/30"
                  }`}>
                    {formatDayNum(day)}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Class cards by day */}
          <div className="grid grid-cols-7 gap-2 items-start">
            {classesByDay.map((dayClasses, i) => (
              <div key={i} className="space-y-2 min-h-[80px]">
                {dayClasses.map((cls) => {
                  const spotsLeft = cls.max_capacity - cls.total_booked;
                  const isSelected = selectedClass?.id === cls.id;
                  return (
                    <button
                      key={cls.id}
                      onClick={() => setSelectedClass(isSelected ? null : cls)}
                      className={`w-full text-left p-3 rounded-sm text-sm leading-snug transition-all duration-200 ${
                        isSelected
                          ? "bg-accent text-white shadow-sm"
                          : "bg-cream hover:bg-accent/10 text-charcoal border border-charcoal/5"
                      }`}
                    >
                      <p className={`font-medium ${isSelected ? "text-white" : "text-charcoal"}`}>
                        {cls.name.replace("Open Level ", "").replace("Classical ", "")}
                      </p>
                      <p className={`mt-1 ${isSelected ? "text-white/70" : "text-muted"}`}>
                        {formatTime(cls.start_time)}
                      </p>
                      <p className={`text-xs mt-0.5 ${isSelected ? "text-white/60" : "text-muted/70"}`}>
                        {spotsLeft} spots left
                      </p>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          {/* No classes message */}
          {classes.length === 0 && (
            <p className="text-center text-sm text-muted py-8">
              No classes scheduled this week. Check back soon.
            </p>
          )}

          {/* Selected class detail */}
          <div
            className={`overflow-hidden transition-all duration-400 ease-in-out ${
              selectedClass ? "max-h-80 opacity-100 mt-6" : "max-h-0 opacity-0 mt-0"
            }`}
          >
            {selectedClass && (
              <div className="bg-cream border border-charcoal/10 rounded-sm p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    <h4 className="font-serif text-xl font-light text-charcoal mb-1">
                      {selectedClass.name}
                    </h4>
                    <p className="text-xs text-muted mb-3">
                      {formatTime(selectedClass.start_time)} · {selectedClass.duration} min · {selectedClass.instructor_name}
                    </p>
                    <p className="text-sm text-muted leading-relaxed">
                      {selectedClass.description}
                    </p>
                  </div>
                  <div className="text-center sm:text-right shrink-0">
                    <p className="text-xs text-muted mb-2">
                      {selectedClass.max_capacity - selectedClass.total_booked} of {selectedClass.max_capacity} spots left
                    </p>
                    <a
                      href="https://app.arketa.co/boomerangpilates/schedule"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-accent text-white px-5 py-2.5 text-xs tracking-wide rounded-sm hover:bg-accent/85 transition-colors"
                    >
                      Book This Class
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
