import Link from "next/link";

const footerLinks = [
  { href: "/calculators", label: "Calculators" },
  { href: "/us", label: "States" },
  { href: "/about", label: "About" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/contact", label: "Contact" }
];

export function SiteFooter() {
  return (
    <footer className="mt-10 border-t border-slate-800/80 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold text-white">ClearCalc Finance</p>
          <p className="mt-1 text-sm text-slate-400">
            Finance calculators for planning, comparison, and quick estimates.
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-3 text-sm text-slate-300">
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}