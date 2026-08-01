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
      className="card transition hover:-translate-y-0.5 hover:border-brand-500/70 hover:shadow-brand-900/30"
    >
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      <p className="mt-2 text-sm text-slate-300">{description}</p>
      <p className="mt-4 text-sm font-semibold text-brand-300">Open calculator</p>
    </Link>
  );
}
