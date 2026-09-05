import { test } from "node:test";
import assert from "node:assert/strict";
import { monthlyPayment, mortgage, compoundInterest, salaryToHourly, retirement, inflation, debtToIncome } from "./calculators/finance";
import { bmi, calorie, bodyFat } from "./calculators/health";
import { percentage, tip, discount, fuelCost, age, dayDiff, breakdown, pregnancy, average, standardDeviation } from "./calculators/everyday";
import { paint, electrical } from "./calculators/home";
import { payeTax, tanzaniaPaye, tanzaniaVat, tanzaniaNssf, tanzaniaPsssf, nssfEmployee, nssfEmployer, psssfEmployee, psssfEmployer, psssfGratuity, tanzaniaEmployerCost, tanzaniaSdl, tanzaniaWcf, sdlEmployer, wcfEmployer } from "./calculators/tanzania";
import { mobileMoneyFee } from "./calculators/mobilemoney";
import { feeFor } from "./mobilemoney";
import { uttCalculator } from "./calculators/utt";
import { projectValue } from "./utt";
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

test("NSSF contributions (10% employee + 10% employer)", () => {
  assert.equal(nssfEmployee(1000000), 100000);
  assert.equal(nssfEmployer(1000000), 100000);
  const res = tanzaniaNssf.compute({ salary: "1000000" }, USD);
  // employee NSSF 100,000; PAYE on 900,000 = 20k + 48k + 35k = 103,000; net = 1,000,000 - 100,000 - 103,000 = 797,000
  assert.equal(res[0].value, "TSh 797,000");
  assert.equal(res[1].value, "TSh 100,000");
  assert.equal(res[2].value, "TSh 100,000");
  assert.equal(res[3].value, "TSh 200,000");
});

test("PSSSF contributions (5% employee + 15% employer)", () => {
  assert.equal(psssfEmployee(1000000), 50000);
  assert.equal(psssfEmployer(1000000), 150000);
  const res = tanzaniaPsssf.compute({ mode: "paycheck", salary: "1000000", months: "180" }, USD);
  // employee PSSSF 50,000; PAYE on 950,000 = 20k + 48k + 47.5k = 115,500; net = 1,000,000 - 50,000 - 115,500 = 834,500
  assert.equal(res[0].value, "TSh 834,500");
  assert.equal(res[1].value, "TSh 50,000");
  assert.equal(res[2].value, "TSh 150,000");
  assert.equal(res[3].value, "TSh 200,000");
});

test("PSSSF retirement pension estimate", () => {
  assert.ok(Math.abs(psssfGratuity(180, 12000000) - 3724137.9310344825) < 0.01);
  const res = tanzaniaPsssf.compute({ mode: "retirement", salary: "1000000", months: "180" }, USD);
  assert.equal(res[0].value, "TSh 3,724,138");
  assert.equal(res[1].value, "TSh 310,345");
});

test("NSSF and PSSSF reject non-positive salary", () => {
  assert.equal(tanzaniaNssf.compute({ salary: "0" }, USD)[0].label, "Error");
  assert.equal(tanzaniaPsssf.compute({ mode: "paycheck", salary: "0", months: "180" }, USD)[0].label, "Error");
});

test("SDL and WCF helper rates", () => {
  assert.equal(sdlEmployer(1000000), 35000);
  assert.equal(wcfEmployer(1000000), 5000);
});

test("employer cost: 10+ employees (NSSF 10% + SDL 3.5% + WCF 0.5% = 14%)", () => {
  const res = tanzaniaEmployerCost.compute({ salary: "1000000", employees: "10", sdl: "auto" }, USD);
  // total cost = 1,000,000 + 100,000 + 35,000 + 5,000 = 1,140,000
  assert.equal(res[0].value, "TSh 1,140,000");
  assert.equal(res[5].value, "TSh 140,000"); // total on-cost
});

test("employer cost: SDL exempt below 10 employees", () => {
  const res = tanzaniaEmployerCost.compute({ salary: "1000000", employees: "5", sdl: "auto" }, USD);
  // total cost = 1,000,000 + 100,000 + 0 + 5,000 = 1,105,000
  assert.equal(res[0].value, "TSh 1,105,000");
  assert.equal(res[3].value, "TSh 0"); // SDL
});

test("SDL calculator: applies at 10+, exempt below", () => {
  assert.equal(tanzaniaSdl.compute({ payroll: "1000000", employees: "10" }, USD)[0].value, "TSh 35,000");
  assert.equal(tanzaniaSdl.compute({ payroll: "1000000", employees: "9" }, USD)[0].value, "TSh 0");
});

