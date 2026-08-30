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
