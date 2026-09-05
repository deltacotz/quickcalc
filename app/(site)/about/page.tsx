import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site";
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
          {SITE_NAME} is a free collection of online calculators and unit converters built to give
          fast, accurate answers to everyday questions — from working out a percentage or a tip, to
          estimating a mortgage payment or converting miles to kilometers.
        </p>
        <p>
          We put special care into Tanzania-specific tools: PAYE income tax, NSSF and PSSSF pensions,
          the Skills Development Levy, the Workers Compensation Fund, mobile-money fees, and USD↔TZS
          currency conversion. If you are working out a Tanzanian paycheck, tax, or transfer, we have
          a calculator for it.
        </p>
        <p>
          Every calculator shows its formula and a worked example so you can see exactly how the
          result is reached — not a black box. Rates are reviewed against current Tanzanian rules
          (TRA, NSSF, PSSSF) and each finance tool carries a note that figures can change, so you
          should verify with the relevant authority before acting on large amounts.
        </p>
        <p>
          Beyond Tanzania, you will find the everyday tools people search for most — percentage, BMI,
          mortgage, loan, compound-interest, tip, discount, fuel and more — plus 600+ unit converters
          covering length, weight, temperature, area, volume, speed, data, time, power, energy and
          pressure.
        </p>
        <p>
          Everything is free, with no account or sign-up required. You can also embed any calculator
          on your own site (see the &ldquo;Embed this calculator&rdquo; button on each tool), or get
          in touch with questions, corrections, or suggestions.
        </p>
      </div>
    </div>
  );
}
