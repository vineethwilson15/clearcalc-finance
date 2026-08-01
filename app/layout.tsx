import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const adSenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID?.trim();
const shouldLoadAdSense = Boolean(adSenseClientId?.startsWith("ca-pub-"));

export const metadata: Metadata = {
  metadataBase: new URL("https://clearcalc-finance.netlify.app"),
  title: {
    default: "ClearCalc Finance",
    template: "%s | ClearCalc Finance"
  },
  description:
    "Finance calculators for mortgage, loan, salary, and tax estimates built for fast planning.",
  openGraph: {
    title: "ClearCalc Finance",
    description:
      "Fast finance calculators for mortgage, paycheck, and tax planning across US-focused templates.",
    type: "website"
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {shouldLoadAdSense ? (
          <Script
            async
            strategy="afterInteractive"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adSenseClientId}`}
            crossOrigin="anonymous"
          />
        ) : null}
        <main>{children}</main>
      </body>
    </html>
  );
}
