import type { Metadata } from "next";
import { SITE_NAME, CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: `Contact — ${SITE_NAME}`,
  description: `Contact ${SITE_NAME}.`,
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight">Contact</h1>
      <p className="mt-4 text-zinc-700">
        Have feedback, a correction, or a suggestion for a new calculator? Email us at{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-700 underline">
          {CONTACT_EMAIL}
        </a>
        .
      </p>
    </div>
  );
}
