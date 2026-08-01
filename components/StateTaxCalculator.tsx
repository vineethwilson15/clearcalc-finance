"use client";

import { useMemo, useState } from "react";
import { AdSlot } from "@/components/AdSlot";
import { currency } from "@/lib/format";
import {
  calculateStateTaxEstimate,
  taxYearOptions,
  type FilingStatus,
  type TaxYear
} from "@/lib/us-tax";

type StateTaxCalculatorProps = {
  stateName: string;
  stateCode: string;
};

const taxScenarios: Array<{
  id: string;
  label: string;
  annualIncome: number;
  deductions: number;
  filingStatus: FilingStatus;
}> = [
  {
    id: "starter",
    label: "Starter",
    annualIncome: 65000,
    deductions: 6000,
    filingStatus: "single"
  },
  {
    id: "professional",
    label: "Professional",
    annualIncome: 125000,
    deductions: 15000,
    filingStatus: "single"
  },
  {
    id: "household",
    label: "Family household",
    annualIncome: 210000,
    deductions: 28000,
    filingStatus: "married"
  }
];

export function StateTaxCalculator({ stateName, stateCode }: StateTaxCalculatorProps) {
  const [annualIncome, setAnnualIncome] = useState(125000);
  const [deductions, setDeductions] = useState(15000);
  const [filingStatus, setFilingStatus] = useState<FilingStatus>("single");
  const [taxYear, setTaxYear] = useState<TaxYear>("2026");
  const [activeScenario, setActiveScenario] = useState("professional");

  function applyScenario(scenarioId: string) {
    const scenario = taxScenarios.find((item) => item.id === scenarioId);
    if (!scenario) {
      return;
    }

    setAnnualIncome(scenario.annualIncome);
    setDeductions(scenario.deductions);
    setFilingStatus(scenario.filingStatus);
    setActiveScenario(scenario.id);
  }

  const result = useMemo(
    () =>
      calculateStateTaxEstimate({
        annualIncome,
        deductions,
        filingStatus,
        stateCode,
        taxYear
      }),
    [annualIncome, deductions, filingStatus, stateCode, taxYear]
  );

  return (
    <div className="space-y-6">
      <section className="card grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <p className="label">Scenario presets</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {taxScenarios.map((scenario) => (
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
            onChange={(event) => setAnnualIncome(Number(event.target.value))}
          />
        </div>
        <div>
          <label className="label" htmlFor="deductions">
            Above-the-line deductions (USD)
          </label>
          <input
            id="deductions"
            className="input"
            type="number"
            min={0}
            value={deductions}
            onChange={(event) => setDeductions(Number(event.target.value))}
          />
        </div>
        <div>
          <label className="label" htmlFor="filingStatus">
            Filing status
          </label>
          <select
            id="filingStatus"
            className="input"
            value={filingStatus}
            onChange={(event) => setFilingStatus(event.target.value as FilingStatus)}
          >
            <option value="single">Single</option>
            <option value="married">Married filing jointly</option>
          </select>
        </div>
        <div>
          <label className="label" htmlFor="taxYear">
            Tax year
          </label>
          <select
            id="taxYear"
            className="input"
            value={taxYear}
            onChange={(event) => setTaxYear(event.target.value as TaxYear)}
          >
            {taxYearOptions.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p className="label">State profile</p>
          <p className="mt-2 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-200">
            {stateName} ({stateCode}) {result.stateModel} model, top rate {(result.stateRate * 100).toFixed(2)}%
          </p>
          <p className="mt-2 text-xs text-slate-400">{result.stateNote}</p>
          <p className="mt-1 text-xs text-slate-400">Tax year selected: {result.taxYear}</p>
          <p className="mt-1 text-xs text-slate-400">
            Federal standard deduction used: {currency(result.standardDeduction)}
          </p>
        </div>
      </section>

      <AdSlot location={`${stateName} state tax result`} slotKey="stateTaxResult" />

      <section className="card">
        <h2 className="text-xl font-semibold text-white">Tax Estimate Breakdown</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Result label="Federal taxable income" value={currency(result.federalTaxableIncome)} />
          <Result label="State taxable income" value={currency(result.stateTaxableIncome)} />
          <Result label="Federal tax" value={currency(result.federalTax)} />
          <Result label="State tax" value={currency(result.stateTax)} />
          <Result label="Total estimated tax" value={currency(result.totalTax)} />
          <Result label="Effective tax rate" value={`${result.effectiveRate.toFixed(2)}%`} />
        </div>
      </section>
    </div>
  );
}

function Result({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>
      <p className="text-2xl font-bold text-brand-300">{value}</p>
    </div>
  );
}
