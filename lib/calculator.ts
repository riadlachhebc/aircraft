import { CalculatorResults, CalculatorState } from "./types";

export const DEFAULT_CALCULATOR_STATE: CalculatorState = {
  watts: 1200,
  hoursPerDay: 8,
  costPerKwh: 0.168, // US EIA national residential average ~ $0.168/kWh
  days: 30,
  dutyCyclePercent: 100, // 100% = constant running; 60-70% typical for cycling thermostats
};

/**
 * Sanitizes and clamps numeric inputs against NaN, non-finite values, and unrealistic bounds.
 */
export function sanitizeNumber(
  val: unknown,
  fallback: number,
  min: number,
  max: number
): number {
  if (typeof val !== "number" || !Number.isFinite(val) || Number.isNaN(val)) {
    return fallback;
  }
  return Math.min(max, Math.max(min, val));
}

/**
 * Calculates energy consumption and running costs for household appliances.
 *
 * Formula:
 * Daily kWh (raw at 100% draw) = (Watts / 1,000) * hoursPerDay
 * Effective daily kWh = Daily kWh * (dutyCyclePercent / 100)
 * Daily Cost ($) = Effective daily kWh * costPerKwh
 * Period Cost ($) = Daily Cost * days
 * Seasonal Cost ($) = Daily Cost * 90 (typical 3-month cooling or heating season)
 * Annual Cost ($) = Daily Cost * 365
 */
export function calculateApplianceCosts(
  input: Partial<CalculatorState> = {}
): CalculatorResults {
  const watts = sanitizeNumber(input.watts, DEFAULT_CALCULATOR_STATE.watts, 0, 25000);
  const hoursPerDay = sanitizeNumber(input.hoursPerDay, DEFAULT_CALCULATOR_STATE.hoursPerDay, 0, 24);
  const costPerKwh = sanitizeNumber(input.costPerKwh, DEFAULT_CALCULATOR_STATE.costPerKwh, 0, 5.0);
  const days = sanitizeNumber(input.days, DEFAULT_CALCULATOR_STATE.days, 1, 365);
  const dutyCyclePercent = sanitizeNumber(input.dutyCyclePercent, 100, 1, 100);

  const rawDailyKwh = (watts / 1000) * hoursPerDay;
  const dutyFactor = dutyCyclePercent / 100;
  const dailyKwhEffective = rawDailyKwh * dutyFactor;

  const dailyCostRaw = dailyKwhEffective * costPerKwh;
  const periodKwhRaw = dailyKwhEffective * days;
  const periodCostRaw = dailyCostRaw * days;
  const seasonKwhRaw = dailyKwhEffective * 90;
  const seasonCostRaw = dailyCostRaw * 90;
  const annualKwhRaw = dailyKwhEffective * 365;
  const annualCostRaw = dailyCostRaw * 365;

  return {
    dailyKwhEffective: roundTo(dailyKwhEffective, 3),
    dailyCost: roundTo(dailyCostRaw, 2),
    periodKwh: roundTo(periodKwhRaw, 2),
    periodCost: roundTo(periodCostRaw, 2),
    seasonKwh: roundTo(seasonKwhRaw, 2),
    seasonCost: roundTo(seasonCostRaw, 2),
    annualKwh: roundTo(annualKwhRaw, 2),
    annualCost: roundTo(annualCostRaw, 2),
  };
}

export function roundTo(val: number, decimals: number): number {
  if (!Number.isFinite(val)) return 0;
  const factor = Math.pow(10, decimals);
  return Math.round((val + Number.EPSILON) * factor) / factor;
}

/**
 * Preset common US appliances with nameplate wattage and typical duty cycles
 */
export interface AppliancePreset {
  name: string;
  category: string;
  defaultWatts: number;
  typicalHours: number;
  typicalDutyCycle: number;
  notes: string;
}

export const APPLIANCE_PRESETS: AppliancePreset[] = [
  {
    name: "Portable Air Conditioner (12,000 BTU)",
    category: "Cooling",
    defaultWatts: 1200,
    typicalHours: 8,
    typicalDutyCycle: 70,
    notes: "Compressor cycles on and off once target room temperature is approached. Inverter models modulate smoothly down to ~350W.",
  },
  {
    name: "Window AC (8,000 BTU Inverter)",
    category: "Cooling",
    defaultWatts: 710,
    typicalHours: 8,
    typicalDutyCycle: 65,
    notes: "Modern inverter window units reduce compressor speed, averaging 400-500W during steady-state cooling.",
  },
  {
    name: "Electric Space Heater (Max Setting)",
    category: "Heating",
    defaultWatts: 1500,
    typicalHours: 6,
    typicalDutyCycle: 100,
    notes: "Nearly all US 120V portable space heaters draw 1,500W on High to stay within 15-amp branch circuit safety codes.",
  },
  {
    name: "Oil-Filled Radiator (Thermostat Cycling)",
    category: "Heating",
    defaultWatts: 1500,
    typicalHours: 8,
    typicalDutyCycle: 55,
    notes: "Thermal inertia keeps the hot oil radiating heat even while the internal heating element switches off.",
  },
  {
    name: "DC-Motor Tower Fan (Medium Speed)",
    category: "Airflow",
    defaultWatts: 25,
    typicalHours: 12,
    typicalDutyCycle: 100,
    notes: "Modern DC-motor fans consume very little power (15-35W) compared to older AC-motor box fans (60-100W).",
  },
  {
    name: "HEPA Air Purifier (Continuous Auto/Medium)",
    category: "Air Quality",
    defaultWatts: 45,
    typicalHours: 24,
    typicalDutyCycle: 100,
    notes: "Designed for continuous 24/7 operation. Energy draw ranges from 8W on Sleep/Low up to 70W on Turbo.",
  },
];
