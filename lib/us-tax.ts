export type FilingStatus = "single" | "married";
export type TaxYear = "2024" | "2025" | "2026";

type TaxBracket = {
  cap: number;
  rate: number;
};

type StateTaxProfile = {
  code: string;
  model: "none" | "flat" | "progressive";
  deduction: Record<FilingStatus, number>;
  brackets: Record<FilingStatus, TaxBracket[]>;
  note: string;
};

const yearFactors: Record<TaxYear, { deductionFactor: number; bracketFactor: number }> = {
  "2024": { deductionFactor: 0.94, bracketFactor: 0.94 },
  "2025": { deductionFactor: 0.97, bracketFactor: 0.97 },
  "2026": { deductionFactor: 1, bracketFactor: 1 }
};

const federalStandardDeductionBase: Record<FilingStatus, number> = {
  single: 14600,
  married: 29200
};

const federalBracketsBase: Record<FilingStatus, TaxBracket[]> = {
  single: [
    { cap: 11600, rate: 0.1 },
    { cap: 47150, rate: 0.12 },
    { cap: 100525, rate: 0.22 },
    { cap: 191950, rate: 0.24 },
    { cap: 243725, rate: 0.32 },
    { cap: 609350, rate: 0.35 },
    { cap: Number.POSITIVE_INFINITY, rate: 0.37 }
  ],
  married: [
    { cap: 23200, rate: 0.1 },
    { cap: 94300, rate: 0.12 },
    { cap: 201050, rate: 0.22 },
    { cap: 383900, rate: 0.24 },
    { cap: 487450, rate: 0.32 },
    { cap: 731200, rate: 0.35 },
    { cap: Number.POSITIVE_INFINITY, rate: 0.37 }
  ]
};

const noIncomeTaxStates = new Set(["AK", "FL", "NV", "SD", "TN", "TX", "WA", "WY", "NH"]);

const stateFlatRates: Record<string, number> = {
  AL: 0.045,
  AK: 0,
  AZ: 0.025,
  AR: 0.047,
  CA: 0.078,
  CO: 0.044,
  CT: 0.055,
  DE: 0.05,
  FL: 0,
  GA: 0.053,
  HI: 0.07,
  ID: 0.053,
  IL: 0.0495,
  IN: 0.03,
  IA: 0.047,
  KS: 0.052,
  KY: 0.04,
  LA: 0.04,
  ME: 0.065,
  MD: 0.05,
  MA: 0.05,
  MI: 0.0425,
  MN: 0.068,
  MS: 0.045,
  MO: 0.047,
  MT: 0.057,
  NE: 0.052,
  NV: 0,
  NH: 0,
  NJ: 0.06,
  NM: 0.049,
  NY: 0.062,
  NC: 0.045,
  ND: 0.041,
  OH: 0.038,
  OK: 0.0475,
  OR: 0.075,
  PA: 0.0307,
  RI: 0.052,
  SC: 0.052,
  SD: 0,
  TN: 0,
  TX: 0,
  UT: 0.0485,
  VT: 0.06,
  VA: 0.0525,
  WA: 0,
  WV: 0.047,
  WI: 0.053,
  WY: 0
};

function progressiveTax(taxableIncome: number, brackets: TaxBracket[]): number {
  let remaining = Math.max(taxableIncome, 0);
  let lowerCap = 0;
  let tax = 0;

  for (const bracket of brackets) {
    if (remaining <= 0) {
      break;
    }

    const bracketWidth = bracket.cap - lowerCap;
    const taxedAtThisBracket = Math.min(remaining, bracketWidth);
    tax += taxedAtThisBracket * bracket.rate;
    remaining -= taxedAtThisBracket;
    lowerCap = bracket.cap;
  }

  return tax;
}

