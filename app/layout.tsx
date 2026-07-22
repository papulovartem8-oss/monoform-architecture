import type { Metadata } from "next";
import { headers } from "next/headers";
import { Cormorant_Garamond, Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-editorial",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "monoform.example";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;

  return {
    metadataBase: new URL(origin),
    title: "MONOFORM — Architecture & Interiors",
    description: "Архитектура и интерьеры полного цикла в Москве и Санкт-Петербурге.",
    keywords: ["архитектурное бюро", "дизайн интерьера", "частные дома", "Москва", "Санкт-Петербург"],
    icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
    openGraph: {
      title: "MONOFORM — Architecture shaped around life",
      description: "Проектируем пространства, в которых архитектура, интерьер и образ жизни существуют как единое целое.",
      type: "website", locale: "ru_RU", siteName: "MONOFORM", url: origin,
      images: [{ url: `${origin}/og.png`, width: 1200, height: 627, alt: "MONOFORM — Architecture & Interiors" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "MONOFORM — Architecture & Interiors",
      description: "Архитектура, интерьер и предметная среда как единая система.",
      images: [`${origin}/og.png`],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${geistSans.variable} ${cormorant.variable}`}>
        <a className="skip-link" href="#content">Перейти к содержанию</a>
        {children}
      </body>
    </html>
  );
}
