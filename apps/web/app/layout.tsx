import type { Metadata } from "next";

import "@workspace/ui/globals.css";
import "./globals.css";
import { Providers } from "@/components/providers";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";

export const metadata: Metadata = {
  title: {
    default: "履歷作品集",
    template: "%s | 履歷作品集",
  },
  description: "由 CMS 後台資料驅動的個人履歷與作品集。",
};

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <Providers>
          <div className="flex min-h-svh flex-col bg-[#f6f2ea] text-neutral-950">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </Providers>
      </body>
    </html>
  );
}
