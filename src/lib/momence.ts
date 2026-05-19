// Server-side Momence API client.
//
// Credentials live in env vars so they're not in the bundle and can be rotated
// without a code change. Local .env.local + Vercel project envs need:
//   MOMENCE_HOST_ID=270195
//   MOMENCE_API_TOKEN=da1030e20e
//
// API base per the boilerplate Momence ships from the dashboard (May 2026).
// Ribbon was acquired by Momence; momence.com/_api/primary returns the same
// data but is an internal path — api.withribbon.com is the documented one,
// so we use it for forward compatibility.

const MOMENCE_HOST_ID = process.env.MOMENCE_HOST_ID || "270195";
const MOMENCE_API_TOKEN = process.env.MOMENCE_API_TOKEN || "da1030e20e";
const MOMENCE_API_BASE = "https://api.withribbon.com/api/v1";

// Canonical public-facing URLs. Per-session bookings use /s/<id>; the host
// storefront lives at /host/<hostId>. If/when Momence gives Emilie a slugged
// vanity URL, swap that into HOST_PAGE_URL.
export const MOMENCE_HOST_PAGE_URL = `https://momence.com/host/${MOMENCE_HOST_ID}`;
export const momenceSessionUrl = (eventId: string | number) =>
  `https://momence.com/s/${eventId}`;

export type MomenceEvent = {
  id: number;
  title: string;
  description: string | null;
  type: string;
  link: string;
  dateTime: string; // ISO
  image1: string | null;
  image2: string | null;
  duration: number; // minutes
  fixedPrice: number;
  online: boolean;
  location: string | null;
  isCancelled: boolean;
  isDeleted: boolean;
  allowWaitlist: boolean;
  capacity: number | null;
  spotsRemaining: number | null;
  ticketsSold: number;
  hostId: number;
  published: boolean;
  teacherId: number | null;
  teacher: string | null;
  additionalTeachers: Array<{ firstName: string; lastName: string }>;
};

// Shape consumed by LiveSchedule.tsx — kept stable across vendor swaps so the
// UI doesn't need to change every time we switch booking platforms.
export type ScheduleClass = {
  id: string;
  name: string;
  description: string;
  start_time: string;
  duration: number;
  max_capacity: number;
  total_booked: number;
  instructor_name: string;
};

export function eventToScheduleClass(event: MomenceEvent): ScheduleClass {
  const capacity = event.capacity ?? 0;
  const remaining = event.spotsRemaining ?? capacity;
  return {
    id: String(event.id),
    name: event.title,
    description: event.description ?? "",
    start_time: event.dateTime,
    duration: event.duration,
    max_capacity: capacity,
    total_booked: capacity > 0 ? capacity - remaining : event.ticketsSold,
    instructor_name: event.teacher ?? "",
  };
}

export async function fetchMomenceEvents(): Promise<MomenceEvent[]> {
  const url = `${MOMENCE_API_BASE}/Events?hostId=${MOMENCE_HOST_ID}&token=${MOMENCE_API_TOKEN}`;
  const res = await fetch(url, { next: { revalidate: 300 } });
  if (!res.ok) {
    throw new Error(`Momence Events fetch failed: ${res.status}`);
  }
  const events = (await res.json()) as MomenceEvent[];
  return events.filter((e) => !e.isCancelled && !e.isDeleted && e.published);
}
