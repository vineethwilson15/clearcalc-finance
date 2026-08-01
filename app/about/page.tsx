import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn what ClearCalc Finance is, what calculators it provides, and how it is structured."
};

export default function AboutPage() {
  return (
    <div className="space-y-6">
      <header className="card">
        <h1 className="text-3xl font-bold text-white">About ClearCalc Finance</h1>
        <p className="mt-3 text-slate-300">
          ClearCalc Finance is a calculator site focused on clear, practical estimates for common
          personal finance decisions. The goal is to help visitors compare options quickly without
          clutter or confusing terminology.
        </p>
      </header>

      <section className="card space-y-3">
        <h2 className="text-xl font-semibold text-white">What you can use here</h2>
        <ul className="list-disc space-y-2 pl-5 text-slate-300">
          <li>Mortgage payment estimates for home planning.</li>
          <li>Loan repayment comparisons for personal, auto, and consolidation loans.</li>
          <li>Salary estimates for hourly-to-annual and monthly take-home planning.</li>
          <li>Tax estimates for quick annual income planning.</li>
          <li>State pages for location-specific finance lookups.</li>
        </ul>
      </section>

      <section className="card">
        <h2 className="text-xl font-semibold text-white">How the site is built</h2>
        <p className="mt-3 text-slate-300">
          The site is statically generated for fast loading, with calculator results updating in the
          browser as you change inputs. Ads may be added through Google AdSense after approval.
        </p>
      </section>
    </div>
  );
}