"use client";

import { useState } from "react";
import {
  APPLIANCE_PRESETS,
  DEFAULT_CALCULATOR_STATE,
  calculateApplianceCosts,
  AppliancePreset,
} from "@/lib/calculator";
import { CalculatorState } from "@/lib/types";
import { RotateCcw, Zap, Info, DollarSign, Calendar, Clock } from "lucide-react";

export function CalculatorWidget() {
  const [state, setState] = useState<CalculatorState>(DEFAULT_CALCULATOR_STATE);
  const [selectedPresetName, setSelectedPresetName] = useState<string>("Custom");

  const results = calculateApplianceCosts(state);

  const handlePresetSelect = (preset: AppliancePreset) => {
    setSelectedPresetName(preset.name);
    setState((prev) => ({
      ...prev,
      watts: preset.defaultWatts,
      hoursPerDay: preset.typicalHours,
      dutyCyclePercent: preset.typicalDutyCycle,
    }));
  };

  const handleReset = () => {
    setState(DEFAULT_CALCULATOR_STATE);
    setSelectedPresetName("Custom");
  };

  return (
    <section
      id="calculator"
      aria-labelledby="calculator-heading"
      className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8 shadow-sm my-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-forest-50 px-3 py-1 text-xs font-semibold text-forest-800 mb-2">
            <Zap className="h-3.5 w-3.5" aria-hidden="true" />
            Interactive Engineering Tool
          </div>
          <h2
            id="calculator-heading"
            className="text-2xl font-serif font-bold text-stone-900 tracking-tight"
          >
            Appliance Operating Cost Calculator
          </h2>
          <p className="text-sm text-stone-600 mt-1">
            Calculate exact electrical consumption and dollar running costs based
            on US utility rates and appliance duty cycles.
          </p>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 self-start md:self-auto rounded-lg border border-stone-300 px-3 py-2 text-xs font-medium text-stone-700 hover:bg-stone-50 transition"
          aria-label="Reset calculator inputs to default values"
        >
          <RotateCcw className="h-3.5 w-3.5 text-stone-500" aria-hidden="true" />
          Reset Defaults
        </button>
      </div>

      {/* Preset Quick Selectors */}
      <div className="pt-5">
        <label
          htmlFor="preset-select"
          className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2"
        >
          Quick Appliance Presets
        </label>
        <div className="flex flex-wrap gap-2">
          {APPLIANCE_PRESETS.map((preset) => {
            const isSelected = selectedPresetName === preset.name;
            return (
              <button
                key={preset.name}
                type="button"
                onClick={() => handlePresetSelect(preset)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
                  isSelected
                    ? "bg-forest-800 text-white shadow-sm"
                    : "border border-stone-200 bg-stone-50 text-stone-700 hover:border-forest-600 hover:text-stone-900"
                }`}
              >
                {preset.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-6 pt-5 border-t border-stone-100">
        {/* Wattage */}
        <div className="space-y-1.5">
          <label
            htmlFor="calc-watts"
            className="flex items-center justify-between text-xs font-semibold text-stone-700"
          >
            <span>Appliance Power</span>
            <span className="font-mono text-forest-800">{state.watts} W</span>
          </label>
          <div className="relative">
            <input
              id="calc-watts"
              type="number"
              min="0"
              max="5000"
              step="10"
              value={state.watts}
              onChange={(e) => {
                setSelectedPresetName("Custom");
                setState({ ...state, watts: Number(e.target.value) || 0 });
              }}
              className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm text-stone-900 focus:border-forest-700 focus:ring-1 focus:ring-forest-700"
              aria-describedby="watts-help"
            />
          </div>
          <p id="watts-help" className="text-[11px] text-stone-500">
            Check the nameplate or label on the device.
          </p>
        </div>

        {/* Daily Hours */}
        <div className="space-y-1.5">
          <label
            htmlFor="calc-hours"
            className="flex items-center justify-between text-xs font-semibold text-stone-700"
          >
            <span>Hours Used Per Day</span>
            <span className="font-mono text-forest-800">
              {state.hoursPerDay} hrs
            </span>
          </label>
          <div className="relative">
            <input
              id="calc-hours"
              type="number"
              min="0"
              max="24"
              step="0.5"
              value={state.hoursPerDay}
              onChange={(e) =>
                setState({
                  ...state,
                  hoursPerDay: Math.min(24, Math.max(0, Number(e.target.value) || 0)),
                })
              }
              className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm text-stone-900 focus:border-forest-700 focus:ring-1 focus:ring-forest-700"
              aria-describedby="hours-help"
            />
          </div>
          <p id="hours-help" className="text-[11px] text-stone-500">
            Typical use: 8 hrs (night/work) to 24 hrs.
          </p>
        </div>

        {/* Electricity Price */}
        <div className="space-y-1.5">
          <label
            htmlFor="calc-rate"
            className="flex items-center justify-between text-xs font-semibold text-stone-700"
          >
            <span>Electricity Rate</span>
            <span className="font-mono text-forest-800">
              ${state.costPerKwh.toFixed(3)}/kWh
            </span>
          </label>
          <div className="relative">
            <input
              id="calc-rate"
              type="number"
              min="0"
              max="2"
              step="0.005"
              value={state.costPerKwh}
              onChange={(e) =>
                setState({
                  ...state,
                  costPerKwh: Math.max(0, Number(e.target.value) || 0),
                })
              }
              className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm text-stone-900 focus:border-forest-700 focus:ring-1 focus:ring-forest-700"
              aria-describedby="rate-help"
            />
          </div>
          <p id="rate-help" className="text-[11px] text-stone-500">
            US 2026 average: $0.168/kWh (check utility bill).
          </p>
        </div>

        {/* Duty Cycle */}
        <div className="space-y-1.5">
          <label
            htmlFor="calc-duty"
            className="flex items-center justify-between text-xs font-semibold text-stone-700"
          >
            <span>Thermostat Duty Cycle</span>
            <span className="font-mono text-forest-800">
              {state.dutyCyclePercent}%
            </span>
          </label>
          <div className="relative">
            <input
              id="calc-duty"
              type="number"
              min="10"
              max="100"
              step="5"
              value={state.dutyCyclePercent}
              onChange={(e) =>
                setState({
                  ...state,
                  dutyCyclePercent: Math.min(
                    100,
                    Math.max(1, Number(e.target.value) || 100)
                  ),
                })
              }
              className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm text-stone-900 focus:border-forest-700 focus:ring-1 focus:ring-forest-700"
              aria-describedby="duty-help"
            />
          </div>
          <p id="duty-help" className="text-[11px] text-stone-500">
            100% = constant on; 65-75% for cycling AC/heaters.
          </p>
        </div>
      </div>

      {/* Result Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        {/* Daily Cost */}
        <div className="rounded-xl border border-stone-200 bg-stone-50/80 p-4">
          <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium mb-1">
            <DollarSign className="h-3.5 w-3.5 text-stone-400" aria-hidden="true" />
            Estimated Daily Cost
          </div>
          <div className="text-2xl font-bold font-serif text-stone-900">
            ${results.dailyCost.toFixed(2)}
          </div>
          <div className="text-[11px] text-stone-500 mt-0.5">
            {results.dailyKwhEffective.toFixed(2)} kWh / day
          </div>
        </div>

        {/* Selected Period (30 Days) */}
        <div className="rounded-xl border border-forest-200 bg-forest-50/60 p-4">
          <div className="flex items-center gap-1.5 text-xs text-forest-800 font-medium mb-1">
            <Calendar className="h-3.5 w-3.5 text-forest-600" aria-hidden="true" />
            Monthly Cost (30 Days)
          </div>
          <div className="text-2xl font-bold font-serif text-forest-900">
            ${results.periodCost.toFixed(2)}
          </div>
          <div className="text-[11px] text-forest-700 mt-0.5">
            {results.periodKwh.toFixed(1)} kWh / month
          </div>
        </div>

        {/* Summer Cooling Season (90 Days) */}
        <div className="rounded-xl border border-stone-200 bg-stone-50/80 p-4">
          <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium mb-1">
            <Clock className="h-3.5 w-3.5 text-stone-400" aria-hidden="true" />
            Season Cost (90 Days)
          </div>
          <div className="text-2xl font-bold font-serif text-stone-900">
            ${(results.dailyCost * 90).toFixed(2)}
          </div>
          <div className="text-[11px] text-stone-500 mt-0.5">
            {(results.dailyKwhEffective * 90).toFixed(1)} kWh / season
          </div>
        </div>

        {/* Full Year (365 Days) */}
        <div className="rounded-xl border border-stone-200 bg-stone-50/80 p-4">
          <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium mb-1">
            <Calendar className="h-3.5 w-3.5 text-stone-400" aria-hidden="true" />
            Full Year (365 Days)
          </div>
          <div className="text-2xl font-bold font-serif text-stone-900">
            ${results.annualCost.toFixed(2)}
          </div>
          <div className="text-[11px] text-stone-500 mt-0.5">
            {results.annualKwh.toFixed(0)} kWh / year
          </div>
        </div>
      </div>

      {/* Calculation Formula & Scientific Assumptions */}
      <div className="mt-6 rounded-lg bg-stone-100/70 p-4 text-xs text-stone-600 leading-relaxed">
        <div className="flex items-start gap-2">
          <Info className="h-4 w-4 text-stone-500 shrink-0 mt-0.5" aria-hidden="true" />
          <div className="space-y-1">
            <p className="font-semibold text-stone-800">
              Calculation Methodology & Transparent Assumptions:
            </p>
            <p>
              <strong>Formula:</strong> Effective Daily Energy (kWh) = (Watts ÷ 1,000)
              × Daily Hours × (Duty Cycle % ÷ 100). Cost = Effective kWh ×
              Electricity Rate ($/kWh).
            </p>
            <p>
              <strong>Thermostat Cycling Note:</strong> Heating and cooling
              appliances cycle their compressors and heating elements on and off
              once the setpoint temperature is reached. A portable AC or space
              heater typically operates at an effective 60% to 75% duty cycle in
              insulated rooms. For non-cycling appliances like fans or HEPA
              filters, leave duty cycle at 100%.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
