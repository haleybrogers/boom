// Instructor name -> headshot lookup. Names must match Momence's
// `teacher` field exactly (see the About page for the same names/photos).
// Unrecognized names (typos, a new hire not yet added here) just render
// without a photo rather than breaking.

export type InstructorPhoto = {
  src: string;
  // Tailwind object-position + scale classes tuned per-photo so a small
  // square avatar crop (schedule thumbnail) still centers the face —
  // each source photo is a tall portrait framed differently on the About
  // page, so a single generic crop doesn't work for all four.
  className: string;
};

export const INSTRUCTOR_PHOTOS: Record<string, InstructorPhoto> = {
  "Emilie Young": {
    src: "/emilie-young.jpg",
    className: "object-cover",
  },
  "Annie Young": {
    src: "/annie-young.jpg",
    className: "object-cover",
  },
  "Emma Rose Farmer": {
    src: "/emma-rose-farmer.png",
    className: "object-cover",
  },
  "Sarah Janae": {
    src: "/sarah-janae.jpg",
    className: "object-cover",
  },
};

export function instructorPhoto(name?: string | null): InstructorPhoto | undefined {
  if (!name) return undefined;
  return INSTRUCTOR_PHOTOS[name.trim()];
}
