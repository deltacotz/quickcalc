#!/usr/bin/env node
/**
 * Audit all meta descriptions against the site's 120–160 character rule.
 *
 * Run: `npm run audit:meta` (or `npx tsx scripts/audit-meta-descriptions.mjs`)
 *
 * Every page's meta description must land in the 120–160 character window so
 * Google displays it fully in SERPs. This script checks two sources:
 *
 *   1. Data-driven descriptions (the import-based set below): converter pair +
 *      category pages, tool pages, currency pages, and SITE_DESCRIPTION.
 *   2. Hand-written descriptions in each route's `metadata: Metadata` block
 *      (walked from app/** / page.tsx), with template-literal and local-const
 *      resolution.
 *
 * A page whose description is produced by a data import (e.g. SITE_DESCRIPTION,
 * USD_TO_TZS.metaDescription, ABOUT_DESC) is intentionally skipped here when it
 * references a value already covered by source 1 or is resolved locally, to
 * avoid double-counting. Only literal / template-literal / locally-defined
 * descriptions are measured.
 *
 * Exit code 0 = all good; 1 = at least one out of range.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { getAllPairs, DIMENSIONS } from "../lib/convert.ts";
import { buildConverterPairDescription } from "../lib/seo.ts";
import { TOOLS } from "../content/tools.ts";
import { CURRENCY_PAGES } from "../content/currency-pages.ts";
import { SITE_DESCRIPTION } from "../lib/site.ts";

const RULE = { MIN: 120, MAX: 160 };
const ROOT = fileURLToPath(new URL("..", import.meta.url));

const rows = [];
const add = (name, desc) => rows.push({ name, len: desc.length, desc });

// ── Source 1: data-driven descriptions ───────────────────────────────────
for (const p of getAllPairs()) {
  add(`pair ${p.dimensionId}/${p.from.id}-to-${p.to.id}`, buildConverterPairDescription(p.from.label, p.to.label));
}
for (const d of DIMENSIONS) add(`category ${d.id}`, d.description);
add(
  "converters",
  "Free online unit converters for length, weight, temperature, area, volume, speed, data storage and time — with instant conversions and tables.",
);
for (const t of TOOLS) add(`tool ${t.slug}`, t.metaDescription);
for (const c of CURRENCY_PAGES) add(`currency ${c.slug}`, c.metaDescription);
add("home (SITE_DESCRIPTION)", SITE_DESCRIPTION);

// ── Source 2: hand-written route descriptions ────────────────────────────
// Walk app/**/page.tsx, find `export const metadata = { ... description: X }`,
// and resolve X where X is a literal, a template literal with `${SITE_NAME}`,
// a `${TONAME}` const, or a const referenced in the same file (ABOUT_DESC).
const SITE_NAME = "Calculator"; // fixed brand (kept literal to resolve templates)
const SITE_URL = "https://www.calculator.co.tz";

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) {
      if (name.startsWith("node_modules") || name.startsWith(".next")) continue;
      walk(p, out);
    } else if (name.endsWith(".tsx") && name !== "layout.tsx") {
      out.push(p);
    }
  }
  return out;
}

function resolveTemplate(expr) {
  // `...${SITE_NAME}...` -> substitute brand name. Only handles ${SITE_NAME} here.
  const m = expr.match(/^`([\s\S]*)`$/);
  if (!m) return null;
  const body = m[1];
  return body.replace(/\$\{SITE_NAME\}/g, SITE_NAME).replace(/\$\{SITE_URL\}/g, SITE_URL);
}

function resolveExpr(expr, source) {
  const trimmed = expr.trim().replace(/,\s*$/, "");
  // literal string
  const lit = trimmed.match(/^"([\s\S]*)"$/);
  if (lit) return lit[1];
  // template literal (SITE_NAME / SITE_URL substitutions)
  const tpl = resolveTemplate(trimmed);
  if (tpl !== null) return tpl;
  // const reference: could be ABOUT_DESC or a top-level const in the same file
  const ident = trimmed.match(/^([A-Za-z0-9_]+)$/);
  if (ident) {
    const name = ident[1];
    // find a const definition in the same source: const NAME = `...` or const NAME = "..."
    const def = source.match(
      new RegExp(`const\\s+${name}\\s*=\\s*([\`"][\\s\\S]*?[\`"])\\s*;`),
    );
    if (def) {
      const tpl2 = resolveTemplate(def[1]);
      if (tpl2 !== null) return tpl2;
      const lit2 = def[1].match(/^"([\s\S]*)"$/);
      if (lit2) return lit2[1];
    }
    // data import already covered by source 1 (SITE_DESCRIPTION, *.metaDescription)
    return undefined; // unknown -> skip (double-count guard)
  }
  // member expression like USD_TO_TZS.metaDescription -> already covered by source 1
  if (/\.metaDescription$|\.description$/.test(trimmed)) return undefined;
  return undefined;
}

for (const file of walk(join(ROOT, "app"))) {
  const source = readFileSync(file, "utf8");
  const mdMatch = source.match(/export const metadata[^=]*=\s*\{/);
  if (!mdMatch) continue;
  // grab the metadata block up to the first "};" that closes it
  const blockStart = mdMatch.index + mdMatch[0].length;
  const close = source.indexOf("};", blockStart);
  if (close === -1) continue;
  const block = source.slice(blockStart, close);
  const descMatch = block.match(/description:\s*([\s\S]*?)(?=\n\s*[a-zA-Z]|\n\s*\}|$,)/);
  if (!descMatch) continue;
  const value = resolveExpr(descMatch[1], source);
  if (value === undefined || value === null) continue; // covered by source 1 or not resolvable
  const route = file.replace(ROOT, "").replace(/\/page\.tsx$/, "").replace(/\//g, "/");
  add(`route ${route}`, value);
}

// ── Report ───────────────────────────────────────────────────────────────
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
