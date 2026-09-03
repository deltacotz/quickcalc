// Unit-conversion engine.
//
// Every dimension defines a base unit and a set of units. A value is converted
// to the base via `base = value * factor + offset`, then out of the base via
// `value = (base - offset) / factor`. The `offset` field exists only for
// temperature, which has no common zero point (affine transform).
//
// Unit `id`s are search-friendly slugs (no "-to-" substring) used in pair URLs
// like /converters/length/miles-to-kilometers.

export interface Unit {
  id: string;
  label: string;
  symbol: string;
  factor: number;
  offset?: number;
}

export interface Dimension {
  id: string;
  label: string;
  baseUnitId: string;
  description: string;
  faq: { q: string; a: string }[];
  units: Unit[];
}

export const DIMENSIONS: Dimension[] = [
  {
    id: "length",
    label: "Length",
    baseUnitId: "meters",
    description:
      "Convert between metric and imperial length units — millimeters, centimeters, meters, kilometers, inches, feet, yards, miles and nautical miles.",
    faq: [
      {
        q: "How many kilometers are in a mile?",
        a: "One mile equals exactly 1.609344 kilometers. To convert miles to kilometers, multiply the number of miles by 1.609344.",
      },
      {
        q: "How many centimeters are in an inch?",
        a: "One inch equals exactly 2.54 centimeters. To convert inches to centimeters, multiply by 2.54.",
      },
      {
        q: "How many feet are in a meter?",
        a: "One meter equals approximately 3.28084 feet. To convert meters to feet, multiply by 3.28084.",
      },
    ],
    units: [
      { id: "millimeters", label: "Millimeters", symbol: "mm", factor: 0.001 },
      { id: "centimeters", label: "Centimeters", symbol: "cm", factor: 0.01 },
      { id: "meters", label: "Meters", symbol: "m", factor: 1 },
      { id: "kilometers", label: "Kilometers", symbol: "km", factor: 1000 },
      { id: "inches", label: "Inches", symbol: "in", factor: 0.0254 },
      { id: "feet", label: "Feet", symbol: "ft", factor: 0.3048 },
      { id: "yards", label: "Yards", symbol: "yd", factor: 0.9144 },
      { id: "miles", label: "Miles", symbol: "mi", factor: 1609.344 },
      { id: "nautical-miles", label: "Nautical miles", symbol: "nmi", factor: 1852 },
    ],
  },
  {
    id: "weight",
    label: "Weight & Mass",
    baseUnitId: "kilograms",
    description:
      "Convert between metric and imperial weight and mass units — milligrams, grams, kilograms, tonnes, ounces, pounds and stones.",
    faq: [
      {
        q: "How many pounds are in a kilogram?",
        a: "One kilogram equals approximately 2.20462 pounds. To convert kilograms to pounds, multiply by 2.20462.",
      },
      {
        q: "How many grams are in an ounce?",
        a: "One ounce equals exactly 28.349523125 grams. To convert ounces to grams, multiply by 28.349523125.",
      },
      {
        q: "How many pounds are in a stone?",
        a: "One stone equals exactly 14 pounds. To convert stones to pounds, multiply by 14.",
      },
    ],
    units: [
      { id: "milligrams", label: "Milligrams", symbol: "mg", factor: 1e-6 },
      { id: "grams", label: "Grams", symbol: "g", factor: 0.001 },
      { id: "kilograms", label: "Kilograms", symbol: "kg", factor: 1 },
      { id: "tonnes", label: "Tonnes (metric)", symbol: "t", factor: 1000 },
      { id: "ounces", label: "Ounces", symbol: "oz", factor: 0.028349523125 },
      { id: "pounds", label: "Pounds", symbol: "lb", factor: 0.45359237 },
      { id: "stones", label: "Stones", symbol: "st", factor: 6.35029318 },
    ],
  },
  {
    id: "temperature",
    label: "Temperature",
    baseUnitId: "celsius",
    description:
      "Convert between Celsius, Fahrenheit and Kelvin. Temperature is an affine scale, so conversions use both a multiplier and an offset.",
    faq: [
      {
        q: "How do I convert Celsius to Fahrenheit?",
        a: "Multiply the Celsius value by 9/5 and add 32: °F = °C × 9/5 + 32. For example, 100°C = 212°F.",
      },
      {
        q: "How do I convert Fahrenheit to Celsius?",
        a: "Subtract 32 from the Fahrenheit value, then multiply by 5/9: °C = (°F − 32) × 5/9.",
      },
      {
        q: "What is absolute zero in Celsius?",
        a: "Absolute zero is 0 Kelvin, which equals −273.15°C or −459.67°F.",
      },
    ],
    units: [
      { id: "celsius", label: "Celsius", symbol: "°C", factor: 1, offset: 0 },
      { id: "fahrenheit", label: "Fahrenheit", symbol: "°F", factor: 5 / 9, offset: (-32 * 5) / 9 },
      { id: "kelvin", label: "Kelvin", symbol: "K", factor: 1, offset: -273.15 },
    ],
  },
  {
    id: "area",
    label: "Area",
    baseUnitId: "square-meters",
    description:
      "Convert between metric and imperial area units — square meters, square kilometers, hectares, acres, square feet, square yards and more.",
    faq: [
      {
        q: "How many square feet are in an acre?",
        a: "One acre equals exactly 43,560 square feet.",
      },
      {
        q: "How many square meters are in a hectare?",
        a: "One hectare equals exactly 10,000 square meters.",
      },
      {
        q: "How do I convert square feet to square meters?",
        a: "Multiply the square-foot value by 0.09290304 to get square meters.",
      },
    ],
    units: [
      { id: "square-millimeters", label: "Square millimeters", symbol: "mm²", factor: 1e-6 },
      { id: "square-centimeters", label: "Square centimeters", symbol: "cm²", factor: 1e-4 },
      { id: "square-meters", label: "Square meters", symbol: "m²", factor: 1 },
      { id: "square-kilometers", label: "Square kilometers", symbol: "km²", factor: 1e6 },
      { id: "hectares", label: "Hectares", symbol: "ha", factor: 10000 },
      { id: "acres", label: "Acres", symbol: "ac", factor: 4046.8564224 },
      { id: "square-feet", label: "Square feet", symbol: "ft²", factor: 0.09290304 },
      { id: "square-inches", label: "Square inches", symbol: "in²", factor: 0.00064516 },
      { id: "square-yards", label: "Square yards", symbol: "yd²", factor: 0.83612736 },
      { id: "square-miles", label: "Square miles", symbol: "mi²", factor: 2589988.110336 },
    ],
  },
  {
    id: "volume",
    label: "Volume",
    baseUnitId: "liters",
    description:
      "Convert between metric and imperial volume units — milliliters, liters, cubic meters, gallons, quarts, pints, fluid ounces and cups.",
    faq: [
      {
        q: "How many liters are in a US gallon?",
        a: "One US gallon equals approximately 3.78541 liters.",
      },
      {
        q: "How many milliliters are in a cup?",
        a: "One US cup equals 236.5882365 milliliters.",
      },
      {
        q: "What is the difference between US and imperial gallons?",
        a: "A US gallon is about 3.785 liters, while an imperial gallon is about 4.546 liters.",
      },
    ],
    units: [
      { id: "milliliters", label: "Milliliters", symbol: "mL", factor: 0.001 },
      { id: "liters", label: "Liters", symbol: "L", factor: 1 },
      { id: "cubic-meters", label: "Cubic meters", symbol: "m³", factor: 1000 },
      { id: "cubic-centimeters", label: "Cubic centimeters", symbol: "cm³", factor: 0.001 },
      { id: "cubic-inches", label: "Cubic inches", symbol: "in³", factor: 0.016387064 },
      { id: "cubic-feet", label: "Cubic feet", symbol: "ft³", factor: 28.316846592 },
      { id: "us-gallons", label: "US gallons", symbol: "gal", factor: 3.785411784 },
      { id: "us-quarts", label: "US quarts", symbol: "qt", factor: 0.946352946 },
      { id: "us-pints", label: "US pints", symbol: "pt", factor: 0.473176473 },
      { id: "us-fluid-ounces", label: "US fluid ounces", symbol: "fl oz", factor: 0.0295735295625 },
      { id: "imperial-gallons", label: "Imperial gallons", symbol: "imp gal", factor: 4.54609 },
      { id: "us-cups", label: "US cups", symbol: "cup", factor: 0.2365882365 },
    ],
  },
  {
    id: "speed",
    label: "Speed",
    baseUnitId: "meters-per-second",
    description:
      "Convert between speed units — meters per second, kilometers per hour, miles per hour, knots and feet per second. Free instant converter.",
    faq: [
      {
        q: "How do I convert mph to km/h?",
        a: "Multiply the miles-per-hour value by 1.609344 to get kilometers per hour.",
      },
      {
        q: "How many km/h is one knot?",
        a: "One knot equals exactly 1.852 km/h.",
      },
      {
        q: "How do I convert km/h to m/s?",
        a: "Divide the kilometers-per-hour value by 3.6 to get meters per second.",
      },
    ],
    units: [
      { id: "meters-per-second", label: "Meters per second", symbol: "m/s", factor: 1 },
      { id: "kilometers-per-hour", label: "Kilometers per hour", symbol: "km/h", factor: 1 / 3.6 },
      { id: "miles-per-hour", label: "Miles per hour", symbol: "mph", factor: 0.44704 },
      { id: "knots", label: "Knots", symbol: "kn", factor: 0.5144444444444445 },
      { id: "feet-per-second", label: "Feet per second", symbol: "ft/s", factor: 0.3048 },
    ],
  },
  {
    id: "data",
    label: "Data Storage",
    baseUnitId: "bytes",
    description:
      "Convert between digital storage units — bits, bytes, kilobytes, megabytes, gigabytes, terabytes and petabytes. Uses binary (1,024) multiples.",
    faq: [
      {
        q: "How many bytes are in a kilobyte?",
        a: "Using binary (1,024) multiples, one kilobyte (KB) equals 1,024 bytes.",
      },
      {
        q: "How many megabytes are in a gigabyte?",
        a: "One gigabyte (GB) equals 1,024 megabytes (MB).",
      },
      {
        q: "How many bits are in a byte?",
        a: "One byte equals exactly 8 bits.",
      },
    ],
    units: [
      { id: "bits", label: "Bits", symbol: "b", factor: 0.125 },
      { id: "bytes", label: "Bytes", symbol: "B", factor: 1 },
      { id: "kilobytes", label: "Kilobytes", symbol: "KB", factor: 1024 },
      { id: "megabytes", label: "Megabytes", symbol: "MB", factor: 1024 ** 2 },
      { id: "gigabytes", label: "Gigabytes", symbol: "GB", factor: 1024 ** 3 },
      { id: "terabytes", label: "Terabytes", symbol: "TB", factor: 1024 ** 4 },
      { id: "petabytes", label: "Petabytes", symbol: "PB", factor: 1024 ** 5 },
    ],
  },
  {
    id: "time",
    label: "Time",
    baseUnitId: "seconds",
    description:
      "Convert between time units — milliseconds, seconds, minutes, hours, days, weeks, months (average) and years (average). Free instant converter.",
    faq: [
      {
        q: "How many seconds are in an hour?",
        a: "There are 3,600 seconds in one hour.",
      },
      {
        q: "How many days are in a year?",
        a: "The average Gregorian year has 365.25 days, which accounts for leap years.",
      },
      {
        q: "How many minutes are in a day?",
        a: "There are 1,440 minutes in a day.",
      },
    ],
    units: [
      { id: "milliseconds", label: "Milliseconds", symbol: "ms", factor: 0.001 },
      { id: "seconds", label: "Seconds", symbol: "s", factor: 1 },
      { id: "minutes", label: "Minutes", symbol: "min", factor: 60 },
      { id: "hours", label: "Hours", symbol: "h", factor: 3600 },
      { id: "days", label: "Days", symbol: "d", factor: 86400 },
      { id: "weeks", label: "Weeks", symbol: "wk", factor: 604800 },
      { id: "months", label: "Months (avg)", symbol: "mo", factor: 2629800 },
      { id: "years", label: "Years (avg)", symbol: "yr", factor: 31557600 },
    ],
  },
  {
    id: "power",
    label: "Power",
    baseUnitId: "watts",
    description:
      "Convert between power units — milliwatts, watts, kilowatts, megawatts, horsepower, metric horsepower and BTU per hour. Free instant converter.",
    faq: [
      {
        q: "How many watts are in a horsepower?",
        a: "One mechanical horsepower equals about 745.7 watts.",
      },
      {
        q: "How do I convert kilowatts to horsepower?",
        a: "Multiply kilowatts by about 1.341 to get horsepower (1 kW ≈ 1.341 hp).",
      },
      {
        q: "What is a BTU per hour?",
        a: "BTU per hour is a measure of heating/cooling power; 1 BTU/h equals about 0.293 watts.",
      },
    ],
    units: [
      { id: "milliwatts", label: "Milliwatts", symbol: "mW", factor: 0.001 },
      { id: "watts", label: "Watts", symbol: "W", factor: 1 },
      { id: "kilowatts", label: "Kilowatts", symbol: "kW", factor: 1000 },
      { id: "megawatts", label: "Megawatts", symbol: "MW", factor: 1e6 },
      { id: "horsepower", label: "Horsepower (mechanical)", symbol: "hp", factor: 745.6998715822702 },
      { id: "metric-horsepower", label: "Metric horsepower", symbol: "PS", factor: 735.49875 },
      { id: "btu-per-hour", label: "BTU per hour", symbol: "BTU/h", factor: 0.29307107 },
    ],
  },
  {
    id: "energy",
    label: "Energy",
    baseUnitId: "joules",
    description:
      "Convert between energy units — joules, kilojoules, megajoules, calories, kilocalories, watt-hours, kilowatt-hours and BTU.",
    faq: [
      {
        q: "How many joules are in a calorie?",
        a: "One calorie equals 4.184 joules, and one food Calorie (kilocalorie) equals 4,184 joules.",
      },
      {
        q: "How many joules are in a kilowatt-hour?",
        a: "One kilowatt-hour equals 3.6 million joules.",
      },
      {
        q: "What is a BTU?",
        a: "A British Thermal Unit is the energy needed to heat one pound of water by 1°F; it equals about 1,055 joules.",
      },
    ],
    units: [
      { id: "joules", label: "Joules", symbol: "J", factor: 1 },
      { id: "kilojoules", label: "Kilojoules", symbol: "kJ", factor: 1000 },
      { id: "megajoules", label: "Megajoules", symbol: "MJ", factor: 1e6 },
      { id: "watt-hours", label: "Watt-hours", symbol: "Wh", factor: 3600 },
      { id: "kilowatt-hours", label: "Kilowatt-hours", symbol: "kWh", factor: 3.6e6 },
      { id: "calories", label: "Calories", symbol: "cal", factor: 4.184 },
      { id: "kilocalories", label: "Kilocalories", symbol: "kcal", factor: 4184 },
      { id: "btu", label: "BTU", symbol: "BTU", factor: 1055.05585262 },
    ],
  },
  {
    id: "pressure",
    label: "Pressure",
    baseUnitId: "pascals",
    description:
      "Convert between pressure units — pascals, kilopascals, megapascals, bar, millibar, atmospheres, psi, mmHg and inches of mercury.",
    faq: [
      {
        q: "How many psi are in a bar?",
        a: "One bar equals about 14.5 psi.",
      },
      {
        q: "How do I convert psi to kPa?",
        a: "Multiply psi by about 6.895 to get kilopascals.",
      },
      {
        q: "What is standard atmospheric pressure?",
        a: "Standard atmospheric pressure is 1 atm, which equals 101,325 pascals, about 14.7 psi, or 760 mmHg.",
      },
    ],
    units: [
      { id: "pascals", label: "Pascals", symbol: "Pa", factor: 1 },
      { id: "kilopascals", label: "Kilopascals", symbol: "kPa", factor: 1000 },
      { id: "megapascals", label: "Megapascals", symbol: "MPa", factor: 1e6 },
      { id: "bar", label: "Bar", symbol: "bar", factor: 100000 },
      { id: "millibar", label: "Millibar", symbol: "mbar", factor: 100 },
      { id: "atmospheres", label: "Atmospheres", symbol: "atm", factor: 101325 },
      { id: "psi", label: "Pounds per square inch", symbol: "psi", factor: 6894.757293168 },
      { id: "millimeters-of-mercury", label: "Millimeters of mercury", symbol: "mmHg", factor: 133.322387415 },
      { id: "inches-of-mercury", label: "Inches of mercury", symbol: "inHg", factor: 3386.389 },
    ],
  },
];

