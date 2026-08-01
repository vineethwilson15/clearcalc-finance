import Link from "next/link";
import type { UsState } from "@/lib/us-states";
import { getAdjacentStates, getFeaturedStates } from "@/lib/us-states";

type RelatedStateLinksProps = {
  currentState: UsState;
  mode: "state-tax" | "take-home-pay";
};

export function RelatedStateLinks({ currentState, mode }: RelatedStateLinksProps) {
  const adjacent = getAdjacentStates(currentState.slug);
  const featured = getFeaturedStates(currentState.slug, 4);
  const counterpartMode = mode === "state-tax" ? "take-home-pay" : "state-tax";

  return (
    <section className="card">
      <h2 className="text-xl font-semibold text-white">Related state pages</h2>
      <p className="mt-2 text-sm text-slate-300">
        Explore nearby and high-demand state pages to compare tax and take-home scenarios.
      </p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <p className="text-sm font-semibold text-slate-200">Same state counterpart</p>
          <Link
            className="mt-2 inline-block text-sm text-brand-300 hover:underline"
            href={`/us/${counterpartMode}/${currentState.slug}`}
          >
            {currentState.name} {counterpartMode === "state-tax" ? "state tax" : "take-home pay"} calculator
          </Link>
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-200">Adjacent states</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {adjacent.map((state) => (
              <Link
                key={state.slug}
                href={`/us/${mode}/${state.slug}`}
                className="rounded-md border border-slate-700 px-2 py-1 text-xs text-slate-300 transition hover:border-brand-500 hover:text-white"
              >
                {state.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-sm font-semibold text-slate-200">Featured states</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {featured.map((state) => (
            <Link
              key={state.slug}
              href={`/us/${mode}/${state.slug}`}
              className="rounded-md border border-slate-700 px-2 py-1 text-xs text-slate-300 transition hover:border-brand-500 hover:text-white"
            >
              {state.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
