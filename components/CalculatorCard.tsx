import Link from "next/link";

type CalculatorCardProps = {
  title: string;
  description: string;
  href: string;
};

export function CalculatorCard({ title, description, href }: CalculatorCardProps) {
  return (
    <Link
      href={href}
      className="card group flex h-full flex-col justify-between border-slate-800/90 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 transition duration-200 hover:-translate-y-1 hover:border-brand-500/60 hover:shadow-2xl hover:shadow-brand-950/25"
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-300/80">
          Calculator
        </p>
        <h2 className="mt-2 text-xl font-semibold tracking-tight text-white transition group-hover:text-brand-100">
          {title}
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-300">{description}</p>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-slate-800 pt-4 text-sm font-semibold text-brand-300">
        <span>Open calculator</span>
        <span className="text-lg transition group-hover:translate-x-0.5">→</span>
      </div>
    </Link>
  );
}
