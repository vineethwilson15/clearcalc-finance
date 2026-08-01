import type { Metadata } from "next";
import Link from "next/link";
import { MortgageCalculator } from "@/components/MortgageCalculator";

export const metadata: Metadata = {
  title: "Mortgage Calculator",
  description:
    "Estimate monthly mortgage payment, total interest, and full repayment with a fixed-rate calculator."
};

export default function MortgagePage() {
  return (
    <div className="space-y-6">
      <Link className="text-sm text-brand-300 hover:underline" href="/">
        {"<"} Back to calculator hub
      </Link>
      <header className="card">
        <h1 className="text-3xl font-bold text-white">Mortgage Calculator</h1>
        <p className="mt-2 text-slate-300">
          Use this mortgage payment calculator to estimate your monthly cost and lifetime
          interest before choosing a home loan.
        </p>
      </header>
      <MortgageCalculator />
    </div>
  );
}
