import { test } from "node:test";
import assert from "node:assert/strict";
import { calculateApplianceCosts, sanitizeNumber, roundTo } from "../lib/calculator.ts";

test("Appliance Calculator: 1500W heater at 100% duty cycle for 8 hrs/day @ $0.168/kWh", () => {
  const result = calculateApplianceCosts({
    watts: 1500,
    hoursPerDay: 8,
    costPerKwh: 0.168,
    days: 30,
    dutyCyclePercent: 100,
  });

  // (1500 / 1000) * 8 = 12 kWh/day
  assert.equal(result.dailyKwhEffective, 12);
  // 12 * 0.168 = $2.016 -> rounded to 2.02
  assert.equal(result.dailyCost, 2.02);
  // 12 * 30 = 360 kWh
  assert.equal(result.periodKwh, 360);
  // 2.016 * 30 = $60.48
  assert.equal(result.periodCost, 60.48);
  // 2.016 * 90 = $181.44
  assert.equal(result.seasonCost, 181.44);
  assert.equal(result.seasonKwh, 1080);
  // 2.016 * 365 = $735.84
  assert.equal(result.annualCost, 735.84);
});

test("Appliance Calculator: 1200W portable AC at 70% duty cycle for 8 hrs/day @ $0.168/kWh", () => {
  const result = calculateApplianceCosts({
    watts: 1200,
    hoursPerDay: 8,
    costPerKwh: 0.168,
    days: 30,
    dutyCyclePercent: 70,
  });

  // (1200 / 1000) * 8 * 0.70 = 6.72 kWh/day
  assert.equal(result.dailyKwhEffective, 6.72);
  // 6.72 * 0.168 = $1.12896 -> rounded to 1.13
  assert.equal(result.dailyCost, 1.13);
  // 6.72 * 30 = 201.6 kWh
  assert.equal(result.periodKwh, 201.6);
  // 1.12896 * 30 = $33.8688 -> rounded to 33.87
  assert.equal(result.periodCost, 33.87);
  // 1.12896 * 90 = $101.6064 -> rounded to 101.61
  assert.equal(result.seasonCost, 101.61);
  assert.equal(result.seasonKwh, 604.8);
});

test("Appliance Calculator: Resilient against zero values", () => {
  const result = calculateApplianceCosts({
    watts: 0,
    hoursPerDay: 0,
    costPerKwh: 0,
    days: 30,
  });

  assert.equal(result.dailyKwhEffective, 0);
  assert.equal(result.dailyCost, 0);
  assert.equal(result.periodCost, 0);
  assert.equal(result.seasonCost, 0);
  assert.equal(result.annualCost, 0);
});

test("Appliance Calculator: Resilient against NaN and non-number inputs", () => {
  const result = calculateApplianceCosts({
    watts: NaN,
    hoursPerDay: NaN,
    costPerKwh: NaN,
    dutyCyclePercent: NaN,
  });

  // Should safely fallback to defaults without throwing or returning NaN
  assert.ok(Number.isFinite(result.dailyKwhEffective));
  assert.ok(Number.isFinite(result.dailyCost));
  assert.ok(Number.isFinite(result.periodCost));
  assert.ok(Number.isFinite(result.seasonCost));
  assert.ok(Number.isFinite(result.annualCost));
});

test("Appliance Calculator: Clamps negative inputs to zero or valid bounds", () => {
  const result = calculateApplianceCosts({
    watts: -1500,
    hoursPerDay: -10,
    costPerKwh: -0.25,
    days: -5,
  });

  assert.equal(result.dailyKwhEffective, 0);
  assert.equal(result.dailyCost, 0);
  assert.equal(result.periodCost, 0);
});

test("Appliance Calculator: Clamps extreme inputs to realistic residential bounds", () => {
  const result = calculateApplianceCosts({
    watts: 100000, // Clamped to 25,000 W
    hoursPerDay: 48, // Clamped to 24 hrs
    costPerKwh: 10, // Clamped to $5.00
    dutyCyclePercent: 200, // Clamped to 100%
  });

  // 25,000W / 1000 * 24 * 1.0 = 600 kWh/day
  assert.equal(result.dailyKwhEffective, 600);
  // 600 * 5 = 3000
  assert.equal(result.dailyCost, 3000);
});

test("sanitizeNumber utility helper", () => {
  assert.equal(sanitizeNumber(NaN, 10, 0, 100), 10);
  assert.equal(sanitizeNumber("invalid", 10, 0, 100), 10);
  assert.equal(sanitizeNumber(-5, 10, 0, 100), 0);
  assert.equal(sanitizeNumber(150, 10, 0, 100), 100);
  assert.equal(sanitizeNumber(45, 10, 0, 100), 45);
});
