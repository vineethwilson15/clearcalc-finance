import {
  getFederalTaxYearCitations,
  getFicaCitations,
  getStateTaxAuthorityCitation
} from "@/lib/tax-sources";

type SourceReferencesProps = {
  stateName: string;
  stateCode: string;
  lastUpdated: string;
};

export function SourceReferences({ stateName, stateCode, lastUpdated }: SourceReferencesProps) {
  const stateAuthority = getStateTaxAuthorityCitation(stateCode, stateName);
  const federalSources = getFederalTaxYearCitations();
  const ficaSources = getFicaCitations();

  return (
    <section className="card">
      <h2 className="text-xl font-semibold text-white">Sources and Methodology</h2>
      <p className="mt-2 text-sm text-slate-300">
        Estimates for {stateName} use federal bracket references, a state-specific authority
        reference, and FICA guidance.
      </p>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-300">
        {federalSources.map((source) => (
          <li key={source.href}>
            <a
              href={source.href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-brand-500/50 underline-offset-2 hover:text-brand-200"
            >
              {source.label}
            </a>
          </li>
        ))}
        <li>
          <a
            href={stateAuthority.href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-brand-500/50 underline-offset-2 hover:text-brand-200"
          >
            {stateAuthority.label}
          </a>
        </li>
        {ficaSources.map((source) => (
          <li key={source.href}>
            <a
              href={source.href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-brand-500/50 underline-offset-2 hover:text-brand-200"
            >
              {source.label}
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-slate-400">Last updated: {lastUpdated}</p>
      <p className="mt-1 text-xs text-slate-400">
        Educational estimate only. Not tax filing or legal advice.
      </p>
    </section>
  );
}
