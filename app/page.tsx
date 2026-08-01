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
      <header className="card relative overflow-hidden border-brand-500/20 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950">
        <div className="pointer-events-none absolute inset-0 opacity-80">
          <div className="absolute -right-20 top-0 h-56 w-56 rounded-full bg-brand-500/10 blur-3xl" />
          <div className="absolute -left-12 bottom-0 h-48 w-48 rounded-full bg-emerald-400/10 blur-3xl" />
        </div>

        <div className="relative max-w-4xl">
          <span className="inline-flex items-center rounded-full border border-brand-400/30 bg-brand-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-200">
            ClearCalc Finance
          </span>
          <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Finance calculators that feel clear from the first click.
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">
            Compare mortgage payments, loan payoff options, salary estimates, and tax outcomes in
            one clean place. Built for quick decisions and easy comparison.
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
              Browse US templates
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap gap-2 text-xs font-medium text-slate-300">
            {[
              "Mortgage",
              "Loan",
              "Salary",
              "Tax",
              "State templates"
            ].map((item) => (
              <span
                key={item}
                className="rounded-full border border-slate-800 bg-slate-900/70 px-3 py-1.5"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </header>

      <AdSlot location="Homepage top" slotKey="homepageTop" />

      <section className="grid gap-4 sm:grid-cols-2">
        {cards.map((card) => (
          <CalculatorCard key={card.href} {...card} />
        ))}
      </section>

      <section className="card">
        <h2 className="text-xl font-semibold text-white">Popular Topics</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-300">
          <li>Mortgage payments and refinance savings.</li>
          <li>Loan payoff planning and EMI estimates.</li>
          <li>Salary, tax, and take-home pay comparisons.</li>
        </ul>
        <p className="mt-4 text-sm text-slate-300">
          More location-specific calculators are available at{" "}
          <Link className="text-brand-300 hover:underline" href="/us">
            /us
          </Link>
          .
        </p>
      </section>

      <AdSlot location="Homepage footer" slotKey="homepageFooter" />
    </div>
  );
}
