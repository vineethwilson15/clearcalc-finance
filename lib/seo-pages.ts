export type SeoTemplate = {
  category: "mortgage" | "loan" | "tax-salary";
  slug: string;
  title: string;
  description: string;
  primaryKeyword: string;
};

export const usSeoTemplates: SeoTemplate[] = [
  {
    category: "mortgage",
    slug: "mortgage-payment-calculator",
    title: "Mortgage Payment Calculator",
    description: "Estimate monthly principal and interest for a fixed-rate home loan.",
    primaryKeyword: "mortgage payment calculator"
  },
  {
    category: "mortgage",
    slug: "amortization-schedule-calculator",
    title: "Amortization Schedule Calculator",
    description: "Break down loan payoff month by month with principal vs interest details.",
    primaryKeyword: "amortization schedule calculator"
  },
  {
    category: "mortgage",
    slug: "refinance-savings-calculator",
    title: "Refinance Savings Calculator",
    description: "Compare current loan vs refinance offer to estimate long-term savings.",
    primaryKeyword: "refinance savings calculator"
  },
  {
    category: "mortgage",
    slug: "biweekly-mortgage-calculator",
    title: "Biweekly Mortgage Calculator",
    description: "Compare monthly and biweekly mortgage payments to estimate interest reduction.",
    primaryKeyword: "biweekly mortgage calculator"
  },
  {
    category: "mortgage",
    slug: "mortgage-overpayment-calculator",
    title: "Mortgage Overpayment Calculator",
    description: "See how extra monthly payments can shorten payoff time and cut interest.",
    primaryKeyword: "mortgage overpayment calculator"
  },
  {
    category: "mortgage",
    slug: "home-affordability-calculator",
    title: "Home Affordability Calculator",
    description: "Estimate a realistic house budget based on income, debt, and down payment.",
    primaryKeyword: "home affordability calculator"
  },
  {
    category: "mortgage",
    slug: "arm-vs-fixed-calculator",
    title: "ARM vs Fixed Mortgage Calculator",
    description: "Compare adjustable and fixed mortgage scenarios for payment stability.",
    primaryKeyword: "arm vs fixed mortgage calculator"
  },
  {
    category: "mortgage",
    slug: "interest-only-mortgage-calculator",
    title: "Interest-Only Mortgage Calculator",
    description: "Estimate payments during interest-only and fully amortized periods.",
    primaryKeyword: "interest only mortgage calculator"
  },
  {
    category: "mortgage",
    slug: "closing-cost-calculator",
    title: "Mortgage Closing Cost Calculator",
    description: "Estimate upfront closing costs for home purchase or refinance transactions.",
    primaryKeyword: "mortgage closing cost calculator"
  },
  {
    category: "mortgage",
    slug: "property-tax-impact-calculator",
    title: "Property Tax Impact Calculator",
    description: "Estimate monthly payment changes based on property tax assumptions.",
    primaryKeyword: "property tax mortgage calculator"
  },
  {
    category: "mortgage",
    slug: "pmi-calculator",
    title: "PMI Calculator",
    description: "Estimate private mortgage insurance costs and removal timeline.",
    primaryKeyword: "pmi calculator"
  },
  {
    category: "mortgage",
    slug: "cash-out-refinance-calculator",
    title: "Cash-Out Refinance Calculator",
    description: "Estimate cash available and payment impact from a cash-out refinance.",
    primaryKeyword: "cash out refinance calculator"
  },
  {
    category: "loan",
    slug: "personal-loan-calculator",
    title: "Personal Loan Calculator",
    description: "Estimate monthly installment and total borrowing cost for personal loans.",
    primaryKeyword: "personal loan calculator"
  },
  {
    category: "loan",
    slug: "auto-loan-calculator",
    title: "Auto Loan Calculator",
    description: "Calculate car loan EMI with down payment, rate, and loan term inputs.",
    primaryKeyword: "auto loan calculator"
  },
  {
    category: "loan",
    slug: "boat-loan-calculator",
    title: "Boat Loan Calculator",
    description: "Estimate monthly payments and total cost for marine financing options.",
    primaryKeyword: "boat loan calculator"
  },
  {
    category: "loan",
    slug: "student-loan-payment-calculator",
    title: "Student Loan Payment Calculator",
    description: "Estimate monthly student loan repayment and cumulative interest.",
    primaryKeyword: "student loan payment calculator"
  },
  {
    category: "loan",
    slug: "debt-consolidation-calculator",
    title: "Debt Consolidation Calculator",
    description: "Compare multiple debts against one consolidation loan plan.",
    primaryKeyword: "debt consolidation calculator"
  },
  {
    category: "loan",
    slug: "credit-card-payoff-calculator",
    title: "Credit Card Payoff Calculator",
    description: "Estimate months to debt-free and total interest under different payment amounts.",
    primaryKeyword: "credit card payoff calculator"
  },
  {
    category: "loan",
    slug: "debt-payoff-calculator",
    title: "Debt Payoff Calculator",
    description: "Model snowball and avalanche debt payoff plans to reduce interest.",
    primaryKeyword: "debt payoff calculator"
  },
  {
    category: "loan",
    slug: "interest-rate-calculator",
    title: "Interest Rate Calculator",
    description: "Back-calculate effective interest rates from payment and term assumptions.",
    primaryKeyword: "interest rate calculator"
  },
  {
    category: "loan",
    slug: "loan-payoff-date-calculator",
    title: "Loan Payoff Date Calculator",
    description: "Estimate payoff date based on current balance and monthly repayment.",
    primaryKeyword: "loan payoff date calculator"
  },
  {
    category: "loan",
    slug: "simple-interest-calculator",
    title: "Simple Interest Calculator",
    description: "Estimate simple interest growth for short-term borrowing scenarios.",
    primaryKeyword: "simple interest calculator"
  },
  {
    category: "tax-salary",
    slug: "tax-calculator",
    title: "Income Tax Calculator",
    description: "Estimate annual tax due and effective tax rate from taxable income.",
    primaryKeyword: "tax calculator"
  },
  {
    category: "tax-salary",
    slug: "take-home-pay-calculator",
    title: "Take Home Pay Calculator",
    description: "Estimate net salary after taxes and deductions.",
    primaryKeyword: "take home pay calculator"
  },
  {
    category: "tax-salary",
    slug: "salary-calculator",
    title: "Salary Calculator",
    description: "Convert hourly and annual salary values with estimated deductions.",
    primaryKeyword: "salary calculator"
  },
  {
    category: "tax-salary",
    slug: "hourly-to-salary-calculator",
    title: "Hourly to Salary Calculator",
    description: "Convert hourly pay to monthly and annual salary benchmarks.",
    primaryKeyword: "hourly to salary calculator"
  },
  {
    category: "tax-salary",
    slug: "salary-to-hourly-calculator",
    title: "Salary to Hourly Calculator",
    description: "Convert annual salary into hourly wage assumptions quickly.",
    primaryKeyword: "salary to hourly calculator"
  },
  {
    category: "tax-salary",
    slug: "bonus-tax-calculator",
    title: "Bonus Tax Calculator",
    description: "Estimate net bonus after supplemental withholding assumptions.",
    primaryKeyword: "bonus tax calculator"
  },
  {
    category: "tax-salary",
    slug: "effective-tax-rate-calculator",
    title: "Effective Tax Rate Calculator",
    description: "Calculate effective tax burden from total income and tax paid.",
    primaryKeyword: "effective tax rate calculator"
  },
  {
    category: "tax-salary",
    slug: "paycheck-calculator",
    title: "Paycheck Calculator",
    description: "Estimate take-home paycheck for weekly, biweekly, and monthly cycles.",
    primaryKeyword: "paycheck calculator"
  }
];

export const categoryLabels: Record<SeoTemplate["category"], string> = {
  mortgage: "Mortgage",
  loan: "Loan",
  "tax-salary": "Tax & Salary"
};

export function getTemplate(category: string, slug: string): SeoTemplate | undefined {
  return usSeoTemplates.find((template) => template.category === category && template.slug === slug);
}
