import Link from "next/link";
import { Github, Mail } from "lucide-react";

import { getPublicPortfolio, siteNav } from "@/lib/portfolio-data";
import { Button } from "@workspace/ui/components/button";

export async function SiteHeader() {
  const payload = await getPublicPortfolio();
  const profile = payload.state === "ready" ? payload.portfolio.profile : null;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/92 text-white backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-semibold"
        >
          <span className="flex size-8 items-center justify-center rounded-md bg-white text-neutral-950">
            CV
          </span>
          <span>{profile?.name ?? "履歷作品集"}</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {siteNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm text-white/68 transition hover:bg-white/8 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {profile?.githubUrl && (
            <Button
              asChild
              size="icon"
              variant="ghost"
              className="hidden size-9 text-white/70 hover:bg-white/8 hover:text-white sm:inline-flex"
            >
              <a href={profile.githubUrl} aria-label="GitHub">
                <Github className="size-4" />
              </a>
            </Button>
          )}
          {profile?.email && (
            <Button asChild size="sm" className="h-9 rounded-md">
              <a href={`mailto:${profile.email}`}>
                <Mail className="size-4" />
                聯絡
              </a>
            </Button>
          )}
        </div>
      </div>
      <nav className="border-t border-white/10 px-5 py-2 md:hidden">
        <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto">
          {siteNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="shrink-0 rounded-md px-3 py-2 text-sm text-white/68 transition hover:bg-white/8 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
