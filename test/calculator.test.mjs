import { test } from "node:test";
import assert from "node:assert/strict";
import { calculateApplianceCosts } from "../lib/calculator.ts";

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
});

test("Appliance Calculator: Resilient against zero and negative bounds", () => {
  const result = calculateApplianceCosts({
    watts: 0,
    hoursPerDay: 0,
    costPerKwh: 0,
  });

  assert.equal(result.dailyKwhEffective, 0);
  assert.equal(result.dailyCost, 0);
  assert.equal(result.periodCost, 0);
});
