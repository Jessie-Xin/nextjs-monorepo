import type { ReactNode } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BriefcaseBusiness,
  Clock,
  ExternalLink,
  FolderOpen,
  Github,
  Mail,
  MapPin,
  Sparkles as SparklesIcon,
  Star,
} from "lucide-react";

import { BackgroundBeams } from "@/components/aceternity/background-beams";
import { HoverBorderGradientLink } from "@/components/aceternity/hover-border-gradient";
import { Sparkles } from "@/components/aceternity/sparkles";
import { CmsUnavailable } from "@/components/site/cms-unavailable";
import { TokenGate } from "@/components/site/token-gate";
import { getPublicPortfolio, siteNav } from "@/lib/portfolio-data";
import { Button } from "@workspace/ui/components/button";

export const dynamic = "force-dynamic";

const entryIcons = {
  "/projects": FolderOpen,
  "/skills": Star,
  "/experience": BriefcaseBusiness,
  "/timeline": Clock,
};

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}): Promise<Metadata> {
  const { token } = await searchParams;
  const payload = await getPublicPortfolio(token);
  if (payload.state !== "ready") return { title: "履歷作品集" };

  const { profile } = payload.portfolio;
  return {
    title: profile.name,
    description: profile.bio ?? profile.subtitle ?? profile.jobTitle,
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  const payload = await getPublicPortfolio(token);
  if (payload.state === "database-unavailable") return <CmsUnavailable />;
  if (payload.state === "token-required") return <TokenGate />;
  if (payload.state !== "ready") notFound();

  const { portfolio } = payload;
  const { profile } = portfolio;
  const activeProject = portfolio.projects.find(
    (project) => project.status === "ACTIVE"
  );
  const entries = siteNav.filter((item) => item.href !== "/");

  return (
    <>
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top,#123025_0%,#0d1110_42%,#050505_100%)] text-white">
        <BackgroundBeams />
        <Sparkles className="opacity-55" />
        <div className="relative z-10 mx-auto grid min-h-[calc(92svh-64px)] w-full max-w-7xl grid-cols-1 items-center gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(420px,1.05fr)] lg:py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-emerald-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
              <SparklesIcon className="size-4" />
              個人履歷資料
            </div>
            <h1 className="mt-8 text-5xl font-semibold leading-[1.02] tracking-normal sm:text-6xl lg:text-7xl">
              {profile.name}
              <span className="mt-3 block text-3xl text-emerald-200 sm:text-4xl lg:text-5xl">
                {profile.subtitle ?? profile.jobTitle}
              </span>
            </h1>
            {profile.bio && (
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/68 sm:text-lg">
                {profile.bio}
              </p>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="h-10 rounded-md">
                <a href={`mailto:${profile.email}`}>
                  <Mail className="size-4" />
                  聯絡我
                </a>
              </Button>
              {profile.githubUrl && (
                <HoverBorderGradientLink href={profile.githubUrl}>
                  <Github className="size-4" />
                  GitHub
                  <ExternalLink className="size-3.5" />
                </HoverBorderGradientLink>
              )}
            </div>

            <dl className="mt-10 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
              {portfolio.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg border border-white/10 bg-white/[0.06] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                >
                  <dt className="text-xs text-white/45">{stat.label}</dt>
                  <dd className="mt-2 text-xl font-semibold text-white">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative mx-auto w-full max-w-[620px] lg:mx-0">
            <div className="absolute -inset-3 rounded-lg border border-emerald-300/15 bg-white/[0.03]" />
            <div className="relative overflow-hidden rounded-lg border border-white/12 bg-neutral-950 shadow-[0_34px_100px_rgba(0,0,0,0.45)] [animation:cv-float_7s_ease-in-out_infinite]">
              <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_30%,rgba(255,255,255,0.16),transparent_70%)] opacity-40 [animation:cv-shimmer_6s_ease-in-out_infinite]" />
              <Image
                src="/portfolio-console.svg"
                alt="履歷資料視覺面板"
                width={900}
                height={640}
                priority
                unoptimized
                className="relative h-auto w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[0.9fr_1.1fr]">
            <article className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-normal text-emerald-700">
                Profile
              </p>
              <h2 className="mt-3 text-3xl font-semibold">基本資料</h2>
              <div className="mt-6 grid gap-4 text-sm text-neutral-600 sm:grid-cols-2">
                <Info label="職稱" value={profile.jobTitle} />
                <Info
                  label="城市"
                  value={profile.city}
                  icon={<MapPin className="size-4 text-emerald-700" />}
                />
                <Info label="Email" value={profile.email} />
                <Info label="GitHub" value={profile.github} />
              </div>
            </article>

            {activeProject && (
              <article className="relative overflow-hidden rounded-lg border border-neutral-200 bg-neutral-950 p-6 text-white shadow-sm">
                <div
                  className="absolute inset-x-0 top-0 h-1"
                  style={{ backgroundColor: activeProject.accentColor }}
                />
                <p className="text-sm font-semibold uppercase tracking-normal text-emerald-300">
                  Active project
                </p>
                <div className="mt-5 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                  <div>
                    <h2 className="text-3xl font-semibold">
                      {activeProject.name}
                    </h2>
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-white/62">
                      {activeProject.description}
                    </p>
                  </div>
                  <Button asChild variant="secondary" className="rounded-md">
                    <Link href="/projects">
                      查看專案
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {activeProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-white/10 bg-white/8 px-3 py-1.5 text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            )}
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {entries.map((item) => {
              const Icon =
                entryIcons[item.href as keyof typeof entryIcons] ?? ArrowRight;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group rounded-lg border border-neutral-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(26,25,24,0.12)]"
                >
                  <span className="flex size-11 items-center justify-center rounded-md bg-neutral-950 text-white">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold">{item.label}</h3>
                  <p className="mt-2 text-sm leading-6 text-neutral-600">
                    {item.description}
                  </p>
                  <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-emerald-700">
                    查看資料
                    <ArrowRight className="size-4 transition group-hover:translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

function Info({
  label,
  value,
  icon,
}: {
  label: string;
  value?: string | null;
  icon?: ReactNode;
}) {
  return (
    <div className="rounded-lg border border-neutral-200 bg-[#fbfaf7] p-4">
      <p className="text-xs text-neutral-500">{label}</p>
      <p className="mt-2 inline-flex items-center gap-2 font-medium text-neutral-950">
        {icon}
        {value || "-"}
      </p>
    </div>
  );
}
