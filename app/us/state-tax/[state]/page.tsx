import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { StateTaxCalculator } from "@/components/StateTaxCalculator";
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

  const title = `${stateInfo.name} State Tax Calculator`;
  const path = `/us/state-tax/${stateInfo.slug}`;

  return {
    title,
    description: `Estimate ${stateInfo.name} income tax scenarios with federal and state assumptions.`,
    alternates: {
      canonical: path
    },
    openGraph: {
      title,
      description: `Estimate ${stateInfo.name} income tax scenarios with federal and state assumptions.`,
      url: `${SITE_URL}${path}`
    }
  };
}

export default async function StateTaxTemplatePage({ params }: Props) {
  const { state } = await params;
  const stateInfo = getStateBySlug(state);

  if (!stateInfo) {
    notFound();
  }

  const url = `${SITE_URL}/us/state-tax/${stateInfo.slug}`;
  const lastUpdated = new Date().toISOString().split("T")[0];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Does ${stateInfo.name} have state income tax?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: "Tax treatment varies by state and filing profile; this template supports state-specific assumptions."
        }
      },
      {
        "@type": "Question",
        name: "Is this calculator an official tax filing tool?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. It is an estimate tool for planning and educational use."
        }
      }
    ],
    url
  };

  return (
    <div className="space-y-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Link className="text-sm text-brand-300 hover:underline" href="/us">
        {"<"} Back to US template index
      </Link>

      <header className="card">
        <p className="text-xs uppercase tracking-[0.2em] text-brand-300">State tax calculator</p>
        <h1 className="mt-3 text-3xl font-bold text-white">{stateInfo.name} State Tax Calculator</h1>
        <p className="mt-3 text-slate-300">
          Estimate federal and {stateInfo.name} state tax using filing status, deductions, and
          state-aware tax assumptions.
        </p>
      </header>

      <StateTaxCalculator stateCode={stateInfo.code} stateName={stateInfo.name} />

      <FormulaTable
        title="Formula Table"
        rows={[
          {
            metric: "Federal taxable income",
            formula: "max(annualIncome - deductions - standardDeduction, 0)",
            notes: "Standard deduction varies by filing status."
          },
          {
            metric: "Federal tax",
            formula: "sum(taxable income by bracket * federal bracket rate)",
            notes: "Progressive bracket model."
          },
          {
            metric: "State taxable income",
            formula: "max(annualIncome - deductions - stateDeduction, 0)",
            notes: "State deduction and filing status are applied in the state profile."
          },
          {
            metric: "State tax",
            formula: "sum(state taxable income by state bracket * state bracket rate)",
            notes: `${stateInfo.code} bracket table is selected dynamically.`
          },
          {
            metric: "Total estimated tax",
            formula: "federalTax + stateTax",
            notes: "Excludes local/city taxes."
          },
          {
            metric: "Effective rate",
            formula: "(totalEstimatedTax / annualIncome) * 100",
            notes: "Percent of gross income."
          }
        ]}
      />

      <SourceReferences
        stateName={stateInfo.name}
        stateCode={stateInfo.code}
        lastUpdated={lastUpdated}
      />

      <ConversionCta
        title="Plan your full paycheck, not just taxes"
        description={`Compare ${stateInfo.name} tax impact with take-home pay and similar states in minutes.`}
      />

      <RelatedStateLinks currentState={stateInfo} mode="state-tax" />
    </div>
  );
}
