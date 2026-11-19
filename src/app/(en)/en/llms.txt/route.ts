import { llmsTxt } from "@/lib/feeds";

export const dynamic = "force-static";

export function GET() {
  return new Response(llmsTxt("en"), { headers: { "content-type": "text/plain; charset=utf-8" } });
}
