import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { StateTakeHomeCalculator } from "@/components/StateTakeHomeCalculator";
import { SourceReferences } from "@/components/SourceReferences";
import { ConversionCta } from "@/components/ConversionCta";
import { FormulaTable } from "@/components/FormulaTable";
import { RelatedStateLinks } from "@/components/RelatedStateLinks";
import { SITE_URL } from "@/lib/site";
import { getStateBySlug, usStates } from "@/lib/us-states";

type Props = {
  params: Promise<{ state: string }>;
};

export function generateStaticParams() {
  return usStates.map((state) => ({ state: state.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state } = await params;
  const stateInfo = getStateBySlug(state);

  if (!stateInfo) {
    return { title: "Not Found" };
  }

  const title = `${stateInfo.name} Take Home Pay Calculator`;
  const path = `/us/take-home-pay/${stateInfo.slug}`;

  return {
    title,
    description: `Estimate net paycheck in ${stateInfo.name} after tax and payroll deductions.`,
    alternates: {
      canonical: path
    },
    openGraph: {
      title,
      description: `Estimate net paycheck in ${stateInfo.name} after tax and payroll deductions.`,
      url: `${SITE_URL}${path}`
    }
  };
}

export default async function StateTakeHomeTemplatePage({ params }: Props) {
  const { state } = await params;
  const stateInfo = getStateBySlug(state);

  if (!stateInfo) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${stateInfo.name} Take Home Pay Calculator`,
    url: `${SITE_URL}/us/take-home-pay/${stateInfo.slug}`,
    description: `Estimate take-home salary in ${stateInfo.name}.`
  };
  const lastUpdated = new Date().toISOString().split("T")[0];

  return (
    <div className="space-y-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Link className="text-sm text-brand-300 hover:underline" href="/us">
        {"<"} Back to US template index
      </Link>

      <header className="card">
        <p className="text-xs uppercase tracking-[0.2em] text-brand-300">Take-home pay calculator</p>
        <h1 className="mt-3 text-3xl font-bold text-white">{stateInfo.name} Take Home Pay Calculator</h1>
        <p className="mt-3 text-slate-300">
          Estimate net pay in {stateInfo.name} after federal tax, state tax, FICA, and pre-tax
          deductions.
        </p>
      </header>

      <StateTakeHomeCalculator stateCode={stateInfo.code} stateName={stateInfo.name} />

      <FormulaTable
        title="Formula Table"
        rows={[
          {
            metric: "Adjusted income",
            formula: "max(annualIncome - preTaxDeductions, 0)",
            notes: "Taxable base after pre-tax retirement/benefit contributions."
          },
          {
            metric: "Federal tax",
            formula: "progressive federal tax on adjusted income",
            notes: "Uses filing-status standard deduction and bracket model."
          },
          {
            metric: "State tax",
            formula: "sum(adjusted income by state bracket * state bracket rate)",
            notes: `${stateInfo.code} bracket table and state deduction are applied dynamically.`
          },
          {
            metric: "FICA tax",
            formula: "socialSecurity(6.2%) + medicare(1.45% + addl threshold)",
            notes: "Includes additional Medicare tax at higher incomes."
          },
          {
            metric: "Annual net",
            formula: "adjustedIncome - federalTax - stateTax - ficaTax",
            notes: "Estimated take-home before post-tax deductions."
          },
          {
            metric: "Monthly / Biweekly net",
            formula: "annualNet / 12 ; annualNet / 26",
            notes: "Two common pay frequencies."
          }
        ]}
      />

      <SourceReferences
        stateName={stateInfo.name}
        stateCode={stateInfo.code}
        lastUpdated={lastUpdated}
      />

      <ConversionCta
        title="Optimize your paycheck strategy"
        description={`Use ${stateInfo.name} tax and net pay scenarios to tune deductions and compare nearby states.`}
      />

      <RelatedStateLinks currentState={stateInfo} mode="take-home-pay" />
    </div>
  );
}
