import { createClient, MicroCMSListResponse } from "microcms-js-sdk";

export type Category = {
  id: string;
  name: string;
};

export type Blog = {
  id: string;
  title: string;
  content: string;
  eyecatch?: { url: string; width: number; height: number };
  category?: Category;
  publishedAt: string;
  updatedAt: string;
};

const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
const apiKey = process.env.MICROCMS_API_KEY;

const client =
  serviceDomain && apiKey ? createClient({ serviceDomain, apiKey }) : null;

export async function getBlogs(): Promise<MicroCMSListResponse<Blog>> {
  if (!client) return { contents: [], totalCount: 0, offset: 0, limit: 0 };
  return client.getList<Blog>({
    endpoint: "blogs",
    queries: { orders: "-publishedAt", limit: 100 },
  });
}

export async function getBlog(contentId: string): Promise<Blog | null> {
  if (!client) return null;
  try {
    return await client.getListDetail<Blog>({
      endpoint: "blogs",
      contentId,
    });
  } catch {
    return null;
  }
}
