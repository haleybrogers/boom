"use client";

// /events calendar — three sections in order:
//   1. Opening Week    — soft-opening events excluding Opening Party (grid)
//   2. Opening Night   — Opening Party, full-width hero with photo + RSVP button
//   3. Pop-ups         — around-town events (grid)
// Every card opens the EventDetailModal where the full description, details
// tiles, and the actual action (RSVP / book / info-only) live.

import { useState, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import type { EventItem, EventCategory } from "@/lib/eventTypes";
import { CATEGORY_LABELS } from "@/lib/eventTypes";
import ContactForm from "./ContactForm";

const TZ = "America/New_York";

function formatDateBadge(iso: string) {
  const d = new Date(iso);
  return {
    month: d
      .toLocaleDateString("en-US", { month: "short", timeZone: TZ })
      .toUpperCase(),
    day: d.toLocaleDateString("en-US", { day: "numeric", timeZone: TZ }),
    weekday: d
      .toLocaleDateString("en-US", { weekday: "short", timeZone: TZ })
      .toUpperCase(),
  };
}

function formatFullDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: TZ,
  });
}

function formatTimeRange(iso: string, durationMin?: number) {
  const start = new Date(iso);
  const opts: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: TZ,
  };
  const s = start.toLocaleTimeString("en-US", opts);
  if (!durationMin) return s;
  const end = new Date(start.getTime() + durationMin * 60_000);
  return `${s} – ${end.toLocaleTimeString("en-US", opts)}`;
}

function CategoryPill({ category }: { category: EventCategory }) {
  const color =
    category === "soft-opening"
      ? "border-accent/30 text-accent bg-accent/5"
      : "border-charcoal/15 text-charcoal/60 bg-white";
  return (
    <span
      className={`inline-block text-[10px] tracking-[0.25em] uppercase border ${color} rounded-full px-2.5 py-1`}
    >
      {CATEGORY_LABELS[category]}
    </span>
  );
}

function FeaturedCard({
  event,
  onClick,
}: {
  event: EventItem;
  onClick: () => void;
}) {
  const date = formatDateBadge(event.dateTime);
  return (
    <button
      type="button"
      onClick={onClick}
      className="group text-left flex flex-col bg-warm-white border-2 border-accent/25 rounded-sm overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-accent/50"
    >
      <div className="flex flex-col p-7 md:p-9 flex-1">
        <div className="flex items-start mb-6">
          <div className="flex flex-col">
            <span className="text-[11px] tracking-[0.3em] text-accent uppercase">
              {date.weekday}
            </span>
            <span className="font-serif text-4xl md:text-5xl text-charcoal leading-none mt-1">
              {date.month} {date.day}
            </span>
          </div>
        </div>
        <h3 className="font-serif text-2xl md:text-3xl font-light text-charcoal leading-tight mb-2">
          {event.title}
        </h3>
        {event.heroNote && (
          <p className="font-serif italic text-sm text-charcoal/60 mb-4">
            {event.heroNote}
          </p>
        )}
        <div className="flex-1" />
        <div className="border-t border-charcoal/10 pt-4 mt-auto">
          <p className="text-sm text-muted mb-2">
            {formatTimeRange(event.dateTime, event.durationMin)} · {event.price}
          </p>
          <p className="text-[11px] tracking-widest uppercase text-accent text-right group-hover:text-accent/80 transition-colors">
            Details →
          </p>
        </div>
      </div>
    </button>
  );
}

function EventCard({
  event,
  onClick,
}: {
  event: EventItem;
  onClick: () => void;
}) {
  const date = formatDateBadge(event.dateTime);
  return (
    <button
      type="button"
      onClick={onClick}
      className="group text-left flex flex-col bg-white border border-charcoal/10 rounded-sm overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-accent/30"
    >
      <div className="flex flex-col p-6 flex-1">
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-[11px] tracking-[0.25em] text-accent uppercase">
            {date.weekday}
          </span>
          <span className="font-serif text-lg text-charcoal">
            {date.month} {date.day}
          </span>
        </div>
        {event.partLabel && (
          <p className="text-[11px] tracking-[0.2em] uppercase text-accent/80 mb-2">
            {event.partLabel}
          </p>
        )}
        <h3 className="font-serif text-lg font-light text-charcoal leading-snug mb-2">
          {event.title}
        </h3>
        {event.residentsOnly && (
          <span className="self-start text-[10px] tracking-[0.25em] uppercase border border-accent/30 text-accent bg-accent/5 rounded-full px-2.5 py-1 mb-2">
            Residents Only
          </span>
        )}
        <div className="flex-1" />
        <div className="border-t border-charcoal/5 pt-3 mt-auto">
          <p className="text-sm text-muted mb-2">
            {formatTimeRange(event.dateTime, event.durationMin)} · {event.price}
          </p>
          <p className="text-[11px] tracking-widest uppercase text-accent text-right group-hover:text-accent/80 transition-colors">
            Details →
          </p>
        </div>
      </div>
    </button>
  );
}