function scaleBrackets(brackets: TaxBracket[], bracketFactor: number): TaxBracket[] {
  return brackets.map((bracket) => ({
    cap: Number.isFinite(bracket.cap) ? Math.round(bracket.cap * bracketFactor) : bracket.cap,
    rate: bracket.rate
  }));
}

function toFlatBrackets(rate: number): Record<FilingStatus, TaxBracket[]> {
  return {
    single: [{ cap: Number.POSITIVE_INFINITY, rate }],
    married: [{ cap: Number.POSITIVE_INFINITY, rate }]
  };
}

function byStatus(single: number, married?: number): Record<FilingStatus, number> {
  return {
    single,
    married: married ?? single * 2
  };
}

function bracketsByStatus(
  single: TaxBracket[],
  married?: TaxBracket[]
): Record<FilingStatus, TaxBracket[]> {
  return {
    single,
    married: married ?? scaleBrackets(single, 2)
  };
}

const progressiveOverrides: Record<
  string,
  Pick<StateTaxProfile, "deduction" | "brackets" | "note">
> = {
  AL: {
    deduction: byStatus(2500, 7500),
    brackets: bracketsByStatus([
      { cap: 500, rate: 0.02 },
      { cap: 3000, rate: 0.04 },
      { cap: Number.POSITIVE_INFINITY, rate: 0.05 }
    ]),
    note: "Expanded progressive model with low-income thresholds."
  },
  AR: {
    deduction: byStatus(2200, 4400),
    brackets: bracketsByStatus([
      { cap: 4300, rate: 0.02 },
      { cap: 8500, rate: 0.04 },
      { cap: Number.POSITIVE_INFINITY, rate: 0.047 }
    ]),
    note: "Expanded progressive model using tiered brackets."
  },
  CA: {
    deduction: { single: 5363, married: 10726 },
    brackets: {
      single: [
        { cap: 10412, rate: 0.01 },
        { cap: 24684, rate: 0.02 },
        { cap: 38959, rate: 0.04 },
        { cap: 54081, rate: 0.06 },
        { cap: 68350, rate: 0.08 },
        { cap: 349137, rate: 0.093 },
        { cap: 418961, rate: 0.103 },
        { cap: 698271, rate: 0.113 },
        { cap: Number.POSITIVE_INFINITY, rate: 0.123 }
      ],
      married: [
        { cap: 20824, rate: 0.01 },
        { cap: 49368, rate: 0.02 },
        { cap: 77918, rate: 0.04 },
        { cap: 108162, rate: 0.06 },
        { cap: 136700, rate: 0.08 },
        { cap: 698274, rate: 0.093 },
        { cap: 837922, rate: 0.103 },
        { cap: 1396542, rate: 0.113 },
        { cap: Number.POSITIVE_INFINITY, rate: 0.123 }
      ]
    },
    note: "Progressive brackets with state standard deduction."
  },
  CT: {
    deduction: byStatus(15000, 24000),
    brackets: bracketsByStatus([
      { cap: 10000, rate: 0.03 },
      { cap: 50000, rate: 0.05 },
      { cap: 100000, rate: 0.055 },
      { cap: 200000, rate: 0.06 },
      { cap: 250000, rate: 0.065 },
      { cap: 500000, rate: 0.069 },
      { cap: Number.POSITIVE_INFINITY, rate: 0.0699 }
    ]),
    note: "Expanded progressive model with higher-income tiers."
  },
  DE: {
    deduction: byStatus(3250, 6500),
    brackets: bracketsByStatus([
      { cap: 2000, rate: 0.022 },
      { cap: 5000, rate: 0.039 },
      { cap: 10000, rate: 0.048 },
      { cap: 20000, rate: 0.052 },
      { cap: 25000, rate: 0.0555 },
      { cap: 60000, rate: 0.066 },
      { cap: Number.POSITIVE_INFINITY, rate: 0.066 }
    ]),
    note: "Expanded progressive model with finer low-to-mid thresholds."
  },
  GA: {
    deduction: byStatus(5400, 7100),
    brackets: bracketsByStatus([
      { cap: 12000, rate: 0.01 },
      { cap: 47000, rate: 0.05 },
      { cap: Number.POSITIVE_INFINITY, rate: 0.053 }
    ]),
    note: "Expanded progressive approximation with modern top-rate band."
  },
  HI: {
    deduction: byStatus(2200, 4400),
    brackets: bracketsByStatus([
      { cap: 2400, rate: 0.014 },
      { cap: 4800, rate: 0.032 },
      { cap: 9600, rate: 0.055 },
      { cap: 14400, rate: 0.064 },
      { cap: 19200, rate: 0.068 },
      { cap: 24000, rate: 0.072 },
      { cap: 36000, rate: 0.076 },
      { cap: 48000, rate: 0.079 },
      { cap: 150000, rate: 0.0825 },
      { cap: 175000, rate: 0.09 },
      { cap: 200000, rate: 0.1 },
      { cap: Number.POSITIVE_INFINITY, rate: 0.11 }
    ]),
    note: "Expanded progressive model with granular Hawaii thresholds."
  },
  IA: {
    deduction: byStatus(2200, 5450),
    brackets: bracketsByStatus([
      { cap: 6000, rate: 0.044 },
      { cap: 30000, rate: 0.0482 },
      { cap: 75000, rate: 0.057 },
      { cap: Number.POSITIVE_INFINITY, rate: 0.057 }
    ]),
    note: "Expanded progressive model reflecting modern Iowa tiers."
  },
  KS: {
    deduction: byStatus(3500, 8000),
    brackets: bracketsByStatus([
      { cap: 15000, rate: 0.031 },
      { cap: 30000, rate: 0.0525 },
      { cap: Number.POSITIVE_INFINITY, rate: 0.057 }
    ]),
    note: "Expanded progressive model with three-band structure."
  },
  LA: {
    deduction: byStatus(4500, 9000),
    brackets: bracketsByStatus([
      { cap: 12500, rate: 0.0185 },
      { cap: 50000, rate: 0.035 },
      { cap: Number.POSITIVE_INFINITY, rate: 0.0425 }
    ]),
    note: "Expanded progressive model for Louisiana brackets."
  },
  MD: {
    deduction: byStatus(2400, 4800),
    brackets: bracketsByStatus([
      { cap: 1000, rate: 0.02 },
      { cap: 2000, rate: 0.03 },
      { cap: 3000, rate: 0.04 },
      { cap: 100000, rate: 0.0475 },
      { cap: 125000, rate: 0.05 },
      { cap: 150000, rate: 0.0525 },
      { cap: 250000, rate: 0.055 },
      { cap: Number.POSITIVE_INFINITY, rate: 0.0575 }
    ]),
    note: "Expanded progressive model with multi-band Maryland thresholds."
  },
  ME: {
    deduction: byStatus(14600, 29200),
    brackets: bracketsByStatus([
      { cap: 26000, rate: 0.058 },
      { cap: 61500, rate: 0.0675 },
      { cap: Number.POSITIVE_INFINITY, rate: 0.0715 }
    ]),
    note: "Expanded progressive model with high-band tiers."
  },
  MN: {
    deduction: { single: 14575, married: 29150 },
    brackets: {
      single: [
        { cap: 31690, rate: 0.0535 },
        { cap: 104090, rate: 0.068 },
        { cap: 193240, rate: 0.0785 },
        { cap: Number.POSITIVE_INFINITY, rate: 0.0985 }
      ],
      married: [
        { cap: 46330, rate: 0.0535 },
        { cap: 184040, rate: 0.068 },
        { cap: 321450, rate: 0.0785 },
        { cap: Number.POSITIVE_INFINITY, rate: 0.0985 }
      ]
    },
    note: "Progressive brackets with adjusted deduction assumptions."
  },
  MO: {
    deduction: byStatus(14000, 28000),
    brackets: bracketsByStatus([
      { cap: 1250, rate: 0.02 },
      { cap: 2500, rate: 0.025 },
      { cap: 3750, rate: 0.03 },
      { cap: Number.POSITIVE_INFINITY, rate: 0.047 }
    ]),
    note: "Expanded progressive model with stepped low-income bands."
  },
  MT: {
    deduction: byStatus(5800, 11600),
    brackets: bracketsByStatus([
      { cap: 4100, rate: 0.047 },
      { cap: 7100, rate: 0.052 },
      { cap: 10800, rate: 0.059 },
      { cap: Number.POSITIVE_INFINITY, rate: 0.0675 }
    ]),
    note: "Expanded progressive model for Montana tax tiers."
  },
  NE: {
    deduction: byStatus(7900, 15800),
    brackets: bracketsByStatus([
      { cap: 3700, rate: 0.0246 },
      { cap: 22170, rate: 0.0351 },
      { cap: 35730, rate: 0.0501 },
      { cap: Number.POSITIVE_INFINITY, rate: 0.0584 }
    ]),
    note: "Expanded progressive model with Nebraska multi-tier rates."
  },
  NJ: {
    deduction: { single: 0, married: 0 },
    brackets: {
      single: [
        { cap: 20000, rate: 0.014 },
        { cap: 35000, rate: 0.0175 },
        { cap: 40000, rate: 0.035 },
        { cap: 75000, rate: 0.05525 },
        { cap: 500000, rate: 0.0637 },
        { cap: 1000000, rate: 0.0897 },
        { cap: Number.POSITIVE_INFINITY, rate: 0.1075 }
      ],
      married: [
        { cap: 20000, rate: 0.014 },
        { cap: 50000, rate: 0.0175 },
        { cap: 70000, rate: 0.0245 },
        { cap: 80000, rate: 0.035 },
        { cap: 150000, rate: 0.05525 },
        { cap: 500000, rate: 0.0637 },
        { cap: 1000000, rate: 0.0897 },
        { cap: Number.POSITIVE_INFINITY, rate: 0.1075 }
      ]
    },
    note: "Progressive brackets without fixed deduction in this model."
  },
  NM: {
    deduction: byStatus(12500, 25000),
    brackets: bracketsByStatus([
      { cap: 5500, rate: 0.017 },
      { cap: 11000, rate: 0.032 },
      { cap: 16000, rate: 0.047 },
      { cap: 210000, rate: 0.049 },
      { cap: Number.POSITIVE_INFINITY, rate: 0.059 }
    ]),
    note: "Expanded progressive model with high-income New Mexico tier."
  },
  NY: {
    deduction: { single: 8000, married: 16050 },
    brackets: {
      single: [
        { cap: 8500, rate: 0.04 },
        { cap: 11700, rate: 0.045 },
        { cap: 13900, rate: 0.0525 },
        { cap: 21400, rate: 0.055 },
        { cap: 80650, rate: 0.06 },
        { cap: 215400, rate: 0.0685 },
        { cap: 1077550, rate: 0.0965 },
        { cap: Number.POSITIVE_INFINITY, rate: 0.103 }
      ],
      married: [
        { cap: 17150, rate: 0.04 },
        { cap: 23600, rate: 0.045 },
        { cap: 27900, rate: 0.0525 },
        { cap: 43000, rate: 0.055 },
        { cap: 161550, rate: 0.06 },
        { cap: 323200, rate: 0.0685 },
        { cap: 2155350, rate: 0.0965 },
        { cap: Number.POSITIVE_INFINITY, rate: 0.103 }
      ]
    },
    note: "Progressive brackets with filing-status deductions."
  },
  ND: {
    deduction: byStatus(14575, 29150),
    brackets: bracketsByStatus([
      { cap: 44725, rate: 0.011 },
      { cap: 108650, rate: 0.0204 },
      { cap: 226950, rate: 0.0227 },
      { cap: Number.POSITIVE_INFINITY, rate: 0.025 }
    ]),
    note: "Expanded progressive model with North Dakota rate bands."
  },
  OH: {
    deduction: byStatus(0, 0),
    brackets: bracketsByStatus([
      { cap: 26050, rate: 0.0275 },
      { cap: 100000, rate: 0.0368 },
      { cap: Number.POSITIVE_INFINITY, rate: 0.0399 }
    ]),
    note: "Expanded progressive model with Ohio top-band treatment."
  },
  OK: {
    deduction: byStatus(6350, 12700),
    brackets: bracketsByStatus([
      { cap: 1000, rate: 0.0025 },
      { cap: 2500, rate: 0.0075 },
      { cap: 3750, rate: 0.0175 },
      { cap: 4900, rate: 0.0275 },
      { cap: 7200, rate: 0.0375 },
      { cap: Number.POSITIVE_INFINITY, rate: 0.0475 }
    ]),
    note: "Expanded progressive model with multiple Oklahoma low-income steps."
  },
  OR: {
    deduction: { single: 2745, married: 5495 },
    brackets: {
      single: [
        { cap: 4300, rate: 0.0475 },
        { cap: 10800, rate: 0.0675 },
        { cap: 125000, rate: 0.0875 },
        { cap: Number.POSITIVE_INFINITY, rate: 0.099 }
      ],
      married: [
        { cap: 8600, rate: 0.0475 },
        { cap: 21600, rate: 0.0675 },
        { cap: 250000, rate: 0.0875 },
        { cap: Number.POSITIVE_INFINITY, rate: 0.099 }
      ]
    },
    note: "Progressive brackets with standard deduction."
  },
  RI: {
    deduction: byStatus(10400, 20800),
    brackets: bracketsByStatus([
      { cap: 75550, rate: 0.0375 },
      { cap: 171550, rate: 0.0475 },
      { cap: Number.POSITIVE_INFINITY, rate: 0.0599 }
    ]),
    note: "Expanded progressive model with Rhode Island three-tier structure."
  },
  SC: {
    deduction: byStatus(14600, 29200),
    brackets: bracketsByStatus([
      { cap: 3460, rate: 0 },
      { cap: 17330, rate: 0.03 },
      { cap: Number.POSITIVE_INFINITY, rate: 0.064 }
    ]),
    note: "Expanded progressive model with South Carolina top-rate treatment."
  },
  VA: {
    deduction: byStatus(8000, 16000),
    brackets: bracketsByStatus([
      { cap: 3000, rate: 0.02 },
      { cap: 5000, rate: 0.03 },
      { cap: 17000, rate: 0.05 },
      { cap: Number.POSITIVE_INFINITY, rate: 0.0575 }
    ]),
    note: "Expanded progressive model with multi-band Virginia structure."
  },
  VT: {
    deduction: byStatus(7000, 14000),
    brackets: bracketsByStatus([
      { cap: 45400, rate: 0.0335 },
      { cap: 110050, rate: 0.066 },
      { cap: 229550, rate: 0.076 },
      { cap: Number.POSITIVE_INFINITY, rate: 0.0875 }
    ]),
    note: "Expanded progressive model with Vermont upper brackets."
  },
  WV: {
    deduction: byStatus(2000, 4000),
    brackets: bracketsByStatus([
      { cap: 10000, rate: 0.03 },
      { cap: 25000, rate: 0.04 },
      { cap: 40000, rate: 0.045 },
      { cap: 60000, rate: 0.06 },
      { cap: Number.POSITIVE_INFINITY, rate: 0.065 }
    ]),
    note: "Expanded progressive model with West Virginia stepped thresholds."
  },
  WI: {
    deduction: { single: 0, married: 0 },
    brackets: {
      single: [
        { cap: 13810, rate: 0.035 },
        { cap: 27630, rate: 0.044 },
        { cap: 304170, rate: 0.053 },
        { cap: Number.POSITIVE_INFINITY, rate: 0.0765 }
      ],
      married: [
        { cap: 18420, rate: 0.035 },
        { cap: 36840, rate: 0.044 },
        { cap: 405550, rate: 0.053 },
        { cap: Number.POSITIVE_INFINITY, rate: 0.0765 }
      ]
    },
    note: "Progressive brackets with status-specific thresholds."
  }
};

