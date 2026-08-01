import Link from "next/link";

type ConversionCtaProps = {
  title: string;
  description: string;
};

export function ConversionCta({ title, description }: ConversionCtaProps) {
  return (
    <section className="card border-brand-800/70 bg-gradient-to-br from-slate-900 via-slate-900 to-brand-950/40">
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      <p className="mt-2 text-sm text-slate-300">{description}</p>
      <div className="mt-4 flex flex-wrap gap-3">
        <Link
          href="/us"
          className="rounded-md border border-brand-500 bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-500"
        >
          Explore all US calculators
        </Link>
        <button
          type="button"
          className="rounded-md border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-brand-500"
        >
          Bookmark this page
        </button>
      </div>
    </section>
  );
}
