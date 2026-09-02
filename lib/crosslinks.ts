// Cross-links between the unit-converter cluster and the calculator cluster.
//
// The two clusters were internally linked but not connected to each other, which
// left them siloed in the link graph. This module maps each converter dimension
// to the calculators that naturally use it, so converter pages can point at
// relevant calculators and calculator pages can point back at the converter.
//
// Only sensible editorial matches are listed; empty lists simply render no block.

export interface CrosslinkTool {
  slug: string;
  name: string;
}

/** Converter dimension id -> calculators that use that kind of measurement. */
export const DIMENSION_TOOLS: Record<string, CrosslinkTool[]> = {
  length: [
    { slug: "bmi-calculator", name: "BMI Calculator" },
    { slug: "body-fat-calculator", name: "Body Fat Calculator" },
  ],
  weight: [
    { slug: "bmi-calculator", name: "BMI Calculator" },
    { slug: "body-fat-calculator", name: "Body Fat Calculator" },
    { slug: "calorie-calculator", name: "Calorie Calculator" },
  ],
  temperature: [],
  area: [{ slug: "paint-calculator", name: "Paint Calculator" }],
  volume: [{ slug: "fuel-cost-calculator", name: "Fuel Cost Calculator" }],
  speed: [{ slug: "fuel-cost-calculator", name: "Fuel Cost Calculator" }],
  data: [],
  time: [
    { slug: "age-calculator", name: "Age Calculator" },
    { slug: "date-difference-calculator", name: "Date Difference Calculator" },
    { slug: "pregnancy-due-date-calculator", name: "Pregnancy Due Date Calculator" },
    { slug: "time-zone-converter", name: "Time Zone Converter" },
  ],
  power: [{ slug: "amps-to-watts-calculator", name: "Amps to Watts Calculator" }],
  energy: [],
  pressure: [],
};

/** Converter dimension ids that a given calculator is linked to. */
export function getToolDimensions(slug: string): string[] {
  return Object.entries(DIMENSION_TOOLS)
    .filter(([, tools]) => tools.some((t) => t.slug === slug))
    .map(([dim]) => dim);
}