const stateProfiles: Record<string, StateTaxProfile> = Object.fromEntries(
  Object.entries(stateFlatRates).map(([code, rate]) => {
    const override = progressiveOverrides[code];

    if (override) {
      return [
        code,
        {
          code,
          model: "progressive",
          deduction: override.deduction,
          brackets: override.brackets,
          note: override.note
        } satisfies StateTaxProfile
      ];
    }

    if (noIncomeTaxStates.has(code) || rate === 0) {
      return [
        code,
        {
          code,
          model: "none",
          deduction: { single: 0, married: 0 },
          brackets: toFlatBrackets(0),
          note: "No state income tax in this model."
        } satisfies StateTaxProfile
      ];
    }

    return [
      code,
      {
        code,
        model: "flat",
        deduction: { single: 0, married: 0 },
        brackets: toFlatBrackets(rate),
        note: "Flat-rate state model."
      } satisfies StateTaxProfile
    ];
  })
);

const defaultStateProfile: StateTaxProfile = {
  code: "NA",
  model: "flat",
  deduction: { single: 0, married: 0 },
  brackets: toFlatBrackets(0.045),
  note: "Fallback state model."
};

function getTopRate(brackets: TaxBracket[]): number {
  return brackets.reduce((max, bracket) => Math.max(max, bracket.rate), 0);
}

