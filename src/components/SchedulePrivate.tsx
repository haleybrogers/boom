"use client";

// Privates booking — Momence-native.
//
// Previously had a reveal-the-iframe flow with per-instructor filtering
// against Arketa's embed. Momence doesn't ship an equivalent appointments
// plugin (Studio Setup → Plugins doesn't expose one for direct embed at
// time of writing), so this is the simpler honest version: keep the
// instructor cards as context, send the booking flow out to Momence.
//
// If/when an appointments embed snippet appears in the dashboard (same
// `<div>` + `<script>` pattern as host-schedule), drop it in here as a
// MomenceAppointments component and replace the CTA with the embed.

const MOMENCE_HOST_URL = `https://momence.com/host/${process.env.NEXT_PUBLIC_MOMENCE_HOST_ID || "270195"}`;

type Instructor = {
  name: string;
  role: string;
  bio: string;
};

const instructors: Instructor[] = [
  {
    name: "Emilie Young",
    role: "Co-Founder",
    bio: "3rd Generation Classical Pilates. Comprehensively certified in mat and full apparatus.",
  },
  {
    name: "Annie Young",
    role: "Co-Founder",
    bio: "Classical Pilates certified in mat and apparatus. Trained in the direct lineage of Joseph Pilates. Passionate about making the method accessible to every body.",
  },
  {
    name: "Instructor TBD",
    role: "Instructor",
    bio: "More details coming soon.",
  },
];

export default function SchedulePrivate() {
  return (
    <div className="max-w-5xl mx-auto px-6">
      <div className="text-center mb-12">
        <p className="text-xs tracking-widest uppercase text-accent mb-3">
          By Appointment
        </p>
        <h2 className="font-serif text-2xl md:text-3xl font-light text-charcoal mb-3">
          Schedule a Private or Duet
        </h2>
        <p className="text-muted text-sm max-w-lg mx-auto mb-6">
          The most personalized Pilates experience we offer. Your instructor
          builds every session around your body, your goals, and where you are
          in your practice — using the full range of classical apparatus.
        </p>
        <div className="flex justify-center gap-8">
          <div className="text-center">
            <p className="text-xs text-muted">Private · 50 min</p>
            <p className="text-[11px] text-muted/60 mt-0.5">1 student · Full apparatus</p>
          </div>
          <div className="w-px bg-charcoal/10" />
          <div className="text-center">
            <p className="text-xs text-muted">Duet · 50 min</p>
            <p className="text-[11px] text-muted/60 mt-0.5">2 students · Full apparatus</p>
          </div>
        </div>
      </div>

      {/* Instructor cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 max-w-4xl mx-auto">
        {instructors.map((inst) => (
          <div
            key={inst.name}
            className="bg-white border border-charcoal/10 rounded-sm p-5 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-11 h-11 rounded-full bg-accent/10 text-accent flex items-center justify-center font-serif">
                {inst.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <p className="font-serif text-base font-light text-charcoal leading-tight">
                  {inst.name}
                </p>
                <p className="text-[11px] tracking-widest uppercase text-accent mt-0.5">
                  {inst.role}
                </p>
              </div>
            </div>
            <p className="text-sm text-muted leading-relaxed">{inst.bio}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center">
        <a
          href={MOMENCE_HOST_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-animated inline-block bg-accent text-white text-xs tracking-widest uppercase px-8 py-3.5 hover:bg-accent/90 transition-colors"
        >
          Book on Momence
        </a>
        <p className="text-[11px] text-muted/70 mt-3">
          Opens in a new tab.
        </p>
      </div>
    </div>
  );
}
