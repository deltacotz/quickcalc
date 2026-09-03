import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "./site";

/** Build a complete per-page OpenGraph object (title, description, url, image). */
export function openGraph({
  title,
  description,
  url,
}: {
  title: string;
  description: string;
  url: string;
}): Metadata["openGraph"] {
  return {
    title,
    description,
    url,
    type: "website",
    siteName: SITE_NAME,
    images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630, alt: SITE_NAME }],
  };
}

/** Build a BreadcrumbList JSON-LD object from ordered crumbs. */
export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Build a meta description for a converter pair page that stays inside the
 * 120–160 character window Google displays in SERPs, regardless of how long
 * the two unit labels are. The labels vary widely (e.g. "Feet to Yards"
 * vs "Millimeters of mercury to Pounds per square inch"), so a single fixed
 * template can end up too short or too long. Start from a base long enough
 * that the shortest labels clear 120, then trim for the longest ones.
 */
export function buildConverterPairDescription(fromLabel: string, toLabel: string): string {
  let description = `Free ${fromLabel} to ${toLabel} converter: convert any value instantly, see the formula and a full conversion table. No sign-up needed.`;
  if (description.length > 158) {
    description = `Free ${fromLabel} to ${toLabel} converter: convert instantly, see the formula and a full conversion table.`;
  }
  if (description.length > 158) {
    description = `Free ${fromLabel} to ${toLabel} converter: instant results, formula and conversion table.`;
  }
  return description;
}
