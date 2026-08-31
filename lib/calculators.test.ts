import { test } from "node:test";
import assert from "node:assert/strict";
import { monthlyPayment, mortgage, compoundInterest, salaryToHourly, retirement } from "./calculators/finance";
import { bmi, calorie, bodyFat } from "./calculators/health";
import { percentage, tip, discount, fuelCost, age, dayDiff, breakdown, pregnancy } from "./calculators/everyday";
import { paint, electrical } from "./calculators/home";
import { payeTax, tanzaniaPaye } from "./calculators/tanzania";
import { computeGpa } from "./calculators/education";

const USD: { currency: "USD" } = { currency: "USD" };
const TZS: { currency: "TZS" } = { currency: "TZS" };

function approx(actual: number, expected: number, eps = 1e-2) {
  assert.ok(Math.abs(actual - expected) < eps, `expected ${expected}, got ${actual}`);
}

test("mortgage monthly payment", () => {
  approx(monthlyPayment(300000, 6, 30), 1798.65, 0.5);
  approx(monthlyPayment(100000, 0, 10), 100000 / 120);
});

test("mortgage compute output (USD)", () => {
  const res = mortgage.compute({ amount: "300000", rate: "6", years: "30" }, USD);
  assert.equal(res[0].value, "$1,798.65");
});

test("mortgage compute output (TZS)", () => {
  const res = mortgage.compute({ amount: "300000", rate: "6", years: "30" }, TZS);
  assert.equal(res[0].value, "TSh 1,799");
});

test("compound interest (no contribution)", () => {
  const res = compoundInterest.compute(
    { principal: "10000", rate: "7", years: "20", contribution: "0", frequency: "12" },
    USD
  );
  const future = Number(res[0].value.replace(/[$,]/g, ""));
  assert.ok(future > 40000 && future < 41000, `got ${res[0].value}`);
});

test("salary to hourly (USD)", () => {
  const res = salaryToHourly.compute({ salary: "60000", hours: "40", weeks: "52" }, USD);
  assert.equal(res[0].value, "$28.85");
});

test("BMI metric", () => {
  const res = bmi.compute({ units: "metric", weight: "70", height: "175" }, USD);
  assert.equal(res[0].value, "22.9");
  assert.equal(res[1].value, "Normal weight");
});

test("BMI imperial", () => {
  const res = bmi.compute({ units: "imperial", weight: "154", height: "69" }, USD);
  assert.equal(res[0].value, "22.7");
});

test("calorie BMR (Mifflin-St Jeor)", () => {
  const res = calorie.compute(
    { sex: "male", age: "30", weight: "70", height: "175", activity: "sedentary" },
    USD
  );
  assert.ok(res[0].value.startsWith("1,649"));
});

test("percentage", () => {
  const res = percentage.compute({ a: "50", b: "200", p: "15" }, USD);
  assert.equal(res[0].value, "7.5");
});

test("tip (USD)", () => {
  const res = tip.compute({ bill: "50", pct: "15", people: "1" }, USD);
  assert.equal(res[0].value, "$7.50");
  assert.equal(res[1].value, "$57.50");
});

test("discount (USD)", () => {
  const res = discount.compute({ price: "100", pct: "20" }, USD);
  assert.equal(res[0].value, "$20.00");
  assert.equal(res[1].value, "$80.00");
});

test("fuel cost (US)", () => {
  const res = fuelCost.compute(
    { system: "us", distance: "300", efficiency: "25", price: "3.50" },
    USD
  );
  assert.equal(res[0].value, "12 gal");
  assert.equal(res[1].value, "$42.00");
  assert.equal(res[2].value, "$0.14");
});

test("fuel cost (metric + TZS)", () => {
  const res = fuelCost.compute(
    { system: "metric", distance: "300", efficiency: "15", price: "2500" },
    TZS
  );
  assert.equal(res[0].value, "20 L");
  assert.equal(res[1].value, "TSh 50,000");
});

test("date difference", () => {
  assert.equal(dayDiff(new Date("2024-01-01T00:00:00"), new Date("2024-01-31T00:00:00")), 30);
  const b = breakdown(new Date("2020-01-15T00:00:00"), new Date("2024-03-10T00:00:00"));
  assert.equal(b.years, 4);
});

test("age", () => {
  const res = age.compute({ dob: "1990-01-01", asof: "2024-01-01" }, USD);
  assert.equal(res[0].value, "34 years, 0 months, 0 days");
});

test("retirement", () => {
  const res = retirement.compute(
    { age: "30", retireAge: "65", savings: "10000", contribution: "5000", rate: "7" },
    USD
  );
  const v = Number(res[0].value.replace(/[$,]/g, ""));
  assert.ok(v > 750000 && v < 850000, `got ${res[0].value}`);
});

test("pregnancy due date", () => {
  const res = pregnancy.compute({ lmp: "2024-01-01" }, USD);
  assert.equal(res[0].value, "October 7, 2024");
});

test("body fat (male)", () => {
  const res = bodyFat.compute({ sex: "male", height: "175", neck: "38", waist: "90", hip: "95" }, USD);
  assert.equal(res[0].value, "14.2%");
});

test("paint", () => {
  const res = paint.compute({ area: "400", coats: "2", coverage: "350" }, USD);
  assert.equal(res[0].value, "3 gal");
});

test("electrical", () => {
  const res = electrical.compute({ volts: "230", amps: "10" }, USD);
  assert.equal(res[0].value, "2,300 W");
});

test("tanzania PAYE", () => {
  assert.equal(payeTax(270000), 0);
  assert.equal(payeTax(520000), 20000);
  assert.equal(payeTax(760000), 68000);
  assert.equal(payeTax(1000000), 128000);
  const res = tanzaniaPaye.compute({ salary: "1000000" }, USD);
  assert.equal(res[0].value, "TSh 872,000");
  assert.equal(res[1].value, "TSh 128,000");
});

test("GPA", () => {
  const r = computeGpa([
    { grade: "A", credits: "3" },
    { grade: "B", credits: "3" },
    { grade: "A-", credits: "4" },
  ]);
  assert.ok(r);
  approx(r!.gpa, 3.58);
  assert.equal(r!.totalCredits, 10);
});