test("WCF calculator: 0.5% regardless", () => {
  assert.equal(tanzaniaWcf.compute({ payroll: "1000000" }, USD)[0].value, "TSh 5,000");
});

test("SDL and WCF reject non-positive payroll", () => {
  assert.equal(tanzaniaSdl.compute({ payroll: "0", employees: "10" }, USD)[0].label, "Error");
  assert.equal(tanzaniaWcf.compute({ payroll: "0" }, USD)[0].label, "Error");
});

test("mobile money: M-Pesa withdraw 10,000 (tax-inclusive)", () => {
  const r = feeFor("mpesa", "withdraw", 10000);
  assert.equal(r.baseFee, 1450);
  assert.equal(r.levy, 102);
  assert.equal(r.fee, 1552);
});

test("mobile money: Airtel send 50,000 (no levy)", () => {
  const r = feeFor("airtel", "send", 50000);
  assert.equal(r.baseFee, 680);
  assert.equal(r.levy, 0); // sends are exempt
  assert.equal(r.fee, 680);
});

test("mobile money: M-Pesa send is free up to 10,000", () => {
  const r = feeFor("mpesa", "send", 10000);
  assert.equal(r.baseFee, 0);
  assert.equal(r.fee, 0);
});

test("mobile money: Mixx 10,000 matches official tariff", () => {
  const r = feeFor("mixx", "withdraw", 10000);
  assert.equal(r.baseFee, 1450);
  assert.equal(r.levy, 102);
  assert.equal(r.fee, 1552);
  assert.equal(r.total, 8448);
});

test("mobile money calculator compute", () => {
  const res = mobileMoneyFee.compute({ operator: "mpesa", type: "withdraw", amount: "10000" }, USD);
  assert.equal(res[0].value, "TSh 8,448");
});

test("mobile money: T-Pesa withdraw 10,000 (tax-inclusive)", () => {
  const r = feeFor("tpesa", "withdraw", 10000);
  assert.equal(r.baseFee, 1380);
  assert.equal(r.levy, 102);
  assert.equal(r.fee, 1482);
  assert.equal(r.total, 8518);
});

test("mobile money: HaloPesa withdraw 10,000 (tax-inclusive)", () => {
  const r = feeFor("halopesa", "withdraw", 10000);
  assert.equal(r.baseFee, 1300);
  assert.equal(r.levy, 102);
  assert.equal(r.fee, 1402);
  assert.equal(r.total, 8598);
});

test("tanzania VAT (add)", () => {
  const res = tanzaniaVat.compute({ mode: "add", amount: "100000", rate: "18" }, USD);
  assert.equal(res[0].value, "TSh 18,000"); // VAT
  assert.equal(res[1].value, "TSh 118,000"); // total incl VAT
});

test("tanzania VAT (remove)", () => {
  const res = tanzaniaVat.compute({ mode: "remove", amount: "118000", rate: "18" }, USD);
  assert.equal(res[0].value, "TSh 100,000"); // amount excl VAT
  assert.equal(res[1].value, "TSh 18,000"); // VAT
});

test("average", () => {
  const res = average.compute({ numbers: "10, 20, 30, 40" }, USD);
  assert.equal(res[0].value, "25");
  assert.equal(res[1].value, "100");
  assert.equal(res[2].value, "4");
});

test("UTT project value", () => {
  const v = projectValue(1000000, 0, 8, 5);
  assert.ok(Math.abs(v - 1489846) < 1, `got ${v}`);
});

test("UTT calculator compute", () => {
  const res = uttCalculator.compute({ fund: "money-market", amount: "1000000", contribution: "0", years: "5" }, USD);
  assert.equal(res[0].value, "TSh 1,489,846");
});

test("standard deviation", () => {
  const res = standardDeviation.compute({ numbers: "10, 12, 23, 23, 16" }, USD);
  assert.equal(res[0].value, "16.8"); // mean
  assert.equal(res[1].value, "5.42"); // population sd
});

test("inflation (future value)", () => {
  const res = inflation.compute({ mode: "future", amount: "100000", rate: "5", years: "10" }, USD);
  assert.equal(res[0].value, "$162,889.46");
});

test("debt-to-income", () => {
  const res = debtToIncome.compute({ debt: "500", income: "2000" }, USD);
  assert.equal(res[0].value, "25%");
  assert.equal(res[1].value, "Healthy");
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
