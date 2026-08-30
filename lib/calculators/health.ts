import type { CalculatorSpec, Inputs } from "./types";
import { num } from "./types";
import { formatNumber, roundTo } from "../format";

function bmiCategory(bmi: number): string {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal weight";
  if (bmi < 30) return "Overweight";
  return "Obese";
}

export const bmi: CalculatorSpec = {
  slug: "bmi-calculator",
  fields: [
    {
      id: "units",
      label: "Units",
      type: "select",
      options: [
        { value: "metric", label: "Metric (kg, cm)" },
        { value: "imperial", label: "Imperial (lb, in)" },
      ],
      default: "metric",
    },
    {
      id: "weight",
      label: "Weight",
      type: "number",
      unit: (inp) => (inp.units === "imperial" ? "lb" : "kg"),
      default: "70",
      min: 1,
      step: "0.1",
    },
    {
      id: "height",
      label: "Height",
      type: "number",
      unit: (inp) => (inp.units === "imperial" ? "in" : "cm"),
      default: "175",
      min: 1,
      step: "0.1",
    },
  ],
  compute: (inp: Inputs) => {
    const weight = num(inp, "weight");
    const height = num(inp, "height");
    if (weight <= 0 || height <= 0) return [{ label: "Error", value: "—", note: "Enter a positive weight and height." }];
    const imperial = inp.units === "imperial";
    const bmiValue = imperial
      ? (703 * weight) / (height * height)
      : weight / ((height / 100) * (height / 100));
    return [
      { label: "Your BMI", value: formatNumber(roundTo(bmiValue, 1), 1), highlight: true },
      { label: "Category", value: bmiCategory(bmiValue) },
      { label: "Healthy range", value: "18.5 – 24.9" },
    ];
  },
};

// Mifflin-St Jeor BMR (kcal/day), then TDEE via an activity multiplier.
function bmr(sex: string, weightKg: number, heightCm: number, ageYears: number): number {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * ageYears;
  return sex === "male" ? base + 5 : base - 161;
}

const ACTIVITY: Record<string, { label: string; factor: number }> = {
  sedentary: { label: "Sedentary (little exercise)", factor: 1.2 },
  light: { label: "Lightly active (1–3 days/week)", factor: 1.375 },
  moderate: { label: "Moderately active (3–5 days/week)", factor: 1.55 },
  active: { label: "Active (6–7 days/week)", factor: 1.725 },
  very: { label: "Very active (hard exercise)", factor: 1.9 },
};

export const calorie: CalculatorSpec = {
  slug: "calorie-calculator",
  fields: [
    {
      id: "sex",
      label: "Sex",
      type: "select",
      options: [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
      ],
      default: "male",
    },
    { id: "age", label: "Age", type: "number", default: "30", min: 1 },
    {
      id: "weight",
      label: "Weight",
      type: "number",
      unit: "kg",
      default: "70",
      min: 1,
      step: "0.1",
    },
    {
      id: "height",
      label: "Height",
      type: "number",
      unit: "cm",
      default: "175",
      min: 1,
      step: "0.1",
    },
    {
      id: "activity",
      label: "Activity level",
      type: "select",
      options: Object.entries(ACTIVITY).map(([value, v]) => ({ value, label: v.label })),
      default: "moderate",
    },
  ],
  compute: (inp: Inputs) => {
    const sex = inp.sex === "female" ? "female" : "male";
    const age = num(inp, "age");
    const weight = num(inp, "weight");
    const height = num(inp, "height");
    if (weight <= 0 || height <= 0 || age <= 0) {
      return [{ label: "Error", value: "—", note: "Enter positive age, weight and height." }];
    }
    const bmrValue = bmr(sex, weight, height, age);
    const tdee = bmrValue * (ACTIVITY[inp.activity]?.factor ?? 1.2);
    return [
      { label: "BMR (resting burn)", value: `${formatNumber(Math.round(bmrValue), 0)} kcal/day` },
      { label: "TDEE (maintenance)", value: `${formatNumber(Math.round(tdee), 0)} kcal/day`, highlight: true },
      { label: "Mild weight loss (−0.25 kg/wk)", value: `${formatNumber(Math.round(tdee - 250), 0)} kcal/day` },
      { label: "Mild weight gain (+0.25 kg/wk)", value: `${formatNumber(Math.round(tdee + 250), 0)} kcal/day` },
    ];
  },
};

export const HEALTH_CALCS = [bmi, calorie];
