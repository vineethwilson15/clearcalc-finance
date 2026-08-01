import type { Metadata } from "next";
import Link from "next/link";
import { TaxCalculator } from "@/components/TaxCalculator";

export const metadata: Metadata = {
  title: "Tax Calculator",
  description:
    "Estimate taxable income, annual tax due, and effective tax rate using a simplified bracket model."
};

export default function TaxPage() {
  return (
    <div className="space-y-6">
      <Link className="text-sm text-brand-300 hover:underline" href="/">
        {"<"} Back to calculator hub
      </Link>
      <header className="card">
        <h1 className="text-3xl font-bold text-white">Tax Calculator</h1>
        <p className="mt-2 text-slate-300">
          Run quick annual tax estimates by entering gross income and deductions. Expand this
          with country and state tax logic in the next phase.
        </p>
      </header>
      <TaxCalculator />
    </div>
  );
}
