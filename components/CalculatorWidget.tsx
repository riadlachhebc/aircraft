"use client";

import { useState } from "react";
import {
  APPLIANCE_PRESETS,
  DEFAULT_CALCULATOR_STATE,
  calculateApplianceCosts,
  AppliancePreset,
} from "@/lib/calculator";
import { CalculatorState } from "@/lib/types";
import { RotateCcw, Zap, Info, DollarSign, Calendar, Clock, Gauge } from "lucide-react";

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
      className="border-2 border-stone-900 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] my-10"
    >
      {/* Instrument Header */}
      <div className="bg-stone-900 text-white px-5 sm:px-8 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-forest-400 font-bold uppercase text-xs tracking-wider mb-1">
            <Gauge className="h-4 w-4" aria-hidden="true" />
            <span>LAB BENCH INSTRUMENT &middot; V2.4</span>
          </div>
          <h2
            id="calculator-heading"
            className="text-xl sm:text-2xl font-black font-sans uppercase tracking-tight text-white"
          >
            Appliance Operating Cost Simulator
          </h2>
          <p className="text-xs text-stone-300 mt-1 max-w-xl">
            Simulate real kilowatt-hour consumption and monthly utility impacts using US EIA tariff baselines and compressor duty cycles.
          </p>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 self-start md:self-auto border border-stone-600 bg-stone-800 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-stone-200 hover:bg-stone-700 transition"
          aria-label="Reset calculator inputs to default values"
        >
          <RotateCcw className="h-3 w-3 text-stone-400" aria-hidden="true" />
          Reset Defaults
        </button>
      </div>

      <div className="p-5 sm:p-8">
        {/* Preset Selectors */}
        <div>
          <span className="block text-[11px] font-black uppercase tracking-wider text-stone-500 mb-2">
            Load Verified Preset Profiles:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {APPLIANCE_PRESETS.map((preset) => {
              const isSelected = selectedPresetName === preset.name;
              return (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => handlePresetSelect(preset)}
                  className={`border px-3 py-1 text-xs font-bold uppercase tracking-wider transition ${
                    isSelected
                      ? "border-black bg-black text-white"
                      : "border-stone-300 bg-stone-50 text-stone-800 hover:border-black"
                  }`}
                >
                  {preset.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Inputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t border-stone-200">
          {/* Wattage */}
          <div className="border border-stone-200 p-3 bg-stone-50/50">
            <label
              htmlFor="calc-watts"
              className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-stone-700 mb-1"
            >
              <span>Power Draw</span>
              <span className="font-mono text-black font-black">{state.watts} W</span>
            </label>
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
              className="w-full border border-stone-300 px-3 py-1.5 font-mono text-sm font-bold text-black focus:border-black focus:outline-none"
            />
            <p className="text-[10.5px] text-stone-500 mt-1">
              From device nameplate label.
            </p>
          </div>

          {/* Daily Hours */}
          <div className="border border-stone-200 p-3 bg-stone-50/50">
            <label
              htmlFor="calc-hours"
              className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-stone-700 mb-1"
            >
              <span>Daily Run Hours</span>
              <span className="font-mono text-black font-black">{state.hoursPerDay} hrs</span>
            </label>
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
              className="w-full border border-stone-300 px-3 py-1.5 font-mono text-sm font-bold text-black focus:border-black focus:outline-none"
            />
            <p className="text-[10.5px] text-stone-500 mt-1">
              Active operating duration.
            </p>
          </div>

          {/* Electricity Price */}
          <div className="border border-stone-200 p-3 bg-stone-50/50">
            <label
              htmlFor="calc-rate"
              className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-stone-700 mb-1"
            >
              <span>Utility Rate</span>
              <span className="font-mono text-black font-black">
                ${state.costPerKwh.toFixed(3)}
              </span>
            </label>
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
              className="w-full border border-stone-300 px-3 py-1.5 font-mono text-sm font-bold text-black focus:border-black focus:outline-none"
            />
            <p className="text-[10.5px] text-stone-500 mt-1">
              US EIA avg: $0.168/kWh.
            </p>
          </div>

          {/* Duty Cycle */}
          <div className="border border-stone-200 p-3 bg-stone-50/50">
            <label
              htmlFor="calc-duty"
              className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-stone-700 mb-1"
            >
              <span>Duty Cycle</span>
              <span className="font-mono text-black font-black">{state.dutyCyclePercent}%</span>
            </label>
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
              className="w-full border border-stone-300 px-3 py-1.5 font-mono text-sm font-bold text-black focus:border-black focus:outline-none"
            />
            <p className="text-[10.5px] text-stone-500 mt-1">
              60-75% for cycling AC/heaters.
            </p>
          </div>
        </div>

        {/* Digital Readout Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
          <div className="border-2 border-black bg-stone-50 p-4">
            <div className="text-[10px] font-black uppercase tracking-wider text-stone-500 mb-1">
              Daily Impact
            </div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-black">
              ${results.dailyCost.toFixed(2)}
            </div>
            <div className="text-[11px] font-mono text-stone-600 mt-0.5">
              {results.dailyKwhEffective.toFixed(2)} kWh / day
            </div>
          </div>

          <div className="border-2 border-forest-800 bg-forest-50 p-4">
            <div className="text-[10px] font-black uppercase tracking-wider text-forest-800 mb-1">
              Monthly Cost (30 Days)
            </div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-forest-900">
              ${results.periodCost.toFixed(2)}
            </div>
            <div className="text-[11px] font-mono text-forest-700 mt-0.5">
              {results.periodKwh.toFixed(1)} kWh / month
            </div>
          </div>

          <div className="border-2 border-black bg-stone-50 p-4">
            <div className="text-[10px] font-black uppercase tracking-wider text-stone-500 mb-1">
              90-Day Season
            </div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-black">
              ${(results.dailyCost * 90).toFixed(2)}
            </div>
            <div className="text-[11px] font-mono text-stone-600 mt-0.5">
              {(results.dailyKwhEffective * 90).toFixed(1)} kWh / season
            </div>
          </div>

          <div className="border-2 border-black bg-stone-50 p-4">
            <div className="text-[10px] font-black uppercase tracking-wider text-stone-500 mb-1">
              Full Year (365 Days)
            </div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-black">
              ${results.annualCost.toFixed(2)}
            </div>
            <div className="text-[11px] font-mono text-stone-600 mt-0.5">
              {results.annualKwh.toFixed(0)} kWh / year
            </div>
          </div>
        </div>

        {/* Transparent Methodology */}
        <div className="mt-5 border-t border-stone-200 pt-4 text-xs text-stone-600 flex items-start gap-2">
          <Info className="h-4 w-4 text-stone-700 shrink-0 mt-0.5" />
          <p>
            <strong>Physics Basis:</strong> Effective Daily Energy (kWh) = (Watts &divide; 1,000) &times; Daily Hours &times; (Duty Cycle &divide; 100). Electricity cost = Effective kWh &times; Utility Tariff ($/kWh). Non-cycling appliances (fans, HEPA filters) operate at a continuous 100% duty cycle.
          </p>
        </div>
      </div>
    </section>
  );
}
