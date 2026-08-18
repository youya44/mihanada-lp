import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const gaId = process.env.NEXT_PUBLIC_GA_ID;
const enableGa = process.env.NODE_ENV === "production" && !!gaId;

export const metadata: Metadata = {
  title: "MIHANADA — 体験を、カタチに。",
  description:
    "釣り人のための、ものづくり。壱岐の海で出会った一匹を、革に、魚拓に、作品に。",
  openGraph: {
    title: "MIHANADA — 体験を、カタチに。",
    description:
      "釣り人のための、ものづくり。壱岐の海で出会った一匹を、革に、魚拓に、作品に。",
    images: ["/og.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" data-hero="fullbleed" data-cf="soon" data-heading="shippori">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@400;500;600&family=Zen+Old+Mincho:wght@400;500;600&family=Zen+Kaku+Gothic+New:wght@300;400;500&family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
      {enableGa && <GoogleAnalytics gaId={gaId!} />}
    </html>
  );
}
