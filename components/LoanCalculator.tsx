"use client";

import { useMemo, useState } from "react";
import { currency } from "@/lib/format";
import { AdSlot } from "@/components/AdSlot";

const scenarios = [
  { id: "auto", label: "Auto loan", loanAmount: 32000, apr: 7.2, months: 72 },
  { id: "personal", label: "Personal loan", loanAmount: 18000, apr: 10.8, months: 48 },
  { id: "debt", label: "Debt consolidation", loanAmount: 45000, apr: 8.5, months: 84 }
] as const;

export function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState(30000);
  const [apr, setApr] = useState(8.2);
  const [months, setMonths] = useState(60);
  const [activeScenario, setActiveScenario] = useState("auto");

  function applyScenario(id: string) {
    const scenario = scenarios.find((item) => item.id === id);
    if (!scenario) {
      return;
    }

    setLoanAmount(scenario.loanAmount);
    setApr(scenario.apr);
    setMonths(scenario.months);
    setActiveScenario(id);
  }

  const result = useMemo(() => {
    const monthlyRate = apr / 100 / 12;

    if (!loanAmount || !monthlyRate || !months) {
      return { emi: 0, totalInterest: 0, totalPayment: 0 };
    }

    const emi =
      (loanAmount * monthlyRate * (1 + monthlyRate) ** months) /
      ((1 + monthlyRate) ** months - 1);
    const totalPayment = emi * months;
    const totalInterest = totalPayment - loanAmount;

    return { emi, totalInterest, totalPayment };
  }, [apr, loanAmount, months]);

  return (
    <div className="space-y-6">
      <section className="card grid gap-4 sm:grid-cols-3">
        <div className="sm:col-span-3">
          <p className="label">Scenario presets</p>
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
          <label className="label" htmlFor="loanAmount">
            Loan amount (USD)
          </label>
          <input
            id="loanAmount"
            className="input"
            type="number"
            min={0}
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
          />
        </div>
        <div>
          <label className="label" htmlFor="apr">
            APR (%)
          </label>
          <input
            id="apr"
            className="input"
            type="number"
            min={0}
            step="0.01"
            value={apr}
            onChange={(e) => setApr(Number(e.target.value))}
          />
        </div>
        <div>
          <label className="label" htmlFor="months">
            Term (months)
          </label>
          <input
            id="months"
            className="input"
            type="number"
            min={1}
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
          />
        </div>
      </section>

      <AdSlot location="Loan result mid-content" slotKey="loanResultMid" />

      <section className="card">
        <h2 className="text-xl font-semibold text-white">Estimated Results</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400">Monthly EMI</p>
            <p className="text-2xl font-bold text-brand-300">{currency(result.emi)}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400">Total interest</p>
            <p className="text-2xl font-bold text-brand-300">{currency(result.totalInterest)}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400">Total payment</p>
            <p className="text-2xl font-bold text-brand-300">{currency(result.totalPayment)}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
