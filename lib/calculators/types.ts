// Shared types for calculator widgets and their pure compute functions.

import type { Currency } from "../currency";

/** Raw string values captured from form inputs. */
export type Inputs = Record<string, string>;

export interface CalcResult {
  label: string;
  value: string;
  unit?: string;
  note?: string;
  highlight?: boolean;
}

/** Context passed to compute functions (currently just the active currency). */
export interface CalcContext {
  currency: Currency;
}

/** Resolve a field's unit suffix dynamically from current inputs + context. */
export type UnitResolver = (inputs: Inputs, ctx: CalcContext) => string | undefined;

export type FieldDef =
  | {
      id: string;
      label: string;
      type: "number";
      unit?: string | UnitResolver;
      placeholder?: string;
      default?: string;
      min?: number;
      step?: string;
    }
  | {
      id: string;
      label: string;
      type: "date";
      default?: string;
    }
  | {
      id: string;
      label: string;
      type: "select";
      options: { value: string; label: string }[];
      default?: string;
    };

export interface CalculatorSpec {
  slug: string;
  fields: FieldDef[];
  compute: (inputs: Inputs, ctx: CalcContext) => CalcResult[];
}

/** Parse an input value to a finite number (0 when absent/invalid). */
export function num(inputs: Inputs, id: string): number {
  const v = Number.parseFloat(inputs[id]);
  return Number.isFinite(v) ? v : 0;
}
