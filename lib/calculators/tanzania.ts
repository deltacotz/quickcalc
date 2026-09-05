import type { CalcResult, CalculatorSpec, Inputs } from "./types";
import { num } from "./types";
import { formatCurrency } from "../currency";

// Tanzania resident PAYE monthly bands (TZS). Verify against the latest TRA rates.
export const PAYE_BANDS = [
  { upTo: 270000, rate: 0 },
  { upTo: 520000, rate: 0.08 },
  { upTo: 760000, rate: 0.2 },
  { upTo: 1000000, rate: 0.25 },
  { upTo: Infinity, rate: 0.3 },
];

/** Monthly PAYE tax for a given gross monthly salary (progressive). */
export function payeTax(monthlySalary: number): number {
  let tax = 0;
  let prev = 0;
  for (const band of PAYE_BANDS) {
    if (monthlySalary > prev) {
      const taxable = Math.min(monthlySalary, band.upTo) - prev;
      tax += taxable * band.rate;
    }
    prev = band.upTo;
  }
  return tax;
}

export const tanzaniaPaye: CalculatorSpec = {
  slug: "tanzania-paye-calculator",
  fields: [
    { id: "salary", label: "Gross monthly salary", type: "number", unit: "TSh", default: "1000000", min: 0, step: "1000" },
  ],
  compute: (inp: Inputs) => {
    const salary = num(inp, "salary");
    if (salary <= 0) return [{ label: "Error", value: "—", note: "Enter a positive salary." }];
    const monthlyTax = payeTax(salary);
    const netMonthly = salary - monthlyTax;
    return [
      { label: "Net (take-home) monthly", value: formatCurrency(netMonthly, "TZS"), highlight: true },
      { label: "PAYE tax (monthly)", value: formatCurrency(monthlyTax, "TZS") },
      { label: "Net (take-home) annual", value: formatCurrency(netMonthly * 12, "TZS") },
      { label: "PAYE tax (annual)", value: formatCurrency(monthlyTax * 12, "TZS") },
    ];
  },
};

export const tanzaniaVat: CalculatorSpec = {
  slug: "tanzania-vat-calculator",
  fields: [
    {
      id: "mode",
      label: "Calculation",
      type: "select",
      options: [
        { value: "add", label: "Add VAT (price excl. VAT)" },
        { value: "remove", label: "Remove VAT (price incl. VAT)" },
      ],
      default: "add",
    },
    { id: "amount", label: "Amount", type: "number", unit: "TSh", default: "100000", min: 0, step: "1000" },
    { id: "rate", label: "VAT rate", type: "number", unit: "%", default: "18", min: 0, step: "0.5" },
  ],
  compute: (inp: Inputs) => {
    const amount = num(inp, "amount");
    const rate = num(inp, "rate");
    if (amount <= 0) return [{ label: "Error", value: "—", note: "Enter a positive amount." }];
    const add = inp.mode !== "remove";
    const vat = add ? (amount * rate) / 100 : amount - amount / (1 + rate / 100);
    const excl = add ? amount : amount / (1 + rate / 100);
    const total = add ? amount + vat : amount;
    const f = (v: number) => formatCurrency(v, "TZS");
    const results: CalcResult[] = [];
    if (add) {
      results.push({ label: "VAT amount", value: f(vat) });
      results.push({ label: "Total incl. VAT", value: f(total), highlight: true });
      results.push({ label: "Amount excl. VAT", value: f(excl) });
    } else {
      results.push({ label: "Amount excl. VAT", value: f(excl), highlight: true });
      results.push({ label: "VAT amount", value: f(vat) });
      results.push({ label: "Total incl. VAT", value: f(total) });
    }
    return results;
  },
};

// National Social Security Fund (private sector) — flat 20% total.
// Verify against the latest NSSF rates: 10% employee + 10% employer on gross
// monthly wage, no salary ceiling (NSSF Act, Cap 50 s.13).
export const NSSF_EMPLOYEE_RATE = 0.1;
export const NSSF_EMPLOYER_RATE = 0.1;

export function nssfEmployee(salary: number): number {
  return salary * NSSF_EMPLOYEE_RATE;
}
export function nssfEmployer(salary: number): number {
  return salary * NSSF_EMPLOYER_RATE;
}

