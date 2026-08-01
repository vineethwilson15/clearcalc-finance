export const adSlotKeys = [
  "homepageTop",
  "homepageFooter",
  "templateFooter",
  "mortgageResultMid",
  "loanResultMid",
  "salaryResultMid",
  "taxResultMid",
  "stateTaxResult",
  "stateTakeHomeResult"
] as const;

export type AdSlotKey = (typeof adSlotKeys)[number];

const adSlotEnvVarMap: Record<AdSlotKey, string | undefined> = {
  homepageTop: process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOMEPAGE_TOP,
  homepageFooter: process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOMEPAGE_FOOTER,
  templateFooter: process.env.NEXT_PUBLIC_ADSENSE_SLOT_TEMPLATE_FOOTER,
  mortgageResultMid: process.env.NEXT_PUBLIC_ADSENSE_SLOT_MORTGAGE_RESULT_MID,
  loanResultMid: process.env.NEXT_PUBLIC_ADSENSE_SLOT_LOAN_RESULT_MID,
  salaryResultMid: process.env.NEXT_PUBLIC_ADSENSE_SLOT_SALARY_RESULT_MID,
  taxResultMid: process.env.NEXT_PUBLIC_ADSENSE_SLOT_TAX_RESULT_MID,
  stateTaxResult: process.env.NEXT_PUBLIC_ADSENSE_SLOT_STATE_TAX_RESULT,
  stateTakeHomeResult: process.env.NEXT_PUBLIC_ADSENSE_SLOT_STATE_TAKE_HOME_RESULT
};

export function getAdClientId(): string | null {
  const value = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID?.trim();
  return value && value.startsWith("ca-pub-") ? value : null;
}

export function getAdSlotId(slotKey: AdSlotKey): string | null {
  const value = adSlotEnvVarMap[slotKey]?.trim();
  return value ? value : null;
}
