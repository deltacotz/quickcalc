import type { Metadata } from "next";
import { SITE_NAME, CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: `Privacy Policy — ${SITE_NAME}`,
  description: `Privacy policy for ${SITE_NAME}.`,
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
      <p className="mt-2 text-sm text-zinc-500">Last updated: {new Date().toISOString().slice(0, 10)}</p>

      <div className="mt-6 space-y-5 text-zinc-700">
        <section>
          <h2 className="text-lg font-semibold text-zinc-900">1. Information we collect</h2>
          <p className="mt-1">
            {SITE_NAME} collects minimal information. We may automatically receive standard log
            data (such as IP address, browser type and pages visited) through analytics and
            advertising services.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-zinc-900">2. Advertising</h2>
          <p className="mt-1">
            We use Google AdSense to serve advertisements. Google and its partners may use cookies
            (including the DoubleClick cookie) to serve ads based on your prior visits to this and
            other websites. You can opt out of personalized advertising by visiting{" "}
            <a
              href="https://adssettings.google.com"
              className="text-blue-700 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Ads Settings
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-zinc-900">3. Analytics</h2>
          <p className="mt-1">
            We may use Google Analytics to understand how visitors use the site. This service uses
            cookies to collect aggregated, non-personally-identifying information.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-zinc-900">4. Consent</h2>
          <p className="mt-1">
            Where required by law, we obtain consent before setting non-essential cookies. You may
            clear or block cookies through your browser settings at any time.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-zinc-900">5. Contact</h2>
          <p className="mt-1">
            Questions about this policy can be sent to{" "}
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
