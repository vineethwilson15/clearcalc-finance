import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { AdSlot } from "@/components/AdSlot";
import { FormulaTable } from "@/components/FormulaTable";
import { MortgageCalculator } from "@/components/MortgageCalculator";
import { LoanCalculator } from "@/components/LoanCalculator";
import { TaxCalculator } from "@/components/TaxCalculator";
import { SalaryCalculator } from "@/components/SalaryCalculator";
import { getTemplate, usSeoTemplates } from "@/lib/seo-pages";
import { SITE_URL } from "@/lib/site";

type Props = {
  params: Promise<{ category: string; slug: string }>;
};

export function generateStaticParams() {
  return usSeoTemplates.map((page) => ({
    category: page.category,
    slug: page.slug
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params;
  const template = getTemplate(category, slug);

  if (!template) {
    return { title: "Not Found" };
  }

  const canonicalPath = `/us/${template.category}/${template.slug}`;

  return {
    title: `${template.title} (US)`,
    description: template.description,
    alternates: {
      canonical: canonicalPath
    },
    openGraph: {
      title: `${template.title} (US)`,
      description: template.description,
      url: `${SITE_URL}${canonicalPath}`
    }
  };
}

export default async function UsTemplatePage({ params }: Props) {
  const { category, slug } = await params;
  const template = getTemplate(category, slug);

  if (!template) {
    notFound();
  }

  const url = `${SITE_URL}/us/${template.category}/${template.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: `${template.title} (US)`,
        description: template.description,
        url
      },
      {
        "@type": "SoftwareApplication",
        name: template.title,
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD"
        }
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: `How does this ${template.primaryKeyword} tool work?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: "It uses standard finance math formulas and your inputs to estimate results instantly."
            }
          },
          {
            "@type": "Question",
            name: "Can I use this for planning different scenarios?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Adjust loan term, rates, and payment assumptions to compare multiple outcomes."
            }
          }
        ]
      }
    ]
  };

  const calculatorComponent =
    template.category === "mortgage" ? (
      <MortgageCalculator />
    ) : template.category === "loan" ? (
      <LoanCalculator />
    ) : template.slug.includes("salary") || template.slug.includes("paycheck") ? (
      <SalaryCalculator />
    ) : (
      <TaxCalculator />
    );

  const formulaRowsByCategory = {
    mortgage: [
      {
        metric: "Monthly payment",
        formula: "P * r * (1 + r)^n / ((1 + r)^n - 1)",
        notes: "P principal, r monthly rate, n number of payments."
      },
      {
        metric: "Total payment",
        formula: "monthlyPayment * n",
        notes: "Total paid over full term."
      },
      {
        metric: "Total interest",
        formula: "totalPayment - principal",
        notes: "Total borrowing cost."
      }
    ],
    loan: [
      {
        metric: "Monthly installment (EMI)",
        formula: "P * r * (1 + r)^n / ((1 + r)^n - 1)",
        notes: "Fixed-rate amortization formula."
      },
      {
        metric: "Total payment",
        formula: "emi * n",
        notes: "Total principal plus interest."
      },
      {
        metric: "Total interest",
        formula: "totalPayment - principal",
        notes: "Interest paid across term."
      }
    ],
    "tax-salary": [
      {
        metric: "Annual gross salary",
        formula: "hourlyRate * hoursPerWeek * 52",
        notes: "For hourly-income conversion pages."
      },
      {
        metric: "Taxable income",
        formula: "max(annualIncome - deductions, 0)",
        notes: "Simplified tax base used by baseline calculator."
      },
      {
        metric: "Net income",
        formula: "grossIncome - estimatedTaxes",
        notes: "Estimated before custom local deductions."
      }
    ]
  } as const;

  return (
    <div className="space-y-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Link className="text-sm text-brand-300 hover:underline" href="/us">
        {"<"} Back to US template index
      </Link>

      <header className="card">
        <p className="text-xs uppercase tracking-[0.2em] text-brand-300">US long-tail template</p>
        <h1 className="mt-3 text-3xl font-bold text-white">{template.title} (US)</h1>
        <p className="mt-3 text-slate-300">{template.description}</p>
      </header>

      {calculatorComponent}

      <section className="card">
        <h2 className="text-xl font-semibold text-white">Primary Keyword</h2>
        <p className="mt-2 text-slate-300">{template.primaryKeyword}</p>
      </section>

      <FormulaTable
        title="Formula Table"
        rows={formulaRowsByCategory[template.category]}
      />

      <AdSlot location="Template footer" slotKey="templateFooter" />
    </div>
  );
}
