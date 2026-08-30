import { test } from "node:test";
import assert from "node:assert/strict";
import {
  convert,
  getDimension,
  getAllPairs,
  resolvePair,
  pairSlug,
} from "./convert";
import { formatConverted } from "./format";

function cv(dim: string, from: string, to: string, value: number): number {
  const d = getDimension(dim);
  assert.ok(d, `unknown dimension ${dim}`);
  const f = d!.units.find((u) => u.id === from);
  const t = d!.units.find((u) => u.id === to);
  assert.ok(f && t, `unknown unit ${from}/${to}`);
  return convert(value, f!, t!);
}

function approx(actual: number, expected: number, eps = 1e-9) {
  assert.ok(Math.abs(actual - expected) < eps, `expected ${expected}, got ${actual}`);
}

test("length conversions", () => {
  approx(cv("length", "miles", "kilometers", 100), 160.9344);
  approx(cv("length", "feet", "meters", 1), 0.3048);
  approx(cv("length", "inches", "centimeters", 1), 2.54);
  approx(cv("length", "meters", "feet", 1), 3.280839895013123);
});

test("weight conversions", () => {
  approx(cv("weight", "kilograms", "pounds", 1), 2.2046226218487757);
  approx(cv("weight", "stones", "pounds", 1), 14);
  approx(cv("weight", "ounces", "grams", 1), 28.349523125);
});

test("temperature conversions (affine)", () => {
  approx(cv("temperature", "celsius", "fahrenheit", 0), 32);
  approx(cv("temperature", "celsius", "fahrenheit", 100), 212);
  approx(cv("temperature", "fahrenheit", "celsius", 32), 0);
  approx(cv("temperature", "celsius", "kelvin", 0), 273.15);
  approx(cv("temperature", "fahrenheit", "kelvin", 32), 273.15);
  approx(cv("temperature", "celsius", "fahrenheit", -40), -40);
});

test("area conversions", () => {
  approx(cv("area", "acres", "square-feet", 1), 43560);
  approx(cv("area", "hectares", "square-meters", 1), 10000);
});

test("volume conversions", () => {
  approx(cv("volume", "us-gallons", "liters", 1), 3.785411784);
  approx(cv("volume", "liters", "milliliters", 1), 1000);
});

test("speed conversions", () => {
  approx(cv("speed", "miles-per-hour", "kilometers-per-hour", 60), 96.56064);
  approx(cv("speed", "knots", "kilometers-per-hour", 1), 1.852);
});

test("data storage conversions", () => {
  approx(cv("data", "gigabytes", "megabytes", 1), 1024);
  approx(cv("data", "bytes", "bits", 1), 8);
});

test("time conversions", () => {
  approx(cv("time", "hours", "seconds", 1), 3600);
  approx(cv("time", "days", "minutes", 1), 1440);
});

test("pair slugs resolve round-trip", () => {
  assert.equal(pairSlug("miles", "kilometers"), "miles-to-kilometers");
  assert.equal(pairSlug("miles-per-hour", "kilometers-per-hour"), "miles-per-hour-to-kilometers-per-hour");
  const r = resolvePair("length", "miles-to-kilometers");
  assert.ok(r);
  assert.equal(r!.from.id, "miles");
  assert.equal(r!.to.id, "kilometers");
  const r2 = resolvePair("speed", "miles-per-hour-to-kilometers-per-hour");
  assert.ok(r2);
  assert.equal(r2!.to.id, "kilometers-per-hour");
});

test("every pair resolves and converts", () => {
  const pairs = getAllPairs();
  assert.ok(pairs.length > 100);
  for (const p of pairs) {
    const resolved = resolvePair(p.dimensionId, pairSlug(p.from.id, p.to.id));
    assert.ok(resolved, `failed to resolve ${p.dimensionId}/${p.from.id}-to-${p.to.id}`);
    const v = convert(1, p.from, p.to);
    assert.ok(Number.isFinite(v));
  }
});

test("formatConverted", () => {
  assert.equal(formatConverted(0), "0");
  assert.equal(formatConverted(1048576), "1,048,576");
  assert.equal(formatConverted(1e-9), "1e-9");
});
