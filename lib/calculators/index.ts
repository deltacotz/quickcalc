import type { CalculatorSpec } from "./types";
import { percentage, age, dateDifference, tip, discount, fuelCost } from "./everyday";
import { mortgage, loan, compoundInterest, salaryToHourly } from "./finance";
import { bmi, calorie } from "./health";

export type { CalculatorSpec, CalcResult, FieldDef, Inputs } from "./types";

/** All widget-driven calculators. The GPA calculator uses a custom component. */
export const CALCULATORS: CalculatorSpec[] = [
  percentage,
  bmi,
  age,
  dateDifference,
  mortgage,
  loan,
  compoundInterest,
  salaryToHourly,
  calorie,
  tip,
  discount,
  fuelCost,
];

export function getCalculator(slug: string): CalculatorSpec | undefined {
  return CALCULATORS.find((c) => c.slug === slug);
}
