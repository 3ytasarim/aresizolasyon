import { sitemapXml } from "@/lib/feeds";

export const dynamic = "force-static";

export function GET() {
  return new Response(sitemapXml("tr"), { headers: { "content-type": "application/xml; charset=utf-8" } });
}
