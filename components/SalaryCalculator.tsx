"use client";

import { useMemo, useState } from "react";
import { currency, numberWithCommas } from "@/lib/format";
import { AdSlot } from "@/components/AdSlot";

const scenarios = [
  { id: "entry", label: "Entry level", hourlyRate: 22, hoursPerWeek: 40, taxRate: 18 },
  { id: "professional", label: "Professional", hourlyRate: 42, hoursPerWeek: 40, taxRate: 25 },
  { id: "senior", label: "Senior role", hourlyRate: 70, hoursPerWeek: 42, taxRate: 32 }
] as const;

export function SalaryCalculator() {
  const [hourlyRate, setHourlyRate] = useState(35);
  const [hoursPerWeek, setHoursPerWeek] = useState(40);
  const [taxRate, setTaxRate] = useState(24);
  const [activeScenario, setActiveScenario] = useState("professional");

  function applyScenario(id: string) {
    const scenario = scenarios.find((item) => item.id === id);
    if (!scenario) {
      return;
    }

    setHourlyRate(scenario.hourlyRate);
    setHoursPerWeek(scenario.hoursPerWeek);
    setTaxRate(scenario.taxRate);
    setActiveScenario(id);
  }

  const result = useMemo(() => {
    const annualGross = hourlyRate * hoursPerWeek * 52;
    const annualNet = annualGross * (1 - taxRate / 100);
    const monthlyNet = annualNet / 12;

    return { annualGross, annualNet, monthlyNet };
  }, [hourlyRate, hoursPerWeek, taxRate]);

  return (
    <div className="space-y-6">
      <section className="card grid gap-4 sm:grid-cols-3">
        <div className="sm:col-span-3">
          <p className="label">Scenario presets</p>
          <p className="mt-1 text-sm text-slate-400">
            Use a real-world pay setup as a shortcut, then adjust rate, hours, or deductions.
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {scenarios.map((scenario) => (
              <button
                key={scenario.id}
                type="button"
                onClick={() => applyScenario(scenario.id)}
                className={`rounded-md border px-3 py-1.5 text-xs font-semibold transition ${
                  activeScenario === scenario.id
                    ? "border-brand-400 bg-brand-900/40 text-brand-200"
                    : "border-slate-700 bg-slate-900 text-slate-300 hover:border-brand-500"
                }`}
              >
                {scenario.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="label" htmlFor="hourlyRate">
            Hourly rate (USD)
          </label>
          <input
            id="hourlyRate"
            className="input"
            type="number"
            min={0}
            step="0.01"
            value={hourlyRate}
            onChange={(e) => setHourlyRate(Number(e.target.value))}
          />
        </div>
        <div>
          <label className="label" htmlFor="hoursPerWeek">
            Hours per week
          </label>
          <input
            id="hoursPerWeek"
            className="input"
            type="number"
            min={1}
            value={hoursPerWeek}
            onChange={(e) => setHoursPerWeek(Number(e.target.value))}
          />
        </div>
        <div>
          <label className="label" htmlFor="taxRate">
            Deduction rate (%)
          </label>
          <input
            id="taxRate"
            className="input"
            type="number"
            min={0}
            max={80}
            value={taxRate}
            onChange={(e) => setTaxRate(Number(e.target.value))}
          />
        </div>
      </section>

      <AdSlot location="Salary result mid-content" slotKey="salaryResultMid" />

      <section className="card">
        <h2 className="text-xl font-semibold text-white">Estimated Results</h2>
        <p className="mt-2 text-sm text-slate-400">
          Gross and net pay update immediately when you change any number.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400">Annual gross</p>
            <p className="text-2xl font-bold text-brand-300">{currency(result.annualGross)}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400">Annual net</p>
            <p className="text-2xl font-bold text-brand-300">{currency(result.annualNet)}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400">Monthly net</p>
            <p className="text-2xl font-bold text-brand-300">{currency(result.monthlyNet)}</p>
          </div>
        </div>
        <p className="mt-4 text-sm text-slate-300">
          Estimated annual hours: {numberWithCommas(hoursPerWeek * 52)}
        </p>
      </section>
    </div>
  );
}
