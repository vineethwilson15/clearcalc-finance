import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Read the calculator and financial advice disclaimer for ClearCalc Finance."
};

export default function DisclaimerPage() {
  return (
    <div className="space-y-6">
      <header className="card">
        <h1 className="text-3xl font-bold text-white">Disclaimer</h1>
        <p className="mt-3 text-slate-300">
          The calculators on this site provide estimates only. They are intended for planning and
          comparison, not as financial, tax, legal, or investment advice.
        </p>
      </header>

      <section className="card space-y-3">
        <h2 className="text-xl font-semibold text-white">Important notes</h2>
        <ul className="list-disc space-y-2 pl-5 text-slate-300">
          <li>Results can differ from lender, employer, or tax authority calculations.</li>
          <li>Always confirm major decisions with a qualified professional.</li>
          <li>State and tax pages are educational references and may not reflect every edge case.</li>
        </ul>
      </section>
    </div>
  );
}