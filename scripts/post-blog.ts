#!/usr/bin/env node
/**
 * Usage:
 *   npm run post -- drafts/example.md
 *   npm run post -- drafts/example.md --publish
 *   npm run post -- drafts/example.md --update <contentId>
 *
 * draft file format (frontmatter):
 *   ---
 *   title: 記事タイトル
 *   category: <categoryId>   # optional, microCMSのカテゴリID
 *   ---
 *   ここから本文（Markdown）
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const SERVICE_DOMAIN = process.env.MICROCMS_SERVICE_DOMAIN;
const API_KEY = process.env.MICROCMS_API_KEY;

if (!SERVICE_DOMAIN || !API_KEY) {
  console.error("✗ .env.local に MICROCMS_SERVICE_DOMAIN と MICROCMS_API_KEY を設定してください");
  process.exit(1);
}

const args = process.argv.slice(2);
const filePath = args[0];
const updateIndex = args.indexOf("--update");
const contentId = updateIndex >= 0 ? args[updateIndex + 1] : null;
const publish = args.includes("--publish");

if (!filePath) {
  console.error("✗ ファイルパスを指定してください: npm run post -- drafts/example.md");
  process.exit(1);
}

const abs = path.resolve(filePath);
if (!fs.existsSync(abs)) {
  console.error(`✗ ファイルが見つかりません: ${abs}`);
  process.exit(1);
}

const raw = fs.readFileSync(abs, "utf8");
const { data, content: md } = matter(raw);

if (!data.title) {
  console.error("✗ frontmatter に title が必要です");
  process.exit(1);
}

async function main() {
  const html = (await marked.parse(md)) as string;

  const body: Record<string, unknown> = {
    title: data.title,
    content: html,
  };
  if (data.category) body.category = data.category;

  const base = `https://${SERVICE_DOMAIN}.microcms.io/api/v1/blogs`;
  const url = contentId ? `${base}/${contentId}` : base;
  const method = contentId ? "PATCH" : "POST";
  const finalUrl = !contentId && publish ? `${base}?status[0]=PUBLISH` : url;

  const res = await fetch(finalUrl, {
    method,
    headers: {
      "Content-Type": "application/json",
      "X-MICROCMS-API-KEY": API_KEY!,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error(`✗ ${method} ${res.status} ${res.statusText}`);
    console.error(text);
    process.exit(1);
  }

  const json = (await res.json()) as { id?: string };
  const id = json.id ?? contentId;
  console.log(`✓ ${method} 成功 (id: ${id})`);
  console.log(`  microCMS: https://${SERVICE_DOMAIN}.microcms.io/apis/blogs/${id}`);
  console.log(`  LP: http://localhost:3456/blog/${id}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
