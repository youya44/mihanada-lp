"use server";

export type ContactInput = {
  name: string;
  company?: string;
  email: string;
  category: string;
  message?: string;
};

export type ContactResult =
  | { ok: true; id: string }
  | { ok: false; error: string };

export async function submitContact(input: ContactInput): Promise<ContactResult> {
  // Server-side validation
  if (!input.name?.trim()) return { ok: false, error: "お名前を入力してください" };
  if (!input.email?.trim()) return { ok: false, error: "メールアドレスを入力してください" };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email))
    return { ok: false, error: "メールアドレスの形式が正しくありません" };
  if (!input.category?.trim())
    return { ok: false, error: "お問い合わせ種別を選択してください" };

  const domain = process.env.MICROCMS_SERVICE_DOMAIN;
  const key = process.env.MICROCMS_API_KEY;
  if (!domain || !key) return { ok: false, error: "サーバー設定に問題があります" };

  const body = {
    name: input.name.trim(),
    company: input.company?.trim() ?? "",
    email: input.email.trim(),
    category: input.category,
    message: input.message?.trim() ?? "",
  };

  try {
    const res = await fetch(
      `https://${domain}.microcms.io/api/v1/contacts?status[0]=PUBLISH`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-MICROCMS-API-KEY": key,
        },
        body: JSON.stringify(body),
        cache: "no-store",
      }
    );

    if (!res.ok) {
      const text = await res.text();
      console.error("contact POST failed", res.status, text);
      return { ok: false, error: "送信に失敗しました。時間をおいて再度お試しください" };
    }

    const json = (await res.json()) as { id?: string };
    return { ok: true, id: json.id ?? "" };
  } catch (e) {
    console.error("contact POST exception", e);
    return { ok: false, error: "送信に失敗しました。時間をおいて再度お試しください" };
  }
}