export const tanzaniaNssf: CalculatorSpec = {
  slug: "tanzania-nssf-calculator",
  fields: [
    { id: "salary", label: "Gross monthly salary", type: "number", unit: "TSh", default: "1000000", min: 0, step: "1000" },
  ],
  compute: (inp: Inputs) => {
    const salary = num(inp, "salary");
    if (salary <= 0) return [{ label: "Error", value: "—", note: "Enter a positive salary." }];
    const employee = nssfEmployee(salary);
    const employer = nssfEmployer(salary);
    // Employee NSSF is deducted before PAYE is computed.
    const monthlyTax = payeTax(salary - employee);
    const netMonthly = salary - employee - monthlyTax;
    const f = (v: number) => formatCurrency(v, "TZS");
    return [
      { label: "Net (take-home) monthly", value: f(netMonthly), highlight: true },
      { label: "Employee NSSF (10%)", value: f(employee) },
      { label: "Employer NSSF (10%)", value: f(employer) },
      { label: "Total NSSF (20%)", value: f(employee + employer) },
      { label: "PAYE tax (monthly)", value: f(monthlyTax) },
      { label: "Net (take-home) annual", value: f(netMonthly * 12) },
    ];
  },
};

// Public Service Social Security Fund (public sector) — flat 20% total,
// split 15% employer / 5% employee (Public Service Social Security Fund Act
// No. 2 of 2018, Part IV). Verify against the latest PSSSF rates.
export const PSSSF_EMPLOYEE_RATE = 0.05;
export const PSSSF_EMPLOYER_RATE = 0.15;

export function psssfEmployee(salary: number): number {
  return salary * PSSSF_EMPLOYEE_RATE;
}
export function psssfEmployer(salary: number): number {
  return salary * PSSSF_EMPLOYER_RATE;
}

/** Retirement pension estimate: (1/580) × months of service × annual pensionable emoluments. */
export function psssfGratuity(monthsOfService: number, annualEmoluments: number): number {
  return (monthsOfService * annualEmoluments) / 580;
}

export const tanzaniaPsssf: CalculatorSpec = {
  slug: "tanzania-psssf-calculator",
  fields: [
    {
      id: "mode",
      label: "Calculation",
      type: "select",
      options: [
        { value: "paycheck", label: "Monthly deductions (take-home pay)" },
        { value: "retirement", label: "Retirement pension estimate" },
      ],
      default: "paycheck",
    },
    { id: "salary", label: "Gross monthly salary", type: "number", unit: "TSh", default: "1000000", min: 0, step: "1000" },
    { id: "months", label: "Months of service", type: "number", unit: "mo", default: "180", min: 0, step: "1" },
  ],
  compute: (inp: Inputs) => {
    const salary = num(inp, "salary");
    if (salary <= 0) return [{ label: "Error", value: "—", note: "Enter a positive salary." }];
    const f = (v: number) => formatCurrency(v, "TZS");

    if (inp.mode === "retirement") {
      const months = num(inp, "months");
      if (months <= 0) return [{ label: "Error", value: "—", note: "Enter months of service." }];
      const annualEmoluments = salary * 12;
      const gratuity = psssfGratuity(months, annualEmoluments);
      return [
        { label: "Estimated gratuity (commuted pension)", value: f(gratuity), highlight: true },
        { label: "Estimated monthly pension", value: f(gratuity / 12) },
        { label: "Annual pensionable emoluments (APE)", value: f(annualEmoluments) },
        { label: "Months of service", value: String(months) },
        { label: "Note", value: "—", note: "Estimate only — retirees before age 60 may receive a reduced pension." },
      ];
    }

    const employee = psssfEmployee(salary);
    const employer = psssfEmployer(salary);
    const monthlyTax = payeTax(salary - employee);
    const netMonthly = salary - employee - monthlyTax;
    return [
      { label: "Net (take-home) monthly", value: f(netMonthly), highlight: true },
      { label: "Employee PSSSF (5%)", value: f(employee) },
      { label: "Employer PSSSF (15%)", value: f(employer) },
      { label: "Total PSSSF (20%)", value: f(employee + employer) },
      { label: "PAYE tax (monthly)", value: f(monthlyTax) },
      { label: "Net (take-home) annual", value: f(netMonthly * 12) },
    ];
  },
};

// Skills Development Levy (SDL) — employer-borne, 3.5% of total gross monthly
// emoluments, applies only to employers with 10 or more employees.
export const SDL_RATE = 0.035;
export const SDL_EMPLOYEE_THRESHOLD = 10;

export function sdlEmployer(payroll: number): number {
  return payroll * SDL_RATE;
}

