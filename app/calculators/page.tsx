import type { Metadata } from "next";
import Link from "next/link";
import { CalculatorCard } from "@/components/CalculatorCard";

const calculators = [
  {
    title: "Mortgage Calculator",
    href: "/calculators/mortgage",
    description:
      "Estimate monthly payment, total interest, and total repayment for fixed-rate mortgages."
  },
  {
    title: "Loan Calculator",
    href: "/calculators/loan",
    description:
      "Calculate EMI and payoff cost for personal or auto loans with adjustable terms."
  },
  {
    title: "Salary Calculator",
    href: "/calculators/salary",
    description:
      "Convert hourly to annual and estimate monthly take-home based on deduction rates."
  },
  {
    title: "Tax Calculator",
    href: "/calculators/tax",
    description:
      "Get a fast estimate of annual tax liability and effective tax rate from your income."
  }
];

export const metadata: Metadata = {
  title: "Calculators | ClearCalc Finance",
  description:
    "Browse mortgage, loan, salary, and tax calculators in one place."
};

export default function CalculatorsPage() {
  return (
    <div className="space-y-8">
      <header className="card relative overflow-hidden border-brand-500/20 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950">
        <div className="pointer-events-none absolute inset-0 opacity-80">
          <div className="absolute -right-20 top-0 h-56 w-56 rounded-full bg-brand-500/10 blur-3xl" />
          <div className="absolute -left-12 bottom-0 h-48 w-48 rounded-full bg-emerald-400/10 blur-3xl" />
        </div>

        <div className="relative max-w-4xl">
          <span className="inline-flex items-center rounded-full border border-brand-400/30 bg-brand-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-200">
            Calculator hub
          </span>
          <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Choose the calculator that matches your next decision.
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">
            Start with a mortgage estimate, compare loan options, check salary take-home, or review tax impact. Each calculator is designed for quick answers and easy comparison.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              className="rounded-full bg-gradient-to-r from-brand-500 to-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-brand-950/30 transition hover:brightness-110"
              href="/calculators/mortgage"
            >
              Start with mortgage
            </Link>
            <Link
              className="rounded-full border border-slate-700 bg-slate-900/80 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-brand-500 hover:text-white"
              href="/us"
            >
              Browse state pages
            </Link>
          </div>
        </div>
      </header>

      <section className="grid gap-4 sm:grid-cols-2">
        {calculators.map((calculator) => (
          <CalculatorCard key={calculator.href} {...calculator} />
        ))}
      </section>
    </div>
  );
}