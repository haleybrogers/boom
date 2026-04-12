import { NextResponse } from "next/server";

const PARTNER_ID = "DQjbWncLh7aAIdyEcb9Mw1dnaiC3";
const API_KEY = "a028a011-c1c8-46f4-abc9-28088fd58851";
const BASE_URL = `https://us-central1-sutra-prod.cloudfunctions.net/partnerApi/v0/${PARTNER_ID}`;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const startDate = searchParams.get("start") || new Date().toISOString().split("T")[0];

  // Default to 7 days from start
  const end = new Date(startDate);
  end.setDate(end.getDate() + 7);
  const endDate = searchParams.get("end") || end.toISOString().split("T")[0];

  try {
    const res = await fetch(
      `${BASE_URL}/classes?start_date=${startDate}&end_date=${endDate}&limit=50`,
      {
        headers: { "X-API-Key": API_KEY },
        next: { revalidate: 300 }, // cache for 5 minutes
      }
    );

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch classes" }, { status: res.status });
    }

    const data = await res.json();

    // Filter out deleted and canceled classes
    const classes = (data.items || []).filter(
      (cls: { deleted?: boolean; canceled?: boolean }) => !cls.deleted && !cls.canceled
    );

    return NextResponse.json({ classes });
  } catch {
    return NextResponse.json({ error: "Failed to fetch classes" }, { status: 500 });
  }
}
