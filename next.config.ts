import type { NextConfig } from "next";

// 印刷物用の短縮URL。新しい配布物を増やすときは、この配列に1行追加するだけでよい。
// 例: { slug: "sns", utm_source: "twitter", utm_medium: "post", utm_campaign: "iki2026" }
const shortLinks = [
  { slug: "p", utm_source: "poster", utm_medium: "qr", utm_campaign: "iki2026" },
  { slug: "f", utm_source: "flyer", utm_medium: "qr", utm_campaign: "iki2026" },
];

const nextConfig: NextConfig = {
  async redirects() {
    return shortLinks.map(({ slug, utm_source, utm_medium, utm_campaign }) => ({
      source: `/${slug}`,
      destination: `/?utm_source=${utm_source}&utm_medium=${utm_medium}&utm_campaign=${utm_campaign}`,
      permanent: true,
    }));
  },
};

export default nextConfig;
