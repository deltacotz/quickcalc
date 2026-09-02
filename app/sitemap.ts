import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { TOOLS } from "@/content/tools";
import { DIMENSIONS, getAllPairs, pairSlug } from "@/lib/convert";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/converters`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/tanzania`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/tanzania/paye-tax-brackets`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/tanzania/currency`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/usd-to-tzs`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/tzs-to-usd`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  for (const t of TOOLS) {
    entries.push({
      url: `${SITE_URL}/tools/${t.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  for (const d of DIMENSIONS) {
    entries.push({
      url: `${SITE_URL}/converters/${d.id}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  for (const p of getAllPairs()) {
    entries.push({
      url: `${SITE_URL}/converters/${p.dimensionId}/${pairSlug(p.from.id, p.to.id)}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  for (const page of ["about", "contact", "privacy", "terms", "press"]) {
    entries.push({
      url: `${SITE_URL}/${page}`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    });
  }

  return entries;
}
