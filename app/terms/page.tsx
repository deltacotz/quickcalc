import type { Metadata } from "next";
import { SITE_NAME, CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: `Terms of Use — ${SITE_NAME}`,
  description: `Terms of use for ${SITE_NAME}.`,
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight">Terms of Use</h1>

      <div className="mt-6 space-y-5 text-zinc-700">
        <section>
          <h2 className="text-lg font-semibold text-zinc-900">1. Use of the service</h2>
          <p className="mt-1">
            The calculators and converters on {SITE_NAME} are provided free of charge for personal
            and informational use.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-zinc-900">2. No professional advice</h2>
          <p className="mt-1">
            All results are estimates provided for general information only. They are not financial,
            medical, legal or tax advice, and you should consult a qualified professional before
            making decisions based on them.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-zinc-900">3. Accuracy</h2>
          <p className="mt-1">
            We aim to keep results accurate, but we make no warranties about the completeness or
            accuracy of any output. Use at your own discretion.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-zinc-900">4. Contact</h2>
          <p className="mt-1">
            Questions about these terms can be sent to{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-700 underline">
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