export function getDimension(id: string): Dimension | undefined {
  return DIMENSIONS.find((d) => d.id === id);
}

export function getUnit(dimensionId: string, unitId: string): Unit | undefined {
  return getDimension(dimensionId)?.units.find((u) => u.id === unitId);
}

/** Convert a value from one unit to another within the same dimension. */
export function convert(value: number, from: Unit, to: Unit): number {
  const base = value * from.factor + (from.offset ?? 0);
  return (base - (to.offset ?? 0)) / to.factor;
}

/** Stable slug for an ordered unit pair. Unit ids never contain "-to-". */
export function pairSlug(fromId: string, toId: string): string {
  return `${fromId}-to-${toId}`;
}

export interface UnitPair {
  dimensionId: string;
  from: Unit;
  to: Unit;
}

/** Every ordered (from, to) pair across all dimensions, excluding same-unit. */
export function getAllPairs(): UnitPair[] {
  const pairs: UnitPair[] = [];
  for (const dim of DIMENSIONS) {
    for (const from of dim.units) {
      for (const to of dim.units) {
        if (from.id !== to.id) pairs.push({ dimensionId: dim.id, from, to });
      }
    }
  }
  return pairs;
}

/**
 * Related pairs for a given ordered pair — used for the "Related conversions"
 * internal-linking block on every converter pair page.
 *
 * Returns the reverse pair plus up to `limit` siblings that share either the
 * source or the target unit, ordered so the reverse pair comes first and pairs
 * are de-duplicated. This circulates link equity across the near-orphan pair
 * pages and lets users hop to the reciprocal conversion in one click.
 */
