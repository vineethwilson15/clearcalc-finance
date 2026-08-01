import type { Metadata } from "next";
import Link from "next/link";
import { LoanCalculator } from "@/components/LoanCalculator";

export const metadata: Metadata = {
  title: "Loan Calculator",
  description:
    "Calculate monthly installment, total payment, and interest for personal or auto loans."
};

export default function LoanPage() {
  return (
    <div className="space-y-6">
      <Link className="text-sm text-brand-300 hover:underline" href="/">
        {"<"} Back to calculator hub
      </Link>
      <header className="card">
        <h1 className="text-3xl font-bold text-white">Loan Calculator</h1>
        <p className="mt-2 text-slate-300">
          Estimate monthly EMI and total interest for fixed-rate loans so you can compare
          repayment options quickly.
        </p>
      </header>
      <LoanCalculator />
    </div>
  );
}
