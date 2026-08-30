import { test } from "node:test";
import assert from "node:assert/strict";
import { monthlyPayment, mortgage, compoundInterest, salaryToHourly } from "./calculators/finance";
import { bmi, calorie } from "./calculators/health";
import { percentage, tip, age, dayDiff, breakdown } from "./calculators/everyday";
import { computeGpa } from "./calculators/education";

function approx(actual: number, expected: number, eps = 1e-2) {
  assert.ok(Math.abs(actual - expected) < eps, `expected ${expected}, got ${actual}`);
}

test("mortgage monthly payment", () => {
  approx(monthlyPayment(300000, 6, 30), 1798.65, 0.5);
  approx(monthlyPayment(100000, 0, 10), 100000 / 120);
});

test("mortgage compute output", () => {
  const res = mortgage.compute({ amount: "300000", rate: "6", years: "30" });
  assert.equal(res[0].value, "$1,798.65");
  assert.equal(res[2].label, "Total interest");
});

test("compound interest (no contribution)", () => {
  const res = compoundInterest.compute({
    principal: "10000",
    rate: "7",
    years: "20",
    contribution: "0",
    frequency: "12",
  });
  const future = Number(res[0].value.replace(/[$,]/g, ""));
  assert.ok(future > 40000 && future < 41000, `got ${res[0].value}`);
});

test("salary to hourly", () => {
  const res = salaryToHourly.compute({ salary: "60000", hours: "40", weeks: "52" });
  assert.equal(res[0].value, "$28.85");
});

test("BMI metric", () => {
  const res = bmi.compute({ units: "metric", weight: "70", height: "175" });
  assert.equal(res[0].value, "22.9");
  assert.equal(res[1].value, "Normal weight");
});

test("BMI imperial", () => {
  const res = bmi.compute({ units: "imperial", weight: "154", height: "69" });
  assert.equal(res[0].value, "22.7");
});

test("calorie BMR (Mifflin-St Jeor)", () => {
  const res = calorie.compute({ sex: "male", age: "30", weight: "70", height: "175", activity: "sedentary" });
  // BMR = 10*70 + 6.25*175 - 5*30 + 5 = 700 + 1093.75 - 150 + 5 = 1648.75
  assert.ok(res[0].value.startsWith("1,649"));
});

test("percentage", () => {
  const res = percentage.compute({ a: "50", b: "200", p: "15" });
  assert.equal(res[0].value, "7.5");
});

test("tip", () => {
  const res = tip.compute({ bill: "50", pct: "15", people: "1" });
  assert.equal(res[0].value, "$7.50");
  assert.equal(res[1].value, "$57.50");
});

test("date difference", () => {
  assert.equal(dayDiff(new Date("2024-01-01T00:00:00"), new Date("2024-01-31T00:00:00")), 30);
  const b = breakdown(new Date("2020-01-15T00:00:00"), new Date("2024-03-10T00:00:00"));
  assert.equal(b.years, 4);
});

test("age", () => {
  const res = age.compute({ dob: "1990-01-01", asof: "2024-01-01" });
  assert.equal(res[0].value, "34 years, 0 months, 0 days");
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
