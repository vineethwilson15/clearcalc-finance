import type { Metadata } from "next";
import Link from "next/link";
import { SalaryCalculator } from "@/components/SalaryCalculator";

export const metadata: Metadata = {
  title: "Salary Calculator",
  description:
    "Convert hourly wages to annual salary and estimate monthly take-home with deductions."
};

export default function SalaryPage() {
  return (
    <div className="space-y-6">
      <Link className="text-sm text-brand-300 hover:underline" href="/">
        {"<"} Back to calculator hub
      </Link>
      <header className="card">
        <h1 className="text-3xl font-bold text-white">Salary Calculator</h1>
        <p className="mt-2 text-slate-300">
          Convert hourly rates into annual and monthly pay estimates to evaluate job offers
          and budget faster.
        </p>
      </header>
      <SalaryCalculator />
    </div>
  );
}
