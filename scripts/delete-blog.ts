#!/usr/bin/env node
/**
 * Usage:
 *   npm run delete -- <contentId> [<contentId> ...]
 */
const SERVICE_DOMAIN = process.env.MICROCMS_SERVICE_DOMAIN;
const API_KEY = process.env.MICROCMS_API_KEY;

if (!SERVICE_DOMAIN || !API_KEY) {
  console.error("✗ .env.local に MICROCMS_SERVICE_DOMAIN と MICROCMS_API_KEY を設定してください");
  process.exit(1);
}

const ids = process.argv.slice(2);
if (ids.length === 0) {
  console.error("✗ 削除する contentId を指定してください: npm run delete -- <contentId>");
  process.exit(1);
}

async function main() {
  let failed = 0;
  for (const id of ids) {
    const url = `https://${SERVICE_DOMAIN}.microcms.io/api/v1/blogs/${id}`;
    const res = await fetch(url, {
      method: "DELETE",
      headers: { "X-MICROCMS-API-KEY": API_KEY! },
    });
    if (res.ok || res.status === 202 || res.status === 204) {
      console.log(`✓ 削除成功: ${id}`);
    } else {
      const text = await res.text();
      console.error(`✗ 削除失敗 ${res.status}: ${id}`);
      console.error(`  ${text}`);
      failed++;
    }
  }
  if (failed > 0) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
