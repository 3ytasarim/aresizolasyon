import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  // Every URL in the client's SEO plan ends with "/"
  trailingSlash: true,
  poweredByHeader: false,
  reactStrictMode: true,
  images: { formats: ["image/avif", "image/webp"] },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return [
      // The category doc proposes /seramik-yunu/ while product docs link to /seramik-elyaf-urunleri/.
      // Canonical = /seramik-yunu/ (primary keyword); the alternative form is redirected permanently.
      { source: "/seramik-elyaf-urunleri/", destination: "/seramik-yunu/", permanent: true },
      { source: "/urunler/seramik-elyaf-urunleri/", destination: "/seramik-yunu/", permanent: true },
      { source: "/blog/:path*", destination: "/teknik-rehber/", permanent: true },
    ];
  },
};

export default nextConfig;
