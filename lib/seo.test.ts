import { test } from "node:test";
import assert from "node:assert/strict";
import { buildConverterPairDescription } from "./seo";
import { getAllPairs } from "./convert";

test("buildConverterPairDescription stays within 120-160 chars for every pair", () => {
  const pairs = getAllPairs();
  assert.ok(pairs.length > 100, "expected the full pair set");
  for (const p of pairs) {
    const desc = buildConverterPairDescription(p.from.label, p.to.label);
    assert.ok(
      desc.length >= 120 && desc.length <= 160,
      `${p.from.label}->${p.to.label}: ${desc.length} chars — "${desc}"`,
    );
  }
});

test("buildConverterPairDescription mentions both units", () => {
  const desc = buildConverterPairDescription("Meters", "Feet");
  assert.match(desc, /Meters/);
  assert.match(desc, /Feet/);
});
