import type { NextConfig } from "next";

// 印刷物用の短縮URL。新しい配布物を増やすときは、この配列に1行追加するだけでよい。
// slug=URL末尾、utm_content=サイズ/バリアント名。
// 例: { slug: "sns", utm_source: "twitter", utm_medium: "post", utm_content: "twitter-pinned" }
const shortLinks = [
  { slug: "a2", utm_source: "print", utm_medium: "qr", utm_campaign: "iki2026", utm_content: "a2" },
  { slug: "a4", utm_source: "print", utm_medium: "qr", utm_campaign: "iki2026", utm_content: "a4" },
  { slug: "a6", utm_source: "print", utm_medium: "qr", utm_campaign: "iki2026", utm_content: "a6" },
];

const nextConfig: NextConfig = {
  async redirects() {
    return shortLinks.map(({ slug, utm_source, utm_medium, utm_campaign, utm_content }) => {
      const params = new URLSearchParams({
        utm_source,
        utm_medium,
        utm_campaign,
        ...(utm_content ? { utm_content } : {}),
      });
      return {
        source: `/${slug}`,
        destination: `/?${params.toString()}`,
        permanent: true,
      };
    });
  },
};

export default nextConfig;
