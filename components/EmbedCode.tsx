"use client";

import { useState } from "react";

/** Build the HTML snippet for embedding a calculator via iframe. */
export function buildEmbedCode(
  slug: string,
  siteUrl: string,
  width = 600,
  height = 520,
): string {
  const src = `${siteUrl}/embed/${slug}`;
  return [
    `<iframe`,
    `  src="${src}"`,
    `  title="Free online calculator"`,
    `  width="${width}"`,
    `  height="${height}"`,
    `  style="max-width:100%;border:0;"`,
    `  loading="lazy"`,
    `  allow="clipboard-write"`,
    `></iframe>`,
  ].join("\n");
}

export function EmbedCode({
  slug,
  siteUrl,
}: {
  slug: string;
  siteUrl: string;
}) {
  const [copied, setCopied] = useState(false);
  const code = buildEmbedCode(slug, siteUrl);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard may be blocked; fall back to a manual selection hint.
    }
  };

  return (
    <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900">
          Embed this calculator
        </h2>
        <button
          type="button"
          onClick={copy}
          className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          {copied ? "Copied!" : "Copy code"}
        </button>
      </div>
      <p className="mt-1 text-sm text-zinc-600">
        Add this calculator to your site with a few lines of HTML. It stays free and includes a
        link back to {siteUrl.replace(/^https?:\/\//, "")}.
      </p>
      <pre className="mt-3 overflow-x-auto rounded-lg bg-zinc-900 p-3 text-xs leading-relaxed text-zinc-100">
        <code>{code}</code>
      </pre>
    </div>
  );
}
