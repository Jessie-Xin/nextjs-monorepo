import Link from "next/link";
import { Database, RefreshCw } from "lucide-react";

import { Button } from "@workspace/ui/components/button";

export function CmsUnavailable() {
  return (
    <section className="px-5 py-16 sm:px-8 lg:py-24">
      <div className="mx-auto max-w-3xl rounded-lg border border-neutral-200 bg-white p-8 shadow-sm">
        <div className="flex size-12 items-center justify-center rounded-md bg-neutral-950 text-white">
          <Database className="size-5" />
        </div>
        <p className="mt-6 text-sm font-semibold uppercase tracking-normal text-emerald-700">
          CMS database
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-normal text-neutral-950 sm:text-4xl">
          CMS 暫時無法連線
        </h1>
        <p className="mt-4 text-base leading-7 text-neutral-600">
          目前前台無法連到 PostgreSQL。啟動後台資料庫後重新整理，頁面會繼續從
          Prisma 讀取 CMS 內容。
        </p>
        <div className="mt-7 rounded-lg border border-neutral-200 bg-[#fbfaf7] p-4 text-sm text-neutral-700">
          <p className="font-medium text-neutral-950">本地資料庫</p>
          <p className="mt-2 font-mono text-xs text-neutral-600">
            localhost:5433 / cv_admin
          </p>
        </div>
        <Button asChild className="mt-7 rounded-md">
          <Link href="/">
            <RefreshCw className="size-4" />
            重新整理
          </Link>
        </Button>
      </div>
    </section>
  );
}
