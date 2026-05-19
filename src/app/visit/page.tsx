import { redirect } from "next/navigation";

// Visit info merged into the FAQ page. Permanent-redirect old /visit URLs
// so any links shared while it was a standalone page still resolve.
export default function VisitRedirect() {
  redirect("/faq");
}