function EventDetailModal({
  event,
  onClose,
}: {
  event: EventItem;
  onClose: () => void;
}) {
  const [showRsvp, setShowRsvp] = useState(false);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-charcoal/50 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-lg max-h-[90vh] bg-warm-white shadow-xl overflow-y-auto rounded-sm animate-fade-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-charcoal/40 hover:text-charcoal transition-colors z-20 bg-white/80 backdrop-blur-sm rounded-full p-1.5"
          aria-label="Close"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="px-7 sm:px-9 py-9">
          {/* If we're in RSVP mode, swap the body for the form. */}
          {showRsvp && event.action.type === "rsvp-party" ? (
            <>
              <button
                type="button"
                onClick={() => setShowRsvp(false)}
                className="text-[11px] tracking-widest uppercase text-accent/70 hover:text-accent transition-colors mb-5"
              >
                ← Back to details
              </button>
              <h3 className="font-serif text-2xl sm:text-3xl font-light text-charcoal mb-2">
                See you July 18.
              </h3>
              <p className="text-sm text-muted mb-7 leading-relaxed">
                Drop your info so we know to expect you. We&apos;ll send a
                reminder + the address as the party gets closer.
              </p>
              <ContactForm
                source="rsvp-party"
                sourceId={204606}
                showMessage={false}
                showGuests={true}
              />
            </>
          ) : (
            <>
              {event.partLabel && (
                <div className="mb-5">
                  <span className="text-[10px] tracking-[0.25em] uppercase border border-charcoal/15 text-charcoal/60 bg-white rounded-full px-2.5 py-1">
                    {event.partLabel}
                  </span>
                </div>
              )}
              <p className="text-sm tracking-widest uppercase text-accent mb-3">
                {formatFullDate(event.dateTime)}
              </p>
              <h3 className="font-serif text-2xl sm:text-3xl font-light text-charcoal mb-2 leading-tight">
                {event.title}
              </h3>
              {event.heroNote && (
                <p className="font-serif italic text-sm text-charcoal/60 mb-4">
                  {event.heroNote}
                </p>
              )}
              <p className="text-sm text-muted leading-relaxed mb-6">
                {event.description}
              </p>

              {/* Detail tiles (featured events only) */}
              {event.details && event.details.length > 0 && (
                <div className="grid grid-cols-1 gap-3 mb-6">
                  {event.details.map((d) => (
                    <div
                      key={d.label}
                      className="border border-charcoal/10 bg-white rounded-sm px-4 py-3"
                    >
                      <p className="text-[11px] tracking-[0.25em] uppercase text-accent mb-1">
                        {d.label}
                      </p>
                      <p className="text-sm text-charcoal/80 leading-relaxed">
                        {d.value}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Meta — time, location, price */}
              <div className="space-y-2 text-sm text-muted border-t border-charcoal/10 pt-5 mb-7">
                <p>
                  <span className="text-charcoal/50 inline-block w-20">Time</span>
                  {formatTimeRange(event.dateTime, event.durationMin)}
                </p>
                <p>
                  <span className="text-charcoal/50 inline-block w-20">Where</span>
                  {event.location}
                </p>
                <p>
                  <span className="text-charcoal/50 inline-block w-20">Price</span>
                  {event.price}
                </p>
              </div>

              {/* Residents-only disclaimer (above the action) */}
              {event.residentsOnly && (
                <p className="text-sm text-accent text-center mb-3 border border-accent/20 bg-accent/5 rounded-sm px-4 py-3">
                  Residents of <strong>{event.residentsOnly.building}</strong> only —
                  check with your front desk.
                </p>
              )}

              {/* Action */}
              {event.action.type === "rsvp-party" && (
                <button
                  type="button"
                  onClick={() => setShowRsvp(true)}
                  className="btn-animated w-full block bg-accent text-white text-sm tracking-widest uppercase px-8 py-3.5 hover:bg-accent/90 transition-colors"
                >
                  RSVP to the Opening Party
                </button>
              )}
              {event.action.type === "external" && (
                <a
                  href={event.action.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-animated w-full block text-center bg-accent text-white text-sm tracking-widest uppercase px-8 py-3.5 hover:bg-accent/90 transition-colors"
                >
                  {event.action.label || "Book →"}
                </a>
              )}
              {event.action.type === "info-only" && (
                <p className="text-center text-sm text-muted/80 italic border-t border-charcoal/5 pt-5">
                  {event.action.note}
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="text-center mb-10">
      <p className="text-[11px] tracking-[0.4em] uppercase text-accent mb-3">
        {kicker}
      </p>
      <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal">
        {title}
      </h2>
    </div>
  );
}

function OpeningNightHero({
  event,
  onClick,
}: {
  event: EventItem;
  onClick: () => void;
}) {
  const date = formatDateBadge(event.dateTime);
  const fullDate = formatFullDate(event.dateTime);
  return (
    <section className="bg-accent/5 border-y border-accent/15 py-16 lg:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-[11px] tracking-[0.4em] uppercase text-accent mb-8 text-center">
          Opening Night
        </p>
        <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
          {/* Photo */}
          {event.image && (
            <div className="relative w-full aspect-[4/5] overflow-hidden">
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          )}
          {/* Content */}
          <div>
            <div className="flex items-baseline gap-3 mb-5">
              <span className="text-[11px] tracking-[0.3em] text-accent uppercase">
                {date.weekday}
              </span>
              <span className="font-serif text-3xl md:text-4xl text-charcoal leading-none">
                {date.month} {date.day}
              </span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-charcoal leading-tight mb-3">
              {event.title}.
            </h2>
            {event.heroNote && (
              <p className="font-serif italic text-base md:text-lg text-charcoal/60 mb-5">
                {event.heroNote}
              </p>
            )}
            <p className="text-sm md:text-base text-muted leading-relaxed mb-7">
              {event.description}
            </p>
            <div className="space-y-1.5 text-sm text-muted mb-7 border-t border-accent/15 pt-5">
              <p>
                <span className="text-charcoal/50 inline-block w-20">When</span>
                {fullDate}
              </p>
              <p>
                <span className="text-charcoal/50 inline-block w-20">Time</span>
                {formatTimeRange(event.dateTime, event.durationMin)}
              </p>
              <p>
                <span className="text-charcoal/50 inline-block w-20">Where</span>
                {event.location}
              </p>
              <p>
                <span className="text-charcoal/50 inline-block w-20">Price</span>
                {event.price}
              </p>
            </div>
            <button
              type="button"
              onClick={onClick}
              className="btn-animated inline-block bg-accent text-white text-[11px] tracking-widest uppercase px-8 py-3.5 hover:bg-accent/90 transition-colors"
            >
              RSVP to the Opening Party
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function EventsCalendarClient({
  events,
}: {
  events: EventItem[];
}) {
  const [activeEvent, setActiveEvent] = useState<EventItem | null>(null);

  // Body scroll lock + Esc-to-close while modal is open
  useEffect(() => {
    if (!activeEvent) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveEvent(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [activeEvent]);

  // Bucket events into the three sections. Opening Night = the Opening Party
  // (identified by id so it survives any future `featured` flag changes).
  // Opening Week = everything else tagged soft-opening. Pop-ups = around-town.
  const openingNight = useMemo(
    () => events.find((e) => e.id === "opening-party"),
    [events]
  );
  const openingWeek = useMemo(
    () =>
      events.filter(
        (e) => e.category === "soft-opening" && e.id !== "opening-party"
      ),
    [events]
  );
  const popups = useMemo(
    () => events.filter((e) => e.category === "around-town"),
    [events]
  );

  if (events.length === 0) {
    return (
      <p className="text-center text-sm text-muted">
        New events drop regularly — check back soon.
      </p>
    );
  }

  return (
    <>
      {/* 1. Opening Week */}
      {openingWeek.length > 0 && (
        <section className="mb-16 lg:mb-24">
          <SectionHeader kicker="Soft Opening" title="Help us work out the kinks." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children">
            {openingWeek.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onClick={() => setActiveEvent(event)}
              />
            ))}
          </div>
        </section>
      )}

      {/* 2. Opening Night — full-width hero, breaks out of the calendar's max-width
          via negative-margin tricks so the section's accent background runs edge-to-edge. */}
      {openingNight && (
        <div className="mb-16 lg:mb-24 -mx-6">
          <OpeningNightHero
            event={openingNight}
            onClick={() => setActiveEvent(openingNight)}
          />
        </div>
      )}

      {/* 3. Pop-ups */}
      {popups.length > 0 && (
        <section>
          <SectionHeader kicker="Around Town" title="Pop-ups." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children">
            {popups.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onClick={() => setActiveEvent(event)}
              />
            ))}
          </div>
        </section>
      )}

      {/* Active modal — only set via client-side onClick, so we can safely
          reach document.body without a mounted guard (SSR never enters this branch). */}
      {activeEvent &&
        createPortal(
          <EventDetailModal
            event={activeEvent}
            onClose={() => setActiveEvent(null)}
          />,
          document.body
        )}
    </>
  );
}
