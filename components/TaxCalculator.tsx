"use client";

import { useMemo, useState } from "react";
import { currency } from "@/lib/format";
import { AdSlot } from "@/components/AdSlot";

const scenarios = [
  { id: "w2", label: "W-2 employee", annualIncome: 85000, deductions: 12000 },
  { id: "professional", label: "Professional", annualIncome: 140000, deductions: 18000 },
  { id: "household", label: "Family household", annualIncome: 220000, deductions: 30000 }
] as const;

export function TaxCalculator() {
  const [annualIncome, setAnnualIncome] = useState(120000);
  const [deductions, setDeductions] = useState(14000);
  const [activeScenario, setActiveScenario] = useState("professional");

  function applyScenario(id: string) {
    const scenario = scenarios.find((item) => item.id === id);
    if (!scenario) {
      return;
    }

    setAnnualIncome(scenario.annualIncome);
    setDeductions(scenario.deductions);
    setActiveScenario(id);
  }

  const result = useMemo(() => {
    const taxableIncome = Math.max(annualIncome - deductions, 0);

    // Simplified progressive bracket model for initial MVP.
    let tax = 0;
    if (taxableIncome > 0) {
      tax += Math.min(taxableIncome, 11000) * 0.1;
    }
    if (taxableIncome > 11000) {
      tax += Math.min(taxableIncome - 11000, 33725) * 0.12;
    }
    if (taxableIncome > 44725) {
      tax += Math.min(taxableIncome - 44725, 50650) * 0.22;
    }
    if (taxableIncome > 95375) {
      tax += (taxableIncome - 95375) * 0.24;
    }

    const effectiveRate = annualIncome > 0 ? (tax / annualIncome) * 100 : 0;

    return { taxableIncome, tax, effectiveRate };
  }, [annualIncome, deductions]);

  return (
    <div className="space-y-6">
      <section className="card grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <p className="label">Scenario presets</p>
          <p className="mt-1 text-sm text-slate-400">
            Pick a common income profile, then adjust income and deductions to fit your case.
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
          <label className="label" htmlFor="annualIncome">
            Annual income (USD)
          </label>
          <input
            id="annualIncome"
            className="input"
            type="number"
            min={0}
            value={annualIncome}
            onChange={(e) => setAnnualIncome(Number(e.target.value))}
          />
        </div>
        <div>
          <label className="label" htmlFor="deductions">
            Deductions (USD)
          </label>
          <input
            id="deductions"
            className="input"
            type="number"
            min={0}
            value={deductions}
            onChange={(e) => setDeductions(Number(e.target.value))}
          />
        </div>
      </section>

      <AdSlot location="Tax result mid-content" slotKey="taxResultMid" />

      <section className="card">
        <h2 className="text-xl font-semibold text-white">Estimated Results</h2>
        <p className="mt-2 text-sm text-slate-400">
          Taxable income, tax due, and effective rate recalculate as you edit the form.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400">Taxable income</p>
            <p className="text-2xl font-bold text-brand-300">{currency(result.taxableIncome)}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400">Tax due</p>
            <p className="text-2xl font-bold text-brand-300">{currency(result.tax)}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400">Effective rate</p>
            <p className="text-2xl font-bold text-brand-300">{result.effectiveRate.toFixed(2)}%</p>
          </div>
        </div>
      </section>
    </div>
  );
}
