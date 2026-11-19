import { NextResponse, type NextRequest } from "next/server";

/**
 * One codebase, two sites:
 *   aresizolasyon.com  → Turkish routes (app/(tr))
 *   aresrefractory.com → English routes (app/(en)/en), served without the /en prefix
 * Hosts listed in GLOBAL_HOSTS get every path rewritten to /en/*.
 */
const GLOBAL_HOSTS = (process.env.GLOBAL_HOSTS ?? "").split(",").map((h) => h.trim().toLowerCase()).filter(Boolean);

export function proxy(req: NextRequest) {
  const host = (req.headers.get("host") ?? "").split(":")[0]!.toLowerCase();
  const { pathname } = req.nextUrl;
  const isGlobal = GLOBAL_HOSTS.includes(host);

  if (isGlobal) {
    if (pathname === "/en" || pathname.startsWith("/en/")) {
      const url = req.nextUrl.clone();
      url.pathname = pathname.replace(/^\/en/, "") || "/";
      return NextResponse.redirect(url, 308);
    }
    const url = req.nextUrl.clone();
    url.pathname = `/en${pathname}`;
    return NextResponse.rewrite(url);
  }

  // Turkish host: the English tree is not served here once domains are split.
  if (GLOBAL_HOSTS.length && (pathname === "/en" || pathname.startsWith("/en/"))) {
    return new NextResponse(null, { status: 404 });
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/|api/|brand/|icon|apple-icon|favicon|.*\\.(?:png|jpe?g|svg|webp|avif|ico|css|js|map|woff2?)$).*)"],
};
