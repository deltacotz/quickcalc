import type { CalculatorSpec } from "./types";
import { percentage, age, dateDifference, tip, discount, fuelCost, pregnancy, average, standardDeviation } from "./everyday";
import { mortgage, loan, compoundInterest, salaryToHourly, retirement, inflation, debtToIncome } from "./finance";
import { bmi, calorie, bodyFat } from "./health";
import { paint, electrical } from "./home";
import { tanzaniaPaye, tanzaniaVat } from "./tanzania";
import { mobileMoneyFee } from "./mobilemoney";
import { uttCalculator } from "./utt";

export type { CalculatorSpec, CalcResult, FieldDef, Inputs } from "./types";

/** All widget-driven calculators. Custom-component calculators (GPA, currency, timezone) are excluded. */
export const CALCULATORS: CalculatorSpec[] = [
  percentage,
  bmi,
  age,
  dateDifference,
  mortgage,
  loan,
  compoundInterest,
  salaryToHourly,
  retirement,
  calorie,
  bodyFat,
  pregnancy,
  tip,
  discount,
  fuelCost,
  paint,
  electrical,
  tanzaniaPaye,
  tanzaniaVat,
  mobileMoneyFee,
  average,
  uttCalculator,
  standardDeviation,
  inflation,
  debtToIncome,
];

export function getCalculator(slug: string): CalculatorSpec | undefined {
  return CALCULATORS.find((c) => c.slug === slug);
}
