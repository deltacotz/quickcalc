import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTool, TOOLS } from "@/content/tools";
import { CalculatorWidget } from "@/components/CalculatorWidget";
import { GpaCalculator } from "@/components/GpaCalculator";
import { CurrencyConverter } from "@/components/CurrencyConverter";
import { TimezoneConverter } from "@/components/TimezoneConverter";
import { SITE_NAME, SITE_URL } from "@/lib/site";

interface Props {
  params: Promise<{ slug: string }>;
}

// Embed pages are a distribution surface (iframed by other sites), not index
// targets. Keep them out of the index so they never compete with the canonical
// /tools/[slug] pages.
export const metadata: Metadata = {
  title: "Embeddable calculator",
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return TOOLS.map((t) => ({ slug: t.slug }));
}

export default async function EmbedPage({ params }: Props) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) notFound();

  const widget =
    tool.kind === "gpa" ? (
      <GpaCalculator />
    ) : tool.kind === "currency" ? (
      <CurrencyConverter />
    ) : tool.kind === "timezone" ? (
      <TimezoneConverter />
    ) : (
      <CalculatorWidget slug={tool.slug} />
    );

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-6">
      {widget}

      {/* Attribution — this is the backlink every embed generates. */}
      <p className="mt-3 text-center text-xs text-zinc-400">
        {tool.name} by{" "}
        <a
          href={SITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-zinc-500 hover:text-blue-600"
        >
          {SITE_NAME}
        </a>
      </p>
    </div>
  );
}
