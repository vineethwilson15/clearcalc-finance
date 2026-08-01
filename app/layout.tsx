import type { Metadata } from "next";
import Script from "next/script";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const adSenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID?.trim();
const shouldLoadAdSense = Boolean(adSenseClientId?.startsWith("ca-pub-"));

export const metadata: Metadata = {
  metadataBase: new URL("https://clearcalc-finance.netlify.app"),
  icons: {
    icon: "/icon.svg"
  },
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
      <head>
        <meta
          name="google-site-verification"
          content="FE9qQUWzHeN9N6RWPtyJeY5xzup7rIdWnPsVoJyXEWA"
        />
      </head>
      <body className="flex flex-col">
        {shouldLoadAdSense ? (
          <Script
            async
            strategy="afterInteractive"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adSenseClientId}`}
            crossOrigin="anonymous"
          />
        ) : null}
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
