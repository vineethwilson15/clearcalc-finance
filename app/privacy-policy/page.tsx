import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Understand how ClearCalc Finance handles visitor information and third-party advertising."
};

export default function PrivacyPolicyPage() {
  return (
    <div className="space-y-6">
      <header className="card">
        <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>
        <p className="mt-3 text-slate-300">
          ClearCalc Finance is designed to work without collecting personal information directly
          from visitors. If advertising is enabled, Google AdSense may use cookies or similar
          technologies to serve and measure ads.
        </p>
      </header>

      <section className="card space-y-3">
        <h2 className="text-xl font-semibold text-white">Information handling</h2>
        <ul className="list-disc space-y-2 pl-5 text-slate-300">
          <li>The site does not currently include account sign-in or user submission forms.</li>
          <li>Calculator inputs are processed in your browser to produce estimates.</li>
          <li>Third-party advertising and browser analytics may use their own cookies or identifiers.</li>
        </ul>
      </section>

      <section className="card space-y-3">
        <h2 className="text-xl font-semibold text-white">Third-party services</h2>
        <p className="text-slate-300">
          Google services such as AdSense and Search Console may be used to operate and improve the
          site. Their data handling is governed by Google’s own policies.
        </p>
      </section>
    </div>
  );
}