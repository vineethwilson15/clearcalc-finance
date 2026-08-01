import { AdSlot } from "@/components/AdSlot";
import { CalculatorCard } from "@/components/CalculatorCard";
import Link from "next/link";

const cards = [
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

export default function Home() {
  return (
    <div className="space-y-8">
      <header className="card overflow-hidden">
        <p className="text-xs uppercase tracking-[0.2em] text-brand-300">ClearCalc Finance</p>
        <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
          High-Intent Finance Calculators
        </h1>
        <p className="mt-3 max-w-3xl text-slate-300">
          Launch-ready calculator hub built for long-tail SEO traffic in high-RPM markets.
          Start with mortgage and loan pages, then scale state and country variants.
        </p>
      </header>

      <AdSlot location="Homepage top" slotKey="homepageTop" />

      <section className="grid gap-4 sm:grid-cols-2">
        {cards.map((card) => (
          <CalculatorCard key={card.href} {...card} />
        ))}
      </section>

      <section className="card">
        <h2 className="text-xl font-semibold text-white">Scale Roadmap</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-300">
          <li>Expand into US state-level tax and take-home pay pages.</li>
          <li>Add refinance, debt payoff, and amortization variant calculators.</li>
          <li>Create keyword-focused FAQ and formula explanation pages for each tool.</li>
        </ul>
        <p className="mt-4 text-sm text-slate-300">
          Phase 2 templates are live at{" "}
          <Link className="text-brand-300 hover:underline" href="/us">
            /us
          </Link>
          , including long-tail and state-level route structures.
        </p>
      </section>

      <AdSlot location="Homepage footer" slotKey="homepageFooter" />
    </div>
  );
}