// Workers Compensation Fund (WCF) — employer-borne, 0.5% of cash paid to
// employees (unified rate for all sectors). Historical 0.6% private-sector rate
// is flagged in the content disclaimer.
export const WCF_RATE = 0.005;

export function wcfEmployer(payroll: number): number {
  return payroll * WCF_RATE;
}

/** True when SDL applies to an employer (10+ employees, or an explicit override). */
function sdlApplies(employees: number, override: string): boolean {
  if (override === "yes") return true;
  if (override === "no") return false;
  return employees >= SDL_EMPLOYEE_THRESHOLD;
}

export const tanzaniaEmployerCost: CalculatorSpec = {
  slug: "tanzania-employer-cost-calculator",
  fields: [
    { id: "salary", label: "Gross monthly salary (per employee)", type: "number", unit: "TSh", default: "1000000", min: 0, step: "1000" },
    { id: "employees", label: "Number of employees", type: "number", unit: "", default: "1", min: 1, step: "1" },
    {
      id: "sdl",
      label: "SDL (Skills Development Levy)",
      type: "select",
      options: [
        { value: "auto", label: "Auto — apply if 10+ employees" },
        { value: "yes", label: "Yes — employer is SDL-liable" },
        { value: "no", label: "No — exempt" },
      ],
      default: "auto",
    },
  ],
  compute: (inp: Inputs) => {
    const salary = num(inp, "salary");
    if (salary <= 0) return [{ label: "Error", value: "—", note: "Enter a positive salary." }];
    const employees = Math.max(1, num(inp, "employees"));
    const f = (v: number) => formatCurrency(v, "TZS");

    const nssfEr = nssfEmployer(salary);
    const appliesSdl = sdlApplies(employees, inp.sdl ?? "auto");
    const sdl = appliesSdl ? sdlEmployer(salary) : 0;
    const wcf = wcfEmployer(salary);
    const onCost = nssfEr + sdl + wcf;
    const totalCost = salary + onCost;

    return [
      { label: "Total cost to employer (per employee)", value: f(totalCost), highlight: true },
      { label: "Gross salary", value: f(salary) },
      { label: "NSSF employer (10%)", value: f(nssfEr) },
      { label: "SDL (3.5%)", value: f(sdl), note: appliesSdl ? "Applies at 10+ employees." : "Exempt — fewer than 10 employees." },
      { label: "WCF (0.5%)", value: f(wcf) },
      { label: "Total employer on-cost", value: f(onCost) },
    ];
  },
};

export const tanzaniaSdl: CalculatorSpec = {
  slug: "tanzania-sdl-calculator",
  fields: [
    { id: "payroll", label: "Total gross monthly payroll", type: "number", unit: "TSh", default: "1000000", min: 0, step: "1000" },
    { id: "employees", label: "Number of employees", type: "number", unit: "", default: "10", min: 0, step: "1" },
  ],
  compute: (inp: Inputs) => {
    const payroll = num(inp, "payroll");
    if (payroll <= 0) return [{ label: "Error", value: "—", note: "Enter a positive payroll." }];
    const employees = num(inp, "employees");
    const f = (v: number) => formatCurrency(v, "TZS");
    const applies = employees >= SDL_EMPLOYEE_THRESHOLD;
    const levy = applies ? sdlEmployer(payroll) : 0;
    return [
      { label: "SDL levy (monthly)", value: f(levy), highlight: true },
      { label: "Total gross payroll", value: f(payroll) },
      { label: "SDL rate", value: "3.5%" },
      { label: "Status", value: applies ? "Liable (10+ employees)" : "Exempt (fewer than 10 employees)" },
    ];
  },
};

export const tanzaniaWcf: CalculatorSpec = {
  slug: "tanzania-wcf-calculator",
  fields: [
    { id: "payroll", label: "Total gross monthly payroll", type: "number", unit: "TSh", default: "1000000", min: 0, step: "1000" },
  ],
  compute: (inp: Inputs) => {
    const payroll = num(inp, "payroll");
    if (payroll <= 0) return [{ label: "Error", value: "—", note: "Enter a positive payroll." }];
    const f = (v: number) => formatCurrency(v, "TZS");
    return [
      { label: "WCF contribution (monthly)", value: f(wcfEmployer(payroll)), highlight: true },
      { label: "Total gross payroll", value: f(payroll) },
      { label: "WCF rate", value: "0.5%" },
    ];
  },
};
