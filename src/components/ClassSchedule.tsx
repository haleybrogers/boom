"use client";

import { useState } from "react";
import Button from "./Button";

type ClassInfo = {
  fullName: string;
  description: string;
  level: string;
  duration: string;
};

const classInfo: Record<string, ClassInfo> = {
  Mat: {
    fullName: "Mat Pilates",
    description: "A full-body mat class building core strength, posture, and flexibility using your own body weight.",
    level: "All Levels",
    duration: "55 min",
  },
  Reformer: {
    fullName: "Reformer Flow",
    description: "Spring-loaded resistance training on the reformer. Sculpts lean muscle and improves coordination.",
    level: "Intermediate",
    duration: "50 min",
  },
  Gentle: {
    fullName: "Gentle Restore",
    description: "Slow, mindful movement focused on mobility, breath, and gentle strengthening.",
    level: "Beginner",
    duration: "45 min",
  },
  Power: {
    fullName: "Power Reformer",
    description: "High-intensity reformer work pushing strength and endurance to new levels.",
    level: "Advanced",
    duration: "55 min",
  },
  Prenatal: {
    fullName: "Prenatal Pilates",
    description: "Safe, supportive exercises for expectant mothers. Maintain strength and ease discomfort.",
    level: "All Levels",
    duration: "45 min",
  },
};

const schedule = [
  { time: "6:00 AM", mon: "Mat", tue: "Reformer", wed: "Mat", thu: "Power", fri: "Mat", sat: "Reformer" },
  { time: "8:00 AM", mon: "Gentle", tue: "Mat", wed: "Reformer", thu: "Mat", fri: "Gentle", sat: "Mat" },
  { time: "10:00 AM", mon: "Reformer", tue: "Prenatal", wed: "Mat", thu: "Reformer", fri: "Prenatal", sat: "Gentle" },
  { time: "12:00 PM", mon: "Power", tue: "\u2014", wed: "Mat", thu: "\u2014", fri: "Power", sat: "\u2014" },
  { time: "5:30 PM", mon: "Reformer", tue: "Power", wed: "Reformer", thu: "Mat", fri: "\u2014", sat: "\u2014" },
  { time: "7:00 PM", mon: "Mat", tue: "Gentle", wed: "Mat", thu: "Mat", fri: "\u2014", sat: "\u2014" },
];

const days = ["mon", "tue", "wed", "thu", "fri", "sat"] as const;
const dayLabels: Record<string, string> = { mon: "Monday", tue: "Tuesday", wed: "Wednesday", thu: "Thursday", fri: "Friday", sat: "Saturday" };

// Instructor assignments keyed by "day-time"
const instructorMap: Record<string, string> = {
  "mon-6:00 AM": "Emilie", "tue-6:00 AM": "Annie", "wed-6:00 AM": "Emilie", "thu-6:00 AM": "Annie", "fri-6:00 AM": "Emilie", "sat-6:00 AM": "Annie",
  "mon-8:00 AM": "Annie", "tue-8:00 AM": "Emilie", "wed-8:00 AM": "Annie", "thu-8:00 AM": "Emilie", "fri-8:00 AM": "Annie", "sat-8:00 AM": "Emilie",
  "mon-10:00 AM": "Emilie", "tue-10:00 AM": "Emilie", "wed-10:00 AM": "Annie", "thu-10:00 AM": "Emilie", "fri-10:00 AM": "Emilie", "sat-10:00 AM": "Annie",
  "mon-12:00 PM": "Annie", "wed-12:00 PM": "Emilie", "fri-12:00 PM": "Annie",
  "mon-5:30 PM": "Emilie", "tue-5:30 PM": "Annie", "wed-5:30 PM": "Emilie", "thu-5:30 PM": "Annie",
  "mon-7:00 PM": "Annie", "tue-7:00 PM": "Emilie", "wed-7:00 PM": "Annie", "thu-7:00 PM": "Emilie",
};

type Selected = { row: number; col: string } | null;

export default function ClassSchedule() {
  const [selected, setSelected] = useState<Selected>(null);

  const selectedClass = selected
    ? schedule[selected.row][selected.col as keyof (typeof schedule)[0]] as string
    : null;
  const selectedInfo = selectedClass ? classInfo[selectedClass] : null;
  const selectedInstructor = selected
    ? instructorMap[`${selected.col}-${schedule[selected.row].time}`] ?? "Emilie"
    : null;
  const isOpen = selected !== null && selectedInfo !== null;

  return (
    <section id="schedule" className="py-24 lg:py-32 bg-warm-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-serif text-3xl font-light text-charcoal mb-12 text-center">
          Weekly Schedule
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-charcoal/10">
                <th className="pb-3 text-left text-xs tracking-widest uppercase text-muted font-medium">Time</th>
                {days.map((day) => (
                  <th key={day} className="pb-3 text-left text-xs tracking-widest uppercase text-muted font-medium">
                    {day.charAt(0).toUpperCase() + day.slice(1)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {schedule.map((row, rowIdx) => (
                <tr key={row.time} className="border-b border-charcoal/5">
                  <td className="py-3 text-sm font-medium text-charcoal">{row.time}</td>
                  {days.map((day) => {
                    const cls = row[day as keyof typeof row] as string;
                    const isEmpty = cls === "\u2014";
                    const isSelected = selected?.row === rowIdx && selected?.col === day;

                    return (
                      <td key={day} className="py-1">
                        {isEmpty ? (
                          <span className="block py-2 px-2 text-sm text-muted">{cls}</span>
                        ) : (
                          <button
                            onClick={() =>
                              setSelected(
                                isSelected ? null : { row: rowIdx, col: day }
                              )
                            }
                            className={`block w-full text-left py-2 px-2 text-sm rounded-sm transition-all duration-200 ${
                              isSelected
                                ? "bg-accent/10 text-accent font-medium"
                                : "text-muted hover:text-accent hover:bg-accent/5 cursor-pointer"
                            }`}
                          >
                            {cls}
                          </button>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Detail panel */}
        <div
          className={`overflow-hidden transition-all duration-400 ease-in-out ${
            isOpen ? "max-h-64 opacity-100 mt-8" : "max-h-0 opacity-0 mt-0"
          }`}
        >
          {selectedInfo && (
            <div className="bg-cream border border-charcoal/10 rounded-sm p-8 flex flex-col md:flex-row md:items-start gap-6">
              <div className="flex-1">
                <div className="flex items-baseline gap-3 mb-2">
                  <h3 className="font-serif text-2xl font-light text-charcoal">
                    {selectedInfo.fullName}
                  </h3>
                  <span className="text-xs tracking-widest uppercase text-muted">
                    {selectedInfo.level}
                  </span>
                </div>
                <p className="text-sm text-muted leading-relaxed mb-1">
                  {selectedInfo.description}
                </p>
                <p className="text-sm text-muted">
                  {selectedInfo.duration} &middot;{" "}
                  {selected && dayLabels[selected.col]}{" "}
                  {selected && schedule[selected.row].time}
                </p>
              </div>
              <div className="flex flex-col items-start md:items-end gap-3 md:min-w-[160px]">
                <p className="text-sm text-charcoal font-medium">
                  with {selectedInstructor}
                </p>
                <Button href="/#waitlist">Join Waitlist</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
