"use client";

import { useState, useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Link2, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@workspace/ui/components/button";

export function TokenGate() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [token, setToken] = useState("");
  const [isPending, startTransition] = useTransition();

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = token.trim();
    if (!trimmed) return;

    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("token", trimmed);
      router.push(`${pathname}?${params.toString()}`);
    });
  }

  return (
    <section className="px-5 py-16 sm:px-8 lg:py-24">
      <div className="mx-auto max-w-md rounded-lg border border-neutral-200 bg-white p-8 shadow-sm">
        <div className="flex size-12 items-center justify-center rounded-md bg-neutral-950 text-white">
          <Link2 className="size-5" />
        </div>
        <p className="mt-6 text-sm font-semibold uppercase tracking-normal text-emerald-700">
          限時分享
        </p>
        <h1 className="mt-3 text-2xl font-semibold tracking-normal text-neutral-950">
          需要訪問連結
        </h1>
        <p className="mt-4 text-base leading-7 text-neutral-600">
          此頁面目前未公開，請輸入後台生成的分享連結 Token 以繼續瀏覽。
        </p>
        <form onSubmit={submit} className="mt-7 space-y-3">
          <input
            placeholder="輸入分享 Token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            disabled={isPending}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          />
          <Button
            type="submit"
            disabled={isPending || !token.trim()}
            className="w-full rounded-md"
          >
            {isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <ArrowRight className="size-4" />
            )}
            進入
          </Button>
        </form>
      </div>
    </section>
  );
}
