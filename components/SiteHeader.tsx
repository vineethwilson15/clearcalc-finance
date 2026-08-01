"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/calculators", label: "Calc" },
  { href: "/us", label: "States" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-xl">
      <div className="h-px bg-gradient-to-r from-transparent via-brand-400/60 to-transparent" />
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <Link href="/" className="group inline-flex items-center gap-3 self-start">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-400/25 via-brand-500/15 to-emerald-400/15 text-brand-100 shadow-lg shadow-brand-950/30 ring-1 ring-brand-400/30 transition group-hover:scale-[1.02]">
            <span className="text-sm font-semibold tracking-wide">CF</span>
          </div>
          <div>
            <p className="text-sm font-semibold tracking-wide text-white transition group-hover:text-brand-200">
              ClearCalc Finance
            </p>
            <p className="text-xs text-slate-400">Fast finance calculators</p>
          </div>
        </Link>

        <div className="flex flex-1 flex-col gap-3 lg:flex-row lg:items-center lg:justify-end">
          <nav aria-label="Primary" className="flex flex-wrap gap-2">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(`${item.href}/`));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`rounded-full border px-3.5 py-2 text-sm font-medium transition ${
                    isActive
                      ? "border-brand-400/70 bg-brand-500/15 text-brand-100 shadow-sm shadow-brand-950/20"
                      : "border-slate-800/80 bg-slate-900/80 text-slate-300 hover:border-brand-500/60 hover:bg-slate-900 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
