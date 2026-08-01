type FormulaRow = {
  metric: string;
  formula: string;
  notes?: string;
};

type FormulaTableProps = {
  title: string;
  rows: readonly FormulaRow[];
};

export function FormulaTable({ title, rows }: FormulaTableProps) {
  return (
    <section className="card overflow-x-auto">
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      <table className="mt-4 min-w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-slate-800 text-slate-300">
            <th className="py-2 pr-4 font-semibold">Metric</th>
            <th className="py-2 pr-4 font-semibold">Formula</th>
            <th className="py-2 font-semibold">Notes</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.metric} className="border-b border-slate-900 align-top">
              <td className="py-3 pr-4 text-slate-200">{row.metric}</td>
              <td className="py-3 pr-4 font-mono text-xs text-brand-300">{row.formula}</td>
              <td className="py-3 text-slate-300">{row.notes ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
