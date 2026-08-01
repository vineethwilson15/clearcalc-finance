export type TaxYear = "2024" | "2025" | "2026";

export type CitationLink = {
  label: string;
  href: string;
};

const stateAuthorityOverrides: Record<string, string> = {
  CA: "https://www.ftb.ca.gov/",
  NY: "https://www.tax.ny.gov/",
  NJ: "https://www.nj.gov/treasury/taxation/",
  TX: "https://comptroller.texas.gov/taxes/",
  FL: "https://floridarevenue.com/",
  IL: "https://tax.illinois.gov/",
  PA: "https://www.revenue.pa.gov/",
  OH: "https://tax.ohio.gov/",
  WA: "https://dor.wa.gov/",
  MA: "https://www.mass.gov/orgs/massachusetts-department-of-revenue"
};

const federalYearLinks: Record<TaxYear, CitationLink> = {
  "2024": {
    label: "IRS inflation adjustments for tax year 2024",
    href: "https://www.irs.gov/newsroom/irs-provides-tax-inflation-adjustments-for-tax-year-2024"
  },
  "2025": {
    label: "IRS inflation adjustments for tax year 2025",
    href: "https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2025"
  },
  "2026": {
    label: "IRS inflation adjustments for tax year 2026",
    href: "https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2026"
  }
};

export function getFederalTaxYearCitations(): CitationLink[] {
  return [federalYearLinks["2024"], federalYearLinks["2025"], federalYearLinks["2026"]];
}

export function getStateTaxAuthorityCitation(stateCode: string, stateName: string): CitationLink {
  const href =
    stateAuthorityOverrides[stateCode] ??
    `https://www.taxadmin.org/state-tax-agencies?state=${encodeURIComponent(stateCode)}`;

  return {
    label: `${stateName} tax authority reference`,
    href
  };
}

export function getFicaCitations(): CitationLink[] {
  return [
    {
      label: "IRS Publication 15 (Employer's Tax Guide)",
      href: "https://www.irs.gov/publications/p15"
    },
    {
      label: "SSA contribution and benefit base",
      href: "https://www.ssa.gov/oact/cola/cbb.html"
    }
  ];
}
