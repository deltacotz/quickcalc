// Shared types for calculator widgets and their pure compute functions.

/** Raw string values captured from form inputs. */
export type Inputs = Record<string, string>;

export interface CalcResult {
  label: string;
  value: string;
  unit?: string;
  note?: string;
  highlight?: boolean;
}

/** Resolve a field's unit suffix dynamically from current inputs. */
export type UnitResolver = (inputs: Inputs) => string | undefined;

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
  compute: (inputs: Inputs) => CalcResult[];
}

/** Parse an input value to a finite number (0 when absent/invalid). */
export function num(inputs: Inputs, id: string): number {
  const v = Number.parseFloat(inputs[id]);
  return Number.isFinite(v) ? v : 0;
}
