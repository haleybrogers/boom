import { NextResponse } from "next/server";
import { fetchMomenceEvents, eventToScheduleClass } from "@/lib/momence";

// Returns upcoming classes for a date range, in the shape LiveSchedule expects.
// Previously hit Sutra; now hits Momence directly. Filtering happens here
// because the Momence Events endpoint doesn't honor start/end query params.
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const todayStr = new Date().toISOString().split("T")[0];
  const startDate = searchParams.get("start") || todayStr;

  const end = new Date(startDate);
  end.setDate(end.getDate() + 7);
  const defaultEnd = end.toISOString().split("T")[0];
  const endDate = searchParams.get("end") || defaultEnd;

  const startMs = new Date(startDate).getTime();
  // endDate is exclusive — add 24h so the last day in range is included
  const endMs = new Date(endDate).getTime() + 24 * 60 * 60 * 1000;

  try {
    const events = await fetchMomenceEvents();
    const classes = events
      .filter((e) => {
        const t = new Date(e.dateTime).getTime();
        return t >= startMs && t < endMs;
      })
      .map(eventToScheduleClass);

    return NextResponse.json({ classes });
  } catch {
    return NextResponse.json({ error: "Failed to fetch classes" }, { status: 500 });
  }
}
