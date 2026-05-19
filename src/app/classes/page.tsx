import { redirect } from "next/navigation";

// /classes was the old home of the schedule + privates + packs combined page.
// Each is now its own route (/schedule, /privates, /packs). Permanent-redirect
// the old URL so any old bookmarks, share links, or external references
// land on the schedule.
export default function ClassesRedirect() {
  redirect("/schedule");
}
