import type { Metadata } from "next";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export const metadata: Metadata = {
  title: `About — ${SITE_NAME}`,
  description: `About ${SITE_NAME}: free online calculators and unit converters.`,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight">About {SITE_NAME}</h1>
      <div className="mt-6 space-y-4 text-zinc-700">
        <p>
          {SITE_NAME} is a free collection of online calculators and unit converters built to give
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
