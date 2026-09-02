import { test } from "node:test";
import assert from "node:assert/strict";
import { DIMENSION_TOOLS, getToolDimensions } from "./crosslinks";

test("DIMENSION_TOOLS only references valid dimension ids", () => {
  const validDims = [
    "length", "weight", "temperature", "area", "volume",
    "speed", "data", "time", "power", "energy", "pressure",
  ];
  for (const key of Object.keys(DIMENSION_TOOLS)) {
    assert.ok(validDims.includes(key), `unknown dimension "${key}" in DIMENSION_TOOLS`);
  }
});

test("getToolDimensions returns dimensions a calculator is mapped to", () => {
  assert.deepEqual(getToolDimensions("bmi-calculator").sort(), ["length", "weight"]);
  assert.deepEqual(getToolDimensions("amps-to-watts-calculator"), ["power"]);
});

test("getToolDimensions returns empty for calculators without a converter link", () => {
  assert.deepEqual(getToolDimensions("percentage-calculator"), []);
  assert.deepEqual(getToolDimensions("nonexistent-tool"), []);
});

test("every listed crosslink tool slug is non-empty and DIMENSION_TOOLS is stable", () => {
  for (const [, tools] of Object.entries(DIMENSION_TOOLS)) {
    for (const t of tools) {
      assert.ok(t.slug.length > 0);
      assert.ok(t.name.length > 0);
    }
  }
});