export function getRelatedPairs(
  dimensionId: string,
  fromId: string,
  toId: string,
  limit = 8,
): UnitPair[] {
  const dim = getDimension(dimensionId);
  if (!dim) return [];

  const from = dim.units.find((u) => u.id === fromId);
  const to = dim.units.find((u) => u.id === toId);
  if (!from || !to) return [];

  // 1) The reverse (reciprocal) conversion — always most useful.
  const reverse: UnitPair = { dimensionId, from: to, to: from };

  // 2) Siblings sharing the source or target unit, de-duplicated and stable.
  const siblingIds: { from: Unit; to: Unit }[] = [];
  for (const u of dim.units) {
    if (u.id === fromId || u.id === toId) continue;
    siblingIds.push({ from, to: u }); // from -> every other unit
    siblingIds.push({ from: u, to }); // every other unit -> to
  }

  // Stable-ish order: keep dimension declaration order, cap at `limit`.
  const siblings = siblingIds.slice(0, limit).map(
    (s): UnitPair => ({ dimensionId, from: s.from, to: s.to }),
  );

  return [reverse, ...siblings];
}

/** Resolve a URL pair slug back to its units (unambiguous via full match). */
export function resolvePair(dimensionId: string, slug: string): UnitPair | null {
  const dim = getDimension(dimensionId);
  if (!dim) return null;
  for (const from of dim.units) {
    for (const to of dim.units) {
      if (from.id !== to.id && pairSlug(from.id, to.id) === slug) {
        return { dimensionId, from, to };
      }
    }
  }
  return null;
}
