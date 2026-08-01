"use client";

import { useEffect, useRef } from "react";
import { getAdClientId, getAdSlotId, type AdSlotKey } from "@/lib/adsense";

type AdSlotProps = {
  location: string;
  slotKey: AdSlotKey;
};

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export function AdSlot({ location, slotKey }: AdSlotProps) {
  const adRef = useRef<HTMLModElement | null>(null);
  const adClientId = getAdClientId();
  const adSlotId = getAdSlotId(slotKey);
  const canRenderAds = Boolean(adClientId && adSlotId);

  useEffect(() => {
    if (!canRenderAds || !adRef.current || adRef.current.dataset.loaded === "true") {
      return;
    }

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      adRef.current.dataset.loaded = "true";
    } catch {
      // Keep UI stable if AdSense script is not available yet.
    }
  }, [canRenderAds]);

  if (!canRenderAds) {
    return (
      <div className="ad-slot" aria-label={`Advertisement placeholder at ${location}`}>
        Sponsored placement
      </div>
    );
  }

  return (
    <div className="ad-slot" aria-label={`Advertisement at ${location}`}>
      <ins
        ref={adRef}
        className="adsbygoogle block w-full"
        style={{ display: "block", minHeight: "90px" }}
        data-ad-client={adClientId ?? undefined}
        data-ad-slot={adSlotId ?? undefined}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
