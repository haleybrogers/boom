// Privates booking — instructor cards + "Book a Private" CTA that opens
// the booking site in a new tab. If/when an appointments embed snippet
// becomes available, drop it in here and replace the CTA.

// Momence has a per-host appointments URL — `momence.com/appointments/{id}`
// 302-redirects to `momence.com/{slug}/appointment-reservation/{id}` which is
// the actual reservation page. Using the redirect URL so we don't hard-code
// the slug.
const MOMENCE_APPOINTMENTS_URL = `https://momence.com/appointments/${process.env.NEXT_PUBLIC_MOMENCE_HOST_ID || "270195"}`;

type Instructor = {
  name: string;
  role: string;
  bio: string;
};

// Just the two of them for now — placeholder "Instructor TBD" card removed
// per Haley. Add a third entry here when a new instructor signs on (the
// grid below auto-balances if you do — md:grid-cols-3 is already commented
// in case 3 is the right count again).
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
];

export default function SchedulePrivate() {
  return (
    <div className="max-w-5xl mx-auto px-6">
      {/* Instructor cards — at the top now */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12 max-w-3xl mx-auto">
        {instructors.map((inst) => (
          <div
            key={inst.name}
            className="bg-white border border-charcoal/10 rounded-sm p-6 flex flex-col"
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

      {/* Description + duration callouts */}
      <div className="text-center mb-12">
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

      {/* CTA */}
      <div className="text-center">
        <a
          href={MOMENCE_APPOINTMENTS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-animated inline-block bg-accent text-white text-xs tracking-widest uppercase px-8 py-3.5 hover:bg-accent/90 transition-colors"
        >
          Book a Private
        </a>
        <p className="text-[11px] text-muted/70 mt-3">
          Opens in a new tab.
        </p>
      </div>
    </div>
  );
}
