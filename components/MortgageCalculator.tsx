"use client";

import { useMemo, useState } from "react";
import { currency } from "@/lib/format";
import { AdSlot } from "@/components/AdSlot";

const scenarios = [
  {
    id: "first-home",
    label: "First home",
    homePrice: 350000,
    downPayment: 35000,
    interestRate: 6.9,
    years: 30
  },
  {
    id: "move-up",
    label: "Move-up home",
    homePrice: 650000,
    downPayment: 130000,
    interestRate: 6.4,
    years: 30
  },
  {
    id: "aggressive",
    label: "Aggressive payoff",
    homePrice: 500000,
    downPayment: 150000,
    interestRate: 6,
    years: 20
  }
] as const;

export function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState(450000);
  const [downPayment, setDownPayment] = useState(90000);
  const [interestRate, setInterestRate] = useState(6.7);
  const [years, setYears] = useState(30);
  const [activeScenario, setActiveScenario] = useState("move-up");

  function applyScenario(id: string) {
    const scenario = scenarios.find((item) => item.id === id);
    if (!scenario) {
      return;
    }

    setHomePrice(scenario.homePrice);
    setDownPayment(scenario.downPayment);
    setInterestRate(scenario.interestRate);
    setYears(scenario.years);
    setActiveScenario(id);
  }

  const result = useMemo(() => {
    const principal = Math.max(homePrice - downPayment, 0);
    const monthlyRate = interestRate / 100 / 12;
    const n = years * 12;

    if (!principal || !monthlyRate || !n) {
      return { monthlyPayment: 0, totalInterest: 0, totalPayment: 0 };
    }

    const monthlyPayment =
      (principal * monthlyRate * (1 + monthlyRate) ** n) / ((1 + monthlyRate) ** n - 1);
    const totalPayment = monthlyPayment * n;
    const totalInterest = totalPayment - principal;

    return { monthlyPayment, totalInterest, totalPayment };
  }, [downPayment, homePrice, interestRate, years]);

  return (
    <div className="space-y-6">
      <section className="card grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
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
          <label className="label" htmlFor="homePrice">
            Home price (USD)
          </label>
          <input
            id="homePrice"
            className="input"
            type="number"
            min={0}
            value={homePrice}
            onChange={(e) => setHomePrice(Number(e.target.value))}
          />
        </div>
        <div>
          <label className="label" htmlFor="downPayment">
            Down payment (USD)
          </label>
          <input
            id="downPayment"
            className="input"
            type="number"
            min={0}
            value={downPayment}
            onChange={(e) => setDownPayment(Number(e.target.value))}
          />
        </div>
        <div>
          <label className="label" htmlFor="interestRate">
            Interest rate (%)
          </label>
          <input
            id="interestRate"
            className="input"
            type="number"
            min={0}
            step="0.01"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
          />
        </div>
        <div>
          <label className="label" htmlFor="years">
            Loan term (years)
          </label>
          <input
            id="years"
            className="input"
            type="number"
            min={1}
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
          />
        </div>
      </section>

      <AdSlot location="Mortgage result mid-content" slotKey="mortgageResultMid" />

      <section className="card">
        <h2 className="text-xl font-semibold text-white">Estimated Results</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400">Monthly payment</p>
            <p className="text-2xl font-bold text-brand-300">{currency(result.monthlyPayment)}</p>
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
