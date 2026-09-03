#!/usr/bin/env node
/**
 * Audit all meta descriptions against the site's 120–160 character rule.
 *
 * Run: `npm run audit:meta` (or `npx tsx scripts/audit-meta-descriptions.mjs`)
 *
 * Every page's meta description must land in the 120–160 character window so
 * Google displays it fully in SERPs. This script checks every description source
 * the site builds from, so adding a tool, converter category, currency page, or
 * editing SITE_DESCRIPTION is caught here before deploy.
 *
 * Exit code 0 = all in range; 1 = at least one too short or too long.
 */
import { getAllPairs, DIMENSIONS } from "../lib/convert.ts";
import { buildConverterPairDescription } from "../lib/seo.ts";
import { TOOLS } from "../content/tools.ts";
import { CURRENCY_PAGES } from "../content/currency-pages.ts";
import { SITE_DESCRIPTION } from "../lib/site.ts";

const RULE = { MIN: 120, MAX: 160 };

const rows = [];
const add = (name, desc) => rows.push({ name, len: desc.length, desc });

// Converter pair pages (the largest surface).
for (const p of getAllPairs()) {
  add(`pair ${p.dimensionId}/${p.from.id}-to-${p.to.id}`, buildConverterPairDescription(p.from.label, p.to.label));
}
// Converter category pages.
for (const d of DIMENSIONS) add(`category ${d.id}`, d.description);
// Converters index.
add(
  "converters",
  "Free online unit converters for length, weight, temperature, area, volume, speed, data storage and time — with instant conversions and tables.",
);
// Tool pages.
for (const t of TOOLS) add(`tool ${t.slug}`, t.metaDescription);
// Currency conversion pages (USD↔TZS).
for (const c of CURRENCY_PAGES) add(`currency ${c.slug}`, c.metaDescription);
// Site-wide/home description.
add("home (SITE_DESCRIPTION)", SITE_DESCRIPTION);

const short = rows.filter((r) => r.len < RULE.MIN);
const long = rows.filter((r) => r.len > RULE.MAX);
const ok = rows.length - short.length - long.length;

console.log(`Audit ${rows.length} description sources (target ${RULE.MIN}–${RULE.MAX} chars).`);
console.log(`  OK:          ${ok}`);
console.log(`  too short:   ${short.length}`);
console.log(`  too long:    ${long.length}`);

if (short.length) {
  console.log("\nTOO SHORT (< " + RULE.MIN + "):");
  for (const r of short) console.log(`  [${r.len}] ${r.name}  ${r.desc}`);
}
if (long.length) {
  console.log("\nTOO LONG (> " + RULE.MAX + "):");
  for (const r of long) console.log(`  [${r.len}] ${r.name}  ${r.desc}`);
}

if (short.length || long.length) {
  console.log("\n✖ Some meta descriptions are outside the " + RULE.MIN + "–" + RULE.MAX + " window.");
  process.exit(1);
}
console.log("✔ All meta descriptions are in the " + RULE.MIN + "–" + RULE.MAX + " window.");
process.exit(0);
