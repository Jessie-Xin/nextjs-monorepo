import type { Metadata } from "next";
import { Suspense } from "react";

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
            <Suspense
              fallback={
                <header className="sticky top-0 z-50 h-16 border-b border-white/10 bg-neutral-950/92" />
              }
            >
              <SiteHeader />
            </Suspense>
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </Providers>
      </body>
    </html>
  );
}
