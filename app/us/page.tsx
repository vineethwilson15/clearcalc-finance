import Link from "next/link";
import type { Metadata } from "next";
import { categoryLabels, usSeoTemplates } from "@/lib/seo-pages";
import { usStates } from "@/lib/us-states";

export const metadata: Metadata = {
  title: "US State Finance Pages",
  description:
    "Browse state-specific finance pages for mortgage, loan, tax, salary, tax, and take-home pay planning."
};

export default function UsSeoIndexPage() {
  const grouped = {
    mortgage: usSeoTemplates.filter((page) => page.category === "mortgage"),
    loan: usSeoTemplates.filter((page) => page.category === "loan"),
    "tax-salary": usSeoTemplates.filter((page) => page.category === "tax-salary")
  };

  return (
    <div className="space-y-6">
      <header className="card">
        <h1 className="text-3xl font-bold text-white">US State Finance Pages</h1>
        <p className="mt-2 text-slate-300">
          Browse state-specific finance pages for tax, salary, mortgage, and loan planning.
        </p>
      </header>

      {Object.entries(grouped).map(([category, pages]) => (
        <section key={category} className="card">
          <h2 className="text-2xl font-semibold text-white">{categoryLabels[category as keyof typeof categoryLabels]}</h2>
          <div className="mt-4 grid gap-2">
            {pages.map((page) => (
              <Link
                key={page.slug}
                href={`/us/${page.category}/${page.slug}`}
                className="rounded-lg border border-slate-800 p-3 text-sm text-slate-300 transition hover:border-brand-500 hover:text-white"
              >
                {page.title}
              </Link>
            ))}
          </div>
        </section>
      ))}

      <section className="card">
        <h2 className="text-2xl font-semibold text-white">State coverage</h2>
        <p className="mt-2 text-slate-300">
          All 50 states are covered. Each state has a tax page and a take-home pay page.
        </p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {usStates.map((state) => (
            <div key={state.slug} className="rounded-lg border border-slate-800 p-3 text-sm text-slate-300">
              <p className="font-semibold text-white">{state.name}</p>
              <div className="mt-1 flex gap-3">
                <Link className="text-brand-300 hover:underline" href={`/us/state-tax/${state.slug}`}>
                  Tax page
                </Link>
                <Link className="text-brand-300 hover:underline" href={`/us/take-home-pay/${state.slug}`}>
                  Take-home page
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
