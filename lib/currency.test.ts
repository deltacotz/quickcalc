import { test } from "node:test";
import assert from "node:assert/strict";
import { formatCurrency, currencySymbol, detectCurrency } from "./currency";

test("formatCurrency USD (2 decimals)", () => {
  assert.equal(formatCurrency(1798.65, "USD"), "$1,798.65");
  assert.equal(formatCurrency(42, "USD"), "$42.00");
});

test("formatCurrency TZS (0 decimals, TSh symbol, grouping)", () => {
  assert.equal(formatCurrency(2500000, "TZS"), "TSh 2,500,000");
  assert.equal(formatCurrency(1798.65, "TZS"), "TSh 1,799");
});

test("formatCurrency non-finite", () => {
  assert.equal(formatCurrency(NaN, "USD"), "—");
  assert.equal(formatCurrency(Infinity, "TZS"), "—");
});

test("currencySymbol", () => {
  assert.equal(currencySymbol("USD"), "$");
  assert.equal(currencySymbol("TZS"), "TSh");
});

test("detectCurrency", () => {
  assert.equal(detectCurrency("sw-TZ"), "TZS");
  assert.equal(detectCurrency("en-TZ"), "TZS");
  assert.equal(detectCurrency("sw"), "TZS");
  assert.equal(detectCurrency("en-US"), "USD");
  assert.equal(detectCurrency("fr-FR"), "USD");
});
