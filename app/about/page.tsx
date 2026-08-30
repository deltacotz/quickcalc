import type { Metadata } from "next";
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/site";
import { openGraph } from "@/lib/seo";

const ABOUT_DESC = `About ${SITE_NAME} — a free collection of online calculators and unit converters for percentages, BMI, mortgages, loans, salaries and more.`;

export const metadata: Metadata = {
  title: `About — ${SITE_NAME}`,
  description: ABOUT_DESC,
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: openGraph({ title: `About — ${SITE_NAME}`, description: ABOUT_DESC, url: `${SITE_URL}/about` }),
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight">About {SITE_NAME}</h1>
      <div className="mt-6 space-y-4 text-zinc-700">
        <p>
          This site offers a free collection of online calculators and unit converters built to give
          fast, accurate answers to everyday questions — from working out a percentage or a tip to
          estimating a mortgage payment or converting miles to kilometers.
        </p>
        <p>{SITE_TAGLINE}.</p>
        <p>
          Every calculator shows its formula and worked examples so you can see exactly how the
          result is reached, and every tool is free to use with no sign-up required.
        </p>
      </div>
    </div>
  );
}
