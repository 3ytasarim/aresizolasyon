import { robotsTxt } from "@/lib/feeds";

export const dynamic = "force-static";

export function GET() {
  return new Response(robotsTxt("tr"), { headers: { "content-type": "text/plain; charset=utf-8" } });
}