export function getStateTaxProfile(stateCode: string): StateTaxProfile {
  return stateProfiles[stateCode] ?? defaultStateProfile;
}

export function getStateTaxRate(stateCode: string): number {
  const profile = getStateTaxProfile(stateCode);
  return getTopRate(profile.brackets.single);
}

export const taxYearOptions: TaxYear[] = ["2024", "2025", "2026"];

export function calculateFederalTax(args: {
  annualIncome: number;
  deductions: number;
  filingStatus: FilingStatus;
  taxYear?: TaxYear;
}): { taxableIncome: number; tax: number; standardDeduction: number; taxYear: TaxYear } {
  const taxYear = args.taxYear ?? "2026";
  const factors = yearFactors[taxYear];
  const standardDeduction = Math.round(
    federalStandardDeductionBase[args.filingStatus] * factors.deductionFactor
  );
  const taxableIncome = Math.max(args.annualIncome - args.deductions - standardDeduction, 0);
  const brackets = scaleBrackets(federalBracketsBase[args.filingStatus], factors.bracketFactor);
  const tax = progressiveTax(taxableIncome, brackets);

  return { taxableIncome, tax, standardDeduction, taxYear };
}

export function calculateStateTax(args: {
  annualIncome: number;
  deductions: number;
  filingStatus: FilingStatus;
  stateCode: string;
  taxYear?: TaxYear;
}): {
  taxableIncome: number;
  tax: number;
  topRate: number;
  model: StateTaxProfile["model"];
  note: string;
  stateDeductionUsed: number;
  taxYear: TaxYear;
} {
  const profile = getStateTaxProfile(args.stateCode);
  const taxYear = args.taxYear ?? "2026";
  const factors = yearFactors[taxYear];
  const stateDeduction = Math.round(
    (profile.deduction[args.filingStatus] ?? 0) * factors.deductionFactor
  );
  const stateTaxableIncome = Math.max(args.annualIncome - args.deductions - stateDeduction, 0);
  const brackets = scaleBrackets(profile.brackets[args.filingStatus], factors.bracketFactor);
  const tax = progressiveTax(stateTaxableIncome, brackets);
  const topRate = getTopRate(brackets);

  return {
    taxableIncome: stateTaxableIncome,
    tax,
    topRate,
    model: profile.model,
    note: profile.note,
    stateDeductionUsed: stateDeduction,
    taxYear
  };
}

