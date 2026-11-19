/**
 * Publishing registry — the single switch for "controlled, staged publishing" (client brief §4, §9).
 *
 * Every page has an id:
 *   tr:category:{key}   tr:product:{key}   tr:guide:{code}
 *   en:category:{key}   en:product:{key}
 * Add an id here once its technical review, originality check and publication approval are done.
 *
 * Effects in the "production" stage:
 *   - unpublished guides are not routed (404) and are hidden from lists, search and sitemap
 *   - unpublished category/product pages stay reachable (the catalogue must work) but get
 *     `noindex` and are left out of the sitemap
 * In the "preview" stage (client review, staging) everything is visible with a draft banner and
 * the whole site is `noindex`.
 */
export const PUBLISHED = new Set<string>([
  // "tr:product:seramik-elyaf-battaniye",
  // "tr:guide:R-01-01",
]);

export type SiteStage = "production" | "preview";
export const siteStage = (): SiteStage =>
  process.env.NEXT_PUBLIC_SITE_STAGE === "production" ? "production" : "preview";
export const isDraftVisible = () => siteStage() === "preview";
