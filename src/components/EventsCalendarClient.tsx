"use client";

// Unified events calendar — featured cards row + agenda grid below,
// with a click-to-expand detail modal. The modal hosts whatever action
// the event needs: inline ContactForm (RSVP), external book link, or
// just an "opens for booking soon" note.

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
      className={`inline-block text-[9px] tracking-[0.25em] uppercase border ${color} rounded-full px-2.5 py-1`}
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
      {/* Image strip — featured events only */}
      {event.image && (
        <div className="relative w-full aspect-[16/9] overflow-hidden">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      )}
      <div className="flex flex-col p-7 md:p-9 flex-1">
        <div className="flex items-start justify-between mb-6">
          <div className="flex flex-col">
            <span className="text-[10px] tracking-[0.3em] text-accent uppercase">
              {date.weekday}
            </span>
            <span className="font-serif text-4xl md:text-5xl text-charcoal leading-none mt-1">
              {date.month} {date.day}
            </span>
          </div>
          <CategoryPill category={event.category} />
        </div>
        <h3 className="font-serif text-2xl md:text-3xl font-light text-charcoal leading-tight mb-2">
          {event.title}
        </h3>
        {event.heroNote && (
          <p className="font-serif italic text-sm text-charcoal/60 mb-4">
            {event.heroNote}
          </p>
        )}
        <p className="text-sm text-muted leading-relaxed mb-6 flex-1">
          {event.shortDescription || event.description}
        </p>
        <div className="flex items-center justify-between pt-4 border-t border-charcoal/10">
          <span className="text-xs text-muted">
            {formatTimeRange(event.dateTime, event.durationMin)} · {event.price}
          </span>
          <span className="text-[10px] tracking-widest uppercase text-accent group-hover:text-accent/80 transition-colors">
            Details →
          </span>
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
      {/* Optional small image strip */}
      {event.image && (
        <div className="relative w-full aspect-[16/9] overflow-hidden">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      )}
      <div className="flex flex-col p-6 flex-1">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-baseline gap-2">
            <span className="text-[10px] tracking-[0.25em] text-accent uppercase">
              {date.weekday}
            </span>
            <span className="font-serif text-lg text-charcoal">
              {date.month} {date.day}
            </span>
          </div>
          <CategoryPill category={event.category} />
        </div>
        {event.partLabel && (
          <p className="text-[10px] tracking-[0.2em] uppercase text-accent/80 mb-2">
            {event.partLabel}
          </p>
        )}
        <h3 className="font-serif text-lg font-light text-charcoal leading-snug mb-2">
          {event.title}
        </h3>
        {event.shortDescription && (
          <p className="text-xs text-muted leading-relaxed mb-4 flex-1">
            {event.shortDescription}
          </p>
        )}
        {!event.shortDescription && <div className="flex-1" />}
        <div className="flex items-center justify-between border-t border-charcoal/5 pt-3 mt-auto">
          <span className="text-xs text-muted">
            {formatTimeRange(event.dateTime, event.durationMin)} · {event.price}
          </span>
          <span className="text-[10px] tracking-widest uppercase text-accent group-hover:text-accent/80 transition-colors">
            Details →
          </span>
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

        {/* Hero image — only shown in details view, not in RSVP form view */}
        {event.image && !showRsvp && (
          <div className="relative w-full aspect-[16/9] overflow-hidden">
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover"
              sizes="512px"
              priority
            />
          </div>
        )}

        <div className="px-7 sm:px-9 py-9">
          {/* If we're in RSVP mode, swap the body for the form. */}
          {showRsvp && event.action.type === "rsvp-party" ? (
            <>
              <button
                type="button"
                onClick={() => setShowRsvp(false)}
                className="text-[10px] tracking-widest uppercase text-accent/70 hover:text-accent transition-colors mb-5"
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
              <div className="mb-5 flex flex-wrap items-center gap-2">
                <CategoryPill category={event.category} />
                {event.partLabel && (
                  <span className="text-[9px] tracking-[0.25em] uppercase border border-charcoal/15 text-charcoal/60 bg-white rounded-full px-2.5 py-1">
                    {event.partLabel}
                  </span>
                )}
              </div>
              <p className="text-xs tracking-widest uppercase text-accent mb-3">
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
                      <p className="text-[10px] tracking-[0.25em] uppercase text-accent mb-1">
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

              {/* Action */}
              {event.action.type === "rsvp-party" && (
                <button
                  type="button"
                  onClick={() => setShowRsvp(true)}
                  className="btn-animated w-full block bg-accent text-white text-xs tracking-widest uppercase px-8 py-3.5 hover:bg-accent/90 transition-colors"
                >
                  RSVP to the Opening Party
                </button>
              )}
              {event.action.type === "external" && (
                <a
                  href={event.action.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-animated w-full block text-center bg-accent text-white text-xs tracking-widest uppercase px-8 py-3.5 hover:bg-accent/90 transition-colors"
                >
                  {event.action.label || "Book →"}
                </a>
              )}
              {event.action.type === "info-only" && (
                <p className="text-center text-xs text-muted/80 italic border-t border-charcoal/5 pt-5">
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

type FilterValue = "all" | EventCategory;

function FilterBtn({
  value,
  label,
  active,
  onClick,
}: {
  value: FilterValue;
  label: string;
  active: boolean;
  onClick: (v: FilterValue) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onClick(value)}
      className={`text-[10px] tracking-[0.25em] uppercase border rounded-full px-3.5 py-1.5 transition-colors ${
        active
          ? "border-accent text-white bg-accent"
          : "border-charcoal/15 text-charcoal/60 bg-white hover:border-accent/40 hover:text-accent"
      }`}
    >
      {label}
    </button>
  );
}

export default function EventsCalendarClient({
  events,
}: {
  events: EventItem[];
}) {
  const [activeEvent, setActiveEvent] = useState<EventItem | null>(null);
  const [filter, setFilter] = useState<FilterValue>("all");

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

  const visible = useMemo(
    () => events.filter((e) => filter === "all" || e.category === filter),
    [events, filter]
  );

  const featured = visible.filter((e) => e.featured);
  const rest = visible.filter((e) => !e.featured);

  if (events.length === 0) {
    return (
      <p className="text-center text-sm text-muted">
        New events drop regularly — check back soon.
      </p>
    );
  }

  return (
    <>
      {/* Filter pills */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        <FilterBtn value="all" label="All" active={filter === "all"} onClick={setFilter} />
        <FilterBtn
          value="soft-opening"
          label="Soft Opening · In the new space"
          active={filter === "soft-opening"}
          onClick={setFilter}
        />
        <FilterBtn
          value="around-town"
          label="Around Town"
          active={filter === "around-town"}
          onClick={setFilter}
        />
      </div>

      {/* Featured row — Opening Party + Craft Night get the spotlight */}
      {featured.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {featured.map((event) => (
            <FeaturedCard
              key={event.id}
              event={event}
              onClick={() => setActiveEvent(event)}
            />
          ))}
        </div>
      )}

      {/* Agenda — everything else, chronological */}
      {rest.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {rest.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onClick={() => setActiveEvent(event)}
            />
          ))}
        </div>
      ) : (
        featured.length === 0 && (
          <p className="text-center text-sm text-muted">
            Nothing in this category yet — check back soon.
          </p>
        )
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
