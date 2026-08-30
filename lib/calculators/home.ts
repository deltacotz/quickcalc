import type { CalculatorSpec, Inputs } from "./types";
import { num } from "./types";
import { formatNumber } from "../format";

export const paint: CalculatorSpec = {
  slug: "paint-calculator",
  fields: [
    { id: "area", label: "Wall area", type: "number", unit: "ft²", default: "400", min: 1 },
    { id: "coats", label: "Number of coats", type: "number", default: "2", min: 1 },
    { id: "coverage", label: "Coverage", type: "number", unit: "ft²/gal", default: "350", min: 1 },
  ],
  compute: (inp: Inputs) => {
    const area = num(inp, "area");
    const coats = num(inp, "coats");
    const coverage = num(inp, "coverage");
    if (coverage <= 0) return [{ label: "Error", value: "—", note: "Coverage must be greater than zero." }];
    const gallons = (area * coats) / coverage;
    const liters = gallons * 3.785411784;
    return [
      { label: "Paint needed (rounded up)", value: `${formatNumber(Math.ceil(gallons), 0)} gal`, highlight: true },
      { label: "Exact amount", value: `${formatNumber(gallons, 2)} gal` },
      { label: "In liters", value: `${formatNumber(liters, 1)} L` },
    ];
  },
};

export const electrical: CalculatorSpec = {
  slug: "amps-to-watts-calculator",
  fields: [
    { id: "volts", label: "Voltage", type: "number", unit: "V", default: "230", min: 1 },
    { id: "amps", label: "Current", type: "number", unit: "A", default: "10", min: 0, step: "0.1" },
  ],
  compute: (inp: Inputs) => {
    const volts = num(inp, "volts");
    const amps = num(inp, "amps");
    const watts = volts * amps;
    return [
      { label: "Power", value: `${formatNumber(watts, 0)} W`, highlight: true },
      { label: "Kilowatts", value: `${formatNumber(watts / 1000, 3)} kW` },
      { label: "Energy (1 hour)", value: `${formatNumber(watts / 1000, 3)} kWh` },
    ];
  },
};

export const HOME_CALCS = [paint, electrical];