export function calculateFica(args: {
  annualIncome: number;
  filingStatus: FilingStatus;
  taxYear?: TaxYear;
}): number {
  const taxYear = args.taxYear ?? "2026";
  const factors = yearFactors[taxYear];
  const socialSecurityWageBase = Math.round(168600 * factors.bracketFactor);
  const socialSecurityTax = Math.min(args.annualIncome, socialSecurityWageBase) * 0.062;
  const medicareTax = args.annualIncome * 0.0145;

  const additionalThresholdBase = args.filingStatus === "married" ? 250000 : 200000;
  const additionalThreshold = Math.round(additionalThresholdBase * factors.bracketFactor);
  const additionalMedicare = Math.max(args.annualIncome - additionalThreshold, 0) * 0.009;

  return socialSecurityTax + medicareTax + additionalMedicare;
}

export function calculateStateTaxEstimate(args: {
  annualIncome: number;
  deductions: number;
  filingStatus: FilingStatus;
  stateCode: string;
  taxYear?: TaxYear;
}) {
  const taxYear = args.taxYear ?? "2026";
  const federal = calculateFederalTax({ ...args, taxYear });
  const state = calculateStateTax({ ...args, taxYear });
  const totalTax = federal.tax + state.tax;
  const effectiveRate = args.annualIncome > 0 ? (totalTax / args.annualIncome) * 100 : 0;

  return {
    federalTaxableIncome: federal.taxableIncome,
    stateTaxableIncome: state.taxableIncome,
    federalTax: federal.tax,
    stateTax: state.tax,
    stateRate: state.topRate,
    stateModel: state.model,
    stateNote: state.note,
    stateDeductionUsed: state.stateDeductionUsed,
    totalTax,
    effectiveRate,
    standardDeduction: federal.standardDeduction,
    taxYear
  };
}

