import type { MetadataRoute } from "next";
import { usSeoTemplates } from "@/lib/seo-pages";
import { usStates } from "@/lib/us-states";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/calculators/mortgage",
    "/calculators/loan",
    "/calculators/salary",
    "/calculators/tax",
    "/us"
  ];

  const templateRoutes = usSeoTemplates.map(
    (page) => `/us/${page.category}/${page.slug}`
  );
  const stateTaxRoutes = usStates.map((state) => `/us/state-tax/${state.slug}`);
  const stateTakeHomeRoutes = usStates.map(
    (state) => `/us/take-home-pay/${state.slug}`
  );

  const routes = [
    ...staticRoutes,
    ...templateRoutes,
    ...stateTaxRoutes,
    ...stateTakeHomeRoutes
  ];

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8
  }));
}
