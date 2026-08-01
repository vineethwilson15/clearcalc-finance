import type { Metadata } from "next";
import Link from "next/link";

const repoUrl = "https://github.com/vineethwilson15/clearcalc-finance";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Find the best way to send feedback or report an issue with ClearCalc Finance."
};

export default function ContactPage() {
  return (
    <div className="space-y-6">
      <header className="card">
        <h1 className="text-3xl font-bold text-white">Contact</h1>
        <p className="mt-3 text-slate-300">
          The easiest way to reach the site owner is through the GitHub repository issue tracker.
          That keeps feedback, bug reports, and feature requests in one place.
        </p>
      </header>

      <section className="card space-y-3">
        <h2 className="text-xl font-semibold text-white">Feedback channels</h2>
        <div className="flex flex-wrap gap-3 text-sm font-medium">
          <Link
            href={`${repoUrl}/issues/new`}
            className="rounded-full bg-brand-500 px-4 py-2 text-slate-950 transition hover:brightness-110"
          >
            Open a GitHub issue
          </Link>
          <Link
            href={repoUrl}
            className="rounded-full border border-slate-700 px-4 py-2 text-slate-200 transition hover:border-brand-500 hover:text-white"
          >
            View the repository
          </Link>
        </div>
      </section>
    </div>
  );
}