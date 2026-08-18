This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Analytics (GA4)

`.env.example` を `.env.local` にコピーして `NEXT_PUBLIC_GA_ID` を実際の測定ID (`G-XXXXXXXXXX`) に差し替える。GA4は `NODE_ENV === 'production'` かつ `NEXT_PUBLIC_GA_ID` が設定されているときのみ発火する（開発時は発火しない）。

## 印刷物用の短縮URL

配布物ごとにUTM付きリダイレクトを設定している（`next.config.ts` の `shortLinks` 配列）。新しい配布物を増やすときは、その配列に1行追加するだけでよい。

| slug | QR貼付媒体 | 遷移先 |
|---|---|---|
| `/a2` | A2 ポスター（大型・壁掛け） | `?utm_source=print&utm_medium=qr&utm_campaign=iki2026&utm_content=a2` |
| `/a4` | A4 ハンドビル（手渡しチラシ） | `?utm_source=print&utm_medium=qr&utm_campaign=iki2026&utm_content=a4` |
| `/a6` | A6 フライヤー（ポストカードサイズ） | `?utm_source=print&utm_medium=qr&utm_campaign=iki2026&utm_content=a6` |

GA4 では **集客 → トラフィック獲得** で `source=print` としてまとめて確認でき、**セカンダリディメンション: `セッションの手動コンテンツ (session manual content)`** を追加するとサイズ別の内訳が見える。

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