export function calculateTakeHomeEstimate(args: {
  annualIncome: number;
  preTaxDeductions: number;
  filingStatus: FilingStatus;
  stateCode: string;
  taxYear?: TaxYear;
}) {
  const taxYear = args.taxYear ?? "2026";
  const adjustedIncome = Math.max(args.annualIncome - args.preTaxDeductions, 0);
  const stateTaxEstimate = calculateStateTaxEstimate({
    annualIncome: adjustedIncome,
    deductions: 0,
    filingStatus: args.filingStatus,
    stateCode: args.stateCode,
    taxYear
  });
  const ficaTax = calculateFica({
    annualIncome: adjustedIncome,
    filingStatus: args.filingStatus,
    taxYear
  });

  const annualNet = Math.max(
    adjustedIncome - stateTaxEstimate.federalTax - stateTaxEstimate.stateTax - ficaTax,
    0
  );

  return {
    annualGross: args.annualIncome,
    preTaxDeductions: args.preTaxDeductions,
    adjustedIncome,
    federalTax: stateTaxEstimate.federalTax,
    stateTax: stateTaxEstimate.stateTax,
    ficaTax,
    annualNet,
    monthlyNet: annualNet / 12,
    biweeklyNet: annualNet / 26,
    effectiveRate:
      args.annualIncome > 0
        ? ((stateTaxEstimate.federalTax + stateTaxEstimate.stateTax + ficaTax) /
            args.annualIncome) *
          100
        : 0,
    stateRate: stateTaxEstimate.stateRate,
    stateModel: stateTaxEstimate.stateModel,
    stateNote: stateTaxEstimate.stateNote,
    stateDeductionUsed: stateTaxEstimate.stateDeductionUsed,
    taxYear
  };
}
